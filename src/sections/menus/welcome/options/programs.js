import whatsappService from '../../../../services/whatsappServices.js'

class ProgramsMenu {
  constructor() {}
  async optionProgramsImage(to, messageId) {
    const mediaUrl =
      'https://drive.google.com/uc?export=download&id=1emZCKF0xOhWH7B40cxvYKsn0-SFWGUf0'
    const caption = '¡Unéte a nuestros cursos de programas académicos!'
    const type = 'image'

    await whatsappService.sendMediaMessage(to, type, mediaUrl, caption)
  }
}

export default new ProgramsMenu()
