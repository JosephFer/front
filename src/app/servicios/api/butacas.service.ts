import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API_DELETE_BUTACAS, API_GET_BUTACAS, API_POST_BUTACAS, API_UPDATE_BUTACAS } from '../../utilities/domains/URLsButacas';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ButacasService {
  public urlButacasGet: string = API_GET_BUTACAS;
  public urlButacasPost: string = API_POST_BUTACAS;
  public urlButacasDelete: string = API_DELETE_BUTACAS;
  public urlButacasUpdate: string = API_UPDATE_BUTACAS;

  constructor(private http:HttpClient) { 
    console.log("Servicio de butacas funcionando");
  }

  public getButacas(page:number, tamPag:number): Observable<any>{
    return this.http.get<any>(`${this.urlButacasGet}?tamPag=${tamPag}&page=${page}`);
  }

  public postButacas(nuevaComida:any):Observable<any>{
    return this.http.post<any>(`${this.urlButacasPost}`, nuevaComida);
  }

  public deleteButacas(id:string): Observable<any>{
     return this.http.delete<any>(`${this.urlButacasDelete}/${id}`);
  }

  public updateButacas(id:string, nuevaComida:any): Observable<any>{
    return this.http.put<any>(`${this.urlButacasUpdate}/${id}`, nuevaComida);
  }

}
