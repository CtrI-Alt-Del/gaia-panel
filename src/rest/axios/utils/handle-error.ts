import { RestResponse } from '../../../core/global/responses/rest-response'

export function handleError<ResponseBody>(error: any): RestResponse<ResponseBody> {
  if (error.response) {
    return new RestResponse<ResponseBody>({
      statusCode: error.response.status,
      errorMessage: error.response.data?.message || error.message || 'HTTP Error',
      headers: error.response.headers as Record<string, string>,
    })
  } else if (error.request) {
    return new RestResponse<ResponseBody>({
      statusCode: 0,
      errorMessage: 'Network Error: No response received',
    })
  } else {
    return new RestResponse<ResponseBody>({
      statusCode: 0,
      errorMessage: error.message || 'Unknown Error',
    })
  }
}
