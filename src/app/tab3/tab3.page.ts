import { Component } from '@angular/core';
import { DataLocalService } from '../services/data-local.service';
import { Article } from '../interfaces/interfaces';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {
  // noticias: Article[] = [];
  slideOptions = {
    allowSlidePrev: false,
    allowSlideNext: false,
  };
  //! lo comentado es mi forma de hacerlo pero el profesor lo realizo de manera diferente
  constructor( public dataLocalService: DataLocalService) {
    // this.dataLocalService.cargarFavoritos().then( data =>{
    //   this.noticias = data;
    // });
  }



}
