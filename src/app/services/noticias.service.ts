import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, Query } from '@angular/core';
import { RespuestaTopHeadlines } from '../interfaces/interfaces';
import { environment } from '../../environments/environment';
import { delay } from 'rxjs/operators';


const apiKey = environment.apiKey;
const apiUrl = environment.apiUrl;
const headers = new HttpHeaders({
  // eslint-disable-next-line @typescript-eslint/naming-convention
  'X-Api-key': apiKey,
});


@Injectable({
  providedIn: 'root'
})
export class NoticiasService {

  headlinesPage = 0;
  headlinesPageCategoria = 0;
  categoriaAntes = 'business';
  constructor(private http: HttpClient) { }


  ejecutarQuery<T>( query: string){
    query = apiUrl + query;
    return this.http.get<T>(query,{headers});
  }
  getTopHeadlines(){
    this.headlinesPage++;
    return this.http.get<RespuestaTopHeadlines>(
        // eslint-disable-next-line max-len
        'https://newsapi.org/v2/top-headlines?country=co&page='+this.headlinesPage+'&category=business&apiKey=645e775aed974ec598b27b18caf360d0');
      // eslint-disable-next-line no-underscore-dangle
      // return this.ejecutarQuery<RespuestaTopHeadlines>('/top-headlines?country=co').pipe(
      //   delay( 3500 )
      // );
      // return this.ejecutarQuery<RespuestaTopHeadlines>(`/top-headlines?country=co&page=${this.headlinesPage}`);
  }
  getTopHeadlinesCategoria(categoria: string){
    if( categoria !== this.categoriaAntes){
      this.categoriaAntes = categoria;
      this.headlinesPageCategoria = 0;
    }
    this.headlinesPageCategoria++;
    return this.http.get<RespuestaTopHeadlines>(
      // eslint-disable-next-line max-len
      `https://newsapi.org/v2/top-headlines?country=co&page=${this.headlinesPageCategoria}&category=${categoria}&apiKey=645e775aed974ec598b27b18caf360d0`);
    // return this.ejecutarQuery<RespuestaTopHeadlines>(`/top-headlines?country=co&category=${categoria}`).pipe(
    //   delay( 3500 )
    // );
    // return this.ejecutarQuery<RespuestaTopHeadlines>(`/top-headlines?country=co&category=${categoria}
    //                                                 &page=${this.getTopHeadlinesCategoria}`);
  }
}
