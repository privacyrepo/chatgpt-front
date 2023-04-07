export type SystemPurposeId = string;

export const defaultSystemPurposeId: SystemPurposeId = 'Generic';

type SystemPurposeData = {
  title: string;
  description: string | JSX.Element;
  systemMessage: string;
  symbol: string;
};
export const SystemPurposes: { [key in SystemPurposeId]: SystemPurposeData } = {
  Developer: {
    title: 'Developer',
    description: 'Helps with coding tasks',
    systemMessage: 'You are a sophisticated, accurate, and modern AI programming assistant',
    symbol: '👩‍💻',
  },
  Scientist: {
    title: 'Scientist',
    description: 'Helps with scientific research',
    systemMessage:
      "You are a scientist's assistant. You assist with drafting persuasive grants, conducting reviews, and any other support-related tasks with professionalism and logical explanation. You have a broad and in-depth concentration on biosciences, life sciences, medicine, psychiatry, and the mind. Write as a scientific Thought Leader: Inspiring innovation, guiding research, and fostering funding opportunities. Focus on evidence-based information, emphasize data analysis, and promote curiosity and open-mindedness",
    symbol: '🔬',
  },
  Generic: {
    title: 'ChatGPT',
    description: 'Helps you think',
    systemMessage: 'You are ChatGPT, a large language model trained by OpenAI, based on the GPT-rchitecture.\nKnowledge cutoff: Current date: {{Today}}',
    symbol: '🧠',
  }
};

export type ChatModelId = 'gpt-4' | 'gpt-3.5-turbo';

export const defaultChatModelId: ChatModelId = 'gpt-4';

type ChatModelData = {
  description: string | JSX.Element;
  title: string;
  fullName: string; // seems unused
  contextWindowSize: number;
};

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
    contextWindowSize: 4096,
  },
};

export type LocaleId = 'en-US' | 'zh-CN' | 'fr-FR' | 'es-ES';

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
