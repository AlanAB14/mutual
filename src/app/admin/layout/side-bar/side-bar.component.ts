import { Component } from '@angular/core';

@Component({
  selector: 'app-sidebar-menu',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.scss']
})
export class SideBarComponent {
  public menuItems: any[] = [
    {
      texto: 'Editar Header',
      ruta: 'header',
      icon: 'fa fa-image'
    },
    {
      texto: 'Editar Servicios',
      ruta: 'servicios',
      icon: 'fa fa-tag'
    },
    {
      texto: 'Gestionar Preguntas',
      ruta: 'preguntas',
      icon: 'fa fa-question-circle'
    },
    {
      texto: 'Opiniones',
      ruta: 'opiniones',
      icon: 'fa fa-comments-o'
    },
    {
      texto: 'Nosotros',
      ruta: 'nosotros',
      icon: 'fa fa-building'
    },
    {
      texto: 'Usuarios',
      ruta: 'usuarios',
      icon: 'fa fa-user'
    },
    {
      texto: 'Préstamos',
      ruta: 'prestamos',
      icon: 'fa fa-info-circle'
    }
  ]
}
