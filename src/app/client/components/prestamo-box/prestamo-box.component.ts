import { Component, ElementRef, ViewChild, AfterViewInit, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'prestamo-box',
  templateUrl: './prestamo-box.component.html',
  styleUrls: ['./prestamo-box.component.scss']
})
export class PrestamoBoxComponent implements AfterViewInit {
  @ViewChild('textoRender') textoElement!: ElementRef;
  @ViewChild('firstWord') firstWord!: ElementRef;
  @ViewChild('restOfText') restOfText!: ElementRef;
  
  @Input() titulo: string = '';
  @Input() texto: string = '';
  @Input() caracteristicas: string [] = [];
  @Input() selected: boolean = true;
  @Input() icon: string = '';
  @Input() url: string = '';

  constructor( private router: Router ) { }

  ngAfterViewInit() {
    this.separarTexto();
  }

  separarTexto() {
    const headerTitleElement = this.textoElement.nativeElement;
    const firstWordElement = this.firstWord.nativeElement;
    const restOfTextElement = this.restOfText.nativeElement;

    const textoCompleto = headerTitleElement.innerText;
    const palabras = textoCompleto.split(' ');

    if (palabras.length >= 2) {
      firstWordElement.textContent = palabras[0];
      restOfTextElement.textContent = palabras.slice(1).join(' ');
    } else {
      firstWordElement.textContent = textoCompleto;
    }
  }

  redireccionar(url: string) {
    console.log(url)
    this.router.navigate(['/servicios', url]);
  }
}
