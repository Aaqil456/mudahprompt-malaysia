import { supabase } from '@/integrations/supabase/client';

export interface VaultCategory {
  id: string;
  name: { en: string; ms: string };
  slug: string;
  parent_id: string | null;
  children?: VaultCategory[];
}

export interface PromptItem {
  prompt: string;
}

export interface VaultCollection {
  id: string;
  category_id: string;
  title: { en: string; ms: string };
  description: { en: string; ms: string };
  aesthetic: { en: string; ms: string };
  prompts: PromptItem[];
  is_featured: boolean;
  created_at: string;
}

/**
 * Fetches all categories and builds a recursive tree structure.
 */
export async function getVaultCategories(): Promise<VaultCategory[]> {
  const { data, error } = await supabase
    .from('vault_categories')
    .select('*')
    .order('created_at', { ascending: true });

  if (error) {
    console.error('Error fetching vault categories:', error);
    return [];
  }

  // Cast raw data to VaultCategory (handling Json type mismatch)
  const typedData = (data as any[]).map(cat => ({
    ...cat,
    name: cat.name as { en: string; ms: string }
  })) as VaultCategory[];

  // Build tree
  const categoryMap: Record<string, VaultCategory> = {};
  const tree: VaultCategory[] = [];

  typedData.forEach((cat) => {
    categoryMap[cat.id] = { ...cat, children: [] };
  });

  typedData.forEach((cat) => {
    if (cat.parent_id && categoryMap[cat.parent_id]) {
      categoryMap[cat.parent_id].children?.push(categoryMap[cat.id]);
    } else {
      tree.push(categoryMap[cat.id]);
    }
  });

  return tree;
}

/**
 * Fetches collections for a specific category.
 */
export async function getVaultCollections(categoryId?: string): Promise<VaultCollection[]> {
  let query = supabase.from('vault_collections').select('*');

  if (categoryId) {
    query = query.eq('category_id', categoryId);
  }

  const { data, error } = await query.order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching vault collections:', error);
    return [];
  }

  // Cast raw data to VaultCollection (handling Json type mismatch)
  return (data as any[]).map(col => ({
    ...col,
    title: col.title as { en: string; ms: string },
    description: col.description as { en: string; ms: string },
    aesthetic: col.aesthetic as { en: string; ms: string },
    prompts: col.prompts as PromptItem[]
  })) as VaultCollection[];
}
