import { Component, OnInit } from '@angular/core';
import { ServiciosService } from '../../services/servicios.service';
import { Servicio } from 'src/app/core/interfaces/servicio.interface';

@Component({
  selector: 'nuestros-servicios',
  templateUrl: './nuestros-servicios.component.html',
  styleUrls: ['./nuestros-servicios.component.scss']
})
export class NuestrosServiciosComponent implements OnInit {
  servicios: Servicio[] = [];

  slideConfig = { "slidesToShow": 4, "slidesToScroll": 1, "autoplay": true };

  slickInit(e: any) {
    console.log('slick initialized');
  }

  breakpoint(e: any) {
    console.log('breakpoint');
  }

  afterChange(e: any) {
    console.log('afterChange');
  }

  beforeChange(e: any) {
    console.log('beforeChange');
  }

  constructor(private serviciosService: ServiciosService) { }

  ngOnInit(): void {
    this.serviciosService.getServicios()
      .subscribe((servicios) => {
        this.servicios = servicios
      })
  }

}
