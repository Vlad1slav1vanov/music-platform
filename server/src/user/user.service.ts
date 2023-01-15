import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from './user.schema';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import { createUserDto } from './dto/create-user.dto';
import { FileService, FileType } from 'src/file/file.service';

const SECRET_JWT_KEY = 'secret1234';

export interface UserRegisterResponse {
  _id: string;
  fullName: string;
  avatarUrl: string;
  email: string;
  token: string;
}

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    private fileService: FileService,
  ) {}

  async create(dto: createUserDto, picture): Promise<UserRegisterResponse> {
    const picturePath = this.fileService.createFile(FileType.IMAGE, picture);
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(dto.password, salt);
    const user = await this.userModel.create({
      ...dto,
      passwordHash: hash,
      avatarUrl: picturePath,
    });
    const token = jwt.sign(
      {
        _id: user._id,
      },
      SECRET_JWT_KEY,
      {
        expiresIn: '30d',
      },
    );
    const { email, fullName, avatarUrl, _id } = user;
    return {
      email,
      _id,
      avatarUrl,
      fullName,
      token,
    };
  }
}
