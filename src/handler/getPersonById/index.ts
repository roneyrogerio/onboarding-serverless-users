import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';

import { getPersonById } from '../../services/person';

const handler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  const id = String(event.pathParameters?.id);
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

export = { handler }
