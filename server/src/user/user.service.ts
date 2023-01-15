import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
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
    try {
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
    } catch (err) {
      if (err.code === 11000) {
        throw new HttpException(
          'Данная почта уже занята',
          HttpStatus.BAD_REQUEST,
        );
      }
      throw err;
    }
  }

  async login(email: string, password: string): Promise<UserRegisterResponse> {
    try {
      console.log(email, password);
      const user = await this.userModel.findOne({ email: email });
      const loginError = new HttpException(
        'Неверный логин или пароль',
        HttpStatus.BAD_REQUEST,
      );

      if (!user) {
        throw loginError;
      }

      const isValidPass = await bcrypt.compare(password, user.passwordHash);

      if (!isValidPass) {
        throw loginError;
      }

      const token = jwt.sign(
        {
          _id: user._id,
        },
        SECRET_JWT_KEY,
        {
          expiresIn: '30d',
        },
      );

      const { fullName, avatarUrl, _id } = user;

      return {
        email,
        _id,
        avatarUrl,
        fullName,
        token,
      };
    } catch (err) {
      throw err;
    }
  }
}
