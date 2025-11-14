import { OrderManagementComponent } from "./order-management/order-management.component";
import { OrderComponent } from "./order/order.component";

export default [
    {path: '', component: OrderComponent},
    {path: 'management', component: OrderManagementComponent},
]
