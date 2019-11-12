import { Component, OnInit } from '@angular/core';
import { ApiService, Reqdata, dateFormat, XrEchart } from '../services/api.service';
import { NavController, Platform, NavParams } from '@ionic/angular';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-discountcoupon',
  templateUrl: './discountcoupon.page.html',
  styleUrls: ['./discountcoupon.page.scss'],
})
export class DiscountcouponPage implements OnInit {

  constructor( private ApiService: ApiService,
    private echart: XrEchart,
    private activated: ActivatedRoute,
    private readonly router: Router) { }
   
    code: string;
    beginDate: string;
    endDate: string;
    list: any = [];
    codelist: any;
    lastOrderPay:string;

    back() {
      window.history.back();
    }

  ngOnInit() {
    this.query();
  }


requestData(e, n?) {
    const t = new Reqdata();
    t.code = this.code;
    t.mode = 'discountcoupon';
    this.ApiService.requestData(t, e);
}

//this.ApiService.convertToDate(n.list[0].payInfo.lastOrderPaytime);
  query(e?) {
    let n = this;
    this.requestData(a => {
      n.list=a['couponList'];
      console.log(n.list);
    }, e);
   }

   topage(type: string,vcode:any) {
    if (type === 'discountcoupondtl'){
        this.router.navigate(['/discountcoupondtl'], {
            queryParams: {
             codelist:JSON.stringify(this.list),
             code: vcode,
            }
        });
      }
    }

}
