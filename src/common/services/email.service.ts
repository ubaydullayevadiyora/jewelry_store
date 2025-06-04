import { Injectable } from "@nestjs/common";

@Injectable()
export class EmailService {
  async sendActivationLink(email: string, activationLink: string) {
    console.log(`Send activation link to ${email}: ${activationLink}`);
  }
}
