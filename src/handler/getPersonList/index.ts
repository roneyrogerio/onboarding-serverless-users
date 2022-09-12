import { APIGatewayProxyResult } from 'aws-lambda';

import { getPersonList } from '../../pseudoDB/index';

export const handler = async (): Promise<APIGatewayProxyResult> => {
  return {
    statusCode: 200,
    body: JSON.stringify(getPersonList()),
  };
};
