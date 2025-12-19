import { useState } from 'react';
import { TrendingUp, CheckCircle, BookOpen, FileText } from 'lucide-react';
import Header from '@/components/lgpd/Header';
import TabNavigation from '@/components/lgpd/TabNavigation';
import Dashboard from '@/components/lgpd/Dashboard';
import Assessment from '@/components/lgpd/Assessment';
import Academy from '@/components/lgpd/Academy';
import Documents from '@/components/lgpd/Documents';

const Index = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [conformityScore] = useState(35);
  const [completedModules] = useState(2);

  const tabs = [
    { id: 'dashboard', label: 'Dashboard', icon: TrendingUp },
    { id: 'assessment', label: 'Autoavaliação', icon: CheckCircle },
    { id: 'academy', label: 'Academia', icon: BookOpen },
    { id: 'documents', label: 'Documentos', icon: FileText },
  ];

  const [assessmentQuestions, setAssessmentQuestions] = useState([
    { id: 1, question: 'Sua empresa coleta dados pessoais de clientes?', answered: true, compliant: true },
    { id: 2, question: 'Existe uma Política de Privacidade publicada?', answered: true, compliant: false },
    { id: 3, question: 'Os funcionários receberam treinamento sobre LGPD?', answered: false, compliant: false },
    { id: 4, question: 'Há procedimentos para atender direitos dos titulares?', answered: false, compliant: false },
    { id: 5, question: 'Existe registro de tratamento de dados?', answered: false, compliant: false },
  ]);

  const courses = [
    { id: 1, title: 'Introdução à LGPD', duration: '15 min', completed: true, progress: 100 },
    { id: 2, title: 'Direitos dos Titulares', duration: '20 min', completed: true, progress: 100 },
    { id: 3, title: 'Bases Legais para Tratamento', duration: '25 min', completed: false, progress: 45 },
    { id: 4, title: 'Segurança da Informação', duration: '30 min', completed: false, progress: 0 },
    { id: 5, title: 'Incidentes de Segurança', duration: '20 min', completed: false, progress: 0 },
  ];

  const documents = [
    { id: 1, name: 'Política de Privacidade', status: 'pending' as const, sector: 'Comércio' },
    { id: 2, name: 'Termos de Uso', status: 'pending' as const, sector: 'Comércio' },
    { id: 3, name: 'Política de Cookies', status: 'available' as const, sector: 'Comércio' },
    { id: 4, name: 'Termo de Consentimento', status: 'pending' as const, sector: 'Comércio' },
  ];

  const handleAnswerQuestion = (id: number, answer: boolean) => {
    setAssessmentQuestions(questions =>
      questions.map(q =>
        q.id === id ? { ...q, answered: true, compliant: answer } : q
      )
    );
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return (
          <Dashboard
            conformityScore={conformityScore}
            completedModules={completedModules}
            pendingActions={8}
          />
        );
      case 'assessment':
        return (
          <Assessment
            questions={assessmentQuestions}
            onAnswer={handleAnswerQuestion}
          />
        );
      case 'academy':
        return (
          <Academy
            courses={courses}
            completedModules={completedModules}
          />
        );
      case 'documents':
        return (
          <Documents
            documents={documents}
            sector="Comércio"
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen gradient-background p-4 md:p-6">
      <div className="max-w-6xl mx-auto">
        <Header companyName="Empresa Demo" planType="Plano Básico" />
        
        <TabNavigation
          tabs={tabs}
          activeTab={activeTab}
          onTabChange={setActiveTab}
        />

        <main className="bg-card rounded-2xl shadow-card p-5 md:p-8 animate-fade-in">
          {renderContent()}
        </main>

        <footer className="text-center mt-8 py-4">
          <p className="text-sm text-muted-foreground">
            MVP Funcional — LGPDFácil Carajás © 2025
          </p>
        </footer>
      </div>
    </div>
  );
};

export default Index;
