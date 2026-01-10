import { supabase } from '@/integrations/supabase/client';

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
    tutorialUrl: assistant.tutorial_url,
    created_at: assistant.created_at,
  }));
}