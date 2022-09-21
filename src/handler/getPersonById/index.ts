import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';

import { getPersonById } from '../../services/person';

export const handler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  const id = event.pathParameters && event.pathParameters.id ? event.pathParameters.id : '0';
  const res = await getPersonById(id);

  if (res.data) {
    return {
      statusCode: 200,
      body: JSON.stringify(res.data),
    };
  }
  return {
    statusCode: res.error ? res.error.code : 500,
    body: JSON.stringify(res.error),
  };
};
