import { FileText, Lock, Award, Sparkles } from 'lucide-react';
import SectionHeader from './SectionHeader';
import DocumentCard from './DocumentCard';

interface Document {
  id: number;
  name: string;
  status: 'available' | 'pending';
  sector: string;
}

interface DocumentsProps {
  documents: Document[];
  sector: string;
}

const Documents = ({ documents, sector }: DocumentsProps) => {
  return (
    <div className="space-y-6">
      <SectionHeader
        title="Gerador de Documentos"
        description="Crie políticas personalizadas em minutos"
        icon={FileText}
        variant="hero"
      />

      <div className="bg-primary/5 border border-primary/20 rounded-2xl p-5 flex items-start gap-4 animate-slide-up stagger-1">
        <div className="p-2.5 rounded-xl bg-primary/10">
          <Lock className="w-5 h-5 text-primary" />
        </div>
        <div>
          <p className="font-semibold text-foreground">Setor Identificado: {sector}</p>
          <p className="text-sm text-muted-foreground mt-1">
            Os documentos serão personalizados para seu tipo de negócio
          </p>
        </div>
      </div>

      <div className="space-y-4">
        {documents.map((doc, index) => (
          <DocumentCard
            key={doc.id}
            name={doc.name}
            sector={doc.sector}
            status={doc.status}
            onAction={() => console.log(`Action for ${doc.id}`)}
            delay={150 + index * 100}
          />
        ))}
      </div>

      <div className="gradient-hero rounded-2xl p-8 text-center text-primary-foreground shadow-xl animate-slide-up stagger-5">
        <div className="inline-flex p-4 rounded-2xl bg-primary-foreground/15 backdrop-blur-sm mb-4">
          <Award className="w-10 h-10" />
        </div>
        <h4 className="text-xl font-bold mb-2">Plano Premium</h4>
        <p className="text-sm opacity-90 mb-6 max-w-md mx-auto">
          Gere documentos ilimitados + consultoria rápida com especialistas em LGPD
        </p>
        <button className="inline-flex items-center gap-2 bg-primary-foreground text-primary px-8 py-3 rounded-xl font-semibold hover:bg-primary-foreground/90 transition-colors shadow-lg">
          <Sparkles className="w-5 h-5" />
          Conhecer Planos
        </button>
      </div>
    </div>
  );
};

export default Documents;
