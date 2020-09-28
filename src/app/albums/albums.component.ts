import { HttpEventType, HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Artis } from '../artis/artis';
import { ArtisService } from '../artis/artis.service';
import { LablesRekaman } from '../lablesRekaman/lablesRekaman';
import { LablesRekamanService } from '../lablesRekaman/lablesRekaman.service';
import { Albums } from './albums';
import { AlbumsService } from './albums.service';

@Component({
    selector: 'app-albums',
    templateUrl: './albums.component.html',
    providers: [AlbumsService, LablesRekamanService, ArtisService]
  })

  export class AlbumsComponent implements OnInit {

    id: string;
  addAlbumsForm: FormGroup;
  listLables: LablesRekaman[];
  listArtis: Artis[];
  
  selectedFiles: FileList;
  currentFile: File;
  progress = 0;
  
    constructor(private albumsService: AlbumsService, private lablesRekamanService: LablesRekamanService, private artisService: ArtisService, private route: ActivatedRoute, private router: Router) {
      this.addAlbumsForm = new FormGroup({
        idAlbum: new FormControl(null, [Validators.required]),
        namaAlbums: new FormControl(null, [Validators.required, Validators.minLength(3)]),
        idLabel: new FormControl(null, [Validators.required]),
        idArtis: new FormControl(null, [Validators.required]),
        fotoCover: new FormControl,
        keterangan: new FormControl
      });

      this.lablesRekamanService.listLablesRekaman().subscribe((data)=>{
        console.log(data);
        this.listLables=data;
        }, error => {
            console.log(error);
        })

      this.artisService.listArtis().subscribe((data)=>{
        console.log(data);
        this.listArtis=data;
        }, error => {
            console.log(error);
        })
    }
  
    ngOnInit(): void {
      this.route.params.subscribe(rute => {
        this.id = rute.id;
        this.albumsService.getAlbumsById(this.id).subscribe(data => {
          this.addAlbumsForm.get('idAlbum').setValue(data.idAlbum);
          this.addAlbumsForm.get('namaAlbums').setValue(data.namaAlbums);
          this.addAlbumsForm.get('idLabel').setValue(data.idLabel);
          this.addAlbumsForm.get('idArtis').setValue(data.idArtis);
          this.addAlbumsForm.get('fotoCover').setValue(data.fotoCover);
          this.addAlbumsForm.get('keterangan').setValue(data.keterangan);
        }, error => {
          alert("Data Tidak Ditemukan !");
        });
      });
    }
  
    simpanAlbums(): void {
      this.upload();
      console.log(this.addAlbumsForm.value);
      let albm = new Albums();
      albm.idAlbum = this.addAlbumsForm.value.idAlbum;
      albm.namaAlbums = this.addAlbumsForm.value.namaAlbums;
      albm.idLabel = this.addAlbumsForm.value.idLabel;
      albm.idArtis = this.addAlbumsForm.value.idArtis;
      albm.fotoCover = this.addAlbumsForm.value.fotoCover;
      albm.keterangan = this.addAlbumsForm.value.keterangan;
      this.albumsService.insertAlbums(albm).subscribe((data) => {
        
        console.log(data);
        this.router.navigate(['/listalbums']);
      });
    }
  
    selectFile(event) {
      this.selectedFiles = event.target.files;
    }
  
    upload() {
      this.progress = 0;
  
      this.currentFile = this.selectedFiles.item(0);
      this.albumsService.upload(this.currentFile).subscribe(
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