import { Component, OnInit } from '@angular/core';
import { ModalConditionPage  } from '../modal-condition/modal-condition.page';
import { ApiService, Reqdata, dateFormat} from '../services/api.service';
import { HttpParams } from "@angular/common/http";
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ModalController, IonInfiniteScroll } from '@ionic/angular';

@Component({
  selector: 'app-orderlist',
  templateUrl: './orderlist.page.html',
  styleUrls: ['./orderlist.page.scss'],
})
export class OrderlistPage implements OnInit {


    pageNum: number;
    list: any = [];
    paramsList: any = [];
    infiniteEnable: boolean;
    code: string = "";
    beginDate: string;
    endDate: string;
    gmtCreate: string;
    count: number;


  constructor(
    private readonly router: Router,
        private activated: ActivatedRoute,
        private api: ApiService,
        private dateFormat: dateFormat,
        public modalCtrl: ModalController
    ) { }

  ngOnInit() {
    this.query();
  }

  requestData(e, n?) {
    const t = new Reqdata();
    t.pageNum = this.pageNum;
    t.code = this.code;
    t.mode = 'Dzorderlist';
    this.api.requestData(t, e);
    // this.api.requestData(t,function (e) {
    //     n.data = e;
    // });
  }


    query(e?) {
      let n = this;
      this.pageNum = 1;
      this.count = 0;

      this.requestData(a => {
        if (a['customerOrders'].length > 0) {
            n.list=a['customerOrders'];
            n.gmtCreate=this.api.convertToDate(n.list[this.count].customerOrder.gmtCreate);
            this.count++;
            console.log(this.count);
          }
          else{
              n.list.length = 0;
          }
      }, e);
  }

showdetail(vcode: string) {
  // alert('detail' + rowno);
   this.router.navigate(['/orderdtl'], {
       queryParams: {
           code: vcode,
           //beginDate: this.beginDate,
           //endDate: this.endDate
       }
   });
 }

  async showCondition() {

    // alert("ok");
    let e = this;
    const n = await this.modalCtrl.create({
        component: ModalConditionPage,
        componentProps: {
            categoryDate: {
                enable: true,
                beginDate: this.beginDate,
                endDate: this.endDate
            },
            categoryEmployee: {
                enable: true,
                list: this.paramsList
            },
            beginDate: e.beginDate,
            endDate: e.endDate
        }
    });
    await n.present();
    await n.onDidDismiss().then(data => {
        let x: any = data.data;
        e.beginDate = x.beginDate;
        e.endDate = x.endDate;
        e.paramsList = x.list;
        e.query();
    });

}

  back() {
    window.history.back();
  }

}
