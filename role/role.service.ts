import { Injectable } from '@angular/core';
import { BitCurdCommonService, BitHttpService, ListByPage } from 'ngx-bit';
import { Observable, of } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

@Injectable()
export class RoleService {
  private model = 'role';

  constructor(private http: BitHttpService, private curd: BitCurdCommonService) {}

  originLists(): Observable<any> {
    return this.curd.originLists(this.model);
  }

  lists(factory: ListByPage, refresh: boolean, persistence: boolean): Observable<any> {
    return this.curd.lists(this.model, factory, {
      refresh,
      persistence
    });
  }

  get(id: any): Observable<any> {
    return this.curd.get(this.model, id);
  }

  add(data: any): Observable<any> {
    return this.curd.add(this.model, data);
  }

  edit(data: any): Observable<any> {
    return this.curd.edit(this.model, data);
  }

  delete(id: any[]): Observable<any> {
    return this.curd.delete(this.model, id);
  }

  status(data: any): Observable<any> {
    return this.curd.status(this.model, data);
  }

  /**
   * Validate Role Key
   */
  validedKey(key: string, edit: Observable<any> = of(null)): Observable<any> {
    return edit.pipe(
      switchMap(editKey => {
        if (key !== editKey) {
          return this.http.req(this.model + '/validedKey', {
            key
          });
        }
        return of({
          error: 0,
          data: {
            exists: false
          }
        });
      }),
      map(res => {
        if (res.error === 1) {
          return false;
        }
        return !res.data.exists;
      })
    );
  }
}
