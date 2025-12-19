import { AlertTriangle, ArrowRight } from 'lucide-react';

interface AlertBannerProps {
  title: string;
  message: string;
  actionLabel: string;
  onAction: () => void;
}

const AlertBanner = ({ title, message, actionLabel, onAction }: AlertBannerProps) => {
  return (
    <div className="bg-warning/10 border border-warning/30 rounded-2xl p-5 animate-slide-up stagger-4">
      <div className="flex items-start gap-4">
        <div className="p-2.5 rounded-xl bg-warning/20">
          <AlertTriangle className="w-5 h-5 text-warning" />
        </div>
        <div className="flex-1">
          <p className="font-semibold text-foreground">{title}</p>
          <p className="text-sm text-muted-foreground mt-1">{message}</p>
        </div>
        <button 
          onClick={onAction}
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-warning text-warning-foreground font-semibold text-sm hover:opacity-90 transition-opacity"
        >
          {actionLabel}
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

export default AlertBanner;
