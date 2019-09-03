import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpParams, HttpHeaders } from "@angular/common/http";
import { LoadingController, ToastController, AlertController, PopoverController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { Platform } from '@ionic/angular';
import { CanLoad, Router } from '@angular/router';


import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';


@Injectable({
  providedIn: 'root'
})

export class ApiService {

  host: string = "http://api.hnbs8.cn/cube";    //"http://192.168.0.12/xrcube";
  platform: string = "web";
  datasource: object = {};
  user: object = { name: "" };
  toastCtrl: any = {
      show: {}
  };

  loadingCtrl: any = {
      show: {},
      hide: {}
  };
  loading: any = {};

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
        private LoadingCtrl: LoadingController,
        private ToastCtrl: ToastController,
        private popoverCtrl: PopoverController,
        private alertCtrl: AlertController,
        private iab: InAppBrowser,
        private router: Router,
        public storage: Storage
  ) {
    if (this.isAndroid())
        { this.platform = "android";}
    else if (this.isIos())
        {
            this.platform = "ios";
        }

    this.storage.get("datasource").then(res => {
          this.datasource = res
      });

    this.storage.get("user").then(res => {
          this.user = res
      });
    this.toastCtrl.show = async function (msg:string) {
          const nn = await ToastCtrl.create({
              message: msg,
              duration: 1500,
              position: "top"
          });
          await nn.present();
      };
    this.loadingCtrl.show = async function () {

          this.loading =   await LoadingCtrl.create({
              showBackdrop: false,
              duration: 5000
          });
          await this.loading.present();
           // this.loading = nn; 

      };
    this.loadingCtrl.hide = async function () {
          await this.loading.dismiss();
      }
  }

  setMenuList(data) {
      this.menuList = data;
  }
  getMenuList() {
   // this.menuList.length=7;
    console.log(this.menuList.length)
      if (!this.menuList.length) {
          let that = this;
          this.change(l => {
              if (1 == l.result) {
                  let t = l.data;
                  that.menuList = t.menuList;
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

//   uploadPicture(file:File):Observable<any>{
// 	    const formData: any = new FormData();
// 	    formData.append('file',file,file.name);
// 	    return this.that.http.post(this.getServiceUrl(), formData).map((res)=>{
// 	         let restResult = res.json() as RestResult<string>;
// 	          return restResult.value;
// 	      });
//     }


async presentConfirm() {

    const alert = await this.alertCtrl.create({
        header: "退出登录",
        message: "确认退出?",
        buttons: [{
            text: "取消"
        },
        {
            text: "退出",
            handler: ()=> {
                this.storage.remove("token");
                this.storage.remove("datasource");
                this.router.navigate(["/LoginPage", {},
                    {
                        animate: true
                    }]);
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
      if (this.isMobile()) url = this.host + url;

      let that = this;
      that.storage.get("token").then( async(value) => {
          value = value || "";
          var headers = new HttpHeaders().set("token", value).set("platform", that.platform);
          // (t = t || {}).refresher;

          if (option.isLoading) {

              await that.loadingCtrl.show(); 
          }
          var params = {};
          if (option.params) params = option.params;

          that.http.post(url, params, { headers: headers }).subscribe(async(res: any) => {
              //!option.refresher &&
              if ( option.isLoading)  await that.loadingCtrl.hide();

              if (option.fullCall) {
                  sucess(res);
              }
              else if (1 == res.result) {
                  sucess(res.data);
              }
              else if (1011 == res.result) {
                  that.storage.remove("token");
                   that.toastCtrl.show("令牌失效，2秒收自动跳转登录页");

                  setTimeout(() => {
                      that.router.navigate(["/LoginPage", {},
                          {
                              animate: true
                          }]);
                  },
                      2e3);
              }
              else if (4002 == res.result) {
                  that.toastCtrl.show(res.desc);
                  setTimeout(() => {
                      that.router.navigate(["/DataSourcePage", {},
                          {
                              animate: true
                          }])
                  },
                      2e3);
              }

              else {
                  that.toastCtrl.show(res.desc);
                  console.log("错误描述" + res.code + "=", res.desc);
                  if (option.refresher) option.refresher.target.complete();

              }
          },   async error => {
                  if (option.refresher) option.refresher.target.complete();
                  if (option.isLoading) await that.loadingCtrl.hide();

                  if (option.error)
                      option.error(error);
                  else {
                      that.toastCtrl.show("网络异常，请检查网络");

                  }
              });
         })
  } 

  getRegisterCode(sucess:any, option:any) {
      this.httpHandler("/public/register/code",sucess, option);
  }
  getLoginCode(sucess:any, option:any) {
      this.httpHandler("/public/login/code",sucess, option);
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
    //const t = new Reqdata();
    //t.beginDate = this.beginDate;
    //t.endDate = this.endDate;
    //t.code = this.code;
    // for (var a = 0; a < this.paramsList.length; a++)
    //   t.list[a]=this.paramsList[a].code;

    //t.mode = 'getStoreReport';

      if (showLoad) {
          await this.loadingCtrl.show(); 
      }

    if (data.pageNum && data.pageNum > 2) data.mode = "emptys";  //模拟空数据返回 测试分页的问题

      this.http.get('assets/json/' + data.mode + '.json')
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

}

export class Reqdata {
  category: string;
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
              containLabel: !0
          },
          yAxis: [{
              type: "category",
              data: n,
              axisLine: {
                  show: !1,
                  lineStyle: {
                      color: "#999999"
                  }
              },
              axisTick: {
                  show: !1
              },
              splitLine: {
                  show: !1
              }
          }],
          xAxis: [{
              axisLine: {
                  show: !0,
                  lineStyle: {
                      color: "#999999"
                  }
              },
              axisTick: {
                  show: !1
              },
              splitLine: {
                  show: !0,
                  lineStyle: {
                      type: "dashed"
                  }
              },
              type: "value",
              axisLabel: {
                  formatter: function (l) {
                      return l >= 1e4 || l <= -1e3 ? (l / 1e3).toFixed(0) + "k" : l >= 1e3 || l <= -1e3 ? (l / 1e3).toFixed(1) + "k" : l
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
                      show: !0,
                    formatter: function (l) {
                        var n = l.value;
                        return n >= 1e4 || n <= -1e3 ? (n / 1e3).toFixed(0) + "k" : n >= 1e3 || n <= -1e3 ? (n / 1e3).toFixed(1) + "k" : 0 == n ? 0 : n.toFixed(1)
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
              containLabel: !0,
              y: 20,
              y2: 10
          },
          xAxis: [{
              type: "category",
              boundaryGap: !1,
              data: n,
              axisLine: {
                  show: !0,
                  lineStyle: {
                      color: "#999999"
                  }
              },
              axisTick: {
                  show: !1
              }
          }],
          yAxis: [{
              type: "value",
              axisLine: {
                  show: !1,
                  lineStyle: {
                      color: "#999999"
                  }
              },
              splitLine: {
                  show: !0,
                  lineStyle: {
                      type: "dashed"
                  }
              },
              axisTick: {
                  show: !1
              },
              axisLabel: {
                  formatter: function (l) {
                      return l >= 1e4 || l <= -1e3 ? (l / 1e3).toFixed(0) + "k" : l >= 1e3 || l <= -1e3 ? (l / 1e3).toFixed(1) + "k" : l
                  }
              }
          }],
          series: [{
              type: "line",
              data: t,
              smooth: !0,
              itemStyle: {
                  normal: {
                      color: "#23abff",
                      shadowBlur: 200,
                      shadowColor: "rgba(0, 0, 0, 0.5)"
                  }
              },
              label: {
                  normal: {
                      show: !0,
                      formatter: function (l) {
                          var n = l.value;
                        return n >= 1e4 || n <= -1e3 ? (n / 1e3).toFixed(0) + "k" : n >= 1e3 || n <= -1e3 ? (n / 1e3).toFixed(1) + "k" : 0 == n ? 0 : n.toFixed(1)
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
      return  this.formatDateStr(n);
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
