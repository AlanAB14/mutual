import { Component } from '@angular/core';

@Component({
  selector: 'app-sidebar-menu',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.scss']
})
export class SideBarComponent {
  public menuItems: any[] = [
    {
      texto: 'Editar Servicios',
      ruta: 'servicios',
      icon: 'fa fa-tag'
    },
    {
      texto: 'Gestionar Contenido',
      ruta: 'contenidos',
      icon: 'fa fa-image'
    },
    {
      texto: 'Estadísticas',
      ruta: 'estadisticas',
      icon: 'fa fa-bar-chart'
    }
  ]
}
