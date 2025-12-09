import whatsappService from '../../services/whatsappServices.js'

class Welcome {
  constructor() {}

  getSenderName(senderInfo) {
    return senderInfo.profile?.name || senderInfo.wa_id
  }

  async sendWelcomeMessage(to, messageId, senderInfo) {
    const name = this.getSenderName(senderInfo)
    const welcomeMessage = `¡Hola ${
      name.split(' ')[0]
    }!, Bienvenido a IFE Colombia, un instituto de educación comprometido con tu formación. Aquí podrás encontrar información sobre todos nuestros cursos, programas académicos, procesos de matrícula, y mucho más. Si tienes alguna pregunta o necesitas orientación sobre nuestros servicios, ¡estoy aquí para ayudarte! ¿En qué puedo asistirte hoy?`

    await whatsappService.sendMessage(to, welcomeMessage, messageId)
  }
}

export default new Welcome()
