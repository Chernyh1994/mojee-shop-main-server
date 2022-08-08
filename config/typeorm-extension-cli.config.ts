import * as dotenv from 'dotenv';
import databaseConfig from './database.config';

dotenv.config();

export default {
  ...databaseConfig(),
  seeds: ['dist/database/seeds/**/*{.ts,.js}'],
  factories: ['dist/database/factories/**/*{.ts,.js}'],
};
