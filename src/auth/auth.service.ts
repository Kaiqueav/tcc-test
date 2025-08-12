import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AdminService } from 'src/admin/admin.service';
import * as bcrypt from 'bcrypt';
import { FuncionariosService } from 'src/funcionarios/funcionarios.service';

@Injectable()
export class AuthService {
    constructor(
        private admService: AdminService,
        private funcionariosService: FuncionariosService,
        private jwtService: JwtService
    ){}
      async validateUser(email: string, pass: string): Promise<any> {
    const admin = await this.admService.findOneByEmail(email);
    if (admin && (await bcrypt.compare(pass, admin.password))) {
      const { password, ...result } = admin;
      return result;
    }
    return null;
  }

    async login( adm: any){
        const payload = { email: adm.email, sub: adm.id, role: 'admin' }
        return{
            access_token: this.jwtService.sign(payload)
        }
    }
     async validateFuncionario(cpf: string): Promise<any> {
        const funcionario = await this.funcionariosService.findOneByCpf(cpf);
        if (funcionario) {
            return funcionario;
        }
        return null;
    }

    async loginPonto(funcionario: any) {
        const payload = { 
            sub: funcionario.id, 
            cpf: funcionario.cpf, 
            role: 'funcionario' // Uma nova "role" para diferenciar do admin
        };
        return {
            access_token: this.jwtService.sign(payload, { expiresIn: '12h' }) // Token de curta duração
        };
    }
}
