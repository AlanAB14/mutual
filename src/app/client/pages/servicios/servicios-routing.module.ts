import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ServiciosComponent } from './servicios.component';

let dynamicRoutes: Routes = [
  {
    path: 'prestamos-personales',
    component: ServiciosComponent
  },
  {
    path: 'prestamos-prendarios',
    component: ServiciosComponent
  },
  {
    path: 'prestamos-agropecuarios',
    component: ServiciosComponent
  },
  {
    path: 'prestamos-empresariales',
    component: ServiciosComponent
  },
  {
    path: 'prestamos-empleados-publicos',
    component: ServiciosComponent
  },
  // {
  //   path: 'recaudaciones',
  //   component: ServiciosComponent
  // },
  // {
  //   path: 'consultorio-juridico',
  //   component: ServiciosComponent
  // },
  {
    path: 'inversiones',
    component: ServiciosComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(dynamicRoutes)],
  exports: [RouterModule]
})
export class ServiciosRoutingModule {


}
