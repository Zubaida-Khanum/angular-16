import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
const headers = new HttpHeaders().set('Content-Type', 'application/json');
@Injectable({
  providedIn: 'root',
})
export class ApiProviderService {
  API_URL: string = '';
  REPORTING_API_URL: string = '';
  constructor(private http: HttpClient) {
    // this.API_URL = 'http://103.193.18.35:8084/api/';
    // this.API_URL = 'https://localhost:7189/api/';
    this.API_URL = 'https://localhost:7251/api/';
  }
  get(endPoint: string, params?: { [param: string]: any }, responseType?: any) {
    return this.http.get(this.API_URL + endPoint, {
      headers: headers,
      params: params ? { ...params } : {},
      // responseType:  responseType ? responseType : 'text' as 'json',
    });
  }
  getReport(endPoint: string, params?: { [param: string]: any }) {
    return this.http.get(this.REPORTING_API_URL + endPoint, {
      responseType: 'blob',
    });
  }
  post(data: any, endPoint: String, paramData?: any): Observable<any> {
    return this.http.post<any>(this.API_URL + endPoint, data, {
      headers: headers,
      params: paramData ? paramData : { ...data },
      // responseType:  responseType? responseType : 'text' as 'json',
    });
  }
  update(data: any, endPoint: String): Observable<any> {
    return this.http.put<any>(this.API_URL + endPoint, data, {
      headers: headers,
      params: { ...data },
      // responseType:  responseType? responseType : 'text' as 'json',
    });
  }
  delete(endPoint: String, params?: { [param: string]: any }) {
    return this.http.delete(this.API_URL + endPoint, {
      headers: headers,
      params: params ? { ...params } : {},
      // responseType:  responseType? responseType : 'text' as 'json',
    });
  }
  sendData(data: any): Observable<any> {
    const headers = {
      'Content-Type': 'application/json',
    };
    return this.http.post(`${this.API_URL}api/OGP/CreateOGPDetail`, data, {
      headers,
      responseType: 'json',
    });
  }
  //Documents
  saveDataWithDocument<T>(
    endPoint: string,
    data: any,
    file: File | undefined
  ): Observable<any> {
    const formData = new FormData();
    if (!!file) {
      formData.append('File', file);
    }
    // formData.append('Data', JSON.stringify(data));
    return this.http.post<any>(`${this.API_URL}${endPoint}`, formData, {
      params: { ...data },
      responseType: 'text' as 'json',
    });
  }
  updateDataWithDocument(
    endPoint: string,
    data: any,
    file: File
  ): Observable<any> {
    const formData = new FormData();
    if (!!file) {
      formData.append('file', file);
    }
    // formData.append('data', JSON.stringify(data));
    return this.http.put<any>(`${this.API_URL}${endPoint}`, formData, {
      params: { ...data },
      responseType: 'text' as 'json',
    });
  }
  viewDocument(endPoint: string): Observable<Blob> {
    const url = `${this.API_URL}${endPoint}`;
    return this.http.get(url, { responseType: 'blob' });
  }
  // savedocument(data: any, images: File[]): Observable<any> {
  //   const formData = new FormData();
  //   return this.http.post<any>(
  //     `${this.API_URL}Documentupload`,
  //     formData,
  //     {
  //       params: { ...data },
  //       responseType: 'text' as 'json',
  //     }
  //   );
  // }
}
