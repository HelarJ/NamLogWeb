import {Component, OnInit } from "@angular/core";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {LogService} from "./log.service";
import {Pagedmessage} from "../../model/pagedmessage.type";
import {Title} from "@angular/platform-browser";
import {Message} from "../../model/message.type";


@Component({
  selector: 'app-log',
  templateUrl: 'log.component.html',
  styleUrls: ['log.component.css']
})

export class LogComponent implements OnInit {

  public inputForm:FormGroup;
  public pagedmessage:Pagedmessage | undefined = undefined
  public messages:Array<Message> = new Array<Message>()
  public username: string = "default"
  private page:number = 0
  public error:string | undefined = undefined

  constructor(private route: ActivatedRoute, private logService: LogService, private router:Router,
              private titleService: Title) {
    this.inputForm = new FormGroup({
      "username": new FormControl("", [Validators.required])
    })
  }
  clearVariables() : void{
    this.pagedmessage = undefined;
    this.messages = new Array<Message>()
    this.page = 0;
    this.error = undefined;
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
    this.logService.getPage(this.username, this.page, 200).subscribe({
      next: (params) => {
        this.pagedmessage = params;
        this.messages = this.messages.concat(this.pagedmessage.content)
      },
      error: (err) => {
        this.error = err.toString()
        console.log(this.error);},
      complete(): void {}
    });
  }

  formatDate(date: string): string{
    return "[" + date.replace("T", " ").replace("Z", "") + "]"
  }

  onScroll() : void {
    if (this.pagedmessage?.last) return
    this.page++;
    this.getMessages()
  }
}
