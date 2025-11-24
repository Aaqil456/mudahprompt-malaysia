import { useLanguage } from '@/contexts/LanguageContext';
import { Card } from '@/components/ui/card';

export default function PrivacyPolicy() {
  const { t, lang } = useLanguage();

  const content = {
    ms: {
      title: 'Dasar Privasi',
      effectiveDate: '1 November 2025',
      sections: [
        {
          title: 'Pengenalan',
          content: `MudahPrompt komited untuk melindungi privasi pengguna kami. Dasar Privasi ini menerangkan bagaimana kami mengumpul, menggunakan, dan melindungi maklumat peribadi anda.

Kami mematuhi Akta Perlindungan Data Peribadi (PDPA) 2010 Malaysia dan peraturan perlindungan data yang berkaitan.`
        },
        {
          title: 'Maklumat Yang Dikumpul',
          content: `Kami mengumpul maklumat berikut:
• Maklumat akaun (nama, e-mel, gambar profil melalui Google OAuth)
• Data penggunaan (prompt yang dijana, interaksi dengan platform)
• Maklumat teknikal (alamat IP, jenis pelayar, peranti)
• Cookies dan teknologi penjejakan yang serupa`
        },
        {
          title: 'Penggunaan Maklumat',
          content: `Maklumat anda digunakan untuk:
• Menyediakan dan menambah baik perkhidmatan kami
• Memproses permintaan AI dan menjana respons
• Menganalisis penggunaan platform untuk peningkatan
• Komunikasi mengenai akaun dan perkhidmatan
• Mematuhi keperluan undang-undang`
        },
        {
          title: 'Perkongsian Data',
          content: `Kami tidak menjual data peribadi anda. Maklumat mungkin dikongsi dengan:
• Penyedia perkhidmatan pihak ketiga (Google untuk autentikasi)
• Pihak berkuasa undang-undang apabila diperlukan oleh undang-undang
• Rakan kongsi perniagaan dengan persetujuan anda`
        },
        {
          title: 'Perlindungan Data',
          content: `Kami melaksanakan langkah-langkah keselamatan termasuk:
• Enkripsi data dalam transit dan penyimpanan
• Akses terhad kepada maklumat peribadi
• Audit keselamatan berkala
• Mematuhi standard keselamatan industri`
        },
        {
          title: 'Hak Anda',
          content: `Di bawah PDPA 2010, anda mempunyai hak untuk:
• Mengakses data peribadi anda
• Membetulkan maklumat yang tidak tepat
• Meminta penghapusan data
• Menarik balik persetujuan
• Membuat aduan kepada Pesuruhjaya Perlindungan Data Peribadi`
        },
        {
          title: 'Hubungi Kami',
          content: `Untuk sebarang pertanyaan mengenai dasar privasi ini:
E-mel: contact@mudahprompt.com
Alamat: Kuala Lumpur, Malaysia`
        }
      ]
    },
    en: {
      title: 'Privacy Policy',
      effectiveDate: 'November 1, 2025',
      sections: [
        {
          title: 'Introduction',
          content: `MudahPrompt is committed to protecting the privacy of our users. This Privacy Policy explains how we collect, use, and protect your personal information.

We comply with Malaysia's Personal Data Protection Act (PDPA) 2010 and relevant data protection regulations.`
        },
        {
          title: 'Information We Collect',
          content: `We collect the following information:
• Account information (name, email, profile picture via Google OAuth)
• Usage data (prompts generated, platform interactions)
• Technical information (IP address, browser type, device)
• Cookies and similar tracking technologies`
        },
        {
          title: 'How We Use Information',
          content: `Your information is used to:
• Provide and improve our services
• Process AI requests and generate responses
• Analyze platform usage for improvements
• Communicate about your account and services
• Comply with legal requirements`
        },
        {
          title: 'Data Sharing',
          content: `We do not sell your personal data. Information may be shared with:
• Third-party service providers (Google for authentication)
• Legal authorities when required by law
• Business partners with your consent`
        },
        {
          title: 'Data Protection',
          content: `We implement security measures including:
• Data encryption in transit and storage
• Limited access to personal information
• Regular security audits
• Compliance with industry security standards`
        },
        {
          title: 'Your Rights',
          content: `Under PDPA 2010, you have the right to:
• Access your personal data
• Correct inaccurate information
• Request data deletion
• Withdraw consent
• Lodge complaints with the Personal Data Protection Commissioner`
        },
        {
          title: 'Contact Us',
          content: `For any questions about this privacy policy:
Email: contact@mudahprompt.com
Address: Kuala Lumpur, Malaysia`
        }
      ]
    }
  };

  const currentContent = content[lang];

  return (
    <div className="min-h-screen bg-background py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-4">{currentContent.title}</h1>
          <p className="text-muted-foreground">
            {t('legal.effectiveDate', { date: currentContent.effectiveDate })}
          </p>
        </div>

        <div className="space-y-8">
          {currentContent.sections.map((section, index) => (
            <Card key={index} className="card-gradient p-8">
              <h2 className="text-2xl font-semibold mb-4">{section.title}</h2>
              <div className="text-muted-foreground whitespace-pre-line leading-relaxed">
                {section.content}
              </div>
            </Card>
          ))}
        </div>

        <div className="mt-12 p-6 bg-muted/30 rounded-lg">
          <p className="text-sm text-muted-foreground text-center">
            {lang === 'ms'
              ? 'Dasar ini tertakluk kepada undang-undang Malaysia dan mematuhi PDPA 2010.'
              : 'This policy is governed by Malaysian law and complies with PDPA 2010.'
            }
          </p>
        </div>
      </div>
    </div>
  );
}