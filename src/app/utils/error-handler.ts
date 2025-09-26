import type { RestResponse } from '@/core/global/responses/rest-response'

/**
 * Utilitário para tratamento padronizado de erros de API
 */
export class ApiErrorHandler {
  /**
   * Verifica se uma resposta da API foi bem-sucedida e lança erro com contexto se não foi
   */
  static ensureSuccess<T>(response: RestResponse<T>, context: string): T {
    if (response.isFailure) {
      console.error(`[API_ERROR] ${context}:`, {
        statusCode: response.statusCode,
        errorMessage: response.errorMessage,
      })

      // Lançar erro com mensagem mais amigável baseada no status code
      const userFriendlyMessage = ApiErrorHandler.getUserFriendlyMessage(
        response.statusCode,
        context,
      )
      throw new Error(userFriendlyMessage)
    }

    return response.body
  }

  /**
   * Retorna mensagem de erro amigável baseada no status code
   */
  static getUserFriendlyMessage(statusCode: number, context: string): string {
    switch (statusCode) {
      case 0:
        return 'Erro de conexão: Não foi possível conectar ao servidor. Verifique se a API está rodando.'
      case 400:
        return 'Erro de validação: Os dados enviados são inválidos.'
      case 401:
        return 'Erro de autenticação: Você precisa fazer login novamente.'
      case 403:
        return 'Erro de autorização: Você não tem permissão para acessar este recurso.'
      case 404:
        return `Recurso não encontrado: O ${context.toLowerCase()} solicitado não existe.`
      case 500:
      case 502:
      case 503:
      case 504:
        return 'Erro interno do servidor: Tente novamente em alguns minutos.'
      default:
        return `Erro inesperado ao ${context.toLowerCase()}. Código: ${statusCode}`
    }
  }
}
