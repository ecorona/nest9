import { JwtPayload } from "./dto/jwt-payload.dto";
import { LoginResponse } from "./dto/login-response.dto";
import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { LoginDto } from "./dto/login.dto";
import { UsuarioRepository } from "src/usuarios/usuarios.repository";
import { InjectRepository } from "@nestjs/typeorm";
import { JwtService } from "@nestjs/jwt";
import { omit } from "lodash";
@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UsuarioRepository)
    private readonly usuarioRepository: UsuarioRepository,
    private jwtService: JwtService
  ) {}
  /**
   * Login user and generate JWT
   */
  async login(loginDto: LoginDto): Promise<LoginResponse> {
    // Validate user credentials
    const usuario = await this.usuarioRepository.findByEmail(loginDto.email);
    if (!usuario || !(await usuario.checkPassword(loginDto.password))) {
      throw new HttpException(
        "Credenciales incorrectas",
        HttpStatus.UNAUTHORIZED
      );
    }
    // Return JWT
    return {
      accessToken: this.jwtService.sign(<JwtPayload>{
        email: usuario.email,
        sub: usuario.id,
      }),
      usuario: omit(usuario, ["password"]),
    };
  }
}
