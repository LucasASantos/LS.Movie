import express from 'express';
import { Roles } from '../models/user.model';
import { registerRoutes } from '../utils/route.utils';
import { MovieController } from '../controllers/movie.controller';

const PREFIX = '/movies';

export const init = async (server: express.Express) => {
    await registerRoutes([
        {
            server,
            method: 'post',
            path: getRoute('/:id/vote'),
            accessRole: Roles.user,
            handle: MovieController.registerVote
        }, {
            server,
            method: 'post',
            path: getRoute(''),
            accessRole: Roles.admin,
            handle: MovieController.create
        }, {
            server,
            method: 'get',
            path: getRoute(''),
            handle: MovieController.getAll
        },
        {
            server,
            method: 'get',
            path: getRoute('/:id'),
            handle: MovieController.get
        }
    ]);
}

const getRoute = (path) => `${PREFIX}${path}`;