import {Injectable} from '@angular/core';
import {Http, Headers} from '@angular/http';

// Add the RxJS Observable operators we need in this app.
import '../../rxjs-operators.ts';

/*
 Generated class for the HubLogin provider.

 See https://angular.io/docs/ts/latest/guide/dependency-injection.html
 for more info on providers and Angular 2 DI.
 */
@Injectable()
export class AddPermission {
    data:any;
    public error:boolean = false;
    public errorMsg:string = "";
    constructor(private http:Http) {
        this.data = null;
    }

    load(token, permission, role, callback) {
        if (this.data) {
            // already loaded data
            return Promise.resolve(this.data);
        }

        // don't have the data yet
        return new Promise(resolve => {

            var headers = new Headers();
            headers.append('Content-Type', 'application/json');
            headers.append('Authorization', 'Bearer ' + token);

            this.http.post('http://homestead.app/api/role/permission/add',
                JSON.stringify({permission: permission, role: role}), {headers: headers})
                .map(res => res.json())
                .subscribe(data => {
                        //this.data = data;
                        //resolve(this.data);
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

