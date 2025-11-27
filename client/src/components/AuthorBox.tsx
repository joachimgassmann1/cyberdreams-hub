import { Link } from "wouter";
import { detectLanguage } from "@/lib/i18n";

export default function AuthorBox() {
  const lang = detectLanguage();
  
  return (
    <div className="mt-12 pt-8 border-t border-border">
      <div className="bg-card rounded-2xl p-6 md:p-8 border border-border">
        <div className="flex flex-col md:flex-row gap-6 items-start md:items-center">
          {/* Author Photo */}
          <div className="flex-shrink-0">
            <img
              src="/images/joachim-gassmann.jpg"
              alt="Joachim Gassmann - Creator of Sphere Music Hub"
              className="w-24 h-24 md:w-32 md:h-32 rounded-full object-cover border-2 border-primary/20"
            />
          </div>
          
          {/* Author Info */}
          <div className="flex-1">
            <h3 className="text-xl font-bold mb-2">Joachim Gassmann</h3>
            <p className="text-muted-foreground mb-4">
              {lang === 'de' 
                ? 'Creator von Sphere Music Hub. Von klassischem Klavier über Rock-Gitarre zu Ambient-Welten — kreiert atmosphärische Soundscapes für Fokus, Entspannung und Kreativität.'
                : 'Creator of Sphere Music Hub. From classical piano to rock guitar to ambient worlds — crafting atmospheric soundscapes for focus, relaxation, and creativity.'}
            </p>
            <Link href="/blog/mind-behind-atmospheres-joachim-creator-sphere-music-hub">
              <button className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary text-primary-foreground hover:bg-primary/90 transition-colors text-sm font-medium">
                {lang === 'de' ? 'Joachims Geschichte lesen' : "Read Joachim's Story"}
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
