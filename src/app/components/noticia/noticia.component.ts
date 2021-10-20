import { Component, Input, OnInit } from '@angular/core';
import { Article } from '../../interfaces/interfaces';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { ActionSheetController, ToastController } from '@ionic/angular';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';
import { DataLocalService } from '../../services/data-local.service';




@Component({
  selector: 'app-noticia',
  templateUrl: './noticia.component.html',
  styleUrls: ['./noticia.component.scss'],
})
export class NoticiaComponent implements OnInit {
  @Input() noticia: Article;
  @Input() indice: number;
  @Input() enFavoritos;

  constructor(private iab: InAppBrowser,
              private actionCtrl: ActionSheetController,
              private socialsharing: SocialSharing,
              private dataLocalStorage: DataLocalService,
              private toastCtrl: ToastController) {
    // console.log('es null noticiia', this.noticia === undefined);
   }

  ngOnInit() {
    // console.log('enFavoritos', this.enFavoritos);
  }
  abrirNoticia(){
    console.log('click noticia');
    const browser = this.iab.create(this.noticia.url);
  }
  async lanzarMenu(){
    const actionSheet = await this.actionCtrl.create({
      header: 'Opciones',
      cssClass: 'myPage',
      buttons: [{
        text: this.enFavoritos ? 'Quitar Favorito': 'Favorito',
        icon: this.enFavoritos ? 'trash': 'heart',
        cssClass: 'myActionSheetBtnStyle-favorite',
        handler: () => {
          if(this.enFavoritos){
            this.dataLocalStorage.borrarNoticia(this.noticia);
            this.mostrarToast('Se ha eliminado de favoritos');
          }
          else {
            this.dataLocalStorage.guardarNoticia(this.noticia);
            this.mostrarToast('Se ha agregado a favoritos');
          }
         }
       },
       {
        text: 'Compartir',
        icon: 'share',
        cssClass: 'myActionSheetBtnStyle-Compartir',
        handler: () => {
          this.socialsharing.share(
            this.noticia.title,
            this.noticia.source.name,
            '',
            this.noticia.url
          );
        }
      },{
        text: 'Cancel',
        icon: 'close',
        role: 'cancel',
        handler: () => {
          console.log('Cancel clicked');
        }
      }]
    });
    await actionSheet.present();
  }

  async mostrarToast(mensaje: string){
    const toast = await this.toastCtrl.create({
      message: mensaje,
      duration: 2000,
      position: 'top'
    });
    toast.present();
  }

}
