"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EAlgorithmType = exports.SecretKeyType = exports.StatusOptionsFilter = exports.StatusOptions = exports.HeaderOptions = exports.ResponseBodyType = exports.SearchParams = exports.SearchArrayOption = exports.CombineQueryOption = exports.Sort = void 0;
var Sort;
(function (Sort) {
    Sort["ASC"] = "ASC";
    Sort["DESC"] = "DESC";
})(Sort || (exports.Sort = Sort = {}));
var CombineQueryOption;
(function (CombineQueryOption) {
    CombineQueryOption["AND"] = "AND";
    CombineQueryOption["OR"] = "OR";
})(CombineQueryOption || (exports.CombineQueryOption = CombineQueryOption = {}));
var SearchArrayOption;
(function (SearchArrayOption) {
    SearchArrayOption["in"] = "in";
    SearchArrayOption["notIn"] = "notIn";
    SearchArrayOption["exists"] = "exists";
    SearchArrayOption["notExists"] = "notExists";
    SearchArrayOption["between"] = "between";
})(SearchArrayOption || (exports.SearchArrayOption = SearchArrayOption = {}));
var SearchParams;
(function (SearchParams) {
    SearchParams["page"] = "page";
    SearchParams["perPage"] = "size";
    SearchParams["sort"] = "sort";
    SearchParams["select"] = "select";
    SearchParams["fromDate"] = "fromDate";
    SearchParams["toDate"] = "toDate";
    SearchParams["createDate"] = "createDate";
})(SearchParams || (exports.SearchParams = SearchParams = {}));
var ResponseBodyType;
(function (ResponseBodyType) {
    ResponseBodyType["array"] = "array";
    ResponseBodyType["object"] = "object";
    ResponseBodyType["string"] = "string";
    ResponseBodyType["number"] = "number";
    ResponseBodyType["boolean"] = "boolean";
})(ResponseBodyType || (exports.ResponseBodyType = ResponseBodyType = {}));
var HeaderOptions;
(function (HeaderOptions) {
    HeaderOptions["xChannel"] = "X-Channel";
    HeaderOptions["authorization"] = "Authorization";
    HeaderOptions["xRequestID"] = "X-Request-ID";
})(HeaderOptions || (exports.HeaderOptions = HeaderOptions = {}));
var StatusOptions;
(function (StatusOptions) {
    StatusOptions["ACT"] = "ACT";
    StatusOptions["IACT"] = "IACT";
})(StatusOptions || (exports.StatusOptions = StatusOptions = {}));
var StatusOptionsFilter;
(function (StatusOptionsFilter) {
    StatusOptionsFilter["ACT"] = "ACT";
    StatusOptionsFilter["IACT"] = "IACT";
    StatusOptionsFilter["ALL"] = "";
})(StatusOptionsFilter || (exports.StatusOptionsFilter = StatusOptionsFilter = {}));
var SecretKeyType;
(function (SecretKeyType) {
    SecretKeyType["DECRYPT"] = "DECRYPT";
    SecretKeyType["ENCRYPT"] = "ENCRYPT";
    SecretKeyType["VERIFY"] = "VERIFY";
})(SecretKeyType || (exports.SecretKeyType = SecretKeyType = {}));
var EAlgorithmType;
(function (EAlgorithmType) {
    EAlgorithmType["sha256WithRSA"] = "sha256WithRSA";
    EAlgorithmType["sha1WithRSA"] = "sha1WithRSA";
})(EAlgorithmType || (exports.EAlgorithmType = EAlgorithmType = {}));
//# sourceMappingURL=enum.constant.js.map