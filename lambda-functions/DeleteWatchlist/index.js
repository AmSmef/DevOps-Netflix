const AWS = require('aws-sdk');
const dynamoDb = new AWS.DynamoDB.DocumentClient();

exports.handler = async (event) => {
  try {
    const { username, videoTitle } = JSON.parse(event.body);

    // Validate input
    if (!username || !videoTitle) {
      return {
        statusCode: 400,
        headers: {
          'Access-Control-Allow-Origin': '*', // Allow all origins
          'Access-Control-Allow-Methods': 'DELETE, OPTIONS',
        },
        body: JSON.stringify({ error: 'Missing required fields' }),
      };
    }

    const params = {
      TableName: 'Watchlist',
      Key: {
        username,
        videoTitle,
      },
    };

    // Delete the item from DynamoDB
    await dynamoDb.delete(params).promise();

    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*', // Allow all origins
        'Access-Control-Allow-Methods': 'DELETE, OPTIONS',
      },
      body: JSON.stringify({ message: 'Video removed from watchlist' }),
    };
  } catch (error) {
    console.error('Error deleting from watchlist:', error);
    return {
      statusCode: 500,
      headers: {
        'Access-Control-Allow-Origin': '*', // Allow all origins
        'Access-Control-Allow-Methods': 'DELETE, OPTIONS',
      },
      body: JSON.stringify({ error: 'Failed to delete from watchlist' }),
    };
  }
};
