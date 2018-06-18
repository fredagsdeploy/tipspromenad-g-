#!/bin/bash
IP=192.168.1.199
PORT=3001

curl -X POST \
  http://$IP:$PORT/users \
  -H 'cache-control: no-cache' \
  -H 'content-type: application/json' \
  -H 'postman-token: 795fbdad-b67f-e5fc-38bf-31dcd0720486' \
  -d '{
	"nick": "QuestionCreatorHorv",
	"id":"1337"
}'

curl -X POST \
  http://$IP:$PORT/questions \
  -H 'authorization: 1337' \
  -H 'cache-control: no-cache' \
  -H 'content-type: application/json' \
  -H 'postman-token: ed5e64c0-9962-f929-a3ab-9f4becd761a6' \
  -d '{
	"question": "Vilket tal är 3?",
	"alternatives": ["1", "2", "3"],
  "correctAlternative": 2
}'

curl -X POST \
  http://$IP:$PORT/questions \
  -H 'authorization: 1337' \
  -H 'cache-control: no-cache' \
  -H 'content-type: application/json' \
  -H 'postman-token: 20270b32-2378-6047-9e77-9def58d5e9b8' \
  -d '{
	"question": "Vilken färg har bakgrunden?",
	"alternatives": ["Vit", "Turkos", "Svart"],
  "correctAlternative": 0
}'

curl -X POST \
  http://$IP:$PORT/questions \
  -H 'authorization: 1337' \
  -H 'cache-control: no-cache' \
  -H 'content-type: application/json' \
  -H 'postman-token: f8815f52-b98e-3c69-0230-d04964709a79' \
  -d '{
	"question": "Vem är jag?",
	"alternatives": ["Horv", "Tejp", "Juice"],
  "correctAlternative": 0
}'

curl -X POST \
  http://$IP:$PORT/questions \
  -H 'authorization: 1337' \
  -H 'cache-control: no-cache' \
  -H 'content-type: application/json' \
  -H 'postman-token: 910db624-fcce-a39f-d7e0-11e4e6350712' \
  -d '{
	"question": "Vilket ljud är bäst?",
	"alternatives": ["NY FRÅÅÅÅGAAA", "*prutt*", "*plopp*"],
  "correctAlternative": 0
}'

curl -X POST \
  http://$IP:$PORT/questions \
  -H 'authorization: 1337' \
  -H 'cache-control: no-cache' \
  -H 'content-type: application/json' \
  -H 'postman-token: 7a05bea8-9642-1701-627e-d2b4c1f9ff7b' \
  -d '{
	"question": "Vilken boll är rundast?",
	"alternatives": ["Golfboll", "Fotboll", "Grodan Boll"],
  "correctAlternative": 2
}'

curl -X POST \
  http://$IP:$PORT/questions \
  -H 'authorization: 1337' \
  -H 'cache-control: no-cache' \
  -H 'content-type: application/json' \
  -H 'postman-token: c911b395-d32a-41bf-2a59-501e99051d30' \
  -d '{
	"question": "Vilket är inte en typ av request?",
	"alternatives": ["Kan jag få smöret?", "POST", "Attack!"],
  "correctAlternative": 2
}'

curl -X POST \
  http://$IP:$PORT/questions \
  -H 'authorization: 1337' \
  -H 'cache-control: no-cache' \
  -H 'content-type: application/json' \
  -H 'postman-token: d2765969-ad9c-69c0-a584-11737cfdb3e2' \
  -d '{
	"question": "Vilken ska bort?",
	"alternatives": ["101010", "42", "1337"],
  "correctAlternative": 2
}'

curl -X POST \
  http://$IP:$PORT/questions \
  -H 'authorization: 1337' \
  -H 'cache-control: no-cache' \
  -H 'content-type: application/json' \
  -H 'postman-token: 657c3133-39b8-bf64-7fb8-30df23e2cd31' \
  -d '{
	"question": "Brinner saker upp eller ned?",
	"alternatives": ["Upp", "Ned", "Det beror på"],
  "correctAlternative": 2
}'

curl -X POST \
  http://$IP:$PORT/questions \
  -H 'authorization: 1337' \
  -H 'cache-control: no-cache' \
  -H 'content-type: application/json' \
  -H 'postman-token: 3097bfa9-c6fd-22af-81b9-341ee7868d9d' \
  -d '{
	"question": "Hur gammal är Harry Potter-serien?",
	"alternatives": ["20 år", "15 år", "10 år"],
  "correctAlternative": 0
}'

curl -X POST \
  http://$IP:$PORT/questions \
  -H 'authorization: 1337' \
  -H 'cache-control: no-cache' \
  -H 'content-type: application/json' \
  -H 'postman-token: 3f3e1bc7-ac9f-5367-81a7-c09bae0aa402' \
  -d '{
	"question": "Vilket av följande är inte en tangentbordslayout?",
	"alternatives": ["Maltron", "Colemak", "QKRIY"],
  "correctAlternative": 2
}'

curl -X POST \
  http://$IP:$PORT/questions \
  -H 'authorization: 1337' \
  -H 'cache-control: no-cache' \
  -H 'content-type: application/json' \
  -H 'postman-token: 6bdf4f7f-671e-5132-3a65-18bd9ba282e8' \
  -d '{
	"question": "När kokar saliv?",
	"alternatives": ["100.16 C", "297.5 C", "149.8 C"],
  "correctAlternative": 0
}'
