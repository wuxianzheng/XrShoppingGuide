import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { ChargeoffdtlPage } from './chargeoffdtl.page';

const routes: Routes = [
  {
    path: '',
    component: ChargeoffdtlPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [ChargeoffdtlPage]
})
export class ChargeoffdtlPageModule {}
