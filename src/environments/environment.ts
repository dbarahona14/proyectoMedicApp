// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

import { SETTINGS } from './settings';
import npm from '../../package.json';

export const environment = {
  firebase: {
    projectId: 'medicapp-eb9c7',
    appId: '1:108040964594:web:fd62592ef88001406a036b',
    storageBucket: 'medicapp-eb9c7.appspot.com',
    locationId: 'us-central',
    apiKey: 'AIzaSyDkG5n-DGMtSXdLbuu75MeKOBy-dByNGLc',
    authDomain: 'medicapp-eb9c7.firebaseapp.com',
    messagingSenderId: '108040964594',
  },
  production: false,
  appSettings: SETTINGS,
  googleMapApiKey: 'AIzaSyBSvo0x8v3C6aFWcSi2zooOC9tqGCOqCj4',
  version: npm.version,
};
