import { Component, OnInit } from '@angular/core';
import { QuestionsService } from '../../services/questions.service';


@Component({
  templateUrl: './ayuda.component.html',
  styleUrls: ['./ayuda.component.scss']
})


export class AyudaComponent implements OnInit {
  catQuestions!: any[];
  isSelected!: number;
  catQuestionsSelected: any = [];

  cargandoData: boolean = true;

  constructor(private questionService: QuestionsService) { }

  ngOnInit(): void {
    this.questionService.getCategoriesQuestions()
      .subscribe(questions => {
        this.catQuestions = questions
        this.toggleClass(this.catQuestions[0].id)
      })

  }

  toggleClass(tipo: number): void {
    if (this.isSelected !== tipo) {
      this.isSelected = tipo;
      this.getQuestionsPerCategory(tipo)
    }
  }

  getQuestionsPerCategory(category: number) {
    this.questionService.getQuestions(category)
      .subscribe( questions => {
        this.catQuestionsSelected = questions
        console.log(this.catQuestionsSelected)
      })
    this.cargandoData = false;
  }

}
