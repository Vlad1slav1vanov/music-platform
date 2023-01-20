import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Comment } from './comment.schema';
import * as mongoose from 'mongoose';

export type TrackDocument = Track & Document;

@Schema({ timestamps: true })
export class Track {
  @Prop({ required: true })
  name: string;

  @Prop()
  artist: string;

  @Prop()
  text: string;

  @Prop()
  listens: number;

  @Prop()
  picture: string;

  @Prop({ required: true })
  audio: string;

  @Prop({ default: 0 })
  commentsCount: number;

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment' }] })
  comments: Comment[];
}

export const TrackSchema = SchemaFactory.createForClass(Track);
