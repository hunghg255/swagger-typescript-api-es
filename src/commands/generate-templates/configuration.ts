import { HTTP_CLIENT, PROJECT_VERSION } from '../../constants';
import type { GenerateTemplatesParams } from '../../types';
import type { HttpClientType } from '../../types/config';
import { objectAssign } from '../../util/object-assign';

class TemplatesGenConfig {
  cleanOutput = false;
  output: string | undefined = undefined;
  httpClientType: HttpClientType = HTTP_CLIENT.FETCH;
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

  update = (update: GenerateTemplatesParams) => {
    objectAssign(this, update);
  };
}

export { TemplatesGenConfig };
