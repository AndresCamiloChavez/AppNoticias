import { Component, Input, OnInit } from '@angular/core';
import { Article } from '../../interfaces/interfaces';
// import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';


@Component({
  selector: 'app-noticia',
  templateUrl: './noticia.component.html',
  styleUrls: ['./noticia.component.scss'],
})
export class NoticiaComponent implements OnInit {
  @Input() noticia: Article;
  @Input() indice: number;
  constructor() {
    // console.log('es null noticiia', this.noticia === undefined);
   }

  ngOnInit() {
  }
  abrirNoticia(){
    console.log('click noticia');
    // const browser = this.iab.create(this.noticia.url, '_system');
  }

}
