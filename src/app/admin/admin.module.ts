import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from "@angular/router";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {SharedModule} from "../shared/shared.module";

import {AdminLayoutComponent} from './shared/components/admin-layout/admin-layout.component';
import {LoginPageComponent} from './login-page/login-page.component';
import {DashboardPageComponent} from './dashboard-page/dashboard-page.component';
import {CreateEditPageComponent} from './create-edit-page/create-edit-page.component';

import {AuthGuard} from "./shared/services/auth.guard";

import {SearchPipe} from "./shared/pipes/search.pipe";
import {AlertComponent} from './shared/components/alert/alert.component';

@NgModule({
  declarations: [
    AdminLayoutComponent,
    LoginPageComponent,
    DashboardPageComponent,
    CreateEditPageComponent,
    SearchPipe,
    AlertComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    RouterModule.forChild([
      {
        path: '', component: AdminLayoutComponent, children: [
          {path: '', redirectTo: '/admin/dashboard', pathMatch: 'full'},
          {path: 'login', component: LoginPageComponent},
          {path: 'dashboard', component: DashboardPageComponent, canActivate: [AuthGuard]},
          {path: 'create', component: CreateEditPageComponent, canActivate: [AuthGuard]},
          {path: 'post/:id/edit', component: CreateEditPageComponent, canActivate: [AuthGuard]},
        ]
      }
    ])
  ],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class AdminModule {
}
