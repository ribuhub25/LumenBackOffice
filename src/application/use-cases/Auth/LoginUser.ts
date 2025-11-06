import { AuthService } from "../../../domain/services/AuthService";

export class LoginUser {
  constructor(private readonly authService: AuthService) {}

  async execute(email: string, password: string): Promise<string> {
    return await this.authService.signIn(email, password);
  }
}
