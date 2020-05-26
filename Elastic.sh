Elastic all comma sseparated values should match
GET:
curl --location --request GET 'http://localhost:9200/master/test/_search' \
--header 'Content-Type: application/json' \
--data-raw '{
    "from": 0,
    "size": 10,
    "query": {
        "match": {
            "supported": {
                "operator": "AND",
                "query": "test,test1,test7,test4,test2",
                "analyzer": "comma"
            }
        }
    }
}'
