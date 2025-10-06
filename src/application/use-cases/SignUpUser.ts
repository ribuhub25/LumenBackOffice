import { AuthService } from "../../domain/services/AuthService";

export class SignUpuser {
  constructor(private readonly authService: AuthService) {}
  async execute(email: string, password: string): Promise<void> {
    await this.authService.signUp(email, password);
  }
}