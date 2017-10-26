import { Maybe } from 'tsmonad';
import { Response } from "express"

export enum Errors {
  NOT_FOUND = "not found",
  BAD_REQUEST = "bad request"
}

export enum StatusCode {
  OK = 200,
  CREATED = 201,
  NOT_FOUND = 404,
  BAD_REQUEST = 400
}

export class ErrorHandler<T> {
  constructor(public status: number, public payload: Maybe<T>) { }

  apply(res: Response) {
    return this.payload.caseOf(
      {
        just: (p) => res.status(this.status).send(p),
        nothing: () => res.sendStatus(this.status) 
      }
    )
  }
}

export class NoSuchElement extends ErrorHandler<string> {
  constructor() {
    super(StatusCode.NOT_FOUND, Maybe.just("No such element"))
  }
}
