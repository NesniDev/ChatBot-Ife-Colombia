import whatsappService from '../../../../services/whatsappServices.js'

class MatriculaMenu {
  constructor() {}
  async optionRegistration(to, messageId) {
    const messageResponse = `Para iniciar clases en el mes de Febrero del año 2026 contamos con los siguientes horarios de estudio:
      * Jornada Presencial de Lunes, Martes, Miércoles y Jueves de 8:30 a.m. a 11:00 a.m. (inicio de clases 16 de Febrero de 2026)
      * Jornada Presencial los Sábados de 8:00 a.m. a 3:30 p.m. (inicio de clases 14 de Febrero de 2026)
      * Jornada Virtual con Apoyo de Plataforma Tecnológica y Tutorías Online, acompañamiento personalizado con clases remotas por google meet los días viernes de 2:30 a 4:00 p.m., las clases se graban para cualquier inquietud (inicio de clases 20 de Febrero de 2026)`

    await whatsappService.sendMessage(to, messageResponse, messageId)
  }
}

export default new MatriculaMenu()
