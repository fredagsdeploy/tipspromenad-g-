const AWS = require("aws-sdk");

const TipspromenadTableName = "Tipspromenad-GO";

var credentials = new AWS.SharedIniFileCredentials({ profile: "tipspromenad" }); // loads credentials located in ~/.aws/credentials under [tipspromenad]
AWS.config.credentials = credentials;

AWS.config.update({
  region: "eu-west-2",
  endpoint: "https://dynamodb.eu-west-2.amazonaws.com"
});

var dynamodb = new AWS.DynamoDB();

var params = {
  TableName: TipspromenadTableName,
  KeySchema: [
    { AttributeName: "tipspromenadId", KeyType: "HASH" } //Partition key
  ],
  AttributeDefinitions: [
    { AttributeName: "tipspromenadId", AttributeType: "S" }
  ],
  ProvisionedThroughput: {
    ReadCapacityUnits: 5,
    WriteCapacityUnits: 5
  }
};

function createTable() {
  dynamodb.createTable(params, function(err, data) {
    if (err) {
      console.error(
        "Unable to create table. Error JSON:",
        JSON.stringify(err, null, 2)
      );
    } else {
      console.log(
        "Created table. Table description JSON:",
        JSON.stringify(data, null, 2)
      );
    }
  });
}

var docClient = new AWS.DynamoDB.DocumentClient();

function pushTipspromenadSession() {
  var params = {
    TableName: TipspromenadTableName,
    Item: {
      tipspromenadId: "testpromenad",
      questions: [
        {
          "0179c97a-e8b2-4ef3-be89-01f8ac8be851": {
            question: "Vem blir årets jordgubbsodlare?",
            alternatives: ["1", "x", "2"],
            correctAlternative: 1,
            id: "0179c97a-e8b2-4ef3-be89-01f8ac8be851",
            author: "Tejp"
          }
        }
      ],
      users: {
        "77994686-4b8b-4a57-b917-1a47dad9a8c4": {
          nick: "Tejp",
          id: "77994686-4b8b-4a57-b917-1a47dad9a8c4"
        }
      },
      answers: {}
    }
  };
  docClient.put(params, (err, data) => {
    if (err) {
        console.error("Unable to tipspromenadsession", ". Error JSON:", JSON.stringify(err, null, 2));
    } else {
        console.log("PutItem succeeded:");
    }
  });
}

pushTipspromenadSession()
