import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from './useAuth';
import { toast } from 'sonner';

interface Profile {
  id: string;
  company_name: string;
  sector: string;
  plan: string;
}

interface Question {
  id: string;
  question: string;
  order_index: number;
  answered: boolean;
  compliant: boolean;
}

interface Course {
  id: string;
  title: string;
  duration: string;
  order_index: number;
  completed: boolean;
  progress: number;
}

interface Document {
  id: string;
  name: string;
  sector: string;
  status: 'available' | 'pending';
}

export const useLGPDData = () => {
  const { user } = useAuth();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [courses, setCourses] = useState<Course[]>([]);
  const [documents, setDocuments] = useState<Document[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchData = useCallback(async () => {
    if (!user) {
      setLoading(false);
      return;
    }

    try {
      // Fetch profile
      const { data: profileData } = await supabase
        .from('profiles')
        .select('*')
        .eq('user_id', user.id)
        .maybeSingle();
      
      setProfile(profileData);

      // Fetch questions with user answers
      const { data: questionsData } = await supabase
        .from('assessment_questions')
        .select('*')
        .order('order_index');

      const { data: answersData } = await supabase
        .from('assessment_answers')
        .select('*')
        .eq('user_id', user.id);

      const answersMap = new Map(answersData?.map(a => [a.question_id, a]) || []);

      const questionsWithAnswers = questionsData?.map(q => ({
        id: q.id,
        question: q.question,
        order_index: q.order_index,
        answered: answersMap.has(q.id),
        compliant: answersMap.get(q.id)?.is_compliant || false,
      })) || [];

      setQuestions(questionsWithAnswers);

      // Fetch courses with user progress
      const { data: coursesData } = await supabase
        .from('courses')
        .select('*')
        .order('order_index');

      const { data: progressData } = await supabase
        .from('user_course_progress')
        .select('*')
        .eq('user_id', user.id);

      const progressMap = new Map(progressData?.map(p => [p.course_id, p]) || []);

      const coursesWithProgress = coursesData?.map(c => ({
        id: c.id,
        title: c.title,
        duration: c.duration,
        order_index: c.order_index,
        completed: progressMap.get(c.id)?.completed || false,
        progress: progressMap.get(c.id)?.progress || 0,
      })) || [];

      setCourses(coursesWithProgress);

      // Fetch documents with user status
      const { data: documentsData } = await supabase
        .from('documents')
        .select('*');

      const { data: userDocsData } = await supabase
        .from('user_documents')
        .select('*')
        .eq('user_id', user.id);

      const userDocsMap = new Map(userDocsData?.map(d => [d.document_id, d]) || []);

      const documentsWithStatus = documentsData?.map(d => ({
        id: d.id,
        name: d.name,
        sector: d.sector,
        status: (userDocsMap.get(d.id)?.status === 'generated' ? 'available' : 'pending') as 'available' | 'pending',
      })) || [];

      setDocuments(documentsWithStatus);
    } catch (error) {
      console.error('Error fetching data:', error);
      toast.error('Erro ao carregar dados');
    } finally {
      setLoading(false);
    }
  }, [user]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const answerQuestion = async (questionId: string, isCompliant: boolean) => {
    if (!user) return;

    try {
      const { error } = await supabase
        .from('assessment_answers')
        .upsert({
          user_id: user.id,
          question_id: questionId,
          is_compliant: isCompliant,
        }, {
          onConflict: 'user_id,question_id',
        });

      if (error) throw error;

      setQuestions(prev =>
        prev.map(q =>
          q.id === questionId ? { ...q, answered: true, compliant: isCompliant } : q
        )
      );
      toast.success('Resposta salva!');
    } catch (error) {
      console.error('Error saving answer:', error);
      toast.error('Erro ao salvar resposta');
    }
  };

  const updateCourseProgress = async (courseId: string, progress: number) => {
    if (!user) return;

    try {
      const completed = progress >= 100;

      const { error } = await supabase
        .from('user_course_progress')
        .upsert({
          user_id: user.id,
          course_id: courseId,
          progress,
          completed,
        }, {
          onConflict: 'user_id,course_id',
        });

      if (error) throw error;

      setCourses(prev =>
        prev.map(c =>
          c.id === courseId ? { ...c, progress, completed } : c
        )
      );
      toast.success('Progresso atualizado!');
    } catch (error) {
      console.error('Error updating progress:', error);
      toast.error('Erro ao atualizar progresso');
    }
  };

  const generateDocument = async (documentId: string) => {
    if (!user) return;

    try {
      const { error } = await supabase
        .from('user_documents')
        .upsert({
          user_id: user.id,
          document_id: documentId,
          status: 'generated',
          generated_at: new Date().toISOString(),
        }, {
          onConflict: 'user_id,document_id',
        });

      if (error) throw error;

      setDocuments(prev =>
        prev.map(d =>
          d.id === documentId ? { ...d, status: 'available' as const } : d
        )
      );
      toast.success('Documento gerado com sucesso!');
    } catch (error) {
      console.error('Error generating document:', error);
      toast.error('Erro ao gerar documento');
    }
  };

  const conformityScore = questions.length > 0
    ? Math.round((questions.filter(q => q.answered && q.compliant).length / questions.length) * 100)
    : 0;

  const completedModules = courses.filter(c => c.completed).length;

  const pendingActions = questions.filter(q => !q.answered).length +
    courses.filter(c => !c.completed).length +
    documents.filter(d => d.status === 'pending').length;

  return {
    profile,
    questions,
    courses,
    documents,
    loading,
    conformityScore,
    completedModules,
    pendingActions,
    answerQuestion,
    updateCourseProgress,
    generateDocument,
    refetch: fetchData,
  };
};
