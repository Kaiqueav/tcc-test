import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
export class JwtStrategy extends PassportStrategy(Strategy){

     constructor(private configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get<string>('JWT_SECRET'), // Lembre-se de mover para .env
    });
  }

  async validate(payload: any) {
    // Tudo o que é retornado aqui se torna `request.user`
    return { userId: payload.sub, email: payload.email, role: payload.role };
  }

}
