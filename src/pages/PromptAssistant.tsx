import { useState, useEffect, useRef } from 'react';
import { Search, Filter, Copy, Edit3, Save, Wand2, Settings, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/enhanced-button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card } from '@/components/ui/card';
import { useLanguage } from '@/contexts/LanguageContext';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';

// Comprehensive assistant data with detailed templates
const assistants = [
  {
    id: 'whatsapp-reply',
    name: '💬 Pembalas WhatsApp Panjang',
    category: 'Communication',
    description: {
      ms: 'Auto generate reply bila orang marah / bertanya / nak refund / puji kita.',
      en: 'Auto generate reply when people are angry / asking / want refund / praising us.'
    },
    fields: [
      { 
        name: 'Situasi',
        label: { ms: 'Situasi', en: 'Situation' },
        placeholder: { ms: 'cth., Pelanggan marah lambat reply, Nak refund barang, Puji produk kita', en: 'e.g., Customer angry slow reply, Want refund, Praise our product' },
        type: 'text'
      },
      { 
        name: 'Gaya',
        label: { ms: 'Gaya', en: 'Style' },
        placeholder: { ms: 'cth., Profesional + tenang, Mesra pelanggan, Sopan dan yakin', en: 'e.g., Professional + calm, Customer friendly, Polite and confident' },
        type: 'text'
      },
      { 
        name: 'Jenis Perniagaan',
        label: { ms: 'Jenis Perniagaan', en: 'Business Type' },
        placeholder: { ms: 'cth., Peniaga kecil, Customer service, Agent dropship', en: 'e.g., Small business, Customer service, Dropship agent' },
        type: 'text'
      },
      { 
        name: 'Maklumat Tambahan',
        label: { ms: 'Maklumat Tambahan', en: 'Additional Info' },
        placeholder: { ms: 'cth., Polisi refund, Masa operasi, Nombor telefon', en: 'e.g., Refund policy, Operating hours, Phone number' },
        type: 'text'
      }
    ],
    template: {
      ms: `Tulis jawapan WhatsApp yang professional untuk situasi ini:

Situasi: [situasi]
Gaya: [gaya]
Jenis Perniagaan: [jenisperniagaan]
Maklumat Tambahan: [maklumattambahan]

Panduan:
- Mulakan dengan salam dan pengakuan situasi
- Gunakan nada [gaya] yang sesuai untuk [jenisperniagaan]
- Berikan penyelesaian yang jelas dan praktikal
- Sertakan [maklumattambahan] jika relevan
- Akhiri dengan terima kasih dan harapan untuk terus berurusan
- Kekalkan profesionalisme walaupun dalam situasi sukar
- Gunakan bahasa yang mudah difahami dan mesra

Format jawapan dengan salam, kandungan utama, dan penutup yang sopan.`,
      en: `Write a professional WhatsApp reply for this situation:

Situation: [situasi]
Style: [gaya]
Business Type: [jenisperniagaan]
Additional Info: [maklumattambahan]

Guidelines:
- Start with greeting and acknowledge the situation
- Use [gaya] tone appropriate for [jenisperniagaan]
- Provide clear and practical solutions
- Include [maklumattambahan] if relevant
- End with thanks and hope for continued business
- Maintain professionalism even in difficult situations
- Use easy to understand and friendly language

Format reply with greeting, main content, and polite closing.`
    }
  },
  {
    id: 'concept-explainer',
    name: '🧠 Penjelasan Konsep Sukar dengan Gaya Mudah',
    category: 'Education',
    description: {
      ms: 'Contoh: Topik: Blockchain — Gaya: Macam ajar budak sekolah rendah',
      en: 'Example: Topic: Blockchain — Style: Like teaching primary school kids'
    },
    fields: [
      { 
        name: 'Topik',
        label: { ms: 'Topik', en: 'Topic' },
        placeholder: { ms: 'cth., Blockchain, Cryptocurrency, AI, Machine Learning', en: 'e.g., Blockchain, Cryptocurrency, AI, Machine Learning' },
        type: 'text'
      },
      { 
        name: 'Gaya',
        label: { ms: 'Gaya', en: 'Style' },
        placeholder: { ms: 'cth., Macam ajar budak sekolah rendah, Santai seperti TikTok, Formal tapi mudah', en: 'e.g., Like teaching primary school kids, Casual like TikTok, Formal but easy' },
        type: 'text'
      },
      { 
        name: 'Audience Sasaran',
        label: { ms: 'Audience Sasaran', en: 'Target Audience' },
        placeholder: { ms: 'cth., Student, Orang awam, TikTok content explainer', en: 'e.g., Student, General public, TikTok content explainer' },
        type: 'text'
      },
      { 
        name: 'Panjang',
        label: { ms: 'Panjang', en: 'Length' },
        placeholder: { ms: 'cth., 2-3 perenggan, 1 halaman, Bullet points sahaja', en: 'e.g., 2-3 paragraphs, 1 page, Bullet points only' },
        type: 'text'
      }
    ],
    template: {
      ms: `Jelaskan konsep sukar dengan gaya yang mudah difahami:

Topik: [topik]
Gaya: [gaya]
Audience Sasaran: [audiencesasaran]
Panjang: [panjang]

Panduan:
- Mulakan dengan analogi atau contoh yang mudah difahami
- Gunakan bahasa [gaya] yang sesuai untuk [audiencesasaran]
- Elakkan jargon teknikal, guna perkataan biasa
- Sertakan contoh praktikal atau situasi harian
- Buat perbandingan dengan benda yang biasa
- Pastikan penjelasan [panjang] dan tidak terlalu panjang
- Akhiri dengan ringkasan yang mudah diingat

Format penjelasan dengan pengenalan, kandungan utama, dan kesimpulan yang jelas.`,
      en: `Explain difficult concepts in an easy-to-understand style:

Topic: [topik]
Style: [gaya]
Target Audience: [audiencesasaran]
Length: [panjang]

Guidelines:
- Start with easy-to-understand analogies or examples
- Use [gaya] language appropriate for [audiencesasaran]
- Avoid technical jargon, use common words
- Include practical examples or daily situations
- Make comparisons with familiar things
- Ensure explanation is [panjang] and not too long
- End with memorable summary

Format explanation with introduction, main content, and clear conclusion.`
    }
  },
  {
    id: 'instagram-caption',
    name: '📷 Penulis Caption Instagram',
    category: 'Social Media',
    description: {
      ms: 'Contoh: Gambar: Travel ke Langkawi — Gaya: Lucu dan chill',
      en: 'Example: Image: Travel to Langkawi — Style: Funny and chill'
    },
    fields: [
      { 
        name: 'Jenis Gambar',
        label: { ms: 'Jenis Gambar', en: 'Image Type' },
        placeholder: { ms: 'cth., Travel ke Langkawi, Makanan, Selfie, Produk', en: 'e.g., Travel to Langkawi, Food, Selfie, Product' },
        type: 'text'
      },
      { 
        name: 'Gaya',
        label: { ms: 'Gaya', en: 'Style' },
        placeholder: { ms: 'cth., Lucu dan chill, Professional, Inspirasi, Santai', en: 'e.g., Funny and chill, Professional, Inspirational, Casual' },
        type: 'text'
      },
      { 
        name: 'Audience',
        label: { ms: 'Audience', en: 'Audience' },
        placeholder: { ms: 'cth., Rakan-rakan, Pelanggan, Followers Instagram', en: 'e.g., Friends, Customers, Instagram followers' },
        type: 'text'
      },
      { 
        name: 'Mesej Utama',
        label: { ms: 'Mesej Utama', en: 'Main Message' },
        placeholder: { ms: 'cth., Promosi produk, Kongsi pengalaman, Hibur followers', en: 'e.g., Promote product, Share experience, Entertain followers' },
        type: 'text'
      }
    ],
    template: {
      ms: `Tulis caption Instagram yang menarik untuk gambar ini:

Jenis Gambar: [jenisgambar]
Gaya: [gaya]
Audience: [audience]
Mesej Utama: [mesejutama]

Panduan:
- Mulakan dengan hook yang menarik perhatian
- Gunakan gaya [gaya] yang sesuai untuk [audience]
- Sertakan emoji yang relevan dengan [jenisgambar]
- Buat caption yang relatable dan engaging
- Sampaikan [mesejutama] dengan cara yang natural
- Gunakan hashtag yang relevan (3-5 hashtag)
- Akhiri dengan call-to-action yang sesuai
- Pastikan panjang sesuai untuk Instagram (tidak terlalu panjang)

Format caption dengan hook, kandungan utama, hashtag, dan call-to-action.`,
      en: `Write an engaging Instagram caption for this image:

Image Type: [jenisgambar]
Style: [gaya]
Audience: [audience]
Main Message: [mesejutama]

Guidelines:
- Start with an attention-grabbing hook
- Use [gaya] style appropriate for [audience]
- Include emojis relevant to [jenisgambar]
- Create relatable and engaging caption
- Convey [mesejutama] naturally
- Use relevant hashtags (3-5 hashtags)
- End with appropriate call-to-action
- Ensure length suitable for Instagram (not too long)

Format caption with hook, main content, hashtags, and call-to-action.`
    }
  },
  {
    id: 'resume-interview',
    name: '📄 Penulis Resume & Jawapan Temuduga',
    category: 'Career',
    description: {
      ms: 'Contoh: Jawatan dipohon: Marketing Exec — Gaya: Yakin + sopan',
      en: 'Example: Position applied: Marketing Exec — Style: Confident + polite'
    },
    fields: [
      { 
        name: 'Jawatan Dipohon',
        label: { ms: 'Jawatan Dipohon', en: 'Position Applied' },
        placeholder: { ms: 'cth., Marketing Executive, Software Engineer, Sales Manager', en: 'e.g., Marketing Executive, Software Engineer, Sales Manager' },
        type: 'text'
      },
      { 
        name: 'Gaya',
        label: { ms: 'Gaya', en: 'Style' },
        placeholder: { ms: 'cth., Yakin + sopan, Professional, Bersemangat', en: 'e.g., Confident + polite, Professional, Enthusiastic' },
        type: 'text'
      },
      { 
        name: 'Pengalaman',
        label: { ms: 'Pengalaman', en: 'Experience' },
        placeholder: { ms: 'cth., 2 tahun dalam digital marketing, Fresh graduate, 5 tahun dalam sales', en: 'e.g., 2 years in digital marketing, Fresh graduate, 5 years in sales' },
        type: 'text'
      },
      { 
        name: 'Kemahiran Utama',
        label: { ms: 'Kemahiran Utama', en: 'Key Skills' },
        placeholder: { ms: 'cth., Digital marketing, Leadership, Communication, Technical skills', en: 'e.g., Digital marketing, Leadership, Communication, Technical skills' },
        type: 'text'
      }
    ],
    template: {
      ms: `Tulis resume atau jawapan temuduga yang professional:

Jawatan Dipohon: [jawatandipohon]
Gaya: [gaya]
Pengalaman: [pengalaman]
Kemahiran Utama: [kemahiranutama]

Panduan:
- Mulakan dengan ringkasan yang menarik dan relevan
- Gunakan gaya [gaya] yang menunjukkan keyakinan
- Highlight [kemahiranutama] yang sesuai untuk [jawatandipohon]
- Sertakan pencapaian konkrit dan measurable
- Gunakan action verbs yang kuat
- Pastikan format yang kemas dan mudah dibaca
- Akhiri dengan objektif kerjaya yang jelas
- Sesuai untuk student & jobseeker

Format resume dengan ringkasan, pengalaman, kemahiran, dan objektif yang jelas.`,
      en: `Write a professional resume or interview answer:

Position Applied: [jawatandipohon]
Style: [gaya]
Experience: [pengalaman]
Key Skills: [kemahiranutama]

Guidelines:
- Start with engaging and relevant summary
- Use [gaya] style that shows confidence
- Highlight [kemahiranutama] relevant to [jawatandipohon]
- Include concrete and measurable achievements
- Use strong action verbs
- Ensure neat and readable format
- End with clear career objective
- Suitable for students & jobseekers

Format resume with summary, experience, skills, and clear objectives.`
    }
  },
  {
    id: 'shopee-seller',
    name: '🛒 Penjual Shopee – Jawapan Chat Pelanggan',
    category: 'E-commerce',
    description: {
      ms: 'Contoh: Pelanggan tanya: Barang ni ready stock ke?',
      en: 'Example: Customer asks: Is this item in stock?'
    },
    fields: [
      { 
        name: 'Soalan Pelanggan',
        label: { ms: 'Soalan Pelanggan', en: 'Customer Question' },
        placeholder: { ms: 'cth., Barang ni ready stock ke?, Boleh nego harga tak?, Bila sampai?', en: 'e.g., Is this item in stock?, Can negotiate price?, When will it arrive?' },
        type: 'text'
      },
      { 
        name: 'Jenis Produk',
        label: { ms: 'Jenis Produk', en: 'Product Type' },
        placeholder: { ms: 'cth., Pakaian, Elektronik, Makanan, Kecantikan', en: 'e.g., Clothing, Electronics, Food, Beauty' },
        type: 'text'
      },
      { 
        name: 'Gaya Jawapan',
        label: { ms: 'Gaya Jawapan', en: 'Answer Style' },
        placeholder: { ms: 'cth., Mesra pelanggan + cepat + info lengkap, Professional, Santai', en: 'e.g., Customer friendly + quick + complete info, Professional, Casual' },
        type: 'text'
      },
      { 
        name: 'Maklumat Penting',
        label: { ms: 'Maklumat Penting', en: 'Important Info' },
        placeholder: { ms: 'cth., Stock status, Harga, Masa penghantaran, Warranty', en: 'e.g., Stock status, Price, Delivery time, Warranty' },
        type: 'text'
      }
    ],
    template: {
      ms: `Tulis jawapan chat Shopee yang mesra pelanggan:

Soalan Pelanggan: [soalanpelanggan]
Jenis Produk: [jenisproduk]
Gaya Jawapan: [gayajawapan]
Maklumat Penting: [maklumatpenting]

Panduan:
- Mulakan dengan salam dan terima kasih atas pertanyaan
- Berikan jawapan yang [gayajawapan] untuk [jenisproduk]
- Sertakan [maklumatpenting] yang relevan
- Gunakan bahasa yang mesra dan professional
- Berikan maklumat yang lengkap dan tepat
- Akhiri dengan terima kasih dan harapan untuk jualan
- Kekalkan nada positif dan membantu

Format jawapan dengan salam, maklumat lengkap, dan penutup yang mesra.`,
      en: `Write a customer-friendly Shopee chat reply:

Customer Question: [soalanpelanggan]
Product Type: [jenisproduk]
Answer Style: [gayajawapan]
Important Info: [maklumatpenting]

Guidelines:
- Start with greeting and thanks for the question
- Provide [gayajawapan] answer for [jenisproduk]
- Include relevant [maklumatpenting]
- Use friendly and professional language
- Provide complete and accurate information
- End with thanks and hope for sale
- Maintain positive and helpful tone

Format reply with greeting, complete information, and friendly closing.`
    }
  },
  {
    id: 'study-notes',
    name: '🎓 Ringkasan Nota Sekolah / IPTA',
    category: 'Education',
    description: {
      ms: 'Contoh: Topik: Prinsip Akaun Bab 3',
      en: 'Example: Topic: Accounting Principles Chapter 3'
    },
    fields: [
      { 
        name: 'Topik',
        label: { ms: 'Topik', en: 'Topic' },
        placeholder: { ms: 'cth., Prinsip Akaun Bab 3, Matematik Tambahan, Sejarah', en: 'e.g., Accounting Principles Chapter 3, Additional Mathematics, History' },
        type: 'text'
      },
      { 
        name: 'Jenis Nota',
        label: { ms: 'Jenis Nota', en: 'Note Type' },
        placeholder: { ms: 'cth., Bab buku teks, Kuliah, Tutorial, Assignment', en: 'e.g., Textbook chapter, Lecture, Tutorial, Assignment' },
        type: 'text'
      },
      { 
        name: 'Gaya Ringkasan',
        label: { ms: 'Gaya Ringkasan', en: 'Summary Style' },
        placeholder: { ms: 'cth., Bullet point, Mind map, Flow chart, Perenggan', en: 'e.g., Bullet point, Mind map, Flow chart, Paragraph' },
        type: 'text'
      },
      { 
        name: 'Objektif',
        label: { ms: 'Objektif', en: 'Objective' },
        placeholder: { ms: 'cth., Mudah faham, Boleh hafal, Untuk exam, Untuk presentation', en: 'e.g., Easy to understand, Can memorize, For exam, For presentation' },
        type: 'text'
      }
    ],
    template: {
      ms: `Ringkaskan nota pembelajaran dengan format yang mudah difahami:

Topik: [topik]
Jenis Nota: [jenisnota]
Gaya Ringkasan: [gayaringkasan]
Objektif: [objektif]

Panduan:
- Mulakan dengan konsep utama dan definisi penting
- Gunakan format [gayaringkasan] yang sesuai untuk [objektif]
- Highlight poin-poin utama dan formula penting
- Sertakan contoh atau aplikasi praktikal
- Buat ringkasan yang mudah faham dan boleh hafal
- Kekalkan struktur yang logik dan tersusun
- Akhiri dengan ringkasan atau kesimpulan utama
- Boleh tarik student untuk belajar dengan lebih efektif

Format ringkasan dengan pengenalan, kandungan utama, dan kesimpulan yang jelas.`,
      en: `Summarize learning notes in an easy-to-understand format:

Topic: [topik]
Note Type: [jenisnota]
Summary Style: [gayaringkasan]
Objective: [objektif]

Guidelines:
- Start with main concepts and important definitions
- Use [gayaringkasan] format suitable for [objektif]
- Highlight main points and important formulas
- Include examples or practical applications
- Create summary that's easy to understand and memorize
- Maintain logical and organized structure
- End with summary or main conclusion
- Can attract students to study more effectively

Format summary with introduction, main content, and clear conclusion.`
    }
  },
  {
    id: 'content-ideas',
    name: '🎥 Penjana Idea Content Harian',
    category: 'Content Creation',
    description: {
      ms: 'Contoh: Niche: Kesihatan wanita — Platform: TikTok — Gaya: Storytelling',
      en: 'Example: Niche: Women\'s health — Platform: TikTok — Style: Storytelling'
    },
    fields: [
      { 
        name: 'Niche',
        label: { ms: 'Niche', en: 'Niche' },
        placeholder: { ms: 'cth., Kesihatan wanita, Perniagaan, Teknologi, Pendidikan', en: 'e.g., Women\'s health, Business, Technology, Education' },
        type: 'text'
      },
      { 
        name: 'Platform',
        label: { ms: 'Platform', en: 'Platform' },
        placeholder: { ms: 'cth., TikTok, Instagram, YouTube, LinkedIn', en: 'e.g., TikTok, Instagram, YouTube, LinkedIn' },
        type: 'text'
      },
      { 
        name: 'Gaya',
        label: { ms: 'Gaya', en: 'Style' },
        placeholder: { ms: 'cth., Storytelling, Educational, Entertainment, Motivational', en: 'e.g., Storytelling, Educational, Entertainment, Motivational' },
        type: 'text'
      },
      { 
        name: 'Audience',
        label: { ms: 'Audience', en: 'Audience' },
        placeholder: { ms: 'cth., Wanita 18-35, Usahawan, Pelajar, Profesional', en: 'e.g., Women 18-35, Entrepreneurs, Students, Professionals' },
        type: 'text'
      }
    ],
    template: {
      ms: `Jana idea content harian yang menarik untuk platform ini:

Niche: [niche]
Platform: [platform]
Gaya: [gaya]
Audience: [audience]

Panduan:
- Jana 5 idea content yang berbeza untuk seminggu
- Setiap idea mesti sesuai untuk [platform] dan [gaya]
- Fokus pada [niche] yang menarik untuk [audience]
- Sertakan format content yang sesuai (video, post, story)
- Buat idea yang trending dan boleh viral
- Pastikan idea praktikal dan boleh dihasilkan
- Sertakan hook atau angle yang menarik
- Boleh tarik creator kecil & influencer baru

Format idea dengan tajuk, konsep, format, dan angle yang jelas untuk setiap idea.`,
      en: `Generate engaging daily content ideas for this platform:

Niche: [niche]
Platform: [platform]
Style: [gaya]
Audience: [audience]

Guidelines:
- Generate 5 different content ideas for a week
- Each idea must be suitable for [platform] and [gaya]
- Focus on [niche] that's interesting for [audience]
- Include suitable content format (video, post, story)
- Create trending and viral ideas
- Ensure ideas are practical and producible
- Include engaging hooks or angles
- Can attract small creators & new influencers

Format idea with title, concept, format, and clear angle for each idea.`
    }
  },
  {
    id: 'selling-thread-ig',
    name: '🧵 Penulis Thread Instagram Jualan Produk Sendiri',
    category: 'Marketing',
    description: {
      ms: 'Cipta thread Instagram gaya borak mamak untuk jual produk sendiri (digital/fizikal, ebook, kursus, dll.) secara direct.',
      en: 'Create Instagram thread in mamak chat style to sell your own products (digital/physical, ebook, course, etc.) directly.'
    },
    fields: [
      { 
        name: 'Nama Produk',
        label: { ms: 'Nama Produk', en: 'Product Name' },
        placeholder: { ms: 'cth., Ebook Rahsia Bisnes, Kursus Canva, Baju Muslimah, Software Kewangan', en: 'e.g., Business Secrets Ebook, Canva Course, Muslimah Dress, Finance Software' },
        type: 'text'
      },
      { 
        name: 'Jenis Produk',
        label: { ms: 'Jenis Produk', en: 'Product Type' },
        placeholder: { ms: 'cth., Digital, Fizikal', en: 'e.g., Digital, Physical' },
        type: 'text'
      },
      { 
        name: 'Kelebihan Produk',
        label: { ms: 'Kelebihan Produk', en: 'Product Benefits' },
        placeholder: { ms: 'cth., Mudah digunakan, Harga berbaloi, Support sepanjang tahun', en: 'e.g., Easy to use, Worth the price, Year-round support' },
        type: 'text'
      },
      { 
        name: 'Harga',
        label: { ms: 'Harga', en: 'Price' },
        placeholder: { ms: 'cth., RM49, RM199, RM99/bulan', en: 'e.g., RM49, RM199, RM99/month' },
        type: 'text'
      },
      { 
        name: 'Audience Sasaran',
        label: { ms: 'Audience Sasaran', en: 'Target Audience' },
        placeholder: { ms: 'cth., Usahawan baru, Pelajar, Ibu bekerja, Freelancer', en: 'e.g., New entrepreneurs, Students, Working mothers, Freelancers' },
        type: 'text'
      },
      { 
        name: 'Nada & Gaya',
        label: { ms: 'Nada & Gaya', en: 'Tone & Style' },
        placeholder: { ms: 'cth., Borak mamak, Santai, Yakin, Sarkastik', en: 'e.g., Mamak chat, Casual, Confident, Sarcastic' },
        type: 'text'
      },
      { 
        name: 'Link Pembelian',
        label: { ms: 'Link Pembelian', en: 'Purchase Link' },
        placeholder: { ms: 'cth., https://websiteanda.com/beli', en: 'e.g., https://yourwebsite.com/buy' },
        type: 'text'
      }
    ],
    template: {
      ms: `Tulis thread Instagram gaya borak mamak untuk promosikan produk sendiri (bukan affiliate/Shopee). Fokus pada keunikan dan kelebihan produk, sesuai untuk jualan direct.

Nama Produk: [namaproduk]
Jenis Produk: [jenisproduk]
Kelebihan Produk: [kelebihanproduk]
Harga: [harga]
Audience Sasaran: [audiencesasaran]
Nada & Gaya: [nada&gaya]
Link Pembelian: [linkpembelian]

Panduan:
- Mulakan dengan hook yang lucu, relatable atau menyindir manja
- Ceritakan masalah yang biasa dihadapi audience dan kaitkan dengan produk
- Highlight kelebihan utama produk dengan gaya [nada&gaya]
- Nyatakan harga dan kenapa berbaloi
- Akhiri dengan CTA santai dan letakkan link pembelian

Tulis 4–6 post pendek bergaya Threads (1–3 ayat per post), guna emoji dan gaya santai Malaysia.

Akhir sekali, letakkan:
👉 [linkpembelian]`,
      en: `Write Instagram thread in mamak chat style to promote your own products (not affiliate/Shopee). Focus on product uniqueness and benefits, suitable for direct sales.

Product Name: [namaproduk]
Product Type: [jenisproduk]
Product Benefits: [kelebihanproduk]
Price: [harga]
Target Audience: [audiencesasaran]
Tone & Style: [nada&gaya]
Purchase Link: [linkpembelian]

Guidelines:
- Start with funny, relatable or gently sarcastic hook
- Tell story about common problems audience faces and link to product
- Highlight main product benefits with [nada&gaya] style
- State price and why it's worth it
- End with casual CTA and place purchase link

Write 4–6 short posts in Threads style (1–3 sentences per post), use emojis and casual Malaysian style.

Finally, place:
👉 [linkpembelian]`
    }
  },
  {
    id: 'shopee-thread-ig',
    name: '🧵 Penulis Thread IG Shopee (2 Info Sahaja)',
    category: 'Affiliate Marketing',
    description: {
      ms: 'Cipta thread Instagram Shopee hanya dengan info produk dan link komisen.',
      en: 'Create Instagram thread for Shopee with just product info and commission link.'
    },
    fields: [
      { 
        name: 'Info Produk',
        label: { ms: 'Info Produk', en: 'Product Info' },
        placeholder: { ms: 'cth., Mesin Basuh Mini Portable, Cuci baju tanpa mesin besar, Jimat ruang, Harga RM59 – RM89', en: 'e.g., Mini Portable Washing Machine, Wash clothes without big machine, Save space, Price RM59 – RM89' },
        type: 'text'
      },
      { 
        name: 'Link Komisen',
        label: { ms: 'Link Komisen', en: 'Commission Link' },
        placeholder: { ms: 'cth., https://shope.ee/xxxxxxx', en: 'e.g., https://shope.ee/xxxxxxx' },
        type: 'text'
      }
    ],
    template: {
      ms: `Tulis thread Instagram gaya penceritaan santai untuk promosikan produk Shopee ini. Elakkan gaya terlalu kolokial, tapi kekalkan nada mesra dan mudah difahami.

Info Produk: [infoproduk]
Link Komisen: [linkkomisen]

Panduan:
- Mulakan dengan ayat hook yang menarik dan relatable
- Ceritakan kisah atau situasi yang menggambarkan keperluan atau kelebihan produk
- Tekankan manfaat utama produk dengan cara yang jujur dan meyakinkan
- Akhiri dengan ajakan sopan untuk mencuba dan letakkan link komisen

Tulis 3–5 post pendek bergaya Threads (1–2 ayat per post), guna emoji dan bahasa santai yang sopan.

Akhir sekali, letakkan:
👉 [linkkomisen]. Ingat gaya jualan mestilah soft sale dan secara jelas nyatakan masalah dan penyelesaian`,
      en: `Write Instagram thread in casual storytelling style to promote this Shopee product. Avoid overly colloquial style, but maintain friendly and easy-to-understand tone.

Product Info: [infoproduk]
Commission Link: [linkkomisen]

Guidelines:
- Start with engaging and relatable hook sentence
- Tell story or situation that illustrates product need or benefits
- Emphasize main product benefits in honest and convincing way
- End with polite invitation to try and place commission link

Write 3–5 short posts in Threads style (1–2 sentences per post), use emojis and polite casual language.

Finally, place:
👉 [linkkomisen]. Remember sales style must be soft sale and clearly state problem and solution`
    }
  }
];

