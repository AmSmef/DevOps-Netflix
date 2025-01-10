const AWS = require('aws-sdk');
const dynamoDB = new AWS.DynamoDB.DocumentClient();

exports.handler = async (event) => {
  const { username } = event.queryStringParameters;

  const params = {
    TableName: 'WatchHistory',
    KeyConditionExpression: 'username = :username',
    ExpressionAttributeValues: {
      ':username': username
    }
  };

  try {
    // Query the DynamoDB table to get the user's watch history
    const result = await dynamoDB.query(params).promise();

    // Return the data in the response
    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Methods': 'OPTIONS,GET',
      },
      body: JSON.stringify({ history: result.Items }),
    };
  } catch (error) {
    console.error('Error fetching watch history:', error);
    return {
      statusCode: 500,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Methods': 'OPTIONS,GET',
      },
      body: JSON.stringify({ error: 'Failed to fetch watch history' }),
    };
  }
};
