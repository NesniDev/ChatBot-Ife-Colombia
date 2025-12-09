import messagesHandler from '../../../services/messagesHandler.js'
import InformationMenu from './options/information.js'
import MatriculaMenu from './options/matricula.js'
import ProgramsMenu from './options/programs.js'

class HandleOptions {
  constructor() {}
  async handleMenuOption(to, option, messageId) {
    let response
    switch (option) {
      case 'option_1':
        await InformationMenu.optionInformation(to)
        break
      case 'option_2':
        await MatriculaMenu.optionRegistration(to, messageId)
        break
      case 'option_3':
        await ProgramsMenu.optionProgramsImage(to, messageId)
        break
      default:
        await 'no soportado'
    }
  }
}

export default new HandleOptions()
