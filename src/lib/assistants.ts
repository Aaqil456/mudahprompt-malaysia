// assistants.ts — 30 Prompt Assistants with Bilingual Support

export const assistants = [
  // ✅ 1. YouTube Script Generator
  {
    id: 'youtube-script-generator',
    name: { ms: '🎥 Penjana Skrip YouTube', en: '🎥 YouTube Script Generator' },
    category: 'Content Creation',
    description: {
      ms: 'Jana skrip YouTube panjang berdasarkan topik, gaya dan objektif. Sesuai untuk video 10-15 minit.',
      en: 'Generate full YouTube scripts based on topic, style and goal. Ideal for 10–15 min videos.'
    },
    fields: [
      {
        name: 'Topik',
        label: { ms: 'Topik', en: 'Topic' },
        placeholder: { ms: 'cth., Bitcoin Halving, Kesan AI pada ekonomi', en: 'e.g., Bitcoin Halving, AI impact on economy' },
        type: 'text'
      },
      {
        name: 'Gaya',
        label: { ms: 'Gaya Penulisan', en: 'Writing Style' },
        placeholder: { ms: 'cth., Santai, Serius, Storytelling', en: 'e.g., Casual, Serious, Storytelling' },
        type: 'text'
      },
      {
        name: 'Objektif',
        label: { ms: 'Objektif Video', en: 'Video Objective' },
        placeholder: { ms: 'cth., Edukasi, Hiburan, Jual produk', en: 'e.g., Educate, Entertain, Sell product' },
        type: 'text'
      }
    ],
    template: {
      ms: `Hasilkan skrip video YouTube berdasarkan info ini:

Topik: [topik]
Gaya: [gaya]
Objektif: [objektif]

Struktur skrip:
1. Hook pembuka yang kuat (0:00–0:30)
2. Pengenalan (0:30–1:30)
3. Isi utama (1:30–10:00)
4. Kesimpulan + CTA (10:00–15:00)

Pastikan gaya [gaya] kekal sepanjang video. Panjang skrip cukup untuk video 10–15 minit. Gunakan bahasa yang mudah difahami oleh penonton Malaysia.`,

      en: `Generate a full YouTube video script based on the following info:

Topic: [topik]
Style: [gaya]
Objective: [objektif]

Script structure:
1. Strong opening hook (0:00–0:30)
2. Introduction (0:30–1:30)
3. Main content (1:30–10:00)
4. Conclusion + CTA (10:00–15:00)

Maintain the [gaya] tone throughout. The script should be long enough for a 10–15 min video. Use simple, conversational language that appeals to a Malaysian audience.`
    }
  },

  // ✅ 2. Instagram Thread Writer
  {
    id: 'instagram-thread-writer',
    name: { ms: '📋 Penulis Thread Instagram', en: '📋 Instagram Thread Writer' },
    category: 'Content Creation',
    description: {
      ms: 'Tulis thread Instagram gaya storytelling atau borak mamak untuk tarik perhatian dan jual produk/idea.',
      en: 'Write Instagram threads using storytelling or casual style to attract attention and promote products/ideas.'
    },
    fields: [
      {
        name: 'Topik',
        label: { ms: 'Topik', en: 'Topic' },
        placeholder: { ms: 'cth., Kegagalan bisnes, Tips content viral, Kisah pelanggan', en: 'e.g., Business failures, Viral content tips, Customer story' },
        type: 'text'
      },
      {
        name: 'Gaya',
        label: { ms: 'Gaya Penulisan', en: 'Writing Style' },
        placeholder: { ms: 'cth., Borak mamak, Santai, Profesional, Sarkastik', en: 'e.g., Mamak chat, Casual, Professional, Sarcastic' },
        type: 'text'
      },
      {
        name: 'Matlamat',
        label: { ms: 'Matlamat Thread', en: 'Thread Objective' },
        placeholder: { ms: 'cth., Edukasi, Jualan, Dapat engagement', en: 'e.g., Educate, Sell, Get engagement' },
        type: 'text'
      }
    ],
    template: {
      ms: `Tulis thread Instagram berdasarkan maklumat berikut:

Topik: [topik]
Gaya Penulisan: [gaya]
Matlamat: [matlamat]

Panduan:
- Mula dengan hook baris pertama yang buat orang berhenti scroll
- Gunakan gaya [gaya] yang engaging untuk tarik perhatian
- Bina cerita dalam 5–8 post pendek
- Pastikan isi thread bantu capai [matlamat]
- Akhiri dengan CTA yang jelas dan ajakan untuk like, komen atau share

Format: Gaya penulisan mesra pembaca Malaysia, pendek dan padat.`,

      en: `Write an Instagram thread based on the following info:

Topic: [topik]
Writing Style: [gaya]
Objective: [matlamat]

Guidelines:
- Start with a strong 1-liner hook to stop the scroll
- Use engaging [gaya] style to pull readers in
- Structure the thread in 5–8 short posts
- Ensure the content aligns with the [matlamat] objective
- End with a strong CTA encouraging likes, comments or shares

Format: Malaysian-friendly writing, short and punchy.`
    }
  },

// ✅ 3. TikTok Script & Hook Builder
{
  id: 'tiktok-script-hook-builder',
  name: { ms: '🎬 Penjana Skrip TikTok', en: '🎬 TikTok Script & Hook Builder' },
  category: 'Content Creation',
  description: {
    ms: 'Jana skrip TikTok lengkap dengan hook, isi utama, dan punchline. Sesuai untuk video 60–90 saat.',
    en: 'Generate a full TikTok script including hook, core content, and punchline. Ideal for 60–90 second videos.'
  },
  fields: [
    {
      name: 'Topik',
      label: { ms: 'Topik Video', en: 'Video Topic' },
      placeholder: { ms: 'cth., Cara jana income pasif, Fakta crypto, Tips hidup sihat', en: 'e.g., How to earn passive income, Crypto facts, Health tips' },
      type: 'text'
    },
    {
      name: 'Gaya',
      label: { ms: 'Gaya Penyampaian', en: 'Delivery Style' },
      placeholder: { ms: 'cth., Serius, Komedi, Borak mamak', en: 'e.g., Serious, Funny, Mamak-style' },
      type: 'text'
    },
    {
      name: 'Objektif',
      label: { ms: 'Objektif Video', en: 'Video Objective' },
      placeholder: { ms: 'cth., Dapatkan views, Promosi produk, Edukasi', en: 'e.g., Get views, Promote product, Educate' },
      type: 'text'
    }
  ],
  template: {
    ms: `Tulis skrip penuh untuk video TikTok berdurasi 60–90 saat berdasarkan:

Topik: [topik]
Gaya: [gaya]
Objektif: [objektif]

Struktur skrip:
1. Hook (0–10s): Ayat pertama yang kuat untuk tarik perhatian
2. Isi utama (10–70s): Terangkan point penting dengan gaya [gaya]
3. Punchline + CTA (70–90s): Tutup dengan kesimpulan menarik atau ajakan bertindak

Gunakan bahasa mudah, ringkas dan engaging sesuai dengan TikTok. Panjang cukup untuk 60–90 saat.`,  
    en: `Write a full TikTok video script for 60–90 seconds based on:

Topic: [topik]
Style: [gaya]
Objective: [objektif]

Script structure:
1. Hook (0–10s): Strong first line to grab attention
2. Core Content (10–70s): Deliver the main points in [gaya] style
3. Punchline + CTA (70–90s): End with an impactful conclusion or clear CTA

Use simple, engaging language tailored for TikTok. Length should fit within 60–90 seconds.`
  }
},

// ✅ 4. Carousel Designer (Instagram/LinkedIn)
{
  id: 'carousel-designer',
  name: { ms: '🖼️ Pereka Karusel Instagram/LinkedIn', en: '🖼️ Carousel Designer (Instagram/LinkedIn)' },
  category: 'Content Creation',
  description: {
    ms: 'Pecahkan idea kompleks kepada 5–7 slide karusel dengan gaya visual dan CTA yang menarik.',
    en: 'Break down complex ideas into 5–7 carousel slides with visual cues and strong CTA.'
  },
  fields: [
    {
      name: 'Topik',
      label: { ms: 'Topik', en: 'Topic' },
      placeholder: { ms: 'cth., Strategi bisnes, Tips produktiviti, Panduan crypto', en: 'e.g., Business strategy, Productivity tips, Crypto guide' },
      type: 'text'
    },
    {
      name: 'Gaya',
      label: { ms: 'Nada & Gaya Visual', en: 'Tone & Visual Style' },
      placeholder: { ms: 'cth., Profesional, Fun, Minimalis, Bold', en: 'e.g., Professional, Fun, Minimalist, Bold' },
      type: 'text'
    },
    {
      name: 'Objektif',
      label: { ms: 'Objektif Karusel', en: 'Carousel Objective' },
      placeholder: { ms: 'cth., Edukasi, Jualan, Bangunkan brand', en: 'e.g., Educate, Sell, Build brand' },
      type: 'text'
    }
  ],
  template: {
    ms: `Bina kandungan untuk karusel 5–7 slide berdasarkan:

Topik: [topik]
Gaya: [gaya]
Objektif: [objektif]

Struktur:
1. Slide 1 – Hook visual + tajuk yang kuat
2. Slide 2–6 – Pecahan isi penting, satu idea setiap slide
3. Slide terakhir – Ringkasan + ajakan bertindak (CTA)

Pastikan gaya [gaya] kekal sepanjang karusel. Gunakan ayat pendek, visual cue dan bahasa mesra pengguna Malaysia.`,
    
    en: `Create content for a 5–7 slide carousel based on:

Topic: [topik]
Style: [gaya]
Objective: [objektif]

Structure:
1. Slide 1 – Visual hook + bold headline
2. Slides 2–6 – Breakdown of key ideas, one idea per slide
3. Final slide – Summary + clear Call-To-Action (CTA)

Maintain the [gaya] style throughout. Use short, punchy lines, visual cues, and language that appeals to a Malaysian audience.`
  }
},


  

  // 🔜 3–30 coming up next...
];
