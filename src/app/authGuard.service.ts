import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AuthService } from './auth.service';

@Injectable()
export class AuthGuardService implements CanActivate{

    constructor(private authService: AuthService, private router: Router){
        
    }

    canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot):
        Observable<boolean> | Promise<boolean> | boolean {
            const allowedRoles = next.data.allowedRoles;
            return this.authService.isAuthorized(allowedRoles).pipe(map(data => {
                if (data.roles != null && allowedRoles.some(r => data.roles.includes(r)) && data.isValid) {
                    return true;
                } else {
                    this.router.navigate(['login']);
                }
            }));
            
    }
}
