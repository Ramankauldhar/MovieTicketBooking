import { Component, OnInit } from '@angular/core';
import { FetchDataService } from 'src/app/Services/fetch-data.service';
import { environment } from 'src/environments/environment';
import {MovieInterface} from '../../Model/movie-model';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  latestMoviesData : any;
  NowPlayingMoviesData !: MovieInterface;
  TrendingMoviesData !: MovieInterface;
  UpcomingMoviesData !: MovieInterface;

  constructor(private fetchData : FetchDataService){}

  ngOnInit(): void{
    this.getLatestMoviesList();
    this.getNowPlayingMoviesList();
    this.getTrendingMoviesList();
    this.getUpcomingMoviesList();
  }

  getLatestMoviesList() {
    this.fetchData.getLatestMoviesList().subscribe(res =>{
      this.latestMoviesData = this.checkResult(res);
    }, err => {
      console.log("Unable to fetch LatestMovies Data.", err);
    })
  }
  checkResult(res : any): any{
    if(!res.backdrop_path){
      res.backdrop_path = "https://image.tmdb.org/t/p/original"+res.poster_path+'?api_key='+environment.api_key;
    } else {
      res.backdrop_path = "https://image.tmdb.org/t/p/original"+res.backdrop_path+'?api_key='+environment.api_key;
    }
    return res;
  }
  modifyResult(movies: MovieInterface){
    if(movies.results){
      movies.results.forEach(element => {
        element.backdrop_path = "http://image.tmdb.org/t/p/original"+element.backdrop_path+'?api_key='+environment.api_key;
        if(!element.title){
          element.title = element?.name;
        }
      })
    }
    return movies;
  }
  getNowPlayingMoviesList() {
    this.fetchData.getNowPlayingMoviesList().subscribe(res =>{
      this.NowPlayingMoviesData = this.modifyResult(res);
      //console.log(res);
    }, err => {
      console.log("Unable to fetch NowPlayingMovies Data.", err);
    })
  }
  getTrendingMoviesList() {
    this.fetchData.getTrendingMoviesList().subscribe(res =>{
      this.TrendingMoviesData = this.modifyResult(res);
      //console.log(res);
    }, err => {
      console.log("Unable to fetch TrendingMovies Data.", err);
    })
  }
  getUpcomingMoviesList() {
    this.fetchData.getUpcomingMoviesList().subscribe(res =>{
      this.UpcomingMoviesData = this.modifyResult(res);
     // console.log(res);
    }, err => {
      console.log("Unable to fetch UpcomingMovies Data.", err);
    })
  }
}
