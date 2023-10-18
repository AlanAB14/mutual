import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  })
}

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

  addQuestion(body: any) {
    return this.http.post(`${ this._url }/preguntas`, body)
  }

  updateQuestion( id: number, body: any ) {
    return this.http.patch(`${ this._url }/preguntas/${ id }`, body)
  }

  removeQuestion( id: number ) {
    return this.http.delete(`${ this._url }/preguntas/${ id }`)
  }

  updateCategoria(id: number, nombre: string) {
    const body = {
      nombre
    }

    return this.http.patch<any>(`${ this._url }/categoriasPreguntas/${ id }`, body, httpOptions)
  }

  setCategoria(nombre: string) {
    const body = {
      nombre
    }

    return this.http.post<any>(`${ this._url }/categoriasPreguntas`, body, httpOptions)
  }

  deleteCategoria( id: number ) {
    return this.http.delete(`${ this._url }/categoriasPreguntas/${ id }`)
  }
}
