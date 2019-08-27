import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-orderdtl',
  templateUrl: './orderdtl.page.html',
  styleUrls: ['./orderdtl.page.scss'],
})
export class OrderdtlPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  back() {
    window.history.back();
  }

}
