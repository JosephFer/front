import { Injectable } from '@angular/core';
import { API_DELETE_COMIDAS, API_GET_COMIDAS, API_POST_COMIDAS, API_UPDATE_COMIDAS } from '../../utilities/domains/URLsComidas';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ComidasService {

  public urlComidasGet: string = API_GET_COMIDAS;
  public urlComidasPost: string = API_POST_COMIDAS;
  public urlComidasDelete: string = API_DELETE_COMIDAS;
  public urlComidasUpdate: string = API_UPDATE_COMIDAS;

  constructor(private http:HttpClient) { 
    console.log("Servicio de comidas funcionando");
  }

  public getComidas(page:number, tamPag:number): Observable<any>{
    return this.http.get<any>(`${this.urlComidasGet}?tamPag=${tamPag}&page=${page}`).pipe(
      catchError(this.handleError)
    );
  }

  public postComidas(nuevaComida:any):Observable<any>{
    return this.http.post<any>(`${this.urlComidasPost}`, nuevaComida).pipe(
      catchError(this.handleError)
    );
  }

  public deleteComidas(id:string): Observable<any>{
     return this.http.delete<any>(`${this.urlComidasDelete}/${id}`);
  }

  public updateComidas(id:string, nuevaComida:any): Observable<any>{
    return this.http.put<any>(`${this.urlComidasUpdate}/${id}`, nuevaComida).pipe(
      catchError(this.handleError)
    );
  }


  private handleError(error:HttpErrorResponse): Observable<never>{
    let errorMessage = 'Ocurrio un error desconocido.';

    if(error.error instanceof ErrorEvent){
      errorMessage = `Error: ${error.error.message}`
    }else{
      errorMessage = `Código de el error: ${error.status}\nMensaje: ${error.message}`
    }
    console.error(errorMessage);

    return throwError(()=> new Error(errorMessage));
  }
}
