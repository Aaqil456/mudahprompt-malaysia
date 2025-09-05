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

// ✅ 5. Persona Voice Converter
{
  id: 'persona-voice-converter',
  name: { ms: '🎭 Penukar Gaya Watak Malaysia', en: '🎭 Persona Voice Converter' },
  category: 'Content Creation',
  description: {
    ms: 'Tukar gaya penulisan mesej kepada nada khas seperti Makcik Bawang, Sifu, atau Boss untuk tarik perhatian audiens Malaysia.',
    en: 'Convert writing tone into iconic Malaysian personas like Makcik Bawang, Sifu, or Boss to grab local attention.'
  },
  fields: [
    {
      name: 'Mesej',
      label: { ms: 'Mesej Asal', en: 'Original Message' },
      placeholder: { ms: 'cth., Tips elak kerugian semasa jual beli crypto', en: 'e.g., Tips to avoid losses during crypto trading' },
      type: 'textarea'
    },
    {
      name: 'Watak',
      label: { ms: 'Gaya Watak', en: 'Persona Style' },
      placeholder: { ms: 'cth., Makcik Bawang, Abang Sado, Sifu bisnes', en: 'e.g., Makcik Bawang, Fitness Bro, Business Sifu' },
      type: 'text'
    }
  ],
  template: {
    ms: `Tukarkan mesej berikut kepada gaya [watak] dalam nada dan bahasa yang sesuai untuk audiens Malaysia.

Mesej asal:
[mesej]

Guna nada, ayat dan gaya percakapan harian yang menggambarkan karakter [watak]. Mesej perlu kedengaran natural dan autentik.`,
    
    en: `Rewrite the following message in the tone of [watak], using natural Malaysian language and persona quirks.

Original Message:
[mesej]

The rewritten message should reflect the character of [watak] authentically with appropriate tone, phrases, and personality.`
  }
},

// ✅ 6. Offer Builder (Core + Bonus + Scarcity)
{
  id: 'offer-builder',
  name: { ms: '💥 Penjana Tawaran Produk', en: '💥 Offer Builder' },
  category: 'Marketing & Business Strategy',
  description: {
    ms: 'Bina tawaran produk yang memikat dengan kombinasi elemen utama, bonus dan urgensi (scarcity).',
    en: 'Build irresistible product offers using a combination of core, bonus, and urgency (scarcity) elements.'
  },
  fields: [
    {
      name: 'Produk',
      label: { ms: 'Nama & Info Produk', en: 'Product Name & Info' },
      placeholder: { ms: 'cth., Kursus Crypto untuk Beginner, E-book AI Marketing', en: 'e.g., Crypto Course for Beginners, AI Marketing eBook' },
      type: 'text'
    },
    {
      name: 'Bonus',
      label: { ms: 'Bonus Tambahan', en: 'Bonus Add-ons' },
      placeholder: { ms: 'cth., Sesi coaching, Template percuma, Video khas', en: 'e.g., Coaching session, Free templates, Exclusive video' },
      type: 'text'
    },
    {
      name: 'Urgensi',
      label: { ms: 'Elemen Scarcity/Urgensi', en: 'Scarcity/Urgency Element' },
      placeholder: { ms: 'cth., Tawaran tamat 24 jam, 10 slot sahaja, Harga naik lepas ini', en: 'e.g., Offer ends in 24 hours, Only 10 slots, Price increases soon' },
      type: 'text'
    }
  ],
  template: {
    ms: `Bina tawaran produk berdasarkan maklumat berikut:

Produk: [produk]
Bonus: [bonus]
Urgensi: [urgensi]

Struktur tawaran:
1. Terangkan manfaat utama produk dengan jelas
2. Senaraikan bonus atau tambahan bernilai
3. Akhiri dengan elemen urgency [urgensi] untuk buat orang segera bertindak

Gaya penulisan: meyakinkan, jelas, dan sesuai untuk audiens Malaysia.`,
    
    en: `Create a compelling product offer using the details below:

Product: [produk]
Bonus: [bonus]
Urgency: [urgensi]

Offer structure:
1. Clearly explain the core product benefits
2. List valuable bonus add-ons
3. End with the urgency element: [urgensi] to drive immediate action

Tone: persuasive, clear, and suited for Malaysian audiences.`
  }
},

// ✅ 7. Reframe Your USP (Unique Selling Proposition)
{
  id: 'usp-reframer',
  name: { ms: '🧠 Penjana Semula USP Anda', en: '🧠 Reframe Your USP' },
  category: 'Marketing & Business Strategy',
  description: {
    ms: 'Ubah USP anda mengikut sudut berbeza berdasarkan kesakitan pelanggan, keinginan, atau halangan yang mereka hadapi.',
    en: 'Reframe your Unique Selling Proposition based on different angles: customer pain, desire, or objection.'
  },
  fields: [
    {
      name: 'USP',
      label: { ms: 'USP Asal', en: 'Original USP' },
      placeholder: { ms: 'cth., E-book ini akan bantu anda belajar AI dalam 7 hari', en: 'e.g., This eBook helps you learn AI in 7 days' },
      type: 'text'
    },
    {
      name: 'Sasaran',
      label: { ms: 'Target Audiens', en: 'Target Audience' },
      placeholder: { ms: 'cth., Founder, Ibu bekerja, Pelajar, Peniaga', en: 'e.g., Founders, Working moms, Students, Sellers' },
      type: 'text'
    },
    {
      name: 'Fokus',
      label: { ms: 'Fokus Sudut Baru', en: 'Reframing Focus' },
      placeholder: { ms: 'cth., Kesakitan, Keinginan, Halangan', en: 'e.g., Pain, Desire, Objection' },
      type: 'text'
    }
  ],
  template: {
    ms: `Reframe USP berikut mengikut sudut [fokus] untuk audiens [sasaran].

USP asal:
[usp]

Beri 3 versi USP baru yang lebih kuat dan meyakinkan berdasarkan sudut [fokus]. Gaya ayat mesti ringkas, jelas, dan sesuai untuk pengguna Malaysia.`,
    
    en: `Reframe the following USP based on the [fokus] angle for the [sasaran] audience.

Original USP:
[usp]

Generate 3 stronger and more persuasive USP versions that address the [fokus] perspective. Tone must be clear, punchy, and tailored to Malaysian readers.`
  }
},

