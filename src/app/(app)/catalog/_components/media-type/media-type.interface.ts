export interface MediaCardProps {
  title: string;
  author: string;
  img?: string;
  fallbackIcon?: string;
  onDelete?: () => void;
  onView?: () => void;
}
