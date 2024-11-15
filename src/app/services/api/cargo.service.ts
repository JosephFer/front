import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Cargos } from '../../interface/Cargos';
import { GET_ALL_CARGOS, GET_CARGOS_PAGE } from '../../utilities/domains/cargo/cargo_URLs';

@Injectable({
  providedIn: 'root'
})
export class CargoService {

  constructor(private http:HttpClient){}

  public getAllCargos(): Observable<Cargos[]> {
    return this.http.get<Cargos[]>(GET_ALL_CARGOS);
  }


  public getPaginationCargos(page: number, size: number): Observable<Cargos[]> {
    return this.http.get<Cargos[]>(
      GET_CARGOS_PAGE + `?page=${page}&limit=${size}`
    );
  }
}
