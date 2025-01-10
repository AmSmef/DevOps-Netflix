const AWS = require('aws-sdk');
const dynamoDB = new AWS.DynamoDB.DocumentClient();

exports.handler = async (event) => {
  // Parse the request body to extract userId and video information
  const { username, videoTitle } = JSON.parse(event.body);

  // Prepare the DynamoDB parameters
  const params = {
    TableName: 'WatchHistory',
    Item: {
      username: username,  // User who watched the video
      date: new Date().toISOString(),  // Current timestamp when the video was watched
      videoTitle: videoTitle  // Title of the video
    }
  };

  try {
    // Insert the item into the WatchHistory table
    await dynamoDB.put(params).promise();

    // Return a success response with CORS headers
    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*', // Allows requests from any origin
        'Access-Control-Allow-Headers': 'Content-Type', // Allows specific headers
        'Access-Control-Allow-Methods': 'OPTIONS,POST', // Allows specific methods
      },
      body: JSON.stringify({ message: 'Watch history added successfully' })
    };
  } catch (error) {
    // Handle any errors that occur during the DynamoDB operation
    console.error('Error adding watch history:', error);
    return {
      statusCode: 500,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Methods': 'OPTIONS,POST',
      },
      body: JSON.stringify({ error: 'Failed to add watch history' })
    };
  }
};
