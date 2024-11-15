import { Injectable } from '@angular/core';
import { API_CREATE_CINE, API_DELETE_CINE, API_GET_CINE, API_UPDATE_CINE } from '../../utilities/domains/URLsCines';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CinesService {


  public urlCinesGet: string = API_GET_CINE;
  public urlCinesPost: string = API_CREATE_CINE;
  public urlCinesDelete: string = API_DELETE_CINE;
  public urlCinesUpdate: string = API_UPDATE_CINE;

  constructor(private http:HttpClient) {
    console.log("Servicios de cines funcionando");
   }
   
   public getCines(page:number, tamPag:number): Observable<any>{
    return this.http.get<any>(`${this.urlCinesGet}?tamPag=${tamPag}&page=${page}`);
    
  }

  public postCines(nuevoEstudiante:any): Observable<any>{
    return this.http.post<any>(`${this.urlCinesPost}`, nuevoEstudiante);
  }

  public updateCines(nuevoEstudiante:any): Observable<any>{
    return this.http.put<any>(`${this.urlCinesUpdate}`, nuevoEstudiante);
  }

  public deleteCines(id: string):Observable<any>{
    return this.http.delete<any>(`${this.urlCinesDelete}/${id}`);
  }

}
