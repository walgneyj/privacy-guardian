import { BookOpen, Users, Award, GraduationCap } from 'lucide-react';
import SectionHeader from './SectionHeader';
import CourseCard from './CourseCard';

interface Course {
  id: string;
  title: string;
  duration: string;
  completed: boolean;
  progress: number;
}

interface AcademyProps {
  courses: Course[];
  completedModules: number;
  onStartCourse?: (courseId: string) => void;
}

const Academy = ({ courses, completedModules, onStartCourse }: AcademyProps) => {
  const totalProgress = courses.length > 0
    ? Math.round(courses.reduce((acc, course) => acc + course.progress, 0) / courses.length)
    : 0;

  return (
    <div className="space-y-6">
      <SectionHeader
        title="Academia LGPD"
        description="Aprenda tudo sobre LGPD de forma simples e prática"
        icon={BookOpen}
        variant="success"
      />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-card rounded-xl p-5 shadow-card border border-primary/10 animate-slide-up stagger-1">
          <div className="p-2.5 rounded-lg bg-primary/10 w-fit mb-3">
            <Users className="w-6 h-6 text-primary" />
          </div>
          <p className="text-sm text-muted-foreground font-medium">Seu Progresso</p>
          <p className="text-2xl font-bold text-primary mt-1">{completedModules}/{courses.length} módulos</p>
        </div>

        <div className="bg-card rounded-xl p-5 shadow-card border border-secondary/10 animate-slide-up stagger-2">
          <div className="p-2.5 rounded-lg bg-secondary/10 w-fit mb-3">
            <GraduationCap className="w-6 h-6 text-secondary" />
          </div>
          <p className="text-sm text-muted-foreground font-medium">Progresso Total</p>
          <p className="text-2xl font-bold text-secondary mt-1">{totalProgress}%</p>
        </div>

        <div className="bg-card rounded-xl p-5 shadow-card border border-accent/10 animate-slide-up stagger-3">
          <div className="p-2.5 rounded-lg bg-accent/10 w-fit mb-3">
            <Award className="w-6 h-6 text-accent" />
          </div>
          <p className="text-sm text-muted-foreground font-medium">Certificação</p>
          <p className="text-sm font-semibold text-foreground mt-1">Complete todos para certificado</p>
        </div>
      </div>

      <div className="space-y-4">
        {courses.map((course, index) => (
          <CourseCard
            key={course.id}
            title={course.title}
            duration={course.duration}
            completed={course.completed}
            progress={course.progress}
            onStart={() => onStartCourse?.(course.id)}
            delay={200 + index * 100}
          />
        ))}
      </div>
    </div>
  );
};

export default Academy;
