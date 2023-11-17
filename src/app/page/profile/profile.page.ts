import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { DataManagementService } from 'src/app/service/data-management.service';



@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  profileId: number | undefined;
  character: any;
  urlCharacter: string = 'character/';

  constructor(private alertController: AlertController, private activatedRoute: ActivatedRoute, private characterdatamanagement: DataManagementService) { }

  ngOnInit() {
    this.profileId = parseInt(this.activatedRoute.snapshot.paramMap.get('id') || '', 10);
    this.getCharacterDetail();
  }


  async toggleFavorite(option: string, character: any) {
    if (this.isFavorite(option, character)) {
      const alert = await this.alertController.create({
        header: 'Quitar favorito',
        message: `¿Estás seguro de que quieres quitar como favorito?`,
        buttons: [
          {
            text: 'Cancelar',
            role: 'cancel'
          }, {
            text: 'Eliminar',
            handler: () => {
              this.characterdatamanagement.deleteFavoriteList(option, character);
              console.log('Ítem borrado:');
            }
          }
        ]
      });

      await alert.present();

    } else {
      this.characterdatamanagement.addFavoriteList(option, character);
    }
  }

  async getCharacterDetail() {
    if (this.profileId) {
      this.characterdatamanagement.getFindId(this.urlCharacter, this.profileId).then(res => {
        console.log(res);
        this.character = res;
      });
    }
  }
  isFavorite(option: string, item: any): boolean {
    return this.characterdatamanagement.isFavorite(option, item);
  }

}
