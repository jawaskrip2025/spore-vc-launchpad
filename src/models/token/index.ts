import { z } from "zod";
import { formTokenSchema } from "./schema";

export type TFormToken = z.infer<typeof formTokenSchema>