import { Request, Response } from "express"

export function setCookie(req: Request, res: Response, key, value) {
  req.cookies[key] = value
  res.cookie(key, value)
}