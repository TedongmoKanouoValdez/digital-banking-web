import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Customer} from '../model/customer.model';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  banckendHost: string="http://localhost:8085";
  constructor(private http: HttpClient) { }

  public getCustomers() : Observable<Array<Customer>>{
    return this.http.get<Array<Customer>>(this.banckendHost + "/customers")
  }
  public searchCustomers(keyword: string) : Observable<Array<Customer>>{
    return this.http.get<Array<Customer>>(this.banckendHost + "/customers/search?keyword="+keyword)
  }
  public saveCustomers(customer: Customer) : Observable<Customer>{
    return this.http.post<Customer>(this.banckendHost + "/customers", customer)
  }
  public deleteCustomers(id: Number) {
    return this.http.delete<Customer>(this.banckendHost + "/customers/" + id)
  }
}
