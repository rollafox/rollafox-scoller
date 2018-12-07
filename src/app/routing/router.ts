import { RouterModule, Routes } from '@angular/router';
import { AboutComponent } from '@pages/about/about.component';
import { ContactComponent } from '@pages/contact/contact.component';
import { LandingComponent } from '@pages/landing/landing.component';
import { NotFoundComponent } from '@pages/not-found/not-found.component';
import { ProjectsComponent } from '@pages/projects/projects.component';
import { TrackerComponent } from '@pages/projects/tracker/tracker.component';
import { HugeTelecomComponent } from '@pages/projects/huge-telecom/huge-telecom.component';
import { FrigginCoffeeComponent } from '@pages/projects/friggin-coffee/friggin-coffee.component';
import { DvtInternalComponent } from '@pages/projects/dvt-internal/dvt-internal.component';

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
