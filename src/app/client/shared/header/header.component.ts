import { Component, OnInit } from '@angular/core';
import { HeaderService } from '../../services/header.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  header: any[] = [];
  cargandoData: boolean = true;

  slideConfig = {
    "enabled": true,
    "slidesToShow": 1,
    "slidesToScroll": 1,
    "autoplay": true,
    "autoplaySpeed": 4000,
    "arrows": false,
    "pauseOnHover": false
  };


  breakpoint(e: any) {
    console.log('breakpoint');
  }

  afterChange(e: any) {
  }

  beforeChange(e: any) {
  }

  constructor(private headerService: HeaderService) { }

  ngOnInit(): void {
    this.headerService.getHeaders()
      .subscribe((header: any) => {
        this.header = header
        console.log(this.header)
      })
  }



}
