import { useEffect, useState } from "react";

interface BotLoaderProps {
  open: boolean;
  message?: string;
}

const loadingMessages = [
  "Ich suche für dich ...",
  "Daten werden analysiert ...",
  "Fast fertig ...",
  "Einen Moment noch ...",
];

export function BotLoader({ open, message }: BotLoaderProps) {
  const [msgIndex, setMsgIndex] = useState(0);

  useEffect(() => {
    if (!open) return;
    setMsgIndex(0);
    const interval = setInterval(() => {
      setMsgIndex((i) => (i + 1) % loadingMessages.length);
    }, 2200);
    return () => clearInterval(interval);
  }, [open]);

  if (!open) return null;

  return (
    <div className="bot-loader-overlay">
      <div className="bot-loader-card">
        {/* Bot-Bild mit Float-Animation */}
        <div className="bot-loader-image-wrap">
          <img
            src="/bot-loader.png"
            alt="Bot lädt..."
            className="bot-loader-image"
          />
          {/* Glow unter dem Bot */}
          <div className="bot-loader-glow" />
        </div>

        {/* Ladetext */}
        <p className="bot-loader-text">
          {message ?? loadingMessages[msgIndex]}
        </p>

        {/* Drei springende Punkte */}
        <div className="bot-loader-dots">
          <span />
          <span />
          <span />
        </div>
      </div>

      <style>{`
        .bot-loader-overlay {
          position: fixed;
          inset: 0;
          z-index: 9999;
          background: rgba(10, 15, 40, 0.55);
          backdrop-filter: blur(6px);
          display: flex;
          align-items: center;
          justify-content: center;
          animation: overlayFadeIn 0.3s ease;
        }

        @keyframes overlayFadeIn {
          from { opacity: 0; }
          to   { opacity: 1; }
        }

        .bot-loader-card {
          background: rgba(255, 255, 255, 0.97);
          border-radius: 28px;
          padding: 48px 56px 40px;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 20px;
          box-shadow: 0 24px 64px rgba(0, 60, 200, 0.18), 0 4px 16px rgba(0,0,0,0.10);
          animation: cardPopIn 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
          min-width: 280px;
        }

        @keyframes cardPopIn {
          from { transform: scale(0.75) translateY(30px); opacity: 0; }
          to   { transform: scale(1) translateY(0);      opacity: 1; }
        }

        /* ── Bot-Bild ── */
        .bot-loader-image-wrap {
          position: relative;
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .bot-loader-image {
          width: 160px;
          height: 160px;
          object-fit: contain;
          animation: botFloat 2.8s ease-in-out infinite, botWave 2.8s ease-in-out infinite;
          filter: drop-shadow(0 8px 24px rgba(0, 80, 220, 0.25));
        }

        /* Sanftes Schweben */
        @keyframes botFloat {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          25%       { transform: translateY(-14px) rotate(-1.5deg); }
          75%       { transform: translateY(-8px) rotate(1.5deg); }
        }

        /* Arm-Wink-Effekt über leichtes Kippen */
        @keyframes botWave {
          0%, 60%, 100% { transform: translateY(0px) rotate(0deg); }
          10%            { transform: translateY(-12px) rotate(-3deg); }
          20%            { transform: translateY(-14px) rotate(3deg); }
          30%            { transform: translateY(-12px) rotate(-2deg); }
          40%            { transform: translateY(-10px) rotate(2deg); }
        }

        /* Glow-Effekt unter dem Bot */
        .bot-loader-glow {
          width: 80px;
          height: 14px;
          background: radial-gradient(ellipse, rgba(0, 100, 255, 0.30) 0%, transparent 70%);
          border-radius: 50%;
          margin-top: -10px;
          animation: glowPulse 2.8s ease-in-out infinite;
        }

        @keyframes glowPulse {
          0%, 100% { transform: scaleX(1);   opacity: 0.7; }
          50%       { transform: scaleX(0.6); opacity: 0.3; }
        }

        /* ── Ladetext ── */
        .bot-loader-text {
          font-family: 'Manrope', 'Inter', sans-serif;
          font-size: 16px;
          font-weight: 600;
          color: #1e2a4a;
          letter-spacing: -0.3px;
          text-align: center;
          animation: textFade 0.5s ease;
          min-height: 24px;
        }

        @keyframes textFade {
          from { opacity: 0; transform: translateY(6px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        /* ── Springende Punkte ── */
        .bot-loader-dots {
          display: flex;
          gap: 8px;
          align-items: center;
        }

        .bot-loader-dots span {
          display: block;
          width: 9px;
          height: 9px;
          border-radius: 50%;
          background: #2563eb;
          animation: dotBounce 1.2s ease-in-out infinite;
        }

        .bot-loader-dots span:nth-child(1) { animation-delay: 0s;    background: #2563eb; }
        .bot-loader-dots span:nth-child(2) { animation-delay: 0.2s;  background: #3b82f6; }
        .bot-loader-dots span:nth-child(3) { animation-delay: 0.4s;  background: #93c5fd; }

        @keyframes dotBounce {
          0%, 80%, 100% { transform: translateY(0);    opacity: 0.5; }
          40%            { transform: translateY(-10px); opacity: 1;   }
        }
      `}</style>
    </div>
  );
}
