import { Component, OnInit } from '@angular/core';
import { ApiService, Reqdata, dateFormat, XrEchart } from '../services/api.service';
import { NavController, Platform, NavParams } from '@ionic/angular';
import { ActivatedRoute, Params, Router } from '@angular/router';


@Component({
  selector: 'app-labeldtl',
  templateUrl: './labeldtl.page.html',
  styleUrls: ['./labeldtl.page.scss'],
})
export class LabeldtlPage implements OnInit {
  tagVoList: [];
  List:[];
  //tagVoList: string;
  constructor( private ApiService: ApiService,
    private echart: XrEchart,
    private activated: ActivatedRoute,
    private readonly router: Router) { }


  ngOnInit() {
    this.activated.queryParams.subscribe((params: Params) => {
      this.tagVoList = JSON.parse(params["codelist"]);
    });
    console.log( this.tagVoList );
   

  //   this.tagVoList.forEach(function (e) {
  //     n[e.DJH].SL= e.;
  //     n[e.DJH].list.push(e);
  // });

  // let t = [];
  // for (var a in n)
  //     t.push(n[a]);

  // return t


  }



  back() {
    window.history.back();
  }


}
