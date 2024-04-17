import { IsString } from "class-validator";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Song {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    @IsString()
    name: string;

    @Column()
    @IsString()
    artist: string;

    @IsString()
    artistId: string;

    @Column()
    duration: number;

    @Column()
    @IsString()
    genre: string;

    @Column()
    releaseDate: Date;
}