// ✅ 8. Email Campaign Generator (5-email series)
{
  id: 'email-campaign-generator',
  name: { ms: '📨 Penjana Kempen Emel 5 Siri', en: '📨 Email Campaign Generator (5-email series)' },
  category: 'Marketing & Business Strategy',
  description: {
    ms: 'Jana siri emel automasi (5 emel) berdasarkan AIDA — dari tarik perhatian hingga kepada ajakan beli.',
    en: 'Generate a 5-email automation series using AIDA — from grabbing attention to final CTA to buy.'
  },
  fields: [
    {
      name: 'Produk',
      label: { ms: 'Nama & Info Produk', en: 'Product Name & Info' },
      placeholder: { ms: 'cth., Aplikasi AI untuk bisnes, Kursus TikTok Affiliate', en: 'e.g., AI tool for business, TikTok Affiliate course' },
      type: 'text'
    },
    {
      name: 'Audiens',
      label: { ms: 'Siapa Audiens', en: 'Who is the Audience' },
      placeholder: { ms: 'cth., Usahawan, Student, Pekerja, Founder', en: 'e.g., Entrepreneurs, Students, Employees, Founders' },
      type: 'text'
    },
    {
      name: 'Gaya',
      label: { ms: 'Gaya & Nada Emel', en: 'Email Tone & Style' },
      placeholder: { ms: 'cth., Profesional, Santai, Direct, Borak Mamak', en: 'e.g., Professional, Friendly, Direct, Conversational' },
      type: 'text'
    }
  ],
  template: {
    ms: `Tulis kempen emel automasi 5-siri berdasarkan maklumat ini:

Produk: [produk]
Audiens: [audiens]
Gaya: [gaya]

Struktur ikut framework AIDA:
1. Emel 1 – Attention: Tarik perhatian dengan masalah atau peluang besar
2. Emel 2 – Interest: Bina minat & kaitkan dengan kes harian audiens
3. Emel 3 – Desire: Tonjolkan faedah + testimoni atau bukti sosial
4. Emel 4 – Action: Ajakan bertindak (beli/daftar) dengan urgensi
5. Emel 5 – Bonus: Tawarkan diskaun/bonus jika belum bertindak

Nada [gaya], ayat pendek, mesra pembaca Malaysia.`,
    
    en: `Write a 5-email automation campaign based on this info:

Product: [produk]
Audience: [audiens]
Tone: [gaya]

Use AIDA structure:
1. Email 1 – Attention: Grab attention with big problem or opportunity
2. Email 2 – Interest: Build interest by connecting to daily life
3. Email 3 – Desire: Highlight benefits + testimonials or proof
4. Email 4 – Action: Strong CTA with urgency (buy/register)
5. Email 5 – Bonus: Bonus/discount/reminder if no action yet

Keep tone [gaya], sentences short, and language reader-friendly for Malaysian audience.`
  }
},

// ✅ 9. Pricing Psychology Prompter
{
  id: 'pricing-psychology-prompter',
  name: { ms: '💰 Penjana Psikologi Harga', en: '💰 Pricing Psychology Prompter' },
  category: 'Marketing & Business Strategy',
  description: {
    ms: 'Guna prinsip psikologi untuk cadang strategi harga: berdasarkan nilai, penetapan anchor, atau model tier.',
    en: 'Use psychological principles to suggest pricing strategies: value-based, anchoring, or tiered models.'
  },
  fields: [
    {
      name: 'Produk',
      label: { ms: 'Nama & Info Produk', en: 'Product Name & Info' },
      placeholder: { ms: 'cth., Webinar premium, E-book, App SaaS', en: 'e.g., Premium webinar, E-book, SaaS app' },
      type: 'text'
    },
    {
      name: 'Sasaran',
      label: { ms: 'Siapa Audiens Sasaran', en: 'Target Audience' },
      placeholder: { ms: 'cth., Pelajar, Freelancer, Founder', en: 'e.g., Students, Freelancers, Founders' },
      type: 'text'
    },
    {
      name: 'Model',
      label: { ms: 'Jenis Strategi Harga', en: 'Pricing Model Type' },
      placeholder: { ms: 'cth., Berdasarkan nilai, Harga jangkar, Tiered pricing', en: 'e.g., Value-based, Anchor pricing, Tiered pricing' },
      type: 'text'
    }
  ],
  template: {
    ms: `Cadangkan strategi harga berdasarkan:

Produk: [produk]
Audiens: [sasaran]
Model Strategi: [model]

Guna prinsip psikologi harga yang sesuai untuk audiens Malaysia. Beri 2–3 pilihan harga dengan sebab di sebalik setiap strategi. Gaya jawapan mesti padat dan meyakinkan.`,
    
    en: `Suggest pricing strategies based on:

Product: [produk]
Target Audience: [sasaran]
Strategy Model: [model]

Use relevant pricing psychology principles tailored for Malaysian audiences. Provide 2–3 pricing options with rationale behind each strategy. Keep tone concise and persuasive.`
  }
},

// ✅ 10. Business Model & Monetization Designer
{
  id: 'business-model-monetization',
  name: { ms: '🗺️ Pereka Model Bisnes & Penjana Wang', en: '🗺️ Business Model & Monetization Designer' },
  category: 'Marketing & Business Strategy',
  description: {
    ms: 'Cadangkan model bisnes dan strategi jana wang berdasarkan idea startup atau produk anda.',
    en: 'Suggest business models and monetization strategies based on your startup or product idea.'
  },
  fields: [
    {
      name: 'Idea',
      label: { ms: 'Idea Produk / Startup', en: 'Product / Startup Idea' },
      placeholder: { ms: 'cth., Platform AI untuk guru, App jual e-book niche', en: 'e.g., AI platform for teachers, niche e-book marketplace app' },
      type: 'text'
    },
    {
      name: 'Audiens',
      label: { ms: 'Target Audiens', en: 'Target Audience' },
      placeholder: { ms: 'cth., Pelajar, Freelancer, Syarikat kecil', en: 'e.g., Students, Freelancers, Small businesses' },
      type: 'text'
    }
  ],
  template: {
    ms: `Cadangkan beberapa model bisnes dan strategi monetisasi untuk:

Idea: [idea]
Audiens: [audiens]

Sertakan:
- Cadangan model bisnes (cth. Freemium, Langganan, Bayar sekali)
- Aliran pendapatan utama dan sampingan
- Penjelasan ringkas mengapa ia sesuai untuk audiens [audiens]

Nada jawapan mesti jelas, praktikal dan mudah difahami pengguna Malaysia.`,
    
    en: `Suggest several business models and monetization strategies for:

Idea: [idea]
Audience: [audiens]

Include:
- Recommended business model (e.g. Freemium, Subscription, One-time fee)
- Main and secondary revenue streams
- Brief rationale for why it fits the [audiens] audience

Tone should be clear, practical, and tailored to Malaysian users.`
  }
},

