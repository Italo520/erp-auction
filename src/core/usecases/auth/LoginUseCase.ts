import { IAuthRepository } from "../../repositories/IAuthRepository";

export class LoginUseCase {
  constructor(private authRepo: IAuthRepository) { }

  async execute(email: string, password?: string): Promise<void> {
    if (!email) throw new Error("Email é obrigatório");
    return this.authRepo.signIn(email, password);
  }
}