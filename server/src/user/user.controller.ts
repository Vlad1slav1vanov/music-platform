import {
  Body,
  Controller,
  Get,
  Headers,
  Post,
  Req,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { CheckAuthGuard } from 'src/middleware/middleware.checkAuth';
import { createUserDto } from './dto/create-user.dto';
import { UserRegisterResponse, UserService } from './user.service';

@Controller('/users')
export class UserController {
  constructor(private userService: UserService) {}

  @Post('register')
  @UseInterceptors(FileFieldsInterceptor([{ name: 'picture', maxCount: 1 }]))
  create(
    @UploadedFiles() files,
    @Body() dto: createUserDto,
  ): Promise<UserRegisterResponse> {
    const { picture } = files;
    return this.userService.create(dto, picture ? picture[0] : null);
  }

  @Post('login')
  login(@Body() { email, password }) {
    return this.userService.login(email, password);
  }

  @Get('getMe')
  @UseGuards(CheckAuthGuard)
  getMe(@Req() req) {
    return this.userService.getMe(req);
  }
}
