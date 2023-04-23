import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { LogService } from './log.service';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Pagedmessage } from '../../models/message.type';
import { Message } from 'primeng/api';
import { InputTextModule } from 'primeng/inputtext';
import { MessageModule } from 'primeng/message';
import { TableModule } from 'primeng/table';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';

@Component({
  selector: 'nam-log-web-log',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    InputTextModule,
    MessageModule,
    TableModule,
    InfiniteScrollModule,
  ],
  template: `
    <form [formGroup]="inputForm" (ngSubmit)="inputForm.valid && onSubmit()">
      <div class="flex align-items-center flex-wrap card-container">
        <span class="p-input-icon-left">
          <i class="pi pi-search"></i>
          <input
            type="text"
            pInputText
            placeholder="Username"
            formControlName="username"
          />
        </span>
        <p-message
          *ngIf="info !== undefined"
          severity="{{ info.severity }}"
          text="{{ info.message }}"
        ></p-message>
      </div>
    </form>

    <p-table
      *ngIf="messages.length > 0"
      [columns]="columns"
      [value]="messages"
      responsiveLayout="stack"
      styleClass="p-datatable-sm p-datatable-=striped p-datatable-gridlines"
      [resizableColumns]="true"
      infiniteScroll
      [infiniteScrollDistance]="0.5"
      [infiniteScrollThrottle]="100"
      (scrolled)="onScroll()"
    >
      <ng-template pTemplate="header">
        <tr>
          <th *ngFor="let col of columns; let idx = index">
            {{ col.header }}
          </th>
        </tr>
      </ng-template>
      <ng-template pTemplate="body" let-message>
        <tr>
          <td>{{ formatDate(message.time) }}</td>
          <td>{{ message.username }}</td>
          <td style="white-space: break-spaces">{{ message.message }}</td>
        </tr>
      </ng-template>
    </p-table>
    <div
      *ngIf="!errorMessage"
      class="flex align-items-center flex-wrap card-container mt-2 mb-2"
    >
      <p-message
        severity="info"
        *ngIf="!pagedmessage; else endOfLogs"
        text="Loading messages..."
      ></p-message>
    </div>
    <ng-template #endOfLogs>
      <p-message
        *ngIf="pagedmessage!.finalPage && totalMessages !== 0; else loadMore"
        severity="info"
        text="End of logs."
      ></p-message>
    </ng-template>
    <ng-template #loadMore>
      <p-message
        *ngIf="totalMessages !== 0"
        severity="info"
        text="Keep scrolling to load more messages."
      ></p-message>
    </ng-template>
  `,
  styles: [],
})
export class LogComponent {
  private readonly PAGE_SIZE: number = 200;
  username: string;
  inputForm: FormGroup = new FormGroup({
    username: new FormControl('', [Validators.required]),
  });
  columns: { field: string; header: string }[] = [
    { field: 'time', header: 'Time UTC' },
    { field: 'username', header: 'User' },
    { field: 'message', header: 'Message' },
  ];

  pagedmessage: Pagedmessage | undefined = undefined;
  totalMessages = -1;
  lastId = 0;
  messages: Array<Message> = new Array<Message>();
  errorMessage: string | undefined = undefined;
  page = 0;
  info: { message: string; severity: string } | undefined = undefined;

  constructor(
    private titleService: Title,
    private route: ActivatedRoute,
    private router: Router,
    private logService: LogService
  ) {
    this.username = route.snapshot.params['username'];
    this.getMessages();
  }

  onSubmit() {
    this.username = this.inputForm.value.username;
    this.router.navigate(['logs/' + this.username]).then(() => {
      this.clearVariables();
      this.getMessages();
    });
  }

  getMessages(): void {
    this.logService
      .getPage(this.username, this.lastId, this.PAGE_SIZE)
      .subscribe({
        next: (params) => {
          this.pagedmessage = params;
          this.totalMessages =
            this.pagedmessage.totalMessages == -1
              ? this.totalMessages
              : this.pagedmessage.totalMessages;
          this.lastId = this.pagedmessage.lastId;
          this.messages = this.messages.concat(this.pagedmessage.messages);
          this.titleService.setTitle(`Logs for ${this.username}`);
        },
        error: (err) => {
          console.log('ERROR', err);
          this.errorMessage = err.toString();
          this.makeInfoMessage();
        },
        complete: () => {
          this.makeInfoMessage();
        },
      });
  }

  formatDate(date: string): string {
    return date.replace('T', ' ').replace('Z', '');
  }

  onScroll(): void {
    if (this.pagedmessage?.finalPage) return;
    this.page++;
    this.getMessages();
  }

  clearVariables(): void {
    this.pagedmessage = undefined;
    this.messages = new Array<Message>();
    this.page = 0;
    this.errorMessage = undefined;
    this.totalMessages = -1;
    this.lastId = 0;
    this.info = undefined;
  }

  makeInfoMessage(): void {
    if (this.totalMessages > -1) {
      this.info = {
        message: `${this.totalMessages} messages found for ${this.username}.`,
        severity: 'info',
      };
    }
    if (this.totalMessages === 0) {
      this.info = {
        message: `No messages found for ${this.username}.`,
        severity: 'warn',
      };
    }
    if (this.errorMessage) {
      this.info = { message: this.errorMessage, severity: 'error' };
    }
  }
}
