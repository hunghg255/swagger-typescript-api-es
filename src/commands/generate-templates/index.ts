import { TemplatesGenProcess } from './templates-gen-process';
import { GenerateTemplatesParams } from '../../../src/types';

const generateTemplates = async (config: GenerateTemplatesParams) => {
  const codeGenProcess = new TemplatesGenProcess(config);
  return await codeGenProcess.start();
};

export { generateTemplates };
