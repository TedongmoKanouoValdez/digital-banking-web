import {Component, OnInit} from '@angular/core';
import {Router, RouterModule} from '@angular/router';
import {CommonModule} from '@angular/common';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {Customer} from '../model/customer.model';
import {CustomerService} from '../services/customer.service';

@Component({
  selector: 'app-new-customer',
  standalone: true,
  imports: [RouterModule, CommonModule, ReactiveFormsModule], // Ajout de CommonModule pour *ngIf et *ngFor
  templateUrl: './new-customer.component.html',
  styleUrl: './new-customer.component.css'
})
export class NewCustomerComponent implements OnInit{
newCustomerFromGroup!: FormGroup;
  constructor(private fb: FormBuilder, private customerService: CustomerService,private router : Router) {
  }

  ngOnInit() {
      this.newCustomerFromGroup = this.fb.group({
        name: this.fb.control(null, [Validators.required, Validators.minLength(6)]),
        email: this.fb.control(null, [Validators.required, Validators.email]),
      })
  }

  handleSaveCustomer() {
    let customer: Customer = this.newCustomerFromGroup.value;
    this.customerService.saveCustomers(customer).subscribe(
      {
        next : data => {
          alert ("customer has been successfully saved!");
          //this.newCustomerFromGroup.reset();
          this.router.navigateByUrl('/customers');
        },
        error : error => {
          console.log(error);
        }
      }
    )
  }
}
