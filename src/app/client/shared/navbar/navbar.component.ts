import { Component } from '@angular/core';

interface ItemMenu {
  path: string;
  text: string;
}

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {

  items: ItemMenu[] = [
    {
      path: 'nosotros',
      text: '¿Quiénes somos?'
    },
    {
      path: 'servicios',
      text: 'Servicios'
    },
    {
      path: 'ayuda',
      text: 'Ayuda y Seguridad'
    },
    {
      path: 'formulario',
      text: 'Formulario'
    }
  ]

  selectedItem: string | null = null;

  selectItem(item: string): void {
    this.selectedItem = item;
  }
  
}
