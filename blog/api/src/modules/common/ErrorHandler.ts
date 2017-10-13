import { Maybe } from 'tsmonad';
import { Response } from "express"

export enum Errors {
  NOT_FOUND = 404,
  BAD_REQUEST = 400
}

export class ErrorHandler<T> {
  constructor(public status: number, public payload: Maybe<T>) { }

  apply(res: Response) {
    console.log(this.payload)
    return this.payload.caseOf(
      {
        just: (p) => res.status(this.status).send(p),
        nothing: () => res.sendStatus(this.status) 
      }
    )
  }
}
