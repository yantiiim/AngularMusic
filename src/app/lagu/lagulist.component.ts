import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
import { Albums } from '../albums/albums';
import { AlbumsService } from '../albums/albums.service';
import { Genre } from '../genre/genre';
import { GenreService } from '../genre/genre.service';
import { Lagu } from './lagu';
import { LaguService } from './lagu.service';

@Component({
    selector: 'app-home',
    templateUrl: './lagulist.component.html',
    providers: [LaguService, AlbumsService, GenreService]
})

export class LaguListComponent implements OnInit, AfterViewInit {

    @ViewChild(DataTableDirective, {static: false})
    dtElement: DataTableDirective;
    dtOptions: any = {};
    dtTrigger: Subject<any> = new Subject();
    cariForm: FormGroup;
    listLagu: Lagu[];
    listAlbums: Albums[];
    listGenre: Genre[];
    alamatGambar: string;
    form: FormGroup;
    ids: string;
    idg: string;

    constructor(private laguService: LaguService, private albumsService: AlbumsService, private genreService: GenreService,private activateRoute: ActivatedRoute){
        this.laguService.listLagu().subscribe((data)=>{
            console.log(data);
            this.listLagu=data;
            }, error => {
                console.log(error);
            })
    }

    

    ngOnInit(): void{
        this.cariForm = new FormGroup( {
            judul: new FormControl('')
        });

        this.form = new FormGroup( {
            ids: new FormControl('')
        });

        this.form = new FormGroup( {
            idg: new FormControl('')
        });

        this.albumsService.listAlbums().subscribe((data)=>{
            console.log(data);
            this.listAlbums=data;
            }, error => {
                console.log(error);
            })
        this.activateRoute.params.subscribe( rute => {
        this.ids = rute.ids;
        this.laguService.getLaguByAlbums(this.ids).subscribe( data => {
        this.listLagu = data;
        }, error => {
            console.log(error);
        });
        });
        

        this.genreService.listGenre().subscribe((data)=>{
            console.log(data);
            this.listGenre=data;
            }, error => {
                console.log(error);
            })
        this.activateRoute.params.subscribe( rute => {
            this.idg = rute.idg;
            this.laguService.getLaguByGenre(this.idg).subscribe( data => {
            this.listLagu = data;
            }, error => {
                console.log(error);
             });
            });

    }

    ngOnDestroy(): void {
        this.dtTrigger.unsubscribe();
    }

    ambilLagu(): void{
        const idAlbum = this.form.get("idAlbum").value;
        this.laguService.getLaguByAlbums(idAlbum).subscribe( data => {
          this.listLagu = data;
        })
      }

    ambilLagu2(): void{
        const idGenre = this.form.get("idGenre").value;
        this.laguService.getLaguByAlbums(idGenre).subscribe( data => {
            this.listLagu = data;
        })
    }

    rerender(): void {
        this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
            dtInstance.draw();
        });
    }

ngAfterViewInit() {
    
}

}