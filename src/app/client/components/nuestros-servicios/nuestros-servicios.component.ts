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
  cargandoData: boolean = true;

  slideConfig = { 
    "slidesToShow": 4, 
    "slidesToScroll": 1, 
    "autoplay": true, 
    "arrows": false,
    "pauseOnHover": false,
    "responsive" : [
      {
        "breakpoint": 1400,
        "settings": {
          "slidesToShow": 3, 
          "slidesToScroll": 1, 
        }
      },
      {
        "breakpoint": 1200,
        "settings": {
          "slidesToShow": 2, 
          "slidesToScroll": 1, 
        }
      },
      {
        "breakpoint": 790,
        "settings": {
          "slidesToShow": 1, 
          "slidesToScroll": 1, 
        }
      }
    ]
  };


  breakpoint(e: any) {
    console.log('breakpoint');
  }

  afterChange(e: any) {
  }

  beforeChange(e: any) {
  }

  constructor(private serviciosService: ServiciosService) { }

  ngOnInit(): void {
    this.serviciosService.getServicios()
      .subscribe((servicios) => {
        this.servicios = servicios
        console.log(servicios)
        this.cargandoData = false;
      })
  }

}
