import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { PerformancePage } from './performance.page';
import { NgxEchartsModule } from 'ngx-echarts';


const routes: Routes = [
  {
    path: '',
    component: PerformancePage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NgxEchartsModule,
    RouterModule.forChild(routes)
  ],
  declarations: [PerformancePage]
})
export class PerformancePageModule {}
