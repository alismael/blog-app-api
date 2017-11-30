import { ILoginRequest } from './models';
import axios from "axios"


class Service {
  private loginUrl = "/api/user/login"
  private fetchBlogsUrl = "/api/blog"

  login(request: ILoginRequest) {
    return axios.post(this.loginUrl, request)
  }

  fetchBlogs() {
    return axios.get(this.fetchBlogsUrl)
  }

}

export const service = new Service 