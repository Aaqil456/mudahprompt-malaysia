import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY;

const supabase = createClient(supabaseUrl, supabaseAnonKey);

export async function getAssistants() {
  const { data, error } = await supabase
    .from('assistants')
    .select('*, created_at')
    .order('trending_score', { ascending: false });

  if (error) {
    console.error('Error fetching assistants:', error);
    return [];
  }

  return data.map(assistant => ({
    id: assistant.id,
    name: { ms: assistant.name_ms, en: assistant.name_en },
    category: { key: assistant.category_key, ms: assistant.category_ms, en: assistant.category_en },
    description: { ms: assistant.description_ms, en: assistant.description_en },
    imageSrc: assistant.image_src || '',
    fields: assistant.fields,
    template: { ms: assistant.template_ms, en: assistant.template_en },
    trending_score: assistant.trending_score,
    created_at: assistant.created_at,
  }));
}