export type {};

declare global {
  type MyPayload = JwtPayload & { sub: string; role: string };
  type Search = string;

  namespace Express {
    export interface Request {
      auth: MyPayload;
      search: Search;
    }
  }
}
