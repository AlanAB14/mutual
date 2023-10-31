import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ServiciosService } from '../../services/servicios.service';
import { NavigationEnd, Router } from '@angular/router';

interface ItemMenu {
  path: string;
  text: string;
}

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  isExpanded: boolean = false;
  isExpandedSub: boolean = false;
  @ViewChild('elementItem') elementItem!: ElementRef;
  constructor(private serviciosService: ServiciosService,
              private router: Router) { }

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
      text: 'Contacto'
    }
  ];

  servicios: any;

  selectedItem: string | null = null;

  isClassVisible = false;
  esClaseHija = false;

  ngOnInit(): void {
    this.serviciosService.getServicios()
      .subscribe(servicios => {
        this.servicios = servicios.map(servicio => ({
          path: servicio.url,
          titulo: servicio.titulo
        }))
      })


    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        const currentUrl = this.router.url;
        const tieneServicios = currentUrl.includes('servicios');

        if (tieneServicios) {
          this.elementItem.nativeElement.classList.add('selected')
        } else {
          this.elementItem.nativeElement.classList.remove('selected')
        }
      }
    });
  }

  selectItem(item: string): void {
    this.selectedItem = item;
  }

  toggleClass(path: any) {
    if (path === 'servicios') {
      this.isClassVisible = !this.isClassVisible;
    } else {
      this.isClassVisible = false;
    }
  }

  toggleMenu() {
    this.isExpanded = !this.isExpanded;
    this.isExpandedSub = false;
  }

  expandSubmenu() {
    this.isExpandedSub = !this.isExpandedSub
    console.log(this.isExpandedSub)
  }

  goToRoute(ruta: string) {
    this.router.navigate([ruta])
    this.isExpanded = false;
  }

}
