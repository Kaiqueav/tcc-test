import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateAdminDto } from './dto/create-admin.dto';
import * as bcrypt from 'bcrypt';
import { Admin } from './entities/admin.entity';

@Injectable()
export class AdminService {
    constructor( 
        @InjectRepository(Admin)
        private readonly adminRepository:Repository<Admin>,
    ){}

    async createAdmin(createAdminDto: CreateAdminDto): Promise<Admin>{
            const saltRound = 10;
            const hashedPassword = await bcrypt.hash(createAdminDto.password, saltRound);

            const newAdmin = new Admin();
            newAdmin.email = createAdminDto.email;
            newAdmin.password = hashedPassword

            return this.adminRepository.save(newAdmin)
    }   
     async findOneByEmail(email: string): Promise<Admin| undefined> {
        return this.adminRepository.findOne({ where: { email } });
    }
     async findOneById(id: number): Promise<Admin | undefined> {
        return this.adminRepository.findOne({ where: { id } });
    }
}
