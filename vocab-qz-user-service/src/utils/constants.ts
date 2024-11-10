import { config } from 'dotenv';
import { OkResponseDto } from './models/dtos/base-response.dto';

config();

export const banner = `

                                         █████                                      ███                                                             
                                        ░░███                                      ░░░                                                              
 █████ █████  ██████   ██████   ██████   ░███████              ████████ █████ ████ ████   █████████            █████ ████  █████   ██████  ████████ 
░░███ ░░███  ███░░███ ███░░███ ░░░░░███  ░███░░███ ██████████ ███░░███ ░░███ ░███ ░░███  ░█░░░░███  ██████████░░███ ░███  ███░░   ███░░███░░███░░███
 ░███  ░███ ░███ ░███░███ ░░░   ███████  ░███ ░███░░░░░░░░░░ ░███ ░███  ░███ ░███  ░███  ░   ███░  ░░░░░░░░░░  ░███ ░███ ░░█████ ░███████  ░███ ░░░ 
 ░░███ ███  ░███ ░███░███  ███ ███░░███  ░███ ░███           ░███ ░███  ░███ ░███  ░███    ███░   █            ░███ ░███  ░░░░███░███░░░   ░███     
  ░░█████   ░░██████ ░░██████ ░░████████ ████████            ░░███████  ░░████████ █████  █████████            ░░████████ ██████ ░░██████  █████    
   ░░░░░     ░░░░░░   ░░░░░░   ░░░░░░░░ ░░░░░░░░              ░░░░░███   ░░░░░░░░ ░░░░░  ░░░░░░░░░              ░░░░░░░░ ░░░░░░   ░░░░░░  ░░░░░     
                                                                  ░███                                                                              
                                                                  █████                                                                             
                                                                 ░░░░░                                                                              
`;

export const jwtConstants = {
  secret: process.env.JWT_SECRET || '1254546556577676765734567890',
  expiresIn: process.env.ACCESS_TOKEN_EXPIRATION || '3600s',
  accessTokenSecret:
    process.env.ACCESS_TOKEN_SECRET || 'dBkkd45456546454654656tVHEvqNDu',
  accessTokenExpiration: process.env.ACCESS_TOKEN_EXPIRATION || '3600s',
  refreshTokenSecret:
    process.env.REFRESH_TOKEN_SECRET || 'De3Ibg65656KEr556565465654654669opt7j',
  refreshTokenExpiration: process.env.REFRESH_TOKEN_EXPIRATION || '86400s',
  recoverCodeExpiration: Number(process.env.RECOVER_CODE_EXPIRATION) || 300,
};

export const environment = {
  port: Number(process.env.PORT) || 3000,
  env: process.env.NODE_ENV,
  host: '',
  iamURL: process.env.AUTH_BASE_URL + process.env.AUTH_INTROSPECT,
  rabbitmq: process.env.RABBITMQ_URL,
};

export const dbConfig = {
  port: process.env.DB_PORT,
  host: process.env.DB_HOST,
  username: process.env.DB_USERNAME,
  database: process.env.DB_NAME,
  schema: process.env.DB_SCHEMA,
  password: '' + process.env.DB_PASSWORD,
};
// eslint-disable-next-line prettier/prettier
// export const dbUrl = 'postgres://'+process.env.DB_USER+':'+process.env.DB_PWD+'@'+process.env.DB_HOST+':'+process.env.DB_PORT+'/'+process.env.DB_NAME;
export const REGEX_DATE_YYYY_MM_DD =
  /^\d{4}\-(0?[1-9]|1[012])\-(0?[1-9]|[12][0-9]|3[01])$/; //ss
export const REGEX_WHITESPACE_FIELD = /^\s+$/; // Không chứa toàn bộ khoảng trắng
export const REGEX_NORMAL_FIELD = /^[a-z0-9A-Z\s&_-\u00C0-\u1EF9]+$/; // không ký tự đặc biệt trừ &-_
// eslint-disable-next-line prettier/prettier
export const REGEX_VIETNAMESE_PHONE = /([\+84|84|0]+(3|5|7|8|9|1[2|6|8|9]))+([0-9]{8})\b/m;
export enum Role {
  ADMIN = 'admin',
  USER = 'user',
}
export const DEFAULT_RESPONSE: OkResponseDto = {
  timestamp: new Date().toISOString(),
  statusCode: '',
  message: 'Success',
};
