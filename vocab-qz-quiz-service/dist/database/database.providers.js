"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.databaseProviders = void 0;
const typeorm_1 = require("typeorm");
const typeorm_config_1 = require("./typeorm.config");
exports.databaseProviders = [
    {
        provide: 'DATA_SOURCE',
        useFactory: async () => {
            const dataSource = new typeorm_1.DataSource({
                ...(0, typeorm_config_1.getDatabaseDataSourceOptions)(typeorm_config_1.typeOrmConfig),
            });
            return dataSource.initialize();
        },
    },
];
//# sourceMappingURL=database.providers.js.map