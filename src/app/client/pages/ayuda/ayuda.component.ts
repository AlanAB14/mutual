import { Component, OnInit } from '@angular/core';
import { QuestionsService } from '../../services/questions.service';


@Component({
  templateUrl: './ayuda.component.html',
  styleUrls: ['./ayuda.component.scss']
})


export class AyudaComponent implements OnInit {
  questions!: any[];
  isSelected!: string;
  questionsSelected: any = [];

  constructor(private questionService: QuestionsService) { }

  ngOnInit(): void {
    this.questionService.getQuestions()
      .subscribe(questions => {
        this.questions = questions
        this.toggleClass('generales')
      })
  }

  toggleClass(tipo: string): void {
    console.log('ingresa')
    if (this.isSelected !== tipo) {
      this.isSelected = tipo;
      console.log(this.questions)
      const questions = this.questions.find(question => question.tipo === tipo)
      this.questionsSelected = questions.data
    }
  }

}
