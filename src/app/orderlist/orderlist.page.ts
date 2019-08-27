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

    photos: any[] = [];
    echartOption: any = {};
    pageNum: number;
    // sort: number;
    list: any = [];
    paramsList: any = [];
    infiniteEnable: boolean;

    category: string = "1";
    code: string = "";
    beginDate: string;
    endDate: string;

    isend: boolean;
    isFirstPage: boolean;
    totop: boolean;
    pagesize: number;

  constructor(
    private readonly router: Router,
        private activated: ActivatedRoute,
       // private alertCtrl: AlertController,
        private api: ApiService,
        private dateFormat: dateFormat,
      //  private echart: XrEchart,
        public modalCtrl: ModalController
    ) { }

  ngOnInit() {
  }
  query(e?) {
    let n = this;
    this.pageNum = 1;
    this.infiniteEnable = true;
    // this.requestData(a => {
    //     if (a.length > 0) {
    //         n.list = a;
    //         n.buildEChartOption();
    //         n.pageNum++;
    //     }
    //     else{
    //         n.list.length = 0;
    //       }
    // }, e);
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
