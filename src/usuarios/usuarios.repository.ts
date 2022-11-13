import { Injectable } from "@nestjs/common";
import { Repository, EntityManager } from "typeorm";
import { UsuarioEntity } from "./entities/usuario.entity";
@Injectable()
export class UsuarioRepository extends Repository<UsuarioEntity> {
  constructor(private readonly entityManager: EntityManager) {
    super(UsuarioEntity, entityManager);
  }

  //Extensión de la clase Repository<UsuarioEntity> para buscar por email
  findByEmail(email: string): Promise<UsuarioEntity> {
    return this.findOne({ where: { email: email.trim().toLowerCase() } });
  }
}
