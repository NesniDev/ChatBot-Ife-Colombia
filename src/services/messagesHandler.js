import whatsappService from './whatsappServices.js'

class MessageHandler {
  async handleIncomingMessage(message, senderInfo) {
    if (message?.type === 'text') {
      // Verifica que el mensaje sea de tipo texto
      const incomingMessage = message.text.body.toLowerCase().trim() // Procesa el mensaje

      // Si es un saludo (hola), responde con un mensaje de bienvenida
      if (this.isGreeting(incomingMessage)) {
        await this.sendWelcomeMessage(message.from, message.id, senderInfo)
        await this.sendWelcomeMenu(message.from) // Envia el menú de opciones al usuario
      } else if (incomingMessage.match(/\bmedia\b/)) {
        await this.sendMedia(message.from)
      } else {
        // Si no es un saludo, simplemente repite el mensaje
        const response = `Echo: ${message.text.body}`
        await whatsappService.sendMessage(message.from, response, message.id)
      }
      await whatsappService.markAsRead(message.id) // Marca el mensaje como leído
    } else if (message.type === 'interactive') {
      const option = message.interactive.button_reply.id.toLowerCase().trim()
      await this.handleMenuOption(message.from, option, message.id)
      await whatsappService.markAsRead(message.id) // Marca el mensaje como leído
    }
  }

  isGreeting(message) {
    const greetings = [
      'hola',
      'hello',
      'hi',
      'buenas tardes',
      'buenas',
      'buen dia',
      'buenos dias',
      'buenas noches',
      'buen día',
      'holi',
      'ola',
      'oli'
    ]
    return greetings.includes(message)
  }

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

  async sendWelcomeMenu(to) {
    const menuMessage = `Elige una opción`
    const buttons = [
      {
        type: 'reply',
        reply: {
          id: 'option_1',
          title: 'Información General'
        }
      },
      {
        type: 'reply',
        reply: {
          id: 'option_2',
          title: 'Matricula'
        }
      },
      {
        type: 'reply',
        reply: {
          id: 'option_3',
          title: 'Programas'
        }
      }
    ]

    await whatsappService.sendInteractiveButton(to, menuMessage, buttons)
  }

  async optionInformationGeneral(to) {
    const messageInfo = `Información General`
    const buttons = [
      {
        type: 'reply',
        reply: {
          id: 'option_1',
          title: 'Cursos'
        }
      },
      {
        type: 'reply',
        reply: {
          id: 'option_2',
          title: 'Programas'
        }
      },
      {
        type: 'reply',
        reply: {
          id: 'option_3',
          title: 'Matrícula'
        }
      }
    ]

    await whatsappService.sendInteractiveButton(to, messageInfo, buttons)
  }

  async optionRegistration(to, messageId) {
    const messageResponse = `Para iniciar clases en el mes de Febrero del año 2026 contamos con los siguientes horarios de estudio:
      * Jornada Presencial de Lunes, Martes, Miércoles y Jueves de 8:30 a.m. a 11:00 a.m. (inicio de clases 16 de Febrero de 2026)
      * Jornada Presencial los Sábados de 8:00 a.m. a 3:30 p.m. (inicio de clases 14 de Febrero de 2026)
      * Jornada Virtual con Apoyo de Plataforma Tecnológica y Tutorías Online, acompañamiento personalizado con clases remotas por google meet los días viernes de 2:30 a 4:00 p.m., las clases se graban para cualquier inquietud (inicio de clases 20 de Febrero de 2026)`

    await whatsappService.sendMessage(to, messageResponse, messageId)
  }

  async optionProgramsImage(to, messageId) {
    const mediaUrl =
      'https://drive.google.com/uc?export=download&id=1emZCKF0xOhWH7B40cxvYKsn0-SFWGUf0'
    const caption = '¡Unéte a nuestros cursos de programas académicos!'
    const type = 'image'

    await whatsappService.sendMediaMessage(to, type, mediaUrl, caption)
  }

  async handleMenuOption(to, option, messageId) {
    let response
    switch (option) {
      case 'option_1':
        await this.optionInformationGeneral(to)
        break
      case 'option_2':
        await this.optionRegistration(to, messageId)
        break
      case 'option_3':
        await this.optionProgramsImage(to, messageId)
        break
      default:
        await 'no soportado'
    }
  }

  async sendMedia(to) {
    const mediaUrl =
      'https://drive.google.com/uc?export=download&id=1_E6U_kTp_OqJrBZKBniS4P1Gx2kKGJH7'
    const caption = '¡Unéte a nuestros cursos de programas académicos!'
    const type = 'audio'

    // const mediaUrl = 'https://s3.amazonaws.com/gndx.dev/medpet-video.mp4';
    // const caption = '¡Esto es una video!';
    // const type = 'video';

    // const mediaUrl = 'https://s3.amazonaws.com/gndx.dev/medpet-file.pdf'
    // const caption = '¡Esto es un PDF!'
    // const type = 'document'
    await whatsappService.sendMediaMessage(to, type, mediaUrl, caption)
  }
}

export default new MessageHandler()
