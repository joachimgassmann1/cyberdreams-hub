import { Facebook, Linkedin, Instagram } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { trackSocialShare } from "@/lib/analytics";

interface SocialShareProps {
  title: string;
  url?: string;
  description?: string;
  articleSlug?: string;
}

export default function SocialShare({ title, url, description, articleSlug }: SocialShareProps) {
  const currentUrl = typeof window !== 'undefined' ? window.location.href : '';
  const shareUrl = url || currentUrl;
  const encodedUrl = encodeURIComponent(shareUrl);
  const encodedTitle = encodeURIComponent(title);
  const encodedDescription = encodeURIComponent(description || title);

  const shareLinks = {
    x: `https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
  };

  const handleShare = (platform: 'x' | 'linkedin' | 'facebook' | 'instagram' | 'tiktok') => {
    // Track social share in Google Analytics
    trackSocialShare(platform, title, articleSlug || '');
    
    if (platform === 'instagram' || platform === 'tiktok') {
      // Instagram and TikTok don't have direct web share URLs
      // Use Web Share API if available, otherwise copy link
      if (navigator.share) {
        navigator.share({
          title: title,
          text: description || title,
          url: shareUrl,
        }).catch(() => {
          // Fallback: copy to clipboard
          navigator.clipboard.writeText(shareUrl);
          toast.success('Link copied!', {
            description: `Open ${platform === 'instagram' ? 'Instagram' : 'TikTok'} app to share`,
          });
        });
      } else {
        // Fallback: copy to clipboard
        navigator.clipboard.writeText(shareUrl);
        alert('Link copied! Share it on ' + (platform === 'instagram' ? 'Instagram' : 'TikTok'));
      }
    } else {
      window.open(
        shareLinks[platform],
        '_blank',
        'width=600,height=400,noopener,noreferrer'
      );
    }
  };

  return (
    <div className="flex flex-col items-center gap-4 py-8 border-t border-border">
      <p className="text-sm text-muted-foreground font-medium">
        Share this article
      </p>
      <div className="flex gap-3">
        {/* X (Twitter) */}
        <Button
          variant="outline"
          size="default"
          className="rounded-full hover:bg-black hover:text-white hover:border-black transition-all duration-300 h-12 w-12 p-0"
          onClick={() => handleShare('x')}
          aria-label="Share on X"
        >
          <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
          </svg>
        </Button>
        
        {/* LinkedIn */}
        <Button
          variant="outline"
          size="default"
          className="rounded-full hover:bg-[#0A66C2] hover:text-white hover:border-[#0A66C2] transition-all duration-300 h-12 w-12 p-0"
          onClick={() => handleShare('linkedin')}
          aria-label="Share on LinkedIn"
        >
          <Linkedin className="h-5 w-5" />
        </Button>
        
        {/* Facebook */}
        <Button
          variant="outline"
          size="default"
          className="rounded-full hover:bg-[#1877F2] hover:text-white hover:border-[#1877F2] transition-all duration-300 h-12 w-12 p-0"
          onClick={() => handleShare('facebook')}
          aria-label="Share on Facebook"
        >
          <Facebook className="h-5 w-5" />
        </Button>
        
        {/* Instagram */}
        <Button
          variant="outline"
          size="default"
          className="rounded-full hover:bg-gradient-to-br hover:from-[#833AB4] hover:via-[#E1306C] hover:to-[#F77737] hover:text-white hover:border-transparent transition-all duration-300 h-12 w-12 p-0"
          onClick={() => handleShare('instagram')}
          aria-label="Share on Instagram"
        >
          <Instagram className="h-5 w-5" />
        </Button>
        
        {/* TikTok */}
        <Button
          variant="outline"
          size="default"
          className="rounded-full hover:bg-black hover:text-white hover:border-black transition-all duration-300 h-12 w-12 p-0"
          onClick={() => handleShare('tiktok')}
          aria-label="Share on TikTok"
        >
          <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
            <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
          </svg>
        </Button>
      </div>
    </div>
  );
}
