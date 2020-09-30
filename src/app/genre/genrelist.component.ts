import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
import { Genre } from './genre';
import { GenreService } from './genre.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
    selector: 'app-home',
    templateUrl: './genrelist.component.html',
    providers: [GenreService]
})

export class GenreListComponent implements OnInit, AfterViewInit {

    @ViewChild(DataTableDirective, {static: false})
    dtElement: DataTableDirective;
    dtOptions: any = {};
    dtTrigger: Subject<any> = new Subject();
    cariForm: FormGroup;
    listGenre: Genre[];

    constructor(private genreService: GenreService, private router: Router){

    }

    

    ngOnInit(): void{
        this.cariForm = new FormGroup( {
            namaGenre: new FormControl('')
        });

        this.genreService.listGenre().subscribe((data)=>{
            console.log(data);
            this.listGenre=data;
            }, error => {
                console.log(error);
            })
        

    }

    ngOnDestroy(): void {
        this.dtTrigger.unsubscribe();
    }

    rerender(): void {
        this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
            dtInstance.draw();
        });
    }

    ngAfterViewInit() {
        
    }

  deleteGenre(id : number) {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger'
      },
      buttonsStyling: false,
    });
    swalWithBootstrapButtons.fire({
      title: 'Are you sure?',
      text: 'You want to remove the Catalog!',
      icon: 'warning',
      // type: 'warning'
      showCancelButton: true,
      showCloseButton: true,
      confirmButtonText: 'Yes, delete!',
      cancelButtonText: 'No, cancel!',
      reverseButtons: true
    }).then((result) => {
    console.log(`Delete Data By Id:` + id );
        if (result.value) {
            this.genreService.deleteGenre(id).subscribe(data => {
                console.log(data);
                this.refresh();
            });
        }
    });
  }

  refresh(): void {
    window.location.reload();
  }


}
