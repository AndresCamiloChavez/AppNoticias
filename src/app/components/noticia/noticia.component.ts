import { Component, Input, OnInit } from '@angular/core';
import { Article } from '../../interfaces/interfaces';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { ActionSheetController } from '@ionic/angular';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';




@Component({
  selector: 'app-noticia',
  templateUrl: './noticia.component.html',
  styleUrls: ['./noticia.component.scss'],
})
export class NoticiaComponent implements OnInit {
  @Input() noticia: Article;
  @Input() indice: number;
  constructor(private iab: InAppBrowser, private actionCtrl: ActionSheetController,
              private socialsharing: SocialSharing) {
    // console.log('es null noticiia', this.noticia === undefined);
   }

  ngOnInit() {
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
        text: 'Favorito',
        icon: 'heart',
        cssClass: 'myActionSheetBtnStyle-favorite',
        handler: () => {
          console.log('favorite clicked');
        }
      }, {
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

}
