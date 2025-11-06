import { Route, Routes } from '@angular/router';
import { AppLayout } from './layout/component/app.layout';
import { HomeComponent } from '../modules/home/home.component';
import { AuthGuard } from '../core/guards/auth.guard';
import { RoutesEnum } from '../shared/Dictionary,enum';

// const home: Route = {path: 'home', title: 'home', loadChildren: () => import('../modules/home/home.routes')};

export const routes: Routes = [
  // {path: '', pathMatch: 'full', redirectTo: 'home' },
  {
    path: '',
    component: AppLayout,
    children: [{ path: '', component: HomeComponent }],
  },
  {
    path: '',
    component: AppLayout,
    canActivate: [AuthGuard],
    canActivateChild: [AuthGuard],
    children: [
      { path: '', component: HomeComponent },
      // {
      //   path: RoutesEnum.PRODUCT,
      //   loadChildren: () => import('../modules/product/product.routes'),
      // }
    ],
  },
  { path: 'auth', loadChildren: () => import('../modules/auth/auth.routes') },
  { path: '**', redirectTo: '/home' },
];
