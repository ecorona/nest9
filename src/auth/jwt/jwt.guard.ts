import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { AuthService } from "../auth.service";

@Injectable()
export class JwtGuard implements CanActivate {
  constructor(private readonly authService: AuthService) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();

    if (request.headers.authorization) {
      try {
        //validar el token
        const token = request.headers.authorization.split(" ")[1];
        //validar el usuario
        const userInToken = await this.authService.validateToken(token);
        //validar el rol
        request.user = userInToken;
      } catch (error) {
        console.error("JWT Guard Error:", error);
        return false;
      }

      return true;
    }
    return false;
  }
}
