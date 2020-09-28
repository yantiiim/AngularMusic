import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
import { AlbumsService } from './albums.service';

@Component({
    selector: 'app-home',
    templateUrl: './albumslist.component.html',
    providers: [AlbumsService]
})

export class AlbumsListComponent implements OnInit, AfterViewInit {

    @ViewChild(DataTableDirective, {static: false})
    dtElement: DataTableDirective;
    dtOptions: any = {};
    dtTrigger: Subject<any> = new Subject();
    cariForm: FormGroup;

    constructor(private albumsService: AlbumsService){

    }

    

    ngOnInit(): void{
        this.cariForm = new FormGroup( {
            namaAlbums: new FormControl('')
        });

        const that = this;
        this.dtOptions = {
            ajax: (dataTablesParameters: any, callback) => {
                const parameter = new Map<string, any>();
                parameter.set('namaAlbums', this.cariForm.controls.namaAlbums.value);
                that.albumsService.getListAlbumsAll(parameter, dataTablesParameters).subscribe(resp => {
                    callback({
                        recordsTotal: resp.recordsTotal,
                        recordsFiltered: resp.recordsFiltered,
                        data: resp.data,
                        draw: resp.draw
                    })
                })
            },
            serverSide: true,
            processing: true,
            filter: false,
            columns: [{
                title: 'ID',
                data: 'idAlbum',
                orderable: false
            }, {
                title: 'Name',
                data: 'namaAlbums'
            }, {
                title: 'Nama Labels',
                data: 'namaLabels'
            }, {
                title: 'Nama Artis',
                data: 'namaArtis'
            }, {
                title: 'Foto Cover',
                data: 'fotoCover'
            }, {
                title: 'Keterangan',
                data: 'keterangan'
            }, {
                title: 'Action',
                orderable: false,
                render(data, type, row) {
                    return '<a href="editmethod/${row.idAlbum}" class="btn btn-warning btn-xs edit" data-element-id="${row.idAlbum}"><i class ="glyphicon glyphicon-edit">Edit</i></a>'
                }
            }],
            rowCallback(row, data, dataIndex) {
                const idx = ((this.api().page()) * this.api().page.len()) + dataIndex + 1;
                $('td:eq(0)', row).html('<b>' + idx + '</b>');
                }
        };
        

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

}