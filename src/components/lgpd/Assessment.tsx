import { CheckCircle, FileBarChart } from 'lucide-react';
import SectionHeader from './SectionHeader';
import AssessmentQuestion from './AssessmentQuestion';

interface Question {
  id: string;
  question: string;
  answered: boolean;
  compliant: boolean;
}

interface AssessmentProps {
  questions: Question[];
  onAnswer: (id: string, answer: boolean) => void;
}

const Assessment = ({ questions, onAnswer }: AssessmentProps) => {
  const answeredCount = questions.filter(q => q.answered).length;
  const compliantCount = questions.filter(q => q.answered && q.compliant).length;

  return (
    <div className="space-y-6">
      <SectionHeader
        title="Autoavaliação de Conformidade LGPD"
        description="Responda as perguntas abaixo para identificar gaps de conformidade em sua empresa"
        icon={CheckCircle}
        variant="hero"
      />

      <div className="grid grid-cols-2 gap-4 animate-slide-up stagger-1">
        <div className="bg-card rounded-xl p-4 shadow-card">
          <p className="text-sm text-muted-foreground">Respondidas</p>
          <p className="text-2xl font-bold text-foreground mt-1">{answeredCount}/{questions.length}</p>
        </div>
        <div className="bg-card rounded-xl p-4 shadow-card">
          <p className="text-sm text-muted-foreground">Em Conformidade</p>
          <p className="text-2xl font-bold text-success mt-1">{compliantCount}/{answeredCount || 0}</p>
        </div>
      </div>

      <div className="space-y-4">
        {questions.map((q, index) => (
          <AssessmentQuestion
            key={q.id}
            index={index + 1}
            question={q.question}
            answered={q.answered}
            compliant={q.compliant}
            onAnswer={(answer) => onAnswer(q.id, answer)}
            delay={150 + index * 100}
          />
        ))}
      </div>

      <button className="w-full gradient-hero text-primary-foreground py-4 rounded-xl font-semibold text-lg hover:opacity-90 transition-opacity shadow-lg shadow-primary/20 flex items-center justify-center gap-2 animate-slide-up stagger-5">
        <FileBarChart className="w-5 h-5" />
        Gerar Relatório de Conformidade
      </button>
    </div>
  );
};

export default Assessment;
