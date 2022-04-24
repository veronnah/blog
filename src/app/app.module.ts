import {NgModule, Provider} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {SharedModule} from "./shared/shared.module";
import {MatButtonModule} from "@angular/material/button";
import {ServiceWorkerModule} from '@angular/service-worker';
import {BrowserAnimationsModule, NoopAnimationsModule} from "@angular/platform-browser/animations";

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {MainLayoutComponent} from './shared/components/main-layout/main-layout.component';
import {HomePageComponent} from './home-page/home-page.component';
import {PostPageComponent} from './post-page/post-page.component';
import {PostComponent} from './shared/components/post/post.component';
import {NotifierComponent} from "./admin/shared/components/notifier/notifier.component";
import {AboutPageComponent} from './about-page/about-page.component';
import {ContactPageComponent} from './contact-page/contact-page.component';
import {NotfoundPageComponent} from './notfound-page/notfound-page.component';

import {HTTP_INTERCEPTORS} from "@angular/common/http";
import {AuthInterceptor} from "./shared/auth.interceptor";

import {registerLocaleData} from "@angular/common";
import plLocale from "@angular/common/locales/pl";
import {environment} from '../environments/environment';
import {ReactiveFormsModule} from "@angular/forms";

registerLocaleData(plLocale, 'pl');

const INTERCEPTOR_PROVIDER: Provider = {
  provide: HTTP_INTERCEPTORS,
  multi: true,
  useClass: AuthInterceptor,
}

@NgModule({
  declarations: [
    AppComponent,
    MainLayoutComponent,
    HomePageComponent,
    PostPageComponent,
    PostComponent,
    NotifierComponent,
    AboutPageComponent,
    NotfoundPageComponent,
    ContactPageComponent,
  ],
    imports: [
        BrowserModule,
        NoopAnimationsModule,
        BrowserAnimationsModule,
        AppRoutingModule,
        SharedModule,
        MatButtonModule,
        ServiceWorkerModule.register('ngsw-worker.js', {
            enabled: environment.production,
            // Register the ServiceWorker as soon as the application is stable
            // or after 30 seconds (whichever comes first).
            registrationStrategy: 'registerWhenStable:30000'
        }),
        ReactiveFormsModule,
    ],
  providers: [INTERCEPTOR_PROVIDER],
  bootstrap: [AppComponent]
})
export class AppModule {
}
