import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';

/*
  Generated class for the UserList provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class UserList {
  data: any;

  constructor(private http: Http) {
    this.data = null;
  }

  load(token) {
    if (this.data) {
      // already loaded data
      return Promise.resolve(this.data);
    }

    // don't have the data yet
    return new Promise(resolve => {

      var headers = new Headers();
      headers.append('Content-Type', 'application/json');
      headers.append('Authorization', 'Bearer ' + token);
      //The following will not work
      //headers.append('Authorization', 'Bearer ' + token + 'BADBADBAD');
      //headers.append('Authorization', 'Bearer ' + 'BADTOKEN');

      this.http.get('http://homestead.app/api/users/', {headers:headers})
        .map(res => res.json())
        .subscribe(data => {
          this.data = data;
          resolve(this.data);
        });
    });
  }
}

