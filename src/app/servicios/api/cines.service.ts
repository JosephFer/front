import { Injectable } from '@angular/core';
import { API_CREATE_CINE, API_DELETE_CINE, API_GET_CINE, API_UPDATE_CINE } from '../../utilities/domains/URLsCines';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GetCinesService {


  public urlCinesGet: string = API_GET_CINE;
  public urlCinesPost: string = API_CREATE_CINE;
  public urlCinesDelete: string = API_DELETE_CINE;
  public urlCinesUpdate: string = API_UPDATE_CINE;

  constructor(private http:HttpClient) {
    console.log("Servicios de cines funcionando");
   }
   
   public getCines(page:number, tamPag:number): Observable<any>{
    return this.http.get<any>(`${this.urlCinesGet}?tamPag=${tamPag}&page=${page}`).pipe(
      catchError(this.handleError)
    );
  }

  public postCines(nuevoEstudiante:any){

  }

  public updateCines(id: string, nuevoEstudiante:any){

  }

  public deleteCines(id: string){

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
