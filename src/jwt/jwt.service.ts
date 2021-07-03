import { Inject, Injectable } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';
import { CONFIG_OPTIONS } from './jwt.constants';
import { JwtModuleOptions } from './jwt.interfaces';


@Injectable()
export class JwtService {
  constructor(
    @Inject(CONFIG_OPTIONS) private readonly options: JwtModuleOptions,                      
  ) {}                                                                
  sign(payload: object): string {                        // <다른 모듈에서 사용가능 형태>              
    return jwt.sign(payload, this.options.privateKey);   // <다른 모듈에서 사용가능 형태>            
  }
}
