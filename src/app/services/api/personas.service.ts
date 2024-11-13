import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Personas } from '../../interface/Personas';
import { GET_ALL_PERSONS } from '../../utilities/domains/persons/PERSONS_URls';

@Injectable({
  providedIn: 'root'
})
export class PersonasService {

  constructor(private http:HttpClient){}

  public getAllPersons(): Observable<Personas[]> {
    return this.http.get<Personas[]>(GET_ALL_PERSONS);
  }
}
