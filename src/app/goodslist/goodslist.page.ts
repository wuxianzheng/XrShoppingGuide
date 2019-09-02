import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-goodslist',
  templateUrl: './goodslist.page.html',
  styleUrls: ['./goodslist.page.scss'],
})
export class GoodslistPage implements OnInit {

  constructor( private readonly router: Router,
    ) { }
    
  ngOnInit() {
  }

  back() {
    window.history.back();
  }

  goodsadd() {
    this.router.navigate(['/goodsadd'], {
        queryParams: {
            // code: vcode,
            // beginDate: this.beginDate,
            // endDate: this.endDate
        }
    });
  // alert(this.item.productCode);
}

}

