import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-goodsadd',
  templateUrl: './goodsadd.page.html',
  styleUrls: ['./goodsadd.page.scss'],
})
export class GoodsaddPage implements OnInit {
  
  files: any;
  uploadPictureNum: any;
  taskProvider : any;
  sanitizer : any;
  previewImageUrl : any;


  constructor() { }
  back() {
    window.history.back();
  }

  ngOnInit() {
  }

   //after picture selected
   selectPicture(event:any){
    this.files = event.target.files;
      for (let index=0; index<this.files.length; index++){
            this.uploadPictureNum ++;
            //this.setImageUrl(this.files[index]);
            this.taskProvider.uploadPicture(this.files[index]).subscribe(
              (res)=>{
                  //set image url and value
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
let url = 'url('+window.URL.createObjectURL(file)+')';
let safeUrl = this.sanitizer.bypassSecurityTrustStyle(url);
this.previewImageUrl.push({fileUrl:safeUrl, value:value});
}


  //preview image, use popover
  // previewImg(url: SafeStyle){
  //   let popover = this.popoverCtrl.create(previewImg,{
  //       imageUrl:url
  //   });

  //   popover.present();

  //   popover.onDidDismiss( (data)=>{
  //       //delete image
  //       if(data){
  //     //this.previewImageUrl.splice(this.previewImageUrl.indexOf(data),1);
  //     this.previewImageUrl = this.previewImageUrl.filter((image)=>image.fileUrl !== url);
  //     this.uploadPictureNum--
  //       }
  //   })
  // }


 

}
