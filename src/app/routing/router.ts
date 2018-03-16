<<<<<<< HEAD
import { RouterModule, Routes } from '@angular/router';
import { FooterComponent } from '@app/components/footer/footer.component';
import { AboutComponent } from '@pages/about/about.component';
import { LandingComponent } from '@pages/landing/landing.component';
import { NotFoundComponent } from '@pages/not-found/not-found.component';
import { ProjectsComponent } from '@pages/projects/projects.component';
=======
import { Routes, RouterModule } from "@angular/router";
import { LandingComponent } from "@pages/landing/landing.component";
import { ProjectsComponent } from "@pages/projects/projects.component";
import { AboutComponent } from "@pages/about/about.component";
import { NotFoundComponent } from "@pages/not-found/not-found.component";
import { FooterComponent } from "@app/components/footer/footer.component";
>>>>>>> 8a335c3383af6305be8e58261a70822122a3a0ae

const routes: Routes = [
    {
        path: '',
        component: LandingComponent,
        data: { state: '' }, pathMatch: 'full'
    },
    {
<<<<<<< HEAD
        path: 'skills',
=======
        path: 'projects',
>>>>>>> 8a335c3383af6305be8e58261a70822122a3a0ae
        component: ProjectsComponent,
        data: { state: 'project' }, pathMatch: 'full'
    },
    {
        path: 'about',
        component: AboutComponent,
        data: { state: 'about' }, pathMatch: 'full'
    },
    {
<<<<<<< HEAD
        path: 'contact',
        component: FooterComponent,
        data: { state: 'footer' },
=======
        path: 'end-note',
        component: FooterComponent,
        data: { state: 'footer' }, 
>>>>>>> 8a335c3383af6305be8e58261a70822122a3a0ae
        pathMatch: 'full'
    },
    {
        path: '**',
        component: NotFoundComponent,
        data: { state: 'notFound' }, pathMatch: 'full'
    },
];

<<<<<<< HEAD
export const routing = RouterModule.forRoot(routes, { useHash: true });
=======
export const routing = RouterModule.forRoot(routes, { useHash: true });
>>>>>>> 8a335c3383af6305be8e58261a70822122a3a0ae
