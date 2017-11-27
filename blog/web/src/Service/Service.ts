import { ILoginRequest } from './models';
import axios from "axios"


class Service {
  private loginUrl = "/api/user/login"

  login(request: ILoginRequest) {
    return axios.post(this.loginUrl, request)
  }

}

export const service = new Service 