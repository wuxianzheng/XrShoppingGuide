import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ApiService, Reqdata, dateFormat} from '../services/api.service';
import { HttpParams } from "@angular/common/http";
import { ModalController, IonInfiniteScroll, AlertController, ActionSheetController } from '@ionic/angular';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer/ngx';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';

@Component({
  selector: 'app-rankingsdtl',
  templateUrl: './rankingsdtl.page.html',
  styleUrls: ['./rankingsdtl.page.scss'],
})
export class RankingsdtlPage implements OnInit {

  list: any = [];
  objlist: any = '';
  
  code: string = "";
  type:string = "";
  pageNum: number;
  infiniteEnable: boolean;
  beginDate: string;
  endDate: string;
  searchstr: string = "";

  constructor(private readonly router: Router,
    private activated: ActivatedRoute,
    private alertCtrl: AlertController,
    private actionSheetCtrl: ActionSheetController,
    private api: ApiService,
    public modalCtrl: ModalController,
    private camera: Camera,
    private barcode: BarcodeScanner) { }

  ngOnInit() {
    this.activated.queryParams.subscribe((params: Params) => {
       this.code=params["code"];
       this.type=params["type"];
    });
    console.log(this.type);
    console.log(this.code);
    this.query();
  }
  
  query(e?){
    let n = this;
    this.pageNum = 1;
    this.code = this.code;
    this.type = this.type;
    this.infiniteEnable = true;
    this.requestData(a => {
          n.objlist=a;
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
    t.type = this.type;
    if(t.type=="qg"){
      t.mode = 'rankingsdtl_qg';
    }else if(t.type=="bd"){
      t.mode = 'rankingsdtl_bd';
    }
    this.api.requestData(t, e);
  }

  back() {
    window.history.back();
  }



}
