import { Student, RoutineState, PedagogicalPlan, InclusionReport, FeedPost } from './types';

export const INITIAL_STUDENTS: Student[] = [
  // --- PARENT 1: Ricardo Dias (ricardo.responsavel@lasalle.org) ---
  {
    id: 'student-1',
    name: 'Guto Pinheiro',
    age: '4 anos',
    ageGroup: 'pequenos',
    classId: 'infantil-2',
    className: 'Infantil II - B',
    hasSpecialNeeds: true,
    specialNeeds: 'Transtorno do Espectro Autista (TEA)',
    peiPlan: 'Estimular comunicação funcional com apoio visual (cartões PECS); prever cantos de autorregulação e amortecimento sensorial quando o barulho de sala estiver alto; explorar interesses específicos em dinossauros para letramento.',
    photo: 'https://images.unsplash.com/photo-1519457431-44ccd64a579b?auto=format&fit=crop&q=80&w=150&h=150'
  },
  {
    id: 'student-5',
    name: 'Alice Silva',
    age: '2 anos e 3 meses',
    ageGroup: 'pequenos',
    classId: 'maternal-1',
    className: 'Maternal I',
    hasSpecialNeeds: false,
    photo: 'https://images.unsplash.com/photo-1516624683217-bf02fc6b6b7c?auto=format&fit=crop&q=80&w=150&h=150'
  },
  {
    id: 'student-6',
    name: 'Bruno Dias',
    age: '5 anos',
    ageGroup: 'pequenos',
    classId: 'infantil-3',
    className: 'Infantil III - A',
    hasSpecialNeeds: false,
    photo: 'https://images.unsplash.com/photo-1503919545889-aef636e10ad4?auto=format&fit=crop&q=80&w=150&h=150'
  },

  // --- PARENT 2: Mariana Almeida (mariana.almeida@lasalle.org) ---
  {
    id: 'student-7',
    name: 'Leo Almeida',
    age: '6 anos',
    ageGroup: 'grandes',
    classId: '1-ano-a',
    className: '1º Ano A',
    hasSpecialNeeds: false,
    photo: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=150&h=150'
  },
  {
    id: 'student-8',
    name: 'Guilherme Almeida',
    age: '3 anos',
    ageGroup: 'pequenos',
    classId: 'maternal-2',
    className: 'Maternal II',
    hasSpecialNeeds: false,
    photo: 'https://images.unsplash.com/photo-1503919545889-aef636e10ad4?auto=format&fit=crop&q=80&w=150&h=150'
  },

  // --- PARENT 3: Carlos Rocha (carlos.rocha@lasalle.org) ---
  {
    id: 'student-3',
    name: 'Theo Rocha',
    age: '5 anos',
    ageGroup: 'pequenos',
    classId: 'infantil-3',
    className: 'Infantil III - A',
    hasSpecialNeeds: true,
    specialNeeds: 'Transtorno do Déficit de Atenção com Hiperatividade (TDAH)',
    peiPlan: 'Segmentar instruções em pequenas etapas; reforço positivo verbal frequente; oferecer opções de movimento controlado (ir até o quadro, buscar materiais); apoio no foco visual com imagens coloridas de contraste.',
    photo: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=150&h=150'
  },
  {
    id: 'student-9',
    name: 'Sophia Rocha',
    age: '1 ano',
    ageGroup: 'bebês',
    classId: 'bercario-1',
    className: 'Berçário I',
    hasSpecialNeeds: false,
    photo: 'https://images.unsplash.com/photo-1519457431-44ccd64a579b?auto=format&fit=crop&q=80&w=150&h=150'
  },
  {
    id: 'student-10',
    name: 'Lucas Rocha',
    age: '2 anos',
    ageGroup: 'pequenos',
    classId: 'maternal-1',
    className: 'Maternal I',
    hasSpecialNeeds: false,
    photo: 'https://images.unsplash.com/photo-1471286174890-9c112ffca5b4?auto=format&fit=crop&q=80&w=150&h=150'
  },

  // --- PARENT 4: Patrícia Souza (patricia.souza@lasalle.org) ---
  {
    id: 'student-2',
    name: 'Helena Souza',
    age: '3 anos',
    ageGroup: 'pequenos',
    classId: 'maternal-2',
    className: 'Maternal II',
    hasSpecialNeeds: false,
    photo: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&q=80&w=150&h=150'
  },
  {
    id: 'student-11',
    name: 'Pedro Souza',
    age: '4 anos',
    ageGroup: 'pequenos',
    classId: 'infantil-2',
    className: 'Infantil II - B',
    hasSpecialNeeds: false,
    photo: 'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&q=80&w=150&h=150'
  },

  // --- PARENT 5: Fernanda Costa (fernanda.costa@lasalle.org) ---
  {
    id: 'student-4',
    name: 'Beatriz Costa',
    age: '11 meses',
    ageGroup: 'bebês',
    classId: 'bercario-1',
    className: 'Berçário I',
    hasSpecialNeeds: false,
    photo: 'https://images.unsplash.com/photo-1596464716127-f2a82984de30?auto=format&fit=crop&q=80&w=150&h=150'
  },
  {
    id: 'student-12',
    name: 'Gabriel Costa',
    age: '6 anos',
    ageGroup: 'grandes',
    classId: '1-ano-a',
    className: '1º Ano A',
    hasSpecialNeeds: false,
    photo: 'https://images.unsplash.com/photo-1510210119931-1837856d227f?auto=format&fit=crop&q=80&w=150&h=150'
  },
  {
    id: 'student-13',
    name: 'Clara Costa',
    age: '2 anos',
    ageGroup: 'pequenos',
    classId: 'maternal-1',
    className: 'Maternal I',
    hasSpecialNeeds: false,
    photo: 'https://images.unsplash.com/photo-1516624683217-bf02fc6b6b7c?auto=format&fit=crop&q=80&w=150&h=150'
  },

  // --- PARENT 6: Gustavo Pinheiro (gustavo.pinheiro@lasalle.org) ---
  {
    id: 'student-14',
    name: 'Laura Pinheiro',
    age: '3 anos',
    ageGroup: 'pequenos',
    classId: 'maternal-2',
    className: 'Maternal II',
    hasSpecialNeeds: false,
    photo: 'https://images.unsplash.com/photo-1484981138541-3d074aa97716?auto=format&fit=crop&q=80&w=150&h=150'
  },
  {
    id: 'student-15',
    name: 'Enzo Pinheiro',
    age: '5 anos',
    ageGroup: 'pequenos',
    classId: 'infantil-3',
    className: 'Infantil III - A',
    hasSpecialNeeds: false,
    photo: 'https://images.unsplash.com/photo-1537655780520-1e392edd816a?auto=format&fit=crop&q=80&w=150&h=150'
  },

  // --- 20 FAMÍLIAS ADICIONAIS ADICIONADAS CONFORME REQUISITO ---
  { id: 'student-20', name: 'Guilherme Silva', age: '2 anos', ageGroup: 'pequenos', classId: 'maternal-1b', className: 'Maternal I - B', hasSpecialNeeds: false },
  { id: 'student-21', name: 'Mariana Silva', age: '1 ano', ageGroup: 'bebês', classId: 'bercario-2', className: 'Berçário II - B', hasSpecialNeeds: false },
  { id: 'student-22', name: 'Pedro Santos', age: '5 anos', ageGroup: 'pequenos', classId: 'infantil-3b', className: 'Infantil III - B', hasSpecialNeeds: false },
  { id: 'student-23', name: 'Enzo Oliveira', age: '3 anos', ageGroup: 'pequenos', classId: 'maternal-2b', className: 'Maternal II - B', hasSpecialNeeds: false },
  { id: 'student-24', name: 'Ana Oliveira', age: '4 anos', ageGroup: 'pequenos', classId: 'infantil-2c', className: 'Infantil II - C', hasSpecialNeeds: false },
  { id: 'student-25', name: 'Carlos Oliveira', age: '1 ano', ageGroup: 'bebês', classId: 'bercario-2', className: 'Berçário II - B', hasSpecialNeeds: false },
  { id: 'student-26', name: 'Lucas Souza', age: '5 anos', ageGroup: 'pequenos', classId: 'infantil-3b', className: 'Infantil III - B', hasSpecialNeeds: false },
  { id: 'student-27', name: 'Júlia Rodrigues', age: '2 anos', ageGroup: 'pequenos', classId: 'maternal-1b', className: 'Maternal I - B', hasSpecialNeeds: false },
  { id: 'student-28', name: 'Gabriel Rodrigues', age: '1 ano', ageGroup: 'bebês', classId: 'bercario-2', className: 'Berçário II - B', hasSpecialNeeds: false },
  { id: 'student-29', name: 'Sofia Ferreira', age: '3 anos', ageGroup: 'pequenos', classId: 'maternal-2b', className: 'Maternal II - B', hasSpecialNeeds: false },
  { id: 'student-30', name: 'Mateo Ferreira', age: '4 anos', ageGroup: 'pequenos', classId: 'infantil-2c', className: 'Infantil II - C', hasSpecialNeeds: false },
  { id: 'student-31', name: 'Beatriz Ferreira', age: '1 ano', ageGroup: 'bebês', classId: 'bercario-2', className: 'Berçário II - B', hasSpecialNeeds: false },
  { id: 'student-32', name: 'Manuela Alves', age: '5 anos', ageGroup: 'pequenos', classId: 'infantil-3b', className: 'Infantil III - B', hasSpecialNeeds: false },
  { id: 'student-33', name: 'Davi Pereira', age: '2 anos', ageGroup: 'pequenos', classId: 'maternal-1b', className: 'Maternal I - B', hasSpecialNeeds: false },
  { id: 'student-34', name: 'Lívia Pereira', age: '1 ano', ageGroup: 'bebês', classId: 'bercario-2', className: 'Berçário II - B', hasSpecialNeeds: false },
  { id: 'student-35', name: 'Alice Gomes', age: '3 anos', ageGroup: 'pequenos', classId: 'maternal-2b', className: 'Maternal II - B', hasSpecialNeeds: false },
  { id: 'student-36', name: 'Arthur Gomes', age: '4 anos', ageGroup: 'pequenos', classId: 'infantil-2c', className: 'Infantil II - C', hasSpecialNeeds: false },
  { id: 'student-37', name: 'Laura Gomes', age: '1 ano', ageGroup: 'bebês', classId: 'bercario-2', className: 'Berçário II - B', hasSpecialNeeds: false },
  { id: 'student-38', name: 'Heitor Ribeiro', age: '5 anos', ageGroup: 'pequenos', classId: 'infantil-3b', className: 'Infantil III - B', hasSpecialNeeds: false },
  { id: 'student-39', name: 'Helena Martins', age: '2 anos', ageGroup: 'pequenos', classId: 'maternal-1b', className: 'Maternal I - B', hasSpecialNeeds: false },
  { id: 'student-40', name: 'Miguel Martins', age: '1 ano', ageGroup: 'bebês', classId: 'bercario-2', className: 'Berçário II - B', hasSpecialNeeds: false },
  { id: 'student-41', name: 'Lorena Carvalho', age: '3 anos', ageGroup: 'pequenos', classId: 'maternal-2b', className: 'Maternal II - B', hasSpecialNeeds: false },
  { id: 'student-42', name: 'Bernardo Carvalho', age: '4 anos', ageGroup: 'pequenos', classId: 'infantil-2c', className: 'Infantil II - C', hasSpecialNeeds: false },
  { id: 'student-43', name: 'Isabella Carvalho', age: '1 ano', ageGroup: 'bebês', classId: 'bercario-2', className: 'Berçário II - B', hasSpecialNeeds: false },
  { id: 'student-44', name: 'Valentina Almeida', age: '5 anos', ageGroup: 'pequenos', classId: 'infantil-3b', className: 'Infantil III - B', hasSpecialNeeds: false },
  { id: 'student-45', name: 'Samuel Lopes', age: '2 anos', ageGroup: 'pequenos', classId: 'maternal-1b', className: 'Maternal I - B', hasSpecialNeeds: false },
  { id: 'student-46', name: 'Giovanna Lopes', age: '1 ano', ageGroup: 'bebês', classId: 'bercario-2', className: 'Berçário II - B', hasSpecialNeeds: false },
  { id: 'student-47', name: 'Daniel Soares', age: '3 anos', ageGroup: 'pequenos', classId: 'maternal-2b', className: 'Maternal II - B', hasSpecialNeeds: false },
  { id: 'student-48', name: 'Lucca Soares', age: '4 anos', ageGroup: 'pequenos', classId: 'infantil-2c', className: 'Infantil II - C', hasSpecialNeeds: false },
  { id: 'student-49', name: 'Marina Soares', age: '1 ano', ageGroup: 'bebês', classId: 'bercario-2', className: 'Berçário II - B', hasSpecialNeeds: false },
  { id: 'student-50', name: 'Emanuel Fernandes', age: '5 anos', ageGroup: 'pequenos', classId: 'infantil-3b', className: 'Infantil III - B', hasSpecialNeeds: false },
  { id: 'student-51', name: 'Leonardo Vieira', age: '2 anos', ageGroup: 'pequenos', classId: 'maternal-1b', className: 'Maternal I - B', hasSpecialNeeds: false },
  { id: 'student-52', name: 'Clara Vieira', age: '1 ano', ageGroup: 'bebês', classId: 'infantil-2c', className: 'Infantil II - C', hasSpecialNeeds: false },
  { id: 'student-53', name: 'Felipe Barbosa', age: '3 anos', ageGroup: 'pequenos', classId: 'maternal-2b', className: 'Maternal II - B', hasSpecialNeeds: false },
  { id: 'student-54', name: 'Joana Barbosa', age: '4 anos', ageGroup: 'pequenos', classId: 'infantil-2c', className: 'Infantil II - C', hasSpecialNeeds: false },
  { id: 'student-55', name: 'Rafael Barbosa', age: '1 ano', ageGroup: 'bebês', classId: 'infantil-2c', className: 'Infantil II - C', hasSpecialNeeds: false },
  { id: 'student-56', name: 'Eduarda Rocha', age: '5 anos', ageGroup: 'pequenos', classId: 'infantil-3b', className: 'Infantil III - B', hasSpecialNeeds: false },
  { id: 'student-57', name: 'Gabriel Dias', age: '2 anos', ageGroup: 'pequenos', classId: 'maternal-1b', className: 'Maternal I - B', hasSpecialNeeds: false },
  { id: 'student-58', name: 'Isabela Dias', age: '1 ano', ageGroup: 'bebês', classId: 'maternal-1b', className: 'Maternal I - B', hasSpecialNeeds: false },

  // --- 30 NOVAS FAMÍLIAS DE DOIS FILHOS CADA (60 NOVOS ALUNOS DISTRIBUÍDOS ENTRE OS PROFESSORES) ---
  // Família 1: Mendes - Ensino Fundamental I
  { id: 'student-60', name: 'Arthur Mendes', age: '6 anos', ageGroup: 'grandes', classId: 'class-fund-1', className: '1º Ano - Fund. I - A', hasSpecialNeeds: false },
  { id: 'student-61', name: 'Sofia Mendes', age: '10 anos', ageGroup: 'grandes', classId: 'class-fund-5', className: '5º Ano - Fund. I - B', hasSpecialNeeds: false },
  // Família 2: Cardoso - Ensino Fundamental II & Ensino Médio
  { id: 'student-62', name: 'Bernardo Cardoso', age: '14 anos', ageGroup: 'grandes', classId: 'class-fund-9', className: '9º Ano - Fund. II - A', hasSpecialNeeds: false },
  { id: 'student-63', name: 'Helena Cardoso', age: '15 anos', ageGroup: 'grandes', classId: 'class-medio-1', className: '1º Ano - Ensino Médio A', hasSpecialNeeds: false },
  // Família 3: Teixeira - Ensino Médio & Ensino Fundamental I
  { id: 'student-64', name: 'Gabriel Teixeira', age: '17 anos', ageGroup: 'grandes', classId: 'class-medio-3', className: '3º Ano - Ensino Médio B', hasSpecialNeeds: false },
  { id: 'student-65', name: 'Valentina Teixeira', age: '6 anos', ageGroup: 'grandes', classId: 'class-fund-1', className: '1º Ano - Fund. I - A', hasSpecialNeeds: false },
  // Família 4: Nunes - Ensino Fundamental I
  { id: 'student-66', name: 'Davi Nunes', age: '6 anos', ageGroup: 'grandes', classId: 'class-fund-1', className: '1º Ano - Fund. I - A', hasSpecialNeeds: false },
  { id: 'student-67', name: 'Manuela Nunes', age: '10 anos', ageGroup: 'grandes', classId: 'class-fund-5', className: '5º Ano - Fund. I - B', hasSpecialNeeds: false },
  // Família 5: Azevedo - Ensino Fundamental II & Ensino Médio
  { id: 'student-68', name: 'Matheus Azevedo', age: '14 anos', ageGroup: 'grandes', classId: 'class-fund-9', className: '9º Ano - Fund. II - A', hasSpecialNeeds: false },
  { id: 'student-69', name: 'Laura Azevedo', age: '15 anos', ageGroup: 'grandes', classId: 'class-medio-1', className: '1º Ano - Ensino Médio A', hasSpecialNeeds: false },
  // Família 6: Moraes - Ensino Médio & Ensino Fundamental I
  { id: 'student-70', name: 'Lucas Moraes', age: '17 anos', ageGroup: 'grandes', classId: 'class-medio-3', className: '3º Ano - Ensino Médio B', hasSpecialNeeds: false },
  { id: 'student-71', name: 'Beatriz Moraes', age: '6 anos', ageGroup: 'grandes', classId: 'class-fund-1', className: '1º Ano - Fund. I - A', hasSpecialNeeds: false },
  // Família 7: Castro - Ensino Fundamental I
  { id: 'student-72', name: 'Pedro Castro', age: '6 anos', ageGroup: 'grandes', classId: 'class-fund-1', className: '1º Ano - Fund. I - A', hasSpecialNeeds: false },
  { id: 'student-73', name: 'Julia Castro', age: '10 anos', ageGroup: 'grandes', classId: 'class-fund-5', className: '5º Ano - Fund. I - B', hasSpecialNeeds: false },
  // Família 8: Moreira - Ensino Fundamental II & Ensino Médio
  { id: 'student-74', name: 'Thiago Moreira', age: '14 anos', ageGroup: 'grandes', classId: 'class-fund-9', className: '9º Ano - Fund. II - A', hasSpecialNeeds: false },
  { id: 'student-75', name: 'Luiza Moreira', age: '15 anos', ageGroup: 'grandes', classId: 'class-medio-1', className: '1º Ano - Ensino Médio A', hasSpecialNeeds: false },
  // Família 9: Farias - Ensino Médio & Ensino Fundamental I
  { id: 'student-76', name: 'Samuel Farias', age: '17 anos', ageGroup: 'grandes', classId: 'class-medio-3', className: '3º Ano - Ensino Médio B', hasSpecialNeeds: false },
  { id: 'student-77', name: 'Alice Farias', age: '10 anos', ageGroup: 'grandes', classId: 'class-fund-5', className: '5º Ano - Fund. I - B', hasSpecialNeeds: false },
  // Família 10: Aragão - Ensino Fundamental II & Ensino Médio
  { id: 'student-78', name: 'Daniel Aragão', age: '14 anos', ageGroup: 'grandes', classId: 'class-fund-9', className: '9º Ano - Fund. II - A', hasSpecialNeeds: false },
  { id: 'student-79', name: 'Clara Aragão', age: '15 anos', ageGroup: 'grandes', classId: 'class-medio-1', className: '1º Ano - Ensino Médio A', hasSpecialNeeds: false },
  // Família 11: Guimarães - Ensino Fundamental I
  { id: 'student-80', name: 'Lorenzo Guimarães', age: '6 anos', ageGroup: 'grandes', classId: 'class-fund-1', className: '1º Ano - Fund. I - A', hasSpecialNeeds: false },
  { id: 'student-81', name: 'Cecilia Guimarães', age: '10 anos', ageGroup: 'grandes', classId: 'class-fund-5', className: '5º Ano - Fund. I - B', hasSpecialNeeds: false },
  // Família 12: Borges - Ensino Fundamental II & Ensino Médio
  { id: 'student-82', name: 'Benjamin Borges', age: '14 anos', ageGroup: 'grandes', classId: 'class-fund-9', className: '9º Ano - Fund. II - A', hasSpecialNeeds: false },
  { id: 'student-83', name: 'Giovanna Borges', age: '15 anos', ageGroup: 'grandes', classId: 'class-medio-1', className: '1º Ano - Ensino Médio A', hasSpecialNeeds: false },
  // Família 13: Guzman - Ensino Médio & Ensino Fundamental I
  { id: 'student-84', name: 'Miguel Guzman', age: '17 anos', ageGroup: 'grandes', classId: 'class-medio-3', className: '3º Ano - Ensino Médio B', hasSpecialNeeds: false },
  { id: 'student-85', name: 'Isabella Guzman', age: '6 anos', ageGroup: 'grandes', classId: 'class-fund-1', className: '1º Ano - Fund. I - A', hasSpecialNeeds: false },
  // Família 14: Pinto - Ensino Fundamental I
  { id: 'student-86', name: 'Joaquim Pinto', age: '6 anos', ageGroup: 'grandes', classId: 'class-fund-1', className: '1º Ano - Fund. I - A', hasSpecialNeeds: false },
  { id: 'student-87', name: 'Maria Pinto', age: '10 anos', ageGroup: 'grandes', classId: 'class-fund-5', className: '5º Ano - Fund. I - B', hasSpecialNeeds: false },
  // Família 15: Campos - Ensino Fundamental II & Ensino Médio
  { id: 'student-88', name: 'Heitor Campos', age: '14 anos', ageGroup: 'grandes', classId: 'class-fund-9', className: '9º Ano - Fund. II - A', hasSpecialNeeds: false },
  { id: 'student-89', name: 'Mariana Campos', age: '15 anos', ageGroup: 'grandes', classId: 'class-medio-1', className: '1º Ano - Ensino Médio A', hasSpecialNeeds: false },
  // Família 16: Lacerda - Ensino Fundamental I
  { id: 'student-90', name: 'Felipe Lacerda', age: '6 anos', ageGroup: 'grandes', classId: 'class-fund-1', className: '1º Ano - Fund. I - A', hasSpecialNeeds: false },
  { id: 'student-91', name: 'Heloisa Lacerda', age: '10 anos', ageGroup: 'grandes', classId: 'class-fund-5', className: '5º Ano - Fund. I - B', hasSpecialNeeds: false },
  // Família 17: Abreu - Ensino Fundamental II & Ensino Médio
  { id: 'student-92', name: 'Nicolas Abreu', age: '14 anos', ageGroup: 'grandes', classId: 'class-fund-9', className: '9º Ano - Fund. II - A', hasSpecialNeeds: false },
  { id: 'student-93', name: 'Lorena Abreu', age: '15 anos', ageGroup: 'grandes', classId: 'class-medio-1', className: '1º Ano - Ensino Médio A', hasSpecialNeeds: false },
  // Família 18: Melo - Ensino Médio & Ensino Fundamental I
  { id: 'student-94', name: 'Rafael Melo', age: '17 anos', ageGroup: 'grandes', classId: 'class-medio-3', className: '3º Ano - Ensino Médio B', hasSpecialNeeds: false },
  { id: 'student-95', name: 'Larissa Melo', age: '6 anos', ageGroup: 'grandes', classId: 'class-fund-1', className: '1º Ano - Fund. I - A', hasSpecialNeeds: false },
  // Família 19: Barros - Ensino Fundamental I
  { id: 'student-96', name: 'Bruno Barros', age: '6 anos', ageGroup: 'grandes', classId: 'class-fund-1', className: '1º Ano - Fund. I - A', hasSpecialNeeds: false },
  { id: 'student-97', name: 'Melissa Barros', age: '10 anos', ageGroup: 'grandes', classId: 'class-fund-5', className: '5º Ano - Fund. I - B', hasSpecialNeeds: false },
  // Família 20: Duarte - Ensino Fundamental II & Ensino Médio
  { id: 'student-98', name: 'Henrique Duarte', age: '14 anos', ageGroup: 'grandes', classId: 'class-fund-9', className: '9º Ano - Fund. II - A', hasSpecialNeeds: false },
  { id: 'student-99', name: 'Antonella Duarte', age: '15 anos', ageGroup: 'grandes', classId: 'class-medio-1', className: '1º Ano - Ensino Médio A', hasSpecialNeeds: false },
  // Família 21: Neves
  { id: 'student-100', name: 'Murilo Neves', age: '4 anos', ageGroup: 'pequenos', classId: 'infantil-2', className: 'Infantil II - B', hasSpecialNeeds: false },
  { id: 'student-101', name: 'Lavinya Neves', age: '2 anos', ageGroup: 'pequenos', classId: 'maternal-1b', className: 'Maternal I - B', hasSpecialNeeds: false },
  // Família 22: Assis
  { id: 'student-102', name: 'Caio Assis', age: '3 anos', ageGroup: 'pequenos', classId: 'maternal-2', className: 'Maternal II', hasSpecialNeeds: false },
  { id: 'student-103', name: 'Carolina Assis', age: '1 ano', ageGroup: 'bebês', classId: 'bercario-1', className: 'Berçário I', hasSpecialNeeds: false },
  // Família 23: Braga
  { id: 'student-104', name: 'Samuel Braga', age: '5 anos', ageGroup: 'pequenos', classId: 'infantil-3', className: 'Infantil III - A', hasSpecialNeeds: false },
  { id: 'student-105', name: 'Sophia Braga', age: '1 ano', ageGroup: 'bebês', classId: 'bercario-2', className: 'Berçário II - B', hasSpecialNeeds: false },
  // Família 24: Cunha
  { id: 'student-106', name: 'Vitor Cunha', age: '4 anos', ageGroup: 'pequenos', classId: 'infantil-2c', className: 'Infantil II - C', hasSpecialNeeds: false },
  { id: 'student-107', name: 'Gabriela Cunha', age: '2 anos', ageGroup: 'pequenos', classId: 'maternal-1', className: 'Maternal I', hasSpecialNeeds: false },
  // Família 25: Fonseca
  { id: 'student-108', name: 'Eduardo Fonseca', age: '3 anos', ageGroup: 'pequenos', classId: 'maternal-2b', className: 'Maternal II - B', hasSpecialNeeds: false },
  { id: 'student-109', name: 'Leticia Fonseca', age: '5 anos', ageGroup: 'pequenos', classId: 'infantil-3b', className: 'Infantil III - B', hasSpecialNeeds: false },
  // Família 26: Sampaio
  { id: 'student-110', name: 'Enzo Sampaio', age: '4 anos', ageGroup: 'pequenos', classId: 'infantil-2', className: 'Infantil II - B', hasSpecialNeeds: false },
  { id: 'student-111', name: 'Olivia Sampaio', age: '2 anos', ageGroup: 'pequenos', classId: 'maternal-1b', className: 'Maternal I - B', hasSpecialNeeds: false },
  // Família 27: Leal
  { id: 'student-112', name: 'Theo Leal', age: '3 anos', ageGroup: 'pequenos', classId: 'maternal-2', className: 'Maternal II', hasSpecialNeeds: false },
  { id: 'student-113', name: 'Maria Eduarda Leal', age: '1 ano', ageGroup: 'bebês', classId: 'bercario-1', className: 'Berçário I', hasSpecialNeeds: false },
  // Família 28: Vargas
  { id: 'student-114', name: 'Benicio Vargas', age: '5 anos', ageGroup: 'pequenos', classId: 'infantil-3', className: 'Infantil III - A', hasSpecialNeeds: false },
  { id: 'student-115', name: 'Maitê Vargas', age: '1 ano', ageGroup: 'bebês', classId: 'bercario-2', className: 'Berçário II - B', hasSpecialNeeds: false },
  // Família 29: Toledo
  { id: 'student-116', name: 'Otavio Toledo', age: '4 anos', ageGroup: 'pequenos', classId: 'infantil-2c', className: 'Infantil II - C', hasSpecialNeeds: false },
  { id: 'student-117', name: 'Catarina Toledo', age: '2 anos', ageGroup: 'pequenos', classId: 'maternal-1', className: 'Maternal I', hasSpecialNeeds: false },
  // Família 30: Nascimento
  { id: 'student-118', name: 'Noah Nascimento', age: '3 anos', ageGroup: 'pequenos', classId: 'maternal-2b', className: 'Maternal II - B', hasSpecialNeeds: false },
  { id: 'student-119', name: 'Yasmin Nascimento', age: '5 anos', ageGroup: 'pequenos', classId: 'infantil-3b', className: 'Infantil III - B', hasSpecialNeeds: false }
];

