import { NextFunction, Request, Response } from "express";
import { Injectable, NestMiddleware } from "@nestjs/common";
import { JwtService } from "./jwt.service";
import { UsersService } from "src/users/users.service";

@Injectable()
export class JwtMiddleware implements NestMiddleware {
  constructor(
    private readonly jwtService: JwtService,
    private readonly UsersService: UsersService,
  ) {}
  async use(req: Request, res: Response, next: NextFunction) {
    if ('x-jwt' in req.headers) {
      const token = req.headers['x-jwt'];
      try {
        const decoded = this.jwtService.verify(token.toString());
        if (typeof decoded === 'object' && decoded.hasOwnProperty('id')) {
          const { user } = await this.UsersService.findById(decoded['id']);
          req['user'] = user;
        } 
      } catch (e) {}
    }
    next();
  }

}
