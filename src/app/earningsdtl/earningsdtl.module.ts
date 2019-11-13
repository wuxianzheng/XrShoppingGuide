import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { EarningsdtlPage } from './earningsdtl.page';

const routes: Routes = [
  {
    path: '',
    component: EarningsdtlPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [EarningsdtlPage]
})
export class EarningsdtlPageModule {}
