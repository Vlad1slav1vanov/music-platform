import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from './user.schema';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import { createUserDto } from './dto/create-user.dto';
import { FileService, FileType } from 'src/file/file.service';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    private fileService: FileService,
  ) {}

  async create(dto: createUserDto, picture): Promise<User> {
    const picturePath = this.fileService.createFile(FileType.IMAGE, picture);
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(dto.password, salt);
    const user = this.userModel.create({
      ...dto,
      passwordHash: hash,
      avatarUrl: picturePath,
    });
    return user;
  }
}
