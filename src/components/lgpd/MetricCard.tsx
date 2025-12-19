import { LucideIcon } from 'lucide-react';

interface MetricCardProps {
  title: string;
  value: string | number;
  subtitle: string;
  icon: LucideIcon;
  variant: 'primary' | 'success' | 'warning' | 'accent';
  delay?: number;
}

const MetricCard = ({ title, value, subtitle, icon: Icon, variant, delay = 0 }: MetricCardProps) => {
  const gradientMap = {
    primary: 'gradient-primary',
    success: 'gradient-success',
    warning: 'gradient-warning',
    accent: 'gradient-accent',
  };

  return (
    <div 
      className={`
        ${gradientMap[variant]} rounded-2xl p-6 text-primary-foreground 
        shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1
        animate-slide-up opacity-0
      `}
      style={{ animationDelay: `${delay}ms`, animationFillMode: 'forwards' }}
    >
      <div className="flex items-start justify-between">
        <div className="space-y-1">
          <p className="text-sm font-medium opacity-90">{title}</p>
          <p className="text-4xl font-bold tracking-tight">{value}</p>
          <p className="text-xs opacity-75">{subtitle}</p>
        </div>
        <div className="p-3 bg-primary-foreground/15 rounded-xl backdrop-blur-sm">
          <Icon className="w-7 h-7" />
        </div>
      </div>
    </div>
  );
};

export default MetricCard;
