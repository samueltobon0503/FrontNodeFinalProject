import { Validator } from 'fluentvalidation-ts';

export interface Address {
  userId: string;
  street: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
}

class AdressValidator extends Validator<Address> {
  constructor() {
    super();

    this.ruleFor('street')
      .notEmpty()
      .withMessage('El campo de email es obligatorio');
    this.ruleFor('street')
      .notNull()
      .withMessage('El campo de email es obligatorio');

    this.ruleFor('city')
      .notEmpty()
      .withMessage('El campo de contraseña es obligatorio');
    this.ruleFor('city')
      .notNull()
      .withMessage('El campo de contraseña es obligatorio');

    this.ruleFor('state')
      .notEmpty()
      .withMessage('El campo de contraseña es obligatorio');
    this.ruleFor('state')
      .notNull()
      .withMessage('El campo de contraseña es obligatorio');

    this.ruleFor('postalCode')
      .notEmpty()
      .withMessage('El campo de contraseña es obligatorio');
    this.ruleFor('postalCode')
      .notNull()
      .withMessage('El campo de contraseña es obligatorio');

    this.ruleFor('country')
      .notEmpty()
      .withMessage('El campo de contraseña es obligatorio');
    this.ruleFor('country')
      .notNull()
      .withMessage('El campo de contraseña es obligatorio');
  }
}

export { AdressValidator };
