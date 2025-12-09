import messagesHandler from '../../../services/messagesHandler.js'

class HandleOptions {
  constructor() {}
  async handleMenuOption(to, option, messageId) {
    let response
    switch (option) {
      case 'option_1':
        await messagesHandler.optionInformationGeneral(to)
        break
      case 'option_2':
        await messagesHandler.optionRegistration(to, messageId)
        break
      case 'option_3':
        await messagesHandler.optionProgramsImage(to, messageId)
        break
      default:
        await 'no soportado'
    }
  }
}

export default new HandleOptions()
