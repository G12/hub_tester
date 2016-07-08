import { Component } from '@angular/core';
import { ViewController, NavController } from 'ionic-angular';

/*
  Generated class for the LoginPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  templateUrl: 'build/pages/login/login.html',
})
export class LoginPage {

  private email = "";
  private password = "";

  constructor(private nav: NavController, private view: ViewController) {

  }

  saveItem(){
    let newItem = {
      email: this.email,
      password: this.password
    };

    this.view.dismiss(newItem);
  }

  close(){
    this.view.dismiss();
  }

}
