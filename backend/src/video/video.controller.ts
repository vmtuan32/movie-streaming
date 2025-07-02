import {
  Controller,
  Post,
  Get,
  UploadedFile,
  UseInterceptors,
  Res,
  HttpStatus,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { Response } from 'express';
import { join } from 'path';
import * as fs from 'fs';

const mediaPath = join(__dirname, '..', '..', 'media');

@Controller('videos')
export class VideoController {
  @Post('upload')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: mediaPath,
        filename: (req, file, cb) => {
          // Giữ nguyên tên file, bạn có thể đổi thành tạo tên mới tùy ý
          cb(null, file.originalname);
        },
      }),
      limits: { fileSize: 500 * 1024 * 1024 }, // 500MB
    }),
  )
  async uploadFile(@UploadedFile() file: Express.Multer.File) {
    return {
      filename: file.filename,
      url: `/media/${file.filename}`,
    };
  }

  @Get()
  async listVideos() {
    const files = fs.readdirSync(mediaPath);
    // Lọc ra file video (mp4, mkv, avi, v.v.)
    const videos = files.filter((f) =>
      /\.(mp4|mkv|avi|mov|webm)$/i.test(f),
    );
    return videos.map((filename) => ({
      filename,
      url: `/media/${filename}`,
    }));
  }
}