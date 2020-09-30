import { HttpClient, HttpEvent, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { DatatablesRequest } from '../model/datatablesrequest.model';
import { DataTablesResponse } from '../model/datatablesresponse.model';
import { Albums } from './albums';

@Injectable()
export class AlbumsService{
    constructor(private httpKlien: HttpClient){

    }

    insertAlbums(albums: Albums): Observable<any> {
        return this.httpKlien.post(environment.baseUrl +'/savealbumsjson' , albums)
        .pipe(map(data => data));
    }

    listAlbums( ): Observable<Albums[]> {
        return this.httpKlien.get(environment.baseUrl +'/listalbumsjson')
        .pipe(map(data => <Albums[]> data));
    }

    getAlbumsById(id): Observable<Albums> {
        return this.httpKlien.get(environment.baseUrl +'/listalbumsjson/'+id)
        .pipe(map(data => data as Albums));
    }

    getAlbumsByArtis(ids): Observable<Albums[]> {
        return this.httpKlien.get(environment.baseUrl +'/listalbumsjson/'+ids)
        .pipe(map(data => data as Albums[]));
    }

    deleteAlbums(id): Observable<any>{
        return this.httpKlien.delete(environment.baseUrl + '/deletealbums/'+id)
        .pipe(map(data => data))
    }

    getListAlbumsAll(parameter: Map<string, any>, dataTablesParameters: any): Observable<DataTablesResponse> {
        const dtReq = new DatatablesRequest();
        dtReq.draw = dataTablesParameters.draw;
        dtReq.length = dataTablesParameters.length;
        dtReq.start = dataTablesParameters.start;
        dtReq.sortCol = dataTablesParameters.order[0].column;
        dtReq.sortDir = dataTablesParameters.order[0].dir;
        dtReq.extraParam = {};

        parameter.forEach((value, key) => {
            dtReq.extraParam[key] = value;
        });
        return this.httpKlien.post(environment.baseUrl + '/listalbumsdatajson', dtReq
        ).pipe(map(data => data as DataTablesResponse));
    }

    upload(file: File): Observable<HttpEvent<any>> {
        const formData: FormData = new FormData();

        formData.append('file', file);

        const req = new HttpRequest('POST', environment.baseUrl + '/uploadalbums', formData, {
            reportProgress: true,
            responseType: 'json'
        });

        return this.httpKlien.request(req);
    }

}