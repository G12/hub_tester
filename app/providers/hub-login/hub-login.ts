import {Injectable} from '@angular/core';
import {Http, Headers} from '@angular/http';
import 'rxjs/add/operator/map';
import {errorObject} from "rxjs/util/errorObject";

/*
 Generated class for the HubLogin provider.

 See https://angular.io/docs/ts/latest/guide/dependency-injection.html
 for more info on providers and Angular 2 DI.
 */
@Injectable()
export class HubLogin {
    data:any;

    constructor(private http:Http) {
        this.data = null;
    }

    load(email, password) {
        if (this.data) {
            // already loaded data
            return Promise.resolve(this.data);
        }

        // don't have the data yet
        return new Promise(resolve => {

            //Add headers
            var headers = new Headers();
            headers.append('Content-Type', 'application/json');

            // We're using Angular Http provider to request the data,
            // then on the response it'll map the JSON data to a parsed JS object.
            // Next we process the data and resolve the promise with the new data.

            this.http.post('http://homestead.app/api/authenticate',
                JSON.stringify({email: email, password: password}), {headers: headers})
                .map(res => res.json())
                .subscribe(data => {
                    // we've got back the raw data, now generate the core schedule data
                    // and save the data for later reference
                    this.data = data;
                    resolve(this.data);
                });
        });
    }

}

