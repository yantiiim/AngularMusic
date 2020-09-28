import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Genre } from './genre';
import { GenreService } from './genre.service';

@Component({
    selector: 'app-genre',
    templateUrl: './genre.component.html',
    providers: [GenreService]
  })

  export class GenreComponent implements OnInit {

    id: string;
  addGenreForm: FormGroup;
  
  selectedFiles: FileList;
  currentFile: File;
  progress = 0;
  
    constructor(private genreService: GenreService, private route: ActivatedRoute, private router: Router) {
      this.addGenreForm = new FormGroup({
        idGenre: new FormControl(null, [Validators.required]),
        namaGenre: new FormControl(null, [Validators.required, Validators.minLength(3)])
      });
    }
  
    ngOnInit(): void {
      this.route.params.subscribe(rute => {
        this.id = rute.id;
        this.genreService.getGenreById(this.id).subscribe(data => {
          this.addGenreForm.get('idGenre').setValue(data.idGenre);
          this.addGenreForm.get('namaGenre').setValue(data.namaGenre);
        }, error => {
          alert("Data Tidak Ditemukan !");
        });
      });
    }
  
    simpanGenre(): void {
      console.log(this.addGenreForm.value);
      let gen = new Genre();
      gen.idGenre = this.addGenreForm.value.idGenre;
      gen.namaGenre = this.addGenreForm.value.namaGenre;
      this.genreService.insertGenre(gen).subscribe((data) => {
        
        console.log(data);
        this.router.navigate(['/listgenre']);
      });
    }
  
    selectFile(event) {
      this.selectedFiles = event.target.files;
    }
  
  
  }