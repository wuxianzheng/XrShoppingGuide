import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { DiscountcoupondtlPage } from './discountcoupondtl.page';

const routes: Routes = [
  {
    path: '',
    component: DiscountcoupondtlPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [DiscountcoupondtlPage]
})
export class DiscountcoupondtlPageModule {}
