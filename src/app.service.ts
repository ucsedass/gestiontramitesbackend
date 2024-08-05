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
    try {
      let consulta = 'select * from tipoTramites';
      await sql.connect(config);
      const result = await sql.query(consulta);
      return result.recordsets[0];
    } catch (err) {
      return err;
    }
  }
}
