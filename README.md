# classification-api

This api classifies contents in context of rural event categories, the relevant scope and tags. 



## API Tests

Install karate locally:
```
wget https://github.com/karatelabs/karate/releases/download/v1.4.0/karate-1.4.0.jar
mv karate-1.4.0.jar karate.jar
```

Run tests locally:
```
java -jar karate.jar -f "junit:xml,~html" -o "target/" api-tests/features/
```

Run tests for non-local environments needs to be configured with the following environment variables:
```
java -jar -Dtoken="***" karate.jar -f "junit:xml,~html" -o "target/" api-tests/features/
```