// ✅ 11. Viral Copywriter (PAS, AIDA, FAB)
{
  id: 'viral-copywriter',
  name: { ms: '📢 Penulis Salinan Viral', en: '📢 Viral Copywriter (PAS, AIDA, FAB)' },
  category: 'Copywriting & Sales',
  description: {
    ms: 'Ubah ayat biasa kepada format copywriting popular (PAS, AIDA, FAB) untuk iklan, post atau thread.',
    en: 'Transform plain sentences into popular copywriting frameworks (PAS, AIDA, FAB) for ads, posts, or threads.'
  },
  fields: [
    {
      name: 'Ayat',
      label: { ms: 'Ayat Asal', en: 'Original Sentence' },
      placeholder: { ms: 'cth., Ramai orang tak tahu cara guna AI untuk buat duit...', en: 'e.g., Most people don’t know how to use AI to make money...' },
      type: 'textarea'
    },
    {
      name: 'Framework',
      label: { ms: 'Jenis Framework', en: 'Framework Type' },
      placeholder: { ms: 'cth., PAS, AIDA, FAB', en: 'e.g., PAS, AIDA, FAB' },
      type: 'text'
    },
    {
      name: 'Nada',
      label: { ms: 'Nada Penulisan', en: 'Tone of Writing' },
      placeholder: { ms: 'cth., Urgent, Santai, Persuasif, Profesional', en: 'e.g., Urgent, Casual, Persuasive, Professional' },
      type: 'text'
    }
  ],
  template: {
    ms: `Ubah ayat berikut kepada format copywriting [framework] dengan nada [nada]:

Ayat asal:
[ayat]

Gunakan gaya yang padat, menarik dan sesuai untuk post iklan, media sosial atau thread. Pastikan format [framework] digunakan dengan betul.`,
    
    en: `Rewrite the sentence below into the [framework] copywriting format using [nada] tone:

Original sentence:
[ayat]

Make it concise, punchy, and suitable for ads, social media, or thread writing. Make sure the [framework] structure is properly applied.`
  }
},

// ✅ 12. Resume + LinkedIn Summary Optimizer
{
  id: 'resume-linkedin-optimizer',
  name: { ms: '💼 Penambah Resume & Ringkasan LinkedIn', en: '💼 Resume + LinkedIn Summary Optimizer' },
  category: 'Copywriting & Sales',
  description: {
    ms: 'Ubah ayat pengalaman kerja anda kepada bullet point resume profesional dan ringkasan LinkedIn yang menonjol.',
    en: 'Turn your work experience text into polished resume bullet points and a standout LinkedIn summary.'
  },
  fields: [
    {
      name: 'Pengalaman',
      label: { ms: 'Pengalaman Kerja / Ayat Asal', en: 'Work Experience / Original Text' },
      placeholder: { ms: 'cth., Saya handle social media dan buat content setiap hari...', en: 'e.g., I managed social media and created content daily...' },
      type: 'textarea'
    },
    {
      name: 'Peranan',
      label: { ms: 'Peranan Sasaran', en: 'Target Role' },
      placeholder: { ms: 'cth., Social Media Manager, Digital Marketer', en: 'e.g., Social Media Manager, Digital Marketer' },
      type: 'text'
    },
    {
      name: 'Nada',
      label: { ms: 'Nada Penulisan', en: 'Writing Tone' },
      placeholder: { ms: 'cth., Profesional, Confident, Humble', en: 'e.g., Professional, Confident, Humble' },
      type: 'text'
    }
  ],
  template: {
    ms: `Tukar ayat berikut kepada:

1. Bullet point untuk resume yang relevan dengan peranan [peranan]
2. Ringkasan profil LinkedIn yang meyakinkan

Gaya penulisan mestilah [nada] dan sesuai untuk pasaran kerja profesional.

Ayat asal:
[pengalaman]`,

    en: `Transform the text below into:

1. Resume bullet points tailored to the [peranan] role
2. A persuasive LinkedIn profile summary

Writing tone should be [nada] and professional for the job market.

Original text:
[pengalaman]`
  }
},

// ✅ 13. Landing Page Copywriter (Hero > CTA)
{
  id: 'landing-page-copywriter',
  name: { ms: '📈 Penulis Laman Jualan', en: '📈 Landing Page Copywriter (Hero > CTA)' },
  category: 'Copywriting & Sales',
  description: {
    ms: 'Bina salinan penuh untuk laman jualan dari tajuk utama hingga ajakan bertindak, termasuk bukti sosial dan point manfaat.',
    en: 'Generate full landing page copy from hero section to CTA, including trust signals and benefit bullets.'
  },
  fields: [
    {
      name: 'Produk',
      label: { ms: 'Nama & Info Produk', en: 'Product Name & Info' },
      placeholder: { ms: 'cth., E-book, Kursus, Aplikasi', en: 'e.g., E-book, Course, App' },
      type: 'text'
    },
    {
      name: 'Audiens',
      label: { ms: 'Siapa Audiens Sasaran', en: 'Target Audience' },
      placeholder: { ms: 'cth., Freelancer, Pelajar, Usahawan', en: 'e.g., Freelancers, Students, Entrepreneurs' },
      type: 'text'
    },
    {
      name: 'Gaya',
      label: { ms: 'Nada Penulisan', en: 'Writing Tone' },
      placeholder: { ms: 'cth., Persuasif, Santai, Direct', en: 'e.g., Persuasive, Casual, Direct' },
      type: 'text'
    }
  ],
  template: {
    ms: `Tulis salinan penuh untuk laman jualan berdasarkan maklumat ini:

Produk: [produk]
Audiens Sasaran: [audiens]
Nada Penulisan: [gaya]

Struktur salinan:
1. Hero section: Tajuk kuat + subheadline
2. Masalah yang difahami + impian audiens
3. Pengenalan produk [produk]
4. Senarai manfaat (bullet point)
5. Bukti sosial / testimoni
6. Call-To-Action (CTA)

Nada mestilah [gaya] dan sesuai untuk pembaca Malaysia.`,
    
    en: `Write full landing page copy based on:

Product: [produk]
Target Audience: [audiens]
Tone: [gaya]

Copy structure:
1. Hero section: Strong headline + subheadline
2. Relatable problem + dream outcome
3. Product introduction: [produk]
4. Benefit bullets
5. Social proof / testimonials
6. Strong Call-To-Action (CTA)

The tone should be [gaya] and resonate with Malaysian readers.`
  }
},
// ✅ 14. Rewrite Old Sales Page for New Angle
{
  id: 'rewrite-sales-page',
  name: { ms: '🔁 Ubah Laman Jualan Lama', en: '🔁 Rewrite Old Sales Page for New Angle' },
  category: 'Copywriting & Sales',
  description: {
    ms: 'Ambil salinan lama dan ubah kepada sudut baru (berdasarkan audiens atau tawaran), tanpa ubah isi penting.',
    en: 'Take old sales copy and rewrite it with a fresh angle (based on audience or offer), without changing the core message.'
  },
  fields: [
    {
      name: 'Salinan',
      label: { ms: 'Salinan Asal', en: 'Original Copy' },
      placeholder: { ms: 'cth., Tajuk & isi dari laman jualan lama', en: 'e.g., Headline and content from old sales page' },
      type: 'textarea'
    },
    {
      name: 'SudutBaru',
      label: { ms: 'Sudut / Audiens Baru', en: 'New Angle / Audience' },
      placeholder: { ms: 'cth., Untuk student, untuk suri rumah, dari sudut hasil cepat', en: 'e.g., For students, for homemakers, from fast-results angle' },
      type: 'text'
    },
    {
      name: 'Nada',
      label: { ms: 'Nada Penulisan Baru', en: 'New Writing Tone' },
      placeholder: { ms: 'cth., Persuasif, Empati, Direct, Santai', en: 'e.g., Persuasive, Empathetic, Direct, Casual' },
      type: 'text'
    }
  ],
  template: {
    ms: `Tukarkan salinan asal laman jualan ini kepada sudut baru [sudutBaru] dengan nada [nada]:

Salinan asal:
[salinan]

Pastikan mesej utama dikekalkan. Hanya ubah pendekatan dan gaya untuk sesuai dengan audiens atau sudut baru.`,
    
    en: `Rewrite this original sales copy using a fresh angle: [sudutBaru] and tone: [nada].

Original Copy:
[salinan]

Keep the core message intact. Only reframe the angle and delivery to suit the new audience or positioning.`
  }
},

