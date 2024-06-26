import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, from } from 'rxjs';
import { NgxCsvParser, NgxCSVParserError } from 'ngx-csv-parser';
import { map, catchError, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CsvDataService {
  private canadaUrl = 'https://health-infobase.canada.ca/src/data/covidLive/covid19.csv';
  private ontarioUrl = 'https://covid-19.ontario.ca#covidNumbersSection';

  constructor(private http: HttpClient, private ngxCsvParser: NgxCsvParser) { }

  getCanadaData(): Observable<any[]> {
    return this.http.get(this.canadaUrl, { responseType: 'text' }).pipe(
      switchMap((csv: string) => {
        const blob = new Blob([csv], { type: 'text/csv' });
        const file = new File([blob], 'covid19.csv', { type: 'text/csv' });
        return from(this.ngxCsvParser.parse(file, { header: true, delimiter: ',' })).pipe(
          map((result: any[] | NgxCSVParserError) => {
            if (result instanceof NgxCSVParserError) {
              throw result;
            }
            return result;
          }),
          catchError((error: NgxCSVParserError) => {
            console.error('Error parsing CSV:', error);
            return of([]);  
          })
        );
      }),
      catchError((error) => {
        console.error('Error fetching CSV:', error);
        return of([]);
      })
    );
  }

  getOntarioData(): Observable<any[]> {
    return this.http.get(this.ontarioUrl, { responseType: 'text' }).pipe(
      switchMap((csv: string) => {
        const blob = new Blob([csv], { type: 'text/csv' });
        const file = new File([blob], 'covid19.csv', { type: 'text/csv' });
        return from(this.ngxCsvParser.parse(file, { header: true, delimiter: ',' })).pipe(
          map((result: any[] | NgxCSVParserError) => {
            if (result instanceof NgxCSVParserError) {
              throw result;
            }
            return result;
          }),
          catchError((error: NgxCSVParserError) => {
            console.error('Error parsing CSV:', error);
            return of([]);  
          })
        );
      }),
      catchError((error) => {
        console.error('Error fetching CSV:', error);
        return of([]);
      })
    );
  }
}
