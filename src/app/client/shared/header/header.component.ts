import { AfterViewInit, Component, ElementRef, OnInit, Renderer2 } from '@angular/core';
import { HeaderService } from '../../services/header.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, AfterViewInit {
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

  constructor(private headerService: HeaderService,
    private elRef: ElementRef,
    private renderer: Renderer2
  ) { }

  ngOnInit(): void {
    this.headerService.getHeaders()
      .subscribe((header: any) => {
        this.header = header
        this.cargandoData = false;
        console.log(this.header)
      })
      
  }

  cargoImagen() {
    this.cargandoData = false;
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      const textFinanzasImg = document.querySelector('.text-finanzas-img') as HTMLElement;
      if (textFinanzasImg) {
        textFinanzasImg.classList.add('animacion-finanzas');
      }
    }, 1200);
    // this.adjustFontSize();
    // const headerBox = this.elRef.nativeElement.querySelector('.header__box');
    // const resizeObserver = new ResizeObserver(() => {
    //   this.adjustFontSize();
    // });
  
    // if (headerBox) {
    //   resizeObserver.observe(headerBox);
    // }
  }

  // adjustFontSize() {
  //   const headerBox = this.elRef.nativeElement.querySelector('.header__box');
  //   const img = this.elRef.nativeElement.querySelector('.header-title-admin img');
    
  //   if (headerBox) {
  //     const boxWidth = headerBox.offsetWidth;
  //     const boxHeight = headerBox.offsetHeight;
  //     const titleFontSize = boxWidth * 0.05; // 5% del ancho del header-box
  //     const imgWidth = boxWidth * .035;

  //     if (img) {
  //       this.renderer.setStyle(img, 'width', `${imgWidth}px`);
  //       this.renderer.setStyle(img, 'height', `auto`);
  //       this.renderer.setStyle(img, 'display', `inline`);
  //       this.renderer.setStyle(img, 'margin-bottom', `${ titleFontSize * 0.5 }px`);
  //     }

  //     headerBox.style.setProperty('--header-title-font-size', `${titleFontSize}px`);
  //     headerBox.style.setProperty('--header-margin', `${boxHeight * .07}px`);
  //   }
  // }



}
