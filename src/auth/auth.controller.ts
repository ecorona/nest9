import { LoginResponse } from "./dto/login-response.dto";
import { Body, Controller, Post } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { LoginDto } from "./dto/login.dto";
import {
  ApiCreatedResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from "@nestjs/swagger";

@Controller("auth")
@ApiTags("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  /**
   * Login user and generate JWT
   */
  @Post("login")
  @ApiCreatedResponse({
    description: "El usuario ha iniciado sesión correctamente.",
    type: LoginResponse,
  })
  @ApiUnauthorizedResponse({
    description: "Credenciales inválidas.",
  })
  async login(@Body() loginDto: LoginDto): Promise<LoginResponse> {
    return this.authService.login(loginDto);
  }
}
