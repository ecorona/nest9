import { JwtGuard } from "./../auth/jwt/jwt.guard";
import { UsuarioRepository } from "./usuarios.repository";
import { UsuarioEntity } from "./entities/usuario.entity";
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpException,
  HttpStatus,
  ParseIntPipe,
  ClassSerializerInterceptor,
  UseInterceptors,
  UseGuards,
} from "@nestjs/common";
import { CreateUsuarioDto } from "./dto/create-usuario.dto";
import { UpdateUsuarioDto } from "./dto/update-usuario.dto";
import {
  ApiBadRequestResponse,
  ApiBody,
  ApiConflictResponse,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiTags,
} from "@nestjs/swagger";
import { DeleteResult, UpdateResult } from "typeorm";
import { SesionJWT } from "../auth/jwt/sesion-jwt.decorator";
@Controller("usuarios")
@ApiTags("usuarios")
export class UsuariosController {
  constructor(private readonly usuarioRepository: UsuarioRepository) {}

  @ApiOperation({
    description: "Crear un usuario",
  })
  @ApiCreatedResponse({
    description: "El usuario sido creado correctamente.",
    type: UsuarioEntity,
  })
  @ApiBadRequestResponse({
    description: "Los datos no son válidos.",
  })
  @ApiConflictResponse({
    description: "El email ya existe.",
  })
  @ApiBody({
    description: "Datos del usuario",
    type: CreateUsuarioDto,
  })
  @Post()
  @UseInterceptors(ClassSerializerInterceptor)
  async create(
    @Body() createUsuarioDto: CreateUsuarioDto
  ): Promise<UsuarioEntity> {
    try {
      const usuarioACrear = this.usuarioRepository.create(createUsuarioDto);
      usuarioACrear.hashPassword();
      //encriptar password
      const usuarioCreado = await this.usuarioRepository.save(createUsuarioDto);
      //XXX: Notificar por email al usuario
      return usuarioCreado;
    } catch (error) {
      if (error?.code === "ER_DUP_ENTRY") {
        throw new HttpException("El email ya existe", HttpStatus.CONFLICT);
      }
      throw new Error(error);
    }
  }

  @UseGuards(JwtGuard)
  @ApiOperation({
    description: "Obtener todos los usuarios",
  })
  @ApiOkResponse({
    description: "Lista de usuarios",
    type: UsuarioEntity,
    isArray: true,
  })
  @Get()
  @UseInterceptors(ClassSerializerInterceptor)
  findAll() {
    return this.usuarioRepository.find();
  }

  @UseGuards(JwtGuard)
  @ApiOperation({
    description: "Obtener un usuario por su id",
  })
  @ApiOkResponse({
    description: "El usuario correspondiente al id.",
    type: UsuarioEntity,
  })
  @ApiParam({
    name: "id",
    description: "Id del usuario",
    example: 1,
  })
  @Get(":id")
  @UseInterceptors(ClassSerializerInterceptor)
  findOne(@Param("id", ParseIntPipe) id: number) {
    return this.usuarioRepository.findOne({ where: { id } });
  }

  @UseGuards(JwtGuard)
  @ApiOperation({
    description: "Obtener un usuario por su email",
  })
  @ApiOkResponse({
    description: "El usuario correspondiente al email.",
    type: UsuarioEntity,
  })
  @ApiParam({
    name: "email",
    description: "Email del usuario",
    example: "juan@live.com",
  })
  @Get(":email/email")
  @UseInterceptors(ClassSerializerInterceptor)
  findOneEmail(@Param("email") email: string): Promise<UsuarioEntity> {
    return this.usuarioRepository.findByEmail(email);
  }

  @UseGuards(JwtGuard)
  @ApiOperation({
    description: "Actualizar un usuario por su id",
  })
  @ApiBody({
    description: "Datos para actualizar el usuario",
    type: UpdateUsuarioDto,
  })
  @ApiOkResponse({
    description: "El usuario ha sido actualizado correctamente.",
    type: UpdateResult,
  })
  @ApiBadRequestResponse({
    description: "Los datos a actualizar no son válidos.",
  })
  @ApiParam({
    name: "id",
    description: "Id del usuario",
    example: 1,
  })
  @Patch(":id")
  update(
    @Param("id", ParseIntPipe) id: number,
    @Body() updateUsuarioDto: UpdateUsuarioDto
  ): Promise<UpdateResult> {
    return this.usuarioRepository.update({ id }, updateUsuarioDto);
  }

  @UseGuards(JwtGuard)
  @ApiOperation({
    description: "Eliminar un usuario por su id",
  })
  @ApiOkResponse({
    description: "El usuario ha sido eliminado correctamente.",
    type: DeleteResult,
  })
  @ApiParam({
    name: "id",
    description: "Id del usuario",
    example: 1,
  })
  @Delete(":id")
  remove(@Param("id", ParseIntPipe) id: number): Promise<DeleteResult> {
    return this.usuarioRepository.delete({ id });
  }

  @UseGuards(JwtGuard)
  @Get("me/identity")
  @UseInterceptors(ClassSerializerInterceptor)
  getIdentity(@SesionJWT() usuario: UsuarioEntity): UsuarioEntity {
    return usuario;
  }
}
