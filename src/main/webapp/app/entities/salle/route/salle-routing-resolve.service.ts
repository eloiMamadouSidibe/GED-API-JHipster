import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { ISalle } from '../salle.model';
import { SalleService } from '../service/salle.service';

@Injectable({ providedIn: 'root' })
export class SalleRoutingResolveService implements Resolve<ISalle | null> {
  constructor(protected service: SalleService, protected router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<ISalle | null | never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        mergeMap((salle: HttpResponse<ISalle>) => {
          if (salle.body) {
            return of(salle.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(null);
  }
}
