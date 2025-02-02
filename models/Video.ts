import { model, models, Schema, Types } from "mongoose";

export const VIDEO_DIMENSIONS = {
  height: 1080,
  width: 1920,
} as const;

export interface IVideo {
  title: string;
  description: string;
  videoUrl: string;
  thumbnailUrl: string;
  controller?: boolean;
  transformation: {
    height: number;
    width: number;
    duration?: number;
    quality: number;
  };
  _id?: Types.ObjectId;
  createdAt?: Date;
  updatedAt?: Date;
}

const videoSchema = new Schema<IVideo>(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    videoUrl: { type: String, required: true },
    thumbnailUrl: { type: String, required: true },
    controller: { type: Boolean, required: false },
    transformation: {
      height: {
        type: Number,
        required: true,
        default: VIDEO_DIMENSIONS.height,
      },
      width: {
        type: Number,
        required: true,
        default: VIDEO_DIMENSIONS.width,
      },
      duration: { type: Number, required: false },
      quality: { type: Number, required: true, min: 1, max: 100 },
    },
  },
  {
    timestamps: true,
  }
);

const Video = models?.Video || model<IVideo>("Video", videoSchema);
export default Video;
