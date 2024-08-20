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

  async traerSectores(body) {
    try {
      let consulta = `select * from sectores where borrado = 0 `;
      await sql.connect(config);
      const result = await sql.query(consulta);
      return result.recordsets[0];
    } catch (error) {
      return error;
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

  async traerTiposSolicitantes() {
    try {
      let consulta = `SELECT * FROM tipoSolicitanteTramites `;
      await sql.connect(config);
      const result = await sql.query(consulta);
      return result.recordsets[0];
    } catch (err) {
      return err;
    }
  }

  async nuevoTramite(body: any) {
    console.log(body.tramiteFechaIng.toLocaleString('es-ES'));
    const {
      idTipoTramite,
      tramiteFechaIng,
      tramiteFolio,
      idTipoSolicitanteTramite,
      descTramSolicitanteExterno,
      dniSolicitanteAlumno,
      observaciones,
      idUsuarioAltaTramite,
      idSectorAltaTramite,
      idEstado,
    } = body;

    let pool = await sql.connect(config);
    let result = await pool
      .request()
      .input('idTipoTramite', sql.Int, parseInt(idTipoTramite))
      .input('tramiteFechaIng', sql.DateTime, tramiteFechaIng)
      .input('tramiteFolio', sql.Int, tramiteFolio)
      .input('idTipoSolicitanteTramite', sql.Int, idTipoSolicitanteTramite)
      .input(
        'descTramSolicitanteExterno',
        sql.VarChar(100),
        descTramSolicitanteExterno,
      )
      .input('dniSolicitanteAlumno', sql.Int, parseInt(dniSolicitanteAlumno))
      .input('observaciones', sql.VarChar(500), observaciones)
      .input('idUsuarioAltaTramite', sql.Int, parseInt(idUsuarioAltaTramite))
      .input('idSectorAltaTramite', sql.Int, parseInt(idSectorAltaTramite))
      .execute('sp_TramiteNuevo')
      .catch((err) => {
        console.log(err);
        return err;
      });

    return result.recordsets[0];
  }

  async traerTramites(body: any) {
    console.log(body);
    const { idSector } = body;
    try {
      let consulta = `SELECT        tramites.idTramite, tramites.tramiteNum, tramites.tramiteAño, tramites.tramiteFechaIng, tramites.idTipoTramite, tramites.tramiteFolio, tramites.idTipoSolicitanteTramite, tramites.descTramSolicitanteExterno, 
                         tramites.dniSolicitanteAlumno, tramites.observaciones, tramites.idUsuarioAltaTramite, tramites.idSectorAltaTramite, tramites.idSectorActual, tramites.idEstado, tramites.borrado,
                         estadoTramite.estadoDescripcion , tipoTramites.tramiteDescripcion
FROM            tramites inner JOIN
                         estadoTramite on estadoTramite.idEstado = tramites.idEstado
                          inner join  tipoTramites on tramites.idTipoTramite = tipoTramites.idTipoTramite
                         where idSectorActual = ${idSector} and borrado = 'False' order by tramites.idTramite `;
      await sql.connect(config);
      const result = await sql.query(consulta);
      console.log(result.recordsets[0]);
      return result.recordsets[0];
    } catch (error) {
      console.log(error);
      return error;
    }
  }

  async nuevoPase(body: any) {
    console.log('PARA EL NUEVO PASE:', body);
    const { idTramite, idSectorDestino } = body;
    let pool = await sql.connect(config);
    let result = await pool
      .request()
      .input('idTramite', sql.Int, parseInt(idTramite))
      .input('idSectorDestino', sql.Int, parseInt(idSectorDestino))
      .execute('sp_paseNuevo')
      .catch((err) => {
        console.log(err);
        return err;
      });
    return result.recordsets[0];
  }
}
