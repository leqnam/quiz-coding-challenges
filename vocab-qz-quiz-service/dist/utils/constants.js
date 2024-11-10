"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DEFAULT_RESPONSE = exports.Role = exports.REGEX_VIETNAMESE_PHONE = exports.REGEX_NORMAL_FIELD = exports.REGEX_WHITESPACE_FIELD = exports.REGEX_DATE_YYYY_MM_DD = exports.dbConfig = exports.environment = exports.banner = void 0;
const dotenv_1 = require("dotenv");
(0, dotenv_1.config)();
exports.banner = `

                                         █████                                      ███                                              ███            
                                        ░░███                                      ░░░                                              ░░░             
 █████ █████  ██████   ██████   ██████   ░███████              ████████ █████ ████ ████   █████████             ████████ █████ ████ ████   █████████
░░███ ░░███  ███░░███ ███░░███ ░░░░░███  ░███░░███ ██████████ ███░░███ ░░███ ░███ ░░███  ░█░░░░███  ██████████ ███░░███ ░░███ ░███ ░░███  ░█░░░░███ 
 ░███  ░███ ░███ ░███░███ ░░░   ███████  ░███ ░███░░░░░░░░░░ ░███ ░███  ░███ ░███  ░███  ░   ███░  ░░░░░░░░░░ ░███ ░███  ░███ ░███  ░███  ░   ███░  
 ░░███ ███  ░███ ░███░███  ███ ███░░███  ░███ ░███           ░███ ░███  ░███ ░███  ░███    ███░   █           ░███ ░███  ░███ ░███  ░███    ███░   █
  ░░█████   ░░██████ ░░██████ ░░████████ ████████            ░░███████  ░░████████ █████  █████████           ░░███████  ░░████████ █████  █████████
   ░░░░░     ░░░░░░   ░░░░░░   ░░░░░░░░ ░░░░░░░░              ░░░░░███   ░░░░░░░░ ░░░░░  ░░░░░░░░░             ░░░░░███   ░░░░░░░░ ░░░░░  ░░░░░░░░░ 
                                                                  ░███                                             ░███                             
                                                                  █████                                            █████                            
                                                                 ░░░░░                                            ░░░░░                             

`;
exports.environment = {
    port: Number(process.env.PORT) || 3000,
    env: process.env.NODE_ENV,
    host: '',
    iamURL: process.env.AUTH_BASE_URL + process.env.AUTH_INTROSPECT,
    rabbitmq: process.env.RABBITMQ_URL,
    rabbitmqName: process.env.RABBITMQ_QUEUE_NAME,
    rabbitmqTtl: +process.env.RABBITMQ_TTL || 3600000,
    rabbitmqAck: process.env.RABBITMQ_ACK || false,
    redisHost: process.env.REDIS_HOST,
    redisPort: +process.env.REDIS_PORT,
};
exports.dbConfig = {
    port: process.env.DB_PORT,
    host: process.env.DB_HOST,
    username: process.env.DB_USERNAME,
    database: process.env.DB_NAME,
    schema: process.env.DB_SCHEMA,
    password: '' + process.env.DB_PASSWORD,
};
exports.REGEX_DATE_YYYY_MM_DD = /^\d{4}\-(0?[1-9]|1[012])\-(0?[1-9]|[12][0-9]|3[01])$/;
exports.REGEX_WHITESPACE_FIELD = /^\s+$/;
exports.REGEX_NORMAL_FIELD = /^[a-z0-9A-Z\s&_-\u00C0-\u1EF9]+$/;
exports.REGEX_VIETNAMESE_PHONE = /([\+84|84|0]+(3|5|7|8|9|1[2|6|8|9]))+([0-9]{8})\b/m;
var Role;
(function (Role) {
    Role["ADMIN"] = "admin";
    Role["USER"] = "user";
})(Role || (exports.Role = Role = {}));
exports.DEFAULT_RESPONSE = {
    timestamp: new Date().toISOString(),
    statusCode: '',
    message: 'Success',
};
//# sourceMappingURL=constants.js.map