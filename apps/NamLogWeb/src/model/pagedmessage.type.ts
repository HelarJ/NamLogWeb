import {Message} from "./message.type";
import {Pageable} from "./pageable.type";


export interface Pagedmessage {
  content: Array<Message>
  pageable: Pageable
  last: boolean
  totalElements: number
  totalPages: number
  size: number
  number: number
  sort: any
  first: boolean
  numberOfElements: number
  empty: boolean
}
