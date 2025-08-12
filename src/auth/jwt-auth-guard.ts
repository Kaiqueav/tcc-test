import { Injectable, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  
  handleRequest(err, user, info) {
    // Este método é o coração do AuthGuard. Vamos ver o que ele recebe.
    console.log('--- [JwtAuthGuard | handleRequest] ---');
    console.log('Resultado da Estratégia - Erro (err):', err);
    console.log('Resultado da Estratégia - Utilizador (user):', user);
    console.log('Resultado da Estratégia - Informações (info):', info);
    console.log('------------------------------------');

    // Se a estratégia retornou um erro, ou se não retornou um utilizador,
    // o AuthGuard por defeito lança uma UnauthorizedException.
    if (err || !user) {
      // Vamos logar o motivo exato da falha.
      console.error('FALHA NA AUTENTICAÇÃO! Motivo:', info?.message || err?.message);
      throw err || new UnauthorizedException();
    }
    
    // Se chegou aqui, o utilizador é válido e será anexado à requisição.
    console.log('AUTENTICAÇÃO BEM-SUCEDIDA. Retornando o utilizador.');
    return user;
  }
}