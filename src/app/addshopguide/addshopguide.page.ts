import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-addshopguide',
  templateUrl: './addshopguide.page.html',
  styleUrls: ['./addshopguide.page.scss'],
})
export class ADDshopguidePage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  
  back() {
    window.history.back();
  }

}
