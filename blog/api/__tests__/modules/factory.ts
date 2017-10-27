import { UserPasswordData } from "../../src/modules/user/models/UserPassword";
import { BlogData } from "../../src/modules/blog/models/Blog";
import { UserData } from "../../src/modules/user/models/User";

export class UserFactory {
  public userPasswordData = new UserPasswordData("user1", "test@test.com", "123456")
  public userData = new UserData("manager")
}

export class BlogFactory {
  public blogData = new BlogData("blog title", "blog description")
  public blogDataUpdate = new BlogData("blog title (updated)", "blog description (updated)")
}