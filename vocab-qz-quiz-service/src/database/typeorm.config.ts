import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { dbConfig } from '@utils/constants';
import { join } from 'path';
import { DataSource, DataSourceOptions } from 'typeorm';

export const getDatabaseDataSourceOptions = ({
  port,
  host,
  username,
  database,
  schema,
  password,
}): DataSourceOptions => {
  return {
    type: 'postgres',
    port,
    host,
    username,
    database,
    schema,
    password,
    entities: [join(__dirname, '../', '**', '*.entity.{ts,js}')],
  };
};

export const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: dbConfig.host,
  port: +dbConfig.port,
  username: dbConfig.username,
  password: dbConfig.password,
  database: dbConfig.database,
  // namingStrategy: new SnakeNamingStrategy(),
  entities: [join(__dirname, '../', '**', '*.entity.{ts,js}')],
  synchronize: true, //environment.env == 'development',
  subscribers: [join(__dirname, '../', '**', '*.subscriber.{ts,js}')],
  logging: true,
  // dropSchema: false,
  // migrations: ['dist/database/migrations/*.js'],
  useUTC: true,
};

// This is used by TypeORM migration scripts
export const DatabaseSource = new DataSource({
  ...getDatabaseDataSourceOptions(typeOrmConfig as any),
});
