import { environment } from '../../environments/environment';
import type { JwtAuthService } from './jwt-auth.service';

export function JwtAuthServiceFactory(
  jwtService: JwtAuthService,
  msalService: JwtAuthService,
) {
  if (environment.authStrategy === 'oauth') {
    return msalService;
  }
  return jwtService;
}
