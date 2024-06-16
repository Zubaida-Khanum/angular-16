import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ComponentsRoutes } from './component.routing';
import { NgbdpaginationBasicComponent } from './pagination/pagination.component';
import { NgbdAlertBasicComponent } from './alert/alert.component';
import { NgbdDropdownBasicComponent } from './dropdown-collapse/dropdown-collapse.component';
import { NgbdnavBasicComponent } from './nav/nav.component';
import { NgbdButtonsComponent } from './buttons/buttons.component';
import { CardsComponent } from './card/card.component';
import { TableComponent } from './table/table.component';
import { UserinfoComponent } from './user-info/user-info.component';
import { DropdownModule } from 'primeng/dropdown';
import { YesNoPipe } from '../shared/pipes/yes-no.pipe';
import { ToastService } from '../shared/services/toast.service';
import { UserloginComponent } from './userlogin/userlogin.component';
import { TableModule } from 'primeng/table';
import { NinthclassMasterComponent } from './ninthclass-master/ninthclass-master.component';
import { NinthclassDetailComponent } from './ninthclass-master/ninthclass-detail/ninthclass-detail.component';
import { ToolbarModule } from 'primeng/toolbar';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { StudentfeesComponent } from './studentfees/studentfees.component';
@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(ComponentsRoutes),
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    NgbdAlertBasicComponent,
    NgbdpaginationBasicComponent,
    NgbdDropdownBasicComponent,
    NgbdnavBasicComponent,
    NgbdButtonsComponent,
    CardsComponent,
    TableComponent,
    DropdownModule,
    TableModule,
    ToolbarModule,
    ButtonModule,
    DialogModule
  ],
  declarations: [
    UserinfoComponent,
    YesNoPipe,
    UserloginComponent,
    NinthclassMasterComponent,
    NinthclassDetailComponent,
    StudentfeesComponent,
  ],
  // providers:[
  //   ToastService
  // ]
})
export class ComponentsModule {}
