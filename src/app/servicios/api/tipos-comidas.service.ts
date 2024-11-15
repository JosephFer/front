import { Injectable } from '@angular/core';
import { API_DELETE_TIPOS_COMIDAS, API_GET_TIPOS_COMIDAS, API_POST_TIPOS_COMIDAS, API_UPDATE_TIPOS_COMIDAS } from '../../utilities/domains/URLsTiposComidas';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TiposComidasService {

  public urlTiposComidasGet: string = API_GET_TIPOS_COMIDAS;
  public urlTiposComidasPost: string = API_POST_TIPOS_COMIDAS;
  public urlTiposComidasDelete: string = API_DELETE_TIPOS_COMIDAS;
  public urlTiposComidasUpdate: string = API_UPDATE_TIPOS_COMIDAS;

  constructor(private http:HttpClient) {
    console.log("Servicios de tipos comidas funcionando");
   }

   public getTiposComidas(page:number, tamPag:number): Observable<any>{
    return this.http.get<any>(`${this.urlTiposComidasGet}?tamPag=${tamPag}&page=${page}`);
  }

  public postTiposComidas(nuevoTipoComida:any):Observable<any>{
    return this.http.post<any>(this.urlTiposComidasPost, nuevoTipoComida);
  }

  public delete(id:string):Observable<any>{
    return this.http.delete<any>(`${this.urlTiposComidasDelete}/${id}`);
  }

  public update(nuevoTipoComida:any){
    return this.http.put<any>(this.urlTiposComidasUpdate, nuevoTipoComida);
  }

 
}
