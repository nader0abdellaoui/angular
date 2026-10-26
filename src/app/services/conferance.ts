import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Conferance } from '../models/conferance';

@Injectable({
  providedIn: 'root',
})
export class ConferanceService {
  private readonly http = inject(HttpClient);
  private readonly apiUrl = 'http://localhost:3000/conferances';

  getAll(){
    return this.http.get<Conferance[]>(this.apiUrl);
  }

  getById(id: number) {
      return this.http.get<Conferance>(this.apiUrl+"/"+id);
    //return this.http.get<Conferance>(`${this.apiUrl}/${id}`);
  }

  addConferance(conf: Conferance) {
    return this.http.post<Conferance>(this.apiUrl, conf);
  }

  updateConferance(id: number, conf: Conferance) {
    return this.http.put<Conferance>(`${this.apiUrl}/${id}`, { ...conf, id });
  }

  deleteConferance(id: number) {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
