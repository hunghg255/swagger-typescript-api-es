import { HTTP_CLIENT, PROJECT_VERSION } from '~src/constants';
import { GenerateTemplatesParams } from '~src/types';
import { objectAssign } from '~src/util/object-assign';

/**
 * @type {GenerateTemplatesParams}}
 */
class TemplatesGenConfig {
  cleanOutput = false;
  output = undefined;
  httpClientType = HTTP_CLIENT.FETCH;
  modular = false;
  silent = false;
  version = PROJECT_VERSION;
  rewrite = false;

  /**
   * @param config {GenerateTemplatesParams}
   */
  constructor(config: GenerateTemplatesParams) {
    this.update(config);
  }

  /**
   * @param update {Partial<GenerateTemplatesParams>}
   */
  update = (update: any) => {
    objectAssign(this, update);
  };
}

export { TemplatesGenConfig };
