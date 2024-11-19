import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Funcion } from '../../../interface/Function';
import { Sala } from '../../../interface/Sala';
import { Horario } from '../../../interface/Horario';
import { DELETE_FUNCTION, GET_ALL_FUNCTIONS, GET_ALL_ROOMS, GET_ALL_SCHEDULES, UPDATE_FUNCTION } from '../../../utilities/domains/functions/functionsURL';


@Injectable({
  providedIn: 'root'
})
export class FunctionService {
  

  deleteFunction(id: number): Observable<any> {
    return this.http.delete(`${DELETE_FUNCTION}/${id}`);
  }



  constructor(private http: HttpClient) { }

  getFunciones(): Observable<Funcion[]> {
    return this.http.get<Funcion[]>(GET_ALL_FUNCTIONS);
  }

  getSalas(): Observable<Sala[]> {
    return this.http.get<Sala[]>(GET_ALL_ROOMS);
  }

  getHorarios(): Observable<Horario[]> {
    return this.http.get<Horario[]>(GET_ALL_SCHEDULES);
  }

  updateFunction(funcion: Funcion): Observable<Funcion> {
    return this.http.put<Funcion>(UPDATE_FUNCTION, funcion);
  }
}