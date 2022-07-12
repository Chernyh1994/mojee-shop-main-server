import databaseConfig from './database.config';
import * as dotenv from 'dotenv';

dotenv.config();

export default {
  ...databaseConfig(),
  seeds: ['dist/database/seeds/**/*{.ts,.js}'],
  factories: ['dist/database/factories/**/*{.ts,.js}'],
};
