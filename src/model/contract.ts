import { z } from "zod";

type tPerson = {
  id: string,
  name: string,
  birth_date: string,
  city: string,
  phone?: string,
  picture?: string,
  coordinates?: tGeographicCoordinates,
};

type tGeographicCoordinates = {
  latitude: string,
  longitude: string
}

const vPerson: z.ZodType<tPerson> = z.lazy(() =>
  z.object({
    id: z.string().min(1).max(255),
    name: z.string().min(1),
    // eslint-disable-next-line camelcase
    birth_date: z.string().regex(/^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$/, { message: "The field 'birth_date' must be a date in format yyyy-mm-dd" }),
    city: z.string().min(1),
    phone: z.never().optional(),
    picture: z.never().optional(),
    coordinates: z.never().optional(),
  }));

type tError = {code: number, detail: string | Array<any> };

export {
  tPerson,
  vPerson,
  tError,
};
