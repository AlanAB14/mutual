import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClientLayoutComponent } from './client/layout/layout.component';
import { AdminLayoutComponent } from './admin/layout/layout.component';

const routes: Routes = [
  {
    path: 'admin',
    loadChildren: () => import('./admin/admin.module').then( m => m.AdminModule ),
    component: AdminLayoutComponent
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
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
