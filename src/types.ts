export interface Student {
  id: string;
  name: string;
  age: string;
  ageGroup: 'bebês' | 'pequenos' | 'grandes'; // bebês(0-1a6m), bem pequenos(1a7m-3a11m), pequenos(4a-5a11m)
  classId: string;
  className: string;
  specialNeeds?: string;
  hasSpecialNeeds: boolean;
  peiPlan?: string;
  schoolId?: string; // Links student to school
  cep?: string;
  address?: string;
  city?: string;
  photo?: string;
}

export interface Parent {
  id: string;
  name: string;
  email: string;
  phone: string;
  childrenIds: string[];
  status: 'Ativo' | 'Inativo';
  cep?: string;
  address?: string;
  city?: string;
}

export interface School {
  id: string;
  name: string;
  code: string;
  phone: string;
  address: string;
  city: string;
  segment: 'Infantil' | 'Fundamental' | 'Médio' | 'Completo';
  cep?: string;
}

export interface Grade {
  id: string;
  name: string;
  ageGroup: 'bebês' | 'pequenos' | 'grandes';
  description: string;
}

export interface ClassGroup {
  id: string;
  name: string;
  gradeId: string;
  schoolId: string;
  teacherId: string;
  shift: 'Manhã' | 'Tarde' | 'Integral';
}

export interface Profession {
  id: string;
  name: string;
  description: string;
}

export interface Specialist {
  id: string;
  name: string;
  professionId: string;
  professionName: string; // Dynamic denormalized or looked up name
  registerNum: string; // CRP, CREFITO, CRFa, etc.
  email: string;
  phone: string;
  status: 'Ativo' | 'Licença' | 'Inativo';
  cep?: string;
  address?: string;
  city?: string;
}

export interface Teacher {
  id: string;
  name: string;
  code: string;
  email: string;
  phone: string;
  status: 'Ativo' | 'Licença' | 'Inativo';
  cep?: string;
  address?: string;
  city?: string;
}

export interface RoutineState {
  id: string;
  studentId: string;
  date: string;
  meals: 'excellent' | 'medium' | 'refused';
  sleep: 'good' | 'restless' | 'no';
  hygiene: 'wet' | 'dirty' | 'bath' | 'ok';
  mood: 'happy' | 'calm' | 'crying' | 'fever';
  observations: string;
}

export interface PedagogicalPlan {
  id: string;
  title: string;
  ageGroup: string;
  experienceCamps: string[];
  objectives: string[];
  procedures: string;
  inclusionStrategy: string;
  familyGuideline?: string;
  createdAt: string;
}

export interface InclusionReport {
  id: string;
  studentId: string;
  studentName: string;
  specialNeeds: string;
  rawObservation: string;
  formattedReport: string;
  date: string;
  teacherName: string;
}

export interface FeedPost {
  id: string;
  title: string;
  content: string;
  date: string;
  type: 'notice' | 'moment' | 'activity';
  imageUrl?: string;
  likes: number;
  comments: {
    id: string;
    author: string;
    text: string;
    date: string;
  }[];
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'lumi';
  text: string;
  timestamp: string;
}

export interface ProfessionalRecord {
  id: string;
  studentId: string;
  studentName: string;
  classId: string;
  className: string;
  professionalName: string;
  professionalRole: 
    | 'Educador'
    | 'Coordenação Pedagógica'
    | 'Psicologia'
    | 'Psicopedagogia'
    | 'Fonoaudiologia'
    | 'Terapia Ocupacional'
    | 'Assistência Social'
    | 'Equipe de Inclusão'
    | 'Gestão Escolar';
  recordType: 
    | 'Evolução da aprendizagem'
    | 'Intervenções realizadas'
    | 'Estratégias utilizadas'
    | 'Encaminhamentos'
    | 'Relatórios'
    | 'Recomendações';
  title: string;
  content: string;
  date: string;
  attachmentName?: string;
}

