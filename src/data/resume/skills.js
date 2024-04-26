const skills = [
  {
    title: 'Javascript',
    competency: 5,
    category: ['Web Development', 'Languages', 'Javascript'],
  },
  {
    title: 'Typescript',
    competency: 5,
    category: ['Web Development', 'Languages', 'Javascript'],
  },
  {
    title: 'Node.JS',
    competency: 4,
    category: ['Web Development', 'Javascript'],
  },
  {
    title: 'React',
    competency: 5,
    category: ['Web Development', 'Javascript'],
  },
  {
    title: 'Next.JS',
    competency: 3,
    category: ['Web Development', 'Javascript'],
  },
  {
    title: 'Bash',
    competency: 2,
    category: ['Tools', 'Languages'],
  },
  {
    title: 'Amazon Web Services',
    competency: 2,
    category: ['Tools', 'Web Development', 'Cloud'],
  },
  {
    title: 'MongoDB',
    competency: 3,
    category: ['Web Development', 'Databases'],
  },
  {
    title: 'ElasticSearch',
    competency: 2,
    category: ['Web Development', 'Databases'],
  },
  {
    title: 'PostgreSQL/SQLite3/SQL/Redshift',
    competency: 2,
    category: ['Web Development', 'Databases', 'Languages'],
  },
  {
    title: 'Redis',
    competency: 3,
    category: ['Web Development', 'Databases'],
  },
  {
    title: 'Data Mining',
    competency: 3,
    category: ['ML Engineering'],
  },
  {
    title: 'Express.JS',
    competency: 3,
    category: ['Web Development', 'Javascript'],
  },
  {
    title: 'Git',
    competency: 5,
    category: ['Tools'],
  },
  {
    title: 'Kubernetes',
    competency: 2,
    category: ['Tools', 'Data Engineering'],
  },
  {
    title: 'Google Cloud Compute',
    competency: 2,
    category: ['Tools', 'Web Development'],
  },
  {
    title: 'Docker',
    competency: 3,
    category: ['Tools', 'Data Engineering'],
  },
  {
    title: 'PyTorch',
    competency: 2,
    category: ['ML Engineering', 'Python'],
  },
  {
    title: 'Jupyter',
    competency: 3,
    category: ['Data Science', 'Python'],
  },
  {
    title: 'HTML + SASS/SCSS/CSS/LESS',
    competency: 5,
    category: ['Web Development', 'Languages'],
  },
  {
    title: 'Python',
    competency: 3,
    category: ['Languages', 'Python', 'ML Engineering'],
  },
  {
    title: 'C++',
    competency: 3,
    category: ['Languages'],
  },
  {
    title: 'R',
    competency: 1,
    category: ['Languages'],
  },
  {
    title: 'GraphQL',
    competency: 2,
    category: ['Web Development', 'Databases'],
  },
  {
    title: 'Spark',
    competency: 2,
    category: ['Data Engineering', 'ML Engineering'],
  },
  {
    title: 'Pylint',
    competency: 2,
    category: ['Data Engineering', 'Python'],
  },
  {
    title: 'Java',
    competency: 5,
    category: ['Languages'],
  },
  {
    title: 'PostMan',
    competency: 4,
    category: ['Tools', 'Web Development'],
  },
  {
    title: 'Fiddler',
    competency: 3,
    category: ['Tools', 'Web Development'],
  },
  {
    title: 'Azure Cloud',
    competency: 5,
    category: ['Tools', 'Web Development', 'Cloud'],
  },
  {
    title: 'Jest',
    competency: 4,
    category: ['Tests', 'Web Development'],
  },
  {
    title: 'Enzyme',
    competency: 4,
    category: ['Tests', 'Web Development'],
  },
  {
    title: 'React Testing Library',
    competency: 4,
    category: ['Tests', 'Web Development'],
  },
  {
    title: 'ASP.NET',
    competency: 3,
    category: ['Web Development'],
  },
  {
    title: 'Langchain',
    competency: 4,
    category: ['ML Engineering', 'AI'],
  },
  {
    title: 'BERT',
    competency: 3,
    category: ['AI'],
  },
  {
    title: 'Custom GPT',
    competency: 5,
    category: ['AI'],
  },
  {
    title: 'Chrome Plugin',
    competency: 4,
    category: ['Tools', 'Web Development'],
  },
  {
    title: 'Playwright crawler',
    competency: 4,
    category: ['Tools', 'Web Development'],
  },
  {
    title: 'remesh',
    competency: 4,
    category: ['Tools', 'Web Development', 'State management'],
  },
  {
    title: 'Lynx',
    competency: 4,
    category: ['Tools', 'Mobile Development'],
  },
  {
    title: 'JSBridge',
    competency: 4,
    category: ['Tools', 'Web Development', 'Mobile native'],
  },
].map((skill) => ({ ...skill, category: skill.category.sort() }));

// this is a list of colors that I like. The length should be === to the
// number of categories. Re-arrange this list until you find a pattern you like.
const colors = [
  '#6968b3',
  '#37b1f5',
  '#40494e',
  '#515dd4',
  '#e47272',
  '#cc7b94',
  '#3896e2',
  '#c3423f',
  '#d75858',
  '#747fff',
  '#64cb7b',
];

const categories = [
  ...new Set(skills.flatMap(({ category }) => category)),
].sort().map((category, index) => ({
  name: category,
  color: colors[index],
}));

export { categories, skills };
