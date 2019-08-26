import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule)
  },
  { path: 'mycenter', loadChildren: './mycenter/mycenter.module#MycenterPageModule' },
  { path: 'home', loadChildren: './home/home.module#HomePageModule' },
  { path: 'member', loadChildren: './member/member.module#MemberPageModule' },
  { path: 'rankings', loadChildren: './rankings/rankings.module#RankingsPageModule' },
  { path: 'messagedialog', loadChildren: './messagedialog/messagedialog.module#MessagedialogPageModule' },
  { path: 'workbench', loadChildren: './workbench/workbench.module#WorkbenchPageModule' },
  { path: 'performance', loadChildren: './performance/performance.module#PerformancePageModule' },
  { path: 'shopguideranking', loadChildren: './shopguideranking/shopguideranking.module#ShopguiderankingPageModule' },
  { path: 'modal-condition', loadChildren: './modal-condition/modal-condition.module#ModalConditionPageModule' },
  { path: 'addshopguide', loadChildren: './addshopguide/addshopguide.module#ADDshopguidePageModule' },
  { path: 'performancerankings', loadChildren: './performancerankings/performancerankings.module#PerformancerankingsPageModule' }

];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