// RequestQueue class for spacing tasks
class RequestQueue {
  private queue: (() => Promise<void>)[] = [];
  private isProcessing = false;
  private readonly delay = 1000; // ~1000ms spacing

  async add<T>(task: () => Promise<T>): Promise<T> {
    return new Promise((resolve, reject) => {
      this.queue.push(async () => {
        try {
          const result = await task();
          resolve(result);
        } catch (error) {
          reject(error);
        }
      });
      this.process();
    });
  }

  private async process() {
    if (this.isProcessing || this.queue.length === 0) return;
    
    this.isProcessing = true;
    
    while (this.queue.length > 0) {
      const task = this.queue.shift();
      if (task) {
        await task();
        if (this.queue.length > 0) {
          await new Promise(resolve => setTimeout(resolve, this.delay));
        }
      }
    }
    
    this.isProcessing = false;
  }
}

const requestQueue = new RequestQueue();

export default function PromptAssistant() {
  const { lang, t } = useLanguage();
  const { toast } = useToast();
  const fieldsContainerRef = useRef<HTMLDivElement>(null);
  
  const [selectedAssistant, setSelectedAssistant] = useState(assistants[0]);
  const [fieldValues, setFieldValues] = useState<Record<string, string>>({});
  const [generatedPrompt, setGeneratedPrompt] = useState('');
  const [editedPrompt, setEditedPrompt] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [customInstructions, setCustomInstructions] = useState('');
  const [aiAnswer, setAiAnswer] = useState('');
  const [isGettingAnswer, setIsGettingAnswer] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [isLoadingInstruction, setIsLoadingInstruction] = useState(false);
  const [isEditingInstruction, setIsEditingInstruction] = useState(false);
  const [instructionSaved, setInstructionSaved] = useState(false);

  // Load custom instructions when assistant changes
  useEffect(() => {
    loadCustomInstructions();
  }, [selectedAssistant.id]);

  // Auto-scroll when assistant is selected
  useEffect(() => {
    if (fieldsContainerRef.current) {
      const timeout = setTimeout(() => {
        const navbarHeight = 80; // Approximate navbar height
        const elementPosition = fieldsContainerRef.current!.offsetTop - navbarHeight - 20; // 20px extra padding
        window.scrollTo({
          top: elementPosition,
          behavior: 'smooth'
        });
      }, 150); // Slightly longer delay to ensure DOM is updated
      
      return () => clearTimeout(timeout);
    }
  }, [selectedAssistant.id]);

  const loadCustomInstructions = async () => {
    try {
      setIsLoadingInstruction(true);
      setInstructionSaved(false);
      
      // Mock API call - replace with actual implementation
      const defaultInstruction = lang === 'ms' 
        ? 'Anda adalah pembantu AI yang membantu pengguna menjana prompt berkualiti tinggi. Berikan respons yang tepat dan berguna.'
        : 'You are an AI assistant that helps users generate high-quality prompts. Provide accurate and helpful responses.';
      
      setCustomInstructions(defaultInstruction);
    } catch (error) {
      console.error('Failed to load custom instructions:', error);
    } finally {
      setIsLoadingInstruction(false);
    }
  };

  const saveCustomInstructions = async () => {
    if (!selectedAssistant) return;
    setIsLoadingInstruction(true);
    try {
      await requestQueue.add(async () => {
        // Mock API call - replace with actual implementation
        console.log('Saving custom instructions:', {
          assistantId: selectedAssistant.id,
          instructions: customInstructions
        });
      });
      
      setIsEditingInstruction(false);
      setInstructionSaved(true);
      toast({
        title: t('common.save'),
        description: 'Custom instructions saved successfully',
      });
    } catch (error) {
      console.error('Failed to save custom instructions:', error);
    } finally {
      setIsLoadingInstruction(false);
    }
  };

  const handleEditInstruction = () => {
    setIsEditingInstruction(true);
    setInstructionSaved(false);
  };

  const generatePrompt = async () => {
    if (selectedAssistant && Object.keys(fieldValues).length > 0) {
      setIsGenerating(true);
      
      try {
        await requestQueue.add(async () => {
          let prompt = selectedAssistant.template[lang];
          
          // Create field mappings using the improved logic from the other project
          const fieldMappings: Record<string, string> = {};
          selectedAssistant.fields.forEach((field: any) => {
            const fieldKey = field.name.toLowerCase().replace(/\s+/g, '');
            fieldMappings[fieldKey] = fieldValues[field.name] || '';
          });

          // Replace placeholders using the field mappings
          Object.entries(fieldMappings).forEach(([key, value]) => {
            const placeholder = new RegExp(`\\[${key}\\]`, 'g');
            prompt = prompt.replace(placeholder, value);
          });
          
          setGeneratedPrompt(prompt);
          setEditedPrompt(prompt);
          setIsEditing(false);
          
          // Save to history (fire-and-forget)
          savePromptHistory(prompt);
        });
      } catch (error) {
        console.error('Error generating prompt:', error);
      } finally {
        setIsGenerating(false);
      }
    }
  };

  const savePromptHistory = async (prompt: string) => {
    try {
      // Fire-and-forget POST request
      fetch('/api/save-prompt-history', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          assistantId: selectedAssistant.id,
          prompt
        })
      }).catch(err => console.error('History save failed:', err));
    } catch (error) {
      console.error('Failed to save prompt history:', error);
    }
  };

  const savePrompt = () => {
    setGeneratedPrompt(editedPrompt);
    setIsEditing(false);
    toast({
      title: t('assistant.savePrompt'),
      description: 'Prompt saved successfully',
    });
  };

  const copyPrompt = async () => {
    const textToCopy = isEditing ? editedPrompt : generatedPrompt;
    try {
      await navigator.clipboard.writeText(textToCopy);
      toast({
        title: t('assistant.copyPrompt'),
        description: 'Prompt copied to clipboard',
      });
    } catch (error) {
      console.error('Failed to copy prompt:', error);
    }
  };

  const getAiAnswer = async () => {
    if (!generatedPrompt) return;
    
    setIsGettingAnswer(true);
    
    try {
      await requestQueue.add(async () => {
        const response = await fetch('/api/gemini-assist', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            promptText: generatedPrompt,
            assistantId: selectedAssistant.id,
            systemInstruction: customInstructions
          })
        });
        const raw = await response.text();
        let data: any = {};
        try {
          data = raw ? JSON.parse(raw) : {};
        } catch (e) {
          throw new Error(raw || 'Invalid JSON from /api/gemini-assist');
        }
        if (!response.ok) {
          const message = data?.error || `HTTP ${response.status}`;
          throw new Error(message);
        }
        setAiAnswer(data.answer || data.revisedPrompt || 'No answer received');
      });
    } catch (error) {
      console.error('Error getting AI answer:', error);
      setAiAnswer(String((error as Error)?.message || error) || 'Error getting AI response. Please try again.');
    } finally {
      setIsGettingAnswer(false);
    }
  };

  const filteredAssistants = assistants.filter(assistant => {
    const matchesSearch = assistant.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         assistant.description[lang].toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || assistant.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const categories = ['All', ...Array.from(new Set(assistants.map(a => a.category)))];

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-4">{t('assistant.title')}</h1>
          <p className="text-muted-foreground">
            {lang === 'ms' 
              ? 'Pilih pembantu AI dan isi maklumat yang diperlukan untuk menjana prompt yang sempurna'
              : 'Select an AI assistant and fill in the required information to generate the perfect prompt'
            }
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Assistant Selection Sidebar */}
          <div className="lg:col-span-1">
            <Card className="card-gradient p-6 sticky top-24">
              <div className="mb-6">
                <h2 className="font-semibold mb-4">{t('assistant.selectAssistant')}</h2>
                
                {/* Search */}
                <div className="relative mb-4">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder={t('common.search')}
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>

                {/* Category Filter */}
                <div className="mb-4">
                  <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="w-full p-2 rounded-lg border border-border bg-background text-foreground"
                  >
                    {categories.map(category => (
                      <option key={category} value={category}>{category}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Assistant List - Scrollable Container */}
              <div className="max-h-[calc(100vh-300px)] overflow-y-auto pr-2 space-y-3">
                {filteredAssistants.map((assistant) => (
                  <button
                    key={assistant.id}
                    onClick={() => {
                      setSelectedAssistant(assistant);
                      setFieldValues({});
                      setGeneratedPrompt("");
                      setAiAnswer("");
                    }}
                    className={cn(
                      "w-full text-left p-4 rounded-lg border transition-all duration-200",
                      selectedAssistant.id === assistant.id
                        ? "border-primary bg-primary/5"
                        : "border-border hover:border-primary/50 hover:bg-primary/5"
                    )}
                  >
                    <div className="font-medium mb-1">{assistant.name}</div>
                    <div className="text-sm text-muted-foreground mb-2">
                      {assistant.description[lang]}
                    </div>
                    <div className="text-xs bg-accent/20 text-accent-foreground px-2 py-1 rounded inline-block">
                      {assistant.category}
                    </div>
                  </button>
                ))}
              </div>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Fields Container */}
            <div ref={fieldsContainerRef}>
              <Card className="card-gradient p-6">
                <h3 className="font-semibold mb-4">{selectedAssistant.name}</h3>
                <p className="text-muted-foreground mb-6">
                  {selectedAssistant.description[lang]}
                </p>

                <div className="grid gap-4">
                  {selectedAssistant.fields.map((field) => (
                    <div key={field.name}>
                      <label className="block text-sm font-medium mb-2">
                        {field.label[lang]}
                      </label>
                      <Input
                        placeholder={field.placeholder[lang]}
                        value={fieldValues[field.name] || ''}
                        onChange={(e) => setFieldValues(prev => ({
                          ...prev,
                          [field.name]: e.target.value
                        }))}
                      />
                    </div>
                  ))}
                </div>

                <Button
                  onClick={generatePrompt}
                  disabled={!selectedAssistant || Object.keys(fieldValues).length === 0 || isGenerating}
                  className="w-full mt-6"
                  variant="accent"
                >
                  {isGenerating ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-current mr-2" />
                      {t('common.loading')}
                    </>
                  ) : (
                    <>
                      <Wand2 className="h-4 w-4 mr-2" />
                      {t('assistant.generatePrompt')}
                    </>
                  )}
                </Button>
              </Card>
            </div>

            {/* Generated Prompt */}
            {generatedPrompt && (
              <Card className="card-gradient p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold">Generated Prompt</h3>
                  <div className="flex gap-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setIsEditing(!isEditing)}
                    >
                      <Edit3 className="h-4 w-4 mr-2" />
                      {t('assistant.editPrompt')}
                    </Button>
                    {isEditing && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={savePrompt}
                      >
                        <Save className="h-4 w-4 mr-2" />
                        {t('assistant.savePrompt')}
                      </Button>
                    )}
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={copyPrompt}
                    >
                      <Copy className="h-4 w-4 mr-2" />
                      {t('assistant.copyPrompt')}
                    </Button>
                  </div>
                </div>

                {isEditing ? (
                  <Textarea
                    value={editedPrompt}
                    onChange={(e) => setEditedPrompt(e.target.value)}
                    rows={6}
                    className="mb-4"
                  />
                ) : (
                  <div className="p-4 bg-muted/30 rounded-lg mb-4 whitespace-pre-wrap">
                    {generatedPrompt}
                  </div>
                )}

                <Button
                  onClick={getAiAnswer}
                  disabled={isGettingAnswer}
                  variant="default"
                >
                  {isGettingAnswer ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-current mr-2" />
                      Getting Answer...
                    </>
                  ) : (
                    'Get AI Answer'
                  )}
                </Button>
              </Card>
            )}

            {/* AI Answer */}
            {aiAnswer && (
              <Card className="card-gradient p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold">{t('assistant.aiAnswer')}</h3>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => navigator.clipboard.writeText(aiAnswer)}
                  >
                    <Copy className="h-4 w-4 mr-2" />
                    {t('common.copy')}
                  </Button>
                </div>
                <div className="p-4 bg-muted/30 rounded-lg whitespace-pre-wrap">
                  {aiAnswer}
                </div>
              </Card>
            )}

            {/* Custom Instructions */}
            <Card className="card-gradient p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold flex items-center">
                  <Settings className="h-4 w-4 mr-2" />
                  {t('assistant.customInstructions')}
                </h3>
                <div className="flex gap-2">
                  {!isEditingInstruction ? (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={handleEditInstruction}
                    >
                      <Edit3 className="h-4 w-4 mr-2" />
                      Edit Arahan
                    </Button>
                  ) : (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={saveCustomInstructions}
                      disabled={isLoadingInstruction}
                    >
                      <Save className="h-4 w-4 mr-2" />
                      Simpan Arahan
                    </Button>
                  )}
                  {instructionSaved && <span className="text-green-600 text-sm">Disimpan!</span>}
                </div>
              </div>
              {isLoadingInstruction ? (
                <p>Memuatkan arahan...</p>
              ) : (
                <Textarea
                  value={customInstructions}
                  onChange={(e) => setCustomInstructions(e.target.value)}
                  readOnly={!isEditingInstruction}
                  rows={4}
                  placeholder={lang === 'ms' 
                    ? 'Masukkan arahan khas untuk pembantu AI...'
                    : 'Enter custom instructions for the AI assistant...'
                  }
                />
              )}
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}