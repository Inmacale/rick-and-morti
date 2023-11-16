import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MyFavoriteEpisodesPage } from './my-favorite-episodes.page';

describe('MyFavoriteEpisodesPage', () => {
  let component: MyFavoriteEpisodesPage;
  let fixture: ComponentFixture<MyFavoriteEpisodesPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(MyFavoriteEpisodesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
