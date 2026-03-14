import { Route } from '@angular/router';
import { loadRemoteModule } from '@angular-architects/native-federation';

export const appRoutes: Route[] = [
  {
    path: '',
    redirectTo: 'twin',
    pathMatch: 'full',
  },
  {
    path: 'twin',
    loadChildren: () =>
      loadRemoteModule('digital-twin', './Routes').then((m) => m.appRoutes),
  },
  {
    path: 'alarms',
    loadChildren: () =>
      loadRemoteModule('alarms', './Routes').then((m) => m.appRoutes),
  },
  {
    path: 'analytics',
    loadChildren: () =>
      loadRemoteModule('analytics', './Routes').then((m) => m.appRoutes),
  },
  {
    path: 'admin',
    loadChildren: () =>
      loadRemoteModule('admin', './Routes').then((m) => m.appRoutes),
  },
  {
    path: 'quantum',
    loadChildren: () =>
      loadRemoteModule('quantum', './Routes').then((m) => m.appRoutes),
  },
  {
    path: '**',
    redirectTo: 'twin',
  },
];