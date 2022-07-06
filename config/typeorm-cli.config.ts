import * as dotenv from 'dotenv';
import { DataSource, DataSourceOptions } from 'typeorm';
import databaseConfig from './database.config';

dotenv.config();
const typeormConfig = databaseConfig() as DataSourceOptions;
const dataSource = new DataSource(typeormConfig);

export default dataSource;
