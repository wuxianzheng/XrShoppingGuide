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
  }

  

  back() {
    window.history.back();
  }


}
