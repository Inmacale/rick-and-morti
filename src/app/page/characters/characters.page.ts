import { Component, OnInit } from '@angular/core';
import { AlertController, InfiniteScrollCustomEvent } from '@ionic/angular';
import { DataManagementService } from 'src/app/service/data-management.service';
import { ListsAbstractPage } from '../abstract/lists.abstract';

@Component({
  selector: 'app-characters',
  templateUrl: './characters.page.html',
  styleUrls: ['./characters.page.scss'],
})
export class CharactersPage extends ListsAbstractPage implements OnInit {


  constructor(protected alertControllerCharacter: AlertController, protected dataManagementCharacter: DataManagementService) { 
    super(alertControllerCharacter,dataManagementCharacter);
  }

  public ngOnInit() {
    this.chargePageItems();
    this.initializeSorter();
  }
  initializeSorter() {
    this.sortByOptions = [ { key: 'status' }, { key: 'species' }, { key: 'gender' }];
  }

  override getPathResource(): string {
    return 'character';
  }


   
  }
