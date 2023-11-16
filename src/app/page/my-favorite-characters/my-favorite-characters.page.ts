import { Component, OnInit } from '@angular/core';
import { AlertController, NavController } from '@ionic/angular';
import { DataManagementService } from 'src/app/service/data-management.service';
import { ListsFavoriteAbstractPage } from '../abstract/lists.favorite.abstract';

@Component({
  selector: 'app-my-favorite-characters',
  templateUrl: './my-favorite-characters.page.html',
  styleUrls: ['./my-favorite-characters.page.scss'],
})
export class MyFavoriteCharactersPage extends ListsFavoriteAbstractPage implements OnInit {


  constructor(private alertControllerCharacter: AlertController, private navCtrlCharacter: NavController, private characterdatamanagementCharacter: DataManagementService) {
    super(alertControllerCharacter, navCtrlCharacter, characterdatamanagementCharacter);
  }

  ngOnInit() {
    this.getFavoriteList();
  }




}
