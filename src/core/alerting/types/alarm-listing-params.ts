import type { PaginationParams } from "@/core/global/types"

export type AlarmListingParams = {
    status?: string,
    level?: string
} & PaginationParams