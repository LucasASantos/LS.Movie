import { Roles } from '../models/user.model';
import express from 'express';


export interface RegisterWithRole
{
    server:express.Express;
    path: string;
    accessRole?: Roles;
    handle;
    method: 'all' | 'get' | 'post' | 'put' | 'delete' | 'patch' | 'options' | 'head';
}