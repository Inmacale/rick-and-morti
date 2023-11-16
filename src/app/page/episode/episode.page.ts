import { Component, OnInit } from '@angular/core';
import { ListsAbstractPage } from '../abstract/lists.abstract';
import { AlertController } from '@ionic/angular';
import { DataManagementService } from 'src/app/service/data-management.service';

@Component({
  selector: 'app-episode',
  templateUrl: './episode.page.html',
  styleUrls: ['./episode.page.scss'],
})
export class EpisodePage extends ListsAbstractPage implements OnInit {


  constructor(protected alertControllerEpisode: AlertController, protected dataManagementEpisode: DataManagementService) {
    super(alertControllerEpisode, dataManagementEpisode);
  }
  ngOnInit() {
    this.chargePageItems();
    this.initializeSorter();

  }
  private initializeSorter() {
    this.sortByOptions = [{ key: 'name' }];
  }
  override getPathResource(): string {
    return 'episode';
  }


}
