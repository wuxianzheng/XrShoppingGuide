import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ApiService, Reqdata, dateFormat} from '../services/api.service';
import { HttpParams } from "@angular/common/http";
import { ModalController, IonInfiniteScroll, AlertController, ActionSheetController } from '@ionic/angular';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer/ngx';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';

@Component({
  selector: 'app-taketheir',
  templateUrl: './taketheir.page.html',
  styleUrls: ['./taketheir.page.scss'],
})
export class TaketheirPage implements OnInit {
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
  }

  
 //输入框每次改变后获取输入框内的值
 Change(e) {
  this.searchstr=e;
}

//单击按钮触发事件
search() {
  this.showdetail(this.searchstr);
}
//回车触发事件
keyup(e){
   if (e.keyCode == 13) {
      this.showdetail(this.searchstr);
     }
}

showdetail(vcode: string) {
   this.router.navigate(['/taketheirdtl'], {
       queryParams: {
           code: vcode
       }
   });
 }

  back() {
    window.history.back();
  }

}
