/**
 * @typedef {Object} Position
 * Conforms to https://jsonresume.org/schema/
 *
 * @property {string} name - Name of the company
 * @property {string} position - Position title
 * @property {string} url - Company website
 * @property {string} startDate - Start date of the position in YYYY-MM-DD format
 * @property {string|undefined} endDate - End date of the position in YYYY-MM-DD format.
 * If undefined, the position is still active.
 * @property {string|undefined} summary - html/markdown summary of the position
 * @property {string[]} highlights - plain text highlights of the position (bulleted list)
 */
const work = [
  {
    name: 'Microsoft, Azure AI studio',
    position: 'Senior Frontend Software Engineer',
    url: 'https://ai.azure.com',
    startDate: '2018-10-15',
    summary: `As a Senior Frontend Engineer and Tech Lead at Microsoft AI Studio,
    I've made significant contributions across various projects.
    I optimized the Azure Machine Learning's developer experience, boosting productivity for 100 developers,
    which involved a build tool transition to Vite and implementing Hot Module Replacement,
    resulting in a 5x increase in website performance. I led the Retriever-Augmented Generation project,
    developing intuitive interfaces and enhancing data handling and retrieval functionalities.
    In the Azure Machine Learning Finetuning project, I facilitated cross-team collaborations and integrated
    major resources like Meta Llama-2 and Hugging Face, streamlining model finetuning and evaluation processes.
    I also orchestrated the seamless integration of Azure Notebooks, optimizing the rendering of large-scale data.
    Additionally, I designed and implemented the Microsoft News article display portal, enhancing content accessibility
    and search rankings through strategic API integrations. These endeavors have collectively advanced Microsoft's AI
    and machine learning capabilities, demonstrating my leadership and technical prowess in the field.`,
    highlights: [
      'Optimized Azure Machine Learning\'s developer experience, significantly boosted productivity for 100 developers across 2 organizations. Conducted the build tool transition from Webpack to Vite, and adopted Hot Module Replacement for instant updates. Improved 5x faster of web site cold start and refresh, modified eslint rule to instantaneous file-saving and instant reflection of changes, earned recognition and trust from the leadership team.',
      'Directed Retriever-Augmented Generation project, created intuitive interfaces with React and TypeScript, built uploading data component with JavaScript local storage and Azure blob/file storage, created document chunking and text embedding functionalities with Langchain, built vector index and storage with FAISS and Azure Cognitive Search, bumped the data to prompt flow to Azure OpenAI service and OpenAI connections to retrieve answers for users.',
      'Led the platform development of Azure Machine Learning Finetuning, drove discussions across teams including PM, designer and services. Built up Azure resources connections with Meta Llama-2 and Hugging Face to support models importing to AML for finetuning and evaluations, built up UI with React and TypeScript to support user setting LoRA parameters, connected user data and model with job scheduler service to distribute the training on serverless compute.',
      'Orchestrated the seamless integration of Azure Notebooks, integrated the 3rd party JavaScript bundle into CDN and consumed from Azure workspace resources provider, facilitated the embedding of it to the UI with React and TypeScript. Utilized the react-virtualized library to efficiently render large number(10K+) of files in Notebooks file explorer.',
      'Designed and implemented the Microsoft News article displaying portal with React and ASP.NET, defined the API with content-recommending service, obtained best matching article and linked it to the next button. Embed the articles into Bing search content, and improved the rankings for these articles, leveraging the Bing API to achieve this.',
    ],
  },
];

export default work;
