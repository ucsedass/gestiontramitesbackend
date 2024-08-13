import { Body, Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Post('/login')
  login(@Body() body: any) {
    return this.appService.login(body);
  }

  @Post('/traerdatosusuario')
  traerdatosusuario(@Body() body: any) {
    return this.appService.traerDatosUsuario(body);
  }
  @Post('/traerclasestramites')
  traerclasestramites(@Body() body: any) {
    return this.appService.traerClasesTramites(body);
  }

  @Post('/traertipotramites')
  traerTipoTramite(@Body() body: any) {
    return this.appService.traerTipoTramites(body);
  }

  @Post('/nuevotramite')
  guardartramite(@Body() body: any) {
    return this.appService.nuevoTramite(body);
  }

  @Post('/nuevopase')
  nuevoPase(@Body() body: any) {
    return this.appService.nuevoPase(body);
  }
}
