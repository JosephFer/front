import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Cines } from '../../interface/Cines';
import { Observable } from 'rxjs';
import { CREATE_CINES, DELETE_CINES, GET_ALL_CINES, GET_CINES_PAGE, UPDATE_CINES } from '../../utilities/domains/cine/cines_URLs';

@Injectable({
  providedIn: 'root'
})
export class CineService {

  constructor(private http:HttpClient) {
    console.log("Servicios de cines funcionando");
   }

  public getAllCinema(): Observable<Cines[]> {
    return this.http.get<Cines[]>(GET_ALL_CINES);
  }
  
  public getPaginationCinema(page: number, size: number): Observable<Cines[]>{
    return this.http.get<Cines[]>(
      GET_CINES_PAGE + `?page=${page}&limit=${size}`)
  }

  public addCinema(nuevoCine: Cines): Observable<Cines>{
    return this.http.post<Cines>(CREATE_CINES, nuevoCine);
  }

  public updateCinema(cine: Cines): Observable<Cines>{
    return this.http.put<Cines>(UPDATE_CINES, cine);
  }

  public deleteCinema(id: number):Observable<Cines>{
    return this.http.delete<Cines>(`${DELETE_CINES}/${id}`);
  }

}
