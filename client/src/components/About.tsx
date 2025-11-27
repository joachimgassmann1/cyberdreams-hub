import { Card, CardContent } from "@/components/ui/card";
import { Brain, Headphones, Heart, Sparkles } from "lucide-react";
import { detectLanguage } from "@/lib/i18n";

const getFeatures = (lang: 'en' | 'de') => [
  {
    icon: Brain,
    title: lang === 'de' ? "Tiefe Konzentration" : "Deep Focus",
    description: lang === 'de' 
      ? "Ruhige, minimalistische Soundscapes, die deine Konzentration steigern, mentale Klarheit schärfen und dir helfen, während der Arbeit und beim Lernen fokussiert zu bleiben."
      : "Calm, minimal soundscapes designed to boost concentration, sharpen mental clarity, and help you stay focused during work and study sessions.",
  },
  {
    icon: Heart,
    title: lang === 'de' ? "Entspannung" : "Relaxation",
    description: lang === 'de'
      ? "Beruhigende Ambient-Musik, die Stress reduziert, Ruhe bringt und friedliche Räume zum Entspannen und Auftanken schafft."
      : "Soothing ambient music that reduces stress, brings calmness, and creates peaceful spaces for unwinding and recharging.",
  },
  {
    icon: Headphones,
    title: lang === 'de' ? "Lern-Unterstützung" : "Study Enhancement",
    description: lang === 'de'
      ? "Kuratierte Playlists, die das Lernen unterstützen, den Fokus verbessern und während langer Lernsessions stetige mentale Klarheit aufrechterhalten."
      : "Curated playlists that support learning, improve focus, and maintain steady mental clarity during long study sessions.",
  },
  {
    icon: Sparkles,
    title: lang === 'de' ? "Ambient-Atmosphären" : "Ambient Atmospheres",
    description: lang === 'de'
      ? "Immersive Ambient-Umgebungen von futuristischen Cyber-Texturen bis hin zu ruhigen Naturklängen und sanften Chill-Lounge-Tönen."
      : "Immersive ambient environments ranging from futuristic cyber textures to serene natural soundscapes and gentle chill lounge tones.",
  },
];

export default function About() {
  const lang = detectLanguage();
  const features = getFeatures(lang);
  return (
    <section id="about" className="py-20 md:py-32 bg-gradient-to-b from-background to-card/30">
      <div className="container">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            {lang === 'de' ? 'Über' : 'About'}{" "}
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Sphere Music Hub
            </span>
          </h2>
          <p className="text-lg md:text-xl text-foreground/70 max-w-3xl mx-auto leading-relaxed">
            {lang === 'de'
              ? 'Wir kreieren immersive Audio-Erlebnisse, die deine täglichen Aktivitäten in Momente der Klarheit, Ruhe und Kreativität verwandeln. Unsere Sammlung spezialisierter Musikkanäle dient als dein klanglicher Begleiter für Arbeit, Studium, Entspannung und alles dazwischen.'
              : 'We create immersive audio experiences designed to transform your daily activities into moments of clarity, calm, and creativity. Our collection of specialized music channels serves as your sonic companion for work, study, relaxation, and everything in between.'}
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 mb-16">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <Card
                key={index}
                className="bg-card border-border hover:border-primary/50 transition-all duration-300 hover:shadow-lg hover:shadow-primary/10 group"
              >
                <CardContent className="p-6 md:p-8">
                  <div className="flex items-start gap-4">
                    <div className="p-3 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors">
                      <Icon className="w-6 h-6 text-primary" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">
                        {feature.title}
                      </h3>
                      <p className="text-foreground/70 leading-relaxed">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Mission Statement */}
        <div className="max-w-4xl mx-auto">
          <Card className="bg-gradient-to-br from-card to-card/50 border-primary/20">
            <CardContent className="p-8 md:p-12 text-center">
              <h3 className="text-2xl md:text-3xl font-bold mb-6">{lang === 'de' ? 'Unsere Mission' : 'Our Mission'}</h3>
              <p className="text-lg text-foreground/80 leading-relaxed mb-6">
                {lang === 'de'
                  ? 'Bei Sphere Music Hub glauben wir, dass entspannende Musik transformieren kann, wie du arbeitest, lernst und dich entspannst. Unsere Fokus-Musik, Chill-Musik und Ambient-Musik unterstützen Konzentration, Ruhe und Produktivität. Ob du tiefe Konzentration zum Lernen, einen friedlichen Raum für kreatives Denken oder entspannende Musik zum Stressabbau brauchst – unsere Kanäle bieten die richtige Klang-Atmosphäre für jeden Moment.'
                  : 'At Sphere Music Hub, we believe relaxing music can transform how you work, study and unwind. Our focus music, chill music and ambient music support concentration, calmness and productivity. Whether you need deep focus for studying, a peaceful space for creative thinking or relaxing music for stress relief, our channels provide the right sound atmosphere for every moment.'}
              </p>
              <p className="text-lg text-foreground/80 leading-relaxed">
                {lang === 'de'
                  ? 'Unsere Familie von Kanälen stellt sicher, dass du immer die perfekte Mischung aus Ambient-Musik, Chillout-Musik und Lernmusik findest, um ruhig, fokussiert und inspiriert zu bleiben. Sphere Music Hub bringt entspannende und immersive Soundscapes in dein tägliches Leben.'
                  : 'Our family of channels ensures you always find the perfect blend of ambient music, chillout music and study music to stay calm, focused and inspired. Sphere Music Hub brings relaxing and immersive soundscapes into your daily life.'}
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
