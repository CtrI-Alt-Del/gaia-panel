import { redirect } from 'react-router'
import { parseWithZod } from '@conform-to/zod/v4'
import { z } from 'zod'

import type { RouteArgs } from '@/app/types/route-args'
import type { Call } from '@/core/global/interfaces'

export const RemixCall = <Request>(
  args: RouteArgs,
  schema?: z.ZodSchema,
): Call<Request> => {
  const { request } = args

  return {
    async getFormData(): Promise<Request> {
      if (!schema) throw new Error('Schema is required')

      const formData = await request.formData()
      const submission = parseWithZod(formData, { schema, disableAutoCoercion: false })

      if (submission.status === 'error') {
        console.error(submission.error)
        throw new Error('Invalid form data')
      }

      const result = z.safeParse(schema, submission.payload)
      return result.data as Request
    },

    async redirect(route: string) {
      return redirect(route)
    },
  }
}
