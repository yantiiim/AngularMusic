import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AkunAdmin } from '../akunAdmin/akunAdmin';
import { AkunAdminService } from '../akunAdmin/akunAdmin.service';
import { UserManajemenService } from './userManajemen.service';

@Component({
  selector: 'app-userManajemen',
  templateUrl: './userManajemen.component.html',
  styleUrls: ['./userManajemen.component.css'],
  providers: [UserManajemenService, AkunAdminService]
})
export class UserManajemenComponent implements OnInit {
  registerAkunForm: FormGroup
  constructor(private akunAdminService: AkunAdminService, private router: Router) {
    this.registerAkunForm = new FormGroup({
      username: new FormControl(null,[Validators.required]),
      keyword: new FormControl(null,[Validators.required])
    })
  }

  ngOnInit(): void {
  }

  registerAdmin(): void{
    console.log(this.registerAkunForm.value);
    let reg = new AkunAdmin();
    reg.username = this.registerAkunForm.value.username;
    reg.keyword = this.registerAkunForm.value.keyword;
    this.akunAdminService.registerAdmin(reg).subscribe((data) => {
      console.log(data);
      this.router.navigate(['/usermanajemenlist']);
    });
  }  

}
