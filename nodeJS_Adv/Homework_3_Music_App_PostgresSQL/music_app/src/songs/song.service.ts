import { Injectable, NotFoundException } from '@nestjs/common';
import { ArtistService } from '../artists/artist.service';
import { SongResponseDto } from './dtos/song-response.dto';
import { SongQueryDto } from './dtos/song-query.dto';
import { SongCreateDto } from './dtos/song-create.dto';
import { SongUpdateDto } from './dtos/song-update.dto';

@Injectable()
export class SongService {
    constructor(private readonly artistService: ArtistService) { }
    songs: SongResponseDto[] = [];

    getSongs(query: SongQueryDto): SongResponseDto[] {
        let filteredSongs = [...this.songs]
        if (query.genre) {
            filteredSongs = filteredSongs.filter(song => song.genre === query.genre)
        }
        if (query.artist) {
            filteredSongs = filteredSongs.filter(song => song.artist === query.artist)
        }
        if (query.name) {
            filteredSongs = filteredSongs.filter(song => song.name === query.name)
        }
        return filteredSongs;
    }

    createSong(songData: SongCreateDto): SongResponseDto {
        const artistId = songData.artistId
        const song = {
            ...songData,
            id: this.songs.length,
            artistId: artistId,
            createdAt: new Date(),
            updatedAt: new Date(),
        } satisfies SongResponseDto;
        this.songs.push(song);

        const artist = this.artistService.getArtist(artistId);
        console.log(artist);
        if (artist) {
            artist.songs.push(song.id);
        } else {
            throw new NotFoundException(`Artist with id ${artistId} not found`);
        }
        return song;
    }

    updateSong(updateData: SongUpdateDto, id: number): SongResponseDto {
        const index = this.songs.findIndex(song => song.id === id)
        if (index < 0) throw new NotFoundException(`Song with id ${id} doesnt't exist`)

        this.songs[index] = {
            ...this.songs[index],
            ...updateData,
            updatedAt: new Date(),
        };
        return this.songs[index];
    };
    deleteSong(id: number): void {
        this.songs = this.songs.filter(song => song.id !== id)
    }
}
