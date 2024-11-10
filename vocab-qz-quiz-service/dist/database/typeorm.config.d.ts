import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { DataSource, DataSourceOptions } from 'typeorm';
export declare const getDatabaseDataSourceOptions: ({ port, host, username, database, schema, password, }: {
    port: any;
    host: any;
    username: any;
    database: any;
    schema: any;
    password: any;
}) => DataSourceOptions;
export declare const typeOrmConfig: TypeOrmModuleOptions;
export declare const DatabaseSource: DataSource;
