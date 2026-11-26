import React, { useState, useEffect } from 'react';
import { 
  School, 
  Grade, 
  ClassGroup, 
  Teacher, 
  Student,
  Parent,
  Profession,
  Specialist
} from '../types';
import { 
  Building2, 
  Users, 
  BookOpen, 
  Layers, 
  GraduationCap, 
  Plus, 
  Edit, 
  Trash2, 
  Search, 
  Check, 
  X, 
  Phone, 
  Mail, 
  MapPin, 
  FileText,
  AlertTriangle,
  BadgeAlert,
  UserCheck,
  Briefcase,
  HeartHandshake,
  Upload
} from 'lucide-react';
import { motion } from 'motion/react';

interface SchoolRegistriesProps {
  students: Student[];
  setStudents: React.Dispatch<React.SetStateAction<Student[]>>;
}

export default function SchoolRegistries({ students, setStudents }: SchoolRegistriesProps) {
  // Select active registry category
  // 'escola' | 'serie' | 'turma' | 'professor' | 'aluno' | 'responsavel' | 'profissao' | 'profissional'
  const [activeTab, setActiveTab] = useState<'escola' | 'serie' | 'turma' | 'professor' | 'aluno' | 'responsavel' | 'profissao' | 'profissional'>('escola');
  
  // Search query
  const [searchQuery, setSearchQuery] = useState('');

  // Success Notification banner states
  const [notification, setNotification] = useState<{ message: string; type: 'success' | 'danger' } | null>(null);

  // States with localStorage durability
  const [professions, setProfessions] = useState<Profession[]>(() => {
    const saved = localStorage.getItem('la_salle_professions');
    if (saved) return JSON.parse(saved);
    return [
      { id: 'prof-1', name: 'Psicopedagogia', description: 'Atendimento voltado para as dificuldades de aprendizagem, desenvolvimento cognitivo e estratégias de estudo.' },
      { id: 'prof-2', name: 'Fonoaudiologia', description: 'Desenvolvimento da comunicação oral e escrita, fala, linguagem, processamento auditivo e deglutição.' },
      { id: 'prof-3', name: 'Psicologia', description: 'Suporte emocional, avaliação comportamental, regulação afetiva e saúde mental infantil/juvenil.' },
      { id: 'prof-4', name: 'Terapia Ocupacional', description: 'Integração sensorial, estimulação motora fina/ampla e autonomia nas atividades de vida diária.' },
      { id: 'prof-5', name: 'Assistência Social', description: 'Mapeamento sociofamiliar, suporte familiar e articulação com a rede de proteção social.' },
      { id: 'prof-6', name: 'Equipe de Inclusão', description: 'Adaptação curricular, acompanhamento personalizado para alunos laudados e PDI.' },
      { id: 'prof-7', name: 'Gestão Escolar', description: 'Coordenação estratégica da escola, conformidade regulatória e mediação institucional.' }
    ];
  });

  const [specialists, setSpecialists] = useState<Specialist[]>(() => {
    const saved = localStorage.getItem('la_salle_specialists');
    if (saved) return JSON.parse(saved);
    return [
      { id: 'spec-1', name: 'Dra. Amanda Rezende', professionId: 'prof-3', professionName: 'Psicologia', registerNum: 'CRP 01/18521', email: 'amanda.rezende@lumi.edu.br', phone: '(61) 98112-9011', status: 'Ativo', cep: '70390-025', address: 'SCLN 206, Bloco B', city: 'Brasília-DF' },
      { id: 'spec-2', name: 'Dra. Clarice Neves', professionId: 'prof-4', professionName: 'Terapia Ocupacional', registerNum: 'CREFITO-11 9410-TO', email: 'clarice.occupational@lumi.edu.br', phone: '(61) 99245-5622', status: 'Ativo', cep: '70390-025', address: 'SHIGS 706, Bloco F', city: 'Brasília-DF' },
      { id: 'spec-3', name: 'Dr. Fábio Arruda', professionId: 'prof-1', professionName: 'Psicopedagogia', registerNum: 'ABPp-DF 1410', email: 'fabio.pedagogo@lumi.edu.br', phone: '(61) 98544-3311', status: 'Ativo', cep: '70390-025', address: 'SQN 212, Bloco D', city: 'Brasília-DF' }
    ];
  });

  useEffect(() => {
    localStorage.setItem('la_salle_professions', JSON.stringify(professions));
  }, [professions]);

  useEffect(() => {
    localStorage.setItem('la_salle_specialists', JSON.stringify(specialists));
  }, [specialists]);

  const [schools, setSchools] = useState<School[]>(() => {
    const saved = localStorage.getItem('la_salle_schools');
    if (saved) return JSON.parse(saved);
    return [
      { id: 'school-1', name: 'Colégio La Salle Brasília', code: '54210', phone: '(61) 3214-7300', address: 'SGAS Q 906, Conjunto A', city: 'Brasília-DF', segment: 'Completo' },
      { id: 'school-2', name: 'Colégio La Salle Abel', code: '42105', phone: '(21) 2199-2400', address: 'Av. Roberto Silveira, 29', city: 'Niterói-RJ', segment: 'Completo' },
      { id: 'school-3', name: 'Colégio La Salle Sobradinho', code: '31562', phone: '(61) 3591-8500', address: 'Quadra 14, Área Especial 1', city: 'Sobradinho-DF', segment: 'Infantil' }
    ];
  });

  const [grades, setGrades] = useState<Grade[]>(() => {
    const defaultList: Grade[] = [
      { id: 'grade-1', name: 'Berçário I', ageGroup: 'bebês', description: 'Estímulo sensorial, cuidados afetuosos e estimulação motora inicial para bebês de 0 a 1 ano e 6 meses.' },
      { id: 'grade-2', name: 'Maternal I', ageGroup: 'pequenos', description: 'Descobertas corporais, expressão oral primária e socialização guiada para crianças de 1 ano e 7 meses a 2 anos e 6 meses.' },
      { id: 'grade-3', name: 'Maternal II', ageGroup: 'pequenos', description: 'Atividades heurísticas, brincadeiras rítmicas e autonomia motora básica de 2 anos e 7 meses a 3 anos e 11 meses.' },
      { id: 'grade-4', name: 'Infantil II - B', ageGroup: 'pequenos', description: 'Letramento inicial, criatividade, projetos BNCC de vivência espacial de 4 anos a 5 anos.' },
      { id: 'grade-5', name: 'Infantil III - A', ageGroup: 'pequenos', description: 'Transição pedagógica, ampliação cognitiva e habilidades pré-letramento para 5 a 6 anos.' },
      // Novas séries - Ensino Fundamental
      { id: 'grade-6', name: '1º Ano - Ensino Fundamental I', ageGroup: 'grandes', description: 'Alfabetização e letramento lúdico, desenvolvimento da autonomia acadêmica inicial.' },
      { id: 'grade-7', name: '5º Ano - Ensino Fundamental I', ageGroup: 'grandes', description: 'Consolidação do pensamento científico, matemático e desenvolvimento de projetos de sustentabilidade.' },
      { id: 'grade-8', name: '9º Ano - Ensino Fundamental II', ageGroup: 'grandes', description: 'Transição para o Ensino Médio, aprofundamento das ciências humanas e exatas e autonomia crítica.' },
      // Novas séries - Ensino Médio
      { id: 'grade-9', name: '1º Ano - Ensino Médio', ageGroup: 'grandes', description: 'Itinerários formativos iniciais, projeto de vida e introdução ao pensamento analítico avançado.' },
      { id: 'grade-10', name: '3º Ano - Ensino Médio', ageGroup: 'grandes', description: 'Foco no ENEM/Vestibulares, consolidação do conhecimento científico e conclusão do projeto de vida acadêmico.' }
    ];
    const saved = localStorage.getItem('la_salle_grades');
    if (saved) {
      try {
        const parsed: Grade[] = JSON.parse(saved);
        const merged = [...parsed];
        defaultList.forEach(g => {
          if (!merged.some(x => x.id === g.id)) {
            merged.push(g);
          }
        });
        return merged;
      } catch (e) {
        return defaultList;
      }
    }
    return defaultList;
  });

  const [teachers, setTeachers] = useState<Teacher[]>(() => {
    const defaultList = [
      { id: 'teacher-1', name: 'Profª Luciana Martins', code: 'PE-4122', email: 'luciana.admin@lasalle.org', phone: '(61) 98114-5511', status: 'Ativo' as const },
      { id: 'teacher-2', name: 'Prof. Pedro Reis', code: 'PE-2510', email: 'pedro.professor@lasalle.org', phone: '(61) 98455-8822', status: 'Ativo' as const },
      { id: 'teacher-3', name: 'Profª Bruna Santos', code: 'PE-7723', email: 'bruna.santos@lasalle.org', phone: '(61) 99122-3344', status: 'Ativo' as const },
      { id: 'teacher-4', name: 'Profª Sílvia Coordenadora', code: 'PE-1002', email: 'silvia.coord@lasalle.org', phone: '(61) 98233-4400', status: 'Ativo' as const },
      { id: 'teacher-5', name: 'Profª Amanda Costa', code: 'PE-5100', email: 'amanda.costa@lasalle.org', phone: '(61) 98122-0005', status: 'Ativo' as const },
      { id: 'teacher-6', name: 'Prof. Fernando Lima', code: 'PE-6100', email: 'fernando.lima@lasalle.org', phone: '(61) 98122-0006', status: 'Ativo' as const },
      { id: 'teacher-7', name: 'Profª Camila Rodrigues', code: 'PE-7100', email: 'camila.rodrigues@lasalle.org', phone: '(61) 98122-0007', status: 'Ativo' as const },
      { id: 'teacher-8', name: 'Profª Daniela Souza', code: 'PE-8100', email: 'daniela.souza@lasalle.org', phone: '(61) 98122-0008', status: 'Ativo' as const },
      { id: 'teacher-9', name: 'Prof. Rodrigo Ramos', code: 'PE-9100', email: 'rodrigo.ramos@lasalle.org', phone: '(61) 98122-0009', status: 'Ativo' as const },
      // Novos professores - Ensino Fundamental e Médio
      { id: 'teacher-10', name: 'Profª Clara Mendes', code: 'PE-1010', email: 'clara.mendes@lasalle.org', phone: '(61) 98220-1010', status: 'Ativo' as const },
      { id: 'teacher-11', name: 'Prof. Roberto Santos', code: 'PE-1111', email: 'roberto.santos@lasalle.org', phone: '(61) 98220-1111', status: 'Ativo' as const },
      { id: 'teacher-12', name: 'Profª Paula Lima', code: 'PE-1212', email: 'paula.lima@lasalle.org', phone: '(61) 98220-1212', status: 'Ativo' as const },
      { id: 'teacher-13', name: 'Prof. Carlos Souza', code: 'PE-1313', email: 'carlos.souza@lasalle.org', phone: '(61) 98220-1313', status: 'Ativo' as const }
    ];
    const saved = localStorage.getItem('la_salle_teachers');
    if (saved) {
      try {
        const parsed: Teacher[] = JSON.parse(saved);
        const merged = [...parsed];
        defaultList.forEach(t => {
          if (!merged.some(x => x.id === t.id)) {
            merged.push(t);
          }
        });
        return merged;
      } catch (e) {
        return defaultList;
      }
    }
    return defaultList;
  });

  const [classes, setClasses] = useState<ClassGroup[]>(() => {
    const defaultList = [
      { id: 'maternal-2', name: 'Maternal II', gradeId: 'grade-3', schoolId: 'school-1', teacherId: 'teacher-2', shift: 'Integral' as const },
      { id: 'infantil-2', name: 'Infantil II - B', gradeId: 'grade-4', schoolId: 'school-1', teacherId: 'teacher-1', shift: 'Tarde' as const },
      { id: 'bercario-1', name: 'Berçário I', gradeId: 'grade-1', schoolId: 'school-1', teacherId: 'teacher-3', shift: 'Manhã' as const },
      { id: 'maternal-1', name: 'Maternal I', gradeId: 'grade-2', schoolId: 'school-1', teacherId: 'teacher-3', shift: 'Integral' as const },
      { id: 'infantil-3', name: 'Infantil III - A', gradeId: 'grade-5', schoolId: 'school-1', teacherId: 'teacher-4', shift: 'Manhã' as const },
      { id: 'bercario-2', name: 'Berçário II - B', gradeId: 'grade-1', schoolId: 'school-1', teacherId: 'teacher-5', shift: 'Tarde' as const },
      { id: 'maternal-1b', name: 'Maternal I - B', gradeId: 'grade-2', schoolId: 'school-1', teacherId: 'teacher-6', shift: 'Integral' as const },
      { id: 'maternal-2b', name: 'Maternal II - B', gradeId: 'grade-3', schoolId: 'school-1', teacherId: 'teacher-7', shift: 'Manhã' as const },
      { id: 'infantil-2c', name: 'Infantil II - C', gradeId: 'grade-4', schoolId: 'school-1', teacherId: 'teacher-8', shift: 'Tarde' as const },
      { id: 'infantil-3b', name: 'Infantil III - B', gradeId: 'grade-5', schoolId: 'school-1', teacherId: 'teacher-9', shift: 'Integral' as const },
      // Novas turmas - Ensino Fundamental I, II e Médio
      { id: 'class-fund-1', name: '1º Ano - Fund. I - A', gradeId: 'grade-6', schoolId: 'school-1', teacherId: 'teacher-10', shift: 'Manhã' as const },
      { id: 'class-fund-5', name: '5º Ano - Fund. I - B', gradeId: 'grade-7', schoolId: 'school-1', teacherId: 'teacher-10', shift: 'Tarde' as const },
      { id: 'class-fund-9', name: '9º Ano - Fund. II - A', gradeId: 'grade-8', schoolId: 'school-1', teacherId: 'teacher-11', shift: 'Integral' as const },
      { id: 'class-medio-1', name: '1º Ano - Ensino Médio A', gradeId: 'grade-9', schoolId: 'school-1', teacherId: 'teacher-12', shift: 'Manhã' as const },
      { id: 'class-medio-3', name: '3º Ano - Ensino Médio B', gradeId: 'grade-10', schoolId: 'school-1', teacherId: 'teacher-13', shift: 'Integral' as const }
    ];
    const saved = localStorage.getItem('la_salle_classes');
    if (saved) {
      try {
        const parsed: ClassGroup[] = JSON.parse(saved);
        const merged = [...parsed];
        defaultList.forEach(c => {
          if (!merged.some(x => x.id === c.id)) {
            merged.push(c);
          }
        });
        return merged;
      } catch (e) {
        return defaultList;
      }
    }
    return defaultList;
  });

  // Persists other entities to localStorage
  useEffect(() => {
    localStorage.setItem('la_salle_schools', JSON.stringify(schools));
  }, [schools]);

  useEffect(() => {
    localStorage.setItem('la_salle_grades', JSON.stringify(grades));
  }, [grades]);

  useEffect(() => {
    localStorage.setItem('la_salle_teachers', JSON.stringify(teachers));
  }, [teachers]);

  useEffect(() => {
    localStorage.setItem('la_salle_classes', JSON.stringify(classes));
  }, [classes]);

  const [parents, setParents] = useState<Parent[]>(() => {
    const defaultParents: Parent[] = [
      { id: 'parent-1', name: 'Ricardo Dias (Pai)', email: 'ricardo.responsavel@lasalle.org', phone: '(61) 99341-2231', childrenIds: ['student-1', 'student-5', 'student-6'], status: 'Ativo' },
      { id: 'parent-2', name: 'Mariana Almeida (Mãe)', email: 'mariana.almeida@lasalle.org', phone: '(61) 98114-1234', childrenIds: ['student-7', 'student-8'], status: 'Ativo' },
      { id: 'parent-3', name: 'Carlos Rocha (Pai)', email: 'carlos.rocha@lasalle.org', phone: '(61) 98455-4321', childrenIds: ['student-3', 'student-9', 'student-10'], status: 'Ativo' },
      { id: 'parent-4', name: 'Patrícia Souza (Mãe)', email: 'patricia.souza@lasalle.org', phone: '(61) 99122-8765', childrenIds: ['student-2', 'student-11'], status: 'Ativo' },
      { id: 'parent-5', name: 'Fernanda Costa (Mãe)', email: 'fernanda.costa@lasalle.org', phone: '(61) 98223-5599', childrenIds: ['student-4', 'student-12', 'student-13'], status: 'Ativo' },
      { id: 'parent-6', name: 'Gustavo Pinheiro (Pai)', email: 'gustavo.pinheiro@lasalle.org', phone: '(61) 99114-6655', childrenIds: ['student-14', 'student-15'], status: 'Ativo' },
      // 20 novas famílias adicionais recomendadas no requisito
      { id: 'parent-20', name: 'Marcos Silva (Pai)', email: 'marcos.silva@fam.org', phone: '(61) 98111-2001', childrenIds: ['student-20', 'student-21'], status: 'Ativo' },
      { id: 'parent-21', name: 'Juliana Santos (Mãe)', email: 'juliana.santos@fam.org', phone: '(61) 98111-2002', childrenIds: ['student-22'], status: 'Ativo' },
      { id: 'parent-22', name: 'Felipe Oliveira (Pai)', email: 'felipe.oliveira@fam.org', phone: '(61) 98111-2003', childrenIds: ['student-23', 'student-24', 'student-25'], status: 'Ativo' },
      { id: 'parent-23', name: 'Aline Souza (Mãe)', email: 'aline.souza@fam.org', phone: '(61) 98111-2004', childrenIds: ['student-26'], status: 'Ativo' },
      { id: 'parent-24', name: 'Thiago Rodrigues (Pai)', email: 'thiago.rodrigues@fam.org', phone: '(61) 98111-2005', childrenIds: ['student-27', 'student-28'], status: 'Ativo' },
      { id: 'parent-25', name: 'Patrícia Ferreira (Mãe)', email: 'patricia.ferreira@fam.org', phone: '(61) 98111-2006', childrenIds: ['student-29', 'student-30', 'student-31'], status: 'Ativo' },
      { id: 'parent-26', name: 'Roberto Alves (Pai)', email: 'roberto.alves@fam.org', phone: '(61) 98111-2007', childrenIds: ['student-32'], status: 'Ativo' },
      { id: 'parent-27', name: 'Carla Pereira (Mãe)', email: 'carla.pereira@fam.org', phone: '(61) 98111-2008', childrenIds: ['student-33', 'student-34'], status: 'Ativo' },
      { id: 'parent-28', name: 'Sandra Gomes (Mãe)', email: 'sandra.gomes@fam.org', phone: '(61) 98111-2009', childrenIds: ['student-35', 'student-36', 'student-37'], status: 'Ativo' },
      { id: 'parent-29', name: 'Eduardo Ribeiro (Pai)', email: 'eduardo.ribeiro@fam.org', phone: '(61) 98111-2010', childrenIds: ['student-38'], status: 'Ativo' },
      { id: 'parent-30', name: 'Mariana Martins (Mãe)', email: 'mariana.martins@fam.org', phone: '(61) 98111-2011', childrenIds: ['student-39', 'student-40'], status: 'Ativo' },
      { id: 'parent-31', name: 'Rafael Carvalho (Pai)', email: 'rafael.carvalho@fam.org', phone: '(61) 98111-2012', childrenIds: ['student-41', 'student-42', 'student-43'], status: 'Ativo' },
      { id: 'parent-32', name: 'Beatriz Almeida (Mãe)', email: 'beatriz.almeida@fam.org', phone: '(61) 98111-2013', childrenIds: ['student-44'], status: 'Ativo' },
      { id: 'parent-33', name: 'Ricardo Lopes (Pai)', email: 'ricardo.lopes@fam.org', phone: '(61) 98111-2014', childrenIds: ['student-45', 'student-46'], status: 'Ativo' },
      { id: 'parent-34', name: 'Fernanda Soares (Mãe)', email: 'fernanda.soares@fam.org', phone: '(61) 98111-2015', childrenIds: ['student-47', 'student-48', 'student-49'], status: 'Ativo' },
      { id: 'parent-35', name: 'Bruno Fernandes (Pai)', email: 'bruno.fernandes@fam.org', phone: '(61) 98111-2016', childrenIds: ['student-50'], status: 'Ativo' },
      { id: 'parent-36', name: 'Camila Vieira (Mãe)', email: 'camila.vieira@fam.org', phone: '(61) 98111-2017', childrenIds: ['student-51', 'student-52'], status: 'Ativo' },
      { id: 'parent-37', name: 'Gustavo Barbosa (Pai)', email: 'gustavo.barbosa@fam.org', phone: '(61) 98111-2018', childrenIds: ['student-53', 'student-54', 'student-55'], status: 'Ativo' },
      { id: 'parent-38', name: 'Letícia Rocha (Mãe)', email: 'leticia.rocha@fam.org', phone: '(61) 98111-2019', childrenIds: ['student-56'], status: 'Ativo' },
      { id: 'parent-39', name: 'Daniel Dias (Pai)', email: 'daniel.dias@fam.org', phone: '(61) 98111-2020', childrenIds: ['student-57', 'student-58'], status: 'Ativo' }
    ];

    const saved = localStorage.getItem('la_salle_parents');
    if (saved) {
      const parsed = JSON.parse(saved) as Parent[];
      // If we don't have parent-20, let's merge or reset!
      if (!parsed.some(p => p.id === 'parent-20')) {
        const merged = [...parsed];
        defaultParents.forEach(p => {
          if (!merged.some(x => x.id === p.id)) {
            merged.push(p);
          }
        });
        localStorage.setItem('la_salle_parents', JSON.stringify(merged));
        return merged;
      }
      return parsed;
    }
    return defaultParents;
  });

  useEffect(() => {
    localStorage.setItem('la_salle_parents', JSON.stringify(parents));
  }, [parents]);

  // Form Fields - Responsável (Parent)
  const [parentName, setParentName] = useState('');
  const [parentEmail, setParentEmail] = useState('');
  const [parentPhone, setParentPhone] = useState('');
  const [parentStatus, setParentStatus] = useState<'Ativo' | 'Inativo'>('Ativo');
  const [parentSelectedChildrenIds, setParentSelectedChildrenIds] = useState<string[]>([]);

  // Draft Dependents interface
  interface DraftDependent {
    tempId: string;
    name: string;
    age: string;
    ageGroup: 'bebês' | 'pequenos' | 'grandes';
    classId: string;
  }
  const [draftDependents, setDraftDependents] = useState<DraftDependent[]>([]);
  
  // Field values for inputting a new draft child
  const [newDepName, setNewDepName] = useState('');
  const [newDepAge, setNewDepAge] = useState('');
  const [newDepClassId, setNewDepClassId] = useState('');
  const [newDepAgeGroup, setNewDepAgeGroup] = useState<'bebês' | 'pequenos' | 'grandes'>('pequenos');

  // Temporary Form States
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  // Form Fields - Escola
  const [schoolName, setSchoolName] = useState('');
  const [schoolCode, setSchoolCode] = useState('');
  const [schoolPhone, setSchoolPhone] = useState('');
  const [schoolAddress, setSchoolAddress] = useState('');
  const [schoolCity, setSchoolCity] = useState('');
  const [schoolSegment, setSchoolSegment] = useState<'Infantil' | 'Fundamental' | 'Médio' | 'Completo'>('Completo');
  const [schoolCep, setSchoolCep] = useState('');

  // Form Fields - Série
  const [gradeName, setGradeName] = useState('');
  const [gradeAgeGroup, setGradeAgeGroup] = useState<'bebês' | 'pequenos' | 'grandes'>('pequenos');
  const [gradeDescription, setGradeDescription] = useState('');

  // Form Fields - Turma
  const [classNameField, setClassNameField] = useState('');
  const [classGradeId, setClassGradeId] = useState('');
  const [classSchoolId, setClassSchoolId] = useState('');
  const [classTeacherId, setClassTeacherId] = useState('');
  const [classShift, setClassShift] = useState<'Manhã' | 'Tarde' | 'Integral'>('Integral');

  // Form Fields - Professor
  const [teacherName, setTeacherName] = useState('');
  const [teacherCode, setTeacherCode] = useState('');
  const [teacherEmail, setTeacherEmail] = useState('');
  const [teacherPhone, setTeacherPhone] = useState('');
  const [teacherStatus, setTeacherStatus] = useState<'Ativo' | 'Licença' | 'Inativo'>('Ativo');
  const [teacherCep, setTeacherCep] = useState('');
  const [teacherAddress, setTeacherAddress] = useState('');
  const [teacherCity, setTeacherCity] = useState('');
  const [teacherClassId, setTeacherClassId] = useState('');

  // Form Fields - Aluno
  const [studentName, setStudentName] = useState('');
  const [studentAge, setStudentAge] = useState('');
  const [studentAgeGroup, setStudentAgeGroup] = useState<'bebês' | 'pequenos' | 'grandes'>('pequenos');
  const [studentClassId, setStudentClassId] = useState('');
  const [studentSchoolId, setStudentSchoolId] = useState('');
  const [studentHasSpecialNeeds, setStudentHasSpecialNeeds] = useState(false);
  const [studentSpecialNeeds, setStudentSpecialNeeds] = useState('');
  const [studentPeiPlan, setStudentPeiPlan] = useState('');
  const [studentCep, setStudentCep] = useState('');
  const [studentAddress, setStudentAddress] = useState('');
  const [studentCity, setStudentCity] = useState('');
  const [studentPhoto, setStudentPhoto] = useState('');

  // Form Fields - Responsável (Parent)
  const [parentCep, setParentCep] = useState('');
  const [parentAddress, setParentAddress] = useState('');
  const [parentCity, setParentCity] = useState('');

  // Form Fields - Profissão
  const [profName, setProfName] = useState('');
  const [profDescription, setProfDescription] = useState('');

  // Form Fields - Profissional (Specialist)
  const [specName, setSpecName] = useState('');
  const [specProfessionId, setSpecProfessionId] = useState('');
  const [specRegisterNum, setSpecRegisterNum] = useState('');
  const [specEmail, setSpecEmail] = useState('');
  const [specPhone, setSpecPhone] = useState('');
  const [specStatus, setSpecStatus] = useState<'Ativo' | 'Licença' | 'Inativo'>('Ativo');
  const [specCep, setSpecCep] = useState('');
  const [specAddress, setSpecAddress] = useState('');
  const [specCity, setSpecCity] = useState('');

  // Address search utility
  const [isSearchingCep, setIsSearchingCep] = useState(false);

  const fetchAddressByCep = async (cepValue: string, setAddress: (val: string) => void, setCity: (val: string) => void) => {
    const cleanCep = cepValue.replace(/\D/g, '');
    if (cleanCep.length !== 8) {
      triggerNotification('O CEP deve conter exatamente 8 dígitos.', 'danger');
      return;
    }

    setIsSearchingCep(true);
    try {
      const response = await fetch(`https://viacep.com.br/ws/${cleanCep}/json/`);
      const data = await response.json();
      
      if (data.erro) {
        triggerNotification('CEP não localizado nas bases federais.', 'danger');
      } else {
        const fullAddress = [data.logradouro, data.bairro].filter(Boolean).join(', ');
        const fullCity = [data.localidade, data.uf].filter(Boolean).join('-');
        
        setAddress(fullAddress);
        setCity(fullCity);
        triggerNotification('CEP localizado e endereço preenchido com sucesso!');
      }
    } catch (error) {
      console.error(error);
      triggerNotification('Falha ao consultar CEP. Verifique o ViaCEP ou sua conexão.', 'danger');
    } finally {
      setIsSearchingCep(false);
    }
  };

  const renderCepSearchField = (
    cepValue: string, 
    setCep: (val: string) => void, 
    setAddress: (val: string) => void, 
    setCity: (val: string) => void
  ) => {
    return (
      <div className="space-y-1.5">
        <label className="block text-[10px] font-black uppercase text-slate-400 tracking-wider">CEP para busca automática</label>
        <div className="relative flex gap-2">
          <input 
            type="text" 
            value={cepValue}
            onChange={(e) => {
              let val = e.target.value.replace(/\D/g, '');
              if (val.length > 8) val = val.substring(0, 8);
              if (val.length > 5) {
                val = val.substring(0, 5) + '-' + val.substring(5);
              }
              setCep(val);
              if (val.replace(/\D/g, '').length === 8) {
                fetchAddressByCep(val, setAddress, setCity);
              }
            }}
            placeholder="Ex: 70390-025"
            className="w-full bg-slate-50 text-slate-900 font-semibold px-4 py-3 rounded-xl border border-slate-200 focus:bg-white focus:ring-2 focus:ring-amber-300 outline-none text-xs"
          />
          <button
            type="button"
            onClick={() => fetchAddressByCep(cepValue, setAddress, setCity)}
            disabled={isSearchingCep}
            className="bg-amber-400 hover:bg-amber-300 disabled:bg-slate-200 text-slate-950 px-3.5 rounded-xl text-xs font-black uppercase tracking-wider flex items-center justify-center transition border border-amber-500/20 cursor-pointer shadow-sm min-w-[100px]"
          >
            {isSearchingCep ? 'Buscando...' : 'Buscar CEP'}
          </button>
        </div>
      </div>
    );
  };

  // Show a status banner
  const triggerNotification = (message: string, type: 'success' | 'danger' = 'success') => {
    setNotification({ message, type });
    setTimeout(() => {
      setNotification(null);
    }, 4500);
  };

  // Switch Tabs & Reset Form Screen
  const handleTabChange = (tab: typeof activeTab) => {
    setActiveTab(tab);
    setIsFormOpen(false);
    setEditingId(null);
    setSearchQuery('');
    clearFormFields();
  };

  const clearFormFields = () => {
    setSchoolName('');
    setSchoolCode('');
    setSchoolPhone('');
    setSchoolAddress('');
    setSchoolCity('');
    setSchoolSegment('Completo');
    setSchoolCep('');

    setGradeName('');
    setGradeAgeGroup('pequenos');
    setGradeDescription('');

    setClassNameField('');
    setClassGradeId('');
    setClassSchoolId('');
    setClassTeacherId('');
    setClassShift('Integral');

    setTeacherName('');
    setTeacherCode('');
    setTeacherEmail('');
    setTeacherPhone('');
    setTeacherStatus('Ativo');
    setTeacherCep('');
    setTeacherAddress('');
    setTeacherCity('');
    setTeacherClassId('');

    setStudentName('');
    setStudentAge('');
    setStudentAgeGroup('pequenos');
    setStudentClassId('');
    setStudentSchoolId('');
    setStudentHasSpecialNeeds(false);
    setStudentSpecialNeeds('');
    setStudentPeiPlan('');
    setStudentCep('');
    setStudentAddress('');
    setStudentCity('');
    setStudentPhoto('');

    setParentName('');
    setParentEmail('');
    setParentPhone('');
    setParentStatus('Ativo');
    setParentSelectedChildrenIds([]);
    setDraftDependents([]);
    setNewDepName('');
    setNewDepAge('');
    setNewDepClassId(classes[0]?.id || '');
    setNewDepAgeGroup('pequenos');
    setParentCep('');
    setParentAddress('');
    setParentCity('');

    setProfName('');
    setProfDescription('');

    setSpecName('');
    setSpecProfessionId('');
    setSpecRegisterNum('');
    setSpecEmail('');
    setSpecPhone('');
    setSpecStatus('Ativo');
    setSpecCep('');
    setSpecAddress('');
    setSpecCity('');
  };

  const handleOpenCreateForm = () => {
    clearFormFields();
    setEditingId(null);
    setIsFormOpen(true);

    // Auto-fill defaults for dropdowns if available
    if (activeTab === 'turma') {
      if (grades.length > 0) setClassGradeId(grades[0].id);
      if (schools.length > 0) setClassSchoolId(schools[0].id);
      if (teachers.length > 0) setClassTeacherId(teachers[0].id);
    } else if (activeTab === 'aluno') {
      if (classes.length > 0) setStudentClassId(classes[0].id);
      if (schools.length > 0) setStudentSchoolId(schools[0].id);
    } else if (activeTab === 'responsavel') {
      if (classes.length > 0) setNewDepClassId(classes[0].id);
    } else if (activeTab === 'profissional') {
      if (professions.length > 0) setSpecProfessionId(professions[0].id);
    }
  };

  // Populate Field states for Edit
  const handleStartEdit = (item: any) => {
    setEditingId(item.id);
    setIsFormOpen(true);

    if (activeTab === 'escola') {
      const e = item as School;
      setSchoolName(e.name);
      setSchoolCode(e.code);
      setSchoolPhone(e.phone);
      setSchoolAddress(e.address);
      setSchoolCity(e.city);
      setSchoolSegment(e.segment);
      setSchoolCep(e.cep || '');
    } else if (activeTab === 'serie') {
      const g = item as Grade;
      setGradeName(g.name);
      setGradeAgeGroup(g.ageGroup);
      setGradeDescription(g.description);
    } else if (activeTab === 'turma') {
      const c = item as ClassGroup;
      setClassNameField(c.name);
      setClassGradeId(c.gradeId);
      setClassSchoolId(c.schoolId);
      setClassTeacherId(c.teacherId);
      setClassShift(c.shift);
    } else if (activeTab === 'professor') {
      const t = item as Teacher;
      setTeacherName(t.name);
      setTeacherCode(t.code);
      setTeacherEmail(t.email);
      setTeacherPhone(t.phone);
      setTeacherStatus(t.status);
      setTeacherCep(t.cep || '');
      setTeacherAddress(t.address || '');
      setTeacherCity(t.city || '');
      const associatedClass = classes.find(c => c.teacherId === t.id);
      setTeacherClassId(associatedClass ? associatedClass.id : '');
    } else if (activeTab === 'aluno') {
      const a = item as Student;
      setStudentName(a.name);
      setStudentAge(a.age);
      setStudentAgeGroup(a.ageGroup);
      setStudentClassId(a.classId);
      setStudentSchoolId(a.schoolId || '');
      setStudentHasSpecialNeeds(a.hasSpecialNeeds);
      setStudentSpecialNeeds(a.specialNeeds || '');
      setStudentPeiPlan(a.peiPlan || '');
      setStudentCep(a.cep || '');
      setStudentAddress(a.address || '');
      setStudentCity(a.city || '');
      setStudentPhoto(a.photo || '');
    } else if (activeTab === 'responsavel') {
      const p = item as Parent;
      setParentName(p.name);
      setParentEmail(p.email);
      setParentPhone(p.phone);
      setParentStatus(p.status);
      setParentSelectedChildrenIds(p.childrenIds || []);
      setDraftDependents([]);
      setParentCep(p.cep || '');
      setParentAddress(p.address || '');
      setParentCity(p.city || '');
    } else if (activeTab === 'profissao') {
      const pr = item as Profession;
      setProfName(pr.name);
      setProfDescription(pr.description);
    } else if (activeTab === 'profissional') {
      const sp = item as Specialist;
      setSpecName(sp.name);
      setSpecProfessionId(sp.professionId);
      setSpecRegisterNum(sp.registerNum);
      setSpecEmail(sp.email);
      setSpecPhone(sp.phone);
      setSpecStatus(sp.status);
      setSpecCep(sp.cep || '');
      setSpecAddress(sp.address || '');
      setSpecCity(sp.city || '');
    }
  };

  // Actions: Save / Update Form Submission
  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (activeTab === 'escola') {
      if (!schoolName || !schoolCode) {
        triggerNotification('Por favor, preencha o nome e o código da escola.', 'danger');
        return;
      }
      if (editingId) {
        setSchools(schools.map(s => s.id === editingId ? {
          ...s,
          name: schoolName,
          code: schoolCode,
          phone: schoolPhone,
          address: schoolAddress,
          city: schoolCity,
          segment: schoolSegment,
          cep: schoolCep
        } : s));
        triggerNotification(`Escola "${schoolName}" atualizada com sucesso!`);
      } else {
        const newSchool: School = {
          id: `school-${Date.now()}`,
          name: schoolName,
          code: schoolCode,
          phone: schoolPhone,
          address: schoolAddress,
          city: schoolCity,
          segment: schoolSegment,
          cep: schoolCep
        };
        setSchools([...schools, newSchool]);
        triggerNotification(`Escola "${schoolName}" cadastrada com sucesso!`);
      }
    } 

    else if (activeTab === 'serie') {
      if (!gradeName) {
        triggerNotification('O nome da série é obrigatório.', 'danger');
        return;
      }
      if (editingId) {
        setGrades(grades.map(g => g.id === editingId ? {
          ...g,
          name: gradeName,
          ageGroup: gradeAgeGroup,
          description: gradeDescription
        } : g));
        triggerNotification(`Série "${gradeName}" atualizada com sucesso!`);
      } else {
        const newGrade: Grade = {
          id: `grade-${Date.now()}`,
          name: gradeName,
          ageGroup: gradeAgeGroup,
          description: gradeDescription
        };
        setGrades([...grades, newGrade]);
        triggerNotification(`Série "${gradeName}" cadastrada com sucesso!`);
      }
    } 

    else if (activeTab === 'turma') {
      if (!classNameField || !classGradeId || !classSchoolId || !classTeacherId) {
        triggerNotification('Preencha o nome, selecione a série, escola e professor.', 'danger');
        return;
      }
      if (editingId) {
        setClasses(classes.map(c => c.id === editingId ? {
          ...c,
          name: classNameField,
          gradeId: classGradeId,
          schoolId: classSchoolId,
          teacherId: classTeacherId,
          shift: classShift
        } : c));
        triggerNotification(`Turma "${classNameField}" atualizada com sucesso!`);
      } else {
        const newClass: ClassGroup = {
          id: `class-${Date.now()}`,
          name: classNameField,
          gradeId: classGradeId,
          schoolId: classSchoolId,
          teacherId: classTeacherId,
          shift: classShift
        };
        setClasses([...classes, newClass]);
        triggerNotification(`Turma "${classNameField}" cadastrada com sucesso!`);
      }
    } 

    else if (activeTab === 'professor') {
      if (!teacherName || !teacherEmail) {
        triggerNotification('Preencha o nome e e-mail do professor.', 'danger');
        return;
      }
      const targetTeacherId = editingId || `teacher-${Date.now()}`;
      if (editingId) {
        setTeachers(teachers.map(t => t.id === editingId ? {
          ...t,
          name: teacherName,
          code: teacherCode || `PE-${Math.floor(1000 + Math.random() * 9000)}`,
          email: teacherEmail,
          phone: teacherPhone,
          status: teacherStatus,
          cep: teacherCep,
          address: teacherAddress,
          city: teacherCity
        } : t));
        triggerNotification(`Professor(a) "${teacherName}" atualizado com sucesso!`);
      } else {
        const newTeacher: Teacher = {
          id: targetTeacherId,
          name: teacherName,
          code: teacherCode || `PE-${Math.floor(1000 + Math.random() * 9000)}`,
          email: teacherEmail,
          phone: teacherPhone,
          status: teacherStatus,
          cep: teacherCep,
          address: teacherAddress,
          city: teacherCity
        };
        setTeachers([...teachers, newTeacher]);
        triggerNotification(`Professor(a) "${teacherName}" cadastrado com sucesso!`);
      }

      if (teacherClassId) {
        setClasses(classes.map(c => {
          if (c.id === teacherClassId) {
            return { ...c, teacherId: targetTeacherId };
          } else if (c.teacherId === targetTeacherId) {
            return { ...c, teacherId: '' };
          }
          return c;
        }));
      }
    } 

    else if (activeTab === 'aluno') {
      if (!studentName || !studentAge || !studentClassId) {
        triggerNotification('Preencha o nome, idade e selecione a turma do aluno.', 'danger');
        return;
      }
      
      const targetClass = classes.find(c => c.id === studentClassId);
      const classNameStr = targetClass ? targetClass.name : 'Turma Geral';

      if (editingId) {
        setStudents(students.map(s => s.id === editingId ? {
          ...s,
          name: studentName,
          age: studentAge,
          ageGroup: studentAgeGroup,
          classId: studentClassId,
          className: classNameStr,
          schoolId: studentSchoolId || undefined,
          hasSpecialNeeds: studentHasSpecialNeeds,
          specialNeeds: studentHasSpecialNeeds ? studentSpecialNeeds : undefined,
          peiPlan: studentHasSpecialNeeds ? studentPeiPlan : undefined,
          cep: studentCep,
          address: studentAddress,
          city: studentCity,
          photo: studentPhoto || undefined
        } : s));
        triggerNotification(`Aluno(a) "${studentName}" atualizado com sucesso!`);
      } else {
        const newStudent: Student = {
          id: `student-${Date.now()}`,
          name: studentName,
          age: studentAge,
          ageGroup: studentAgeGroup,
          classId: studentClassId,
          className: classNameStr,
          schoolId: studentSchoolId || undefined,
          hasSpecialNeeds: studentHasSpecialNeeds,
          specialNeeds: studentHasSpecialNeeds ? studentSpecialNeeds : undefined,
          peiPlan: studentHasSpecialNeeds ? studentPeiPlan : undefined,
          cep: studentCep,
          address: studentAddress,
          city: studentCity,
          photo: studentPhoto || undefined
        };
        setStudents([...students, newStudent]);
        triggerNotification(`Aluno(a) "${studentName}" matriculado com sucesso!`);
      }
    }

    else if (activeTab === 'responsavel') {
      if (!parentName || !parentEmail) {
        triggerNotification('O nome e o e-mail do responsável são obrigatórios.', 'danger');
        return;
      }

      // Convert draft dependents to actual students first on-the-spot
      const newlyCreatedStudents: Student[] = draftDependents.map((d, index) => {
        const targetClass = classes.find(c => c.id === d.classId);
        const classNameStr = targetClass ? targetClass.name : 'Turma Geral';
        return {
          id: `student-draft-${Date.now()}-${index}`,
          name: d.name,
          age: d.age,
          ageGroup: d.ageGroup,
          classId: d.classId,
          className: classNameStr,
          hasSpecialNeeds: false
        };
      });

      if (newlyCreatedStudents.length > 0) {
        setStudents([...students, ...newlyCreatedStudents]);
      }

      const newlyCreatedIds = newlyCreatedStudents.map(s => s.id);
      const finalChildrenIds = [...parentSelectedChildrenIds, ...newlyCreatedIds];

      if (editingId) {
        setParents(parents.map(p => p.id === editingId ? {
          ...p,
          name: parentName,
          email: parentEmail,
          phone: parentPhone,
          status: parentStatus,
          childrenIds: finalChildrenIds,
          cep: parentCep,
          address: parentAddress,
          city: parentCity
        } : p));
        triggerNotification(`Responsável "${parentName}" atualizado com sucesso!`);
      } else {
        const newParent: Parent = {
          id: `parent-${Date.now()}`,
          name: parentName,
          email: parentEmail,
          phone: parentPhone,
          status: parentStatus,
          childrenIds: finalChildrenIds,
          cep: parentCep,
          address: parentAddress,
          city: parentCity
        };
        setParents([...parents, newParent]);
        triggerNotification(`Responsável "${parentName}" cadastrado com sucesso!`);
      }
    }

    else if (activeTab === 'profissao') {
      if (!profName) {
        triggerNotification('O nome da profissão/especialidade é obrigatório.', 'danger');
        return;
      }
      if (editingId) {
        setProfessions(professions.map(p => p.id === editingId ? {
          ...p,
          name: profName,
          description: profDescription
        } : p));
        triggerNotification(`Profissão "${profName}" atualizada com sucesso!`);
      } else {
        const newProf: Profession = {
          id: `prof-${Date.now()}`,
          name: profName,
          description: profDescription
        };
        setProfessions([...professions, newProf]);
        triggerNotification(`Profissão "${profName}" cadastrada com sucesso!`);
      }
    }

    else if (activeTab === 'profissional') {
      if (!specName || !specProfessionId || !specEmail) {
        triggerNotification('O nome, a especialidade e o e-mail do profissional são obrigatórios.', 'danger');
        return;
      }

      const pRef = professions.find(p => p.id === specProfessionId);
      const professionNameStr = pRef ? pRef.name : 'Outra Especialidade';

      if (editingId) {
        setSpecialists(specialists.map(sp => sp.id === editingId ? {
          ...sp,
          name: specName,
          professionId: specProfessionId,
          professionName: professionNameStr,
          registerNum: specRegisterNum,
          email: specEmail,
          phone: specPhone,
          status: specStatus,
          cep: specCep,
          address: specAddress,
          city: specCity
        } : sp));
        triggerNotification(`Profissional "${specName}" atualizado com sucesso!`);
      } else {
        const newSpec: Specialist = {
          id: `spec-${Date.now()}`,
          name: specName,
          professionId: specProfessionId,
          professionName: professionNameStr,
          registerNum: specRegisterNum,
          email: specEmail,
          phone: specPhone,
          status: specStatus,
          cep: specCep,
          address: specAddress,
          city: specCity
        };
        setSpecialists([...specialists, newSpec]);
        triggerNotification(`Profissional "${specName}" cadastrado com sucesso!`);
      }
    }

    setIsFormOpen(false);
    setEditingId(null);
    clearFormFields();
  };

  // Actions: Delete item
  const handleDeleteItem = (id: string, name: string) => {
    if (!window.confirm(`Tem certeza que deseja excluir "${name}"?`)) {
      return;
    }

    if (activeTab === 'escola') {
      setSchools(schools.filter(item => item.id !== id));
      triggerNotification(`Escola "${name}" excluída.`);
    } else if (activeTab === 'serie') {
      setGrades(grades.filter(item => item.id !== id));
      triggerNotification(`Série "${name}" excluída.`);
    } else if (activeTab === 'turma') {
      setClasses(classes.filter(item => item.id !== id));
      triggerNotification(`Turma "${name}" excluída.`);
    } else if (activeTab === 'professor') {
      setTeachers(teachers.filter(item => item.id !== id));
      triggerNotification(`Professor(a) "${name}" excluído.`);
    } else if (activeTab === 'aluno') {
      setStudents(students.filter(item => item.id !== id));
      triggerNotification(`Aluno(a) "${name}" desmatriculado.`);
    } else if (activeTab === 'responsavel') {
      setParents(parents.filter(item => item.id !== id));
      triggerNotification(`Responsável "${name}" excluído.`);
    } else if (activeTab === 'profissao') {
      setProfessions(professions.filter(item => item.id !== id));
      triggerNotification(`Profissão "${name}" excluída.`);
    } else if (activeTab === 'profissional') {
      setSpecialists(specialists.filter(item => item.id !== id));
      triggerNotification(`Profissional "${name}" excluído.`);
    }
  };

  // Helper getters to display relationships cleanly in lists
  const getSchoolName = (schoolId?: string) => {
    return schools.find(s => s.id === schoolId)?.name || 'Sem Escola Vinculada';
  };

  const getGradeName = (gradeId?: string) => {
    return grades.find(g => g.id === gradeId)?.name || 'Série Geral';
  };

  const getTeacherName = (teacherId?: string) => {
    return teachers.find(t => t.id === teacherId)?.name || 'Professor não atribuído';
  };

  // Filtered lists based on search query
  const getFilteredData = () => {
    const query = searchQuery.toLowerCase().trim();
    if (activeTab === 'escola') {
      return schools.filter(s => s.name.toLowerCase().includes(query) || s.code.includes(query) || s.city.toLowerCase().includes(query));
    } else if (activeTab === 'serie') {
      return grades.filter(g => g.name.toLowerCase().includes(query) || g.description.toLowerCase().includes(query));
    } else if (activeTab === 'turma') {
      return classes.filter(c => {
        const sName = getSchoolName(c.schoolId).toLowerCase();
        const tName = getTeacherName(c.teacherId).toLowerCase();
        return c.name.toLowerCase().includes(query) || sName.includes(query) || tName.includes(query);
      });
    } else if (activeTab === 'professor') {
      return teachers.filter(t => t.name.toLowerCase().includes(query) || t.code.toLowerCase().includes(query) || t.email.toLowerCase().includes(query));
    } else if (activeTab === 'aluno') {
      return students.filter(s => s.name.toLowerCase().includes(query) || s.className.toLowerCase().includes(query) || (s.specialNeeds && s.specialNeeds.toLowerCase().includes(query)));
    } else if (activeTab === 'responsavel') {
      return parents.filter(p => p.name.toLowerCase().includes(query) || p.email.toLowerCase().includes(query) || p.phone.includes(query));
    } else if (activeTab === 'profissao') {
      return professions.filter(p => p.name.toLowerCase().includes(query) || p.description.toLowerCase().includes(query));
    } else if (activeTab === 'profissional') {
      return specialists.filter(sp => sp.name.toLowerCase().includes(query) || sp.professionName.toLowerCase().includes(query) || sp.email.toLowerCase().includes(query) || (sp.registerNum && sp.registerNum.toLowerCase().includes(query)));
    } else {
      return [];
    }
  };

  const filteredData = getFilteredData();

  return (
    <div className="space-y-6 max-w-7xl mx-auto" id="school-registries-manager">
      
      {/* Top Workspace Header (Matches visual design rhythm) */}
      <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div className="space-y-1">
          <h1 className="text-xl md:text-2xl font-black text-slate-900 tracking-tight flex items-center gap-2">
             Módulo de Registros e Secretaria
          </h1>
          <p className="text-xs text-slate-450 font-bold uppercase tracking-wider">
            Gestão estrutural • Escolas, Alunos, Séries, Turmas e Docentes da rede Lumi
          </p>
        </div>
        
        <button 
          onClick={handleOpenCreateForm}
          className="bg-amber-400 hover:bg-amber-300 text-slate-950 px-4 py-2.5 rounded-xl text-xs font-black uppercase tracking-wider flex items-center gap-2 transition border border-amber-500/20 cursor-pointer shadow-sm"
        >
          <Plus size={14} className="stroke-[3px]" />
          Novo Registro
        </button>
      </div>

      {/* Success Notification Banner */}
      {notification && (
        <div className={`p-4 rounded-2xl text-xs font-bold flex items-center gap-3 animate-slide-in ${
          notification.type === 'success' 
            ? 'bg-emerald-50 border border-emerald-200 text-emerald-800' 
            : 'bg-rose-50 border border-rose-200 text-rose-800'
        }`}>
          {notification.type === 'success' ? <Check size={18} className="text-emerald-500 font-extrabold" /> : <AlertTriangle size={18} className="text-rose-500" />}
          <p>{notification.message}</p>
        </div>
      )}

      {/* Responsive layout with sidebar options and details layout */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        
        {/* Left Side Navigation Columns */}
        <div className="lg:col-span-1 space-y-4">
          <div className="bg-white rounded-3xl p-5 shadow-sm border border-slate-100 space-y-4">
            <h2 className="text-[10px] font-black uppercase text-slate-450 tracking-widest pl-2">Categorias de Cadastro</h2>
            
            <nav className="space-y-1.5">
              {[
                { id: 'escola', label: 'Escolas', count: schools.length, icon: <Building2 size={16} /> },
                { id: 'serie', label: 'Séries / Anos', count: grades.length, icon: <BookOpen size={16} /> },
                { id: 'turma', label: 'Turmas', count: classes.length, icon: <Layers size={16} /> },
                { id: 'professor', label: 'Professores', count: teachers.length, icon: <GraduationCap size={16} /> },
                { id: 'aluno', label: 'Alunos / Educandos', count: students.length, icon: <Users size={16} /> },
                { id: 'responsavel', label: 'Responsáveis / Pais', count: parents.length, icon: <UserCheck size={16} /> },
                { id: 'profissao', label: 'Especialidades / Profissões', count: professions.length, icon: <Briefcase size={16} /> },
                { id: 'profissional', label: 'Equipe Multiprofissional', count: specialists.length, icon: <HeartHandshake size={16} /> }
              ].map((tab) => {
                const active = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => handleTabChange(tab.id as any)}
                    className={`w-full text-left py-3 px-4 rounded-2xl text-xs font-bold flex items-center justify-between transition-all duration-150 ${
                      active 
                        ? 'bg-[#002D62] text-white font-extrabold shadow-sm border border-[#002D62]' 
                        : 'bg-slate-50 text-slate-600 hover:bg-slate-100 border border-slate-100 hover:border-slate-200'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      {tab.icon}
                      <span>{tab.label}</span>
                    </div>
                    <span className={`text-[9px] px-2 py-0.5 rounded-full font-black ${active ? 'bg-amber-400 text-slate-950' : 'bg-slate-200 text-slate-700'}`}>
                      {tab.count}
                    </span>
                  </button>
                );
              })}
            </nav>
          </div>

          {/* Context Card */}
          <div className="bg-slate-900 text-slate-200 rounded-3xl p-5 border border-slate-800 space-y-3 shadow-md">
            <h3 className="text-xs font-black text-amber-400 uppercase tracking-wider flex items-center gap-1.5">
              💡 Dica de Integração
            </h3>
            <p className="text-[11px] leading-relaxed text-slate-300 font-medium">
              Alunos matrículados neste módulo são vinculados às turmas que pertencem a escolas registradas. As rotinas diárias e PDI do portal refletem estas alterações dinamicamente.
            </p>
          </div>
        </div>

        {/* Center Panel - Dynamic Screen Lists or Form Editor */}
        <div className="lg:col-span-3">
          
          {isFormOpen ? (
            /* ================= FORM EDITOR SCREEN ================= */
            <form onSubmit={handleFormSubmit} className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100 space-y-6">
              
              <div className="border-b border-rose-50/10 pb-4 flex justify-between items-center">
                <div>
                  <h2 className="text-lg font-black text-[#0a2540] tracking-tight">
                    {editingId ? 'Editar Detalhes do Registro' : `Cadastrar Novo(a) ${
                      activeTab === 'escola' ? 'Escola' : 
                      activeTab === 'serie' ? 'Série' : 
                      activeTab === 'turma' ? 'Turma' : 
                      activeTab === 'professor' ? 'Professor(a)' : 
                      activeTab === 'responsavel' ? 'Responsável' : 
                      activeTab === 'aluno' ? 'Aluno(a)' : 
                      activeTab === 'profissao' ? 'Profissão' : 'Profissional'
                    }`}
                  </h2>
                  <p className="text-xs text-slate-400 font-semibold mt-1">Preencha todos os campos obrigatórios abaixo.</p>
                </div>
                <button
                  type="button"
                  onClick={() => setIsFormOpen(false)}
                  className="bg-slate-100 hover:bg-slate-200 rounded-xl p-2 text-slate-500 hover:text-slate-950 transition outline-none cursor-pointer"
                >
                  <X size={15} />
                </button>
              </div>

              {/* Form Areas depending on active tab */}
              
              {activeTab === 'profissao' && (
                <div className="space-y-4 animate-slide-in">
                  <div className="space-y-1.5">
                    <label className="block text-[10px] font-black uppercase text-slate-400 tracking-wider">Especialidade / Profissão *</label>
                    <input 
                      type="text" 
                      value={profName}
                      onChange={(e) => setProfName(e.target.value)}
                      placeholder="Ex: Psicopedagogia, Fonoaudiologia, Terapia Ocupacional"
                      className="w-full bg-slate-50 text-slate-900 font-semibold px-4 py-3 rounded-xl border border-slate-200 focus:bg-white focus:ring-2 focus:ring-amber-300 outline-none text-xs"
                      required
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="block text-[10px] font-black uppercase text-slate-400 tracking-wider">Breve Descrição e Atuação</label>
                    <textarea 
                      value={profDescription}
                      onChange={(e) => setProfDescription(e.target.value)}
                      rows={3}
                      placeholder="Descreva a atuação de atendimento multiprofissional deste cargo nas rotinas escolares..."
                      className="w-full bg-slate-50 text-slate-900 font-semibold px-4 py-3 rounded-xl border border-slate-200 focus:bg-white focus:ring-2 focus:ring-amber-300 outline-none text-xs resize-none"
                    />
                  </div>
                </div>
              )}

              {activeTab === 'profissional' && (
                <div className="space-y-4 animate-slide-in">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="block text-[10px] font-black uppercase text-slate-400 tracking-wider">Nome Completo do Profissional *</label>
                      <input 
                        type="text" 
                        value={specName}
                        onChange={(e) => setSpecName(e.target.value)}
                        placeholder="Ex: Dra. Juliana Menezes"
                        className="w-full bg-slate-50 text-slate-900 font-semibold px-4 py-3 rounded-xl border border-slate-200 focus:bg-white focus:ring-2 focus:ring-amber-300 outline-none text-xs"
                        required
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="block text-[10px] font-black uppercase text-slate-400 tracking-wider">Profissão / Categoria de Atendimento *</label>
                      <select 
                        value={specProfessionId}
                        onChange={(e) => setSpecProfessionId(e.target.value)}
                        className="w-full bg-slate-50 text-slate-800 font-semibold px-4 py-3 rounded-xl border border-slate-200 text-xs outline-none focus:bg-white"
                        required
                      >
                        <option value="">Selecione a profissão correspondente...</option>
                        {professions.map(p => <option key={p.id} value={p.id}>{p.name}</option>)}
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="space-y-1.5">
                      <label className="block text-[10px] font-black uppercase text-slate-400 tracking-wider">Registro de Classe (Ex: CRP, CREFITO) *</label>
                      <input 
                        type="text" 
                        value={specRegisterNum}
                        onChange={(e) => setSpecRegisterNum(e.target.value)}
                        placeholder="Ex: CRP 01/14294"
                        className="w-full bg-slate-50 text-slate-900 font-semibold px-4 py-3 rounded-xl border border-slate-200 focus:bg-white focus:ring-2 focus:ring-amber-300 outline-none text-xs"
                        required
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="block text-[10px] font-black uppercase text-slate-400 tracking-wider">E-mail de Trabalho *</label>
                      <input 
                        type="email" 
                        value={specEmail}
                        onChange={(e) => setSpecEmail(e.target.value)}
                        placeholder="Ex: juliana.fono@lumi.edu.br"
                        className="w-full bg-slate-50 text-slate-900 font-semibold px-4 py-3 rounded-xl border border-slate-200 focus:bg-white focus:ring-2 focus:ring-amber-300 outline-none text-xs"
                        required
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="block text-[10px] font-black uppercase text-slate-400 tracking-wider">Telefone com DDD</label>
                      <input 
                        type="text" 
                        value={specPhone}
                        onChange={(e) => setSpecPhone(e.target.value)}
                        placeholder="Ex: (61) 98322-1144"
                        className="w-full bg-slate-50 text-slate-900 font-semibold px-4 py-3 rounded-xl border border-slate-200 focus:bg-white focus:ring-2 focus:ring-amber-300 outline-none text-xs"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="block text-[10px] font-black uppercase text-slate-400 tracking-wider">Status Profissional</label>
                      <select 
                        value={specStatus}
                        onChange={(e) => setSpecStatus(e.target.value as any)}
                        className="w-full bg-slate-50 text-slate-800 font-semibold px-4 py-3 rounded-xl border border-slate-200 text-xs outline-none focus:bg-white"
                      >
                        <option value="Ativo">Ativo / Disponível</option>
                        <option value="Licença">Em Licença temporária</option>
                        <option value="Inativo">Inativo / Desvinculado</option>
                      </select>
                    </div>
                    <div className="space-y-4">
                      {renderCepSearchField(specCep, setSpecCep, setSpecAddress, setSpecCity)}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="md:col-span-2 space-y-1.5">
                      <label className="block text-[10px] font-black uppercase text-slate-400 tracking-wider">Endereço Residencial/Comercial</label>
                      <input 
                        type="text" 
                        value={specAddress}
                        onChange={(e) => setSpecAddress(e.target.value)}
                        placeholder="Ex: QI 15, Bloco C - Guará II"
                        className="w-full bg-slate-50 text-slate-900 font-semibold px-4 py-3 rounded-xl border border-slate-200 focus:bg-white focus:ring-2 focus:ring-amber-300 outline-none text-xs"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="block text-[10px] font-black uppercase text-slate-400 tracking-wider">Cidade - UF</label>
                      <input 
                        type="text" 
                        value={specCity}
                        onChange={(e) => setSpecCity(e.target.value)}
                        placeholder="Ex: Brasília-DF"
                        className="w-full bg-slate-50 text-slate-900 font-semibold px-4 py-3 rounded-xl border border-slate-200 focus:bg-white focus:ring-2 focus:ring-amber-300 outline-none text-xs"
                      />
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'escola' && (
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="block text-[10px] font-black uppercase text-slate-400 tracking-wider">Nome da Unidade Escolar *</label>
                      <input 
                        type="text" 
                        value={schoolName}
                        onChange={(e) => setSchoolName(e.target.value)}
                        placeholder="Ex: Colégio La Salle Brasília"
                        className="w-full bg-slate-50 text-slate-900 font-semibold px-4 py-3 rounded-xl border border-slate-200 focus:bg-white focus:ring-2 focus:ring-amber-300 outline-none text-xs"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="block text-[10px] font-black uppercase text-slate-400 tracking-wider">Código de Registro / Inep *</label>
                      <input 
                        type="text" 
                        value={schoolCode}
                        onChange={(e) => setSchoolCode(e.target.value)}
                        placeholder="Ex: 54210"
                        className="w-full bg-slate-50 text-slate-900 font-semibold px-4 py-3 rounded-xl border border-slate-200 focus:bg-white focus:ring-2 focus:ring-amber-300 outline-none text-xs"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="block text-[10px] font-black uppercase text-slate-400 tracking-wider">Segmento Oferecido</label>
                      <select 
                        value={schoolSegment}
                        onChange={(e) => setSchoolSegment(e.target.value as any)}
                        className="w-full bg-slate-50 text-slate-800 font-semibold px-4 py-3 rounded-xl border border-slate-200 text-xs outline-none focus:bg-white"
                      >
                        <option value="Infantil">Educação Infantil</option>
                        <option value="Fundamental">Ensino Fundamental</option>
                        <option value="Médio">Ensino Médio</option>
                        <option value="Completo">Completo (Infantil ao Médio)</option>
                      </select>
                    </div>
                    <div className="space-y-1.5">
                      <label className="block text-[10px] font-black uppercase text-slate-400 tracking-wider">Telefone Comercial</label>
                      <input 
                        type="text" 
                        value={schoolPhone}
                        onChange={(e) => setSchoolPhone(e.target.value)}
                        placeholder="Ex: (61) 3214-7300"
                        className="w-full bg-slate-50 text-slate-900 font-semibold px-4 py-3 rounded-xl border border-slate-200 focus:bg-white focus:ring-2 focus:ring-amber-300 outline-none text-xs"
                      />
                    </div>
                  </div>

                   <div className="space-y-4">
                    {renderCepSearchField(schoolCep, setSchoolCep, setSchoolAddress, setSchoolCity)}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="md:col-span-2 space-y-1.5">
                      <label className="block text-[10px] font-black uppercase text-slate-400 tracking-wider">Endereço Completo</label>
                      <input 
                        type="text" 
                        value={schoolAddress}
                        onChange={(e) => setSchoolAddress(e.target.value)}
                        placeholder="Ex: SGAS Q 906, Conjunto A"
                        className="w-full bg-slate-50 text-slate-900 font-semibold px-4 py-3 rounded-xl border border-slate-200 focus:bg-white focus:ring-2 focus:ring-amber-300 outline-none text-xs"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="block text-[10px] font-black uppercase text-slate-400 tracking-wider">Cidade - UF</label>
                      <input 
                        type="text" 
                        value={schoolCity}
                        onChange={(e) => setSchoolCity(e.target.value)}
                        placeholder="Ex: Brasília-DF"
                        className="w-full bg-slate-50 text-slate-900 font-semibold px-4 py-3 rounded-xl border border-slate-200 focus:bg-white focus:ring-2 focus:ring-amber-300 outline-none text-xs"
                      />
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'serie' && (
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="md:col-span-2 space-y-1.5">
                      <label className="block text-[10px] font-black uppercase text-slate-400 tracking-wider">Nome da Série / Nível Escolar *</label>
                      <input 
                        type="text" 
                        value={gradeName}
                        onChange={(e) => setGradeName(e.target.value)}
                        placeholder="Ex: Infantil II - B, maternal I, 1º Ano"
                        className="w-full bg-slate-50 text-slate-900 font-semibold px-4 py-3 rounded-xl border border-slate-200 focus:bg-white focus:ring-2 focus:ring-amber-300 outline-none text-xs"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="block text-[10px] font-black uppercase text-slate-400 tracking-wider">Grupo BNCC</label>
                      <select 
                        value={gradeAgeGroup}
                        onChange={(e) => setGradeAgeGroup(e.target.value as any)}
                        className="w-full bg-slate-50 text-slate-800 font-semibold px-4 py-3 rounded-xl border border-slate-200 text-xs outline-none focus:bg-white"
                      >
                        <option value="bebês">Bebês (0 a 1 ano e 6 meses)</option>
                        <option value="pequenos">Crianças Pequenas (1 ano e 7m a 3 anos e 11m)</option>
                        <option value="grandes">Crianças Maiores (4 a 5 anos e 11 meses)</option>
                      </select>
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="block text-[10px] font-black uppercase text-slate-400 tracking-wider">Descrição dos Objetivos Gerais</label>
                    <textarea 
                      value={gradeDescription}
                      onChange={(e) => setGradeDescription(e.target.value)}
                      rows={3}
                      placeholder="Descreva as principais diretrizes curriculares para este grupo pedagógico..."
                      className="w-full bg-slate-50 text-slate-900 font-semibold px-4 py-3 rounded-xl border border-slate-200 focus:bg-white focus:ring-2 focus:ring-amber-300 outline-none text-xs resize-none"
                    />
                  </div>
                </div>
              )}

              {activeTab === 'turma' && (
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="block text-[10px] font-black uppercase text-slate-400 tracking-wider">Nome Identificador da Turma *</label>
                      <input 
                        type="text" 
                        value={classNameField}
                        onChange={(e) => setClassNameField(e.target.value)}
                        placeholder="Ex: Turma Azul, Maternal II Matutino"
                        className="w-full bg-slate-50 text-slate-900 font-semibold px-4 py-3 rounded-xl border border-slate-200 focus:bg-white focus:ring-2 focus:ring-amber-300 outline-none text-xs"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="block text-[10px] font-black uppercase text-slate-400 tracking-wider">Série Vinculada *</label>
                      <select 
                        value={classGradeId}
                        onChange={(e) => setClassGradeId(e.target.value)}
                        className="w-full bg-slate-50 text-slate-850 font-semibold px-4 py-3 rounded-xl border border-slate-200 text-xs outline-none focus:bg-white"
                      >
                        <option value="">Selecione a série...</option>
                        {grades.map(g => <option key={g.id} value={g.id}>{g.name}</option>)}
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="space-y-1.5">
                      <label className="block text-[10px] font-black uppercase text-slate-400 tracking-wider">Unidade Escolar *</label>
                      <select 
                        value={classSchoolId}
                        onChange={(e) => setClassSchoolId(e.target.value)}
                        className="w-full bg-slate-50 text-slate-850 font-semibold px-4 py-3 rounded-xl border border-slate-200 text-xs outline-none focus:bg-white"
                      >
                        <option value="">Selecione o colégio...</option>
                        {schools.map(s => <option key={s.id} value={s.id}>{s.name}</option>)}
                      </select>
                    </div>
                    <div className="space-y-1.5">
                      <label className="block text-[10px] font-black uppercase text-slate-400 tracking-wider">Professor Regente *</label>
                      <select 
                        value={classTeacherId}
                        onChange={(e) => setClassTeacherId(e.target.value)}
                        className="w-full bg-slate-50 text-slate-850 font-semibold px-4 py-3 rounded-xl border border-slate-200 text-xs outline-none focus:bg-white"
                      >
                        <option value="">Selecione o professor...</option>
                        {teachers.map(t => <option key={t.id} value={t.id}>{t.name}</option>)}
                      </select>
                    </div>
                    <div className="space-y-1.5">
                      <label className="block text-[10px] font-black uppercase text-slate-400 tracking-wider">Turno</label>
                      <select 
                        value={classShift}
                        onChange={(e) => setClassShift(e.target.value as any)}
                        className="w-full bg-slate-50 text-slate-800 font-semibold px-4 py-3 rounded-xl border border-slate-200 text-xs outline-none focus:bg-white"
                      >
                        <option value="Manhã">Manhã</option>
                        <option value="Tarde">Tarde</option>
                        <option value="Integral">Integral</option>
                      </select>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'professor' && (
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="block text-[10px] font-black uppercase text-slate-400 tracking-wider">Nome Completo do Docente *</label>
                      <input 
                        type="text" 
                        value={teacherName}
                        onChange={(e) => setTeacherName(e.target.value)}
                        placeholder="Ex: Profª Luciana Martins"
                        className="w-full bg-slate-50 text-slate-900 font-semibold px-4 py-3 rounded-xl border border-slate-200 focus:bg-white focus:ring-2 focus:ring-amber-300 outline-none text-xs"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="block text-[10px] font-black uppercase text-slate-400 tracking-wider">Matrícula Escolar</label>
                      <input 
                        type="text" 
                        value={teacherCode}
                        onChange={(e) => setTeacherCode(e.target.value)}
                        placeholder="Ex: PE-4122 (Deixe em branco para auto-gerar)"
                        className="w-full bg-slate-50 text-slate-900 font-semibold px-4 py-3 rounded-xl border border-slate-200 focus:bg-white focus:ring-2 focus:ring-amber-300 outline-none text-xs"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="space-y-1.5">
                      <label className="block text-[10px] font-black uppercase text-slate-400 tracking-wider">E-mail de Contato *</label>
                      <input 
                        type="email" 
                        value={teacherEmail}
                        onChange={(e) => setTeacherEmail(e.target.value)}
                        placeholder="Ex: professor@lasalle.org"
                        className="w-full bg-slate-50 text-slate-900 font-semibold px-4 py-3 rounded-xl border border-slate-200 focus:bg-white focus:ring-2 focus:ring-amber-300 outline-none text-xs"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="block text-[10px] font-black uppercase text-slate-400 tracking-wider">WhatsApp / Telefone</label>
                      <input 
                        type="text" 
                        value={teacherPhone}
                        onChange={(e) => setTeacherPhone(e.target.value)}
                        placeholder="Ex: (61) 98114-5511"
                        className="w-full bg-slate-50 text-slate-900 font-semibold px-4 py-3 rounded-xl border border-slate-200 focus:bg-white focus:ring-2 focus:ring-amber-300 outline-none text-xs"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="block text-[10px] font-black uppercase text-slate-400 tracking-wider">Status Funcional</label>
                      <select 
                        value={teacherStatus}
                        onChange={(e) => setTeacherStatus(e.target.value as any)}
                        className="w-full bg-slate-50 text-slate-800 font-semibold px-4 py-3 rounded-xl border border-slate-200 text-xs outline-none focus:bg-white"
                      >
                        <option value="Ativo">Ativo</option>
                        <option value="Licença">Em Licença</option>
                        <option value="Inativo">Inativo</option>
                      </select>
                    </div>
                  </div>

                  {/* Seleção de Turma do Professor */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="block text-[10px] font-black uppercase text-slate-400 tracking-wider">Turma Relacionada (Atendimento) *</label>
                      <select 
                        value={teacherClassId}
                        onChange={(e) => setTeacherClassId(e.target.value)}
                        className="w-full bg-slate-50 text-slate-800 font-semibold px-4 py-3 rounded-xl border border-slate-200 text-xs outline-none focus:bg-white"
                      >
                        <option value="">Nenhuma turma vinculada</option>
                        {classes.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                      </select>
                    </div>
                  </div>

                  {/* Endereço Residencial do Professor */}
                  <div className="border-t border-slate-100 pt-4 space-y-4">
                    <h4 className="text-[10px] font-black text-[#002D62] uppercase tracking-wider">Endereço Residencial</h4>
                    {renderCepSearchField(teacherCep, setTeacherCep, setTeacherAddress, setTeacherCity)}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="md:col-span-2 space-y-1.5">
                        <label className="block text-[10px] font-black uppercase text-slate-400 tracking-wider">Logradouro / Bairro</label>
                        <input 
                          type="text" 
                          value={teacherAddress}
                          onChange={(e) => setTeacherAddress(e.target.value)}
                          placeholder="Ex: QI 11, Conjunto B - Lago Sul"
                          className="w-full bg-slate-50 text-slate-900 font-semibold px-4 py-3 rounded-xl border border-slate-200 focus:bg-white focus:ring-2 focus:ring-amber-300 outline-none text-xs"
                        />
                      </div>
                      <div className="space-y-1.5">
                        <label className="block text-[10px] font-black uppercase text-slate-400 tracking-wider">Cidade - UF</label>
                        <input 
                          type="text" 
                          value={teacherCity}
                          onChange={(e) => setTeacherCity(e.target.value)}
                          placeholder="Ex: Brasília-DF"
                          className="w-full bg-slate-50 text-slate-900 font-semibold px-4 py-3 rounded-xl border border-slate-200 focus:bg-white focus:ring-2 focus:ring-amber-300 outline-none text-xs"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'aluno' && (
                <div className="space-y-4">
                  {/* Campo de Foto do Aluno */}
                  <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 space-y-3">
                    <label className="block text-[10px] font-black uppercase text-slate-400 tracking-wider">Foto do Aluno / Educando</label>
                    <div className="flex flex-col sm:flex-row gap-4 items-center">
                      {/* Current Photo / Preview */}
                      <div className="relative shrink-0">
                        <div className="w-16 h-16 rounded-full border-2 border-[#002D62] overflow-hidden bg-slate-100 flex items-center justify-center">
                          {studentPhoto ? (
                            <img src={studentPhoto} alt="Previsualização" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center bg-indigo-50 text-[#002D62] font-black text-lg">
                              {studentName ? studentName.slice(0, 2).toUpperCase() : "?"}
                            </div>
                          )}
                        </div>
                        {studentPhoto && (
                          <button
                            type="button"
                            onClick={() => setStudentPhoto('')}
                            className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 shadow-sm text-[8px] leading-none w-4 h-4 flex items-center justify-center font-bold"
                            title="Remover foto"
                          >
                            ✕
                          </button>
                        )}
                      </div>

                      {/* Photo Actions */}
                      <div className="flex-1 space-y-2 w-full">
                        <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                          {/* File upload hidden input */}
                          <label className="cursor-pointer bg-white hover:bg-slate-100 border border-slate-300 rounded-lg py-1.5 px-3 text-xs font-bold text-slate-700 transition flex items-center gap-1.5 self-start">
                            <Upload size={14} className="text-slate-500" />
                            <span>Enviar Foto</span>
                            <input 
                              type="file" 
                              accept="image/*" 
                              onChange={(e) => {
                                const file = e.target.files?.[0];
                                if (file) {
                                  const reader = new FileReader();
                                  reader.onloadend = () => {
                                    setStudentPhoto(reader.result as string);
                                  };
                                  reader.readAsDataURL(file);
                                }
                              }}
                              className="hidden" 
                            />
                          </label>

                          <span className="text-[10px] font-bold text-slate-400">ou selecione uma foto fictícia abaixo:</span>
                        </div>

                        {/* Presets Grid */}
                        <div className="grid grid-cols-8 gap-2 max-w-sm">
                          {[
                            "https://images.unsplash.com/photo-1502086223501-7ea6ecd79368?auto=format&fit=crop&q=80&w=150&h=150",
                            "https://images.unsplash.com/photo-1519457431-44ccd64a579b?auto=format&fit=crop&q=80&w=150&h=150",
                            "https://images.unsplash.com/photo-1516624683217-bf02fc6b6b7c?auto=format&fit=crop&q=80&w=150&h=150",
                            "https://images.unsplash.com/photo-1503919545889-aef636e10ad4?auto=format&fit=crop&q=80&w=150&h=150",
                            "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=150&h=150",
                            "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=150&h=150",
                            "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&q=80&w=150&h=150",
                            "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&q=80&w=150&h=150"
                          ].map((url, i) => (
                            <button
                              key={i}
                              type="button"
                              onClick={() => setStudentPhoto(url)}
                              className={`aspect-square rounded-lg border overflow-hidden hover:border-amber-400 transition relative shrink-0 ${
                                studentPhoto === url ? 'ring-2 ring-amber-400 border-amber-400' : 'border-slate-200'
                              }`}
                            >
                              <img src={url} alt={`Fictícia ${i+1}`} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="md:col-span-2 space-y-1.5">
                      <label className="block text-[10px] font-black uppercase text-slate-400 tracking-wider">Nome Completo do Aluno *</label>
                      <input 
                        type="text" 
                        value={studentName}
                        onChange={(e) => setStudentName(e.target.value)}
                        placeholder="Ex: Guto Pinheiro"
                        className="w-full bg-slate-50 text-slate-900 font-semibold px-4 py-3 rounded-xl border border-slate-200 focus:bg-white focus:ring-2 focus:ring-amber-300 outline-none text-xs"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="block text-[10px] font-black uppercase text-slate-400 tracking-wider">Idade / Descrição Temporal *</label>
                      <input 
                        type="text" 
                        value={studentAge}
                        onChange={(e) => setStudentAge(e.target.value)}
                        placeholder="Ex: 4 anos, 11 meses"
                        className="w-full bg-slate-50 text-slate-900 font-semibold px-4 py-3 rounded-xl border border-slate-200 focus:bg-white focus:ring-2 focus:ring-amber-300 outline-none text-xs"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="space-y-1.5">
                      <label className="block text-[10px] font-black uppercase text-slate-400 tracking-wider">Grupo de Faixa Etária</label>
                      <select 
                        value={studentAgeGroup}
                        onChange={(e) => setStudentAgeGroup(e.target.value as any)}
                        className="w-full bg-slate-50 text-slate-800 font-semibold px-4 py-3 rounded-xl border border-slate-200 text-xs outline-none focus:bg-white"
                      >
                        <option value="bebês">Bebês (0 a 1 ano e 6m)</option>
                        <option value="pequenos">Crianças Bem Pequenas (1a 7m a 3a 11m)</option>
                        <option value="grandes">Crianças Pequenas (4 a 5 anos e 11m)</option>
                      </select>
                    </div>

                    <div className="space-y-1.5">
                      <label className="block text-[10px] font-black uppercase text-slate-400 tracking-wider">Selecione a Turma *</label>
                      <select 
                        value={studentClassId}
                        onChange={(e) => setStudentClassId(e.target.value)}
                        className="w-full bg-slate-50 text-slate-800 font-bold px-4 py-3 rounded-xl border border-slate-200 text-xs outline-none focus:bg-white"
                      >
                        <option value="">Clique para atribuir turma...</option>
                        {classes.map(c => <option key={c.id} value={c.id}>{c.name} ({getSchoolName(c.schoolId)})</option>)}
                      </select>
                    </div>

                    <div className="space-y-1.5">
                      <label className="block text-[10px] font-black uppercase text-slate-400 tracking-wider">Unidade Escolar Vinculada</label>
                      <select 
                        value={studentSchoolId}
                        onChange={(e) => setStudentSchoolId(e.target.value)}
                        className="w-full bg-slate-50 text-slate-800 font-semibold px-4 py-3 rounded-xl border border-slate-200 text-xs outline-none focus:bg-white"
                      >
                        <option value="">Atribuir Escola...</option>
                        {schools.map(s => <option key={s.id} value={s.id}>{s.name}</option>)}
                      </select>
                    </div>
                  </div>

                  {/* Endereço Residencial do Aluno */}
                  <div className="border-t border-slate-100 pt-4 space-y-4">
                    <h4 className="text-[10px] font-black text-[#002D62] uppercase tracking-wider">Endereço Residencial do Aluno</h4>
                    {renderCepSearchField(studentCep, setStudentCep, setStudentAddress, setStudentCity)}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="md:col-span-2 space-y-1.5">
                        <label className="block text-[10px] font-black uppercase text-slate-400 tracking-wider">Logradouro / Bairro</label>
                        <input 
                          type="text" 
                          value={studentAddress}
                          onChange={(e) => setStudentAddress(e.target.value)}
                          placeholder="Ex: QI 11, Conjunto B - Lago Sul"
                          className="w-full bg-slate-50 text-slate-900 font-semibold px-4 py-3 rounded-xl border border-slate-200 focus:bg-white focus:ring-2 focus:ring-amber-300 outline-none text-xs"
                        />
                      </div>
                      <div className="space-y-1.5">
                        <label className="block text-[10px] font-black uppercase text-slate-400 tracking-wider">Cidade - UF</label>
                        <input 
                          type="text" 
                          value={studentCity}
                          onChange={(e) => setStudentCity(e.target.value)}
                          placeholder="Ex: Brasília-DF"
                          className="w-full bg-slate-50 text-slate-900 font-semibold px-4 py-3 rounded-xl border border-slate-200 focus:bg-white focus:ring-2 focus:ring-amber-300 outline-none text-xs"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Inclusion Options */}
                  <div className="border-t border-slate-100 pt-4 space-y-4">
                    <div className="flex items-center justify-between bg-slate-50 p-4 rounded-2xl border border-slate-150">
                      <div className="space-y-0.5">
                        <span className="text-xs font-black text-slate-800">Necessita de Atendimento Educacional Especializado (AEE)?</span>
                        <p className="text-[11px] text-slate-400 font-medium">Ativa o portal de PDI, relatórios inteligentes e plano educacional individualizado.</p>
                      </div>
                      <button
                        type="button"
                        onClick={() => setStudentHasSpecialNeeds(!studentHasSpecialNeeds)}
                        className={`w-11 h-6 rounded-full transition-colors relative focus:outline-none cursor-pointer ${
                          studentHasSpecialNeeds ? 'bg-[#002D62]' : 'bg-slate-250'
                        }`}
                      >
                        <div className={`absolute top-1 w-4 h-4 bg-white rounded-full shadow-sm transition-transform duration-150 ${
                          studentHasSpecialNeeds ? 'transform translate-x-6' : 'transform translate-x-1'
                        }`}></div>
                      </button>
                    </div>

                    {studentHasSpecialNeeds && (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 animate-slide-in">
                        <div className="space-y-1.5">
                          <label className="block text-[10px] font-black uppercase text-slate-400 tracking-wider">Diagnóstico / Condição Diagnóstica</label>
                          <input 
                            type="text" 
                            value={studentSpecialNeeds}
                            onChange={(e) => setStudentSpecialNeeds(e.target.value)}
                            placeholder="Ex: Transtorno do Espectro Autista (TEA), Síndrome de Down"
                            className="w-full bg-slate-50 text-slate-900 font-semibold px-4 py-3 rounded-xl border border-slate-200 focus:bg-white focus:ring-2 focus:ring-amber-300 outline-none text-xs"
                          />
                        </div>
                        <div className="space-y-1.5">
                          <label className="block text-[10px] font-black uppercase text-slate-400 tracking-wider font-extrabold text-[#986e10]">Diretriz Estratégica PEI (Lumi AI)</label>
                          <textarea 
                            value={studentPeiPlan}
                            onChange={(e) => setStudentPeiPlan(e.target.value)}
                            rows={2}
                            placeholder="Ex: Uso de apoio de cartões visuais para transições e letramento corporal motivado."
                            className="w-full bg-slate-50 text-slate-900 font-semibold px-4 py-3 rounded-xl border border-slate-200 focus:bg-white focus:ring-2 focus:ring-amber-300 outline-none text-xs resize-none"
                          />
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {activeTab === 'responsavel' && (
                <div className="space-y-6 animate-slide-in">
                  {/* Parent Identity Details section */}
                  <div className="bg-slate-50 p-5 rounded-2xl border border-slate-150 space-y-4">
                    <h3 className="text-xs font-black text-[#002D62] uppercase tracking-wider">
                      Informações Gerais do Responsável Sócio-Familiar
                    </h3>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <label className="block text-[10px] font-black uppercase text-slate-450 tracking-wider">Nome Completo do Responsável *</label>
                        <input 
                          type="text" 
                          value={parentName}
                          onChange={(e) => setParentName(e.target.value)}
                          placeholder="Ex: Patrícia Souza"
                          className="w-full bg-white text-slate-900 font-semibold px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-amber-300 outline-none text-xs"
                          required
                        />
                      </div>
                      <div className="space-y-1.5">
                        <label className="block text-[10px] font-black uppercase text-slate-450 tracking-wider">E-mail para Acesso/Comunidades *</label>
                        <input 
                          type="email" 
                          value={parentEmail}
                          onChange={(e) => setParentEmail(e.target.value)}
                          placeholder="Ex: patricia.souza@lasalle.org"
                          className="w-full bg-white text-slate-900 font-semibold px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-amber-300 outline-none text-xs"
                          required
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <label className="block text-[10px] font-black uppercase text-slate-450 tracking-wider">Telefone de Contato Profissional/Pessoal</label>
                        <input 
                          type="text" 
                          value={parentPhone}
                          onChange={(e) => setParentPhone(e.target.value)}
                          placeholder="Ex: (61) 99122-8765"
                          className="w-full bg-white text-slate-900 font-semibold px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-amber-300 outline-none text-xs"
                        />
                      </div>
                      <div className="space-y-1.5">
                        <label className="block text-[10px] font-black uppercase text-slate-450 tracking-wider">Status Cadastral</label>
                        <select 
                          value={parentStatus}
                          onChange={(e) => setParentStatus(e.target.value as any)}
                          className="w-full bg-white text-slate-1000 font-semibold px-4 py-3 rounded-xl border border-slate-200 text-xs outline-none focus:ring-2 focus:ring-amber-300"
                        >
                          <option value="Ativo">Ativo / Regularizado</option>
                          <option value="Inativo">Suspenso / Inativo</option>
                        </select>
                      </div>
                    </div>

                    {/* Endereço Residencial do Responsável */}
                    <div className="border-t border-slate-200/60 pt-4 space-y-4">
                      <h4 className="text-[10px] font-black text-[#002D62] uppercase tracking-wider">Endereço Residencial do Responsável</h4>
                      {renderCepSearchField(parentCep, setParentCep, setParentAddress, setParentCity)}
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="md:col-span-2 space-y-1.5">
                          <label className="block text-[10px] font-black uppercase text-slate-400 tracking-wider">Logradouro / Bairro</label>
                          <input 
                            type="text" 
                            value={parentAddress}
                            onChange={(e) => setParentAddress(e.target.value)}
                            placeholder="Ex: Quadra 204, Lote 5 - Águas Claras"
                            className="w-full bg-white text-slate-900 font-semibold px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-amber-300 outline-none text-xs"
                          />
                        </div>
                        <div className="space-y-1.5">
                          <label className="block text-[10px] font-black uppercase text-slate-400 tracking-wider">Cidade - UF</label>
                          <input 
                            type="text" 
                            value={parentCity}
                            onChange={(e) => setParentCity(e.target.value)}
                            placeholder="Ex: Brasília-DF"
                            className="w-full bg-white text-slate-900 font-semibold px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-amber-300 outline-none text-xs"
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Associate Existing Children block */}
                  <div className="p-5 bg-slate-50 rounded-2xl border border-slate-150 space-y-3">
                    <div className="flex justify-between items-center">
                      <div>
                        <h4 className="text-xs font-black text-slate-800 uppercase tracking-wider">Associar Alunos Cadastrados</h4>
                        <p className="text-[10px] text-slate-400 font-bold">Marque as crianças sob responsabilidade de {parentName || 'este usuário'}:</p>
                      </div>
                      <span className="text-[9px] font-black bg-slate-200 text-slate-700 px-2.5 py-1 rounded-full">
                        {parentSelectedChildrenIds.length} Selecionados
                      </span>
                    </div>

                    {students.length === 0 ? (
                      <p className="text-[11px] text-slate-400 italic">Nenhum aluno cadastrado na secretaria para associar.</p>
                    ) : (
                      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3.5 max-h-56 overflow-y-auto p-1 bg-white rounded-xl border border-slate-200">
                        {students.map((st) => {
                          const isChecked = parentSelectedChildrenIds.includes(st.id);
                          return (
                            <label 
                              key={st.id} 
                              className={`p-3 rounded-xl border text-xs font-semibold flex items-center gap-3 transition cursor-pointer select-none ${
                                isChecked 
                                  ? 'bg-[#002D62]/5 border-[#002D62] text-[#002D62] font-black' 
                                  : 'bg-slate-50 border-slate-200 text-slate-650 hover:bg-slate-100'
                              }`}
                            >
                              <input 
                                type="checkbox"
                                checked={isChecked}
                                onChange={() => {
                                  if (isChecked) {
                                    setParentSelectedChildrenIds(parentSelectedChildrenIds.filter(id => id !== st.id));
                                  } else {
                                    setParentSelectedChildrenIds([...parentSelectedChildrenIds, st.id]);
                                  }
                                }}
                                className="w-3.5 h-3.5 text-[#002D62] bg-slate-100 border-slate-300 rounded focus:ring-0 cursor-pointer"
                              />
                              <div className="truncate">
                                <p className="truncate text-[11px]">{st.name}</p>
                                <p className="text-[9px] text-slate-450 font-bold uppercase tracking-wider">{st.className}</p>
                              </div>
                            </label>
                          );
                        })}
                      </div>
                    )}
                  </div>

                  {/* Option to create dynamic dependents right on-the-spot ("opção para cadastrar vários filhos ou dependentes") */}
                  <div className="p-5 bg-white rounded-2xl border border-slate-200 space-y-4">
                    <div className="border-b border-slate-100 pb-2">
                      <h4 className="text-xs font-black text-amber-950 uppercase tracking-wider flex items-center gap-1.5">
                        ➕ Matricular e Associar Novo Filho ou Dependente (Múltiplos)
                      </h4>
                      <p className="text-[10px] text-slate-450 font-bold">Use este módulo rápido para criar novos registros de alunos e associá-los automaticamente a este responsável.</p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 items-end">
                      <div className="space-y-1.5 md:col-span-1.5">
                        <label className="block text-[9px] font-black uppercase text-slate-400">Nome do Dependente</label>
                        <input 
                          type="text"
                          value={newDepName}
                          onChange={(e) => setNewDepName(e.target.value)}
                          placeholder="Ex: Pedro de Souza"
                          className="w-full bg-slate-50 text-slate-900 font-bold px-3 py-2.5 rounded-xl border border-slate-200 outline-none text-xs focus:bg-white"
                        />
                      </div>
                      <div className="space-y-1.5 sm:col-span-1">
                        <label className="block text-[9px] font-black uppercase text-slate-400">Idade / Temporal</label>
                        <input 
                          type="text"
                          value={newDepAge}
                          onChange={(e) => setNewDepAge(e.target.value)}
                          placeholder="Ex: 5 anos"
                          className="w-full bg-slate-50 text-slate-900 font-bold px-3 py-2.5 rounded-xl border border-slate-200 outline-none text-xs focus:bg-white"
                        />
                      </div>
                      <div className="space-y-1.5 md:col-span-1.5">
                        <label className="block text-[9px] font-black uppercase text-slate-400 font-bold">Turma de Destino *</label>
                        <select 
                          value={newDepClassId}
                          onChange={(e) => setNewDepClassId(e.target.value)}
                          className="w-full bg-slate-50 text-slate-800 font-bold px-3 py-2.5 rounded-xl border border-slate-200 text-xs outline-none focus:bg-white"
                        >
                          <option value="">Selecione a turma...</option>
                          {classes.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                        </select>
                      </div>
                      <div>
                        <button
                          type="button"
                          onClick={() => {
                            if (!newDepName || !newDepAge || !newDepClassId) {
                              triggerNotification('Por favor, preencha o nome, idade e turma do novo dependente.', 'danger');
                              return;
                            }
                            const newDep: any = {
                              tempId: `temp-${Date.now()}-${Math.random()}`,
                              name: newDepName,
                              age: newDepAge,
                              ageGroup: newDepAgeGroup,
                              classId: newDepClassId
                            };
                            setDraftDependents([...draftDependents, newDep]);
                            setNewDepName('');
                            setNewDepAge('');
                          }}
                          className="w-full bg-emerald-600 hover:bg-emerald-700 text-white text-[10px] font-extrabold uppercase py-3 rounded-xl transition cursor-pointer text-center"
                        >
                          Adicionar Filho
                        </button>
                      </div>
                    </div>

                    {/* Listing of added dependents being prepared */}
                    {draftDependents.length > 0 && (
                      <div className="space-y-2 pt-2">
                        <p className="text-[10px] text-emerald-700 font-black uppercase tracking-wider">Dependente(s) a cadastrar e associar ao salvar:</p>
                        <div className="space-y-1.5">
                          {draftDependents.map((d) => {
                            const cName = classes.find(c => c.id === d.classId)?.name || 'Geral';
                            return (
                              <div key={d.tempId} className="flex justify-between items-center bg-emerald-50/50 hover:bg-emerald-50 p-2.5 px-4 rounded-xl border border-emerald-100 text-xs text-slate-800">
                                <div className="flex items-center gap-2">
                                  <span className="w-2 h-2 bg-emerald-500 rounded-full"></span>
                                  <p className="font-extrabold text-[#002D62]">{d.name}</p>
                                  <span className="text-[10px] font-semibold text-slate-450">• {d.age}</span>
                                  <span className="text-[10px] font-black bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full uppercase ml-1">{cName}</span>
                                </div>
                                <button
                                  type="button"
                                  onClick={() => setDraftDependents(draftDependents.filter(item => item.tempId !== d.tempId))}
                                  className="text-[10px] font-black text-rose-600 hover:text-rose-800 uppercase tracking-widest cursor-pointer px-2"
                                >
                                  Remover
                                </button>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Form Buttons */}
              <div className="flex gap-3 justify-end pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsFormOpen(false)}
                  className="px-4 py-2.5 bg-slate-100 hover:bg-slate-200 rounded-xl text-xs font-bold text-slate-650 transition cursor-pointer"
                >
                  Voltar para Lista
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 bg-[#002D62] hover:bg-blue-900 text-white text-xs font-black uppercase tracking-wider rounded-xl transition shadow-md cursor-pointer"
                >
                  {editingId ? 'Salvar Alterações' : 'Confirmar Cadastro'}
                </button>
              </div>

            </form>
          ) : (
            /* ================= REGISTRY LIST VIEW SCREEN ================= */
            <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100 space-y-6">
              
              {/* Filter and Top Add Button Row */}
              <div className="flex flex-col sm:flex-row gap-4 justify-between items-stretch sm:items-center">
                
                {/* Search input with icons */}
                <div className="relative flex-1">
                  <input 
                    type="text" 
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder={`Pesquisar por ${activeTab === 'escola' ? 'escola ou código' : activeTab === 'serie' ? 'série ou descrição' : activeTab === 'turma' ? 'turma, escola, professor' : activeTab === 'professor' ? 'nome, id, email' : 'aluno ou turma'}...`}
                    className="w-full bg-slate-50 text-slate-900 pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 focus:bg-white focus:ring-2 focus:ring-amber-300 outline-none text-xs font-semibold"
                  />
                  <Search size={14} className="text-slate-400 absolute left-3.5 top-3.5" />
                </div>

                <div className="flex gap-2">
                  <button 
                    onClick={handleOpenCreateForm}
                    className="bg-[#002D62] text-white text-[10px] font-black uppercase tracking-wider px-4 py-2.5 rounded-xl hover:bg-blue-900 transition flex items-center gap-1.5 cursor-pointer"
                  >
                    <Plus size={12} className="stroke-[3px]" />
                    Cadastrar
                  </button>
                </div>
              </div>

              {/* Data Lists layout depending on active tab selected */}
              {filteredData.length === 0 ? (
                <div className="p-8 text-center bg-slate-50 border border-dashed border-slate-200 rounded-3xl space-y-2">
                  <BadgeAlert className="mx-auto text-slate-350" size={32} />
                  <p className="text-xs font-bold text-slate-500">Nenhum registro encontrado correspondente aos critérios.</p>
                  <p className="text-[10px] text-slate-400">Clique em "Cadastrar" para inserir novos registros.</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {/* Grid layout of records */}
                  {activeTab === 'escola' && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {filteredData.map((item: any) => {
                        const s = item as School;
                        return (
                          <div key={s.id} className="p-5 bg-slate-50 border border-slate-150 rounded-2xl hover:border-slate-300 hover:bg-white transition flex flex-col justify-between gap-4">
                            <div className="space-y-2">
                              <div className="flex justify-between items-start">
                                <span className="inline-block bg-[#002D62]/10 text-[#002D62] text-[9px] font-black uppercase tracking-wider px-2 py-0.5 rounded">
                                  Cod: {s.code}
                                </span>
                                <span className="bg-amber-100 text-amber-950 font-bold px-2 py-0.5 rounded text-[9px] uppercase tracking-wider">
                                  {s.segment}
                                </span>
                              </div>
                              <h3 className="text-xs font-black text-slate-900 flex items-center gap-2">
                                <Building2 size={14} className="text-[#002D62]" />
                                {s.name}
                              </h3>
                              
                              <div className="space-y-1 text-[11px] text-slate-500 font-medium">
                                <p className="flex items-center gap-1.5">
                                  <MapPin size={11} className="text-slate-400" />
                                  {s.address}, {s.city} {s.cep && `• CEP: ${s.cep}`}
                                </p>
                                <p className="flex items-center gap-1.5 font-bold text-slate-600">
                                  <Phone size={11} className="text-slate-400" />
                                  {s.phone}
                                </p>
                              </div>
                            </div>

                            <div className="flex justify-end gap-1.5 border-t border-slate-100 pt-3">
                              <button 
                                onClick={() => handleStartEdit(s)}
                                className="p-1 px-2.5 bg-white border border-slate-200 rounded-lg text-[10px] font-bold text-slate-600 hover:bg-amber-400 hover:text-slate-950 hover:border-amber-400 transition cursor-pointer"
                                type="button"
                              >
                                Editar
                              </button>
                              <button 
                                onClick={() => handleDeleteItem(s.id, s.name)}
                                className="p-1 px-2 bg-rose-50 border border-slate-105 rounded-lg text-[10px] font-bold text-rose-700 hover:bg-rose-100 transition cursor-pointer"
                                type="button"
                              >
                                Excluir
                              </button>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}

                  {activeTab === 'serie' && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {filteredData.map((item: any) => {
                        const g = item as Grade;
                        return (
                          <div key={g.id} className="p-5 bg-slate-50 border border-slate-150 rounded-2xl hover:border-slate-300 hover:bg-white transition flex flex-col justify-between gap-4">
                            <div className="space-y-2">
                              <div className="flex justify-between items-start">
                                <span className="inline-block bg-[#002D62]/10 text-[#002D62] text-[9px] font-black uppercase tracking-wider px-2 py-0.5 rounded">
                                  Grupo: {g.ageGroup}
                                </span>
                              </div>
                              <h3 className="text-xs font-black text-slate-900 flex items-center gap-2">
                                <BookOpen size={14} className="text-[#002D62]" />
                                {g.name}
                              </h3>
                              <p className="text-[11px] text-slate-500 font-medium leading-relaxed">
                                {g.description}
                              </p>
                            </div>

                            <div className="flex justify-end gap-1.5 border-t border-slate-100 pt-3">
                              <button 
                                onClick={() => handleStartEdit(g)}
                                className="p-1 px-2.5 bg-white border border-slate-200 rounded-lg text-[10px] font-bold text-slate-650 hover:bg-amber-400 hover:text-slate-950 hover:border-amber-400 transition cursor-pointer"
                                type="button"
                              >
                                Editar
                              </button>
                              <button 
                                onClick={() => handleDeleteItem(g.id, g.name)}
                                className="p-1 px-2 bg-rose-50 border border-slate-105 rounded-lg text-[10px] font-bold text-rose-700 hover:bg-rose-100 transition cursor-pointer"
                                type="button"
                              >
                                Excluir
                              </button>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}

                  {activeTab === 'turma' && (
                    <div className="space-y-3">
                      {filteredData.map((item: any) => {
                        const c = item as ClassGroup;
                        const classStudents = students.filter(s => s.classId === c.id);
                        return (
                          <div key={c.id} className="p-4 bg-slate-50 border border-slate-150 rounded-2xl hover:border-slate-300 hover:bg-white transition flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                            <div className="space-y-1">
                              <div className="flex items-center gap-2">
                                <h3 className="text-xs font-black text-slate-900">{c.name}</h3>
                                <span className="bg-amber-50 border border-amber-200 text-amber-800 text-[8px] font-black px-1.5 py-0.5 rounded uppercase">
                                  {c.shift}
                                </span>
                              </div>
                              <div className="grid grid-cols-1 md:grid-cols-3 gap-x-6 gap-y-1 text-[11px] text-slate-500 font-semibold pt-1">
                                <p>🏫 Escola: <span className="text-slate-700 font-black">{getSchoolName(c.schoolId)}</span></p>
                                <p>📚 Série: <span className="text-slate-700 font-black">{getGradeName(c.gradeId)}</span></p>
                                <p>👩‍🏫 Professor: <span className="text-slate-700 font-black">{getTeacherName(c.teacherId)}</span></p>
                              </div>
                            </div>

                            <div className="flex items-center gap-3 shrink-0 self-end sm:self-auto pt-2 sm:pt-0">
                              <span className="text-[10px] font-black bg-slate-200 text-slate-700 px-2.5 py-1 rounded-full">
                                {classStudents.length} {classStudents.length === 1 ? 'Aluno' : 'Alunos'}
                              </span>

                              <div className="flex gap-1">
                                <button 
                                  onClick={() => handleStartEdit(c)}
                                  className="p-1 px-2.5 bg-white border border-slate-200 rounded-lg text-[10px] font-bold text-slate-650 hover:bg-amber-400 hover:text-slate-950 hover:border-amber-400 transition cursor-pointer"
                                  type="button"
                                >
                                  Editar
                                </button>
                                <button 
                                  onClick={() => handleDeleteItem(c.id, c.name)}
                                  className="p-1 px-2 bg-rose-50 border border-slate-105 rounded-lg text-[10px] font-bold text-rose-700 hover:bg-rose-100 transition cursor-pointer"
                                  type="button"
                                >
                                  Excluir
                                </button>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}

                  {activeTab === 'professor' && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {filteredData.map((item: any) => {
                        const t = item as Teacher;
                        const teacherClasses = classes.filter(c => c.teacherId === t.id);
                        return (
                          <div key={t.id} className="p-5 bg-slate-50 border border-slate-150 rounded-2xl hover:border-slate-300 hover:bg-white transition flex flex-col justify-between gap-4">
                            <div className="space-y-2">
                              <div className="flex justify-between items-start">
                                <span className="inline-block bg-[#002D62]/10 text-[#002D62] text-[9px] font-black uppercase tracking-wider px-2 py-0.5 rounded">
                                  Cod: {t.code}
                                </span>
                                <span className={`font-black px-2 py-0.5 rounded text-[8px] uppercase tracking-wider ${
                                  t.status === 'Ativo' ? 'bg-emerald-50 text-emerald-800 border border-emerald-200' : 'bg-amber-50 text-amber-800 border border-amber-200'
                                }`}>
                                  {t.status}
                                </span>
                              </div>
                              <h3 className="text-xs font-black text-slate-900 flex items-center gap-2">
                                <GraduationCap size={15} className="text-[#002D62]" />
                                {t.name}
                              </h3>
                              
                              <div className="space-y-1 text-[11px] text-slate-500 font-semibold pt-1">
                                <p className="flex items-center gap-1.5">
                                  <Mail size={11} className="text-slate-400 shrink-0" />
                                  {t.email}
                                </p>
                                {t.phone && (
                                  <p className="flex items-center gap-1.5">
                                    <Phone size={11} className="text-slate-400 shrink-0" />
                                    {t.phone}
                                  </p>
                                )}
                                {t.address && (
                                  <p className="flex items-center gap-1.5">
                                    <MapPin size={11} className="text-slate-400 shrink-0" />
                                    {t.address}, {t.city} {t.cep && `• CEP: ${t.cep}`}
                                  </p>
                                )}
                              </div>
                              
                              <div className="text-[10px] font-bold text-slate-400 pt-1">
                                Turmas Coordenadas:{' '}
                                {teacherClasses.length === 0 ? (
                                  <span className="text-slate-450 italic font-medium">Nenhuma atribuída</span>
                                ) : (
                                  <span className="text-[#002D62] font-black">
                                    {teacherClasses.map(tc => tc.name).join(', ')}
                                  </span>
                                )}
                              </div>
                            </div>

                            <div className="flex justify-end gap-1.5 border-t border-slate-100 pt-3">
                              <button 
                                onClick={() => handleStartEdit(t)}
                                className="p-1 px-2.5 bg-white border border-slate-200 rounded-lg text-[10px] font-bold text-slate-650 hover:bg-amber-400 hover:text-slate-950 hover:border-amber-400 transition cursor-pointer"
                                type="button"
                              >
                                Editar
                              </button>
                              <button 
                                onClick={() => handleDeleteItem(t.id, t.name)}
                                className="p-1 px-2 bg-rose-50 border border-slate-105 rounded-lg text-[10px] font-bold text-rose-700 hover:bg-rose-100 transition cursor-pointer"
                                type="button"
                              >
                                Excluir
                              </button>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}

                  {activeTab === 'aluno' && (
                    <div className="space-y-3">
                      {filteredData.map((item: any) => {
                        const a = item as Student;
                        
                        // Find class details
                        const assignedClass = classes.find(c => c.id === a.classId);
                        const schoolNameOfSt = assignedClass ? getSchoolName(assignedClass.schoolId) : getSchoolName(a.schoolId);

                        return (
                          <div key={a.id} className="p-4 bg-slate-50 border border-slate-150 rounded-2xl hover:border-slate-300 hover:bg-white transition flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
                            <div className="flex items-start gap-3">
                              {/* Foto / Avatar do Aluno */}
                              <div className="w-10 h-10 rounded-full border border-slate-200 overflow-hidden bg-white shrink-0 shadow-3xs flex items-center justify-center mt-0.5">
                                {a.photo ? (
                                  <img src={a.photo} alt={a.name} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                                ) : (
                                  <div className="w-full h-full flex items-center justify-center bg-[#002D62]/5 text-[#002D62] font-black text-[11px] tracking-wider uppercase">
                                    {a.name.slice(0, 2)}
                                  </div>
                                )}
                              </div>
                              <div className="space-y-1">
                                <div className="flex items-center gap-2 flex-wrap">
                                  <h3 className="text-xs font-black text-slate-900">{a.name}</h3>
                                  <span className="bg-slate-200 text-slate-700 text-[8px] font-black px-1.5 py-0.5 rounded">
                                    {a.age}
                                  </span>
                                {a.hasSpecialNeeds && (
                                  <span className="bg-amber-50 border border-amber-250 text-amber-800 text-[8px] font-extrabold px-1.5 py-0.5 rounded flex items-center gap-1 shrink-0">
                                    <span className="w-1.5 h-1.5 bg-amber-500 rounded-full animate-pulse"></span>
                                    AEE Ativo
                                  </span>
                                )}
                              </div>
                              <div className="flex flex-col md:flex-row gap-x-4 gap-y-0.5 text-[11px] text-slate-500 font-semibold pt-0.5">
                                <p>Unidade: <span className="text-slate-700 font-black">{schoolNameOfSt}</span></p>
                                <p>Turma: <span className="text-[#002D62] font-black">{a.className}</span></p>
                              </div>
                              {a.address && (
                                <p className="flex items-center gap-1.5 text-[11px] text-slate-500 font-semibold pt-0.5">
                                  <MapPin size={11} className="text-slate-400 shrink-0" />
                                  {a.address}, {a.city} {a.cep && `• CEP: ${a.cep}`}
                                </p>
                              )}
                              {a.hasSpecialNeeds && a.specialNeeds && (
                                <p className="text-[10px] font-bold text-slate-450 italic">
                                  Condição: {a.specialNeeds}
                                </p>
                              )}
                            </div>
                          </div>

                          <div className="flex gap-1.5 shrink-0 self-end sm:self-auto pt-2 sm:pt-0">
                              <button 
                                onClick={() => handleStartEdit(a)}
                                className="p-1 px-2.5 bg-white border border-slate-200 rounded-lg text-[10px] font-bold text-slate-650 hover:bg-amber-400 hover:text-slate-950 hover:border-amber-400 transition cursor-pointer"
                                type="button"
                              >
                                Editar
                              </button>
                              <button 
                                onClick={() => handleDeleteItem(a.id, a.name)}
                                className="p-1 px-2 bg-rose-50 border border-slate-105 rounded-lg text-[10px] font-bold text-rose-700 hover:bg-rose-100 transition cursor-pointer"
                                type="button"
                              >
                                Excluir
                              </button>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}

                  {activeTab === 'profissao' && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {filteredData.map((item: any) => {
                        const pr = item as Profession;
                        const matchedSpecialistsCount = specialists.filter(sp => sp.professionId === pr.id).length;
                        return (
                          <div key={pr.id} className="p-5 bg-slate-50 border border-slate-150 rounded-2xl hover:border-slate-300 hover:bg-white transition flex flex-col justify-between gap-4">
                            <div className="space-y-2">
                              <div className="flex justify-between items-start">
                                <span className="inline-block bg-[#002D62]/10 text-[#002D62] text-[9px] font-black uppercase tracking-wider px-2 py-0.5 rounded">
                                  Profissão habilitada
                                </span>
                                <span className="bg-emerald-50 border border-emerald-200 text-emerald-800 font-extrabold px-2 py-0.5 rounded text-[9px] uppercase tracking-wider">
                                  {matchedSpecialistsCount} {matchedSpecialistsCount === 1 ? 'Profissional' : 'Profissionais'}
                                </span>
                              </div>
                              <h3 className="text-xs font-black text-slate-900 flex items-center gap-2">
                                <Briefcase size={14} className="text-[#002D62]" />
                                {pr.name}
                              </h3>
                              <p className="text-[11px] text-slate-500 font-medium leading-relaxed">
                                {pr.description || 'Nenhuma descrição inserida para esta ocupação.'}
                              </p>
                            </div>

                            <div className="flex justify-end gap-1.5 border-t border-slate-100 pt-3">
                              <button 
                                onClick={() => handleStartEdit(pr)}
                                className="p-1 px-2.5 bg-white border border-slate-200 rounded-lg text-[10px] font-bold text-slate-650 hover:bg-amber-400 hover:text-slate-950 hover:border-amber-400 transition cursor-pointer"
                                type="button"
                              >
                                Editar
                              </button>
                              <button 
                                onClick={() => handleDeleteItem(pr.id, pr.name)}
                                className="p-1 px-2 bg-rose-50 border border-slate-105 rounded-lg text-[10px] font-bold text-rose-700 hover:bg-rose-100 transition cursor-pointer"
                                type="button"
                              >
                                Excluir
                              </button>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}

                  {activeTab === 'profissional' && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {filteredData.map((item: any) => {
                        const sp = item as Specialist;
                        return (
                          <div key={sp.id} className="p-5 bg-slate-50 border border-slate-150 rounded-2xl hover:border-slate-300 hover:bg-white transition flex flex-col justify-between gap-4">
                            <div className="space-y-2">
                              <div className="flex justify-between items-start">
                                <span className="inline-block bg-[#002D62]/10 text-[#002D62] text-[9px] font-black uppercase tracking-wider px-2 py-0.5 rounded">
                                  {sp.professionName}
                                </span>
                                <span className={`font-black px-2 py-0.5 rounded text-[8px] uppercase tracking-wider ${
                                  sp.status === 'Ativo' ? 'bg-emerald-50 text-emerald-800 border border-emerald-200' : 'bg-amber-50 text-amber-800 border border-amber-200'
                                }`}>
                                  {sp.status || 'Ativo'}
                                </span>
                              </div>
                              <h3 className="text-xs font-black text-slate-900 flex items-center gap-2">
                                <HeartHandshake size={15} className="text-[#002D62]" />
                                {sp.name}
                              </h3>
                              
                              <div className="space-y-1 text-[11px] text-slate-500 font-semibold pt-1">
                                <p className="text-[#002D62] font-extrabold">
                                  🆔 Registro: {sp.registerNum}
                                </p>
                                <p className="flex items-center gap-1.5 font-medium">
                                  <Mail size={11} className="text-slate-400 shrink-0" />
                                  {sp.email}
                                </p>
                                {sp.phone && (
                                  <p className="flex items-center gap-1.5 font-medium">
                                    <Phone size={11} className="text-slate-400 shrink-0" />
                                    {sp.phone}
                                  </p>
                                )}
                                {sp.address && (
                                  <p className="flex items-center gap-1.5 font-medium">
                                    <MapPin size={11} className="text-slate-400 shrink-0" />
                                    {sp.address}, {sp.city} {sp.cep && `• CEP: ${sp.cep}`}
                                  </p>
                                )}
                              </div>
                            </div>

                            <div className="flex justify-end gap-1.5 border-t border-slate-100 pt-3">
                              <button 
                                onClick={() => handleStartEdit(sp)}
                                className="p-1 px-2.5 bg-white border border-slate-200 rounded-lg text-[10px] font-bold text-slate-650 hover:bg-amber-400 hover:text-slate-950 hover:border-amber-400 transition cursor-pointer"
                                type="button"
                              >
                                Editar
                              </button>
                              <button 
                                onClick={() => handleDeleteItem(sp.id, sp.name)}
                                className="p-1 px-2 bg-rose-50 border border-slate-100 rounded-lg text-[10px] font-bold text-rose-700 hover:bg-rose-100 transition cursor-pointer"
                                type="button"
                              >
                                Excluir
                              </button>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}

                  {activeTab === 'responsavel' && (
                    <div className="space-y-4">
                      {filteredData.map((item: any) => {
                        const p = item as Parent;
                        
                        // Find this parent's associated children objects
                        const associatedChildren = students.filter(s => p.childrenIds?.includes(s.id));

                        return (
                          <div key={p.id} className="p-5 bg-slate-50 border border-slate-150 rounded-2xl hover:border-slate-300 hover:bg-white transition flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                            <div className="space-y-2">
                              <div className="flex items-center gap-2 flex-wrap">
                                <h3 className="text-xs font-black text-slate-900 flex items-center gap-2">
                                  <UserCheck size={15} className="text-[#002D62]" />
                                  {p.name}
                                </h3>
                                <span className={`font-black px-2 py-0.5 rounded text-[8px] uppercase tracking-wider ${
                                  p.status === 'Ativo' ? 'bg-emerald-50 text-emerald-800 border border-emerald-200' : 'bg-rose-50 text-rose-800 border border-[#fecdd3]'
                                }`}>
                                  {p.status || 'Ativo'}
                                </span>
                              </div>
                              
                              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-1 text-[11px] text-slate-500 font-semibold">
                                <p className="flex items-center gap-1.5 flex-wrap">
                                  <Mail size={11} className="text-slate-400 shrink-0" />
                                  {p.email}
                                </p>
                                {p.phone && (
                                  <p className="flex items-center gap-1.5 flex-wrap">
                                    <Phone size={11} className="text-slate-400 shrink-0" />
                                    {p.phone}
                                  </p>
                                )}
                                {p.address && (
                                  <p className="flex items-center gap-1.5 text-[11px] text-[#002D62]">
                                    <MapPin size={11} className="text-slate-400 shrink-0" />
                                    {p.address}, {p.city} {p.cep && `• CEP: ${p.cep}`}
                                  </p>
                                )}
                              </div>

                              {/* Associated children list layout in visual capsules */}
                              <div className="pt-1.5 flex items-center gap-2 flex-wrap">
                                <span className="text-[9px] uppercase tracking-wider font-extrabold text-[#002D62] pl-0.5">
                                  Dependentes / Filhos:
                                </span>
                                {associatedChildren.length === 0 ? (
                                  <span className="text-[10px] text-slate-450 italic font-medium">Nenhum filho associado</span>
                                ) : (
                                  associatedChildren.map((child) => (
                                    <span key={child.id} className="inline-flex items-center gap-1 bg-[#002D62]/5 border border-[#002D62]/10 hover:bg-[#002D62]/10 text-[#002D62] text-[10px] font-black px-2.5 py-1 rounded-full text-center">
                                      👶 {child.name} <span className="text-[8px] font-bold text-slate-400">({child.className})</span>
                                    </span>
                                  ))
                                )}
                              </div>
                            </div>

                            <div className="flex gap-1.5 shrink-0 self-end md:self-auto pt-2 md:pt-0">
                              <button 
                                onClick={() => handleStartEdit(p)}
                                className="p-1 px-2.5 bg-white border border-slate-200 rounded-lg text-[10px] font-bold text-slate-650 hover:bg-amber-400 hover:text-slate-950 hover:border-amber-400 transition cursor-pointer"
                                type="button"
                              >
                                Editar
                              </button>
                              <button 
                                onClick={() => handleDeleteItem(p.id, p.name)}
                                className="p-1 px-2 bg-rose-50 border border-slate-105 rounded-lg text-[10px] font-bold text-rose-700 hover:bg-rose-100 transition cursor-pointer"
                                type="button"
                              >
                                Excluir
                              </button>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}

                </div>
              )}

            </div>
          )}

        </div>

      </div>

    </div>
  );
}
