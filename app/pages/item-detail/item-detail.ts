import { Component } from '@angular/core';
import { NavParams } from 'ionic-angular';

/*
  Generated class for the ItemDetailPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  templateUrl: 'build/pages/item-detail/item-detail.html',
})

export class ItemDetailPage {

  private title;
  private description;

  constructor(private navParams: NavParams) {

    this.title = this.navParams.get('item').title;
    this.description = this.navParams.get('item').description;

  }

}
