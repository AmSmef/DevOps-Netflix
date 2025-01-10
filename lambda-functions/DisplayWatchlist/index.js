const AWS = require('aws-sdk');
const dynamoDb = new AWS.DynamoDB.DocumentClient();

exports.handler = async (event) => {
  try {
    const username = event.queryStringParameters?.username;

    if (!username) {
      return {
        statusCode: 400,
        headers: {
          'Access-Control-Allow-Origin': '*', // Allow all origins
          'Access-Control-Allow-Methods': 'GET, OPTIONS',
        },
        body: JSON.stringify({ error: 'Missing username query parameter' }),
      };
    }

    const params = {
      TableName: 'Watchlist',
      KeyConditionExpression: 'username = :username',
      ExpressionAttributeValues: {
        ':username': username,
      },
    };

    const result = await dynamoDb.query(params).promise();

    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*', // Allow all origins
        'Access-Control-Allow-Methods': 'GET, OPTIONS',
      },
      body: JSON.stringify(result.Items),
    };
  } catch (error) {
    console.error('Error retrieving watchlist:', error);
    return {
      statusCode: 500,
      headers: {
        'Access-Control-Allow-Origin': '*', // Allow all origins
        'Access-Control-Allow-Methods': 'GET, OPTIONS',
      },
      body: JSON.stringify({ error: 'Failed to retrieve watchlist' }),
    };
  }
};
