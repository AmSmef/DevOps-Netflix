const AWS = require('aws-sdk');
const dynamoDb = new AWS.DynamoDB.DocumentClient();

exports.handler = async (event) => {
  try {
    const { username, videoTitle } = JSON.parse(event.body);

    if (!username || !videoTitle) {
      return {
        statusCode: 400,
        headers: {
          'Access-Control-Allow-Origin': '*', // Allow all origins
          'Access-Control-Allow-Methods': 'POST, OPTIONS',
        },
        body: JSON.stringify({ error: 'Missing required fields' }),
      };
    }

    const params = {
      TableName: 'Watchlist',
      Item: { username, videoTitle },
    };

    await dynamoDb.put(params).promise();

    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*', // Allow all origins
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
      },
      body: JSON.stringify({ message: 'Video added to watchlist' }),
    };
  } catch (error) {
    console.error('Error adding to watchlist:', error);
    return {
      statusCode: 500,
      headers: {
        'Access-Control-Allow-Origin': '*', // Allow all origins
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
      },
      body: JSON.stringify({ error: 'Failed to add to watchlist' }),
    };
  }
};
