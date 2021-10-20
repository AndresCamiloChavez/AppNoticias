import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { Article } from '../interfaces/interfaces';

@Injectable({
  providedIn: 'root'
})
export class DataLocalService {
  noticias: Article[] = [];
  constructor(private storage: Storage) {
    this.cargarFavoritos();
   }

  guardarNoticia( noticia: Article ){

    const existe = this.noticias.find( item => item.title === noticia.title);
    if(!existe){
      this.noticias.unshift(noticia);
      this.storage.set('favoritos', this.noticias);
    }
  }
  async cargarFavoritos(){
    const favoritos = await this.storage.get('favoritos');
    //para cargar las noticas al arreglo ya que cuando inicie la aplicacion el arreglo esta vacio
    if(favoritos){ //? porque puede ser null y ya no seria un arreglo
      this.noticias = favoritos;
    }
  }
  borrarNoticia(noticia: Article){
    this.noticias = this.noticias.filter( item => item.title !== noticia.title);
    this.storage.set('favoritos', this.noticias);
  }

  //! se puede colocar el toast en favoritos !!
}
