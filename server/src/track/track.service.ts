import { Injectable } from '@nestjs/common';
import { Track, TrackDocument } from './schemas/track.schema';
import mongoose, { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { CreateTrackDto } from './dto/create-track.dto';
import { FileService, FileType } from 'src/file/file.service';

@Injectable()
export class TrackService {
  constructor(
    @InjectModel(Track.name) private trackModel: Model<TrackDocument>,
    private fileService: FileService,
  ) {}

  async create(dto: CreateTrackDto, picture, audio): Promise<Track> {
    const audioPath = this.fileService.createFile(FileType.AUDIO, audio);
    const picturePath = this.fileService.createFile(FileType.IMAGE, picture);
    const track = await this.trackModel.create({
      ...dto,
      listens: 0,
      audio: audioPath,
      picture: picturePath,
    });
    return track;
  }

  async getAll(count = 10, offset = 0): Promise<Track[]> {
    const tracks = await this.trackModel.find().skip(offset).limit(count);
    return tracks;
  }

  async getOne(id: mongoose.Schema.Types.ObjectId): Promise<Track> {
    const track = await this.trackModel.findById(id).populate('comments');
    return track;
  }

  async delete(id: mongoose.Schema.Types.ObjectId): Promise<Track['name']> {
    const track = await this.trackModel.findByIdAndDelete(id);
    return track.name;
  }

  async listen(id: mongoose.Schema.Types.ObjectId) {
    const track = await this.trackModel.findById(id);
    track.listens += 1;
    track.save();
  }

  async search(query: string): Promise<Track[]> {
    const tracks = await this.trackModel.find({
      name: { $regex: new RegExp(query, 'i') },
    });
    return tracks;
  }
}
