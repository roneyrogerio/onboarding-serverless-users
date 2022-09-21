import AWS from 'aws-sdk';

import { tPerson, tError } from '../model/contract';

import { getRandomData } from './randamData';

async function getPersonList(): Promise<{data: Array<tPerson> | null, error: tError | null}> {
  const dynamoDb = new AWS.DynamoDB.DocumentClient();
  const params = { TableName: process.env.DYNAMODB_PERSON_TABLE ? process.env.DYNAMODB_PERSON_TABLE : '' };

  try {
    const items = await dynamoDb.scan(params).promise();
    return { data: <Array<tPerson>>items.Items, error: null };
  } catch (error: any) {
    console.error("Error while creating new person. Params:", params, " Details:", error);
    return { data: null, error: { code: 500, detail: 'Internal error while getting persons list' }};
  }
}

async function getPersonById(id: string): Promise<{data: tPerson | null, error: tError | null}> {
  const dynamoDb = new AWS.DynamoDB.DocumentClient();
  const params = {
    TableName: process.env.DYNAMODB_PERSON_TABLE ? process.env.DYNAMODB_PERSON_TABLE : '',
    Key: { id },
  };

  try {
    const item = await dynamoDb.get(params).promise();
    if (item.Item) {
      return { data: <tPerson>item.Item, error: null };
    }
    return { data: null, error: { code: 404, detail: 'Not Found' }};
  } catch (error: any) {
    console.error("Error while creating new person. Params:", params, " Details:", error);
    return { data: null, error: { code: 500, detail: 'Internal error while getting person' }};
  }
}

async function createPerson(person: tPerson): Promise<{data: tPerson | null, error: tError | null}> {
  const randomData = await getRandomData();
  if (randomData.error) {
    return { data: null, error: { code: randomData.error.code, detail: randomData.error.detail }};
  }
  person.picture = randomData.data?.results[0].picture.thumbnail;
  person.phone = randomData.data?.results[0].phone;
  person.coordinates = randomData.data?.results[0].location.coordinates;

  const dynamoDb = new AWS.DynamoDB.DocumentClient();
  const putParams = {
    TableName: process.env.DYNAMODB_PERSON_TABLE ? process.env.DYNAMODB_PERSON_TABLE : '',
    ConditionExpression: "attribute_not_exists(id)",
    Item: person,
  };

  try {
    await dynamoDb.put(putParams).promise();
    return { data: person, error: null };
  } catch (error: any) {
    if (error.code === "ConditionalCheckFailedException") {
      return { data: null, error: { code: 409, detail: "The person with this 'id' already exist" }};
    }
    console.error("Error while creating new person. Params:", putParams, " Details:", error);
    return { data: null, error: { code: 500, detail: 'Internal error while creating new person' }};
  }
}

export {
  getPersonList,
  getPersonById,
  createPerson,
};
