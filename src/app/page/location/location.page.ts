import { Component, OnInit } from '@angular/core';
import { ListsAbstractPage } from '../abstract/lists.abstract';
import { AlertController } from '@ionic/angular';
import { DataManagementService } from 'src/app/service/data-management.service';

@Component({
  selector: 'app-location',
  templateUrl: './location.page.html',
  styleUrls: ['./location.page.scss'],
})
export class LocationPage extends ListsAbstractPage implements OnInit {

  constructor(protected alertControllerLocation: AlertController, protected dataManagementlocation: DataManagementService) {
    super(alertControllerLocation, dataManagementlocation);
  }
  ngOnInit() {
    this.chargePageItems();
    this.initializeSorter();
  }

  private initializeSorter() {
    this.sortByOptions = [{ key: 'type' }];
  }
  override getPathResource(): string {
    return 'location';
  }

}
