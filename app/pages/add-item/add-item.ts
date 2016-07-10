import { Component } from '@angular/core';
import { ViewController, NavController } from 'ionic-angular';

/*
  Generated class for the AddItemPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/

@Component({
  templateUrl: 'build/pages/add-item/add-item.html',
})

export class AddItemPage {

  private name = "";

  constructor(private nav: NavController, private view: ViewController) {

  }

  saveItem(){
    let newItem = {
      name: this.name
    };

    this.view.dismiss(newItem);
  }

  close(){
    this.view.dismiss();
  }
  
}
