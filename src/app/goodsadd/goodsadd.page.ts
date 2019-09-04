import {  Component, OnInit, EventEmitter, Input, Output } from '@angular/core';
import { SafeStyle } from "@angular/platform-browser";
import { NavController, NavParams,PopoverController } from '@ionic/angular';
import { PreviewimgPage } from '../previewimg/previewimg.page';
import { ApiService, Reqdata, dateFormat} from '../services/api.service';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';

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
  result : any;

  currentImage:any = true;//点击之后影藏当前的图片，显示loading
  ImageScale:any;//后台返回的缩略图
  uploadLinFail:false;//loading默认false，执行上传过程中的加载动画
  constructor(
       public PopoverController: PopoverController ,
       private ApiService: ApiService,
       private camera: Camera,
    ) { 

      // this.result = ""
    
      // this.ApiService.get("http://jsonplaceholder.typicode.com/users")
      // .subscribe(res => {
      
      //   //返回结果，直接是json形式
        
      //   this.result = res.lon;
        
      // }, error => {
      
      //   //错误信息
        
      // });
    }
    
  back() {
    window.history.back();
  }

  ngOnInit() {
  }


  takePicture() {


     const url = 'http://www.phonegap100.com/appapi.php?a=getPortalList&catid=20&page=1';
		 this.ApiService.get(url).then((response: any) => {
		    	console.log(response);
	      	 //	this.list = response.result;
     });




   
     
     const url1 = 'http://www.phonegap100.com/appapi.php';
     let  d1 = new URLSearchParams();
     d1.append('a',   'getPortalList' );
     d1.append('catid',   '20' );
     d1.append('page',   '1');
     this.ApiService.post(url1,d1).then((response: any) => {
      console.log(response);
       //	this.list = response.result;
     });

    // const options: CameraOptions = {
    //   quality: 100,
    //   destinationType: this.camera.DestinationType.DATA_URL,
    //   encodingType: this.camera.EncodingType.JPEG,
    //   mediaType: this.camera.MediaType.PICTURE
    // }

    // this.camera.getPicture(options).then((imageData) => {
    //   let ImageBase = 'data:image/jpeg;base64,' + imageData;
    //   this.currentImage = false;
    //   //this.uploadLinFail = true;
    //  // this.httpPost(ImageBase)  //httpPost上传图片的方法将图片传参到http请求方法中即可
      
    // }, (err) => {
    //  // Handle error
    //  console.log("Camera issue:" + err);
    //   // this.toast("图片上传失败")
    // });
}

   selectPicture(event:any){
      this.files = event.target.files;
      for (let index=0; index < this.files.length; index++){
            this.uploadPictureNum = this.files[index].name;
            this.taskProvider.uploadPicture(this.files[index]).subscribe(
              (res)=>{
                   this.setBackgroundImg(this.files[index],res);
              },
              (error)=>{
                  console.log(error);
              }
            );
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
