import whatsappService from './whatsappServices.js'
import Welcome from '../sections/welcome/welcome.js'
import WelcomeMenu from '../sections/menus/welcome/index.js'
import HandleOptions from '../sections/menus/welcome/handleOptions.js'
import ImagesInfo from '../sections/images/index.js'

class MessageHandler {
  constructor() {
    this.informationPerson = {}
  }

  async handleIncomingMessage(message, senderInfo) {
    if (message?.type === 'text') {
      // Verifica que el mensaje sea de tipo texto
      const incomingMessage = message.text.body.toLowerCase().trim() // Procesa el mensaje

      // Si es un saludo (hola), responde con un mensaje de bienvenida
      if (this.isGreeting(incomingMessage)) {
        await Welcome.sendWelcomeMessage(message.from, message.id, senderInfo)
        await WelcomeMenu.sendWelcomeMenu(message.from) // Envia el menú de opciones al usuario
      } else if (incomingMessage.match(/\bmedia\b/)) {
        await ImagesInfo.sendMedia(message.from)
      } else {
        // Si no es un saludo, simplemente repite el mensaje
        const response = `Echo: ${message.text.body}`
        await whatsappService.sendMessage(message.from, response, message.id)
      }
      await whatsappService.markAsRead(message.id) // Marca el mensaje como leído
    } else if (message.type === 'interactive') {
      const option = message.interactive.button_reply.id.toLowerCase().trim()
      await HandleOptions.handleMenuOption(message.from, option, message.id)
      await whatsappService.markAsRead(message.id) // Marca el mensaje como leído
    }
    await whatsappService.sendInteractiveButton(to, menuMessage, buttons)
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

  // async handleInformationPerson(to, message) {
  //   const state = this.informationPerson[to]
  //   let response
  //   switch (state.step) {
  //     case 'name':
  //       state.name = message
  //       state.step = 'email'
  //       response = `¿Cuál es tu correo electrónico?`
  //       break

  //     case 'email':
  //       state.email = message
  //       state.step = 'phone'
  //       response = `¿Cuál es tu número de teléfono?`
  //       break

  //     case 'phone':
  //       state.phone = message
  //       response = `¡Gracias por tu información! Te enviaremos un mensaje con tus credenciales de acceso a IFE`

  //     default:
  //       response = `No se ha podido encontrar información sobre el usuario ${to}`
  //   }
  // }
}

export default new MessageHandler()
