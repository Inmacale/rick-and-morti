import { Component, OnInit } from '@angular/core';
import { AlertController, NavController } from '@ionic/angular';
import { DataManagementService } from 'src/app/service/data-management.service';

@Component({

    template: '',

})
export abstract class MyFavoriteCharactersPage {

    searchText: string = '';

    constructor(private alertController: AlertController, private navCtrl: NavController, private dataManagement: DataManagementService) { }


    async deleteItem(event: any, item: any) {
        console.log(event)
        const slidingItem = event.target.closest('ion-item-sliding');
        slidingItem.close();

        const alert = await this.alertController.create({
            header: 'Confirmar borrado',
            message: `¿Estás seguro de que quieres borrar ${item}?`,
            buttons: [
                {
                    text: 'Cancelar',
                    role: 'cancel'
                }, {
                    text: 'Borrar',
                    handler: () => {
                        this.dataManagement.deleteFavoriteList(item);
                        // Aquí va la lógica para borrar el ítem
                        console.log('Ítem borrado:', item);
                    }
                }
            ]
        });

        await alert.present();
    }

    public navigate(path: string) {
        this.navCtrl.navigateForward(path);
    }

    public getFavoriteList(): any[] {
        return this.dataManagement.getFavoriteList().filter((item) => item.name.toLowerCase().includes(this.searchText.toLocaleLowerCase()));
    }




}
