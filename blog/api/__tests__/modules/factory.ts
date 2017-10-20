import { UserPasswordData } from "../../src/modules/user/models/UserPassword";
import { BlogData } from "../../src/modules/blog/models/Blog";

export class UserFactory {
  public userPasswordData = new UserPasswordData("user1", "test@test.com", "123456")
}

export class BlogFactory {
  public blogData = new BlogData("blog title", "blog description")
  public blogDataUpdate = new BlogData("blog title (updated)", "blog description (updated)")
}