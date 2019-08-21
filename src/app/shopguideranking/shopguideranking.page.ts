import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-shopguideranking',
  templateUrl: './shopguideranking.page.html',
  styleUrls: ['./shopguideranking.page.scss'],
})
export class ShopguiderankingPage implements OnInit {

  constructor(
    private readonly router: Router,
  ) { }

  ngOnInit() {
  }

  addshopguide() {
        this.router.navigate(['/addshopguide'], {
            queryParams: {
                // code: vcode,
                // beginDate: this.beginDate,
                // endDate: this.endDate
            }
        });
      // alert(this.item.productCode);
  }

}
