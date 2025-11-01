import { Route, Routes } from '@angular/router';
import { AppLayout } from './layout/component/app.layout';
import { HomeComponent } from '../modules/home/home.component';

// const home: Route = {path: 'home', title: 'home', loadChildren: () => import('../modules/home/home.routes')};

export const routes: Routes = [
    // {path: '', pathMatch: 'full', redirectTo: 'home' },
    {
        path: '',
        component: AppLayout,
        children: [
            { path: '', component: HomeComponent },
        ]
    },
];
    