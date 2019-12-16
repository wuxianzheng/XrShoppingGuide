import { Component, OnInit } from '@angular/core';
import { ApiService, Reqdata, dateFormat, XrEchart } from '../services/api.service';
import { NavController, Platform, NavParams } from '@ionic/angular';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-orderdtl',
  templateUrl: './orderdtl.page.html',
  styleUrls: ['./orderdtl.page.scss'],
})
export class OrderdtlPage implements OnInit {
    code: string;
    beginDate: string;
    endDate: string;
    list: any = [];
    lastOrderPay:string;

  constructor( 
      private ApiService: ApiService,
      private echart: XrEchart,
      private activated: ActivatedRoute,
      private readonly router: Router
    ) { }

  ngOnInit():void {
    let params= this.activated.snapshot.queryParams;
      this.code = params["code"];
      this.beginDate = params["beginDate"];
      this.endDate = params["endDate"];
     

    this.query();
   }

   requestData(e, n?) {
    const t = new Reqdata();
    t.code = this.code;
    t.mode = 'Dzorderlistdtl';
    this.ApiService.requestData(t, e);
  }

  query(e?) {
    let n = this;
    this.requestData(a => {
      n.list=a;
      //n.lastOrderPay = this.ApiService.convertToDate(n.list[0].payInfo.lastOrderPaytime);
      console.log(this.list);
    }, e);
   }

  back() {
    window.history.back();
  }

  showCondition(){


  }

}
