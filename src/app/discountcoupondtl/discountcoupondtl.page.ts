import { Component, OnInit } from '@angular/core';
import { ApiService, Reqdata, dateFormat, XrEchart } from '../services/api.service';
import { NavController, Platform, NavParams } from '@ionic/angular';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-discountcoupondtl',
  templateUrl: './discountcoupondtl.page.html',
  styleUrls: ['./discountcoupondtl.page.scss'],
})
export class DiscountcoupondtlPage implements OnInit {

  code: string;
  beginDate: string;
  endDate: string;
  list: any = [];
  codelist: any;
  lastOrderPay:string;

  constructor(private ApiService: ApiService,
    private echart: XrEchart,
    private activated: ActivatedRoute,
    private readonly router: Router) { }

  ngOnInit() {
    let params= this.activated.snapshot.queryParams;
      this.list = JSON.parse(params["codelist"]);
      this.code=params["code"];
    
  }
  
  back() {
    window.history.back();
  }

}
