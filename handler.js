const AWS = require("aws-sdk");

const TABLE_NAME = process.env.DOGS_TABLE;
const docClient = new AWS.DynamoDB.DocumentClient();

module.exports.hi = async (event, _ctx, cb) => {

  if (event.queryStringParameters) {
    const params = {
      TableName: [TABLE_NAME],
      Key: {
        name: event.queryStringParameters.name
      }
    };
    const dog = await docClient.get(params).promise();
  
    cb(null, sendRes(200, { dog }));
  }

  const dogs  = await docClient.scan({TableName: [TABLE_NAME]}).promise();
  cb(null, sendRes(200, {dogs: dogs.Items}));
 
};

const sendRes = (status, body) => {
  return {
    statusCode: status,
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*"
    },
    body: JSON.stringify(body)
  };
};
