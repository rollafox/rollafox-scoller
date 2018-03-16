import { isPlatformBrowser } from '@angular/common';
import { APP_ID, Inject, NgModule, PLATFORM_ID } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BigTitleComponent } from '@app/components/big-title/big-title.component';
import { FooterComponent } from '@app/components/footer/footer.component';
import { HeaderComponent } from '@app/components/header/header.component';
import { ScaleComponent } from '@app/components/scale/scale.component';
import { RoutingModule } from '@app/routing/routing.module';
import { AboutComponent } from '@pages/about/about.component';
import { LandingComponent } from '@pages/landing/landing.component';
import { NotFoundComponent } from '@pages/not-found/not-found.component';
import { ProjectsComponent } from '@pages/projects/projects.component';

import { AppComponent } from './app.component';


@NgModule({
    declarations: [
        AppComponent,
        AboutComponent,
        ProjectsComponent,
        BigTitleComponent,
        FooterComponent,
        HeaderComponent,
        LandingComponent,
        NotFoundComponent,
        ScaleComponent
    ],
    imports: [
        BrowserModule.withServerTransition({ appId: 'pmp' }),
        BrowserAnimationsModule,
        RoutingModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {
    constructor(
        @Inject(PLATFORM_ID) private platformId: Object,
        @Inject(APP_ID) private appId: string) {
        const platform = isPlatformBrowser(platformId) ?
            'on the server' : 'in the browser';
        console.log(`Running ${platform} with appId=${appId}`);
    }
}
