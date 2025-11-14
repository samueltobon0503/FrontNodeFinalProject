import { ProductFormComponent } from "./product-form/product-form.component";
import { ProductComponent } from "./product/product.component";

export default [
    {path: '', component: ProductComponent},
    {path: 'create', component: ProductFormComponent},
    {path: 'edit', component: ProductFormComponent},]
