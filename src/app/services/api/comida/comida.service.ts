import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Menu } from '../../../interface/menu';
import { CREATE_COMIDA, GET_ALL_COMIDA } from '../../../utilities/domains/comida/COMIDA_URL';

@Injectable({
  providedIn: 'root'
})
export class ComidaService {

  constructor(private http: HttpClient) { }

  getAllComida(): Observable<Menu[]> {
    const r = this.http.get<Menu[]>(GET_ALL_COMIDA);
    console.log(r);
    return r;
  }

  addComida(comida_p : Menu): Observable<any> {
    return this.http.post(CREATE_COMIDA, comida_p);
  }
}
