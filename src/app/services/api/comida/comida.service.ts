import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Comida } from '../../../interface/comida';
import { CREATE_COMIDA, GET_ALL_COMIDA } from '../../../utilities/domains/comida/COMIDA_URL';

@Injectable({
  providedIn: 'root'
})
export class ComidaService {

  constructor(private http: HttpClient) { }

  getAllComida(): Observable<Comida[]> {
    const r = this.http.get<Comida[]>(GET_ALL_COMIDA);
    console.log(r);
    return r;
  }

  addComida(comida_p : Comida): Observable<any> {
    return this.http.post(CREATE_COMIDA, comida_p);
  }
}
