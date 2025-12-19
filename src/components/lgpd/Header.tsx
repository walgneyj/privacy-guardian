import { Shield, Bell, User, LogOut } from 'lucide-react';

interface HeaderProps {
  companyName: string;
  planType: string;
  onLogout?: () => void;
}

const Header = ({ companyName, planType, onLogout }: HeaderProps) => {
  return (
    <header className="bg-card rounded-2xl shadow-card p-5 mb-6 animate-slide-up">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="gradient-hero rounded-xl p-3 shadow-lg">
            <Shield className="w-8 h-8 text-primary-foreground" />
          </div>
          <div>
            <h1 className="text-xl md:text-2xl font-bold text-foreground tracking-tight">
              LGPDFácil Carajás
            </h1>
            <p className="text-sm text-muted-foreground">
              Conformidade LGPD para PMEs
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button className="relative p-2.5 rounded-xl bg-muted hover:bg-muted/80 transition-colors">
            <Bell className="w-5 h-5 text-muted-foreground" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-accent rounded-full animate-pulse-soft" />
          </button>

          <div className="hidden md:flex items-center gap-3 pl-3 border-l border-border">
            <div className="text-right">
              <p className="text-sm font-medium text-foreground">{companyName}</p>
              <p className="text-xs text-muted-foreground">{planType}</p>
            </div>
            <div className="w-10 h-10 rounded-xl gradient-primary flex items-center justify-center">
              <User className="w-5 h-5 text-primary-foreground" />
            </div>
          </div>

          {onLogout && (
            <button
              onClick={onLogout}
              className="p-2.5 rounded-xl bg-muted hover:bg-destructive/10 hover:text-destructive transition-colors"
              title="Sair"
            >
              <LogOut className="w-5 h-5" />
            </button>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
