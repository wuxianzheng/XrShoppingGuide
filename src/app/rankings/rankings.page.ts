import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ApiService, Reqdata, dateFormat} from '../services/api.service';
import { HttpParams } from "@angular/common/http";
import { ModalController, IonInfiniteScroll, AlertController, ActionSheetController } from '@ionic/angular';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer/ngx';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';

@Component({
  selector: 'app-rankings',
  templateUrl: './rankings.page.html',
  styleUrls: ['./rankings.page.scss'],
})
export class RankingsPage implements OnInit {
  
  list: any = [];
  memberlist: any = '';
  salerlist: any = '';
  fanslist: any = '';
  code: string = "";
  pageNum: number;
  infiniteEnable: boolean;
  beginDate: string;
  endDate: string;
  searchstr: string = "";

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
    this.query('bd');
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
    if(t.code=="bd"){
      t.mode = 'rankings_bd';
    }else if(t.code=="qg"){
      t.mode = 'rankings_qg';
    }
    this.api.requestData(t, e);
  }
 
  query(e?){
    let n = this;
    this.pageNum = 1;
    this.code=e;
    this.infiniteEnable = true;
    this.requestData(a => {
          n.memberlist=a['member'];
          n.salerlist=a['saler'];
          n.fanslist=a['fans'];
          n.pageNum++;
    }, e);
  }

  query2(e?){
    this.code=e;
    this.query(this.code);
  }

  topage(type: string,vcode:any) {
    if (type === 'rankingsdtl'){
        this.router.navigate(['/rankingsdtl'], {
            queryParams: {
             code: vcode,
             type: this.code
            }
        });
      }
    }


}
