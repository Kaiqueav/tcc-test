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
    PassportModule,
    FuncionariosModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        
        secret: configService.get<string>('JWT_SECRET'),
        signOptions: { expiresIn: '8h' }, 
      }),
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
  exports: [AuthService],
})
export class AuthModule {}
