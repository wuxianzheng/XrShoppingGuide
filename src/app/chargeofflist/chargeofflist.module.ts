import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { ChargeofflistPage } from './chargeofflist.page';

const routes: Routes = [
  {
    path: '',
    component: ChargeofflistPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [ChargeofflistPage]
})
export class ChargeofflistPageModule {}
