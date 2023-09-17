import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class QuestionsService {

  private _url = environment.apiBase

  constructor( private http: HttpClient ) { }

  getCategoriesQuestions(): Observable<any>{
    return this.http.get<any>(`${ this._url }/categoriasPreguntas`)
  }

  getQuestions(id: number) {

    return this.http.get(`${ this._url }/preguntas/${ id }`)
  }
}
