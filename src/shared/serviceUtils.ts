import { Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';

@Injectable({
    providedIn: 'root'
})
export class UtilityService {

    constructor(private messageService: MessageService) { }

    public handleValidationErrors(validationResult: { [key: string]: any }, componentErrors: { [key: string]: string }): boolean {

        Object.keys(componentErrors).forEach(key => componentErrors[key] = '');

        if (validationResult && Object.keys(validationResult).length > 0) {
            for (const key in validationResult) {
                const errorKey = `${key}Error`;

                if (componentErrors.hasOwnProperty(errorKey)) {
                    const errorMessage = Array.isArray(validationResult[key])
                        ? validationResult[key][0]
                        : validationResult[key];

                    componentErrors[errorKey] = errorMessage;
                }
            }
            return true;
        }
        return false;
    }

    public showSuccess(summary: string = 'Éxito', detail: string = 'Operación completada correctamente') {
        this.messageService.add({
            severity: 'success',
            summary: summary,
            detail: detail
        });
    }

    public showError(summary: string = 'Error', detail: string = 'Ha ocurrido un error inesperado') {
        this.messageService.add({
            severity: 'error',
            summary: summary,
            detail: detail
        });
    }

    public showWarning(summary: string = 'Advertencia', detail: string = 'Ha ocurrido un error inesperado') {
        this.messageService.add({
            severity: 'warn',
            summary: summary,
            detail: detail
        });
    }
}
