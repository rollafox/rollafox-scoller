import { Routes } from '@angular/router';
import { AboutComponent } from '@pages/about/about.component';
import { ContactComponent } from '@pages/contact/contact.component';
import { LandingComponent } from '@pages/landing/landing.component';
import { NotFoundComponent } from '@pages/not-found/not-found.component';

export const routes: Routes = [
  {
    path: '',
    component: LandingComponent,
    pathMatch: 'full'
  },
  {
    path: 'about',
    component: AboutComponent,
    data: { state: 'about' }
  },
  {
    path: 'contact',
    component: ContactComponent,
    data: { state: 'footer' }
  },
  {
    path: '**',
    component: NotFoundComponent,
    data: { state: 'notFound' }
  },
];
