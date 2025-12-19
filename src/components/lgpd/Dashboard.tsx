import { Shield, Award, AlertTriangle } from 'lucide-react';
import MetricCard from './MetricCard';
import ProgressCard from './ProgressCard';
import AlertBanner from './AlertBanner';

interface DashboardProps {
  conformityScore: number;
  completedModules: number;
  pendingActions: number;
}

const Dashboard = ({ conformityScore, completedModules, pendingActions }: DashboardProps) => {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <MetricCard
          title="Nível de Conformidade"
          value={`${conformityScore}%`}
          subtitle="Básico"
          icon={Shield}
          variant="primary"
          delay={100}
        />
        <MetricCard
          title="Módulos Concluídos"
          value={`${completedModules}/5`}
          subtitle="Continue aprendendo!"
          icon={Award}
          variant="success"
          delay={200}
        />
        <MetricCard
          title="Ações Pendentes"
          value={pendingActions}
          subtitle="Requer atenção"
          icon={AlertTriangle}
          variant="warning"
          delay={300}
        />
      </div>

      <ProgressCard score={conformityScore} />

      <AlertBanner
        title="Ação Urgente Recomendada"
        message="Sua empresa ainda não possui Política de Privacidade. Este é um requisito obrigatório da LGPD."
        actionLabel="Criar agora"
        onAction={() => console.log('Create privacy policy')}
      />
    </div>
  );
};

export default Dashboard;
