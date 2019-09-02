import { Component, ViewEncapsulation, OnInit } from '@angular/core';
import { EChartOption } from 'echarts';
import { ChangeDetectorRef,  SimpleChanges } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { PopoverController } from '@ionic/angular';
import { HttpParams } from "@angular/common/http";

import { ApiService, Reqdata, dateFormat} from '../services/api.service';

@Component({
  selector: 'app-workbench',
  templateUrl: './workbench.page.html',
  styleUrls: ['./workbench.page.scss'],
})


export class WorkbenchPage implements OnInit {

    data:any = {
        banner: [],
        menu: []
    };
    selectedDataSource: any = {};
    constructor(
        private readonly router: Router,
        private popoverCtrl: PopoverController,
        private api: ApiService
    ) {

    }

    ngOnInit(){
        this.data.menu = this.api.getMenuList();
        console.log(this.api.getMenuList());
        let that = this;
        this.api.storage.get("banner").then( l =>{
            var n = [];
            if (l) {
                for (var t in l)
                    n.push(l[t]);
                if (n.length) {
                    n.sort(that.compare("sort"));
                    that.data.banner = n;
                }
            }

            if (n.length==0)
                that.data.banner = [{
                base64: "assets/imgs/banner01.png",
                sort: 0
            }
            ];
            console.log(l);
            that.requestData(l);
         });
          this.api.storage.get("datasource") && this.api.storage.get("datasource").then(l => {
          that.selectedDataSource = l;
         });
    }

    compare(l) {
        return function (n, t) {
            return n[l] - t[l];
        }
    }

    requestData(l) {
        let that = this;
        l = l || {};
        let t = new HttpParams();
        let u = 0;
        for (let a in l) {
            t.set("list[" + u + "].id", l[a].id).set("list[" + u + "].time", l[a].time);
            u++;
        }
        that.api.getBanner(function (t) {
            var e = t && t.data || {};

            for (var u in e) {
                if ("2" == e[u].status && l[u])
                    e[u] = l[u];
            }
        
            that.api.storage.set("banner", e);

        }, {
                params: t,
                isLoading: false,
                fullCall: true,
                error: function () { }
            });
    }


    toPage(l) {
        console.log(l.page.toLowerCase().replace(`page`, ''));
        if (l.system) {
            let page = '/' + l.page.toLowerCase().replace(`page`, '');
            this.router.navigate([page]);
        }
        else{
            this.router.navigate(['/report'], {
                queryParams: {
                    title: l.name,
                    id: l.procId
                }
            });
        }
    }


}

