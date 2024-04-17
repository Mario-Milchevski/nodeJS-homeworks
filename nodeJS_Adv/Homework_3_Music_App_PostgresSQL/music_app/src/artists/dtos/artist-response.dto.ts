import { ArtistCreateDto } from "./artist-create.dto";
import { IsArray, IsDate } from "class-validator";

export class ArtistResponseDto extends ArtistCreateDto {

  id: number;

  @IsDate()
  createdAt: Date;

  @IsDate()
  updatedAt: Date;

  @IsArray()
  songs: number[];
}