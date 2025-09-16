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
    appTitle: "Chat de IA de Cloudflare",
    appDescription: "Chat de IA de Cloudflare",
    generating: "Generando...",
    welcomeMessage: "¡Bienvenido! Comencemos subiendo una imagen que te gustaría que analice.",
    analyzingMessage: "Analizando tu imagen...",
    imageDescriptionPrefix: "Así es como describiría la imagen:",
    socialMediaQuestion: "¿Te gustaría que genere publicaciones para redes sociales basadas en esta descripción?",
    socialMediaPostsPrefix: "Aquí tienes algunas publicaciones sugeridas para redes sociales:",
    readyForAnother: "Estoy listo para otra imagen",
    socialMediaError: "Hubo un error al generar las publicaciones para redes sociales. Por favor, inténtalo de nuevo.",
    noProblemMessage: "¡No hay problema! Avísame si te gustaría analizar otra imagen.",
    imageAnalysisError: "Hubo un error al analizar la imagen. Por favor, inténtalo de nuevo.",
    apiError: "Error al generar publicaciones para redes sociales",
    imageApiError: "Error al analizar la imagen",
    yesButton: "Sí",
    noButton: "No",
    processingPlaceholder: "Procesando...",
    messagePlaceholder: "Escribe tu mensaje...",
    uploadedImageAlt: "Imagen subida"
  },
  pt: {
    appTitle: "Chat de IA da Cloudflare",
    appDescription: "Chat de IA da Cloudflare",
    generating: "Gerando...",
    welcomeMessage: "Bem-vindo! Vamos começar enviando uma imagem que você gostaria que eu analisasse.",
    analyzingMessage: "Analisando sua imagem...",
    imageDescriptionPrefix: "Aqui está como eu descreveria a imagem:",
    socialMediaQuestion: "Gostaria que eu gerasse posts para redes sociais baseados nesta descrição?",
    socialMediaPostsPrefix: "Aqui estão algumas sugestões de posts para redes sociais:",
    readyForAnother: "Estou pronto para outra imagem",
    socialMediaError: "Houve um erro ao gerar posts para redes sociais. Por favor, tente novamente.",
    noProblemMessage: "Sem problema! Me avise se gostaria de analisar outra imagem.",
    imageAnalysisError: "Houve um erro ao analisar a imagem. Por favor, tente novamente.",
    apiError: "Falha ao gerar posts para redes sociais",
    imageApiError: "Falha ao analisar imagem",
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
