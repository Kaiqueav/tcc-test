import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';

@Injectable()
export class AdminGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const user = request.user; // Pega o usuário que a JwtStrategy validou

    // A verificação é direta: o usuário existe e seu cargo é 'admin'?
    // Se for, retorna `true` (acesso permitido).
    // Se não for, retorna `false` (acesso negado com erro 403 Forbidden).
    return user && user.role === 'admin';
  }
}