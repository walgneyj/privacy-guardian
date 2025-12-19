import { TrendingUp, Target, Lightbulb } from 'lucide-react';

interface ProgressCardProps {
  score: number;
}

const ProgressCard = ({ score }: ProgressCardProps) => {
  return (
    <div className="bg-card rounded-2xl shadow-card p-6 animate-slide-up stagger-3">
      <h3 className="text-lg font-semibold text-foreground mb-6 flex items-center gap-2">
        <div className="p-2 rounded-lg bg-primary/10">
          <TrendingUp className="w-5 h-5 text-primary" />
        </div>
        Sua Jornada de Conformidade
      </h3>
      
      <div className="space-y-6">
        <div>
          <div className="flex justify-between text-sm mb-3">
            <span className="text-muted-foreground font-medium">Progresso Geral</span>
            <span className="font-bold text-foreground">{score}%</span>
          </div>
          <div className="relative w-full h-4 bg-muted rounded-full overflow-hidden">
            <div 
              className="absolute inset-y-0 left-0 gradient-hero rounded-full transition-all duration-1000 ease-out"
              style={{ width: `${score}%` }}
            />
            <div 
              className="absolute inset-y-0 left-0 bg-primary-foreground/20 rounded-full animate-shimmer"
              style={{ 
                width: `${score}%`,
                backgroundImage: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent)',
                backgroundSize: '200% 100%',
              }}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex gap-3 p-4 rounded-xl bg-success/5 border border-success/20">
            <div className="p-2 rounded-lg bg-success/10 h-fit">
              <Target className="w-4 h-4 text-success" />
            </div>
            <div>
              <p className="text-sm font-semibold text-foreground">Próximo Marco</p>
              <p className="text-xs text-muted-foreground mt-0.5">
                Complete mais 3 módulos para atingir 50%
              </p>
            </div>
          </div>
          
          <div className="flex gap-3 p-4 rounded-xl bg-primary/5 border border-primary/20">
            <div className="p-2 rounded-lg bg-primary/10 h-fit">
              <Lightbulb className="w-4 h-4 text-primary" />
            </div>
            <div>
              <p className="text-sm font-semibold text-foreground">Recomendação</p>
              <p className="text-xs text-muted-foreground mt-0.5">
                Gere sua Política de Privacidade agora
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProgressCard;
