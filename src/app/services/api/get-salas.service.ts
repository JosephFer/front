import { Injectable } from '@angular/core';
import { API_GET_SALA, API_GET_SALA_BY_CINE } from '../../utilities/domains/URLs';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GetSalasService {

  public urlSalas: string = API_GET_SALA;
  public urlSalasByCine: string = API_GET_SALA_BY_CINE;

  constructor(private http:HttpClient) {
    console.log("Servicio de sala Funcionando");
  }

  public getSalas(): Observable<any>{
    return this.http.get<any>(this.urlSalas);
  }
  public getSalasByCine(idCine: number): Observable<any>{
    return this.http.get<any>(this.urlSalasByCine + idCine);
  }
}
