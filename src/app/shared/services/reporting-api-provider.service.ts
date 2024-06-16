import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

const headers = new HttpHeaders().set(
  'Content-Type',
  'text/plain; charset=utf-8'
);

@Injectable({
  providedIn: 'root'
})

export class ReportingApiProviderService {

  API_URL:string = '';
  REPORTING_API_URL:string = '';

  constructor(
    private http: HttpClient,
    )
    {
       this.API_URL = '';
       this.REPORTING_API_URL = '';
    }

  post(data: any, endPoint: String, paramData?: any ): Observable<any> {
    return this.http.post<any>(this.REPORTING_API_URL + endPoint, data, {
      headers: headers,
      params: paramData? paramData: { ...data },
      // responseType:  responseType? responseType : 'text' as 'json',
    });
  }

  get(endPoint: string): Observable<Blob> {
    return this.http.get(this.REPORTING_API_URL + endPoint, { responseType: 'blob' });
  }

}
