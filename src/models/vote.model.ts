import { BaseModel } from './base.model';
import { User } from './user.model';
import { Movie } from './movie.model';
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryColumn, RelationId } from 'typeorm';

@Entity('vote')
export class Vote extends BaseModel{
    @ManyToOne(type => User, user => user.votes,{primary:true, nullable:false, eager: true})
    @JoinColumn({name: 'user_id'})
    user: Promise<User>;

    // @RelationId((user:User) => user.votes)
    // userId: Promise<string>;

    @ManyToOne(type => Movie, movie => movie.votes, {primary:true, nullable:false,eager: true})
    @JoinColumn({name: 'movie_id'})
    movie:Promise<Movie>;

    // @RelationId((movie:Movie) => movie.votes)
    // movieId: Promise<string>;

    @Column('int', {name:'note', nullable:false})
    note :number;

    constructor(init?: Partial<Vote>){
        super();
        Object.assign(this, init);
    }
}