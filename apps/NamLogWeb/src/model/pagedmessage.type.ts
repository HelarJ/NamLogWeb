import { Message } from "./message.type";


export interface Pagedmessage {
  messages: Array<Message>,
  lastId: number,
  finalPage: boolean,
  totalMessages: number
}
