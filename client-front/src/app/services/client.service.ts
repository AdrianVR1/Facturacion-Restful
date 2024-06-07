import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Client } from '../models/client';
import { HttpClient } from '@angular/common/http';
import { City } from '../models/city';

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  private clients: Client[] = [];

  private urlEndPoint: string = 'http://localhost:8080/api';

  constructor(private http:HttpClient) { }

  findAll(): Observable<Client[]> {
    return this.http.get<Client[]>(this.urlEndPoint);
  }   

  findAllPageable(page: number): Observable<any> {
    return this.http.get<any[]>(`${this.urlEndPoint}/page/${page}`);
  }
  
  findById(id: number): Observable<Client> {
    return this.http.get<Client>(`${this.urlEndPoint}/${id}`);
  }

  create(client: Client): Observable<Client> {
    return this.http.post<Client>(this.urlEndPoint, client);
  }

  update(client: Client):Observable<Client> {
    return this.http.put<Client>(`${this.urlEndPoint}/${client.id}`, client);
  }

  remove(id: number):Observable<void> {
    return this.http.delete<void>(`${this.urlEndPoint}/${id}`);
  }
  getCity(): Observable<City[]> {
    return this.http.get<City[]>(this.urlEndPoint + '/city');
  }

  findClientByName(key: string):Observable<Client[]> {
    return this.http.get<Client[]>(`${this.urlEndPoint}/filter/${key}`);
  }
}