export const INITIAL_ROUTINES: RoutineState[] = [
  {
    id: 'routine-1',
    studentId: 'student-1', // Guto
    date: new Date().toISOString().split('T')[0],
    meals: 'excellent',
    sleep: 'restless',
    hygiene: 'ok',
    mood: 'calm',
    observations: 'Guto comeu toda a refeição de forma independente. Ficou um pouco agitado no momento de transição para o sono, mas se acalmou ao usar os mordedores sensoriais.'
  },
  {
    id: 'routine-2',
    studentId: 'student-2', // Helena
    date: new Date().toISOString().split('T')[0],
    meals: 'medium',
    sleep: 'good',
    hygiene: 'wet',
    mood: 'happy',
    observations: 'Helena brincou bastante no pátio de areia. Recusou uma parte do almoço, mas comeu a fruta por inteiro. Dormiu 1h30m tranquilamente.'
  },
  {
    id: 'routine-3',
    studentId: 'student-3', // Theo
    date: new Date().toISOString().split('T')[0],
    meals: 'medium',
    sleep: 'no',
    hygiene: 'ok',
    mood: 'happy',
    observations: 'Theo demonstrou liderança e engajamento na gincana de hoje. Optou por não dormir na hora do repouso, preferindo folhear livrinhos com o assistente de sala.'
  },
  {
    id: 'routine-4',
    studentId: 'student-4', // Beatriz
    date: new Date().toISOString().split('T')[0],
    meals: 'excellent',
    sleep: 'good',
    hygiene: 'dirty',
    mood: 'calm',
    observations: 'Beatriz aceitou muito bem a papinha salgada amassada. Bebeu 120ml de água durante o dia. Soninho da manhã durou 1h e o da tarde 45m.'
  }
];

