export interface Message {
  id: number;
  time: string;
  username: string;
  message: string;
}
export interface Pagedmessage {
  messages: Array<Message>;
  lastId: number;
  finalPage: boolean;
  totalMessages: number;
}
