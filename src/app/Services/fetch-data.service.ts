import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import {MovieInterface} from '../Model/movie-model';

@Injectable({
  providedIn: 'root'
})
export class FetchDataService {

  url : string = 'https://api.themoviedb.org/3';
  constructor(private http : HttpClient) { }

  getLatestMoviesList() : Observable<any>{
    return this.http.get<any>(this.url+'/movie/latest?api_key='+ environment.api_key);
  }
  getMovie(id:number){
    return this.http.get<any>(this.url+`/movie/latest/${id}?api_key=`+environment.api_key);
  }
  getNowPlayingMoviesList() : Observable<MovieInterface>{
    return this.http.get<MovieInterface>(this.url+'/movie/now_playing?api_key='+ environment.api_key);
  }
  getTrendingMoviesList() : Observable<MovieInterface>{
    return this.http.get<MovieInterface>(this.url+'/trending/all/week?api_key='+ environment.api_key);
  }
  getUpcomingMoviesList() : Observable<MovieInterface>{
    return this.http.get<MovieInterface>(this.url+'/movie/upcoming?api_key='+ environment.api_key);
  }

}
