import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BitHttpService, ListByPage } from 'ngx-bit';

@Injectable()
export class RequestLogService {
  private model = 'request_log';

  constructor(
    private http: BitHttpService
  ) {
  }

  lists(factory: ListByPage, refresh: boolean, persistence: boolean): Observable<any> {
    return this.http.lists(this.model, factory, {
      refresh,
      persistence
    });
  }
}
