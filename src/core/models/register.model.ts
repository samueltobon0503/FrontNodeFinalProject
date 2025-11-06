import { Validator } from 'fluentvalidation-ts';

export interface RegisterModel {
  name: string;
  lastName: string;
  userName: string;
  email: string;
  phone: string;
  password: string;
}

class RegisterValidator extends Validator<RegisterModel> {
  constructor(confirmedPassword: string) {
    super();

    this.ruleFor('email')
      .notEmpty()
      .withMessage('El campo de email es obligatorio');
    this.ruleFor('name')
      .notNull()
      .withMessage('El campo de email es obligatorio');
    this.ruleFor('lastName')
      .notNull()
      .withMessage('El campo de email es obligatorio');
    this.ruleFor('userName')
      .notNull()
      .withMessage('El campo de email es obligatorio');
    this.ruleFor('phone')
      .notNull()
      .withMessage('El campo de email es obligatorio');

    this.ruleFor('password')
      .notEmpty()
      .withMessage('El campo de contraseña es obligatorio');
    this.ruleFor('password')
      .notNull()
      .withMessage('El campo de contraseña es obligatorio')
      .minLength(8)
      .withMessage('La contraseña debe tener mínimo 8 carácteres')
      .equal(confirmedPassword)
      .withMessage('Las contraseñas no coinciden');
  }
}

export { RegisterValidator };
