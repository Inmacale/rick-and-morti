import { Component, OnInit } from '@angular/core';
import { AlertController, NavController, SegmentChangeEventDetail } from '@ionic/angular';
import { IonSegmentCustomEvent } from '@ionic/core';
import { CharacterDto } from 'src/app/model/character';
import { DataManagementService } from 'src/app/service/data-management.service';


@Component({
    selector: 'app-my-favorites',
    templateUrl: './my-favorites.page.html',
    styleUrls: ['./my-favorites.page.scss'],
})
export class MyFavoritesPage implements OnInit {


    searchText: string = '';
    selectedSegment: string = 'characters';
    listButton: string[] = ['characters', 'episode', 'location'];

    constructor(private alertController: AlertController, private navCtrl: NavController, private dataManagement: DataManagementService) { }

    ngOnInit() {
        this.getFavoriteList(this.selectedSegment);
    }

    async deleteItem(option: string, event: any, item: any) {
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
                        this.dataManagement.deleteFavoriteList(option, item);
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

    public getFavoriteList(option: string): any[] {
        return this.dataManagement.getFavoriteList(option);
    }

    public getFavoriteListFilter(option: string): any[] {
        return this.dataManagement.getFavoriteList(option).filter((item) => item.name.toLowerCase().includes(this.searchText.toLocaleLowerCase()));
    }


    segmentChanged(event: CustomEvent) {
        this.searchText = '';
    }







}
