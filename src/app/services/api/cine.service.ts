import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Cines } from '../../interface/Cines';
import { Observable } from 'rxjs';
import { GET_ALL_CINES } from '../../utilities/domains/cine/cines_URLs';

@Injectable({
  providedIn: 'root'
})
export class CineService {

  constructor(private http:HttpClient) { }

  public getAllCinema(): Observable<Cines[]> {
    return this.http.get<Cines[]>(GET_ALL_CINES);
  }

}
