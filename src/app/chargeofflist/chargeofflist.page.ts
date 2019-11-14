import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ApiService, Reqdata, dateFormat} from '../services/api.service';
import { HttpParams } from "@angular/common/http";
import { ModalController, IonInfiniteScroll, AlertController, ActionSheetController } from '@ionic/angular';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer/ngx';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';
import { ModalConditionPage  } from '../modal-condition/modal-condition.page';

@Component({
  selector: 'app-chargeofflist',
  templateUrl: './chargeofflist.page.html',
  styleUrls: ['./chargeofflist.page.scss'],
})
export class ChargeofflistPage implements OnInit {

  constructor(private readonly router: Router,
    private activated: ActivatedRoute,
    private alertCtrl: AlertController,
    private actionSheetCtrl: ActionSheetController,
    private api: ApiService,
    public modalCtrl: ModalController,
    private camera: Camera,
    private barcode: BarcodeScanner) { }

    list: any = [];
    objlist: any = '';
    code: string = "";
    pageNum: number;
    infiniteEnable: boolean;
    beginDate: string;
    endDate: string;
    searchstr: string = "";
    paramsList: any = [];

    ngOnInit() {
      this.query();
    }

    query(e?){
      let n = this;
      this.pageNum = 1;
      this.code = this.code;
      this.infiniteEnable = true;
      this.requestData(a => {
            n.list=a['list'];
            n.pageNum++;
      }, e);
    }

    requestData(e, n?) {
      // if ("" == this.code) {
      //     this.api.toastCtrl.show("搜索内容不能为空");
      //     if (n) n.target.complete();
      //     return;
      // }
      const t = new Reqdata();
      t.pageNum = this.pageNum;
      t.code = this.code;
      t.mode = 'activityresult';
      this.api.requestData(t, e);
    }

    query2(e?){
      this.code=e;
      this.query(this.code);
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

}
