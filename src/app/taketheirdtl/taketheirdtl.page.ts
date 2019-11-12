import { Component, OnInit } from '@angular/core';
import { ApiService, Reqdata, dateFormat, XrEchart } from '../services/api.service';
import { NavController, Platform, NavParams } from '@ionic/angular';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-taketheirdtl',
  templateUrl: './taketheirdtl.page.html',
  styleUrls: ['./taketheirdtl.page.scss'],
})
export class TaketheirdtlPage implements OnInit {

  code: string;
  beginDate: string;
  endDate: string;
  list: any = [];
  lastOrderPay:string;
  item: any;
  pageNum: number;
  infiniteEnable: boolean;
  searchstr: string = "";
  coutorder :number;
   
  constructor( private ApiService: ApiService,
    private echart: XrEchart,
    private activated: ActivatedRoute,
    private readonly router: Router) { }

  ngOnInit() {
    this.activated.queryParams.subscribe((params: Params) => {
        this.code = params["code"];
    });
    this.item = {
      id: 0,
      name:'',
      phone: '',
      age: '',
      birthMonDay: '',
      vipLevelName: '',
      point: 0,
      pointName: '',
      EChartOption: {}
    };
    this.query(this.code);
  }

  query(e?){
    let n = this;
    this.pageNum = 1;
    this.infiniteEnable = true;
    this.requestData(a => {
      this.item = a['customerInfoVo'];
      this.coutorder=a['orderList'].length;
      if (this.coutorder> 0) {
          n.list=a['orderList']
          n.pageNum++;
        }
        else{
            n.list.length = 0;
        }
    }, e);
  }

  requestData(e, n?) {
    if ("" == this.code) {
        this.ApiService.toastCtrl.show("搜索内容不能为空");
       // if (n) n.target.complete();
        return;
    }
    const t = new Reqdata();
    t.pageNum = this.pageNum;
    t.code = this.code;
    t.mode = 'taketheirdtl';
    this.ApiService.requestData(t, e);
    //this.api.requestData(t,function (e) {
    //  n.data = e;
    //});
  }

  //this.ApiService.convertToDate(n.list[this.count].customerOrder.gmtCreate);

  back() {
    window.history.back();
  }

  topage(type: string,vcode:any) {
    if (type === 'discountcoupondtl'){
      this.ApiService.toastCtrl.show("测试提货");
        // this.router.navigate(['/discountcoupondtl'], {
        //     queryParams: {
        //      codelist:JSON.stringify(this.list),
        //      code: vcode,
        //     }
        // });
      }
    }


}
