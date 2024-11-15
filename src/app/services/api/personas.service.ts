import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Personas } from '../../interface/Personas';
import { CREATE_PERSONS, GET_ALL_PERSONS, GET_PERSONS_PAGE } from '../../utilities/domains/persons/PERSONS_URls';

@Injectable({
  providedIn: 'root'
})
export class PersonasService {

  constructor(private http:HttpClient){}

  public getAllPersons(): Observable<Personas[]> {
    return this.http.get<Personas[]>(GET_ALL_PERSONS);
  }


  public getPaginationPersons(page: number, size: number): Observable<Personas[]> {
    return this.http.get<Personas[]>(
      GET_PERSONS_PAGE + `?page=${page}&limit=${size}`
    );
  }

  public addPerson(persona: Personas): Observable<Personas> {
    return this.http.post<Personas>(CREATE_PERSONS, persona);
  }
}
