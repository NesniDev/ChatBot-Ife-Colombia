class GetInfoPerson {
  async sendInformationMessage(to) {
    this.informationPerson[to] = { step: 'name' }
    const welcomeMessage = `Bienvenido a IFE Colombia, un instituto de educación comprometido con la formación de los estudiantes. Para continuar con la conversación, por favor, responde a la siguientes preguntas.`
    let name = `¿Cuál es tu nombre?`

    await whatsappService.sendMessage(to, welcomeMessage)
    await whatsappService.sendMessage(to, name)
  }

  async handleInformationPerson(to, message, messageId, senderInfo) {
    const state = this.informationPerson[to]
    let response
    switch (state.step) {
      case 'name':
        state.name = message
        state.step = 'email'
        response = `¿Cuál es tu correo electrónico?`
        break

      case 'email':
        state.email = message
        state.step = 'phone'
        response = `¿Cuál es tu número de teléfono?`
        break

      case 'phone':
        state.phone = message
        response = `¡Gracias por tu información!`
        break
    }
    await whatsappService.sendMessage(to, response)

    if (state.name && state.email && state.phone) {
      await Welcome.sendWelcomeMessage(to, messageId, senderInfo)
      await WelcomeMenu.sendWelcomeMenu(to)
    }
  }
}

export default new GetInfoPerson()
