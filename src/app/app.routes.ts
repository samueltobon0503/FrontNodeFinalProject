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
    canActivate: [AuthGuard],
    canActivateChild: [AuthGuard],
    children: [
      { path: '', component: HomeComponent },
      {
        path: 'user',
        loadChildren: () => import('../modules/user/user.routes'),
      },
      {
        path: 'cart',
        loadChildren: () => import('../modules/cart/cart.routes'),
      },
      {
        path: 'order',
        loadChildren: () => import('../modules/orders/orders.routes'),
      },
    ],
  },
  { path: 'auth', loadChildren: () => import('../modules/auth/auth.routes') },
  { path: '**', redirectTo: '/' },
];
