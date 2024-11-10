/*
 * https://www.rfc-editor.org/rfc/rfc7519
 */
export interface Token {
  typ?: string;
  sub?: string;
  id?: string;
  mobile?: string;
  iss?: string;
  scope?: [];
  active?: boolean;
}
