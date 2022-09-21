import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';

import { createPerson } from '../../services/person';
import { tPerson, vPerson } from '../../model/contract';

export const handler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  let parameters: tPerson;

  try {
    const payload = JSON.parse(event.body ? event.body : '{}');
    parameters = vPerson.parse(payload);
  } catch (error: any) {
    if (error.name && error.name === "ZodError") {
      return {
        statusCode: 400,
        body: JSON.stringify({ code: 400, detail: error.issues }),
      };
    }
    return {
      statusCode: 422,
      body: JSON.stringify({ code: 422, detail: "Bad JSON payload" }),
    };
  }

  const res = await createPerson(parameters);

  if (res.data) {
    return {
      statusCode: 201,
      body: JSON.stringify(res.data),
    };
  }
  return {
    statusCode: res.error ? res.error.code : 500,
    body: JSON.stringify(res.error),
  };
};
