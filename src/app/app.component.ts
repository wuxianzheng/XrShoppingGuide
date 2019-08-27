import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { Component, OnInit, ViewEncapsulation } from '@angular/core';


import { ApiService } from './services/api.service';
import { HttpParams } from "@angular/common/http";



@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  
  rootPage: string = "";
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private api: ApiService
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
     // this.splashScreen.hide();
    });
  }

  async ngOnInit() {

    let u = this.api.storage;
    let that = this;
    await u.set("isUsed", true);
    await u.set("token", "test");
    await u.set("datasource", {
        id: "2",
        status: "ok",
        name: "测试"
    });
    Promise.all([u.get("isUsed"), u.get("token"), u.get("datasource")]).then(l => {
        if (l[0]) {
            var t = l[2];
            if (l[1])
                if (t) {
                    var e = (new HttpParams()).set("dsId", t.id).set("status", t.status);
                    that.api.change(l => {
                        if (1 == l.result) {
                            var t = l.data;
                            u.set("datasource", {
                                id: t.id,
                                status: t.status,
                                name: t.name
                            });
                            that.api.setMenuList(t.menuList);
                            that.api.setFun(t.fun);
                            that.api.setMenu(t.menu);
                            that.rootPage = "HomePage";
                            setTimeout(function () {
                                that.splashScreen.hide();
                            }, 1e3);
                        } else if (1011 == l.result) {
                            that.rootPage = "LoginPage";
                            setTimeout(function () {
                                that.splashScreen.hide();
                                that.api.toastCtrl.show("令牌失效，请重新登录！");
                            }, 200);
                        }
                        else if (4002 == l.result) {
                            that.rootPage = "DataSourcePage";
                            setTimeout(function () {
                                that.splashScreen.hide();
                                that.api.toastCtrl.show(l.desc);
                            }, 200);
                        }
                        else {
                            that.rootPage = "LoginPage";
                            setTimeout(function () {
                                that.splashScreen.hide();
                                that.api.toastCtrl.show(l.desc);
                            }, 200);
                        }
                    }, {
                            params: e,
                            isLoading: false,
                            fullCall: true,
                            error: () => {
                                that.rootPage = "NotNetworkPage";
                                setTimeout(function () {
                                    that.splashScreen.hide();
                                }, 200);
                            }
                            // .bind(that)
                        });
                } else {
                    that.rootPage = "DataSourcePage";
                    setTimeout(function () {
                        that.splashScreen.hide();
                    }, 200);
                }
            else {
                that.rootPage = "LoginPage";
                setTimeout(function () {
                    that.splashScreen.hide();
                }, 200);
            }
        }
        else {
            u.set("isUsed", !0);
            that.rootPage = "GuidePage";
            setTimeout(function () {
                that.splashScreen.hide();
            }, 200);
        }
    });

}



}
