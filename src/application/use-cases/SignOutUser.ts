import { AuthService } from "../../domain/services/AuthService";

export class SignOutUser {
  constructor(private readonly authService: AuthService) {}

  async execute(): Promise<void> {
    return await this.authService.signOut();
  }
}
