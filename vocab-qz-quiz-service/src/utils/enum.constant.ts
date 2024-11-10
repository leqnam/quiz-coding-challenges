export enum Sort {
  ASC = 'ASC',
  DESC = 'DESC',
}

/**
 * Enum representation allowed combination query
 */
export enum CombineQueryOption {
  AND = 'AND',
  OR = 'OR',
}

/**
 * Enum representation allowed comparison array type when request
 */
export enum SearchArrayOption {
  in = 'in',
  notIn = 'notIn',
  exists = 'exists',
  notExists = 'notExists',
  between = 'between',
}

export enum SearchParams {
  page = 'page',
  perPage = 'size',
  sort = 'sort',
  select = 'select',
  fromDate = 'fromDate',
  toDate = 'toDate',
  createDate = 'createDate',
}

export enum ResponseBodyType {
  array = 'array',
  object = 'object',
  string = 'string',
  number = 'number',
  boolean = 'boolean',
}

export enum HeaderOptions {
  xChannel = 'X-Channel',
  authorization = 'Authorization',
  xRequestID = 'X-Request-ID',
}

export enum StatusOptions {
  ACT = 'ACT',
  IACT = 'IACT',
}

export enum StatusOptionsFilter {
  ACT = 'ACT',
  IACT = 'IACT',
  ALL = '',
}

export enum SecretKeyType {
  DECRYPT = 'DECRYPT',
  ENCRYPT = 'ENCRYPT',
  VERIFY = 'VERIFY',
}

export enum EAlgorithmType {
  sha256WithRSA = 'sha256WithRSA',
  sha1WithRSA = 'sha1WithRSA',
}
