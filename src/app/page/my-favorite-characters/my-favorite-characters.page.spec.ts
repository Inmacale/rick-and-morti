import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MyFavoriteCharactersPage } from './my-favorite-characters.page';

describe('MyFavoriteCharactersPage', () => {
  let component: MyFavoriteCharactersPage;
  let fixture: ComponentFixture<MyFavoriteCharactersPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(MyFavoriteCharactersPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
