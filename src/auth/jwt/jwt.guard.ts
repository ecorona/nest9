import {
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
} from "@nestjs/common";
import { AuthService } from "../auth.service";

@Injectable()
export class JwtGuard implements CanActivate {
  constructor(private readonly authService: AuthService) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();

    if (request.headers.authorization) {
      try {
        //validar el token
        const tokenSplit = request.headers.authorization.split(" ");
        if (
          tokenSplit &&
          tokenSplit.length &&
          tokenSplit[0] === "Bearer" &&
          tokenSplit[1]
        ) {
          //validar el usuario
          const userInToken = await this.authService.validateToken(
            tokenSplit[1]
          );

          if (userInToken?.id) {
            //adjuntamos el user a el resto de la vida de la solicitud
            request.user = userInToken;
            return true;
          }

          throw new HttpException(
            "No hay un usuario válido en el token.",
            HttpStatus.UNAUTHORIZED
          );
        }

        throw new HttpException(
          "El header de autorización no es válido",
          HttpStatus.UNAUTHORIZED
        );
      } catch (error) {
        throw new HttpException(
          error?.message || "No se pudo validar el token",
          HttpStatus.UNAUTHORIZED
        );
      }
    }
    throw new HttpException(
      "No hay header de autorización en su solicitud.",
      HttpStatus.UNAUTHORIZED
    );
  }
}
