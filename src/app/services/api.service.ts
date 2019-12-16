import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpParams, HttpHeaders } from "@angular/common/http";
import { NavController,LoadingController, ToastController, AlertController, PopoverController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { Platform } from '@ionic/angular';
import { CanLoad, Router } from '@angular/router';
import { catchError, map, tap } from 'rxjs/operators';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
//import { AppVersionPage } from '../app-version/app-version.page';

@Injectable({
  providedIn: 'root'
})

export class ApiService {

  host: string = "https://api.xuner.cn/xuner/bi";   //"http://192.168.0.12/xrcube";
  platform: string = "web";
  datasource: object = {};
  user: object = { name: "" };
  device: iDevice = new iDevice();
  toastCtrl: any = {
      show: {}
  };

  loadingCtrl: any = {
    isOpen: false,
    timer: {},
    loading: null,
    show: {},
    hide: {}
  };

    menuList: any = [];
    authMenu: any= {};
    authFun: any = {};
    isAuthInAmount: boolean = false;
    isAuthStorePage: boolean = false;
    isAuthProductPage: boolean = false;
    isAuthShoppingGuide: boolean = false;

  appVersion: any;//获取版本插件

  constructor(public http: HttpClient,
        private platfrm: Platform,
        private nav: NavController,
        private LoadingCtrl: LoadingController,
        private ToastCtrl: ToastController,
        private popoverCtrl: PopoverController,
        private alertCtrl: AlertController,
        private iab: InAppBrowser,
        private router: Router,
        public storage: Storage,
  ) {
    if (this.isAndroid()){
        this.platform = "android";}
    else if (this.isIos()){
        this.platform = "ios";}

    this.storage.get("datasource").then(res => {
        this.datasource = res
    });

    this.storage.get("user").then(res => {
        this.user = res
    });
    this.toastCtrl.show = async function (msg: string) {
        const nn = await ToastCtrl.create({
            message: msg,
            duration: 1500,
            mode: 'ios',
            position: "top"
        });
        await nn.present();
    };

    this.loadingCtrl.show = async function () {
        try {
            let that = this;
            if (!that.isOpen) {   
                that.isOpen = true;
                that.loading = true;
                const loading = await LoadingCtrl.create({
                    showBackdrop: false,
                    mode: 'ios',
                   duration: 5000
                });
                await loading.present();
                that.loading = false;
                // this.loading = nn; 

                that.timer = setTimeout(async function () {
                    that.timer = null;
                    LoadingCtrl.dismiss();
                    if (that.isOpen) {
                        //if (that.loading) {
                            //that.loading = null;
                         //}
                        that.isOpen = false;
                    }
                },
                    3000);
            }
        }
        catch{ }

    };
    let sup = this;
    this.loadingCtrl.hide = async function () {
        try {
            let that = this;
            if (that.isOpen) {
                    if (!that.loading) {
                         LoadingCtrl.dismiss();
                    }
                    else {  //加载需要时间
                        setTimeout(async function () {
                             LoadingCtrl.dismiss();
                        },100);
                    }
                if (that.timer) {
                    clearTimeout(that.timer);
                    that.timer = null;
                }
                that.isOpen = false;
            }
        }
        catch{ }
    };
  }


 
    //get一般请求方法
    get(url: string) {
        return new Promise((resolve, reject) => {
            this.http.get(url).subscribe((response) => {resolve(response);},
             (err) => { reject(err); });
        });
    }
 
    //getbi请求方法
    getbi(url: string,body: any){
        return new Promise((resolve, reject) => {
          this.http.get(url,{
            headers: new HttpHeaders(
                { 'Content-Type': 'application/json;charset=utf-8'}
                ),
              params : body
            }).subscribe((response) => {resolve(response);},
                        (err) => { reject(err); });
        });
    }

    // httpOptions = {
    //     headers: new HttpHeaders({ 'Content-Type': 'application/json;application/x-www-form-urlencoded; charset=utf-8'})
    // };

    //post一般请求方法
    post(url: string, body: any) {
		return new Promise((resolve, reject) => {
            this.http.post(url, body,{
                headers: new HttpHeaders(
                    {
                    'Content-Type':'application/json;charset=utf-8',//application/x-www-form-urlencoded
                    'Version':'1.0',
                    'Authorization':'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9kbnMiOiIwMDEiLCJ1bmlxdWVfbmFtZSI6ImFkbWluIiwicm9sZSI6ImFkbWluIiwibmJmIjoxNTY3NjQ3MTIxLCJleHAiOjE1Njc3MzM1MjEsImlhdCI6MTU2NzY0NzEyMSwiaXNzIjoiaHR0cDovL2xvY2FsaG9zdDo1MDE5MSIsImF1ZCI6Imh0dHA6Ly9sb2NhbGhvc3Q6NTAxOTEifQ.WWbLUfCGWTIc-e6r7Jyfn4tZVzogqFuXTS7flxB79QY'
                    }
                    )
                })
                .subscribe((response) => {resolve(response);},
                               (err) => { reject(err); });
        });
    }

    //示例
    // const url = 'http://www.phonegap100.com/appapi.php?a=getPortalList&catid=20&page=1';
	// 	this.ApiService.get(url).then((response: any) => {
	// 	    console.log(response);
    // });
    
    // const url1 = 'http://47.106.253.255:99/xuner/bi/sales/querySummary';
    // let body = {
    //   "shopcode": "33222",
    //   "goodscode": "222",
    //   "beginDate": "2019-06-13",
    //   "endDate": "2019-06-17"
    // };
    // this.ApiService.post(url1,body).then((response: any) => {
    //     console.log(response);
    // });

    convertToDate(nows) {
        const now = new Date(nows);
        const year = now.getFullYear();
        const month = now.getMonth() + 1;
        const date = now.getDate();
        const hour = now.getHours();
        const minute = now.getMinutes();
        const second = now.getSeconds();
        return year + '-' + month + '-' + date + ' ' + hour + ':' + minute + ':' + second;
    }

    sleep(delay) {
        var p = new Promise(function (resolve, reject) { //做一些异步操作
            setTimeout(function () {
                resolve();
            }, delay);
        });
        return p;
    }

  setMenuList(data) {
      this.menuList = data;
  }
  getMenuList() {
    if (!this.menuList.length) {
        let that = this;
        this.change(l => {
            if (1 == l.result) {
                let t = l.data;
                that.menuList = t.menuList;
                return t.menuList;
            }
        }, {});
    }
    return this.menuList;
   }


  setFun(data) {
      this.authFun = data;
      this.isAuthInAmount = !!this.authFun.eec6512ae475495db0f70ff06edf4c48;
  }
  setMenu(data) {
      this.authMenu = data;
      this.isAuthStorePage = !!this.authMenu.c8e1532f21b940678d5095d02f22c6d5;
      this.isAuthProductPage = !!this.authMenu.cba8337443b811e89e2600163e08596b;
      this.isAuthShoppingGuide = !!this.authMenu.cb19022543b811e89e2600163e08596b;
  }
  launch_help() {
    this.iab.create(this.host + "/help.html", "_blank", {
        hidden: "no",
        location: "no",
        closebuttoncaption: "关闭",
        toolbar: "yes",
        toolbarposition: "top"
    });
  }

  launch() {
      this.iab.create("http://xuner.cn", "_system");
  }

async presentConfirm() {
    let that = this;
    const alert = await this.alertCtrl.create({
        header: "退出登录",
        message: "确认退出?",
        buttons: [{
            text: "取消"
        },
        {
            text: "退出",
            handler: ()=> {
                 that.storage.remove("token");
                 that.storage.remove("datasource");
                 that.nav.navigateRoot("/login", {
                    animated: true
                });
            }
        }]
    });
    await alert.present();
  }

  isMobile() {
    return this.platfrm.is("mobile") && !this.platfrm.is("mobileweb");
  }

  isAndroid() {
    return this.isMobile() && this.platfrm.is("android");
  }

  isIos() {
    return this.isMobile() && (this.platfrm.is("ios") || this.platfrm.is("ipad") || this.platfrm.is("iphone"));
  }

httpHandler(url:string, sucess:any, option:any) {
    //option = {
    //    params: null; ,
    //    refresher: n,
    //    isLoading: true,
    //    fullCall;true
    //    error:function(l)
    //};
    //if (this.isMobile()) url = this.host + url;
    url = this.host + url;
    //console.log("url1:" + url);
    let that = this;
    that.storage.get("token").then( (value) => {
        value = value || "";
        var headers = new HttpParams().set("Authorization", value);  //.set("platform", that.platform)
        //console.log("url2:" + url + value);
        // (t = t || {}).refresher;
        let params = {};
        if (option.isLoading) {
            that.loadingCtrl.show();
        }
        if (option.params) params = option.params;
        //subscribe
        //console.log("url:" + url);
        that.http.post(url, params, { params: headers }).subscribe((res: any) => {
            //!option.refresher &&
            if (option.isLoading) that.loadingCtrl.hide();

            if (option.fullCall) {
                sucess(res);
            }
            else if (res.result == 1) {
                sucess(res.data);
            }
            else if (res.result == 1011 ) {
                that.storage.remove("token");
                that.toastCtrl.show("令牌失效，2秒后自动跳转登录页");
                setTimeout(() => {
                    that.nav.navigateRoot("/login", {
                        animated: true
                    });
                },2000);
            }
            else if (res.result == 4002) {
                that.toastCtrl.show(res.desc);
                setTimeout(() => {
                    that.nav.navigateRoot("/data-source", {
                        animated: true
                    });
                },2000);
            }
            else {
                that.toastCtrl.show(res.desc);
                console.log("错误描述" + res.code + "=", res.desc);
                if (option.refresher) option.refresher.target.complete();
            }
        },async error => {
                if (option.refresher) option.refresher.target.complete();
                if (option.isLoading) that.loadingCtrl.hide();
                if (option.error){
                    option.error(error);
                }
                else {
                    that.toastCtrl.show("网络异常，请检查网络");
                }
            });
    });
  }

  post1(url: string, body: any) {
    return new Promise((resolve, reject) => {
        this.http.post(url, body, {
            headers: new HttpHeaders(
                {
                'Content-Type': 'application/json;charset=utf-8',//application/x-www-form-urlencoded
                'Version': '1.0',
                'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYmlkIjoiZGIwMDEiLCJ1c2VyaWQiOiIwMDEiLCJyb2xlaWQiOiJlbXAiLCJuYW1lIjoiaHkxMDAiLCJtb2JpbGUiOiIxMzMxNjIyNTM4MSIsIm5iZiI6MTU3NTUxODM2NCwiZXhwIjoxNTc1NjA0NzY0LCJpYXQiOjE1NzU1MTgzNjcsImlzcyI6Imh0dHA6Ly9sb2NhbGhvc3Q6NTAxOTEiLCJhdWQiOiJodHRwOi8vbG9jYWxob3N0OjUwMTkxIn0.0HMOG-2idug2V2GIW1yNY3bCQBjZHwpwGghUbOl1A3U'
                }
            )
        }).subscribe((response) => { resolve(response); },
                (err) => { reject(err); });
    });
  }

  getRegisterCode(sucess:any, option:any) {
      this.httpHandler("/public/register/code",sucess, option);
  }
  getLoginCode(sucess:any, option:any) {
      this.httpHandler("/public/getlogincode",sucess, option);
  }
  getCheckCode(sucess:any, option:any) {
      this.httpHandler("/auth/check/code",sucess, option);
  }
  login(sucess:any, option:any) {
     this.httpHandler("/public/login",sucess, option);
  }
  register(sucess:any, option:any) {
      this.httpHandler("/public/register",sucess, option);
  }
  searchInventory(sucess:any, option:any) {
      this.httpHandler("/api/synthetical/searchInventory",sucess, option);
  }
  getInventoryProduct(sucess:any, option:any) {
      this.httpHandler("/api/synthetical/getInventoryProduct",sucess, option);
  }
  getInventorySaleProduct(sucess:any, option:any) {
      this.httpHandler("/api/synthetical/getInventorySaleProduct",sucess, option);
  }
  searchProduct(sucess:any, option:any) {
      this.httpHandler("/api/synthetical/searchProduct",sucess, option);
  }
  getSizeIventory(sucess:any, option:any) {
      this.httpHandler("/api/synthetical/getSizeIventory",sucess, option);
  }
  getSizeSaleIventory(sucess:any, option:any) {
      this.httpHandler("/api/synthetical/getSizeSaleIventory",sucess, option);
  }
  getInventorySummary(sucess:any, option:any) {
      this.httpHandler("/api/synthetical/queryInventorySummary",sucess, option);
  }
  getInventorySummaryCT(sucess:any, option:any) {
      this.httpHandler("/api/synthetical/queryInventorySummaryCT",sucess, option);
  }
  getInventorySummaryCTMX(sucess:any, option:any) {
      this.httpHandler("/api/synthetical/queryInventorySummaryCTMX",sucess, option);
  }
  getCopingSummary(sucess:any, option:any) {
      this.httpHandler("/api/synthetical/queryCopingSummary",sucess, option);
  }
  getCopingSummaryDetail(sucess:any, option:any) {
      this.httpHandler("/api/synthetical/queryCopingSummaryDetail",sucess, option);
  }
  getReceivableSummary(sucess:any, option:any) {
      this.httpHandler("/api/synthetical/queryReceivableSummary",sucess, option);
  }
  getReceivableSummaryDetail(sucess:any, option:any) {
      this.httpHandler("/api/synthetical/queryReceivableSummaryDetail",sucess, option);
  }
  queryCashBankSummary(sucess:any, option:any) {
      this.httpHandler("/api/synthetical/queryCashBankSummary",sucess, option);
  }
  getCashBankDetail(sucess:any, option:any) {
      this.httpHandler("/api/synthetical/queryCashBankDetail",sucess, option);
  }
  getProcurementSummary(sucess:any, option:any) {
      this.httpHandler("/api/synthetical/queryProcurementSummary",sucess, option);
  }
  getProcurementSummaryCT(sucess:any, option:any) {
      this.httpHandler("/api/synthetical/queryProcurementSummaryCT",sucess, option);
  }
  getProcurementSummaryCTMX(sucess:any, option:any) {
      this.httpHandler("/api/synthetical/queryProcurementSummaryCTMX",sucess, option);
  }
  getDistributionSummary(sucess:any, option:any) {
      this.httpHandler("/api/synthetical/queryDistributionSummary",sucess, option);
  }
  getDistributionSummaryCT(sucess:any, option:any) {
      this.httpHandler("/api/synthetical/queryDistributionSummaryCT",sucess, option);
  }
  getDistributionSummaryCTMX(sucess:any, option:any) {
      this.httpHandler("/api/synthetical/queryDistributionSummaryCTMX",sucess, option);
  }
  getWholesaleSummary(sucess:any, option:any) {
      this.httpHandler("/api/synthetical/queryWholesaleSummary",sucess, option);
  }
  getWholesaleSummaryCT(sucess:any, option:any) {
      this.httpHandler("/api/synthetical/queryWholesaleSummaryCT",sucess, option);
  }
  getWholesaleSummaryCTMX(sucess:any, option:any) {
      this.httpHandler("/api/synthetical/queryWholesaleSummaryCTMX",sucess, option);
  }
  getRetailSummary(sucess:any, option:any) {
      this.httpHandler("/api/retail/querySummary",sucess, option);
  }
  getRetailSummaryCT(sucess:any, option:any) {
      this.httpHandler("/api/retail/querySummaryCT",sucess, option);
  }
  getRetailSummaryCTMX(sucess:any, option:any) {
      this.httpHandler("/api/retail/querySummaryCTMX",sucess, option);
  }
  queryHome(sucess:any, option:any) {
      this.httpHandler("/api/home/queryHome",sucess, option);
  }
  queryHomeChart(sucess:any, option:any) {
      this.httpHandler("/api/home/queryHomeChart",sucess, option);
  }
  getStoreRankings(sucess:any, option:any) {
      this.httpHandler("/api/retail/queryStoreRanking",sucess, option);
  }
  getStoreReport(sucess:any, option:any) {
      this.httpHandler("/api/retail/getStoreReport",sucess, option);
  }
  getStoreReportXsmx(sucess:any, option:any) {
      this.httpHandler("/api/retail/getStoreReportXsmx",sucess, option);
  }
  getShoppingRankings(sucess:any, option:any) {
      this.httpHandler("/api/retail/queryShoppingRanking",sucess, option);
  }
  getClerkDetailInfo(sucess:any, option:any) {
      this.httpHandler("/api/retail/queryClerkDetailInfo",sucess, option);
  }
  getClerkSaleFlow(sucess:any, option:any) {
      this.httpHandler("/api/retail/queryClerkSaleFlow",sucess, option);
  }
  getProductRankings(sucess:any, option:any) {
      this.httpHandler("/api/retail/queryProductRanking",sucess, option);
  }
  getProductAssociations(sucess:any, option:any) {
      this.httpHandler("/api/retail/queryProductAssociations",sucess, option);
  }
  getProductAssociationsCT(sucess:any, option:any) {
      this.httpHandler("/api/retail/queryProductAssociationsCT",sucess, option);
  }
  getProductDkdx(sucess:any, option:any) {
      this.httpHandler("/api/retail/getProductDkdx",sucess, option);
  }
  getProductDkls(sucess:any, option:any) {
      this.httpHandler("/api/retail/getProductDkls",sucess, option);
  }
  getProductPurchase(sucess:any, option:any) {
      this.httpHandler("/api/retail/getProductPurchase",sucess, option);
  }
  getProductPurchaseDetail(sucess:any, option:any) {
      this.httpHandler("/api/retail/getProductPurchaseDetail",sucess, option);
  }
  getProductDistribution(sucess:any, option:any) {
      this.httpHandler("/api/retail/getProductDistribution",sucess, option);
  }
  getProductDistributionDetail(sucess:any, option:any) {
      this.httpHandler("/api/retail/getProductDistributionDetail",sucess, option);
  }
  getSaleCost(sucess:any, option:any) {
      this.httpHandler("/api/retail/querySaleCost",sucess, option);
  }
  getNewProductRankings(sucess:any, option:any) {
      this.httpHandler("/api/retail/queryNewProductRanking",sucess, option);
  }
  getVipConsume(sucess:any, option:any) {
      this.httpHandler("/api/vip/consume",sucess, option);
  }
  getVipConsumeInfo(sucess:any, option:any) {
      this.httpHandler("/api/vip/consume/info",sucess, option);
  }
  vipConsumeEdit(sucess:any, option:any) {
      this.httpHandler("/api/vip/consume/edit",sucess, option);
  }
  getVipConsumeFlow(sucess:any, option:any) {
      this.httpHandler("/api/vip/consume/flow",sucess, option);
  }
  getVipAnalysis(sucess:any, option:any) {
      this.httpHandler("/api/vip/analysis",sucess, option);
  }
  getVipActive(sucess:any, option:any) {
      this.httpHandler("/api/vip/active",sucess, option);
  }
  conditionSearchProduct(sucess:any, option:any) {
      this.httpHandler("/api/condition/searchProduct",sucess, option);
  }
  conditionSearchWarehouse(sucess:any, option:any) {
      this.httpHandler("/api/condition/searchWarehouse",sucess, option);
  }
  conditionSearchStore(sucess:any, option:any) {
      this.httpHandler("/api/condition/searchStore",sucess, option);
  }
  conditionSearchSupplier(sucess:any, option:any) {
      this.httpHandler("/api/condition/searchSupplier",sucess, option);
  }
  conditionSearchEmployee(sucess:any, option:any) {
      this.httpHandler("/api/condition/searchEmployee",sucess, option);
  }
  getVipType(sucess:any, option:any) {
      this.httpHandler("/api/condition/getVipType",sucess, option);
  }
  getFilePath(sucess:any, option:any) {
      this.httpHandler("/api/img/getFilePath",sucess, option);
  }
  removeFile(sucess:any, option:any) {
      this.httpHandler("/api/img/remove",sucess, option);
  }
  feedback(sucess:any, option:any) {
      this.httpHandler("/api/contact/feedback",sucess, option);
  }
  getVersion(sucess:any, option:any) {
      this.httpHandler("/public/version",sucess, option);
  }
  getBanner(sucess:any, option:any) {
      this.httpHandler("/public/banner",sucess, option);
  }
  getDataSource(sucess:any, option:any) {
      this.httpHandler("/auth/ds/getList",sucess, option);
  }
  addDataSource(sucess:any, option:any) {
      this.httpHandler("/auth/ds/add",sucess, option);
  }
  editDataSource(sucess:any, option:any) {
      this.httpHandler("/auth/ds/edit",sucess, option);
  }
  change(sucess: any, option: any) {
      let t = new Reqdata();
      t.mode = "auth_ds_change";
      this.requestData(t, sucess,false,true);

  }
  moveDataSource(sucess:any, option:any) {
      this.httpHandler("/auth/ds/moveDataSource",sucess, option);
  }
  getSubUserList(sucess:any, option:any) {
      this.httpHandler("/auth/owner/subuser/getList",sucess, option);
  }
  getReportCall(sucess:any, option:any) {
      this.httpHandler("/api/report/call/" + option.params.get("id"),sucess, option);
  }
  getReportSearch(sucess:any, option:any) {
      this.httpHandler("/api/report/search",sucess, option);
  }
  checkUser(sucess:any, option:any) {
      this.httpHandler("/auth/owner/subuser/checkUser",sucess, option);
  }
  addUser(sucess:any, option:any) {
      this.httpHandler("/auth/owner/subuser/add",sucess, option);
  }
  removeUser(sucess:any, option:any) {
      this.httpHandler("/auth/owner/subuser/remove",sucess, option);
  }
  getUserRoleList(sucess:any, option:any) {
      this.httpHandler("/auth/owner/subuser/getUserRoleList",sucess, option);
  }
  addUserRole(sucess:any, option:any) {
      this.httpHandler("/auth/owner/subuser/addUserRole",sucess, option);
  }
  getRoleList(sucess:any, option:any) {
      this.httpHandler("/auth/owner/role/getList",sucess, option);
  }
  getRoleUserList(sucess:any, option:any) {
      this.httpHandler("/auth/owner/role/getRoleUserList",sucess, option);
  }
  addRole(sucess:any, option:any) {
      this.httpHandler("/auth/owner/role/add",sucess, option);
  }
  addRoleUser(sucess:any, option:any) {
      this.httpHandler("/auth/owner/role/addRoleUser",sucess, option);
  }
  removeRole(sucess:any, option:any) {
      this.httpHandler("/auth/owner/role/remove",sucess, option);
  }
  editRole(sucess:any, option:any) {
      this.httpHandler("/auth/owner/role/edit",sucess, option);
  }
  getDictList(sucess:any, option:any) {
      this.httpHandler("/auth/owner/auth/getDictList",sucess, option);
  }
  authSubmit(sucess:any, option:any) {
      this.httpHandler("/auth/owner/auth/authSubmit",sucess, option);
  }
  userEdit(sucess:any, option:any) {
      this.httpHandler("/auth/user/edit",sucess, option);
  }
  getUser(sucess:any, option:any) {
      this.httpHandler("/auth/user/getUser",sucess, option);
  }
  getTakesStockList(sucess:any, option:any) {
      this.httpHandler("/api/business/bill/getList",sucess, option);
  }

// 网络接口请求
/*  getHomeInfo():  Observable<any> {
  return this.httpService.get("http://jsonplaceholder.typicode.com/users");
}

// 本地json文件请求
getRequestContact(): Observable<any>{
  return  this.httpService.get("assets/json/queryhome.json");
}*/

/*  getRequestData(data: Reqdata): Observable<any>{
  return  this.httpService.get("assets/json/"+data.mode+".json");
}*/
  async  requestData(data: Reqdata, e: any, showLoad: boolean = false, istest: boolean = false) {
      if (showLoad) {
          await this.loadingCtrl.show(); 
      }

    if (data.pageNum && data.pageNum > 2) data.mode = "emptys";  //模拟空数据返回 测试分页的问题

      this.http.get('assets/json/' + data.mode + '.json')
          .subscribe(async res => {

            if (showLoad) {
                  await this.loadingCtrl.hide();  // 有数据返回的时候调用关闭loading的方法
              }
            let item = res['data'];
            if(res['data']==null || res['data']==""){
                  item = res['result'];
             }
              console.log(data.mode + '------->', item);
              istest ? e(res) : e(item);
              //this.ref.detectChanges();
          }, async error => {
              if (showLoad) await this.loadingCtrl.hide(); 
              console.log(error);
          });
  }
  async  requestDataPost(data: Reqdata, e: any, showLoad: boolean = false, istest: boolean = false) {
    //const t = new Reqdata();
    //t.beginDate = this.beginDate;
    //t.endDate = this.endDate;
    //t.code = this.code;

    //t.mode = 'getStoreReport';

    if (showLoad) {
        await this.loadingCtrl.show();
    }

    //if (data.pageNum && data.pageNum > 2) data.mode = "emptys";  //模拟空数据返回 测试分页的问题
    var url ="http://47.106.253.255:99/xuner/bi/"+ data.mode;
    //var url = "http://localhost:50191/xuner/bi/" + data.mode;
    this.http.post(url, data,{
        headers: new HttpHeaders(
            {
                'Content-Type': 'application/json;charset=utf-8',//application/x-www-form-urlencoded
                'Version': '1.0',
                'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9kbnMiOiIwMDEiLCJ1bmlxdWVfbmFtZSI6Imh5MTAwIiwicm9sZSI6ImVtcCIsIm5iZiI6MTU3NDc0NzQ5OSwiZXhwIjoxNTc0ODMzODk5LCJpYXQiOjE1NzQ3NDc2OTUsImlzcyI6Imh0dHA6Ly9sb2NhbGhvc3Q6NTAxOTEiLCJhdWQiOiJodHRwOi8vbG9jYWxob3N0OjUwMTkxIn0.GlspXKi_vM1O84MRy0uDvCmaQ3oSSABW6aIZCp_WAWI'
            }
        )
    })
        .subscribe(async res => {

            if (showLoad) {
                await this.loadingCtrl.hide();  // 有数据返回的时候调用关闭loading的方法
            }
            const item = res['data'];


            console.log(data.mode + '------->', item);
            istest ? e(res) : e(item);
            //this.ref.detectChanges();
        }, async error => {
            if (showLoad) await this.loadingCtrl.hide();
            console.log(error);
        });
  }

  public createPhotos(length: number = 4):any[] {
    let photos= [];
    for (let i = 1; i < length; i++) {
          photos.push({
              originUrl: `assets/imgs/guidepage_${i}.jpg`,
              thumbnailUrl: `assets/imgs/guidepage_${i}.jpg`,
              index: i,
          });
      }
    photos[2].title = 'This is a title';
    return photos;
  }

  //buildFilePath(list, "IMG") 第一个是数据列表 第二个参数是款号字段名
  buildFilePath(l: any[], n: string ="IMG") {
    if (!n) n = "IMG";
    if (n  && l && l.length > 0) {
        let t = [];
        for (let u = 0; u < l.length; u++) {
            let item = l[u];
            let code = item[n];
            if (code) t.push(code);
        }

        if (t.length > 0) {
            let i = new HttpParams().set("productIds", t.join(','));
            this.getFilePath((e) => {

                for (let u = 0; u < l.length; u++) {
                    let item = l[u];
                    let code = item[n];
                    let y = e[code];
                    item.filePath = y || [];
                }
            },
                {
                    params: i
                });
        }
    }

  }

  imageShow(l, n) {
    //this.options.index =  n || 0;
    //var t = this.pswpCtrl.create(l, this.options);
    //t.present({
    //    animate: false
    //});
    //t.setLeavingOpts({
    //    animate: false
    //});
  }

//   async checkVersion() {
//     var l = this;
//     if (this.isMobile())
//         this.appVersion.getVersionNumber().then(function (n) {
//             var t = "";
//             l.isAndroid() ? t = "android" : l.isIos() && (t = "ios");
//             var e = new HttpParams().set("version", n).set("platform", t);
//             l.getVersion(async n => {
//                 if (n[t] && n[t].update) {
//                     const nn = await this.popoverCtrl.create({
//                         component: AppVersionPage,
//                         //translucent: true,
//                         //showBackdrop: false,
//                         enableBackdropDismiss: false,
//                         cssClass: 'popover-version',
//                         mode: 'ios',
//                         componentProps: {
//                             downloadUrl: n[t].downloadUrl,
//                             version: n[t].version,
//                             desc: n[t].desc
//                         }
//                     });
//                     await nn.present();
//                     await nn.onDidDismiss().then(x => {
//                     });

//                 }
//             }, {
//                     params: e,
//                     isLoading: false
//                 });
//         }, function () {
//             setTimeout(function () {
//                 l.checkVersion()
//             }, 500)
//         });
//   }

}//ApiService


export class iDevice {
    platform: string;
    uuid: string;
    model: string;
    version: string;
    serial: string;
}

export class Reqdata {
  category: string;
  type: string;
  tm: number;
  code: string;
  mode: string;
  beginDate: string;
  endDate: string;
  days: string;
  pageNum: number;
  sort: number;
  list: string[];
  productCode: string;
  invoiceNo: string;
}

export class XrEchart {
    buildBar(l) {
       let n = [];
        let t = [];
        let e = ["#ff7f50", "#87cefa", "#da70d6", "#32cd32", "#6495ed", "#ff69b4", "#ba55d3", "#cd5c5c", "#ffa500", "#40e0d0"];
        let u = 0;

        for (let a = 0; a < l.list.length; a++) {
            var o = l.list[a];
            n.push(o[l.tField]);
            t.push(o[l.vField]);
            o.colorStyle = e[u];
            ++u >= e.length && (u = 0);
        }
        var i = 0;
        i += l.title ? 40 : 0;
        i += l.subTitle ? 30 : 0;
        var r = {
            title: {
                text: l.title ? l.title : "",
                subtext: l.subTitle ? l.subTitle : "",
                x: "center",
                y: 10
            },
            grid: {
                left: "3%",
                y: i,
                y2: 10,
                containLabel: true
            },
            yAxis: [{
                type: "category",
                data: n,
                axisLine: {
                    show: false,
                    lineStyle: {
                        color: "#999999"
                    }
                },
                axisTick: {
                    show: false
                },
                splitLine: {
                    show: false
                }
            }],
            xAxis: [{
                axisLine: {
                    show: true,
                    lineStyle: {
                        color: "#999999"
                    }
                },
                axisTick: {
                    show: false
                },
                splitLine: {
                    show: true,
                    lineStyle: {
                        type: "dashed"
                    }
                },
                type: "value",
                axisLabel: {
                    formatter: function (l) {
                        return l >= 10000 || l <= -1000 ? (l / 1000).toFixed(0) + "k" : l >= 1000 || l <= -1000 ? (l / 1000).toFixed(1) + "k" : l
                    }
                }
            }],
            series: [{
                type: "bar",
                data: t,
                itemStyle: {
                    normal: {
                        barBorderRadius: [10, 10, 10, 10],
                        color: function (l) {
                            return e[l.dataIndex]
                        }
                    }
                },
                barWidth: 15,
                label: {
                    normal: {
                        show: true,
                        formatter: function (l) {
                            var n = l.value;
                            return n >= 10000 || n <= -1000 ? (n / 1000).toFixed(0) + "k" : n >= 1000 || n <= -1000 ? (n / 1000).toFixed(1) + "k" : 0 == n ? 0 : n.toFixed(1)
                        }
                    }
                }
            }]
        };
        return l.title || delete r.title.text,
            l.subTitle || delete r.title.subtext,
            l.title || l.subTitle || delete r.title,
            r
    }
    buildEChartLine(l) {

        var n = [], t = [];

        for (var e = 0; e < l.list.length; e++) {
            n.push(l.list[e].RQ + "月");
            t.push(l.list[e].JE);
        }
        var u = {
            title: {
                text: l.title ? l.title : "",
                subtext: l.subTitle ? l.subTitle : "",
                x: "center",
                y: 10
            },
            grid: {
                left: "3%",
                containLabel: true,
                y: 20,
                y2: 10
            },
            xAxis: [{
                type: "category",
                boundaryGap: false,
                data: n,
                axisLine: {
                    show: true,
                    lineStyle: {
                        color: "#999999"
                    }
                },
                axisTick: {
                    show: false
                }
            }],
            yAxis: [{
                type: "value",
                axisLine: {
                    show: false,
                    lineStyle: {
                        color: "#999999"
                    }
                },
                splitLine: {
                    show: true,
                    lineStyle: {
                        type: "dashed"
                    }
                },
                axisTick: {
                    show: false
                },
                axisLabel: {
                    formatter: function (l) {
                        return l >= 10000 || l <= -1000 ? (l / 1000).toFixed(0) + "k" : l >= 1000 || l <= -1000 ? (l / 1000).toFixed(1) + "k" : l
                    }
                }
            }],
            series: [{
                type: "line",
                data: t,
                smooth: true,
                itemStyle: {
                    normal: {
                        color: "#23abff",
                        shadowBlur: 200,
                        shadowColor: "rgba(0, 0, 0, 0.5)"
                    }
                },
                label: {
                    normal: {
                        show: true,
                        formatter: function (l) {
                            var n = l.value;
                            return n >= 10000 || n <= -1000 ? (n / 1000).toFixed(0) + "k" : n >= 1000 || n <= -1000 ? (n / 1000).toFixed(1) + "k" : 0 == n ? 0 : n.toFixed(1)
                        }
                    }
                }
            }]
        };
        return l.title || delete u.title.text,
            l.subTitle || delete u.title.subtext,
            l.title || l.subTitle || delete u.title,
            u
    }
}

export class dateFormat {
    formatDateCurrentWeekByFrist() {
        const l = new Date;
        l.setDate(l.getDate() - l.getDay());
        return  this.formatDateStr(l);
    };
    formatDateCurrentWeekByLast() {
        const l = new Date;
        l.setDate(l.getDate() + 6 - l.getDay());
        return this.formatDateStr(l);    
    };

    formatDateCurrentMonthFirst() {
        const l = new Date;
        l.setDate(1);
        return    this.formatDateStr(l);
    };
    formatDateCurrentMonthLast() {
        const l = new Date;
        l.setMonth(l.getMonth() + 1);
        l.setDate(0);
        return this.formatDateStr(l);
    };
    formatDateCurrentDate() {
        const l = new Date;
        return this.formatDateStr(l);
    };
    formatDateByYesterday() {
        const l = new Date;
        l.setDate(l.getDate() - 1);
        return this.formatDateStr(l);
    };
    formatDateStr(l) {
        const n = l.getFullYear();
        const  t = l.getMonth() + 1;
        const  e = l.getDate();
        return n + '-' + (t >= 10 ? t : '0' + t) + '-' + (e >= 10 ? e : '0' + e);
    };
    formatDateLastDate(l) {
        const n = new Date;
        n.setDate(n.getDate() + l);
        return
            this.formatDateStr(n);
    };
    formatStrToDate(l) {
        const n = new Date;
        const   t = l.split('-');
        n.setFullYear(parseInt(t[0]));
        n.setMonth(parseInt(t[1]) - 1);
        n.setDate(parseInt(t[2]));
        return  n;
    };

}

