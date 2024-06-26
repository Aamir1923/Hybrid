import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: '',
    component: TabsPage,
    children: [
      {
        path: 'canada-summary',
        loadChildren: () => import('../components/canada-summary/canada-summary.module').then(m => m.CanadaSummaryModule)
      },
      {
        path: 'ontario-status',
        loadChildren: () => import('../components/ontario-status/ontario-status.module').then(m => m.OntarioStatusModule)
      },
      {
        path: '',
        redirectTo: '/canada-summary',
        pathMatch: 'full'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TabsPageRoutingModule {}
