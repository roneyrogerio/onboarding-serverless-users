import { APIGatewayProxyResult, APIGatewayProxyEvent } from 'aws-lambda';

import { tTroubleMarker, vTroubleMarker, TROUBLE_MARKER_MODE_LATENCY, TROUBLE_MARKER_MODE_STATUS_500 } from '../../model/contract';

const handler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  let parameters: tTroubleMarker = <tTroubleMarker>{};

  try {
    parameters = vTroubleMarker.parse({ ...event.queryStringParameters });
  } catch (error: any) {
    return {
      statusCode: 422,
      body: JSON.stringify({ code: 422, detail: error.issues }),
    };
  }

  if (parameters.which === TROUBLE_MARKER_MODE_STATUS_500) {
    return {
      statusCode: 500,
      body: JSON.stringify({ code: 500, detail: "Internal error" }),
    };
  } else if (parameters.which === TROUBLE_MARKER_MODE_LATENCY) {
    const sleep = async (ms: number): Promise<any> => new Promise((resolve) => setTimeout(resolve, ms));
    await sleep(Number(parameters.time_ms));
    return {
      statusCode: 200,
      body: JSON.stringify({ code: 200, detail: `It took ${parameters.time_ms} millisecond(s)` }),
    };
  }

  throw new Error('Failed with success');
};

export = { handler }
