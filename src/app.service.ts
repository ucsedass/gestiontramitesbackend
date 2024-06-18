import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'desde el servicio de gestion de tramites';
  }
}
