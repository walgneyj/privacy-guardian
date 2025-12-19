import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { TrendingUp, CheckCircle, BookOpen, FileText } from 'lucide-react';
import Header from '@/components/lgpd/Header';
import TabNavigation from '@/components/lgpd/TabNavigation';
import Dashboard from '@/components/lgpd/Dashboard';
import Assessment from '@/components/lgpd/Assessment';
import Academy from '@/components/lgpd/Academy';
import Documents from '@/components/lgpd/Documents';
import { useAuth } from '@/hooks/useAuth';
import { useLGPDData } from '@/hooks/useLGPDData';

const Index = () => {
  const navigate = useNavigate();
  const { user, loading: authLoading, signOut } = useAuth();
  const {
    profile,
    questions,
    courses,
    documents,
    loading: dataLoading,
    conformityScore,
    completedModules,
    pendingActions,
    answerQuestion,
    updateCourseProgress,
    generateDocument,
  } = useLGPDData();

  const [activeTab, setActiveTab] = useState('dashboard');

  useEffect(() => {
    if (!authLoading && !user) {
      navigate('/auth');
    }
  }, [user, authLoading, navigate]);

  const tabs = [
    { id: 'dashboard', label: 'Dashboard', icon: TrendingUp },
    { id: 'assessment', label: 'Autoavaliação', icon: CheckCircle },
    { id: 'academy', label: 'Academia', icon: BookOpen },
    { id: 'documents', label: 'Documentos', icon: FileText },
  ];

  const handleAnswerQuestion = (id: string, answer: boolean) => {
    answerQuestion(id, answer);
  };

  const handleStartCourse = (courseId: string) => {
    const course = courses.find(c => c.id === courseId);
    if (course) {
      const newProgress = Math.min(course.progress + 25, 100);
      updateCourseProgress(courseId, newProgress);
    }
  };

  const handleGenerateDocument = (documentId: string) => {
    generateDocument(documentId);
  };

  if (authLoading || dataLoading) {
    return (
      <div className="min-h-screen gradient-background flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return (
          <Dashboard
            conformityScore={conformityScore}
            completedModules={completedModules}
            pendingActions={pendingActions}
          />
        );
      case 'assessment':
        return (
          <Assessment
            questions={questions.map(q => ({
              id: q.id,
              question: q.question,
              answered: q.answered,
              compliant: q.compliant,
            }))}
            onAnswer={handleAnswerQuestion}
          />
        );
      case 'academy':
        return (
          <Academy
            courses={courses.map(c => ({
              id: c.id,
              title: c.title,
              duration: c.duration,
              completed: c.completed,
              progress: c.progress,
            }))}
            completedModules={completedModules}
            onStartCourse={handleStartCourse}
          />
        );
      case 'documents':
        return (
          <Documents
            documents={documents.map(d => ({
              id: d.id,
              name: d.name,
              status: d.status,
              sector: d.sector,
            }))}
            sector={profile?.sector || 'Comércio'}
            onGenerateDocument={handleGenerateDocument}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen gradient-background p-4 md:p-6">
      <div className="max-w-6xl mx-auto">
        <Header
          companyName={profile?.company_name || 'Minha Empresa'}
          planType={profile?.plan === 'premium' ? 'Plano Premium' : 'Plano Básico'}
          onLogout={signOut}
        />

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
