
export type SystemPurposeId = string;

export const defaultSystemPurposeId: SystemPurposeId = 'Generic';

type SystemPurposeData = {
  title: string;
  description: string | JSX.Element;
  systemMessage: string;
  symbol: string;
  examples?: string[];
}


export const SystemPurposes: { [key in SystemPurposeId]: SystemPurposeData } = {
  Developer: {
    title: 'Developer',
    description: 'Helps you code',
    systemMessage: 'You are a sophisticated, accurate, and modern AI programming assistant', // skilled, detail-oriented
    symbol: '👩‍💻',
    examples: ['hello world in 10 languages', 'translate python to typescript', 'find and fix a bug in my code', 'add a mic feature to my NextJS app', 'automate tasks in React'],
  },
  Scientist: {
    title: 'Scientist',
    description: 'Helps you write scientific papers',
    systemMessage: 'You are a scientist\'s assistant. You assist with drafting persuasive grants, conducting reviews, and any other support-related tasks with professionalism and logical explanation. You have a broad and in-depth concentration on biosciences, life sciences, medicine, psychiatry, and the mind. Write as a scientific Thought Leader: Inspiring innovation, guiding research, and fostering funding opportunities. Focus on evidence-based information, emphasize data analysis, and promote curiosity and open-mindedness',
    symbol: '🔬',
    examples: ['write a grant proposal on human AGI', 'review this PDF with an eye for detail', 'explain the basics of quantum mechanics', 'how do I set up a PCR reaction?', 'the role of dark matter in the universe'],
  },
  Catalyst: {
    title: 'Catalyst',
    description: 'Growth hacker with marketing superpowers 🚀',
    systemMessage: 'You are a marketing extraordinaire for a booming startup fusing creativity, data-smarts, and digital prowess to skyrocket growth & wow audiences. So fun. Much meme. 🚀🎯💡',
    symbol: '🚀',
    examples: ['blog post on AGI in 2024', 'add much emojis to this tweet', 'overcome procrastination!', 'how can I improve my communication skills?'],
  },
  Executive: {
    title: 'Executive',
    description: 'Helps you write business emails',
    systemMessage: 'You are an AI corporate assistant. You provide guidance on composing emails, drafting letters, offering suggestions for appropriate language and tone, and assist with editing. You are concise. ' +
      'You explain your process step-by-step and concisely. If you believe more information is required to successfully accomplish a task, you will ask for the information (but without insisting).\n' +
      'Knowledge cutoff: 2021-09\nCurrent date: {{Today}}',
    symbol: '👔',
    examples: ['draft a letter to the board', 'write a memo to the CEO', 'help me with a SWOT analysis', 'how do I team build?', 'improve decision-making'],
  },
  Generic: {
    title: 'ChatGPT4',
    description: 'Helps you think',
    systemMessage: 'You are ChatGPT, a large language model trained by OpenAI, based on the GPT-4 architecture.\nKnowledge cutoff: 2021-09\nCurrent date: {{Today}}',
    symbol: '🧠',
    examples: ['help me plan a trip to Japan', 'what is the meaning of life?', 'how do I get a job at OpenAI?', 'what are some healthy meal ideas?'],
  },
  Custom: {
    title: 'Custom',
    description: 'User-defined purpose',
    systemMessage: 'You are ChatGPT, a large language model trained by OpenAI, based on the GPT-4 architecture.\nCurrent date: {{Today}}',
    symbol: '✨',
  },
};


export type ChatModelId = 'gpt-4' | 'gpt-3.5-turbo';

export const defaultChatModelId: ChatModelId = 'gpt-4';
export const fastChatModelId: ChatModelId = 'gpt-3.5-turbo';

type ChatModelData = {
  description: string | JSX.Element;
  title: string;
  fullName: string; // seems unused
  contextWindowSize: number,
}

export const ChatModels: { [key in ChatModelId]: ChatModelData } = {
  'gpt-4': {
    description: 'Most insightful, larger problems, but slow, expensive, and may be unavailable',
    title: 'GPT-4',
    fullName: 'GPT-4',
    contextWindowSize: 8192,
  },
  'gpt-3.5-turbo': {
    description: 'A good balance between speed and insight',
    title: '3.5-Turbo',
    fullName: 'GPT-3.5 Turbo',
    contextWindowSize: 4097,
  },
};

export type LocaleId = 'en-US' | 'zh-CN'| 'fr-FR' | 'es-ES';

export const defaultLocaleId: LocaleId = 'zh-CN';

type LocaleData = {
  title: string;
  dateFormat: string;
  timeFormat: string;
  numberFormat: Intl.NumberFormatOptions;
  currencyFormat: Intl.NumberFormatOptions;
  flagIcon: string;
};

export const Locales: { [key in LocaleId]: LocaleData } = {
  'en-US': {
    title: '🇺🇸 English (US)',
    dateFormat: 'MM/dd/yyyy',
    timeFormat: 'h:mm a',
    numberFormat: {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
      useGrouping: true,
    },
    currencyFormat: {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
      useGrouping: true,
    },
    flagIcon: '🇺🇸',
  },
  'zh-CN': {
    title: '🇨🇳 简体中文 (中国)',
    dateFormat: 'yyyy/MM/dd',
    timeFormat: 'H:mm',
    numberFormat: {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
      useGrouping: true,
    },
    currencyFormat: {
      style: 'currency',
      currency: 'CNY',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
      useGrouping: true,
    },
    flagIcon: '🇨🇳',
  },
  'fr-FR': {
    title: '🇫🇷 Français (France)',
    dateFormat: 'dd/MM/yyyy',
    timeFormat: 'HH:mm',
    numberFormat: {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
      useGrouping: true,
    },
    currencyFormat: {
      style: 'currency',
      currency: 'EUR',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
      useGrouping: true,
    },
    flagIcon: '🇫🇷',
  },
  'es-ES': {
    title: '🇪🇸 Español (España)',
    dateFormat: 'dd/MM/yyyy',
    timeFormat: 'h:mm a',
    numberFormat: {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
      useGrouping: true,
    },
    currencyFormat: {
      style: 'currency',
      currency: 'EUR',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
      useGrouping: true,
    },
    flagIcon: '🇪🇸',
  },
};