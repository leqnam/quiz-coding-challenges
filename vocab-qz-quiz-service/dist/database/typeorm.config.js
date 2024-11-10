"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DatabaseSource = exports.typeOrmConfig = exports.getDatabaseDataSourceOptions = void 0;
const constants_1 = require("../utils/constants");
const path_1 = require("path");
const typeorm_1 = require("typeorm");
const getDatabaseDataSourceOptions = ({ port, host, username, database, schema, password, }) => {
    return {
        type: 'postgres',
        port,
        host,
        username,
        database,
        schema,
        password,
        entities: [(0, path_1.join)(__dirname, '../', '**', '*.entity.{ts,js}')],
    };
};
exports.getDatabaseDataSourceOptions = getDatabaseDataSourceOptions;
exports.typeOrmConfig = {
    type: 'postgres',
    host: constants_1.dbConfig.host,
    port: +constants_1.dbConfig.port,
    username: constants_1.dbConfig.username,
    password: constants_1.dbConfig.password,
    database: constants_1.dbConfig.database,
    entities: [(0, path_1.join)(__dirname, '../', '**', '*.entity.{ts,js}')],
    synchronize: true,
    subscribers: [(0, path_1.join)(__dirname, '../', '**', '*.subscriber.{ts,js}')],
    logging: true,
    useUTC: true,
};
exports.DatabaseSource = new typeorm_1.DataSource({
    ...(0, exports.getDatabaseDataSourceOptions)(exports.typeOrmConfig),
});
//# sourceMappingURL=typeorm.config.js.map