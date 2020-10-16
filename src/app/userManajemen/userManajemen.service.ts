import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { AkunAdmin } from '../akunAdmin/akunAdmin';
import { DatatablesRequest } from '../model/datatablesrequest.model';
import { DataTablesResponse } from '../model/datatablesresponse.model';
import { GroupUser } from '../model/groupuser';
import { Roles } from '../model/roles';

@Injectable({
  providedIn: 'root'
})
export class UserManajemenService {

  constructor(private httpKlien: HttpClient) {
  
    }


    listAkun(): Observable<AkunAdmin[]>{
      return this.httpKlien.get(environment.baseUrl + '/listakunjson')
      .pipe(map(data=> <AkunAdmin[]>data));
    }
  
    getAkunById(id): Observable<AkunAdmin[]>{
      return this.httpKlien.get(environment.baseUrl + '/listakunjson/'+id)
        .pipe(map(data=> data as AkunAdmin[]));
    }
  
    listRole(): Observable<Roles[]>{
      return this.httpKlien.get(environment.baseUrl + '/listrolesjson')
      .pipe(map(data=> <Roles[]>data));
    }

    checkingSuperAdmin(idUser : string): Observable<GroupUser>{
      if(idUser != null){
        return this.httpKlien.post(environment.baseUrl + '/checkingsuperadmin', idUser
        ).pipe(map( data => data as GroupUser));
      } else{
        console.error('error')
      }
    }
}