// ✅ 15. One-Liner Pitch Generator
{
  id: 'one-liner-pitch',
  name: { ms: '🪄 Penjana Pitch Satu Ayat', en: '🪄 One-Liner Pitch Generator' },
  category: 'Copywriting & Sales',
  description: {
    ms: 'Hasilkan ayat pitch padat dan menarik dalam gaya bio Twitter atau elevator pitch untuk produk, jenama atau diri sendiri.',
    en: 'Generate a punchy one-liner pitch in the style of a Twitter bio or elevator pitch for a product, brand, or personal intro.'
  },
  fields: [
    {
      name: 'Info',
      label: { ms: 'Maklumat Produk / Diri / Jenama', en: 'Product / Brand / Personal Info' },
      placeholder: { ms: 'cth., Aplikasi yang bantu founder Malaysia bina AI assistant sendiri', en: 'e.g., An app that helps Malaysian founders build their own AI assistant' },
      type: 'textarea'
    },
    {
      name: 'Gaya',
      label: { ms: 'Gaya Pitch', en: 'Pitch Style' },
      placeholder: { ms: 'cth., Twitter bio, Profesional, Lawak, Confident', en: 'e.g., Twitter bio, Professional, Funny, Confident' },
      type: 'text'
    }
  ],
  template: {
    ms: `Berdasarkan maklumat berikut, hasilkan 3 versi ayat pitch satu baris dalam gaya [gaya]:

Maklumat:
[info]

Pastikan pitch padat, menarik perhatian, dan sesuai untuk digunakan dalam bio, intro atau presentasi.`,
    
    en: `Based on the following info, generate 3 versions of a one-liner pitch in [gaya] style:

Info:
[info]

Make it concise, attention-grabbing, and suitable for bios, intros, or quick presentations.`
  }
},

// ✅ 16. AI Meeting Summarizer + Next Steps Generator
{
  id: 'meeting-summarizer-nextsteps',
  name: { ms: '📊 Penjana Ringkasan Mesyuarat + Tindakan Lanjut', en: '📊 AI Meeting Summarizer + Next Steps Generator' },
  category: 'Productivity & Professional Life',
  description: {
    ms: 'Tukar nota mesyuarat mentah kepada ringkasan profesional dan senarai tindakan (next steps) yang boleh diambil.',
    en: 'Turn raw meeting notes into a clean professional summary and actionable next steps list.'
  },
  fields: [
    {
      name: 'Nota',
      label: { ms: 'Nota Mesyuarat', en: 'Meeting Notes' },
      placeholder: { ms: 'cth., Kami bincang tentang pelancaran produk baru dan strategi kempen', en: 'e.g., We discussed new product launch and marketing strategy' },
      type: 'textarea'
    },
    {
      name: 'Gaya',
      label: { ms: 'Nada Ringkasan', en: 'Summary Tone' },
      placeholder: { ms: 'cth., Formal, Mesra, Terus terang', en: 'e.g., Formal, Friendly, Straightforward' },
      type: 'text'
    }
  ],
  template: {
    ms: `Berdasarkan nota mesyuarat ini, hasilkan dua bahagian:

1. Ringkasan mesyuarat secara profesional (Nada: [gaya])
2. Senarai tindakan jelas yang boleh diambil (next steps)

Nota mesyuarat:
[nota]

Pastikan format ringkas, padat dan mudah difahami oleh semua peserta.`,
    
    en: `Based on the meeting notes below, generate two sections:

1. A clean, professional summary (Tone: [gaya])
2. A clear list of actionable next steps

Meeting Notes:
[nota]

Keep it concise, structured, and easy for all participants to understand.`
  }
},

// ✅ 17. SOP Generator (Operations or Personal Task)
{
  id: 'sop-generator',
  name: { ms: '🗂️ Penjana SOP Langkah Demi Langkah', en: '🗂️ SOP Generator (Operations or Personal Task)' },
  category: 'Productivity & Professional Life',
  description: {
    ms: 'Ubah tugas atau proses kepada SOP lengkap — siapa buat apa, bila dan bagaimana.',
    en: 'Turn a task or process into a structured SOP — who does what, when, and how.'
  },
  fields: [
    {
      name: 'Tugas',
      label: { ms: 'Nama Tugas / Proses', en: 'Task / Process Name' },
      placeholder: { ms: 'cth., Urus kempen email, Setup onboarding pelanggan', en: 'e.g., Manage email campaign, Client onboarding setup' },
      type: 'text'
    },
    {
      name: 'Tujuan',
      label: { ms: 'Objektif atau Hasil Diharapkan', en: 'Objective or Desired Outcome' },
      placeholder: { ms: 'cth., Dapat 100 pendaftaran, onboarding kurang 24 jam', en: 'e.g., Get 100 signups, onboarding done under 24 hours' },
      type: 'text'
    },
    {
      name: 'Konteks',
      label: { ms: 'Konteks / Siapa Terlibat', en: 'Context / Who is Involved' },
      placeholder: { ms: 'cth., Pasukan marketing, freelancer, founder solo', en: 'e.g., Marketing team, freelancer, solo founder' },
      type: 'text'
    }
  ],
  template: {
    ms: `Tukar maklumat berikut kepada SOP (Standard Operating Procedure) yang jelas dan boleh dilaksana:

Tugas: [tugas]
Tujuan: [tujuan]
Konteks: [konteks]

Struktur SOP:
1. Langkah demi langkah
2. Siapa buat apa
3. Tools/platform jika perlu
4. Anggaran masa setiap langkah

Gaya ringkas, mudah difahami, dan terus boleh dilaksana.`,
    
    en: `Convert the following into a clear and actionable SOP (Standard Operating Procedure):

Task: [tugas]
Objective: [tujuan]
Context: [konteks]

SOP Structure:
1. Step-by-step instructions
2. Who is responsible for what
3. Tools/platforms required (if any)
4. Estimated time for each step

Keep it simple, clear, and executable.`
  }
},

