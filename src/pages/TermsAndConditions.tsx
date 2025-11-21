import { useLanguage } from '@/contexts/LanguageContext';
import { Card } from '@/components/ui/card';

export default function TermsAndConditions() {
  const { t, lang } = useLanguage();

  const content = {
    ms: {
      title: 'Terma & Syarat',
      effectiveDate: '1 Januari 2024',
      sections: [
        {
          title: 'Penerimaan Terma',
          content: `Dengan menggunakan MudahPrompt, anda bersetuju untuk terikat dengan terma dan syarat ini. Jika anda tidak bersetuju, sila jangan gunakan perkhidmatan kami.

Terma ini tertakluk kepada undang-undang Malaysia.`
        },
        {
          title: 'Perkhidmatan',
          content: `MudahPrompt menyediakan platform AI untuk menjana prompt berkualiti tinggi dalam Bahasa Malaysia dan Inggeris.

Perkhidmatan termasuk:
• Akses kepada pembantu AI yang pelbagai
• Penjanaan dan pengeditan prompt
• Ciri dwibahasa (BM/EN)
• Sokongan pelanggan`
        },
        {
          title: 'Akaun Pengguna',
          content: `Untuk menggunakan perkhidmatan tertentu, anda perlu:
• Mencipta akaun melalui Google OAuth
• Menyediakan maklumat yang tepat
• Mengekalkan kerahsiaan akaun anda
• Bertanggungjawab terhadap semua aktiviti dalam akaun anda`
        },
        {
          title: 'Penggunaan Yang Boleh Diterima',
          content: `Anda bersetuju untuk TIDAK:
• Menggunakan perkhidmatan untuk tujuan yang menyalahi undang-undang
• Menjana kandungan yang berbahaya atau menyinggung perasaan
• Melanggar hak kekayaan intelek pihak lain
• Mengganggu operasi platform
• Menggunakan perkhidmatan untuk spam atau aktiviti automatik`
        },
        {
          title: 'Hak Kekayaan Intelek',
          content: `• Platform dan teknologinya adalah harta MudahPrompt
• Kandungan yang dijana adalah milik anda
• Anda memberikan lesen kepada kami untuk mengendalikan kandungan untuk menyediakan perkhidmatan
• Kami menghormati hak kekayaan intelek pihak lain`
        },
        {
          title: 'Pengehadan Liabiliti',
          content: `MudahPrompt disediakan "seadanya". Kami tidak bertanggungjawab untuk:
• Ketepatan kandungan yang dijana AI
• Gangguan perkhidmatan
• Kerugian tidak langsung atau berbangkit
• Penggunaan kandungan yang dijana oleh pihak ketiga`
        },
        {
          title: 'Penamatan',
          content: `Kami boleh menamatkan akses anda jika:
• Anda melanggar terma ini
• Penggunaan yang mencurigakan atau tidak sah dikesan
• Atas budi bicara kami dengan notis yang munasabah

Anda boleh menamatkan akaun anda pada bila-bila masa.`
        },
        {
          title: 'Perubahan Terma',
          content: `Kami boleh mengemas kini terma ini dari semasa ke semasa. Perubahan akan dikomunikasikan melalui platform atau e-mel.

Penggunaan berterusan selepas perubahan bermakna penerimaan terma baharu.`
        },
        {
          title: 'Undang-undang Yang Berkaitan',
          content: `Terma ini dikawal oleh undang-undang Malaysia. Sebarang pertikaian akan diselesaikan di mahkamah Malaysia.

Untuk pertanyaan: contact@mudahprompt.com`
        }
      ]
    },
    en: {
      title: 'Terms & Conditions',
      effectiveDate: 'January 1, 2024',
      sections: [
        {
          title: 'Acceptance of Terms',
          content: `By using MudahPrompt, you agree to be bound by these terms and conditions. If you do not agree, please do not use our services.

These terms are governed by Malaysian law.`
        },
        {
          title: 'Services',
          content: `MudahPrompt provides an AI platform for generating high-quality prompts in Bahasa Malaysia and English.

Services include:
• Access to various AI assistants
• Prompt generation and editing
• Bilingual features (BM/EN)
• Customer support`
        },
        {
          title: 'User Accounts',
          content: `To use certain services, you must:
• Create an account via Google OAuth
• Provide accurate information
• Maintain the confidentiality of your account
• Be responsible for all activities in your account`
        },
        {
          title: 'Acceptable Use',
          content: `You agree NOT to:
• Use services for illegal purposes
• Generate harmful or offensive content
• Violate intellectual property rights of others
• Interfere with platform operations
• Use services for spam or automated activities`
        },
        {
          title: 'Intellectual Property',
          content: `• The platform and its technology are MudahPrompt's property
• Generated content belongs to you
• You grant us a license to process content to provide services
• We respect the intellectual property rights of others`
        },
        {
          title: 'Limitation of Liability',
          content: `MudahPrompt is provided "as is". We are not responsible for:
• Accuracy of AI-generated content
• Service interruptions
• Indirect or consequential damages
• Use of generated content by third parties`
        },
        {
          title: 'Termination',
          content: `We may terminate your access if:
• You violate these terms
• Suspicious or unauthorized usage is detected
• At our discretion with reasonable notice

You may terminate your account at any time.`
        },
        {
          title: 'Changes to Terms',
          content: `We may update these terms from time to time. Changes will be communicated through the platform or email.

Continued use after changes means acceptance of new terms.`
        },
        {
          title: 'Governing Law',
          content: `These terms are governed by Malaysian law. Any disputes will be resolved in Malaysian courts.

For questions: contact@mudahprompt.com`
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
              ? 'Terma ini tertakluk kepada undang-undang Malaysia dan mematuhi peraturan tempatan.'
              : 'These terms are governed by Malaysian law and comply with local regulations.'
            }
          </p>
        </div>
      </div>
    </div>
  );
}