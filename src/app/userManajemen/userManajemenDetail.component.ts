import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AkunAdmin } from '../akunAdmin/akunAdmin';
import { Roles } from '../model/roles';
import { UserManajemenService } from './userManajemen.service';

@Component({
    selector: 'app-home',
    templateUrl: './userManajemenDetail.component.html',
    providers: [UserManajemenService]
})

export class UserManajemenDetailComponent implements OnInit {
    akunAdmin: AkunAdmin[];
    listRole: Roles[];
    id: string;
    form: FormGroup;

    constructor(private userManajemenService: UserManajemenService, private route: ActivatedRoute, private router: Router) {
        
    }

    ngOnInit(): void {
      this.form = new FormGroup({
        id: new FormControl('')
      });

      this.userManajemenService.listRole().subscribe( (data ) =>{
        this.listRole = data
        console.log(data)
      }, error => {
        console.log(error)
      });

        this.route.params.subscribe(rute => {
          this.id = rute.id;
          if (this.id) {
            this.userManajemenService.getAkunById(this.id).subscribe( data => {
              this.akunAdmin = data;
              console.log(data)
            }, error => {
              console.log(error);
            });
          }
        });
      }

      ambilAlbums(): void{
        const id = this.form.get("id").value;
        this.userManajemenService.getAkunById(id).subscribe( data => {
          this.akunAdmin = data;
        })
      }

      check(id : string): Observable<boolean> | Promise<boolean> | boolean {
        return this.userManajemenService.checkingSuperAdmin(id)
        .pipe(map(data =>{
          if(data.isCheck != false){
            return true;
          } else{
            console.log("error");
          }
        }))
      }
}