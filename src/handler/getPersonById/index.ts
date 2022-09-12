import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';

import { getPersonById } from '../../pseudoDB/index';

export const handler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  if (event.pathParameters && event.pathParameters.id && isNaN(Number(event.pathParameters.id))) {
    return {
      statusCode: 400,
      body: JSON.stringify({ code: 400, error: "The 'id' parameter must be a number." }),
    };
  }

  const id = event.pathParameters && event.pathParameters.id ? parseInt(event.pathParameters.id, 10) : 0;
  const person = getPersonById(id);

  if (person) {
    return {
      statusCode: 200,
      body: JSON.stringify(person),
    };
  }

  return {
    statusCode: 404,
    body: JSON.stringify({ code: 404, error: "Not Found." }),
  };
};
