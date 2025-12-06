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
      } else {
        // Si no es un saludo, simplemente repite el mensaje
        const response = `Echo: ${message.text.body}`
        await whatsappService.sendMessage(message.from, response, message.id)
      }
      await whatsappService.markAsRead(message.id) // Marca el mensaje como leído
    } else if (message.type === 'interactive') {
      const option = message.interactive.button_reply.id.toLowerCase().trim()
      await this.handleMenuOption(message.from, option)
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
      'ola'
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

  async handleMenuOption(to, option) {
    let response
    switch (option) {
      case 'option_1':
        await this.optionInformationGeneral(to)
        break
      case 'option_2':
        await ''
        break
      case 'option_3':
        await ''
        break
      default:
        await whatsappService.sendMessage(
          message.from,
          'Opción no soportada',
          message.id
        )
    }
  }
}

export default new MessageHandler()