// ✅ 18. Weekly Planner Assistant (Goal → Schedule)
{
  id: 'weekly-planner-assistant',
  name: { ms: '📆 Penolong Jadual Mingguan', en: '📆 Weekly Planner Assistant (Goal → Schedule)' },
  category: 'Productivity & Professional Life',
  description: {
    ms: 'Ubah matlamat mingguan kepada senarai tugasan atau jadual masa harian (time-blocking).',
    en: 'Convert weekly goals into a structured task list or time-blocked daily schedule.'
  },
  fields: [
    {
      name: 'Matlamat',
      label: { ms: 'Matlamat Mingguan', en: 'Weekly Goal' },
      placeholder: { ms: 'cth., Siapkan e-book, Rakam 3 video TikTok', en: 'e.g., Finish e-book, Record 3 TikTok videos' },
      type: 'text'
    },
    {
      name: 'JumlahHari',
      label: { ms: 'Berapa Hari Tersedia', en: 'Days Available This Week' },
      placeholder: { ms: 'cth., 5 hari, Hanya Isnin–Khamis', en: 'e.g., 5 days, Mon–Thurs only' },
      type: 'text'
    },
    {
      name: 'Gaya',
      label: { ms: 'Gaya Rancangan', en: 'Planning Style' },
      placeholder: { ms: 'cth., Time-block, To-do list, Fokus harian', en: 'e.g., Time-block, To-do list, Daily focus' },
      type: 'text'
    }
  ],
  template: {
    ms: `Bantu saya susun jadual mingguan berdasarkan:

Matlamat: [matlamat]
Hari tersedia: [jumlahHari]
Gaya: [gaya]

Hasilkan rancangan lengkap untuk capai [matlamat] mengikut gaya [gaya]. Format mesti padat, jelas dan sesuai untuk dilaksana terus minggu ini.`,
    
    en: `Help me create a weekly schedule based on:

Goal: [matlamat]
Available Days: [jumlahHari]
Planning Style: [gaya]

Generate a complete plan to achieve [matlamat] using the [gaya] format. Keep it clear, actionable, and ready to implement this week.`
  }
},

// ✅ 19. SMART Goal Structurer
{
  id: 'smart-goal-structurer',
  name: { ms: '🎯 Penukar Matlamat kepada SMART', en: '🎯 SMART Goal Structurer' },
  category: 'Productivity & Professional Life',
  description: {
    ms: 'Tukar matlamat umum atau kabur kepada format SMART — Specific, Measurable, Achievable, Relevant, Timely.',
    en: 'Convert vague or broad goals into SMART format — Specific, Measurable, Achievable, Relevant, Timely.'
  },
  fields: [
    {
      name: 'Matlamat',
      label: { ms: 'Matlamat Asal', en: 'Original Goal' },
      placeholder: { ms: 'cth., Nak naikkan followers Instagram, Nak sihat semula', en: 'e.g., Grow my Instagram followers, Get healthy again' },
      type: 'text'
    },
    {
      name: 'Konteks',
      label: { ms: 'Situasi atau Latar Belakang', en: 'Context or Background' },
      placeholder: { ms: 'cth., Saya baru mula semula selepas berehat, akaun masih kecil', en: 'e.g., I’m restarting after a break, small account' },
      type: 'textarea'
    }
  ],
  template: {
    ms: `Tukarkan matlamat berikut kepada format SMART (Specific, Measurable, Achievable, Relevant, Timely):

Matlamat asal:
[matlamat]

Konteks:
[konteks]

Hasilkan versi matlamat yang lebih jelas, terukur dan sesuai untuk tindakan segera.`,
    
    en: `Convert the goal below into SMART format (Specific, Measurable, Achievable, Relevant, Timely):

Original Goal:
[matlamat]

Context:
[konteks]

Output should be a clearer, measurable version that’s ready for action.`
  }
},

// ✅ 20. Mind Map Generator (Topic > Sub > Action)
{
  id: 'mind-map-generator',
  name: { ms: '🧠 Penjana Peta Minda', en: '🧠 Mind Map Generator (Topic > Sub > Action)' },
  category: 'Productivity & Professional Life',
  description: {
    ms: 'Bina peta minda ringkas bermula dari topik utama → pecahan subtopik → tindakan spesifik untuk setiap cabang.',
    en: 'Generate a simple mind map starting from main topic → subtopics → actionable tasks for each branch.'
  },
  fields: [
    {
      name: 'Topik',
      label: { ms: 'Topik Utama', en: 'Main Topic' },
      placeholder: { ms: 'cth., Bangunkan jenama peribadi, Pelancaran produk baru', en: 'e.g., Build personal brand, Launch new product' },
      type: 'text'
    },
    {
      name: 'Gaya',
      label: { ms: 'Gaya Pecahan', en: 'Breakdown Style' },
      placeholder: { ms: 'cth., Strategik, Kreatif, Praktikal', en: 'e.g., Strategic, Creative, Practical' },
      type: 'text'
    }
  ],
  template: {
    ms: `Berdasarkan topik [topik], bina peta minda dalam gaya [gaya] seperti berikut:

1. Topik utama: [topik]
2. Pecahkan kepada 4–6 subtopik utama
3. Untuk setiap subtopik, beri 2–3 tindakan praktikal

Formatkan supaya mudah difahami dan sesuai dijadikan rujukan pelan kerja.`,
    
    en: `Based on the topic [topik], generate a mind map in [gaya] style with:

1. Main topic: [topik]
2. 4–6 main subtopics
3. 2–3 actionable steps under each subtopic

Format should be clear, structured, and usable for planning or execution.`
  }
},

