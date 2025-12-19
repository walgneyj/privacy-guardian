import { FileText, Download, Sparkles } from 'lucide-react';

interface DocumentCardProps {
  name: string;
  sector: string;
  status: 'available' | 'pending';
  onAction: () => void;
  delay?: number;
}

const DocumentCard = ({ name, sector, status, onAction, delay = 0 }: DocumentCardProps) => {
  const isAvailable = status === 'available';

  return (
    <div 
      className="bg-card rounded-2xl shadow-card p-5 hover:shadow-lg transition-all duration-300 border border-transparent hover:border-accent/20 animate-slide-up opacity-0"
      style={{ animationDelay: `${delay}ms`, animationFillMode: 'forwards' }}
    >
      <div className="flex items-center gap-4">
        <div className={`p-3 rounded-xl ${isAvailable ? 'bg-success/10' : 'bg-muted'}`}>
          <FileText className={`w-6 h-6 ${isAvailable ? 'text-success' : 'text-muted-foreground'}`} />
        </div>
        
        <div className="flex-1 min-w-0">
          <h4 className="font-semibold text-foreground truncate">{name}</h4>
          <p className="text-xs text-muted-foreground mt-0.5">Setor: {sector}</p>
        </div>

        <button 
          onClick={onAction}
          className={`
            flex items-center gap-2 px-4 py-2.5 rounded-xl font-semibold text-sm transition-all
            ${isAvailable 
              ? 'gradient-success text-success-foreground shadow-lg shadow-success/20 hover:opacity-90' 
              : 'gradient-hero text-primary-foreground shadow-lg shadow-primary/20 hover:opacity-90'
            }
          `}
        >
          {isAvailable ? (
            <>
              <Download className="w-4 h-4" />
              Baixar
            </>
          ) : (
            <>
              <Sparkles className="w-4 h-4" />
              Gerar
            </>
          )}
        </button>
      </div>
    </div>
  );
};

export default DocumentCard;
