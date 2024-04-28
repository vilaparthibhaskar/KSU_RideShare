import { Routes } from '@angular/router';
import {ListDriversComponent} from './list-drivers/list-drivers.component';
import { DriverFormComponent } from './driver-form/driver-form.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { ListRidersComponent } from './list-riders/list-riders.component';
import { RiderFormComponent } from './rider-form/rider-form.component';
import { SchedulerideFormComponent } from './scheduleride-form/scheduleride-form.component';
import { ListScheduleridesComponent } from './list-schedulerides/list-schedulerides.component';
import { ListPaymentManagementsComponent } from './list-paymentmanagements/list-paymentmanagements.component';
import { PaymentManagementFormComponent } from './paymentmanagement-form/paymentmanagement-form.component';

export const routes: Routes = [
    {
        path: '',
        component: ListDriversComponent
    }, {
        path: 'addDriver',
        component: DriverFormComponent
    }, 
    {
        path: 'editDriver/:_id',
        component: DriverFormComponent 
    },
    {
        path: 'listDrivers',
        component: ListDriversComponent
    },{
        path: 'addRider',
        component: RiderFormComponent
    }, 
    {
        path: 'editRider/:_id',
        component: RiderFormComponent 
    },
    {
        path: 'listRiders',
        component: ListRidersComponent
    }, 
    {
        path: 'addScheduleride',
        component: SchedulerideFormComponent
    }, {
        path: 'editScheduleride/:_id',
        component: SchedulerideFormComponent 
    },
    {
        path: 'listSchedulerides',
        component: ListScheduleridesComponent
    },
    {
        path: 'addPaymentManagement',
        component: PaymentManagementFormComponent
    }, 
    {
        path: 'editPaymentManagement/:_id',
        component: PaymentManagementFormComponent 
    },
    {
        path: 'listPaymentManagements',
        component: ListPaymentManagementsComponent
    },
    {
        path: '**',
        component: NotFoundComponent
    }
];
