import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
import { ArtisService } from './artis.service';

@Component({
    selector: 'app-home',
    templateUrl: './artislist.component.html',
    providers: [ArtisService]
})

export class ArtisListComponent implements OnInit, AfterViewInit {

    @ViewChild(DataTableDirective, {static: false})
    dtElement: DataTableDirective;
    dtOptions: any = {};
    dtTrigger: Subject<any> = new Subject();
    cariForm: FormGroup;

    constructor(private artisService: ArtisService){

    }

    

    ngOnInit(): void{
        this.cariForm = new FormGroup( {
            namaArtis: new FormControl('')
        });

        const that = this;
        this.dtOptions = {
            ajax: (dataTablesParameters: any, callback) => {
                const parameter = new Map<string, any>();
                parameter.set('namaArtis', this.cariForm.controls.namaArtis.value);
                that.artisService.getListArtisAll(parameter, dataTablesParameters).subscribe(resp => {
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
                data: 'idArtis',
                orderable: false
            }, {
                title: 'Name',
                data: 'namaArtis'
            }, {
                title: 'Foto',
                data: 'foto'
            }, {
                title: 'URL Website',
                data: 'urlWebsite'
            }, {
                title: 'Keterangan',
                data: 'keterangan'
            }, {
                title: 'Action',
                orderable: false,
                render(data, type, row) {
                    return '<a href="editmethod/${row.idArtis}" class="btn btn-warning btn-xs edit" data-element-id="${row.idArtis}"><i class ="glyphicon glyphicon-edit">Edit</i></a>'
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