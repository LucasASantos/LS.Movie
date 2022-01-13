import { MovieData } from '../interfaces/movie.interface';
import { Movie } from '../models/movie.model';
import { User } from '../models/user.model';
import { Vote } from '../models/vote.model';
import { getRepository } from 'typeorm';
class MovieService {
    async create(movie: MovieData) {
        const newMovie = new Movie({ ...movie });

        await newMovie.save();

        return newMovie;
    }

    async get(id) {

        const movie = await Movie.findOneOrFail(id);
        const votes = await Vote.find({
            where: {
                movie
            }
        });

        if(!votes || votes.length === 0){
            return {avg:0, ...movie}
        }

        const { note: sum } = votes.reduce((pre, cur, index) => {
            return new Vote({ note: pre.note += cur.note });
        });

        const avg = sum/votes.length 

        return {avg, ...movie};
    }

    async registerVote(movieId, userId, note) {
        const movie= Promise.resolve(new Movie({ id: movieId }));
        const user= Promise.resolve(new User({ id: userId }));
        const beforeVote = Vote.findOne({where: {user, movie}});

        if(beforeVote){
            throw new Error('It is not possible to vote 2 times');
        }
        
        const vote = new Vote({
            user, 
            movie,
            note
        })

        await vote.save();

        return vote;
    }
    async getAll(query) {

        const conditions= this.getConditions(query);
        console.log(conditions);
        return await Movie.find({where: {...conditions}});
    }

    private getConditions(query):Partial<Movie>{
        let conditions = {}
        const {title,category,director,stars} = query;
        if(title){
            conditions = {originalTitle:title, ...conditions}
            console.log(title);
        }
        if(category){
            conditions = {category, ...conditions}
        }
        if(director){
            conditions = {director, ...conditions}
        }
        if(stars){
            conditions = {stars, ...conditions}
        }

        return conditions;
    }
}

export const movieService = new MovieService();