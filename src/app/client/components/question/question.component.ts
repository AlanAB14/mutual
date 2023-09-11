import { Component, Input } from '@angular/core';

@Component({
  selector: 'question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.scss']
})
export class QuestionComponent {

  @Input() question!: string;
  @Input() answer!: string;

  panelOpenState = false;

}
