import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FullComponent } from './layouts/full/full.component';
import { UserloginComponent } from './component/userlogin/userlogin.component';
import { AuthGuard } from './guard/auth.guard';
import { NinthclassMasterComponent } from './component/ninthclass-master/ninthclass-master.component';
import { NinthclassDetailComponent } from './component/ninthclass-master/ninthclass-detail/ninthclass-detail.component';

export const Approutes: Routes = [
  {
    path: 'userlogin',
    component: UserloginComponent,
  },
  {
    path: '',
    component: FullComponent,
    children: [
      { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
      {
        path: 'dashboard',
        loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule),
        canActivate :[AuthGuard]
      },

      {
        path: 'about',
        loadChildren: () => import('./about/about.module').then(m => m.AboutModule),
        canActivate :[AuthGuard]

      },
      {
        path: 'component',
        loadChildren: () => import('./component/component.module').then(m => m.ComponentsModule)
      },
      {
        path:'ninthClass-Detail',
        component: NinthclassDetailComponent,
        canActivate :[AuthGuard]
      }
    ],
  },
  {
    path: '**',
    redirectTo: '/starter'
  },
  
];
