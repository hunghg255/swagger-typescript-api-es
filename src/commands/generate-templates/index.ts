import type { GenerateTemplatesParams } from '../../types';
import { TemplatesGenProcess } from './templates-gen-process';
import type { GenerateTemplatesOutput } from './templates-gen-process';

const generateTemplates = async (
  config: GenerateTemplatesParams
): Promise<GenerateTemplatesOutput> => {
  const codeGenProcess = new TemplatesGenProcess(config);
  return await codeGenProcess.start();
};

export { generateTemplates };
export type { GenerateTemplatesOutput, SourceTemplate } from './templates-gen-process';
