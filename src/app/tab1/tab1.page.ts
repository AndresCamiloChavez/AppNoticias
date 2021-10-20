import { Component, OnInit } from '@angular/core';
import { NoticiasService } from '../services/noticias.service';
import { Article } from '../interfaces/interfaces';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit{
  noticias: Article[] = [];
  constructor(private noticiaService: NoticiasService) {
  }
  ngOnInit(){
    this.cargarNoticias();
  }
  loadData(event){
    this.cargarNoticias(event);
  }
  cargarNoticias(event?){
    console.log(event);
    this.noticiaService.getTopHeadlines().subscribe(resp =>{
      console.log(resp);
      this.noticias.push(...resp.articles);
      //! inserta de manera independiente cada noticia no el arreglo en si
      if(resp.articles.length === 0){
        event.target.disabled = true;
        event.target.complete();
      }
      if(event){
        event.target.complete();
      }
    });
  }


}
