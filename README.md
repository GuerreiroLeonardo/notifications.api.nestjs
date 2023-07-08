in order to run dynamo db local change this fucking url to https
/Users/leonardo/Documents/kihbot/notifications.api.nestjs/node_modules/dynamodb-localhost/dynamodb/config.json

then
sls dynamodb install

One reason you might encounter this behaviour is using non-maintained packages, which still use the older behaviour internally. This is discussed in https://github.com/99x/serverless-dynamodb-local/pull/298

To fix this, upgrade the packages to maintained forks (disclaimer: I am a contributor to these forks), for example:

dynamodb-localhost -> aws-dynamodb-local
serverless-dynamodb-local -> serverless-dynamodb
