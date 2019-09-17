import { Component, OnInit } from '@angular/core';
import { ApiService, Reqdata, dateFormat, XrEchart } from '../services/api.service';
import { NavController, Platform, NavParams } from '@ionic/angular';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-memberdtl',
  templateUrl: './memberdtl.page.html',
  styleUrls: ['./memberdtl.page.scss'],
})
export class MemberdtlPage implements OnInit {
 
  code: string;
  beginDate: string;
  endDate: string;
  list: any = [];

  constructor(  private ApiService: ApiService,
    private echart: XrEchart,
    private activated: ActivatedRoute,
    private readonly router: Router
    ) { }

  back() {
    window.history.back();
  }

  ngOnInit():void {

    this.activated.queryParams.subscribe((params: Params) => {
      this.code = params["code"];
      this.beginDate = params["beginDate"];
      this.endDate = params["endDate"];
    });
   this.query();
  }


  
  requestData(e, n?) {
    const t = new Reqdata();
    t.code = this.code;
    t.mode = 'memberdtl';
    this.ApiService.requestData(t, e);
}

  query(e?) {
    let n = this;
    this.requestData(a => {
      n.list=a;
      console.log(this.list);
    }, e);
   }

}
