import { CheckCircle, Play, Clock } from 'lucide-react';

interface CourseCardProps {
  title: string;
  duration: string;
  completed: boolean;
  progress: number;
  onStart: () => void;
  delay?: number;
}

const CourseCard = ({ title, duration, completed, progress, onStart, delay = 0 }: CourseCardProps) => {
  return (
    <div 
      className="bg-card rounded-2xl shadow-card p-5 hover:shadow-lg transition-all duration-300 border border-transparent hover:border-secondary/20 animate-slide-up opacity-0"
      style={{ animationDelay: `${delay}ms`, animationFillMode: 'forwards' }}
    >
      <div className="flex items-center justify-between mb-4">
        <div className="flex-1 min-w-0">
          <h4 className="font-semibold text-foreground truncate">{title}</h4>
          <div className="flex items-center gap-1.5 mt-1.5">
            <Clock className="w-3.5 h-3.5 text-muted-foreground" />
            <span className="text-xs text-muted-foreground">{duration}</span>
          </div>
        </div>

        {completed ? (
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-success/10">
            <CheckCircle className="w-4 h-4 text-success" />
            <span className="text-xs font-semibold text-success">Concluído</span>
          </div>
        ) : (
          <button 
            onClick={onStart}
            className="flex items-center gap-2 px-4 py-2 rounded-xl gradient-primary text-primary-foreground font-semibold text-sm hover:opacity-90 transition-opacity shadow-lg shadow-primary/20"
          >
            <Play className="w-4 h-4" />
            {progress > 0 ? 'Continuar' : 'Iniciar'}
          </button>
        )}
      </div>

      <div className="relative w-full h-2 bg-muted rounded-full overflow-hidden">
        <div 
          className={`absolute inset-y-0 left-0 rounded-full transition-all duration-500 ${
            completed ? 'bg-success' : 'gradient-secondary'
          }`}
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
};

export default CourseCard;
