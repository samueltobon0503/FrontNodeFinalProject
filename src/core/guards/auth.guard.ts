import { inject } from "@angular/core";
import { CanActivateChildFn, CanActivateFn, Router } from "@angular/router";
import { of, switchMap } from "rxjs";
import { AuthService } from "../services/auth.service";
import { RoutesEnum } from "../../shared/Dictionary,enum";

export const AuthGuard: CanActivateFn | CanActivateChildFn = (route, state) => {
    const router: Router = inject(Router);

    return inject(AuthService)
        .check().pipe(
            switchMap((autenticated) => {
                if (!autenticated) {
                    const redirect = router.parseUrl(`${RoutesEnum.AUTH}/${RoutesEnum.LOGIN}`)
                    return of(redirect);
                }
                return of(true);
            })
        )
}
