import { Facebook, Linkedin, Twitter as X } from "lucide-react";
import { Button } from "@/components/ui/button";

interface SocialShareProps {
  title: string;
  url?: string;
  description?: string;
}

export default function SocialShare({ title, url, description }: SocialShareProps) {
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

  const handleShare = (platform: 'x' | 'linkedin' | 'facebook') => {
    window.open(
      shareLinks[platform],
      '_blank',
      'width=600,height=400,noopener,noreferrer'
    );
  };

  return (
    <div className="flex flex-col items-center gap-4 py-8 border-t border-border">
      <p className="text-sm text-muted-foreground font-medium">
        Share this article
      </p>
      <div className="flex gap-3">
        <Button
          variant="outline"
          size="default"
          className="rounded-full hover:bg-black hover:text-white hover:border-black transition-all duration-300 h-12 w-12 p-0"
          onClick={() => handleShare('x')}
          aria-label="Share on X"
        >
          <X className="h-5 w-5" />
        </Button>
        <Button
          variant="outline"
          size="default"
          className="rounded-full hover:bg-[#0A66C2] hover:text-white hover:border-[#0A66C2] transition-all duration-300 h-12 w-12 p-0"
          onClick={() => handleShare('linkedin')}
          aria-label="Share on LinkedIn"
        >
          <Linkedin className="h-5 w-5" />
        </Button>
        <Button
          variant="outline"
          size="default"
          className="rounded-full hover:bg-[#1877F2] hover:text-white hover:border-[#1877F2] transition-all duration-300 h-12 w-12 p-0"
          onClick={() => handleShare('facebook')}
          aria-label="Share on Facebook"
        >
          <Facebook className="h-5 w-5" />
        </Button>
      </div>
    </div>
  );
}
