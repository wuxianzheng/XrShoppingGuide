import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'home',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../home/home.module').then(m => m.HomePageModule)
          }
        ]
      },
      {
        path: 'member',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../member/member.module').then(m => m.MemberPageModule)
          }
        ]
      },
      {
        path: 'workbench',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../workbench/workbench.module').then(m => m.WorkbenchPageModule)
          }
        ]
      },
      {
        path: 'rankings',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../rankings/rankings.module').then(m => m.RankingsPageModule)
          }
        ]
      },
      {
        path: 'mycenter',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../mycenter/mycenter.module').then(m => m.MycenterPageModule)
          }
        ]
      },
      {
        path: '',
        redirectTo: '/tabs/home',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/tabs/home',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TabsPageRoutingModule {}
