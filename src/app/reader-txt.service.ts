import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map, of, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ReaderTxtService {
  constructor(private _http: HttpClient) {}

  getAllTxt(): Observable<any> {
    return this._http
      .get('assets/lista.txt', { responseType: 'text' as 'json' })
      .pipe(map((data: any) => data));
  }
}
