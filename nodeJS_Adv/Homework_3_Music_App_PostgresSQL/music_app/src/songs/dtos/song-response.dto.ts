import { IsDate } from "class-validator";
import { SongCreateDto } from "./song-create.dto";

export class SongResponseDto extends SongCreateDto {

  id: number;

  artistId: number;

  @IsDate()
  createdAt: Date;

  @IsDate()
  updatedAt: Date;
}