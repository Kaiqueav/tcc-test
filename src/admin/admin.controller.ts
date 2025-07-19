import { Body, Controller, HttpCode, HttpStatus, Post, UseGuards } from '@nestjs/common';
import { CreateAdminDto } from './dto/create-admin.dto';
import { AdminService } from './admin.service';
import { Admin } from './entities/admin.entity';
import { AuthGuard } from '@nestjs/passport';
import { AdminGuard } from 'src/auth/admin.guard';

@UseGuards(AuthGuard('jwt'), AdminGuard) // Protege todas as rotas
@Controller('admin')
export class AdminController {

  constructor(private readonly adminService: AdminService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() createAdminDto: CreateAdminDto): Promise<{ message: string; admin: Admin }> {
    const admin = await this.adminService.createAdmin(createAdminDto);
    delete admin.password; // Remove a senha da resposta por segurança
    return { message: 'Administrador criado com sucesso.', admin: admin as any};
  }
}
