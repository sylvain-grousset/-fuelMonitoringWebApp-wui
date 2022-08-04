import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Histo} from "../interface/histo";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})

export class ApiHttpService {

  API_URL =  'http://127.0.0.1:8000';
  GET_ALL = '/getAll';
  GET_2LASTS = '/get2Lasts';

  constructor(private http: HttpClient ) {}

  getAll(): Observable<Histo[]>{
    return this.http.get<Histo[]>(this.API_URL + this.GET_ALL);
  }

  get2Lasts(): Observable<Histo[]>{
    return this.http.get<Histo[]>(this.API_URL + this.GET_2LASTS);
  }

}
