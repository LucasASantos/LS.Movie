import { createConnection } from "typeorm";

export const createConnectionDatabase= async () => {

    console.info('Connecting with database');
    await createConnection();
    console.info('Connection successfull')
};