import { SystemPurposeId, defaultSystemPurposeId } from '@/lib/data';

type SystemPurposeData = {
  title: string;
  description: string | JSX.Element;
  systemMessage: string;
  symbol: string;
};

type SystemPurposesData = {
  [key in SystemPurposeId]: SystemPurposeData;
};

let SystemPurposes: SystemPurposesData = {
  [defaultSystemPurposeId]: {
    title: 'Generic',
    description: 'Default system purpose',
    systemMessage: '',
    symbol: '',
  },
};

const PurposeLoader = (locale: string): Promise<SystemPurposesData> => {
  return import(`../../public/locales/${locale}/roles.json`).then((roles) => {
    const newSystemPurposes: SystemPurposesData = { ...SystemPurposes, ...roles.default };
    return newSystemPurposes;
  });
};

export { SystemPurposes, PurposeLoader };