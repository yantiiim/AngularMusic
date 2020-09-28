import { HttpEventType, HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Albums } from '../albums/albums';
import { AlbumsService } from '../albums/albums.service';
import { Artis } from '../artis/artis';
import { ArtisService } from '../artis/artis.service';
import { Genre } from '../genre/genre';
import { GenreService } from '../genre/genre.service';
import { Lagu } from './lagu';
import { LaguService } from './lagu.service';

@Component({
    selector: 'app-lagu',
    templateUrl: './lagu.component.html',
    providers: [LaguService, AlbumsService, GenreService, ArtisService]
  })

  export class LaguComponent implements OnInit {

    id: string;
  addLaguForm: FormGroup;
  listGenre: Genre[];
  listArtis: Artis[];
  listAlbums: Albums[];
  
  selectedFiles: FileList;
  currentFile: File;
  progress = 0;
  
    constructor(private laguService: LaguService,
                private genreService: GenreService, 
                private artisService: ArtisService,
                private albumsService: AlbumsService, 
                private route: ActivatedRoute, private router: Router) {
      this.addLaguForm = new FormGroup({
        idLagu: new FormControl(null, [Validators.required]),
        judul: new FormControl(null, [Validators.required]),
        durasi: new FormControl(null, [Validators.required]),
        idGenre: new FormControl(null, [Validators.required]),
        idArtis: new FormControl(null, [Validators.required]),
        idAlbum: new FormControl(null, [Validators.required]),
        fileLagu: new FormControl
      });

      this.genreService.listGenre().subscribe((data)=>{
        console.log(data);
        this.listGenre=data;
        }, error => {
            console.log(error);
        })

      this.artisService.listArtis().subscribe((data)=>{
        console.log(data);
        this.listArtis=data;
        }, error => {
            console.log(error);
        })

      this.albumsService.listAlbums().subscribe((data)=>{
        console.log(data);
        this.listAlbums=data;
        }, error => {
            console.log(error);
        })
    }
  
    ngOnInit(): void {
      this.route.params.subscribe(rute => {
        this.id = rute.id;
        this.laguService.getLaguById(this.id).subscribe(data => {
          this.addLaguForm.get('idLagu').setValue(data.idLagu);
          this.addLaguForm.get('judul').setValue(data.judul);
          this.addLaguForm.get('durasi').setValue(data.durasi);
          this.addLaguForm.get('idGenre').setValue(data.idGenre);
          this.addLaguForm.get('idArtis').setValue(data.idArtis);
          this.addLaguForm.get('idAlbum').setValue(data.idAlbum);
          this.addLaguForm.get('fileLagu').setValue(data.fileLagu);
        }, error => {
          alert("Data Tidak Ditemukan !");
        });
      });
    }
  
    simpanLagu(): void {
      this.upload();
      console.log(this.addLaguForm.value);
      let la = new Lagu();
      la.idLagu = this.addLaguForm.value.idLagu;
      la.judul = this.addLaguForm.value.judul;
      la.durasi = this.addLaguForm.value.durasi;
      la.idGenre = this.addLaguForm.value.idGenre;
      la.idArtis = this.addLaguForm.value.idArtis;
      la.idAlbum = this.addLaguForm.value.idAlbums;
      la.fileLagu = this.addLaguForm.value.fileLagu;
      this.laguService.insertLagu(la).subscribe((data) => {
        
        console.log(data);
        this.router.navigate(['/listlagu']);
      });
    }
  
    selectFile(event) {
      this.selectedFiles = event.target.files;
    }
  
    upload() {
      this.progress = 0;
  
      this.currentFile = this.selectedFiles.item(0);
      this.laguService.upload(this.currentFile).subscribe(
        event => {
          if (event.type === HttpEventType.UploadProgress) {
            this.progress = Math.round( 100 * event.loaded / event.total);
          }else if (event instanceof HttpResponse) {
            console.log(event.body);
          }
        },
        err => {
          this.progress = 0;
          alert('Could not upload the file!');
          this.currentFile = undefined;
        });
  
      this.selectedFiles = undefined;
    }

  }