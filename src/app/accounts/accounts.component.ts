import {Component, OnInit} from '@angular/core';
import {Router, RouterModule} from '@angular/router';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {AccountsService} from '../services/accounts.service';
import {Observable} from 'rxjs';
import {AccountDetails} from '../model/account.model';
import {AsyncPipe, CommonModule} from '@angular/common';

@Component({
  selector: 'app-accounts',
  imports: [RouterModule, ReactiveFormsModule, AsyncPipe, CommonModule],
  templateUrl: './accounts.component.html',
  styleUrl: './accounts.component.css',
  standalone: true

})
export class AccountsComponent implements OnInit{
  accountFormGroup!: FormGroup;
  currentPage : number = 0;
  pagesize : number = 5;
  accountObservable!: Observable<AccountDetails>;

  constructor(private fb: FormBuilder, private accountService: AccountsService) {}

  ngOnInit() {
    this.accountFormGroup = this.fb.group({
      accountId: this.fb.control(null, [Validators.required]),
    })
  }

  handleSearchAccount() {
    let accountId : string = this.accountFormGroup.value.accountId;
    this.accountObservable = this.accountService.getAccount(accountId, this.currentPage, this.pagesize);
  }

  gotoPage(page: number) {
    this.currentPage = page;
    this.handleSearchAccount();
  }
}
