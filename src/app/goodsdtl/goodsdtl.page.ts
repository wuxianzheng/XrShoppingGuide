import { Component, OnInit } from '@angular/core';
import { ApiService, Reqdata, dateFormat, XrEchart } from '../services/api.service';
import { NavController, Platform, NavParams } from '@ionic/angular';
import { ActivatedRoute, Params, Router } from '@angular/router';



@Component({
  selector: 'app-goodsdtl',
  templateUrl: './goodsdtl.page.html',
  styleUrls: ['./goodsdtl.page.scss'],
})
export class GoodsdtlPage implements OnInit {

    code: string;
    beginDate: string;
    endDate: string;
    item: any;

    data: any = {
      gdlist: [],//商品
      // syfs: [],//收银结算明细
      // czfs: [],//收银结算明细（储值）
      // dgyj: [],//导购业绩
      // dddx: []  //进销存明细
    };

  constructor(
        private ApiService: ApiService,
        private echart: XrEchart,
        private activated: ActivatedRoute,
        private readonly router: Router
  ) { }

  ngOnInit(): void {
   
    this.item = {
      id: 0,
      productId: 0,
      supplierId: 0,
      previewJson: '',
      attributesJson: '',
      tags: '',
      name: '',
      picUrl: '',
      norms1Id: '',
      norms2Id: '',
      gmtUpdate: 1566804240000,
      gmtCreate: 1565226574000,
      limitCount: 0,
      limitDelivery: 0,
      commissionRate: '',
      commissionValue: '',
      commissionType: 0,
      supplyType: 0,
      supplyStoreId: '',
      couponDisable: 0,
      memberDiscountDisable: 0,
      memberLevel: 0,
      supplySalesId: '',
      dist: 0,
      productCode: '',
      limitPoint: 1,
      description: '',
      miniappProductInfo: '',
      supportAppointment: 0
    };
    this.activated.queryParams.subscribe((params: Params) => {
          this.code = params["code"];
          this.beginDate = params["beginDate"];
          this.endDate = params["endDate"];
        });
    this.query();
  }

  query() {
      let n = this;
      const t = new Reqdata();
      t.beginDate = this.beginDate;
      t.endDate = this.endDate;
      t.code = this.code;
      // for (var a = 0; a < this.paramsList.length; a++)
      //   t.list[a]=this.paramsList[a].code;

      t.mode = 'goodsdtl';
      this.ApiService.requestData(t,function (e) {
        n.item = e['stockVo']['productSupplier'];
        // console.log(this.item);
      });
}

  back() {
    window.history.back();
  }

}
