import { Column, Entity, OneToMany, Timestamp } from 'typeorm';
import { BaseModel } from './base.model';
import { Vote } from './vote.model';
import { init } from '../routes/user.route';

@Entity('movie')
export class Movie extends BaseModel{
    @Column('varchar', { name: 'original_title', nullable: false })
    originalTitle:string
    
    @Column('jsonb', { name: 'translated_title', nullable: true })
    translatedTitles?: Array<{
        title: string,
        region: string
    }>;

    @Column('varchar', { name: 'director', nullable: false })
    director: string;

    @Column('jsonb', { name: 'writers', nullable: false })
    writers:Array<string>;

    @Column('jsonb', { name: 'stars', nullable: false })
    stars: Array<string>;

    @Column('jsonb', { name: 'category', nullable: false })
    category:Array<string>;

    @Column('varchar', { name: 'duraction', nullable: false })
    duraction: string;

    @Column('date', { name: 'release_date', nullable: false })
    releaseDate:Date;

    @OneToMany(type => Vote, vote => vote.movie)
    votes:Promise<Vote[]>;

    constructor(init: Partial<Movie>){
        super()
        Object.assign(this,init);
    }
}