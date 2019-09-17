import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ApiService, Reqdata, dateFormat} from '../services/api.service';
import { HttpParams } from "@angular/common/http";
import { ModalController, IonInfiniteScroll, AlertController, ActionSheetController } from '@ionic/angular';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer/ngx';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';


@Component({
  selector: 'app-member',
  templateUrl: './member.page.html',
  styleUrls: ['./member.page.scss'],
})
export class MemberPage implements OnInit {

  list: any = [];
  code: string = "";
  pageNum: number;
  infiniteEnable: boolean;
  beginDate: string;
  endDate: string;

  constructor( private readonly router: Router,
    private activated: ActivatedRoute,
    private alertCtrl: AlertController,
    private actionSheetCtrl: ActionSheetController,
    private api: ApiService,
    public modalCtrl: ModalController,
    private camera: Camera,
    private barcode: BarcodeScanner) { }

  ngOnInit() {
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
    t.mode = 'member';
    this.api.requestData(t, e);
    // this.api.requestData(t,function (e) {
    //     n.data = e;
    //   });
}

  query(e?){
    let n = this;
    this.pageNum = 1;
    this.infiniteEnable = true;
    this.requestData(a => {
      if (a['list'].length > 0) {
          n.list=a['list'];
          console.log(this.list);
          n.pageNum++;
        }
        else{
            n.list.length = 0;
        }
    }, e);
  }
   
  showdetail(vcode: string) {
    // alert('detail' + rowno);
     this.router.navigate(['/memberdtl'], {
         queryParams: {
             code: vcode,
             //beginDate: this.beginDate,
             //endDate: this.endDate
         }
     });
   }

  back() {
    window.history.back();
  }

}
