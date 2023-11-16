import { Component, OnInit } from '@angular/core';
import { AlertController, NavController } from '@ionic/angular';
import { CharacterDto } from 'src/app/model/character';
import { DataManagementService } from 'src/app/service/data-management.service';


@Component({
  selector: 'app-my-favorites',
  templateUrl: './my-favorites.page.html',
  styleUrls: ['./my-favorites.page.scss'],
})
export class MyFavoritesPage implements OnInit {



  constructor(private navCtrl: NavController) { }

  ngOnInit() {

  }
  public navigate(path: string) {
    this.navCtrl.navigateForward(path);
  }






}
