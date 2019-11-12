import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { RankingsdtlPage } from './rankingsdtl.page';

const routes: Routes = [
  {
    path: '',
    component: RankingsdtlPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [RankingsdtlPage]
})
export class RankingsdtlPageModule {}
