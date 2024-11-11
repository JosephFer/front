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

   public getComidas(page:number, tamPag:number): Observable<any>{
    return this.http.get<any>(`${this.urlTiposComidasGet}?tamPag=${tamPag}&page=${page}`).pipe(
      catchError(this.handleError)
    );
  }

  public postComidas(nuevoTipoComida:any){

  }

  public delete(id:string){

  }

  public update(id:string, nuevoTipoComida:any){

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
