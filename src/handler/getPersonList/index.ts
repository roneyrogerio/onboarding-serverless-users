import { APIGatewayProxyResult } from 'aws-lambda';

import { getPersonList } from '../../services/person';

export const handler = async (): Promise<APIGatewayProxyResult> => {
  const res = await getPersonList();

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
