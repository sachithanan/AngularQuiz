import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class QuiztestService {

  private apiUrl = 'http://localhost:5182/api/Score';

  constructor(private http: HttpClient) {}

  getScores(userId: number, date:Date): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl+"/ByUserId/"+userId+'/'+date);
  }
}
