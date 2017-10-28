import { Maybe } from 'tsmonad';
import { Response } from "express"

export enum Errors {
  NOT_FOUND = "not found",
  BAD_REQUEST = "bad request",
  UNAUTHERIZED = "unautherized"
}

export enum StatusCode {
  OK = 200,
  CREATED = 201,
  NOT_FOUND = 404,
  BAD_REQUEST = 400,
  UNAUTHERIZED = 401,
  INTERNAL_SERVER_ERROR = 500
}



export interface IErrorHandler {
  apply(res: Response): Response
}

export class ErrorHandler<T> implements IErrorHandler {
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

export class InternalServerError<T> extends ErrorHandler<T> {
  constructor(public internalError: T) {
    super(StatusCode.INTERNAL_SERVER_ERROR, Maybe.nothing())
  }
}

export class Unautherized extends ErrorHandler<string> {
  constructor() {
    super(StatusCode.UNAUTHERIZED, Maybe.just(Errors.UNAUTHERIZED))
  }
}

export class BadRequest extends ErrorHandler<string> {
  constructor() {
    super(StatusCode.BAD_REQUEST, Maybe.just(Errors.BAD_REQUEST))
  }
}
