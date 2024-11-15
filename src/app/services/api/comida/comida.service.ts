import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Menu } from '../../../interface/menu';
import { CREATE_COMIDA, DELETE_COMIDA, GET_ALL_COMIDA, UPDATE_COMIDA } from '../../../utilities/domains/comida/COMIDA_URL';

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

  updateComida(comida_p : Menu) : Observable<any> {
    return this.http.put(UPDATE_COMIDA, comida_p);
  }

  deleteMenu(idMenu : number) : Observable <any> {
    
    const url = DELETE_COMIDA + idMenu;
    const options = {
      headers: new HttpHeaders({
        'Authorization': 'Bearer tuToken', 
        'Content-Type': 'application/json'
      }),
      observe: 'body' as const,
      responseType: 'json' as const
    };

    return this.http.delete(url, options);
  }
}
