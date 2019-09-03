import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-goodsdtl',
  templateUrl: './goodsdtl.page.html',
  styleUrls: ['./goodsdtl.page.scss'],
})
export class GoodsdtlPage implements OnInit {


  back() {
    window.history.back();
  }
  
  constructor() { }

  ngOnInit() {
  }

}
