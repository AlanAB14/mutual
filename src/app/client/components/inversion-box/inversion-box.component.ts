import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'inversion-box',
  templateUrl: './inversion-box.component.html',
  styleUrls: ['./inversion-box.component.scss']
})
export class InversionBoxComponent {
  @Input() titulo!: string;
  @Input() caracteristicas!: string [];
  @Input() btnBlanco!: boolean;
  @Output() goToPrestamo = new EventEmitter<any>();


  enviarPresamo() {
    this.goToPrestamo.emit(this.titulo);
  }
}
