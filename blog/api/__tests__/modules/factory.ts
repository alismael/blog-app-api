import { UserPasswordData } from "../../src/modules/user/models/UserPassword";

export class UserFactory {
  public userPasswordData = new UserPasswordData("user1", "test@test.com", "123456")
}