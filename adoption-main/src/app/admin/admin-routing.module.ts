import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SubNavComponent } from './subnav.component';
import { LayoutComponent } from './layout.component';
import { OverviewComponent } from './overview.component';

const accountsModule = () => import('./accounts/accounts.module').then(x => x.AccountsModule);
const petsModule = () => import('./pets/pets.module').then(x => x.PetsModule);
const ratingsModule = () => import('./ratings/ratings.module').then(x => x.RatingsModule);

const routes: Routes = [
    { path: '', component: SubNavComponent, outlet: 'subnav' },
    {
        path: '', component: LayoutComponent,
        children: [
            { path: '', component: OverviewComponent },
            { path: 'accounts', loadChildren: accountsModule },
            { path: 'pets', loadChildren: petsModule },
            { path: 'ratings', loadChildren: ratingsModule },
            
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AdminRoutingModule { }