import {Pool} from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const pool = new Pool({
    user:process.env.PUSER,
    password:process.env.PPASWORD,
    host:process.env.PHOST,
    port:Number(process.env.PPORT),
    database:process.env.PDATABASE,
    max:17,
    connectionTimeoutMillis:0,
    idleTimeoutMillis:0
});


export default pool;