import { Routes, RouterModule } from "@angular/router";
import { LandingComponent } from "@pages/landing/landing.component";
import { ProjectsComponent } from "@pages/projects/projects.component";
import { AboutComponent } from "@pages/about/about.component";
import { NotFoundComponent } from "@pages/not-found/not-found.component";
import { FooterComponent } from "@app/components/footer/footer.component";

const routes: Routes = [
    {
        path: '',
        component: LandingComponent,
        data: { state: '' }, pathMatch: 'full'
    },
    {
        path: 'projects',
        component: ProjectsComponent,
        data: { state: 'project' }, pathMatch: 'full'
    },
    {
        path: 'about',
        component: AboutComponent,
        data: { state: 'about' }, pathMatch: 'full'
    },
    {
        path: 'end-note',
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