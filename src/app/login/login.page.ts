import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { NavController,AlertController, ModalController } from '@ionic/angular';
import { HttpParams } from "@angular/common/http";
import {  Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
    check: any = {
        title: "验证码",
        time: 60,
        lastTime: 0,
        mark: false
    };
    phone:string = "";
    code: string = "";

    constructor(
        private readonly router: Router,
        private api: ApiService,
        private modalCtrl: ModalController,
        private alertCtrl: AlertController,
        private nav: NavController
    ) {}

    ngOnInit() {
        let that = this;
        this.api.storage.get("user").then(function (l) {
          if (l && l.phone)
            that.phone = l.phone;
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
      var l = this;
      if (this.phone != ""){
          if (11 == this.phone.toString().length) {
                this.code = "";
                var n = new HttpParams().set("phone", this.phone);
                this.api.getLoginCode(function (n) {
                    l.startCheck()
                }, {
                      params: n,
                      isLoading: false
                  })
            } else{
                l.api.toastCtrl.show("请输入正确的手机号码");}
        }else{
          l.api.toastCtrl.show("请输入手机号码")
        }
    }

    login() {
        let l = this;
        let  n = (new HttpParams()).set("phone", this.phone).set("code", this.code).set("devicePlatform", this.api.device.platform).set("deviceUuid", this.api.device.uuid).set("deviceModel", this.api.device.model).set("deviceVersion", this.api.device.version).set("deviceSerial", this.api.device.serial);
        if ("" != this.code) {
            if (5 == this.code.toString().length) {
                this.api.login(function (n) {
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
                    })
            }
            else{
                this.api.toastCtrl.show("验证码错误,请重新输入");
              }
        }
        else{
            this.api.toastCtrl.show("请输入验证码");
          }
    }

    keyup(l) {
      if (13 == l.keyCode)
        this.login();
    }
    toRegisterpage() {
        this.router.navigate(['/register']
            //, {
            //queryParams: {
            //    code: vcode,
            //    beginDate: this.beginDate,
            //    endDate: this.endDate
            //}
            //}
        );
    }
}
