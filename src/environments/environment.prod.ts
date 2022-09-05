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
  production: true,
  appSettings: SETTINGS,
  googleMapApiKey: 'AIzaSyBSvo0x8v3C6aFWcSi2zooOC9tqGCOqCj4',
  version: npm.version
};
