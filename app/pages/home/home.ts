import {Component} from '@angular/core';
import {Modal, NavController} from 'ionic-angular';

import {AddItemPage} from '../add-item/add-item';
import {ItemDetailPage} from "../item-detail/item-detail";
import {LoginPage} from "../login/login";

import {HubLogin} from "../../providers/hub-login/hub-login";
import {UserList} from "../../providers/user-list/user-list";

@Component({
    templateUrl: 'build/pages/home/home.html',
    providers: [HubLogin, UserList]
})

export class HomePage {

    private items = [];
    private token = "";
    private loggedIn = false;

    constructor(private nav:NavController, public hubLogin:HubLogin, private userList:UserList) {

    }

    addItem() {

        let addModal = Modal.create(AddItemPage);

        addModal.onDismiss((item) => {

            if (item) {
                this.saveItem(item);
            }
        });

        this.nav.present(addModal);

    }

    saveItem(item) {
        this.items.push(item);
    }

    viewItem(item) {
        this.nav.push(ItemDetailPage, {
            item: item
        });
    }

    saveToken(token) {
        this.token = token;
        this.loggedIn = true;
    }

    doLogin(email, password) {
        this.hubLogin.load(email, password)
            .then(data => {
                this.token = data.token;
                this.loggedIn = true;
                alert(JSON.stringify(this.token));
                this.userList.load(this.token).then(data =>{
                    console.log(data);
                });
            })
            .catch(err => {
                alert("Error");
                console.log(err);
            });
    }

    login() {

        let loginModal = Modal.create(LoginPage);

        loginModal.onDismiss((item) => {

            if (item) {

                //Call login server
                //alert("email:" +  item.email + " password: " + item.password);
                //this.saveToken("sometoken");
                this.doLogin(item.email, item.password);
            }
        });

        this.nav.present(loginModal);

    }

}
