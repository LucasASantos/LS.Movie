import express from 'express';
import { movieService } from '../services/movie.service';


export class MovieController {
    static async create(req: express.Request, res: express.Response) {
        const { originalTitle,
            translatedTitles,
            category,
            director,
            duraction,
            releaseDate,
            stars,
            writers } = req.body;

        const movie = await movieService.create({
            originalTitle,
            translatedTitles: translatedTitles || undefined,
            category,
            director,
            duraction,
            releaseDate,
            stars,
            writers
        })

        return res.status(201).json(movie);

    }
    static async registerVote(req, res: express.Response) {
        const { note } = req.body;
        const { id } = req.user;
        const {id:movieId}= req.params;

        try {
            const vote = await movieService.registerVote(movieId, id, note);
    
            return res.status(201).json(vote);
            
        } catch (error) {
            return res.status(409).json({message: error.message});
        }

    }
    static async get(req: express.Request, res: express.Response) {
        const { id } = req.params;

        return res
            .status(200)
            .json(
                await movieService.get(id)
            );

    }
    static async getAll(req: express.Request, res: express.Response) {
        const { query } = req;

        return res
            .status(200)
            .json(
                await movieService.getAll(query)
            );
    }

}