export const INITIAL_PEDAGOGICAL_PLANS: PedagogicalPlan[] = [
  {
    id: 'plan-1',
    title: 'Explorando Cores e Texturas da Natureza',
    ageGroup: 'Crianças Bem Pequenas (1 ano e 7 meses a 3 anos e 11 meses)',
    experienceCamps: ['Traços, sons, cores e formas', 'O eu, o outro e o nós'],
    objectives: [
      'EI02TS02: Utilizar materiais variados com possibilidades de manipulação (argila, massa de modelar, tintas), explorando cores, texturas, superfícies, planos, formas e volumes.',
      'EI02EO03: Compartilhar os objetos e os espaços com crianças da mesma faixa etária e adultos.'
    ],
    procedures: '1. Acolhimento em círculo apresentando elementos naturais coletados do pátio (folhas secas, raminhos, capim, terra). 2. Produção de tintas naturais usando argila líquida, urucum e água de beterraba. 3. Pintura coletiva livre em papel pardo estendido no chão, estimulando a mistura e o toque manual.',
    inclusionStrategy: 'Para o Guto (TEA), disponibilizar pincéis de cabos grossos e esponjas como alternativa à pintura a dedo imediata, respeitando sua sensibilidade tátil inicial. Oferecer cartões visuais com as fotos de cada material.',
    familyGuideline: 'Conversem com as crianças sobre quais elementos eles mais gostaram de tocar e tente identificar juntos folhinhas ou pedrinhas coloridas no quintal ou na calçada ao voltar para casa.',
    createdAt: '2026-06-15'
  },
  {
    id: 'plan-2',
    title: 'Brincantes e Ritmos corporais',
    ageGroup: 'Crianças Pequenas (4 anos a 5 anos e 11 meses)',
    experienceCamps: ['Corpo, gestos e movimentos', 'Escuta, fala, pensamento e imaginação'],
    objectives: [
      'EI03CG01: Criar com o corpo formas diversificadas de expressão de sentimentos, sensações e emoções, tanto nas situações cotidianas quanto em brincadeiras, dança, teatro e música.',
      'EI03CG02: Demonstrar controle e adequação do uso de seu corpo em brincadeiras e jogos, escuta e brincadeiras cantadas.'
    ],
    procedures: '1. Brincadeira cantada de estátua com ritmos lentos, moderados e acelerados usando chocalhos de sementes. 2. Desafio motor em circuito baixo de fita gomada no chão (andar em zigue-zague, pular de um pé só, rolar). 3. Relaxamento com deitar em colchonetes acompanhado de música de chuva suave.',
    inclusionStrategy: 'Para o Theo (TDAH), colocá-lo como o "líder do chocalho" em revezamento para canalizar e liderar a atividade de movimento. Criar limites claros do circuito com contraste para guiar seu trajeto físico de forma autônoma.',
    familyGuideline: 'Brinquem em casa da brincadeira da estátua com sua música favorita! É um ótimo exercício divertido de controle inibitório e conexão em família.',
    createdAt: '2026-06-18'
  }
];

