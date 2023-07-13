import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Histo } from "../interface/histo";
import { PrixFrance } from '../interface/PrixFrance';
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})

export class ApiService {

  API_URL =  'http://127.0.0.1:8081';

  constructor(private http: HttpClient ) {}

  getByMinusDays(minusDays: number){
    return this.http.get<Histo>(this.API_URL + '/getByMinusDays/'+minusDays);
  }

  getAll(){
    return this.http.get<Histo[]>(this.API_URL + '/getAll');
  }

  getPrixFrance(){
    return this.http.get<PrixFrance[]>(this.API_URL + '/getPrixFrance');
  }

}
