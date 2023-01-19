import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as mongoose from 'mongoose';

export type CommentDocument = Comment & Document;

@Schema()
export class Comment {
  @Prop()
  user: { type: mongoose.Schema.Types.ObjectId };

  @Prop()
  text: string;
}

export const CommentSchema = SchemaFactory.createForClass(Comment);
