import {  Component, OnInit, EventEmitter, Input, Output } from '@angular/core';
import { SafeStyle } from "@angular/platform-browser";
import { NavController, NavParams,PopoverController } from '@ionic/angular';
import { PreviewimgPage } from '../previewimg/previewimg.page';
import { ApiService, Reqdata, dateFormat} from '../services/api.service';

@Component({
  selector: 'app-goodsadd',
  templateUrl: './goodsadd.page.html',
  styleUrls: ['./goodsadd.page.scss'],
})
export class GoodsaddPage implements OnInit {
  imageUrl: SafeStyle;


  files: any;
  uploadPictureNum: any;
  taskProvider : any;
  sanitizer : any;
  previewImageUrl : any;


  constructor(
       public PopoverController: PopoverController ,
       private ApiService: ApiService,
    ) { }
    
  back() {
    window.history.back();
  }

  ngOnInit() {
  }

   selectPicture(event:any){
      this.files = event.target.files;
      for (let index=0; index < this.files.length; index++){
            this.uploadPictureNum = this.files[index];
            this.setBackgroundImg(this.files[index],'');
            // this.ApiService.uploadPicture(this.files[index]).subscribe(
            //   (res)=>{
            //        this.setBackgroundImg(this.files[index],res);
            //   },
            //   (error)=>{
            //       console.log(error);
            //   }
            // );
      }
   }

//set background-img for li element
  setBackgroundImg(file: File, value: string){
    let url = 'url('+ window.URL.createObjectURL(file) +')';
    let safeUrl = this.sanitizer.bypassSecurityTrustStyle(url);
    this.previewImageUrl.push({fileUrl:safeUrl, value:value});
}


 // preview image, use popover
  previewImg(url: SafeStyle){

    const  popover = this.PopoverController.create({component:PreviewimgPage});
    // popover.onDidDismiss((data)=>{
    //     //delete image
    //     console.log(data);
    //     if(data){
    //       this.previewImageUrl = this.previewImageUrl.filter((image)=>image.fileUrl !== url);
    //       this.uploadPictureNum--;
    //     }
    // });
    // popover.present();
  }



}
