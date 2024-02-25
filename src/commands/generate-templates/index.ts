import { GenerateTemplatesParams } from '~src/types';

import { TemplatesGenProcess } from './templates-gen-process';

const generateTemplates = async (config: GenerateTemplatesParams) => {
  const codeGenProcess = new TemplatesGenProcess(config);
  return await codeGenProcess.start();
};

export { generateTemplates };
