import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateAdminDto } from './dto/create-admin.dto';
import * as bcrypt from 'bcrypt';
import { Adm } from './entities/admin.entity';

@Injectable()
export class AdmService {
    constructor( 
        @InjectRepository(Adm)
        private readonly admRepository:Repository<Adm>,
    ){}

    async createAdmin(createAdminDto: CreateAdminDto): Promise<Adm>{
            const saltRound = 10;
            const hashedPassword = await bcrypt.hash(createAdminDto.password, saltRound);

            const newAdmin = new Adm();
            newAdmin.email = createAdminDto.email;
            newAdmin.password = hashedPassword

            return this.admRepository.save(newAdmin)
    }   
     async findOneByEmail(email: string): Promise<Adm| undefined> {
        return this.admRepository.findOne({ where: { email } });
    }
}
