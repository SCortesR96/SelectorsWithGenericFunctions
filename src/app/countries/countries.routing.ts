import { SelectorPageComponent } from './pages/selector-page/selector-page.component';
import { Routes } from '@angular/router';

export const countryRoutes: Routes = [
  {
    path: '',
    children: [
      { path: '', component: SelectorPageComponent },
      { path: '**', redirectTo: 'selector' },
    ],
  },
];
