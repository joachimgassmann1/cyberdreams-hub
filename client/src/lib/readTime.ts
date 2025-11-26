/**
 * Calculate estimated reading time based on word count
 * @param content - The markdown or text content
 * @param wordsPerMinute - Average reading speed (default: 200 wpm)
 * @returns Estimated reading time in minutes
 */
export function calculateReadTime(content: string, wordsPerMinute: number = 200): number {
  // Remove markdown syntax for accurate word count
  const plainText = content
    .replace(/```[\s\S]*?```/g, '') // Remove code blocks
    .replace(/`[^`]*`/g, '') // Remove inline code
    .replace(/#{1,6}\s/g, '') // Remove headers
    .replace(/\[([^\]]+)\]\([^\)]+\)/g, '$1') // Remove links, keep text
    .replace(/[*_~]/g, '') // Remove emphasis markers
    .replace(/^\s*[-*+]\s/gm, '') // Remove list markers
    .replace(/^\s*\d+\.\s/gm, '') // Remove numbered list markers
    .trim();

  // Count words (split by whitespace)
  const wordCount = plainText.split(/\s+/).filter(word => word.length > 0).length;

  // Calculate read time (minimum 1 minute)
  const readTime = Math.ceil(wordCount / wordsPerMinute);
  return Math.max(1, readTime);
}

/**
 * Format read time for display
 * @param minutes - Reading time in minutes
 * @returns Formatted string like "5 min read"
 */
export function formatReadTime(minutes: number): string {
  return `${minutes} min read`;
}
