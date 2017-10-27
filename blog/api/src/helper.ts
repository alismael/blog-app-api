import { Request, Response } from "express"

export function setCookie<T>(req: Request, res: Response, key: string, value: T) {
  req.cookies[key] = value
  res.cookie(key, value)
}