import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { CharactersDataManagementService } from 'src/app/service/characters-data-management.service';



@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  profileId: number | null = null;
  isFavorite: boolean = false;
  character: any;

  constructor(private alertController: AlertController, private activatedRoute: ActivatedRoute, private characterdatamanagement: CharactersDataManagementService) { }

  ngOnInit() {
    this.profileId = parseInt(this.activatedRoute.snapshot.paramMap.get('id') || '', 10)
    this.characterdatamanagement.getCharactersFindId(this.profileId).then(res => {
      console.log(res), this.character = res;
    })

  }


  async toggleFavorite() {
    if (this.isFavorite) {
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
              this.isFavorite = !this.isFavorite;
              // Aquí va la lógica para borrar el ítem
              console.log('Ítem borrado:');
            }
          }
        ]
      });

      await alert.present();

    } else {
      this.isFavorite = !this.isFavorite;
    }

  }



}
