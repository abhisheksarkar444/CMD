import { Injectable } from "@angular/core";
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap, map } from 'rxjs/operators';
import { GetBlob } from '../servicetypes/GetBlob';
import { Blob } from '../servicetypes/blob';
import { CreateFileInfo, ParamInfo } from '../servicetypes/UploadedFileInfo';

@Injectable({
    providedIn: 'root'
})
export class FileAttachService {
    blobId: number;
    uid: string;
    blobobj: Blob;

    constructor(private http: HttpClient) { }

    createandputFileHeader = {
        headers: new HttpHeaders({
            'Content-Type': 'application/json',
            'QuickBlox-REST-API-Version': '0.1.0',
            'QB-Token': sessionStorage.getItem('QBToken')
        }),
    };

    createFileBody: any = {
        "blob":
        {
            "content_type": "image/jpeg",
            "name": "museum.jpeg",
            "public": "true"
        }
    }


    createFile(): Promise<CreateFileInfo> {
        let url = "https://api.quickblox.com/blobs.json";
        let promise = new Promise<CreateFileInfo>((resolve, reject) => {
            this.http.post(url, this.createFileBody, this.createandputFileHeader)
                .toPromise()
                .then(
                    ({ blob }: { blob: Blob }) => {
                        var x: ParamInfo[] = [];
                        var paramaters = new URL(blob.blob_object_access.params).searchParams;
                        this.blobId = blob.id;
                        paramaters.forEach((value, key) => {
                            x.push({ Key: key, Value: value });
                        });
                        resolve({
                            Uid: blob.uid,
                            Id: blob.id,
                            Params: x
                        });
                    }
                );
        });
        return promise;
    }


    getFilesRequestHeader = {
        headers: new HttpHeaders({
            'QuickBlox-REST-API-Version': '0.1.0',
            'QB-Token': sessionStorage.getItem('QBToken')
        })
    };

    getFileMethod(): Observable<GetBlob> {
        let url = "https://api.quickblox.com/blobs.json";
        return this.http.post<GetBlob>(url, this.getFilesRequestHeader).pipe(tap(() => console.log('Getting all files')));
    }

    uploadFileMethod(Params: any, fileUpload: File): Promise<any> {

        let url = `https://qbprod.s3.amazonaws.com/`;

        var fd = new FormData();
        fd.append('Content-Type', Params[0].Value);
        fd.append('Expires', Params[1].Value);
        fd.append('acl', Params[2].Value);
        fd.append('key', Params[3].Value);
        fd.append('policy', Params[4].Value);
        fd.append('success_action_status', Params[5].Value);
        fd.append('x-amz-algorithm', Params[6].Value);
        fd.append('x-amz-credential', Params[7].Value);
        fd.append('x-amz-date', Params[8].Value);
        fd.append('x-amz-signature', Params[9].Value);
        fd.append('file', fileUpload, fileUpload.name);
        let promise = new Promise((resolve, reject) => {
            this.http.post(url, fd, { responseType: 'text' })
                .toPromise()
                .then((data) => {
                });
        });
        return promise;
    }

    declareFileBody: any = { "blob": { "size": "86" } };

    declareFileMethod(blobId: number): Promise<boolean> {
        let url = `https://api.quickblox.com/blobs/${blobId}/complete.json`;
        let promise = new Promise<boolean>((resolve, reject) => {
            this.http.put<any>(url, this.declareFileBody, this.createandputFileHeader)
                .toPromise()
                .then((data) => {
                    console.log(data);
                    resolve(true);
                });
        });
        return promise;
    }

    getFileByID(blob_id: any): Observable<Blob> {
        let url = `https://api.quickblox.com/blobs/${blob_id}.json`;
        return this.http.get<Blob>(url, this.getFilesRequestHeader).pipe(tap(() => console.log('Get information about file by id')));
    }

}





