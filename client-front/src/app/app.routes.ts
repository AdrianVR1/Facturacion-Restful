import { Routes } from '@angular/router';
import { ClientsListComponent } from './components/client-list/clients-list.component';
import { ClientFormComponent } from './components/client-form/client-form.component';
import { DetailsInvoiceComponent } from './components/invoices/details-invoice.component';
import { InvoiceFormComponent } from './components/invoice-form/invoice-form.component';



export const routes: Routes = [

    {
        path: '',
        pathMatch: 'full',
        redirectTo: '/clients/page/0'
    },
    {
        path: 'clients',
        component: ClientsListComponent
    },

    {
        path: 'clients/page/:page',
        component: ClientsListComponent,
    },
    {
        path: 'clients/create',
        component: ClientFormComponent
    },
    {
        path: 'clients/edit/:id',
        component: ClientFormComponent
    },
    {
        path:'invoices/:id',
        component: DetailsInvoiceComponent
    },
    {
        path:'invoices/form/:clientId',
        component: InvoiceFormComponent
    },
    


];
