import { initFederation } from '@angular-architects/native-federation';

initFederation('federation.manifest.json')
  .catch(err => console.error(err))
  .then(() => import('./app/app.config'))
  .then(m => m.bootstrapApp())
  .catch(err => console.error(err));