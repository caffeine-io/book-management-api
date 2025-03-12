import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { passportJwtSecret } from 'jwks-rsa';
import { ConfigService } from '@nestjs/config';

interface JwtPayload {
  sub: string;
  [key: string]: any;
}

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      audience: configService.get<string>('AUTH0_AUDIENCE'),
      issuer: `${configService.get<string>('AUTH0_ISSUER_URL')}`,
      algorithms: ['RS256'],
      passReqToCallback: true,
      secretOrKeyProvider: passportJwtSecret({
        cache: true,
        rateLimit: true,
        jwksRequestsPerMinute: 5,
        jwksUri: `${configService.get<string>('AUTH0_ISSUER_URL')}.well-known/jwks.json`,
      }),
    });
  }

  validate(request: any, payload: JwtPayload): JwtPayload {
    return payload;
  }
}
