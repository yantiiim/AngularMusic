import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { StatusLogin } from './model/statuslogin';
import { UserAdmin } from './model/useradmin';

@Injectable()

export class AuthService {
    loggedIn = false;
    
    constructor(private router: Router, private httpKlien: HttpClient){

    }

    isLogin = false;
    isLanjut = false;
    // private currentLogin = 'access_token'

    login(username: string, password: string): void{
        const userAdmin = new UserAdmin();
        userAdmin.username = username;
        userAdmin.password = password;
        console.log(userAdmin);
        this.httpKlien.post(environment.baseUrl + '/login', userAdmin
        ).pipe(map(data => data as StatusLogin))
        .subscribe( data => {
            this.isLogin = data.isValid;
            if(this.isLogin){
                localStorage.setItem('isLogin', 'Y');
                localStorage.setItem('token', data.token);
                localStorage.setItem('username', username);
                this.router.navigate(['/beranda']);
            }
        });
    }

    isAuthenticated(): boolean{
        const username = localStorage.getItem('username');
        const isLogin = localStorage.getItem('isLogin');
        const token = localStorage.getItem('token');
        const userAdmin = new UserAdmin();
        userAdmin.username = username;
        userAdmin.token = token;
        let statusLogin = false;
        if(token != null && username != null && isLogin === 'Y'){
            statusLogin = true;
        }
        return statusLogin;
    }

    isAuthorized(allowedRoles: string[]): Observable<StatusLogin> {
        const username = localStorage.getItem('username');
        const token = localStorage.getItem('token');
        if(username != null && token != null) {
            console.log(allowedRoles);
            const userAdmin = new UserAdmin();
            userAdmin.username = username;
            userAdmin.token = token;
            return this.httpKlien.post(environment.baseUrl + '/ceklogin', userAdmin
            ).pipe(map( data => data as StatusLogin));
        } else {
            this.router.navigate(['login']);
        }
    }

    logout(){
        localStorage.removeItem('token');
        this.router.navigate(['/login']);
    }
}