// ✅ 21. Prompt Builder for API & LangChain
{
  id: 'prompt-builder-langchain',
  name: { ms: '📡 Penjana Prompt untuk API / LangChain', en: '📡 Prompt Builder for API & LangChain' },
  category: 'Tech, Tools & Dev Prompts',
  description: {
    ms: 'Bina struktur prompt untuk gunakan dengan API, LangChain tools, agents atau chains. Sesuai untuk few-shot dan modular design.',
    en: 'Build prompt structures for use with APIs, LangChain tools, agents, or chains. Suitable for few-shot and modular design.'
  },
  fields: [
    {
      name: 'Tujuan',
      label: { ms: 'Tujuan / Fungsi AI', en: 'AI Purpose / Function' },
      placeholder: { ms: 'cth., Klasifikasi emel, Analisis berita crypto, Penjana SOP', en: 'e.g., Email classifier, Crypto news analyzer, SOP generator' },
      type: 'text'
    },
    {
      name: 'Input',
      label: { ms: 'Jenis Input Pengguna', en: 'User Input Type' },
      placeholder: { ms: 'cth., Teks bebas, JSON, Borang, Input suara', en: 'e.g., Free text, JSON, Form, Voice input' },
      type: 'text'
    },
    {
      name: 'Contoh',
      label: { ms: 'Contoh Output Diharapkan', en: 'Expected Output Example' },
      placeholder: { ms: 'cth., {"result": "positive"}, atau ayat SOP lengkap', en: 'e.g., {"result": "positive"}, or full SOP sentence' },
      type: 'textarea'
    }
  ],
  template: {
    ms: `Bina prompt modular untuk digunakan dengan API atau LangChain berdasarkan info ini:

Tujuan: [tujuan]
Jenis Input: [input]
Contoh Output Diharapkan:
[contoh]

Gunakan struktur yang sesuai untuk few-shot prompting, dan beri cadangan prompt utama + contoh untuk fine-tuning / inference.`,
    
    en: `Create a modular prompt structure for API or LangChain use based on:

Purpose: [tujuan]
User Input Type: [input]
Expected Output Example:
[contoh]

Include proper few-shot style and generate main prompt + sample completions ready for fine-tuning or inference.`
  }
},

// ✅ 22. Code Commenter & Refactor Assistant
{
  id: 'code-comment-refactor',
  name: { ms: '🧱 Penambah & Pembaik Kod', en: '🧱 Code Commenter & Refactor Assistant' },
  category: 'Tech, Tools & Dev Prompts',
  description: {
    ms: 'Tulis semula kod untuk lebih kemas, modular atau mudah dibaca — dan tambah komen jelas untuk setiap fungsi atau logik utama.',
    en: 'Rewrite code to be cleaner, more modular, or more readable — and add clear comments for each function or key logic.'
  },
  fields: [
    {
      name: 'Kod',
      label: { ms: 'Kod Asal', en: 'Original Code' },
      placeholder: { ms: 'Tampal kod anda di sini...', en: 'Paste your code here...' },
      type: 'textarea'
    },
    {
      name: 'Gaya',
      label: { ms: 'Keutamaan Refactor', en: 'Refactor Preference' },
      placeholder: { ms: 'cth., Fokus modulariti, Guna function, Tambah komen', en: 'e.g., Focus on modularity, Use functions, Add comments' },
      type: 'text'
    }
  ],
  template: {
    ms: `Berdasarkan kod berikut, refactor dan tambah komen supaya:

1. Lebih mudah dibaca
2. Kod lebih modular dan teratur
3. Gaya ikut keutamaan: [gaya]

Kod asal:
[kod]

Sediakan versi baru kod + komen setiap fungsi atau blok logik penting.`,
    
    en: `Based on the code below, refactor and comment so that:

1. It's easier to read
2. The code is more modular and structured
3. Style follows: [gaya]

Original Code:
[kod]

Provide a cleaned-up version of the code with comments for each major function or logic block.`
  }
},

// ✅ 23. SaaS Feature Explainer Generator
{
  id: 'saas-feature-explainer',
  name: { ms: '🔌 Penjelas Ciri Produk SaaS', en: '🔌 SaaS Feature Explainer Generator' },
  category: 'Tech, Tools & Dev Prompts',
  description: {
    ms: 'Tukar ciri teknikal produk SaaS kepada penerangan yang mudah difahami dan berfokus kepada manfaat pelanggan.',
    en: 'Translate technical SaaS features into clear explanations focused on customer benefits.'
  },
  fields: [
    {
      name: 'Ciri',
      label: { ms: 'Nama & Fungsi Ciri', en: 'Feature Name & Function' },
      placeholder: { ms: 'cth., Real-time sync antara device, Dashboard AI auto-detect issue', en: 'e.g., Real-time device sync, AI dashboard issue detection' },
      type: 'text'
    },
    {
      name: 'Audiens',
      label: { ms: 'Jenis Audiens / Pengguna Sasaran', en: 'Target Audience / User Type' },
      placeholder: { ms: 'cth., Founder bukan teknikal, Team support, Freelancer digital', en: 'e.g., Non-technical founder, Support team, Digital freelancer' },
      type: 'text'
    },
    {
      name: 'Nada',
      label: { ms: 'Nada Penulisan', en: 'Writing Tone' },
      placeholder: { ms: 'cth., Ringkas, Meyakinkan, Edukasi', en: 'e.g., Simple, Persuasive, Educational' },
      type: 'text'
    }
  ],
  template: {
    ms: `Terangkan ciri berikut kepada audiens [audiens] dengan gaya [nada]:

Ciri: [ciri]

Jelaskan manfaat utamanya dan kenapa pengguna patut peduli — bukan sekadar fungsi teknikal semata. Gunakan gaya yang senang difahami dan fokus pada nilai kepada pengguna.`,
    
    en: `Explain the following SaaS feature to [audiens] using a [nada] tone:

Feature: [ciri]

Focus on the main benefit and why the user should care — not just the technical description. Keep it simple and centered around user value.`
  }
},

