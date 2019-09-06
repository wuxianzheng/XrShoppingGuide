import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ApiService, Reqdata, dateFormat} from '../services/api.service';
import { HttpParams } from "@angular/common/http";
import { ModalController, IonInfiniteScroll, AlertController, ActionSheetController } from '@ionic/angular';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer/ngx';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';


@Component({
  selector: 'app-goodslist',
  templateUrl: './goodslist.page.html',
  styleUrls: ['./goodslist.page.scss'],
})
export class GoodslistPage implements OnInit {
   
  list: any = [];
  tm: number = 0;
  code: string = "";
  pageNum: number;
  infiniteEnable: boolean;

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

  ngOnInit() {
      this.query();
  }

  search() {
    this.tm = 0;
    this.query();
  }


  requestData(e, n?) {
    // if ("" == this.code) {
    //     this.api.toastCtrl.show("搜索内容不能为空");
    //     if (n) n.target.complete();
    //     return;
    // }
    // if (this.code.length > 50) {
    //     this.api.toastCtrl.show("搜索内容太长，请查询50个字符以内的数据");
    //     if (n) n.target.complete();
    //     return;
    // }
    const t = new Reqdata();
    t.pageNum = this.pageNum;
    t.code = this.code;
    t.tm = this.tm;

    t.mode = 'goods';
    this.api.requestData(t, e);
}

  query(e?){
    let n = this;
    this.pageNum = 1;
    this.infiniteEnable = true;
    this.requestData(a => {
        if (a.length > 0) {
            n.list = a;
            console.log(a);
            //n.buildEChartOption();
            n.pageNum++;
        }
        else{
            n.list.length = 0;
          }
    }, e);
  }


  back() {
    window.history.back();
  }
  
  goodsadd() {
    this.router.navigate(['/goodsadd'], {
        queryParams: {
            // code: vcode,
            // beginDate: this.beginDate,
            // endDate: this.endDate
        }
      });
     // alert(this.item.productCode);
   }

}

