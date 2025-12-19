import { CheckCircle, AlertTriangle, Circle } from 'lucide-react';

interface AssessmentQuestionProps {
  index: number;
  question: string;
  answered: boolean;
  compliant: boolean;
  onAnswer: (answer: boolean) => void;
  delay?: number;
}

const AssessmentQuestion = ({ 
  index, 
  question, 
  answered, 
  compliant, 
  onAnswer,
  delay = 0 
}: AssessmentQuestionProps) => {
  return (
    <div 
      className="bg-card rounded-2xl shadow-card p-5 hover:shadow-lg transition-all duration-300 border border-transparent hover:border-primary/20 animate-slide-up opacity-0"
      style={{ animationDelay: `${delay}ms`, animationFillMode: 'forwards' }}
    >
      <div className="flex items-start gap-4">
        <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-primary/10 text-primary font-bold text-sm shrink-0">
          {index}
        </div>
        
        <div className="flex-1 min-w-0">
          <p className="text-foreground font-medium leading-relaxed">{question}</p>
          
          <div className="flex gap-2 mt-4">
            <button 
              onClick={() => onAnswer(true)}
              className={`
                px-5 py-2.5 rounded-xl font-semibold text-sm transition-all duration-200
                ${answered && compliant 
                  ? 'gradient-success text-success-foreground shadow-lg' 
                  : 'bg-muted text-muted-foreground hover:bg-success/20 hover:text-success'
                }
              `}
            >
              Sim
            </button>
            <button 
              onClick={() => onAnswer(false)}
              className={`
                px-5 py-2.5 rounded-xl font-semibold text-sm transition-all duration-200
                ${answered && !compliant 
                  ? 'bg-destructive text-destructive-foreground shadow-lg' 
                  : 'bg-muted text-muted-foreground hover:bg-destructive/20 hover:text-destructive'
                }
              `}
            >
              Não
            </button>
          </div>
        </div>

        <div className="shrink-0">
          {answered ? (
            compliant ? (
              <div className="p-2 rounded-full bg-success/10">
                <CheckCircle className="w-6 h-6 text-success" />
              </div>
            ) : (
              <div className="p-2 rounded-full bg-destructive/10">
                <AlertTriangle className="w-6 h-6 text-destructive" />
              </div>
            )
          ) : (
            <div className="p-2 rounded-full bg-muted">
              <Circle className="w-6 h-6 text-muted-foreground" />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AssessmentQuestion;
