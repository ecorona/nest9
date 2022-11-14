import { UsuarioEntity } from "src/usuarios/entities/usuario.entity";
import { createParamDecorator, ExecutionContext } from "@nestjs/common";
/**
 * El objetivo de este decorador es para obtener el usuario que
 * se encuentra en el req, (puesto ahi por el guard JWT) una vez que
 * es autenticado su token, se usa a nivel método de controller.
 */
export const SesionJWT = createParamDecorator(
  (data: any, ctx: ExecutionContext): UsuarioEntity => {
    const req = ctx.switchToHttp().getRequest();
    return req.user && req.user.id ? req.user : null;
  }
);
