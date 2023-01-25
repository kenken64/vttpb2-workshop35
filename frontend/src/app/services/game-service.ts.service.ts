import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Game } from '../models/Game';


@Injectable({
  providedIn: 'root'
})
export class GameServiceTsService {

  constructor(private httpSvc: HttpClient) { }
  BACKEND_API_URL = "http://localhost:8080/api/bgg/games-ng";

  getGames(limit: number, offset: number): Observable<Game[]> {
    const params = new HttpParams()
      .set("limit", limit)
      .set("offset", offset);

      const headers= new HttpHeaders()
      .set('content-type', 'application/json')
      .set('Access-Control-Allow-Origin', '*');

    return this.httpSvc
        .get<Game[]>(this.BACKEND_API_URL, { params: params, headers: headers });
  }
}
