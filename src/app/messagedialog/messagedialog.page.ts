import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-messagedialog',
  templateUrl: './messagedialog.page.html',
  styleUrls: ['./messagedialog.page.scss'],
})
export class MessagedialogPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }
   
  back() {
    window.history.back();
  }
   
  showCondition(){

    
  }
}
