import { z } from "zod";

// Person
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

// Error
type tError = {code: number, detail: string | Array<any> };

// Trouble Marker
const TROUBLE_MARKER_MODE_EXCEPTION = 'exception';
const TROUBLE_MARKER_MODE_STATUS_500 = 'status500';
const TROUBLE_MARKER_MODE_LATENCY = 'latency';
const TROUBLE_MARKER_MODES = [TROUBLE_MARKER_MODE_EXCEPTION,
  TROUBLE_MARKER_MODE_STATUS_500,
  TROUBLE_MARKER_MODE_LATENCY] as const;

type tTroubleMarker = {
  which: string,
  time_ms?: number,
}

const vTroubleMarker = z
.object({
  which: z.enum(TROUBLE_MARKER_MODES),
  // eslint-disable-next-line camelcase
  time_ms: z.preprocess(
    (number) => parseInt(z.string().parse(number), 10),
    z.number().positive().gt(0),
  ).optional(),
})
.refine(
  (data) => Boolean(data.which === TROUBLE_MARKER_MODE_LATENCY ? data.time_ms : true),
  "The 'time_ms' parameter is required when the parameter 'which' is equal to 'latency'",
);

export {
  tPerson,
  vPerson,
  tError,
  tTroubleMarker,
  vTroubleMarker,
  TROUBLE_MARKER_MODE_EXCEPTION,
  TROUBLE_MARKER_MODE_LATENCY,
  TROUBLE_MARKER_MODE_STATUS_500,
  TROUBLE_MARKER_MODES,
};
