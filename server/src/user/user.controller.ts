import {
  Body,
  Controller,
  Post,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
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
    return this.userService.create(dto, picture[0]);
  }
}
