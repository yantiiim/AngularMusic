import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
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
    private currentLogin = 'access_token'

    login(username: string, password: string): void{
        const userAdmin = new UserAdmin();
        userAdmin.username = username;
        userAdmin.password = password;
        console.log(userAdmin);
        alert("a");
        this.httpKlien.get(environment.baseUrl +'/listlagubygenrejson/12').pipe(map(data => data as StatusLogin))
        .subscribe( data => {
            this.isLogin = data.isValid;
            console.log(data);
        alert("a");
            if(this.isLogin){
                localStorage.setItem('isLogin', 'Y');
                localStorage.setItem('token', data.token);
                console.log(data);
                alert("a");
                // this.router.navigate(['/beranda']);
            }
        });
    }

    logout(){
        this.loggedIn = false;
        this.router.navigate(['/login']);
    }


    isAuthenticated(): boolean{
        const status = localStorage.getItem('isLogin');
        if(status === 'Y'){
            return true;
        } else{
            return false;
        }
    }

    // isAuthenticated() {
    //     const promise = new Promise(
    //         (resolve, rejects) => {
    //             setTimeout(() => {
    //                 resolve(this.loggedIn)
    //             }, 1000);
    //         }
    //     );
    //     return promise;
    // }
}