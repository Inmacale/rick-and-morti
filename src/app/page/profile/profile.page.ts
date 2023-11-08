import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  isFavorite :boolean=false; 
  
  constructor(private location: Location, private alertController: AlertController) { }

  ngOnInit() {
  }

  goBack():void{
    this.location.back();
  }

  async toggleFavorite(){
    if(this.isFavorite){
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

    }else{
      this.isFavorite = !this.isFavorite;
    }
    
  }



}
