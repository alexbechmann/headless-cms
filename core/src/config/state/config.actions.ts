import { action } from 'typesafe-actions';
import { Config } from '../config';
import * as firebase from 'firebase';

export const CONFIGURE = '@@CMS/CONFIGURE';

export const configure = (config: Config) => {
  return action(CONFIGURE, config);
};
