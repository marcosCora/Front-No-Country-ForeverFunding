import { ValidatorFn, AbstractControl, ValidationErrors, AsyncValidator, AsyncValidatorFn } from "@angular/forms";
import { Observable, of } from "rxjs";
import { map, catchError } from 'rxjs/operators';
import { UserServiceService } from "../Services/user-service.service";

export class CustomValidator{

    static matchPasswords(password: string, confirmPassword: string): ValidatorFn {
        return (control: AbstractControl): { [key: string]: any } | null => {
            const passwordControl = control.get(password);
            const confirmPasswordControl = control.get(confirmPassword);
            return passwordControl && confirmPasswordControl && passwordControl.value === confirmPasswordControl.value ? null : { mismatch: true };
        }
    }


    static emailValidator(userService: UserServiceService): AsyncValidatorFn {
        return (control: AbstractControl): Observable<ValidationErrors | null> => {
            const email = (control.value as string).trim().toLowerCase();         
            return userService
                .verificationEmail(email)
                .pipe(map(isExisting => (isExisting ? { emailExists: true } : null)));
        }};
    }
    