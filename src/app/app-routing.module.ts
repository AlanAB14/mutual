import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClientLayoutComponent } from './client/layout/layout.component';
import { AdminLayoutComponent } from './admin/layout/layout.component';
import { AuthGuard } from './core/guards/auth.guard';
import { LoginComponent } from './auth/login/login.component';
import { NoAuthGuard } from './core/guards/no-auth.guard';

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [NoAuthGuard]
  },
  {
    path: 'admin',
    loadChildren: () => import('./admin/admin.module').then( m => m.AdminModule ),
    component: AdminLayoutComponent,
    canActivate: [AuthGuard]
  },
  {
    path: '',
    loadChildren: () => import('./client/client.module').then( m => m.ClientModule ),
    component: ClientLayoutComponent
  },
  {
    path: '**',
    redirectTo: ''
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
