import {Component} from '@angular/core';
import {Modal, NavController} from 'ionic-angular';

import {AddItemPage} from '../add-item/add-item';
import {ItemDetailPage} from "../item-detail/item-detail";
import {LoginPage} from "../login/login";

import {UserList} from "../../providers/user-list/user-list";

//Local storage
import {Storage, LocalStorage} from 'ionic-angular';

@Component({
    templateUrl: 'build/pages/home/home.html',
    providers: [UserList]
})

export class HomePage {

    private items = [];
    private token = "";
    private loggedIn = false;
    private local:LocalStorage;
    private hostname;
    private href;

    private error:boolean = false;
    private errorMsg;

    constructor(private nav:NavController, private userList:UserList) {

        this.hostname = window.location.hostname;
        this.href = window.location.href;

        this.local = new Storage(LocalStorage);

        this.local.get('LoggedIn').then((val) => {
            this.loggedIn = (val == 'true');
            if (this.loggedIn) {
                this.local.get('Token').then((val) => {
                    //TODO if I set a bad value to this it still works
                    this.token = "BadValueHere" + val + "andBadBadValueHere";
                    this.drawItemList();
                });
            }
        });
    }

    ///////////////////////////////// Quick Test Area
    testArea() {
        alert("token: " + this.token);
        //this.attachUserRole.load(this.token, 3, "owner", this.errorHandler.bind(this)).then(data => {
        //  alert(JSON.stringify(data));
        //  this.error = false;
        //  this.errorMsg = "";
        //});
    }

    errorHandler(errMsg) {
        this.error = true;
        this.errorMsg = errMsg;
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
            item: item,
            token: this.token
        });
    }

    drawItemList() {
        this.userList.load(this.token).then(data => {
            console.log(data);
            this.items = data.users;
        });
    }

    showLogin() {

        let loginModal = Modal.create(LoginPage);

        loginModal.onDismiss((item) => {

            if (item) {

                this.token = item.token;
                this.loggedIn = true;
                this.local.set('LoggedIn', this.loggedIn ? 'true' : 'false');
                this.local.set('Token', this.token);

                this.drawItemList();
            }
        });

        this.nav.present(loginModal);

    }

    logOut() {
        this.token = "";
        this.loggedIn = false;
        this.local.set('LoggedIn', 'false');
        this.local.set('Token', "");
        this.items = [];
    }

}
