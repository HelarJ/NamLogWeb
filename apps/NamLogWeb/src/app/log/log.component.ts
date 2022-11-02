import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { LogService } from "./log.service";
import { Pagedmessage } from "../../model/pagedmessage.type";
import { Title } from "@angular/platform-browser";
import { Message } from "../../model/message.type";


@Component({
  selector: 'app-log',
  templateUrl: 'log.component.html',
  styleUrls: ['log.component.css']
})

export class LogComponent implements OnInit {

  public inputForm:FormGroup;
  public pagedmessage:Pagedmessage | undefined = undefined
  public totalMessages: number = -1
  public lastId: number = 0
  public messages:Array<Message> = new Array<Message>()
  public username: string = "default"
  private page:number = 0
  public error:string | undefined = undefined
  public columns: any[];

  private PAGE_SIZE:number = 200;

  constructor(private route: ActivatedRoute, private logService: LogService, private router:Router,
              private titleService: Title) {
    this.inputForm = new FormGroup({
      "username": new FormControl("", [Validators.required])
    })

    this.columns = [
      { field: 'time', header: 'Time' },
      { field: 'username', header: 'User' },
      { field: 'message', header: 'Message' }
    ];
  }
  clearVariables() : void{
    this.pagedmessage = undefined;
    this.messages = new Array<Message>()
    this.page = 0;
    this.error = undefined;
    this.totalMessages = -1;
    this.lastId = 0;
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.username = params["username"];
      this.titleService.setTitle("Logs for "+ this.username )
      this.clearVariables()
      this.getMessages()}
    )
  }
  onSubmit(){
    this.username = this.inputForm.value.username
    this.router.navigate(["logs/" + this.username])
  }

  getMessages(): void {
    this.logService.getPage(this.username, this.lastId, this.PAGE_SIZE).subscribe({
      next: (params) => {
        this.pagedmessage = params;
        this.totalMessages = this.pagedmessage.totalMessages == -1 ? this.totalMessages : this.pagedmessage.totalMessages
        this.lastId = this.pagedmessage.lastId
        this.messages = this.messages.concat(this.pagedmessage.messages)
      },
      error: (err) => {
        this.error = err.toString()
        console.log(this.error);},
      complete(): void {}
    });
  }

  formatDate(date: string): string{
    return date.replace("T", " ").replace("Z", "")
  }

  onScroll() : void {
    if (this.pagedmessage?.finalPage) return
    this.page++;
    this.getMessages()
  }
}
