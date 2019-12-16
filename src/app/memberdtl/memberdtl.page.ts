import { Component, OnInit } from '@angular/core';
import { ApiService, Reqdata, dateFormat, XrEchart } from '../services/api.service';
import { NavController, Platform, NavParams } from '@ionic/angular';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-memberdtl',
  templateUrl: './memberdtl.page.html',
  styleUrls: ['./memberdtl.page.scss'],
})
export class MemberdtlPage implements OnInit {
 
  code: string;
  beginDate: string;
  endDate: string;
  list: any = [];
  codelist: any;
  tagVoList: any=[];
  lastOrderPay:string;

  constructor(  private ApiService: ApiService,
    private echart: XrEchart,
    private activated: ActivatedRoute,
    private readonly router: Router
    ) { }
 
  back() {
    window.history.back();
  }

  ngOnInit():void {

    let params= this.activated.snapshot.queryParams;
      this.code = params["code"];
      this.beginDate = params["beginDate"];
      this.endDate = params["endDate"];
    
   this.query();
  }


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

  requestData(e, n?) {
    const t = new Reqdata();
    t.code = this.code;
    t.mode = 'memberdtl';
    this.ApiService.requestData(t, e);
}

  query(e?) {
    let n = this;
    this.requestData(a => {
      n.list=a;
      n.tagVoList=a[0]['tagVoList'];
      n.lastOrderPay = this.convertToDate(n.list[0].payInfo.lastOrderPaytime);
      console.log(n.tagVoList);
    }, e);
   }
 
   topage(type: string,vcode:any) {
    if (type === 'labeldtl'){
        this.router.navigate(['/labeldtl'], {
            queryParams: {
              codelist:JSON.stringify(this.tagVoList)
            }
        });
      }

    if (type === 'discountcoupon'){
        this.router.navigate(['/discountcoupon'], {
        //this.navCtrl.navigateForward('/product-dkdx', {
            queryParams: {
                code: vcode,
                beginDate: this.beginDate,
                endDate: this.endDate
            }
        });
      }
}



}