// ✅ 24. Zapier / n8n Flow Designer
{
  id: 'automation-flow-designer',
  name: { ms: '⚙️ Pereka Aliran Automasi (Zapier / n8n)', en: '⚙️ Zapier / n8n Flow Designer' },
  category: 'Tech, Tools & Dev Prompts',
  description: {
    ms: 'Bantu reka aliran automasi langkah demi langkah berdasarkan hasil yang diingini — sesuai untuk Zapier, Make, atau n8n.',
    en: 'Design multi-step automation flows based on desired outcome — suitable for Zapier, Make, or n8n.'
  },
  fields: [
    {
      name: 'Tujuan',
      label: { ms: 'Hasil Dikehendaki', en: 'Desired Outcome' },
      placeholder: { ms: 'cth., Post content dari Telegram ke Facebook Page secara automatik', en: 'e.g., Auto-post content from Telegram to Facebook Page' },
      type: 'text'
    },
    {
      name: 'Tools',
      label: { ms: 'Senarai Tools / Platform Digunakan', en: 'List of Tools / Platforms' },
      placeholder: { ms: 'cth., Telegram, Google Sheets, Facebook, Notion', en: 'e.g., Telegram, Google Sheets, Facebook, Notion' },
      type: 'text'
    },
    {
      name: 'Gaya',
      label: { ms: 'Gaya Jawapan', en: 'Answer Format' },
      placeholder: { ms: 'cth., Step by step, JSON flow, Carta visual', en: 'e.g., Step by step, JSON flow, Visual chart' },
      type: 'text'
    }
  ],
  template: {
    ms: `Berdasarkan maklumat berikut, bina cadangan aliran automasi:

Tujuan: [tujuan]
Tools digunakan: [tools]
Format jawapan: [gaya]

Terangkan setiap langkah dengan jelas, termasuk trigger, action, dan sambungan antara apps/platform. Jika sesuai, beri cadangan node atau function dalam Zapier atau n8n.`,
    
    en: `Based on the following info, design an automation flow:

Goal: [tujuan]
Tools used: [tools]
Answer format: [gaya]

Explain each step clearly including trigger, actions, and app-to-app connections. If suitable, suggest node names or functions in Zapier or n8n.`
  }
},

// ✅ 25. Debug Prompt Generator (Explain Bug or Error)
{
  id: 'debug-prompt-generator',
  name: { ms: '🧪 Penjana Prompt Debug / Bug', en: '🧪 Debug Prompt Generator (Explain Bug or Error)' },
  category: 'Tech, Tools & Dev Prompts',
  description: {
    ms: 'Ubah mesej ralat atau isu teknikal kepada prompt AI yang jelas untuk bantu diagnosis dan penyelesaian.',
    en: 'Convert error messages or technical issues into a clear AI-debuggable prompt for faster diagnosis and fix.'
  },
  fields: [
    {
      name: 'Isu',
      label: { ms: 'Masalah atau Ralat', en: 'Bug / Error Message' },
      placeholder: { ms: 'cth., Error: undefined is not a function...', en: 'e.g., Error: undefined is not a function...' },
      type: 'textarea'
    },
    {
      name: 'Konteks',
      label: { ms: 'Konteks Projek / Teknologi', en: 'Project / Tech Context' },
      placeholder: { ms: 'cth., React project dengan Firebase Auth, guna Node.js', en: 'e.g., React project with Firebase Auth, using Node.js' },
      type: 'text'
    },
    {
      name: 'HasilDikehendaki',
      label: { ms: 'Apa yang Anda Mahu AI Bantu?', en: 'What Do You Want Help With?' },
      placeholder: { ms: 'cth., Bagi fix, jelaskan sebab error, bantu debug', en: 'e.g., Provide fix, explain cause, help debug' },
      type: 'text'
    }
  ],
  template: {
    ms: `Tukar maklumat ini kepada prompt AI untuk bantu diagnosis dan penyelesaian isu:

Masalah: [isu]
Konteks: [konteks]
Hasil dikehendaki: [hasilDikehendaki]

Hasilkan prompt debug yang padat, jelas dan mudah difahami oleh AI. Guna struktur logik dan sebut teknologi dengan spesifik.`,
    
    en: `Convert the following info into an AI-ready prompt to help debug the issue:

Bug/Error: [isu]
Context: [konteks]
Desired help: [hasilDikehendaki]

Generate a concise and logical prompt that makes the error easier to understand and fix using AI tools. Mention tech/frameworks explicitly.`
  }
},

// ✅ 26. Self-Coaching Prompt Builder
{
  id: 'self-coaching-builder',
  name: { ms: '🧘 Penjana Prompt Refleksi Diri', en: '🧘 Self-Coaching Prompt Builder' },
  category: 'Personal & Creative',
  description: {
    ms: 'Ubah kekeliruan, dilema atau isu peribadi kepada soalan reflektif untuk bantu fikir dengan lebih jelas.',
    en: 'Turn personal confusion, dilemmas, or internal issues into self-coaching prompts for clearer thinking.'
  },
  fields: [
    {
      name: 'Isu',
      label: { ms: 'Isu / Kekeliruan Dihadapi', en: 'Issue / Internal Conflict' },
      placeholder: { ms: 'cth., Tak pasti nak teruskan kerja atau berhenti...', en: 'e.g., Not sure if I should quit my job or stay...' },
      type: 'textarea'
    },
    {
      name: 'Gaya',
      label: { ms: 'Gaya Prompt (Opsyenal)', en: 'Prompt Style (Optional)' },
      placeholder: { ms: 'cth., Gentle, Direct, Spiritual, Rational', en: 'e.g., Gentle, Direct, Spiritual, Rational' },
      type: 'text'
    }
  ],
  template: {
    ms: `Berdasarkan isu berikut, hasilkan beberapa soalan refleksi diri atau prompt coaching untuk bantu saya fikir lebih jelas.

Isu: [isu]
Gaya Prompt: [gaya]

Pastikan soalan disusun supaya membimbing, tidak menghakimi, dan sesuai untuk refleksi peribadi secara solo.`,
    
    en: `Based on the issue below, generate several reflective self-coaching prompts to help me think more clearly.

Issue: [isu]
Prompt Style: [gaya]

The questions should be supportive, non-judgmental, and designed for solo personal reflection.`
  }
},

// ✅ 27. Speech Generator (Wedding, Graduation, Corporate)
{
  id: 'speech-generator',
  name: { ms: '🗣️ Penjana Ucapan Majlis', en: '🗣️ Speech Generator (Wedding, Graduation, Corporate)' },
  category: 'Personal & Creative',
  description: {
    ms: 'Bina ucapan lengkap berdasarkan acara, audiens dan nada — sesuai untuk majlis perkahwinan, graduasi, atau korporat.',
    en: 'Generate a full speech based on the event, audience, and tone — suitable for weddings, graduations, or corporate functions.'
  },
  fields: [
    {
      name: 'Acara',
      label: { ms: 'Jenis Acara', en: 'Event Type' },
      placeholder: { ms: 'cth., Perkahwinan, Graduasi, Townhall, Pitching', en: 'e.g., Wedding, Graduation, Townhall, Pitching' },
      type: 'text'
    },
    {
      name: 'Audiens',
      label: { ms: 'Siapa Audiens', en: 'Who is the Audience' },
      placeholder: { ms: 'cth., Rakan pejabat, Keluarga, Cikgu, Pelabur', en: 'e.g., Colleagues, Family, Teachers, Investors' },
      type: 'text'
    },
    {
      name: 'Nada',
      label: { ms: 'Nada Ucapan', en: 'Speech Tone' },
      placeholder: { ms: 'cth., Lucu, Menyentuh hati, Profesional, Ringkas', en: 'e.g., Funny, Heartfelt, Professional, Concise' },
      type: 'text'
    }
  ],
  template: {
    ms: `Tulis ucapan lengkap berdasarkan maklumat ini:

Acara: [acara]
Audiens: [audiens]
Nada: [nada]

Ucapan perlu ada pembukaan, isi utama, dan penutup yang sesuai dengan [acara] serta gaya [nada]. Panjang ucapan sekitar 2–5 minit. Gunakan bahasa mesra dan mudah dihayati.`,
    
    en: `Write a complete speech based on the following:

Event: [acara]
Audience: [audiens]
Tone: [nada]

The speech should include an opening, body, and closing tailored to the [acara] and delivered in a [nada] tone. Length: around 2–5 minutes. Use clear, natural language.`
  }
},

