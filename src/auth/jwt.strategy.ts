import { Injectable, UnauthorizedException } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { AdminService } from "src/admin/admin.service";
import { FuncionariosService } from "src/funcionarios/funcionarios.service";
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy){

  constructor(
    private configService: ConfigService,
    private adminService: AdminService,
    private funcionariosService: FuncionariosService,
    ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get<string>('JWT_SECRET'),
    });
    }
    async validate(payload: any): Promise<any> {
    console.log('[JwtStrategy] Iniciando validação do payload:', payload);

    if (!payload.sub || !payload.role) {
      console.error('[JwtStrategy] Token inválido: "sub" ou "role" em falta.');
      throw new UnauthorizedException('Token inválido');
    }

    // Verifica se o utilizador do token ainda existe na base de dados
    if (payload.role === 'admin') {
      const admin = await this.adminService.findOneById(payload.sub);
      if (!admin) {
        console.error(`[JwtStrategy] Admin do token (ID: ${payload.sub}) não foi encontrado.`);
        throw new UnauthorizedException('Utilizador não encontrado');
      }
    } else if (payload.role === 'funcionario') {
      const funcionario = await this.funcionariosService.findOne(payload.sub);
      if (!funcionario) {
        console.error(`[JwtStrategy] Funcionário do token (ID: ${payload.sub}) não foi encontrado.`);
        throw new UnauthorizedException('Utilizador não encontrado');
      }
    } else {
      console.error(`[JwtStrategy] Role desconhecida no token: "${payload.role}"`);
      throw new UnauthorizedException('Role inválida');
    }

    // Se tudo estiver correto, retorna o objeto que será o req.user
    const userObject = { userId: payload.sub, email: payload.email, role: payload.role };
    console.log('[JwtStrategy] Validação bem-sucedida. Utilizador retornado:', userObject);
    return userObject;
  }
  

}
