import { Get, Injectable } from '@nestjs/common';

@Injectable()
export class TrackService {
  async create() {}

  @Get()
  async getAll() {
    return 'WORK';
  }

  async getOne() {}

  async delete() {}
}