export const INITIAL_INCLUSION_REPORTS: InclusionReport[] = [
  {
    id: 'report-1',
    studentId: 'student-1',
    studentName: 'Guto Pinheiro',
    specialNeeds: 'Transtorno do Espectro Autista (TEA)',
    rawObservation: 'Guto não quis sentar no círculo hoje, ficou rodando no canto da sala sozinho. Quando as crianças começaram a bater palmas na música ele gritou e tapou o ouvido. Eu dei o dinossauro de plástico pra ele e ele se acalmou olhando as patas do boneco de perto por 20 minutos.',
    formattedReport: `### Caminhos Percorridos e Potencialidades\nNo período de observação, Guto demonstrou grande capacidade de foco individualizado focado em detalhes visuais e texturas marinhas/pré-históricas (demonstrando interesse expressivo em sua coleção de dinossauros). Ele utiliza o foco visual focado nas patas dos bonecos como um método espontâneo de busca por ordem e autorregulação tátil, o que revela um perfil sistemático e observador extremamente rico.\n\n### Mediações Pedagógicas Clínico-Afetivas\nDurante a atividade de assembleia em círculo, diante da alta densidade sonora (bater de palmas coletivo), Guto sinalizou desconforto sensorial (gritando e cobrindo os ouvidos). Prontamente, a educadora realizou o acolhimento oferecendo um objeto de seu interesse focal (o dinossauro de plástico). Para futuras assembleias, recomenda-se:\n1. Antecipar visualmente o roteiro da atividade de conversa.\n2. Disponibilizar os abafadores de som sensoriais da plataforma La Salle Conecta antes do canto coletivo.\n\n### Próximos Passos e Estimulação Combinada\nTrabalharemos o letramento do Guto utilizando cartões ilustrados com fatos de paleontologia. Estimularemos o compartilhamento gradual do dinossauro de plástico em duplas com Helena, fortalecendo a socialização empática dirigida.\n\n*Relatório gerado com acolhimento e inteligência pedagógica Lumi.*`,
    date: '2026-06-20',
    teacherName: 'Profª Luciana Martins'
  }
];

