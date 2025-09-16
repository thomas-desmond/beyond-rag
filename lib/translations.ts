export type Language = 'en' | 'es' | 'pt';

export const translations = {
  en: {
    appTitle: "Cloudflare AI Chat",
    appDescription: "Cloudflare AI Chat",
    generating: "Generating...",
    welcomeMessage: "Welcome! Let's start by uploading an image you'd like me to analyze.",
    analyzingMessage: "Analyzing your image...",
    imageDescriptionPrefix: "Here's how I would describe the image:",
    socialMediaQuestion: "Would you like me to generate social media posts based on this description?",
    socialMediaPostsPrefix: "Here are some suggested social media posts:",
    readyForAnother: "I'm ready for another image",
    socialMediaError: "There was an error generating social media posts. Please try again.",
    noProblemMessage: "No problem! Let me know if you'd like to analyze another image.",
    imageAnalysisError: "There was an error analyzing the image. Please try again.",
    apiError: "Failed to generate social media posts",
    imageApiError: "Failed to analyze image",
    yesButton: "Yes",
    noButton: "No",
    processingPlaceholder: "Processing...",
    messagePlaceholder: "Type your message...",
    uploadedImageAlt: "Uploaded image"
  },
  es: {
    appTitle: "Cloudflare AI Chat",
    appDescription: "Cloudflare AI Chat",
    generating: "Generando...",
    welcomeMessage: "¡Hola! Empecemos por subir la imagen que te gustaría que analice.",
    analyzingMessage: "Analizando tu imagen...",
    imageDescriptionPrefix: "Así es como yo describiría la imagen:",
    socialMediaQuestion: "¿Te gustaría que genere publicaciones para redes sociales basadas en esta descripción?",
    socialMediaPostsPrefix: "Aquí tienes algunas publicaciones sugeridas para redes sociales:",
    readyForAnother: "Estoy listo para otra imagen",
    socialMediaError: "Ocurrió un error al generar las publicaciones para redes sociales. Por favor, inténtalo de nuevo.",
    noProblemMessage: "¡No hay problema! Avísame si quieres que analice otra imagen.",
    imageAnalysisError: "Ocurrió un error al analizar la imagen. Por favor, inténtalo de nuevo.",
    apiError: "No se pudieron generar las publicaciones para redes sociales",
    imageApiError: "No se pudo analizar la imagen",
    yesButton: "Sí",
    noButton: "No",
    processingPlaceholder: "Procesando...",
    messagePlaceholder: "Escribe tu mensaje...",
    uploadedImageAlt: "Imagen subida"
  },
  pt: {
    appTitle: "Cloudflare AI Chat",
    appDescription: "Cloudflare AI Chat",
    generating: "Gerando...",
    welcomeMessage: "Boas-vindas! Vamos começar. Para isso, por favor, envie a imagem que você gostaria que eu analise.",
    analyzingMessage: "Analisando sua imagem...",
    imageDescriptionPrefix: "Aqui está como eu descreveria a imagem:",
    socialMediaQuestion: "Você gostaria que eu gerasse posts para redes sociais com base nessa descrição?",
    socialMediaPostsPrefix: "Aqui estão algumas sugestões de posts para redes sociais:",
    readyForAnother: "Estou pronto para outra imagem",
    socialMediaError: "Houve um erro ao gerar posts para redes sociais. Por favor, tente novamente.",
    noProblemMessage: "Sem problemas! Me diga se você quiser analisar outra imagem.",
    imageAnalysisError: "Houve um erro ao analisar a imagem. Por favor, tente novamente.",
    apiError: "Não foi possível gerar os posts para redes sociais",
    imageApiError: "Não foi possível analisar a imagem",
    yesButton: "Sim",
    noButton: "Não",
    processingPlaceholder: "Processando...",
    messagePlaceholder: "Digite sua mensagem...",
    uploadedImageAlt: "Imagem enviada"
  }
} as const;

export type TranslationKey = keyof typeof translations.en;

// Helper function to safely get translation key type
export function getTranslationKey(key: string): TranslationKey {
  return key as TranslationKey;
}
