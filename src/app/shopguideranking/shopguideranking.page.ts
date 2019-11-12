import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ApiService, Reqdata, dateFormat} from '../services/api.service';
import { HttpParams } from "@angular/common/http";
import { ModalController, IonInfiniteScroll, AlertController, ActionSheetController } from '@ionic/angular';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer/ngx';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';

@Component({
  selector: 'app-shopguideranking',
  templateUrl: './shopguideranking.page.html',
  styleUrls: ['./shopguideranking.page.scss'],
})
export class ShopguiderankingPage implements OnInit {

  constructor(
    private readonly router: Router,
    private activated: ActivatedRoute,
    private alertCtrl: AlertController,
    private actionSheetCtrl: ActionSheetController,
    private api: ApiService,
    public modalCtrl: ModalController,
    private camera: Camera,
    private barcode: BarcodeScanner
  ) { }
    
  list: any = [];
  code: string = "";
  pageNum: number;
  infiniteEnable: boolean;
  beginDate: string;
  endDate: string;
  searchstr: string = "";

  ngOnInit() {
    this.query();

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
    t.mode = 'shopguideranking';
    this.api.requestData(t, e);
   }
  query(e?){
    let n = this;
    this.pageNum = 1;
    this.infiniteEnable = true;
    this.requestData(a => {
      if (a.length > 0) {
          n.list=a;
          console.log(this.list);
          n.pageNum++;
        }
        else{
            n.list.length = 0;
        }
    }, e);
  }







  addshopguide() {
        this.router.navigate(['/addshopguide'], {
            queryParams: {
                // code: vcode,
                // beginDate: this.beginDate,
                // endDate: this.endDate
            }
        });
      // alert(this.item.productCode);
  }

}
