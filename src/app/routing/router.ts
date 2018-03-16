import { RouterModule, Routes } from '@angular/router';
import { FooterComponent } from '@app/components/footer/footer.component';
import { AboutComponent } from '@pages/about/about.component';
import { LandingComponent } from '@pages/landing/landing.component';
import { NotFoundComponent } from '@pages/not-found/not-found.component';
import { ProjectsComponent } from '@pages/projects/projects.component';

const routes: Routes = [
    {
        path: '',
        component: LandingComponent,
        data: { state: '' }, pathMatch: 'full'
    },
    {
        path: 'skills',
        component: ProjectsComponent,
        data: { state: 'project' }, pathMatch: 'full'
    },
    {
        path: 'about',
        component: AboutComponent,
        data: { state: 'about' }, pathMatch: 'full'
    },
    {
        path: 'contact',
        component: FooterComponent,
        data: { state: 'footer' },
        pathMatch: 'full'
    },
    {
        path: '**',
        component: NotFoundComponent,
        data: { state: 'notFound' }, pathMatch: 'full'
    },
];

export const routing = RouterModule.forRoot(routes, { useHash: true });
