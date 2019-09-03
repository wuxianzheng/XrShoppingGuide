import { Component, EventEmitter, Input, OnInit } from '@angular/core';
import { SafeStyle } from '@angular/platform-browser';
import { NavController, NavParams} from '@ionic/angular';

@Component({
  selector: 'app-previewimg',
  templateUrl: './previewimg.page.html',
  styleUrls: ['./previewimg.page.scss'],
})
export class PreviewimgPage implements OnInit {
    imageUrl: SafeStyle;
    constructor(
        public navParams: NavParams,
       // public viewCtrl: ViewController,
        ){}
 
    ngOnInit(){
        if(this.navParams.data){
            this.imageUrl = this.navParams.data.imageUrl;
        }
    }
 
    dismissImage(option: string){
        //delete image
        if(option==='delete'){
           // this.viewCtrl.dismiss('delete image');
        }
        //dismiss image only
        else{
           // this.viewCtrl.dismiss();
        }
    }
}
