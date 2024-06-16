import { Routes } from '@angular/router';
import { NgbdpaginationBasicComponent } from './pagination/pagination.component';
import { NgbdAlertBasicComponent } from './alert/alert.component';

import { NgbdDropdownBasicComponent } from './dropdown-collapse/dropdown-collapse.component';
import { NgbdnavBasicComponent } from './nav/nav.component';
import { BadgeComponent } from './badge/badge.component';
import { NgbdButtonsComponent } from './buttons/buttons.component';
import { CardsComponent } from './card/card.component';
import { TableComponent } from './table/table.component';
import { UserinfoComponent } from './user-info/user-info.component';
import { UserloginComponent } from './userlogin/userlogin.component';
import { NinthclassMasterComponent } from './ninthclass-master/ninthclass-master.component';
import { AuthGuard } from '../guard/auth.guard';
import { StudentfeesComponent } from './studentfees/studentfees.component';

export const ComponentsRoutes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'table',
        component: TableComponent,
      },
      {
        path: 'card',
        component: CardsComponent,
      },
      {
        path: 'pagination',
        component: NgbdpaginationBasicComponent,
      },
      {
        path: 'badges',
        component: BadgeComponent,
      },
  
      {
        path: 'dropdown',
        component: NgbdDropdownBasicComponent,
      },
      {
        path: 'nav',
        component: NgbdnavBasicComponent,
      },
      {
        path: 'buttons',
        component: NgbdButtonsComponent,
      },
      {
        path: 'user-info',
        component: UserinfoComponent,
      },
      {
        path: 'ninthclass-master',
        component: NinthclassMasterComponent,
        canActivate :[AuthGuard]
      },
      {
        path: 'studentfees',
        component: StudentfeesComponent,
      },
    ],
  },
];
