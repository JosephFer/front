import { Injectable } from '@angular/core';
import { API_GET_SALA, API_GET_SALA_BY_CINE } from '../../utilities/domains/URLsCines';
import { HttpClient, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';

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
    return this.http.get<any>(this.urlSalas).pipe(
      catchError(this.handleError)
    );
  }
  public getSalasByCine(idCine: number): Observable<any>{
    return this.http.get<any>(this.urlSalasByCine + idCine);
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
