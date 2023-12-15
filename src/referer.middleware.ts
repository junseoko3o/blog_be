import { Injectable, NestMiddleware } from "@nestjs/common";
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class RefererMiddleware implements NestMiddleware {
  allowedReferrers: string[] = [process.env.ALLOWD_REFERERS];
  use(req: Request, res: Response, next: NextFunction) {
    const referer = req.headers.referer;

    if (referer && this.isRefererAllowed(referer)) {
      next();
    } else {
      res.status(403).send('Forbidden');
    }
  }

  private isRefererAllowed(referer: string): boolean {
    return this.allowedReferrers.some((allowed) => referer.includes(allowed));
  }
}