import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { NavController, AlertController, ModalController } from '@ionic/angular';
import { HttpParams } from "@angular/common/http";
import { Router } from '@angular/router';

@Component({
    selector: 'app-register',
    templateUrl: './register.page.html',
    styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
    
    checked: boolean = true;
    check: any = {
        title: "验证码",
        time: 60,
        lastTime: 0,
        mark: false
    };
    phone: string = "";
    code: string = "";
    name: string = "";

    constructor(
        private readonly router: Router,
        private api: ApiService,
        private modalCtrl: ModalController,
        private alertCtrl: AlertController,
        private nav: NavController
    ) {

    }

    ngOnInit() {
        this.api.storage.get("user").then(function (l) {
            if (l)
                this.phone = l.phone;
        })
    }
    startCheck() {
        var l = this;
        if (!this.check.mark) {
            this.check.mark = true;
            this.check.lastTime = this.check.time;
            this.check.title = this.check.time.toString();
            let n = setInterval(function () {
                l.check.lastTime--;
                l.check.title = l.check.lastTime.toString();
                if (0 == l.check.lastTime) {
                    clearInterval(n);
                    l.check.mark = false;
                    l.check.lastTime = l.check.time;
                    l.check.title = "验证码";
                }
            }, 1000)
        }
    }

    getCode() {

        if (this.phone == "") {
            this.api.toastCtrl.show("请输入手机号码");
            return;
        }
        if (this.phone.toString().length != 11) {
            this.api.toastCtrl.show("请输入正确的手机号码");
            return;
        }

        var l = this;
 
       this.code = "";
        var n = new HttpParams().set("category", "1").set("phone", this.phone);
        this.api.getRegisterCode(function (n) {
            l.startCheck();
        }, {
                params: n,
                isLoading: false
            });
 
    }

    register() {
       
    
        if (this.name == "") {
            this.api.toastCtrl.show("请输入姓名");
            return;
        }
        if (this.code == "") {
            this.api.toastCtrl.show("请输入验证码");
            return;
        }
        if (this.code.toString().length != 5) {
            this.api.toastCtrl.show("验证码错误,请重新输入");
            return;
        }
        if (this.phone.toString().length != 11) {
            this.api.toastCtrl.show("请输入正确的手机号码");
            return;
        }

        let l = this;
       let n = (new HttpParams()).set("phone", this.phone).set("code", this.code).set("name", this.name).set("devicePlatform", this.api.device.platform).set("deviceUuid", this.api.device.uuid).set("deviceModel", this.api.device.model).set("deviceVersion", this.api.device.version).set("deviceSerial", this.api.device.serial);
        this.api.register(function (n) {
            l.api.storage.set("user", {
                phone: n.phone,
                name: n.name
            });
            l.api.storage.set("token", n.token);
            l.nav.navigateRoot("/tabs/home", {
                animated: true
            });

        }, {
                params: n,
                isLoading: true
            });
        
 
           
    }

    keyup(l) {
        if (13 == l.keyCode)
            this.register();
    }

    toAgreementrpage() {
        this.router.navigate(['/agreement']
            //, {
            //queryParams: {
            //    code: vcode,
            //    beginDate: this.beginDate,
            //    endDate: this.endDate
            //}
            //}
        );
    }
    back() {
        window.history.back();
    }
}