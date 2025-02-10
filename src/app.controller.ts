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

  @Post('/traerdatossector')
  traerdatossector(@Body() body: any) {
    return this.appService.traerDatosSector(body);
  }

  @Post('/traersectores')
  traerSectores(@Body() body: any) {
    return this.appService.traerSectores(body);
  }

  @Post('/traersectoresporusuario')
  traersectoresporusuario(@Body() body: any) {
    return this.appService.traersectoresporusuario(body);
  }
  @Post('/traerclasestramites')
  traerclasestramites(@Body() body: any) {
    return this.appService.traerClasesTramites(body);
  }

  @Post('/traertipostramites')
  traerTipoTramite(@Body() body: any) {
    return this.appService.traerTipoTramites(body);
  }

  @Post('/traertipossolicitantes')
  traerTiposSolicitantes() {
    return this.appService.traerTiposSolicitantes();
  }

  @Post('/nuevotramite')
  guardartramite(@Body() body: any) {
    return this.appService.nuevoTramite(body);
  }

  @Post('/traertramites')
  traerTramites(@Body() body: any) {
    return this.appService.traerTramites(body);
  }

  @Post('/nuevopase')
  nuevoPase(@Body() body: any) {
    return this.appService.nuevoPase(body);
  }

  @Post('/aceptarpase')
  aceptarPase(@Body() body: any) {
    return this.appService.aceptarPase(body);
  }

  @Post('/cambiarestadotramite')
  cambiarEstadoTramite(@Body() body: any) {
    return this.appService.cambiarEstadoTramite(body);
  }

  @Post('/buscartramite')
  buscarTramite(@Body() body: any) {
    return this.appService.buscarTramite(body);
  }

  @Post('/buscarmovimientostramites')
  buscarMovimientosTramites(@Body() body: any) {
    return this.appService.buscarMovimientosTramites(body);
  }

  @Post('/traerdatostramite')
  traerDatosTramite(@Body() body: any) {
    return this.appService.traerDatosTramite(body);
  }

  @Post('/actualizardatostramite')
  actualizarDatosTramite(@Body() body: any) {
    return this.appService.actualizarDatosTramites(body);
  }

  @Post('/eliminartramite')
  eliminarTramite(@Body() body: any) {
    return this.appService.eliminarTramite(body);
  }

  @Post('/eliminarultimomovimiento')
  eliminarUltimoMovimiento(@Body() body: any) {
    return this.appService.eliminarUltimoMovimiento(body);
  }

  @Post('/buscarparticipante')
  buscarParticipante(@Body() body: any) {
    return this.appService.buscarParticipante(body);
  }

  /***********************************SISTEMAS EXTERNOS*******************************************/

  @Post('/sistemaexterno/nuevotramite')
  nuevoTramiteExterno(@Body() body: any) {
    return this.appService.nuevoTramiteExterno(body);
  }
}
