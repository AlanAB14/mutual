import { Component, Input } from '@angular/core';

@Component({
  selector: 'testimonio',
  templateUrl: './testimonio.component.html',
  styleUrls: ['./testimonio.component.scss']
})
export class TestimonioComponent {
  @Input() titulo!: string;
  @Input() texto!: string;
  @Input() nombre!: string;
  @Input() imagen!: string;
  @Input() trabajo!: string;

}
