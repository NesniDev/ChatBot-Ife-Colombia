import whatsappService from '../../../../services/whatsappServices.js'

class InformationMenu {
  constructor() {}
  async optionInformation(to) {
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
}

export default new InformationMenu()
