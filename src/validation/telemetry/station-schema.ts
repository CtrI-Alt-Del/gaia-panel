import { z } from "zod";

export const stationSchema = z.object({
  name: z.string().min(1, "Nome é obrigatório"),
  uid: z.string().min(1, "UID é obrigatório"),
  latitude: z.number().min(-90).max(90, "Latitude deve estar entre -90 e 90"),
  longitude: z
    .number()
    .min(-180)
    .max(180, "Longitude deve estar entre -180 e 180"),
});
