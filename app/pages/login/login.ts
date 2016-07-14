import {Component} from '@angular/core';
import {ViewController, NavController} from 'ionic-angular';
import {HubLogin} from '../../providers/hub-login/hub-login';
/*
 Generated class for the LoginPage page.

 See http://ionicframework.com/docs/v2/components/#navigation for more info on
 Ionic pages and navigation.
 */
@Component({
    templateUrl: 'build/pages/login/login.html',
    providers: [HubLogin]
})
export class LoginPage {

    private email = "";
    private password = "";
    private error = false;
    private errorMsg = "";

    constructor(private nav:NavController, private view:ViewController, private hubLogin:HubLogin) {
        this.error = this.hubLogin.error;
        this.errorMsg = this.hubLogin.errorMsg;
    }

    saveItem() {
        this.hubLogin.load(this.email, this.password, this.errorHandler.bind(this))
            .then(data => {
                let newItem = {
                    token: data.token
                };
                console.log(data);
                alert(data.token);
                this.view.dismiss(newItem);
            })
    }

    errorHandler(errMsg) {
        this.error = true;
        this.errorMsg = errMsg;
    }

    close() {
        this.view.dismiss();
    }

}
