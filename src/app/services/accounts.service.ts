import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Customer} from '../model/customer.model';
import {AccountDetails} from '../model/account.model';

@Injectable({
  providedIn: 'root'
})
export class AccountsService {
  banckendHost: string="http://localhost:8085";
  constructor(private http: HttpClient) { }

  public getAccount(accountId: string, page: number, Size: number): Observable<AccountDetails> {
    return this.http.get<AccountDetails>(this.banckendHost + "/accounts/" + accountId + "/pageOperations?page=" + page + "&Size=" + Size);
  }
}
