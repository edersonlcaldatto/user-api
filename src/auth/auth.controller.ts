import { Body, Controller, Get, Post, Req, UseGuards, ValidationPipe } from '@nestjs/common';
import { CreateUserDto } from 'src/users/dtos/create-user.dto';
import { AuthService } from './auth.service';
import { CredentialsDto } from '../auth/dtos/credentials.dto';
import { AuthGuard } from '@nestjs/passport';
import { User } from '../users/user.entity';
import { GetUser } from './get-user.decorator';


@Controller('auth')
export class AuthController { 

    constructor(private authService: AuthService) {};

    @Post('/sigunp')
    async signUp(@Body(ValidationPipe) createUSerDto: CreateUserDto): Promise<{message : string}>{
        await this.authService.signUp(createUSerDto);
        return {
            message: 'Cadastro realizado com sucesso',
        }
    }
    @Post('/signIn')
    async signIn(@Body(ValidationPipe) credentialsDto: CredentialsDto): Promise<{token: string}>{
        return await this.authService.signIn(credentialsDto);
    }

    @Get('/me')
    @UseGuards(AuthGuard())
    getMe(@GetUser() user: User ): User{
        return user;
    }

}
