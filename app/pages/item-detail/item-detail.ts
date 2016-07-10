import { Component } from '@angular/core';
import { NavParams } from 'ionic-angular';

import {AttachUserRole} from "../../providers/attach-user-role/attach-user-role";

/*
  Generated class for the ItemDetailPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  templateUrl: 'build/pages/item-detail/item-detail.html',
  providers: [AttachUserRole]
})

export class ItemDetailPage {

  private name;
  private token;
  private role;

  private error:boolean;
  private errorMsg;

  constructor(private navParams: NavParams, private attachUserRole:AttachUserRole) {
    this.name = this.navParams.get('item').name;
    this.token = this.navParams.get('token');
  }

  saveItem(){

    let user_id = 0;
    //Fake in the ids
    switch(this.name)
    {
      case "Kirk Davies":
        user_id = 1;
          break;
      case "Thomas Wiegand":
        user_id = 2;
        break;
      case "Bilbo Baggins":
        user_id = 3;
        break;
    }

    //if(confirm("Add Role: " + this.role + " using token: " + this.token))
    //{
      this.attachUserRole.load(this.token, user_id, this.role, this.errorHandler.bind(this)).then(data => {

        this.error = false;
        this.errorMsg = "";

        alert(JSON.stringify(data));
      });
    //}
  }

  errorHandler(errMsg)
  {
    this.error = true;
    this.errorMsg = errMsg;
  }

}
