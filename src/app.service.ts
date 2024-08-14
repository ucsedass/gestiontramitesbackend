import { Injectable } from '@nestjs/common';

require('tls').DEFAULT_MIN_VERSION = 'TLSv1';
var sql = require('mssql');

var config = {
  user: 'GestionTramites',
  password: 'GT20240708',
  server: 'sgo-desarrollo',
  database: 'GestionTramites',

  options: {
    trustedConnection: true,
    encrypt: false, // modifique a false para que no me de error de certificado
    enableArithAbort: true,
    trustServerCertificate: false,
  },
};

@Injectable()
export class AppService {
  getHello(): string {
    return 'desde el servicio de gestion de tramites';
  }

  async login(body: any) {
    console.log(body);
    const { usuario, contraseña } = body;
    try {
      let consulta = `select  *
  FROM [GestionTramites].[dbo].[usuarios] where usuario ='${usuario}' and contraseña = '${contraseña}'`;
      await sql.connect(config);
      const result = await sql.query(consulta);
      console.log(result.recordsets[0]);
      return result.recordsets[0];
    } catch (error) {
      console.log(error);
      return error;
    }
  }

  async traerDatosUsuario(body: any) {
    console.log(body);
    const { idUsuario } = body;
    try {
      let consulta = `SELECT nombre FROM usuarios WHERE idUsuario = ${idUsuario}`;
      await sql.connect(config);
      const result = await sql.query(consulta);
      return result.recordsets[0];
    } catch (err) {
      return err;
    }
  }

  async traerDatosSector(body: any) {
    const { idSector } = body;
    try {
      let consulta = `SELECT sectorDescripcion FROM sectores WHERE idSector = ${idSector}`;
      await sql.connect(config);
      const result = await sql.query(consulta);
      return result.recordsets[0];
    } catch (err) {
      return err;
    }
  }

  async traersectoresporusuario(body: any) {
    console.log('idUsuario :', body);
    const { idUsuario } = body;
    try {
      let consulta = `select sectores.idSector,sectores.sectorDescripcion from usuariosXSector inner join sectores on usuariosXSector.idSector = sectores.idSector where idUsuario = ${idUsuario}`;
      await sql.connect(config);
      const result = await sql.query(consulta);
      return result.recordsets[0];
    } catch (err) {
      return err;
    }
  }
  async traerClasesTramites(body: any) {
    try {
      let consulta = 'select * from claseTramites';
      await sql.connect(config);
      const result = await sql.query(consulta);
      return result.recordsets[0];
    } catch (err) {
      return err;
    }
  }
  async traerTipoTramites(body: any) {
    const { idClaseTramite } = body;
    console.log(body);
    try {
      let consulta = `SELECT * FROM tipoTramites WHERE idClaseTramite = ${idClaseTramite}`;
      await sql.connect(config);
      const result = await sql.query(consulta);
      return result.recordsets[0];
    } catch (err) {
      return err;
    }
  }

  nuevoTramite(body: any) {
    return 'desde el servicio nuevo tramite';
  }

  nuevoPase(body: any) {
    return 'desde el servicio nuevo pase';
  }
}