// ✅ 28. Character Personality Prompt (Fiction/RPG)
{
  id: 'character-personality-prompt',
  name: { ms: '🎭 Penjana Watak Cerita / RPG', en: '🎭 Character Personality Prompt (Fiction/RPG)' },
  category: 'Personal & Creative',
  description: {
    ms: 'Cipta profil watak lengkap untuk penulisan fiksyen atau permainan — termasuk trait, kelemahan, matlamat, dan arc watak.',
    en: 'Create a complete character profile for fiction or RPG — including traits, flaw, goal, and character arc.'
  },
  fields: [
    {
      name: 'Vibe',
      label: { ms: 'Gaya / Vibe Watak', en: 'Character Vibe' },
      placeholder: { ms: 'cth., Dark & mysterious, Innocent & curious, Bossy & flamboyant', en: 'e.g., Dark & mysterious, Innocent & curious, Bossy & flamboyant' },
      type: 'text'
    },
    {
      name: 'Latar',
      label: { ms: 'Latar Belakang / Dunia Watak', en: 'Backstory / Character World' },
      placeholder: { ms: 'cth., Dunia pasca-apokalips, Sekolah elit sihir, Bandar masa depan', en: 'e.g., Post-apocalyptic world, Elite magic school, Futuristic city' },
      type: 'textarea'
    },
    {
      name: 'Tujuan',
      label: { ms: 'Matlamat Watak', en: 'Character Goal' },
      placeholder: { ms: 'cth., Cari keluarga, Balas dendam, Jadi raja', en: 'e.g., Find their family, Seek revenge, Become king' },
      type: 'text'
    }
  ],
  template: {
    ms: `Berdasarkan maklumat ini, bina profil watak lengkap:

Vibe: [vibe]
Latar belakang: [latar]
Matlamat: [tujuan]

Hasilkan:
- Nama & ringkasan watak
- Trait utama & kelemahan
- Perwatakan & motivasi
- Arc pembangunan watak (perubahan dari mula ke akhir)

Gaya bahasa sesuai untuk penulisan kreatif atau permainan RPG.`,
    
    en: `Based on the following, generate a full character profile:

Vibe: [vibe]
Backstory: [latar]
Goal: [tujuan]

Include:
- Name & summary
- Core traits & flaws
- Personality & motivation
- Character arc (growth/change from start to end)

Use creative tone suitable for fiction writing or RPG gameplay.`
  }
},

// ✅ 29. Prompt Rewriter for Tone Matching
{
  id: 'prompt-tone-rewriter',
  name: { ms: '💬 Penukar Nada Teks', en: '💬 Prompt Rewriter for Tone Matching' },
  category: 'Personal & Creative',
  description: {
    ms: 'Tukar mesej atau ayat kepada nada yang lebih sesuai — contohnya lebih yakin, lebih lembut, lebih ringkas, atau lebih formal.',
    en: 'Rewrite a message or text to match a different tone — e.g., more confident, softer, simpler, or more formal.'
  },
  fields: [
    {
      name: 'Mesej',
      label: { ms: 'Mesej Asal', en: 'Original Message' },
      placeholder: { ms: 'cth., Saya tak setuju tapi tak tahu macam mana nak sampaikan...', en: 'e.g., I disagree but don’t know how to say it politely...' },
      type: 'textarea'
    },
    {
      name: 'Nada',
      label: { ms: 'Nada Sasaran', en: 'Target Tone' },
      placeholder: { ms: 'cth., Yakin, Lembut, Formal, Direct, Profesional', en: 'e.g., Confident, Gentle, Formal, Direct, Professional' },
      type: 'text'
    }
  ],
  template: {
    ms: `Tukar mesej berikut kepada nada [nada]:

[Mesej]

Pastikan mesej masih membawa maksud asal tetapi disampaikan dengan gaya dan nada yang lebih sesuai untuk [nada].`,
    
    en: `Rewrite the following message to match a [nada] tone:

[Mesej]

Make sure the core meaning stays the same, but the delivery is aligned with the target tone.`
  }
},

// ✅ 30. Rewrite My Idea into Viral Tweet
{
  id: 'viral-tweet-rewriter',
  name: { ms: '📝 Tukar Idea Jadi Tweet Viral', en: '📝 Rewrite My Idea into Viral Tweet' },
  category: 'Personal & Creative',
  description: {
    ms: 'Tukar idea atau mesej panjang kepada 3–5 versi tweet yang ringkas, padat, dan berpotensi viral.',
    en: 'Transform a long idea or message into 3–5 tweet versions that are short, punchy, and built for virality.'
  },
  fields: [
    {
      name: 'Idea',
      label: { ms: 'Idea / Mesej Asal', en: 'Original Idea / Message' },
      placeholder: { ms: 'cth., Ramai orang gagal sebab mereka terlalu fokus cari tools, bukan kemahiran...', en: 'e.g., Most people fail because they chase tools instead of skills...' },
      type: 'textarea'
    },
    {
      name: 'Gaya',
      label: { ms: 'Nada Tweet', en: 'Tweet Tone' },
      placeholder: { ms: 'cth., Satira, Motivasi, Serius, Penuh fakta', en: 'e.g., Satirical, Motivational, Serious, Data-backed' },
      type: 'text'
    }
  ],
  template: {
    ms: `Tukar idea berikut kepada 3–5 versi tweet yang berpotensi viral. Guna nada [gaya].

Idea asal:
[idea]

Pastikan setiap tweet padat, mudah difahami, dan sesuai untuk X/Twitter Malaysia. Gaya punchline, soalan provoke, atau format hook juga digalakkan.`,
    
    en: `Rewrite the following idea into 3–5 viral-style tweet versions using a [gaya] tone.

Original idea:
[idea]

Each tweet should be short, clear, and optimized for X/Twitter. Use punchlines, provocative questions, or hook formats where suitable.`
  }
},

  // 🔜 coming up next...
];
