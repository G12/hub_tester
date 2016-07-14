import { Injectable } from '@angular/core';
import {Http, Headers} from '@angular/http';

// Add the RxJS Observable operators we need in this app.
import '../../rxjs-operators.ts';

/*
  Generated class for the Test provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class CodeTest {
  data:any;
  public error:boolean = false;
  public errorMsg:string = "";
  constructor(private http:Http) {
    this.data = null;
  }

  load(token, callback) {
    if (this.data) {
      // already loaded data
      return Promise.resolve(this.data);
    }

    // don't have the data yet
    return new Promise(resolve => {

      var headers = new Headers();
      headers.append('Content-Type', 'application/json');
      headers.append('Authorization', 'Bearer ' + token);

      //Get user data for logedin user
      //this.http.get('http://homestead.app/api/user/', {headers: headers})

      //Get role data for specified user
      this.http.get('http://homestead.app/api/users/1/roles/', {headers: headers})

      //create-invoice
          .map(res => res.json())
          .subscribe(data => {
                this.error = false;
                resolve(data);
              }
              ,err => {
                this.error = true;
                this.errorMsg = JSON.stringify(err);
                //alert("Failed Login");
                console.log(err);
                callback(this.errorMsg);
              }
              ,() => console.log('Is there any purpose for this?')
          );
    });
  }
}

