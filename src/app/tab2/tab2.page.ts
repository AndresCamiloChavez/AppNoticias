import { Component, ViewChild, OnInit } from '@angular/core';
import { IonSegment } from '@ionic/angular';
import { NoticiasService } from '../services/noticias.service';
import { Article } from '../interfaces/interfaces';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit{
  @ViewChild(IonSegment) segment: IonSegment;
  categorias = [
    'business',
    'entertainment',
    'general',
    'health',
    'science',
    'sports',
    'technology',
  ];
  noticiasCategoria: Article[] = [];
  categoriaActual = 'business';
  constructor(private noticiaService: NoticiasService) {
  }
  ngOnInit(){
   this.cargarnoticias(this.categorias[0]);
  //  console.log('es null?',this.noticiasCategoria);
    // this.segment.value = this.categorias[0]; me genera error no se porque al darle un valor por default
  }

  segmentChanged(event){
    this.noticiasCategoria = [];
    this.categoriaActual = event.detail.value;
    this.cargarnoticias(this.categoriaActual, event);
  }
  loadData(event){
    this.cargarnoticias(this.categoriaActual, event);
  }
  cargarnoticias(categoria: string, event?){
    this.noticiaService.getTopHeadlinesCategoria(categoria).subscribe( resp =>{
      this.noticiasCategoria.push(...resp.articles);
      // console.log(event);
      if(resp.articles.length === 0){
        event.target.disabled = true;
        event.target.complete();

      }
      if (event){
        event.target.complete();
      }
    });
  }
}
