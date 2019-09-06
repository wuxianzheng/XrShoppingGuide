import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-memberdtl',
  templateUrl: './memberdtl.page.html',
  styleUrls: ['./memberdtl.page.scss'],
})
export class MemberdtlPage implements OnInit {

  constructor() { }
   
  back() {
    window.history.back();
  }
  
  ngOnInit() {
  }

}
