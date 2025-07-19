import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AdminService } from 'src/admin/admin.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
    constructor(
        private admService: AdminService,
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
        const payload = { email: adm.email, sub: adm.id, role: ' admin'}
        return{
            access_token: this.jwtService.sign(payload)
        }
    }
}
