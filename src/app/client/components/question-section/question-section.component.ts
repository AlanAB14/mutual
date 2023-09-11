import { Component, Input } from '@angular/core';

@Component({
  selector: 'question-section',
  templateUrl: './question-section.component.html',
  styleUrls: ['./question-section.component.scss']
})
export class QuestionSectionComponent {
  @Input() questions!: any[];
}
