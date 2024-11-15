import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Ubicaciones } from '../../interface/Ubicaciones';
import { GET_ALL_LOCATION } from '../../utilities/domains/ubicaciones/ubicaciones_URls';

@Injectable({
  providedIn: 'root'
})
export class UbicacionesService {

  constructor(private http:HttpClient) { }
  
  public getAllLocation(): Observable<Ubicaciones[]> {
    return this.http.get<Ubicaciones[]>(GET_ALL_LOCATION);
  }

}
