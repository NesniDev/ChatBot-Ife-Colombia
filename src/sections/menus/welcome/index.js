import whatsappService from '../../../services/whatsappServices.js'

class WelcomeMenu {
  constructor() {}
  async sendWelcomeMenu(to) {
    const menuMessage = `Elige una opción para continuar con tu proceso`
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
}

export default new WelcomeMenu()
