export declare enum Sort {
    ASC = "ASC",
    DESC = "DESC"
}
export declare enum CombineQueryOption {
    AND = "AND",
    OR = "OR"
}
export declare enum SearchArrayOption {
    in = "in",
    notIn = "notIn",
    exists = "exists",
    notExists = "notExists",
    between = "between"
}
export declare enum SearchParams {
    page = "page",
    perPage = "size",
    sort = "sort",
    select = "select",
    fromDate = "fromDate",
    toDate = "toDate",
    createDate = "createDate"
}
export declare enum ResponseBodyType {
    array = "array",
    object = "object",
    string = "string",
    number = "number",
    boolean = "boolean"
}
export declare enum HeaderOptions {
    xChannel = "X-Channel",
    authorization = "Authorization",
    xRequestID = "X-Request-ID"
}
export declare enum StatusOptions {
    ACT = "ACT",
    IACT = "IACT"
}
export declare enum StatusOptionsFilter {
    ACT = "ACT",
    IACT = "IACT",
    ALL = ""
}
export declare enum SecretKeyType {
    DECRYPT = "DECRYPT",
    ENCRYPT = "ENCRYPT",
    VERIFY = "VERIFY"
}
export declare enum EAlgorithmType {
    sha256WithRSA = "sha256WithRSA",
    sha1WithRSA = "sha1WithRSA"
}
