import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ApiService, Reqdata, dateFormat} from '../services/api.service';
import { HttpParams } from "@angular/common/http";
import { ModalController, IonInfiniteScroll, AlertController, ActionSheetController } from '@ionic/angular';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer/ngx';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';


@Component({
  selector: 'app-activityresult',
  templateUrl: './activityresult.page.html',
  styleUrls: ['./activityresult.page.scss'],
})
export class ActivityresultPage implements OnInit {

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


}
