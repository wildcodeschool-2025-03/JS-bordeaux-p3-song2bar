// to make the file a module and avoid the TypeScript error
export type {};

declare global {
  type MyPayload = JwtPayload & { sub: string; role: string };
  type FavouriteBar = { userId: number; barId: number };
  type FavouriteEvent = { userId: number; eventId: number };
  type Participate = { userId: number; eventId: number };

  namespace Express {
    export interface Request {
      favouriteBar: FavouriteBar;
      favouriteEvent: FavouriteEvent;
      participate: Participate;
      auth: MyPayload;
    }
  }
}