export const INITIAL_FEED_POSTS: FeedPost[] = [
  {
    id: 'post-1',
    title: 'Acolhimento Lassalista e o Brincar Heurístico',
    content: 'Hoje no La Salle Conecta celebramos a vivência do brincar livre e heurístico! Nossos pequenos exploraram caixas de papelão, rolos, tecidos e potes de diferentes tamanhos. Esse tipo de brincadeira sem brinquedo pronto desenvolve a autonomia, a hipótese científica e a criatividade. Cada criança é protagonista e brilha com sua própria luz!',
    date: 'Hoje, 09:30',
    type: 'moment',
    imageUrl: 'https://images.unsplash.com/photo-1540479859555-17af45c78a9d?auto=format&fit=crop&q=80&w=800',
    likes: 12,
    comments: [
      { id: 'c1', author: 'Mariana (Mãe do Guto)', text: 'Que lindo ver a proposta! O Guto ama brincar com potes em casa, agora entendo a intencionalidade pedagógica!', date: 'Hoje, 10:15' },
      { id: 'c2', author: 'Profª Luciana', text: 'Realmente foi um momento de ouro. Helena também se divertiu fazendo cabanas de tecido!', date: 'Hoje, 11:00' }
    ]
  },
  {
    id: 'post-2',
    title: 'Aviso: Oficina de Jardinagem Afetiva neste Sábado!',
    content: 'Famílias convidadas para semearmos juntos a Horta La Salle! Venham com roupas confortáveis para que pais e filhos possam mexer na terra e plantar hortaliças especiais. Inspirados no lema pastoral "Estamos Todos Conectados"!',
    date: 'Ontem, 14:00',
    type: 'notice',
    likes: 8,
    comments: []
  }
];
