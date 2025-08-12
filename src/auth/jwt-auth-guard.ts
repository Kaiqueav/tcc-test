import { Injectable, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  
  handleRequest(err, user, info) {
   
    console.log('--- [JwtAuthGuard | handleRequest] ---');
    console.log('Resultado da Estratégia - Erro (err):', err);
    console.log('Resultado da Estratégia - Utilizador (user):', user);
    console.log('Resultado da Estratégia - Informações (info):', info);
    console.log('------------------------------------');

    if (err || !user) {
      console.error('FALHA NA AUTENTICAÇÃO! Motivo:', info?.message || err?.message);
      throw err || new UnauthorizedException();
    }
    
   
    console.log('AUTENTICAÇÃO BEM-SUCEDIDA. Retornando o utilizador.');
    return user;
  }
}