import { Validator } from 'fluentvalidation-ts';

export interface LoginModel {
    email: string,
    password: string
}


class LoginValidator extends Validator<LoginModel> {
    constructor() {
        super();

        this.ruleFor('email')
            .notEmpty()
            .withMessage('El campo de email es obligatorio');
        this.ruleFor('email')
            .notNull()
            .withMessage('El campo de email es obligatorio');


        this.ruleFor('password')
            .notEmpty()
            .withMessage('El campo de contraseña es obligatorio');
        this.ruleFor('password')
            .notNull()
            .withMessage('El campo de contraseña es obligatorio');
    }
}

export { LoginValidator }
