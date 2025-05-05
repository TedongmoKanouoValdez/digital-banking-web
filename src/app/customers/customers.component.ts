import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import {CustomerService} from '../services/customer.service';
import {catchError, map, Observable, throwError} from 'rxjs';
import {Customer} from '../model/customer.model';
import {FormBuilder, FormGroup, ReactiveFormsModule} from '@angular/forms'; // Importer CommonModule pour *ngIf et *ngFor

@Component({
  selector: 'app-customers',
  standalone: true,
  imports: [RouterModule, CommonModule, ReactiveFormsModule], // Ajout de CommonModule pour *ngIf et *ngFor
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.css']
})
export class CustomersComponent implements OnInit {
  customers!: Observable<Array<Customer>>;
  errorMessage!: string;
  searchFormGroup: FormGroup | undefined;

  constructor(private customerService: CustomerService,
              private fb: FormBuilder) {
  }

  ngOnInit() {
    this.searchFormGroup = this.fb.group({
        keyword: this.fb.control("")
      }
    );
   this.handleSearchCustomers();
  }

  handleSearchCustomers() {
    let kw=this.searchFormGroup?.value.keyword;
    this.customers = this.customerService.searchCustomers(kw).pipe(
      catchError(err=> {
        this.errorMessage = err.message;
        return  throwError(err);
      }),
    );
  }

  handleDeleteCustomers(c: Customer) {
    let conf = confirm("ARE you sure");
    if(!conf) return;
    this.customerService.deleteCustomers(c.id).subscribe(
      {
        next : (resp ) => {
          this.customers = this.customers.pipe(
            map(data => {
              let index = data.indexOf(c);
              data.slice(index, 1);
              return data;
            })
          );
        },
        error : error => {
          console.log(error);
        }
      }
    )
  }
}
