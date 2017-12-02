import { PnpNode, IPnpNodeSettings } from 'sp-pnp-node';
import * as deepAssign from 'deep-assign';

export const settings: IPnpNodeSettings = {
  config: {
    configPath: './config/private.json',
    encryptPassword: true,
    saveConfigOnDisk: true
  }
};

export const initEnvironment = (adhoc: IPnpNodeSettings = {}): Promise<IPnpNodeSettings> => {
  let config: IPnpNodeSettings = deepAssign(settings, adhoc);
  return (new PnpNode(config)).initAmbient();
};
