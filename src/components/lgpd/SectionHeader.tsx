import { LucideIcon } from 'lucide-react';

interface SectionHeaderProps {
  title: string;
  description: string;
  icon: LucideIcon;
  variant: 'primary' | 'success' | 'accent' | 'hero';
}

const SectionHeader = ({ title, description, icon: Icon, variant }: SectionHeaderProps) => {
  const gradientMap = {
    primary: 'gradient-primary',
    success: 'gradient-success',
    accent: 'gradient-accent',
    hero: 'gradient-hero',
  };

  return (
    <div className={`${gradientMap[variant]} rounded-2xl p-6 text-primary-foreground shadow-lg animate-slide-up`}>
      <div className="flex items-center gap-3 mb-2">
        <Icon className="w-7 h-7" />
        <h3 className="text-xl font-bold">{title}</h3>
      </div>
      <p className="text-sm opacity-90">{description}</p>
    </div>
  );
};

export default SectionHeader;
