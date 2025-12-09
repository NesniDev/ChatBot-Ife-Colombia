class ImagesInfo {
  constructor() {}
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

export default new ImagesInfo()
