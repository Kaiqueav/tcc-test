import { Global, Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { AdminModule } from 'src/admin/admin.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtStrategy } from './jwt.strategy';
import { FuncionariosModule } from 'src/funcionarios/funcionarios.module';

@Global()
@Module({
   imports: [
    ConfigModule.forRoot({
      isGlobal: true
    }),
    AdminModule, 
    PassportModule.register({ defaultStrategy: 'jwt' }),
    FuncionariosModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
     useFactory: (configService: ConfigService) => {
        const secret = configService.get<string>('JWT_SECRET');
        // --- LOG DE DEBUG ---
        console.log('[AuthModule] Chave usada para ASSINAR tokens:', secret);
        // --- FIM DO LOG ---
        return {
          secret: secret,
          signOptions: { expiresIn: '8h' }, 
        } 
      },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
  exports: [AuthService, PassportModule],
})
export class AuthModule {}
