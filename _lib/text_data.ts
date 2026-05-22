
export const ADD_LEAD_CURL = `curl  -X POST \
  'https://rqeejaczw2.execute-api.us-east-1.amazonaws.com/HaulingDeskGoAPIX' \
  --header 'Accept: */*' \
  --header 'User-Agent: Thunder Client (https://www.thunderclient.com)' \
  --header 'Content-Type: application/json' \
  --data-raw '{
    "resource": "leads/add-new",
    "api_access_key": "[YOUR_API_ACCESS_KEY_HERE]", 
    "fullname": "John Doe",
    "email": "johndoe@gmail.com",
    "move_date": "10/02/2023",
    "phone": "736000001",
    "pickup_location": "Bellefontaine, OH, 43311",
    "dropoff_location": "New York, NY, 10001",
    "transport_type": "Open",
    "vehicles": [
        {
            "year": "2021",
            "make": "Honda",
            "model": "Civic",
            "quantity": "2",
            "type": "Car",
            "running": "Yes",
            "ship_via": "Open"
        }
    ],
    "lead_medium": "API-Source"
}'`

export const ADD_LEAD_PHP = `<?php
$curl = curl_init();
curl_setopt_array($curl, [
  CURLOPT_URL => "https://rqeejaczw2.execute-api.us-east-1.amazonaws.com/HaulingDeskGoAPIX",
  CURLOPT_RETURNTRANSFER => true,
  CURLOPT_ENCODING => "",
  CURLOPT_MAXREDIRS => 10,
  CURLOPT_TIMEOUT => 30,
  CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
  CURLOPT_CUSTOMREQUEST => "POST",
  CURLOPT_POSTFIELDS => "{\"resource\": \"leads/add-new\",\"api_access_key\": \"[YOUR_API_ACCESS_KEY_HERE]\", \"fullname\": \"John Doe\",\"email\": \"johndoe@gmail.com\",\"move_date\": \"10/02/2023\",\"phone\": \"736000001\",\"pickup_location\": \"Bellefontaine, OH, 43311\",\"dropoff_location\": \"New York, NY, 10001\",\"transport_type\": \"Open\",\"vehicles\": [{\"year\": \"2021\",\"make\": \"Honda\",\"model\": \"Civic\",\"quantity\": \"2\",\"type\": \"Car\",\"running\": \"Yes\",\"ship_via\": \"Open\"}],\"lead_medium\": \"API-Source\"}",
  CURLOPT_HTTPHEADER => [
    "Accept: */*",
    "Content-Type: application/json",
    "User-Agent: Thunder Client (https://www.thunderclient.com)"
  ],
]);

$response = curl_exec($curl);
$err = curl_error($curl);

curl_close($curl);

if ($err) {
  echo "cURL Error #:" . $err;
} else {
  echo $response;
}
`

export const ADD_LEAD_NODEJS = `var axios = require("axios").default;
var options = {
method: 'POST',
url: 'https://rqeejaczw2.execute-api.us-east-1.amazonaws.com/HaulingDeskGoAPIX',
headers: {
    Accept: '*/*',
    'User-Agent': 'Thunder Client (https://www.thunderclient.com)',
    'Content-Type': 'application/json'
},
data: {
    resource: 'leads/add-new',
    api_access_key: '[YOUR_API_ACCESS_KEY_HERE]',
    fullname: 'John Doe',
    email: 'johndoe@gmail.com',
    move_date: '10/02/2023',
    phone: '736000001',
    pickup_location: 'Bellefontaine, OH, 43311',
    dropoff_location: 'New York, NY, 10001',
    transport_type: 'Open',
    vehicles: [
    {
        year: '2021',
        make: 'Honda',
        model: 'Civic',
        quantity: '2',
        type: 'Car',
        running: 'Yes',
        ship_via: 'Open'
    }
    ],
    lead_medium: 'API-Source'
}
};

axios.request(options).then(function (response) {
console.log(response.data);
}).catch(function (error) {
console.error(error);
});`

export const ADD_LEAD_GO = `package main

import (
	"fmt"
	"strings"
	"net/http"
	"io/ioutil"
)

func main() {

	url := "https://rqeejaczw2.execute-api.us-east-1.amazonaws.com/HaulingDeskGoAPIX"

	payload := strings.NewReader("{\"resource\": \"leads/add-new\",\"api_access_key\": \"[YOUR_API_KEY_HERE]\", \"fullname\": \"John Doe\",\"email\": \"johndoe@gmail.com\",\"move_date\": \"10/02/2023\",\"phone\": \"736000001\",\"pickup_location\": \"Bellefontaine, OH, 43311\",\"dropoff_location\": \"New York, NY, 10001\",\"transport_type\": \"Open\",\"vehicles\": [{\"year\": \"2021\",\"make\": \"Honda\",\"model\": \"Civic\",\"quantity\": \"2\",\"type\": \"Car\",\"running\": \"Yes\",\"ship_via\": \"Open\"}],\"lead_medium\": \"API-Source\"}")

	req, _ := http.NewRequest("POST", url, payload)

	req.Header.Add("Accept", "*/*")
	req.Header.Add("Content-Type", "application/json")

	res, _ := http.DefaultClient.Do(req)

	defer res.Body.Close()
	body, _ := ioutil.ReadAll(res.Body)

	fmt.Println(res)
	fmt.Println(string(body))

}`

export const ADD_LEAD_VEHICLE_LIST = `[
    {
        year: '2021',
        make: 'Honda',
        model: 'Civic',
        quantity: '2',
        type: 'Car',
        running: 'Yes',
    },
    {
        year: '2015',
        make: 'Toyota',
        model: 'Camry',
        quantity: '1',
        type: 'Suv',
        running: 'No',
    }
]`

export const ADD_LEAD_RESPONSE = `{
    "statusCode": "201",
    "success": true,
    "message": "Success.",
    "data": {
        "auto_quoted": true,
        "auto_quote_price": 150,
        "quote_details_url": "https://shippers.hauling-desk.com/q/1WFD1Y5-7q1m/xi389SJZ67Ju8",
        "book_order_url": "https://shippers.hauling-desk.com/bo/1WFD1Y5-7q1m/xi389SJZ67Ju8",
        "email_sent": "No"
        "return_url": "https://haulingdesk.com/auto-form/thank-you.php?k=PRODUCTION-1-jJaj98OUUeuu&r=xi389SJZ67Ju8&v=1696185763"
    }
}`


export const GET_QUOTE_DETAILS_CURL = `curl  -X POST \
  'https://rqeejaczw2.execute-api.us-east-1.amazonaws.com/HaulingDeskGoAPIXXX' \
  --header 'Accept: */*' \
  --header 'Content-Type: application/json' \
  --data-raw '{
"resource":"quotes/get-quote-info",
"api_key":[YOUR_API_KEY_HERE],
"quote_token":[QUOTE_TOKEN_HERE],
"account_id":[YOUR_ACCOUNT_ID_HERE],
"fields":["quote_id","quote_uniq_id","dates","car_run","ship_via","shipper","origin","destination","vehicles","payments","type","quote_token"]
}'`

export const GET_QUOTE_DETAILS_PHP = `<?php
$curl = curl_init();

curl_setopt_array($curl, [
  CURLOPT_URL => "https://rqeejaczw2.execute-api.us-east-1.amazonaws.com/HaulingDeskGoAPIXXX",
  CURLOPT_RETURNTRANSFER => true,
  CURLOPT_ENCODING => "",
  CURLOPT_MAXREDIRS => 10,
  CURLOPT_TIMEOUT => 30,
  CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
  CURLOPT_CUSTOMREQUEST => "POST",
  CURLOPT_POSTFIELDS => "{\"resource\":\"quotes/get-quote-info\",\"api_key\":[YOUR_API_KEY_HERE],\"quote_token\":[QUOTE_TOKEN_HERE],\"account_id\":[YOUR_ACCOUNT_ID_HERE],\"fields\":[\"quote_id\",\"quote_uniq_id\",\"dates\",\"car_run\",\"ship_via\",\"shipper\",\"origin\",\"destination\",\"vehicles\",\"payments\",\"type\",\"quote_token\"]}",
  CURLOPT_HTTPHEADER => [
    "Accept: */*",
    "Content-Type: application/json"
  ],
]);

$response = curl_exec($curl);
$err = curl_error($curl);

curl_close($curl);

if ($err) {
  echo "cURL Error #:" . $err;
} else {
  echo $response;
}`

export const GET_QUOTE_DETAILS_NODEJS = `var axios = require("axios").default;
var options = {
  method: 'POST',
  url: 'https://rqeejaczw2.execute-api.us-east-1.amazonaws.com/HaulingDeskGoAPIXXX',
  headers: {
    Accept: '*/*', 
    'Content-Type': 'application/json'
  },
  data: '{"resource":"quotes/get-quote-info","api_key":[YOUR_API_KEY_HERE],"quote_token":[QUOTE_TOKEN_HERE],"account_id":[YOUR_ACCOUNT_ID_HERE],"fields":["quote_id","quote_uniq_id","dates","car_run","ship_via","shipper","origin","destination","vehicles","payments","type","quote_token"]}'
};

axios.request(options).then(function (response) {
  console.log(response.data);
}).catch(function (error) {
  console.error(error);
});`

export const GET_QUOTE_DETAILS_GO = `package main

import (
	"fmt"
	"strings"
	"net/http"
	"io/ioutil"
)

func main() {

	url := "https://rqeejaczw2.execute-api.us-east-1.amazonaws.com/HaulingDeskGoAPIXXX"

	payload := strings.NewReader("{\"resource\":\"quotes/get-quote-info\",\"api_key\":[YOUR_API_KEY_HERE],\"quote_token\":[QUOTE_TOKEN_HERE],\"account_id\":[YOUR_ACCOUNT_ID_HERE],\"fields\":[\"quote_id\",\"quote_uniq_id\",\"dates\",\"car_run\",\"ship_via\",\"shipper\",\"origin\",\"destination\",\"vehicles\",\"payments\",\"type\",\"quote_token\"]}")

	req, _ := http.NewRequest("POST", url, payload)

	req.Header.Add("Accept", "*/*")
	req.Header.Add("Content-Type", "application/json")

	res, _ := http.DefaultClient.Do(req)

	defer res.Body.Close()
	body, _ := ioutil.ReadAll(res.Body)

	fmt.Println(res)
	fmt.Println(string(body))

}`

export const GET_QUOTE_DETAILS_RESPONSE = `{
    "statusCode": "200",
    "success": true,
    "message": "Success.",
    "data": {
        "returned_info": {
            "quote_id": 1059,
            "quote_uniq_id": "201059",
            "dates": {
                "quoted": "2023-09-30 02:59:08",
                "received": "2023-09-30 02:59:08",
                "last_bomb": "",
                "last_updated": "2023-09-30 02:59:08",
                "quote_expired": "2023-10-25",
                "next_followup_date": "2023-10-02",
                "first_available_date": "10\/04\/2023",
                "last_updated_timestamp": 1696057148
            },
            "car_run": "Yes",
            "ship_via": "Open",
            "shipper": {
                "zip": "",
                "city": "",
                "fullname": "John Adeagbo",
                "email": "johndoe01@gmail.com",
                "notes": "",
                "state": "",
                "address": "",
                "company": "",
                "country": "United States",
                "phone_1": "(786) 305-6123",
                "phone_2": "(489) 498-7983",
                "shipper_id": "",
                "company_phone": ""
            },
            "origin": {
                "zip": "33101",
                "city": "Miami",
                "state": "FL",
                "location": "New Location",
                "address_1": "",
                "full_origin": "Miami, FL, 33101"
            },
            "destination": {
                "zip": "10001",
                "city": "New York",
                "state": "NY",
                "location": "New Location",
                "address_1": "",
                "full_destination": "New York, NY, 10001"
            },
            "vehicles": [
                {
                    "make": "Honda",
                    "type": "Car",
                    "year": 2021,
                    "model": "Civic",
                    "quantity": "2",
                    "running": "Yes",
                    "ship_via": "Open",
                    "vehicle_id": 0,
                    "full_vehicle": "2021 Honda Civic"
                },
                {
                    "make": "Subaru",
                    "type": "Car",
                    "year": 2021,
                    "model": "Baja",
                    "quantity": "1",
                    "running": "Yes",
                    "ship_via": "Open",
                    "vehicle_id": 1,
                    "full_vehicle": "2021 Subaru Baja"
                }
            ],
            "payments": {
                "status": "Unpaid",
                "options": "Brokers Fee Or Full Tariff",
                "autoquoted": "Yes",
                "request_for": "Signature And Payment",
                "total_tariff": "450",
                "tariff_markup": "2.52",
                "total_brokers_fee": ""
            },
            "type": "Active",
            "quote_token": "zf774k5BzQzs"
        }
    }
}`

export const UPDATE_QUOTE_CONTACT_INFO_CURL = `curl  -X POST \
  'https://rqeejaczw2.execute-api.us-east-1.amazonaws.com/HaulingDeskGoAPIXXX' \
  --header 'Accept: */*' \
  --header 'Content-Type: application/json' \
  --data-raw '{
"resource":"quotes/update-contact-info",
"api_key":[YOUR_API_KEY_HERE],
"account_id":[YOUR_ACCOUNT_ID_HERE],
"quote_token":[QUOTE_TOKEN],
"email":"johndoe@gmail.com",
"firstname":"John",
"lastname":"Doe",
"phone_1":"(111) 222-3333",
"phone_2":"",
"company_name":"John doe inc.",
"company_phone":"",
"shipper_note":"Need shipping asap"
}'`

export const UPDATE_QUOTE_CONTACT_INFO_PHP = `<?php

$curl = curl_init();

curl_setopt_array($curl, [
    CURLOPT_URL => "https://rqeejaczw2.execute-api.us-east-1.amazonaws.com/HaulingDeskGoAPIXXX",
    CURLOPT_RETURNTRANSFER => true,
    CURLOPT_ENCODING => "",
    CURLOPT_MAXREDIRS => 10,
    CURLOPT_TIMEOUT => 30,
    CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
    CURLOPT_CUSTOMREQUEST => "POST",
    CURLOPT_POSTFIELDS => "{\"resource\":\"quotes/update-contact-info\",\"api_key\":[YOUR_API_KEY_HERE],\"account_id\":[YOUR_ACCOUNT_ID_HERE],\"quote_token\":[QUOTE_TOKEN],\"email\":\"johndoe@gmail.com\",\"firstname\":\"John\",\"lastname\":\"Doe\",\"phone_1\":\"(111) 222-3333\",\"phone_2\":\"\",\"company_name\":\"John doe inc.\",\"company_phone\":\"\",\"shipper_note\":\"Need shipping asap\"}",
    CURLOPT_HTTPHEADER => [
        "Accept: */*",
        "Content-Type: application/json"
    ],
]);

$response = curl_exec($curl);
$err = curl_error($curl);

curl_close($curl);

if ($err) {
    echo "cURL Error #:" . $err;
} else {
    echo $response;
}`

export const UPDATE_QUOTE_CONTACT_INFO_NODEJS = `var axios = require("axios").default;

var options = {
    method: 'POST',
    url: 'https://rqeejaczw2.execute-api.us-east-1.amazonaws.com/HaulingDeskGoAPIXXX',
    headers: {Accept: '*/*', 'Content-Type': 'application/json'},
    data: '{"resource":"quotes/update-contact-info","api_key":[YOUR_API_KEY_HERE],"account_id":[YOUR_ACCOUNT_ID_HERE],"quote_token":[QUOTE_TOKEN],"email":"johndoe@gmail.com","firstname":"John","lastname":"Doe","phone_1":"(111) 222-3333","phone_2":"","company_name":"John doe inc.","company_phone":"","shipper_note":"Need shipping asap"}'
};

axios.request(options).then(function (response) {
    console.log(response.data);
}).catch(function (error) {
    console.error(error);
});`

export const UPDATE_QUOTE_CONTACT_INFO_GO = `package main

import (
	"fmt"
	"strings"
	"net/http"
	"io/ioutil"
)

func main() {

	url := "https://rqeejaczw2.execute-api.us-east-1.amazonaws.com/HaulingDeskGoAPIXXX"

	payload := strings.NewReader("{\"resource\":\"quotes/update-contact-info\",\"api_key\":[YOUR_API_KEY_HERE],\"account_id\":[YOUR_ACCOUNT_ID_HERE],\"quote_token\":[QUOTE_TOKEN],\"email\":\"johndoe@gmail.com\",\"firstname\":\"John\",\"lastname\":\"Doe\",\"phone_1\":\"(111) 222-3333\",\"phone_2\":\"\",\"company_name\":\"John doe inc.\",\"company_phone\":\"\",\"shipper_note\":\"Need shipping asap\"}")

	req, _ := http.NewRequest("POST", url, payload)

	req.Header.Add("Accept", "*/*")
	req.Header.Add("Content-Type", "application/json")

	res, _ := http.DefaultClient.Do(req)

	defer res.Body.Close()
	body, _ := ioutil.ReadAll(res.Body)

	fmt.Println(res)
	fmt.Println(string(body))

}`

export const UPDATE_QUOTE_CONTACT_INFO_RESPONSE = `{
    "statusCode": "200",
    "success": true,
    "message": "Success.",
    "data": "Contact info successfully updated."
}`

export const UPDATE_QUOTE_TRANSIT_INFO_CURL = `curl  -X POST \
  'https://rqeejaczw2.execute-api.us-east-1.amazonaws.com/HaulingDeskGoAPIXXX' \
  --header 'Accept: */*' \
  --header 'Content-Type: application/json' \
  --data-raw '{
"resource":"quotes/update-transit-info",
"api_key":[YOUR_API_KEY_HERE],
"account_id":[YOUR_ACCOUNT_ID_HERE],
"quote_token":[QUOTE_TOKEN],
"move_on":"10-26-2023",
"pickup_location":"Miami, FL, 33101",
"dropoff_location":"New York, NY, 10001",
"trailer_type":"Enclosed",
"vehicles": [
  {
      "year": "2021",
      "make": "Honda",
      "model": "Civic",
      "quantity": "2",
      "type": "Car",
      "running": "Yes",
      "color": "Red"
  },
  {
      "year": "2017",
      "make": "Toyota",
      "model": "Corola",
      "quantity": "1",
      "type": "Car",
      "running": "No",
      "color": "Blue"
  }
],
"vehicle_runs":"Yes"
}'`

export const UPDATE_QUOTE_TRANSIT_INFO_PHP = `<?php

$curl = curl_init();

curl_setopt_array($curl, [
  CURLOPT_URL => "https://rqeejaczw2.execute-api.us-east-1.amazonaws.com/HaulingDeskGoAPIXXX",
  CURLOPT_RETURNTRANSFER => true,
  CURLOPT_ENCODING => "",
  CURLOPT_MAXREDIRS => 10,
  CURLOPT_TIMEOUT => 30,
  CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
  CURLOPT_CUSTOMREQUEST => "POST",
  CURLOPT_POSTFIELDS => "{\"resource\":\"quotes/update-transit-info\",\"api_key\":[YOUR_API_KEY_HERE],\"account_id\":[YOUR_ACCOUNT_ID_HERE],\"quote_token\":[QUOTE_TOKEN],\"move_on\":\"10-26-2023\",\"pickup_location\":\"Miami, FL, 33101\",\"dropoff_location\":\"New York, NY, 10001\",\"trailer_type\":\"Enclosed\",\"vehicles\": [  {      \"year\": \"2021\",      \"make\": \"Honda\",      \"model\": \"Civic\",      \"quantity\": \"2\",      \"type\": \"Car\",      \"running\": \"Yes\",      \"color\": \"Red\"  },  {      \"year\": \"2017\",      \"make\": \"Toyota\",      \"model\": \"Corola\",       \"quantity\": \"1\",     \"type\": \"Car\",      \"running\": \"No\",      \"color\": \"Blue\"  }],\"vehicle_runs\":\"Yes\"}",
  CURLOPT_HTTPHEADER => [
    "Accept: */*",
    "Content-Type: application/json"
  ],
]);

$response = curl_exec($curl);
$err = curl_error($curl);

curl_close($curl);

if ($err) {
  echo "cURL Error #:" . $err;
} else {
  echo $response;
}`

export const UPDATE_QUOTE_TRANSIT_INFO_NODEJS = `var axios = require("axios").default;

var options = {
  method: 'POST',
  url: 'https://rqeejaczw2.execute-api.us-east-1.amazonaws.com/HaulingDeskGoAPIXXX',
  headers: {Accept: '*/*', 'Content-Type': 'application/json'},
  data: '{"resource":"quotes/update-transit-info","api_key":[YOUR_API_KEY_HERE],"account_id":[YOUR_ACCOUNT_ID_HERE],"quote_token":[QUOTE_TOKEN],"move_on":"10-26-2023","pickup_location":"Miami, FL, 33101","dropoff_location":"New York, NY, 10001","trailer_type":"Enclosed","vehicles": [  {      "year": "2021",      "make": "Honda",      "model": "Civic",      "quantity": "2",      "type": "Car",      "running": "Yes",      "color": "Red"  },  {      "year": "2017",      "make": "Toyota",      "model": "Corola",      "quantity": "1",      "type": "Car",      "running": "No",      "color": "Blue"  }],"vehicle_runs":"Yes"}'
};

axios.request(options).then(function (response) {
  console.log(response.data);
}).catch(function (error) {
  console.error(error);
});`

export const UPDATE_QUOTE_TRANSIT_INFO_GO = `package main

import (
	"fmt"
	"strings"
	"net/http"
	"io/ioutil"
)

func main() {

	url := "https://rqeejaczw2.execute-api.us-east-1.amazonaws.com/HaulingDeskGoAPIXXX"

	payload := strings.NewReader("{\"resource\":\"quotes/update-transit-info\",\"api_key\":[YOUR_API_KEY_HERE],\"account_id\":[YOUR_ACCOUNT_ID_HERE],\"quote_token\":[QUOTE_TOKEN],\"move_on\":\"10-26-2023\",\"pickup_location\":\"Miami, FL, 33101\",\"dropoff_location\":\"New York, NY, 10001\",\"trailer_type\":\"Enclosed\",\"vehicles\": [  {      \"year\": \"2021\",      \"make\": \"Honda\",      \"model\": \"Civic\",      \"quantity\": \"2\",      \"type\": \"Car\",      \"running\": \"Yes\",      \"color\": \"Red\"  },  {      \"year\": \"2017\",      \"make\": \"Toyota\",      \"model\": \"Corola\",      \"quantity\": \"1\",      \"type\": \"Car\",      \"running\": \"No\",      \"color\": \"Blue\"  }],\"vehicle_runs\":\"Yes\"}")

	req, _ := http.NewRequest("POST", url, payload)

	req.Header.Add("Accept", "*/*")
	req.Header.Add("Content-Type", "application/json")

	res, _ := http.DefaultClient.Do(req)

	defer res.Body.Close()
	body, _ := ioutil.ReadAll(res.Body)

	fmt.Println(res)
	fmt.Println(string(body))

}`

export const UPDATE_QUOTE_TRANSIT_INFO_RESPONSE = `{
    "statusCode": "200",
    "success": true,
    "message": "Success.",
    "data": "Transit info successfully updated."
}`

export const BOOK_ORDER_CURL = `curl  -X POST \
  'https://rqeejaczw2.execute-api.us-east-1.amazonaws.com/HaulingDeskGoAPIXXX' \
  --header 'Accept: */*' \
  --header 'Content-Type: application/json' \
  --data-raw '{
"resource":"orders/book-new-order",
"api_key":[YOUR_API_KEY_HERE],
"account_id":[YOUR_ACCOUNT_ID_HERE],
"quote_token":[QUOTE_TOKEN],
"user_preffered_payment":"Brokers Fee Only",
"signature":"image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAVcAAADQCAYAAACz8yLMA...",
}'`

export const BOOK_ORDER_PHP = `<?php

$curl = curl_init();

curl_setopt_array($curl, [
  CURLOPT_URL => "https://rqeejaczw2.execute-api.us-east-1.amazonaws.com/HaulingDeskGoAPIXXX",
  CURLOPT_RETURNTRANSFER => true,
  CURLOPT_ENCODING => "",
  CURLOPT_MAXREDIRS => 10,
  CURLOPT_TIMEOUT => 30,
  CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
  CURLOPT_CUSTOMREQUEST => "POST",
  CURLOPT_POSTFIELDS => "{\"resource\":\"orders/book-new-order\",\"api_key\":[YOUR_API_KEY_HERE],\"account_id\":[YOUR_ACCOUNT_ID_HERE],\"quote_token\":[QUOTE_TOKEN],\"user_preffered_payment\":\"Brokers Fee Only\",\"signature\":\"image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAVcAAADQCAYAAACz8yLMA...\",}",
  CURLOPT_HTTPHEADER => [
    "Accept: */*",
    "Content-Type: application/json"
  ],
]);

$response = curl_exec($curl);
$err = curl_error($curl);

curl_close($curl);

if ($err) {
  echo "cURL Error #:" . $err;
} else {
  echo $response;
}`

export const BOOK_ORDER_NODEJS = `var axios = require("axios").default;

var options = {
  method: 'POST',
  url: 'https://rqeejaczw2.execute-api.us-east-1.amazonaws.com/HaulingDeskGoAPIXXX',
  headers: {Accept: '*/*', 'Content-Type': 'application/json'},
  data: '{"resource":"orders/book-new-order","api_key":[YOUR_API_KEY_HERE],"account_id":[YOUR_ACCOUNT_ID_HERE],"quote_token":[QUOTE_TOKEN],"user_preffered_payment":"Brokers Fee Only","signature":"image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAVcAAADQCAYAAACz8yLMA...",}'
};

axios.request(options).then(function (response) {
  console.log(response.data);
}).catch(function (error) {
  console.error(error);
});`

export const BOOK_ORDER_GO = `package main

import (
	"fmt"
	"strings"
	"net/http"
	"io/ioutil"
)

func main() {

	url := "https://rqeejaczw2.execute-api.us-east-1.amazonaws.com/HaulingDeskGoAPIXXX"

	payload := strings.NewReader("{\"resource\":\"orders/book-new-order\",\"api_key\":[YOUR_API_KEY_HERE],\"account_id\":[YOUR_ACCOUNT_ID_HERE],\"quote_token\":[QUOTE_TOKEN],\"user_preffered_payment\":\"Brokers Fee Only\",\"signature\":\"image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAVcAAADQCAYAAACz8yLMA...\",}")

	req, _ := http.NewRequest("POST", url, payload)

	req.Header.Add("Accept", "*/*")
	req.Header.Add("Content-Type", "application/json")

	res, _ := http.DefaultClient.Do(req)

	defer res.Body.Close()
	body, _ := ioutil.ReadAll(res.Body)

	fmt.Println(res)
	fmt.Println(string(body))

}`

export const BOOK_ORDER_RESPONSE = `{
    "statusCode": 201,
    "success": true,
    "message": "Order successfully booked.",
    "data": {
        "order_details_link": "https://shippers.hauling-desk.com/o/zf774k5BzQzs/1BUPSSFwy76",
        "order_id": 1126989,
        "order_token": "zf774k5BzQzs",
        "order_unique_id": "201059"
    }
}`

export const GET_ORDER_DETAILS_CURL = `curl  -X POST \
  'https://rqeejaczw2.execute-api.us-east-1.amazonaws.com/HaulingDeskGoAPIXXX' \
  --header 'Accept: */*' \
  --header 'Content-Type: application/json' \
  --data-raw '{
"resource":"orders/get-order-info",
"api_key":[YOUR_API_KEY_HERE],
"order_token":[ORDER_TOKEN_HERE],
"account_id":[YOUR_ACCOUNT_ID_HERE],
"fields":["order_id","order_uniq_id","dates","car_run","ship_via","shipper","origin","destination","vehicles","payments","type","order_token","shipper_signature"]
}'`

export const GET_ORDER_DETAILS_PHP = `<?php

$curl = curl_init();

curl_setopt_array($curl, [
  CURLOPT_URL => "https://rqeejaczw2.execute-api.us-east-1.amazonaws.com/HaulingDeskGoAPIXXX",
  CURLOPT_RETURNTRANSFER => true,
  CURLOPT_ENCODING => "",
  CURLOPT_MAXREDIRS => 10,
  CURLOPT_TIMEOUT => 30,
  CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
  CURLOPT_CUSTOMREQUEST => "POST",
  CURLOPT_POSTFIELDS => "{\"resource\":\"orders/get-order-info\",\"api_key\":[YOUR_API_KEY_HERE],\"order_token\":[ORDER_TOKEN_HERE],\"account_id\":[YOUR_ACCOUNT_ID_HERE],\"fields\":[\"order_id\",\"order_uniq_id\",\"dates\",\"car_run\",\"ship_via\",\"shipper\",\"origin\",\"destination\",\"vehicles\",\"payments\",\"type\",\"order_token\",\"shipper_signature\"]}",
  CURLOPT_HTTPHEADER => [
    "Accept: */*",
    "Content-Type: application/json"
  ],
]);

$response = curl_exec($curl);
$err = curl_error($curl);

curl_close($curl);

if ($err) {
  echo "cURL Error #:" . $err;
} else {
  echo $response;
}`

export const GET_ORDER_DETAILS_NODEJS = `var axios = require("axios").default;

var options = {
  method: 'POST',
  url: 'https://rqeejaczw2.execute-api.us-east-1.amazonaws.com/HaulingDeskGoAPIXXX',
  headers: {Accept: '*/*', 'Content-Type': 'application/json'},
  data: '{"resource":"orders/get-order-info","api_key":[YOUR_API_KEY_HERE],"order_token":[ORDER_TOKEN_HERE],"account_id":[YOUR_ACCOUNT_ID_HERE],"fields":["order_id","order_uniq_id","dates","car_run","ship_via","shipper","origin","destination","vehicles","payments","type","order_token","shipper_signature"]}'
};

axios.request(options).then(function (response) {
  console.log(response.data);
}).catch(function (error) {
  console.error(error);
});`

export const GET_ORDER_DETAILS_GO = `package main

import (
	"fmt"
	"strings"
	"net/http"
	"io/ioutil"
)

func main() {

	url := "https://rqeejaczw2.execute-api.us-east-1.amazonaws.com/HaulingDeskGoAPIXXX"

	payload := strings.NewReader("{\"resource\":\"orders/get-order-info\",\"api_key\":[YOUR_API_KEY_HERE],\"order_token\":[ORDER_TOKEN_HERE],\"account_id\":[YOUR_ACCOUNT_ID_HERE],\"fields\":[\"order_id\",\"order_uniq_id\",\"dates\",\"car_run\",\"ship_via\",\"shipper\",\"origin\",\"destination\",\"vehicles\",\"payments\",\"type\",\"order_token\",\"shipper_signature\"]}")

	req, _ := http.NewRequest("POST", url, payload)

	req.Header.Add("Accept", "*/*")
	req.Header.Add("Content-Type", "application/json")

	res, _ := http.DefaultClient.Do(req)

	defer res.Body.Close()
	body, _ := ioutil.ReadAll(res.Body)

	fmt.Println(res)
	fmt.Println(string(body))

}`

export const GET_ORDER_DETAILS_RESPONSE = `{
    "statusCode": "200",
    "success": true,
    "message": "Success.",
    "data": {
        "returned_info": {
            "order_id": 1126969,
            "order_uniq_id": "6149355",
            "dates": {
                "quoted": "2022-01-27 14:07:00",
                "created": "2022-01-27 14:07:00",
                "imported": "2023-08-26 12:10:47",
                "received": "2022-01-27 14:07:00",
                "last_cd_status_sync": "2023-09-04 21:40:00",
                "first_available_date": "2022-01-29"
            },
            "car_run": "No",
            "ship_via": "Open",
            "shipper": {
                "fullname": "Sami Jelousi",
                "email": "sammy.jelousi@example.com",
                "phone": "858-242-0000",
                "company": "Jelousi Inc"
            },
            "origin": {
                "zip": "0",
                "city": "San Francisco",
                "state": "CA",
                "address": "",
                "location": "New Location",
                "full_origin": " San Francisco, CA, 0"
            },
            "destination": {
                "zip": "29577",
                "city": "Myrtle Beach",
                "state": "SC",
                "address": "1175 58th Ave # 202",
                "location": "New Location",
                "full_destination": "1175 58th Ave # 202 Myrtle Beach, SC, 29577"
            },
            "vehicles": [
                {
                    "make": "Bmw",
                    "year": 2008,
                    "model": "3 Series",
                    "quantity": "3",
                    "vehicle_id": 1,
                    "full_vehicle": "2008 Bmw 3 Series"
                }
            ],
            "payments": {
                "carrier_pay": "1290.00",
                "total_tariff": "1548.00",
                "total_brokers_fee": "258.00"
            },
            "type": "Dispatched",
            "order_token": "ab2a9be49218",
            "shipper_signature": null,
            "assigned_to": "7",
            "assigned_agent": {
                "name": "John Adeabo",
                "email": "johndoe02@gmail.com",
                "phone": "8062744512"
            }
        }
    }
}`

export const UPDATE_ORDER_CONTACT_INFO_CURL = `curl  -X POST \
  'https://rqeejaczw2.execute-api.us-east-1.amazonaws.com/HaulingDeskGoAPIXXX' \
  --header 'Accept: */*' \
  --header 'Content-Type: application/json' \
  --data-raw '{
"resource":"orders/update-contact-info",
"api_key":[YOUR_API_KEY_HERE],
"account_id":[YOUR_ACCOUNT_ID_HERE],
"order_token":[ORDER_TOKEN],
"email":"johndoe@gmail.com",
"firstname":"John",
"lastname":"Doe",
"phone_1":"(111) 222-3333",
"phone_2":"",
"company_name":"John doe inc.",
"company_phone":"",
"shipper_note":"Need shipping asap"
}'`

export const UPDATE_ORDER_CONTACT_INFO_PHP = `<?php

$curl = curl_init();

curl_setopt_array($curl, [
  CURLOPT_URL => "https://rqeejaczw2.execute-api.us-east-1.amazonaws.com/HaulingDeskGoAPIXXX",
  CURLOPT_RETURNTRANSFER => true,
  CURLOPT_ENCODING => "",
  CURLOPT_MAXREDIRS => 10,
  CURLOPT_TIMEOUT => 30,
  CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
  CURLOPT_CUSTOMREQUEST => "POST",
  CURLOPT_POSTFIELDS => "{\"resource\":\"quotes/update-contact-info\",\"api_key\":[YOUR_API_KEY_HERE],\"account_id\":[YOUR_ACCOUNT_ID_HERE],\"order_token\":[ORDER_TOKEN],\"email\":\"johndoe@gmail.com\",\"firstname\":\"John\",\"lastname\":\"Doe\",\"phone_1\":\"(111) 222-3333\",\"phone_2\":\"\",\"company_name\":\"John doe inc.\",\"company_phone\":\"\",\"shipper_note\":\"Need shipping asap\"}",
  CURLOPT_HTTPHEADER => [
    "Accept: */*",
    "Content-Type: application/json"
  ],
]);

$response = curl_exec($curl);
$err = curl_error($curl);

curl_close($curl);

if ($err) {
  echo "cURL Error #:" . $err;
} else {
  echo $response;
}`

export const UPDATE_ORDER_CONTACT_INFO_NODEJS = `var axios = require("axios").default;

var options = {
  method: 'POST',
  url: 'https://rqeejaczw2.execute-api.us-east-1.amazonaws.com/HaulingDeskGoAPIXXX',
  headers: {Accept: '*/*', 'Content-Type': 'application/json'},
  data: '{"resource":"quotes/update-contact-info","api_key":[YOUR_API_KEY_HERE],"account_id":[YOUR_ACCOUNT_ID_HERE],"order_token":[ORDER_TOKEN],"email":"johndoe@gmail.com","firstname":"John","lastname":"Doe","phone_1":"(111) 222-3333","phone_2":"","company_name":"John doe inc.","company_phone":"","shipper_note":"Need shipping asap"}'
};

axios.request(options).then(function (response) {
  console.log(response.data);
}).catch(function (error) {
  console.error(error);
});`

export const UPDATE_ORDER_CONTACT_INFO_GO = `package main

import (
	"fmt"
	"strings"
	"net/http"
	"io/ioutil"
)

func main() {

	url := "https://rqeejaczw2.execute-api.us-east-1.amazonaws.com/HaulingDeskGoAPIXXX"

	payload := strings.NewReader("{\"resource\":\"quotes/update-contact-info\",\"api_key\":[YOUR_API_KEY_HERE],\"account_id\":[YOUR_ACCOUNT_ID_HERE],\"order_token\":[ORDER_TOKEN],\"email\":\"johndoe@gmail.com\",\"firstname\":\"John\",\"lastname\":\"Doe\",\"phone_1\":\"(111) 222-3333\",\"phone_2\":\"\",\"company_name\":\"John doe inc.\",\"company_phone\":\"\",\"shipper_note\":\"Need shipping asap\"}")

	req, _ := http.NewRequest("POST", url, payload)

	req.Header.Add("Accept", "*/*")
	req.Header.Add("Content-Type", "application/json")

	res, _ := http.DefaultClient.Do(req)

	defer res.Body.Close()
	body, _ := ioutil.ReadAll(res.Body)

	fmt.Println(res)
	fmt.Println(string(body))

}`

export const UPDATE_ORDER_CONTACT_INFO_RESPONSE = `{
    "statusCode": "200",
    "success": true,
    "message": "Success.",
    "data": "Contact info successfully updated."
}`

export const UPDATE_ORDER_TRANSIT_CURL = `curl  -X POST \
  'https://rqeejaczw2.execute-api.us-east-1.amazonaws.com/HaulingDeskGoAPIXXX' \
  --header 'Accept: */*' \
  --header 'Content-Type: application/json' \
  --data-raw '{
"resource":"orders/update-transit-info",
"api_key":[YOUR_API_KEY_HERE],
"account_id":[YOUR_ACCOUNT_ID_HERE],
"order_token":[ORDER_TOKEN],
"move_on":move_on,
"pickup_location":"Miami, FL, 33101", 
"pickup_address_1":"Suite 1, address 1",
"pickup_address_2":"",
"pickup_contact_name":"John Doe",
"pickup_phone_1":"(000) 111-2222",
"pickup_phone_2":"",
"pickup_phone_3":"",
"pickup_company_name":"",
"pickup_buyer_number":"",
"dropoff_location":"New York, NY, 10001",
"dropoff_address_1":"Suite 2, address 2",
"dropoff_address_2":"",
"dropoff_contact_name":"Jane Doe",
"dropoff_phone_1":"(000) 333-4444",
"dropoff_phone_2":"",
"dropoff_phone_3":"",
"dropoff_company_name":"",
"dropoff_buyer_number":"",
"trailer_type":"Enclosed",
"vehicles": [
  {
      "year": "2021",
      "make": "Honda",
      "model": "Civic",
      "quantity": "2",
      "type": "Car",
      "running": "Yes",
      "color": "Red"
  },
  {
      "year": "2017",
      "make": "Toyota",
      "model": "Corola",
      "quantity": "1",
      "type": "Car",
      "running": "No",
      "color": "Blue"
  }
],
"vehicle_runs":"Yes"
}'`

export const UPDATE_ORDER_TRANSIT_PHP = `<?php

$curl = curl_init();

curl_setopt_array($curl, [
  CURLOPT_URL => "https://rqeejaczw2.execute-api.us-east-1.amazonaws.com/HaulingDeskGoAPIXXX",
  CURLOPT_RETURNTRANSFER => true,
  CURLOPT_ENCODING => "",
  CURLOPT_MAXREDIRS => 10,
  CURLOPT_TIMEOUT => 30,
  CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
  CURLOPT_CUSTOMREQUEST => "POST",
  CURLOPT_POSTFIELDS => "{\"resource\":\"orders/update-transit-info\",\"api_key\":[YOUR_API_KEY_HERE],\"account_id\":[YOUR_ACCOUNT_ID_HERE],\"order_token\":[ORDER_TOKEN],\"move_on\":move_on,\"pickup_location\":\"Miami, FL, 33101\", \"pickup_address_1\":\"Suite 1, address 1\",\"pickup_address_2\":\"\",\"pickup_contact_name\":\"John Doe\",\"pickup_phone_1\":\"(000) 111-2222\",\"pickup_phone_2\":\"\",\"pickup_phone_3\":\"\",\"pickup_company_name\":\"\",\"pickup_buyer_number\":\"\",\"dropoff_location\":\"New York, NY, 10001\",\"dropoff_address_1\":\"Suite 2, address 2\",\"dropoff_address_2\":\"\",\"dropoff_contact_name\":\"Jane Doe\",\"dropoff_phone_1\":\"(000) 333-4444\",\"dropoff_phone_2\":\"\",\"dropoff_phone_3\":\"\",\"dropoff_company_name\":\"\",\"dropoff_buyer_number\":\"\",\"trailer_type\":\"Enclosed\",\"vehicles\": [  {      \"year\": \"2021\",      \"make\": \"Honda\",      \"model\": \"Civic\",      \"quantity\": \"2\",      \"type\": \"Car\",      \"running\": \"Yes\",      \"color\": \"Red\"  },  {      \"year\": \"2017\",      \"make\": \"Toyota\",      \"model\": \"Corola\",      \"quantity\": \"1\",      \"type\": \"Car\",      \"running\": \"No\",      \"color\": \"Blue\"  }],\"vehicle_runs\":\"Yes\"}",
  CURLOPT_HTTPHEADER => [
    "Accept: */*",
    "Content-Type: application/json"
  ],
]);

$response = curl_exec($curl);
$err = curl_error($curl);

curl_close($curl);

if ($err) {
  echo "cURL Error #:" . $err;
} else {
  echo $response;
}`

export const UPDATE_ORDER_TRANSIT_NODEJS = `var axios = require("axios").default;

var options = {
  method: 'POST',
  url: 'https://rqeejaczw2.execute-api.us-east-1.amazonaws.com/HaulingDeskGoAPIXXX',
  headers: {Accept: '*/*', 'Content-Type': 'application/json'},
  data: '{"resource":"orders/update-transit-info","api_key":[YOUR_API_KEY_HERE],"account_id":[YOUR_ACCOUNT_ID_HERE],"order_token":[ORDER_TOKEN],"move_on":move_on,"pickup_location":"Miami, FL, 33101", "pickup_address_1":"Suite 1, address 1","pickup_address_2":"","pickup_contact_name":"John Doe","pickup_phone_1":"(000) 111-2222","pickup_phone_2":"","pickup_phone_3":"","pickup_company_name":"","pickup_buyer_number":"","dropoff_location":"New York, NY, 10001","dropoff_address_1":"Suite 2, address 2","dropoff_address_2":"","dropoff_contact_name":"Jane Doe","dropoff_phone_1":"(000) 333-4444","dropoff_phone_2":"","dropoff_phone_3":"","dropoff_company_name":"","dropoff_buyer_number":"","trailer_type":"Enclosed","vehicles": [  {      "year": "2021",      "make": "Honda",      "model": "Civic",      "quantity": "2",      "type": "Car",      "running": "Yes",      "color": "Red"  },  {      "year": "2017",      "make": "Toyota",      "model": "Corola",      "quantity": "1",      "type": "Car",      "running": "No",      "color": "Blue"  }],"vehicle_runs":"Yes"}'
};

axios.request(options).then(function (response) {
  console.log(response.data);
}).catch(function (error) {
  console.error(error);
});`

export const UPDATE_ORDER_TRANSIT_GO = `package main

import (
	"fmt"
	"strings"
	"net/http"
	"io/ioutil"
)

func main() {

	url := "https://rqeejaczw2.execute-api.us-east-1.amazonaws.com/HaulingDeskGoAPIXXX"

	payload := strings.NewReader("{\"resource\":\"orders/update-transit-info\",\"api_key\":[YOUR_API_KEY_HERE],\"account_id\":[YOUR_ACCOUNT_ID_HERE],\"order_token\":[ORDER_TOKEN],\"move_on\":move_on,\"pickup_location\":\"Miami, FL, 33101\", \"pickup_address_1\":\"Suite 1, address 1\",\"pickup_address_2\":\"\",\"pickup_contact_name\":\"John Doe\",\"pickup_phone_1\":\"(000) 111-2222\",\"pickup_phone_2\":\"\",\"pickup_phone_3\":\"\",\"pickup_company_name\":\"\",\"pickup_buyer_number\":\"\",\"dropoff_location\":\"New York, NY, 10001\",\"dropoff_address_1\":\"Suite 2, address 2\",\"dropoff_address_2\":\"\",\"dropoff_contact_name\":\"Jane Doe\",\"dropoff_phone_1\":\"(000) 333-4444\",\"dropoff_phone_2\":\"\",\"dropoff_phone_3\":\"\",\"dropoff_company_name\":\"\",\"dropoff_buyer_number\":\"\",\"trailer_type\":\"Enclosed\",\"vehicles\": [  {      \"year\": \"2021\",      \"make\": \"Honda\",      \"model\": \"Civic\",      \"quantity\": \"2\",      \"type\": \"Car\",      \"running\": \"Yes\",      \"color\": \"Red\"  },  {      \"year\": \"2017\",      \"make\": \"Toyota\",      \"model\": \"Corola\",      \"quantity\": \"1\",      \"type\": \"Car\",      \"running\": \"No\",      \"color\": \"Blue\"  }],\"vehicle_runs\":\"Yes\"}")

	req, _ := http.NewRequest("POST", url, payload)

	req.Header.Add("Accept", "*/*")
	req.Header.Add("Content-Type", "application/json")

	res, _ := http.DefaultClient.Do(req)

	defer res.Body.Close()
	body, _ := ioutil.ReadAll(res.Body)

	fmt.Println(res)
	fmt.Println(string(body))

}`

export const UPDATE_ORDER_TRANSIT_RESPONSE = `{
    "statusCode": "200",
    "success": true,
    "message": "Success.",
    "data": "Transit info successfully updated."
}`

export const COLLECT_SIGNATURE_CURL = `curl  -X POST \
  'https://rqeejaczw2.execute-api.us-east-1.amazonaws.com/HaulingDeskGoAPIXXX' \
  --header 'Accept: */*' \
  --header 'Content-Type: application/json' \
  --data-raw '{
"resource":"orders/collect-shipper-signature",
"api_key":[YOUR_API_KEY_HERE],
"account_id":[YOUR_ACCOUNT_ID_HERE],
"order_token":[ORDER_TOKEN],
"signature":"image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAVcAAADQCAYAAACz8yLMA...",
}'`

export const COLLECT_SIGNATURE_PHP = `<?php

$curl = curl_init();

curl_setopt_array($curl, [
  CURLOPT_URL => "https://rqeejaczw2.execute-api.us-east-1.amazonaws.com/HaulingDeskGoAPIXXX",
  CURLOPT_RETURNTRANSFER => true,
  CURLOPT_ENCODING => "",
  CURLOPT_MAXREDIRS => 10,
  CURLOPT_TIMEOUT => 30,
  CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
  CURLOPT_CUSTOMREQUEST => "POST",
  CURLOPT_POSTFIELDS => "{\"resource\":\"orders/collect-shipper-signature\",\"api_key\":[YOUR_API_KEY_HERE],\"account_id\":[YOUR_ACCOUNT_ID_HERE],\"order_token\":[ORDER_TOKEN],\"signature\":\"image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAVcAAADQCAYAAACz8yLMA...\",}",
  CURLOPT_HTTPHEADER => [
    "Accept: */*",
    "Content-Type: application/json"
  ],
]);

$response = curl_exec($curl);
$err = curl_error($curl);

curl_close($curl);

if ($err) {
  echo "cURL Error #:" . $err;
} else {
  echo $response;
}`

export const COLLECT_SIGNATURE_NODEJS = `var axios = require("axios").default;

var options = {
  method: 'POST',
  url: 'https://rqeejaczw2.execute-api.us-east-1.amazonaws.com/HaulingDeskGoAPIXXX',
  headers: {Accept: '*/*', 'Content-Type': 'application/json'},
  data: '{"resource":"orders/collect-shipper-signature","api_key":[YOUR_API_KEY_HERE],"account_id":[YOUR_ACCOUNT_ID_HERE],"order_token":[ORDER_TOKEN],"signature":"image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAVcAAADQCAYAAACz8yLMA...",}'
};

axios.request(options).then(function (response) {
  console.log(response.data);
}).catch(function (error) {
  console.error(error);
});`

export const COLLECT_SIGNATURE_GO = `package main

import (
	"fmt"
	"strings"
	"net/http"
	"io/ioutil"
)

func main() {

	url := "https://rqeejaczw2.execute-api.us-east-1.amazonaws.com/HaulingDeskGoAPIXXX"

	payload := strings.NewReader("{\"resource\":\"orders/collect-shipper-signature\",\"api_key\":[YOUR_API_KEY_HERE],\"account_id\":[YOUR_ACCOUNT_ID_HERE],\"order_token\":[ORDER_TOKEN],\"signature\":\"image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAVcAAADQCAYAAACz8yLMA...\",}")

	req, _ := http.NewRequest("POST", url, payload)

	req.Header.Add("Accept", "*/*")
	req.Header.Add("Content-Type", "application/json")

	res, _ := http.DefaultClient.Do(req)

	defer res.Body.Close()
	body, _ := ioutil.ReadAll(res.Body)

	fmt.Println(res)
	fmt.Println(string(body))

}`

export const COLLECT_SIGNATURE_RESPONSE = `{
    "statusCode": 201,
    "success": true,
    "message": "Signature successfully added.",
    "data": {
        "order_details_link": "https://shippers.hauling-desk.com/o/zf774k5BzQzs/1BUPSSFwy76",
        "order_id": 1126989,
        "order_token": "zf774k5BzQzs",
        "order_unique_id": "201059"
    }
}`

export const LOAD_PAYMENTS_CURL = `curl  -X POST \
  'https://rqeejaczw2.execute-api.us-east-1.amazonaws.com/HaulingDeskGoAPIXXX' \
  --header 'Accept: */*' \
  --header 'Content-Type: application/json' \
  --data-raw '{
"resource":"payments/load-payment-history",
"api_key":[YOUR_API_KEY_HERE],
"account_id":[YOUR_ACCOUNT_ID_HERE],
"order_token":[ORDER_TOKEN],
"type":["Shipper To Broker","Shipper To Carrier","Broker To Carrier","Carrier To Broker"]
}'`

export const LOAD_PAYMENTS_PHP = `<?php

$curl = curl_init();

curl_setopt_array($curl, [
  CURLOPT_URL => "https://rqeejaczw2.execute-api.us-east-1.amazonaws.com/HaulingDeskGoAPIXXX",
  CURLOPT_RETURNTRANSFER => true,
  CURLOPT_ENCODING => "",
  CURLOPT_MAXREDIRS => 10,
  CURLOPT_TIMEOUT => 30,
  CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
  CURLOPT_CUSTOMREQUEST => "POST",
  CURLOPT_POSTFIELDS => "{\"resource\":\"payments/load-payment-history\",\"api_key\":[YOUR_API_KEY_HERE],\"account_id\":[YOUR_ACCOUNT_ID_HERE],\"order_token\":[ORDER_TOKEN],\"type\":[\"Shipper To Broker\",\"Shipper To Carrier\",\"Broker To Carrier\",\"Carrier To Broker\"]}",
  CURLOPT_HTTPHEADER => [
    "Accept: */*",
    "Content-Type: application/json"
  ],
]);

$response = curl_exec($curl);
$err = curl_error($curl);

curl_close($curl);

if ($err) {
  echo "cURL Error #:" . $err;
} else {
  echo $response;
}`

export const LOAD_PAYMENTS_NODEJS = `var axios = require("axios").default;

var options = {
  method: 'POST',
  url: 'https://rqeejaczw2.execute-api.us-east-1.amazonaws.com/HaulingDeskGoAPIXXX',
  headers: {Accept: '*/*', 'Content-Type': 'application/json'},
  data: '{"resource":"payments/load-payment-history","api_key":[YOUR_API_KEY_HERE],"account_id":[YOUR_ACCOUNT_ID_HERE],"order_token":[ORDER_TOKEN],"type":["Shipper To Broker","Shipper To Carrier","Broker To Carrier","Carrier To Broker"]}'
};

axios.request(options).then(function (response) {
  console.log(response.data);
}).catch(function (error) {
  console.error(error);
});`

export const LOAD_PAYMENTS_GO = `package main

import (
	"fmt"
	"strings"
	"net/http"
	"io/ioutil"
)

func main() {

	url := "https://rqeejaczw2.execute-api.us-east-1.amazonaws.com/HaulingDeskGoAPIXXX"

	payload := strings.NewReader("{\"resource\":\"payments/load-payment-history\",\"api_key\":[YOUR_API_KEY_HERE],\"account_id\":[YOUR_ACCOUNT_ID_HERE],\"order_token\":[ORDER_TOKEN],\"type\":[\"Shipper To Broker\",\"Shipper To Carrier\",\"Broker To Carrier\",\"Carrier To Broker\"]}")

	req, _ := http.NewRequest("POST", url, payload)

	req.Header.Add("Accept", "*/*")
	req.Header.Add("Content-Type", "application/json")

	res, _ := http.DefaultClient.Do(req)

	defer res.Body.Close()
	body, _ := ioutil.ReadAll(res.Body)

	fmt.Println(res)
	fmt.Println(string(body))

}`

export const LOAD_PAYMENTS_RESPONSE = `{
    "statusCode": 200,
    "success": true,
    "message": "Success",
    "data": {
        "payments": [
            {
                "refrence_no": "630c9de4984031661771236",
                "status": "Authorized",
                "item_type": "Orders",
                "item_id": "1126969",
                "company_id": "1",
                "date_received": "2022-08-29 13:07:16",
                "payment_from_to": "Shipper To Carrier",
                "amount": "150",
                "deposit_method": "Card",
                "deposit_type": "Brokers Fee",
                "cc_last_digits": "4242",
                "cc_type": "Visa",
                "other_cc_type": "",
                "cc_expiration_month": "12",
                "cc_expiration_year": "2052",
                "authorization_code": "",
                "check_number": "",
                "transaction_id": "ch_3Lc5oFKetyR2D8P31NWUeaHl",
                "notes": "",
                "receipt_link": "https://pay.stripe.com/receipts/payment/CAcaFwoVYWNjdF8xRVF6SXFLZXROU6LBad-znkCx5-PVuL24aYxXoxWyQJ4kEC79Ds23139v0ArVVOPpcjwGH-fju4",
                "entered_by": "Shipper"
            },
            {
                "refrence_no": "630cb333ab0d71661776691",
                "status": "Authorized",
                "item_type": "Orders",
                "item_id": "1126969",
                "company_id": "1",
                "date_received": "2022-08-29 14:38:11",
                "payment_from_to": "Carrier To Broker",
                "amount": "806",
                "deposit_method": "Card",
                "deposit_type": "Full Tariff",
                "cc_last_digits": "4242",
                "cc_type": "Visa",
                "other_cc_type": "",
                "cc_expiration_month": "12",
                "cc_expiration_year": "2042",
                "authorization_code": "",
                "check_number": "",
                "transaction_id": "ch_3Lc7EEKetyR2D8P30pSvbqp8",
                "notes": "",
                "receipt_link": "https://pay.stripe.com/receipts/payment/CAcaFwoVYWNjdF8xRVF6SXgb5bih96Sk6LBaqHbcd3FV70KAbH5Lai9AyGRUlx3jY2HbRXuEky_11rpujwkpJ46Du1S74",
                "entered_by": "Shipper"
            }
        ],
        "total_records": 2,
        "total_returned": 2
    }
}`

export const ADD_PAYMENT_CURL = `curl  -X POST \
  'https://rqeejaczw2.execute-api.us-east-1.amazonaws.com/HaulingDeskGoAPIXXX' \
  --header 'Accept: */*' \
  --header 'Content-Type: application/json' \
  --data-raw '{
"resource":"payments/add-new-payment",
"api_key":[YOUR_API_KEY_HERE],
"account_id":[YOUR_ACCOUNT_ID_HERE],
"order_token":[ORDER_TOKEN],
"date_received":"2022-08-29 14:38:11",
"payment_from_to":"Shipper To Carrier",
"amount":1250,
"deposit_method":"Credit Card",
"transaction_id":"Tx0013373837GSy6",
"notes":"Additional notes here",
"cc_last_digits":1001,
"cc_type":"Visa",
"other_cc_type":"",
"cc_expiration_month":"January",
"cc_expiration_year":"2028",
"authorization_code":"93Hys83TS638",
"check_number":""
}'`

export const ADD_PAYMENT_PHP = `<?php

$curl = curl_init();

curl_setopt_array($curl, [
  CURLOPT_URL => "https://rqeejaczw2.execute-api.us-east-1.amazonaws.com/HaulingDeskGoAPIXXX",
  CURLOPT_RETURNTRANSFER => true,
  CURLOPT_ENCODING => "",
  CURLOPT_MAXREDIRS => 10,
  CURLOPT_TIMEOUT => 30,
  CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
  CURLOPT_CUSTOMREQUEST => "POST",
  CURLOPT_POSTFIELDS => "{\"resource\":\"payments/add-new-payment\",\"api_key\":[YOUR_API_KEY_HERE],\"account_id\":[YOUR_ACCOUNT_ID_HERE],\"order_token\":[ORDER_TOKEN],\"date_received\":\"2022-08-29 14:38:11\",\"payment_from_to\":\"Shipper To Carrier\",\"amount\":1250,\"deposit_method\":\"Credit Card\",\"transaction_id\":\"Tx0013373837GSy6\",\"notes\":\"Additional notes here\",\"cc_last_digits\":1001,\"cc_type\":\"Visa\",\"other_cc_type\":\"\",\"cc_expiration_month\":\"January\",\"cc_expiration_year\":\"2028\",\"authorization_code\":\"93Hys83TS638\",\"check_number\":\"\"}",
  CURLOPT_HTTPHEADER => [
    "Accept: */*",
    "Content-Type: application/json"
  ],
]);

$response = curl_exec($curl);
$err = curl_error($curl);

curl_close($curl);

if ($err) {
  echo "cURL Error #:" . $err;
} else {
  echo $response;
}`

export const ADD_PAYMENT_NODEJS = `var axios = require("axios").default;

var options = {
  method: 'POST',
  url: 'https://rqeejaczw2.execute-api.us-east-1.amazonaws.com/HaulingDeskGoAPIXXX',
  headers: {Accept: '*/*', 'Content-Type': 'application/json'},
  data: '{"resource":"payments/add-new-payment","api_key":[YOUR_API_KEY_HERE],"account_id":[YOUR_ACCOUNT_ID_HERE],"order_token":[ORDER_TOKEN],"date_received":"2022-08-29 14:38:11","payment_from_to":"Shipper To Carrier","amount":1250,"deposit_method":"Credit Card","transaction_id":"Tx0013373837GSy6","notes":"Additional notes here","cc_last_digits":1001,"cc_type":"Visa","other_cc_type":"","cc_expiration_month":"January","cc_expiration_year":"2028","authorization_code":"93Hys83TS638","check_number":""}'
};

axios.request(options).then(function (response) {
  console.log(response.data);
}).catch(function (error) {
  console.error(error);
});`

export const ADD_PAYMENT_GO = `package main

import (
	"fmt"
	"strings"
	"net/http"
	"io/ioutil"
)

func main() {

	url := "https://rqeejaczw2.execute-api.us-east-1.amazonaws.com/HaulingDeskGoAPIXXX"

	payload := strings.NewReader("{\"resource\":\"payments/add-new-payment\",\"api_key\":[YOUR_API_KEY_HERE],\"account_id\":[YOUR_ACCOUNT_ID_HERE],\"order_token\":[ORDER_TOKEN],\"date_received\":\"2022-08-29 14:38:11\",\"payment_from_to\":\"Shipper To Carrier\",\"amount\":1250,\"deposit_method\":\"Credit Card\",\"transaction_id\":\"Tx0013373837GSy6\",\"notes\":\"Additional notes here\",\"cc_last_digits\":1001,\"cc_type\":\"Visa\",\"other_cc_type\":\"\",\"cc_expiration_month\":\"January\",\"cc_expiration_year\":\"2028\",\"authorization_code\":\"93Hys83TS638\",\"check_number\":\"\"}")

	req, _ := http.NewRequest("POST", url, payload)

	req.Header.Add("Accept", "*/*")
	req.Header.Add("Content-Type", "application/json")

	res, _ := http.DefaultClient.Do(req)

	defer res.Body.Close()
	body, _ := ioutil.ReadAll(res.Body)

	fmt.Println(res)
	fmt.Println(string(body))

}`

export const ADD_PAYMENT_RESPONSE = `{
    "statusCode": 201,
    "success": true,
    "message": "Payment successfully added."
}`

export const LOG_PAYMENT_ERROR_CURL = `curl  -X POST \
  'https://rqeejaczw2.execute-api.us-east-1.amazonaws.com/HaulingDeskGoAPIXXX' \
  --header 'Accept: */*' \
  --header 'Content-Type: application/json' \
  --data-raw ' {
"resource":"payments/log-payment-error",
"api_key":[YOUR_API_KEY_HERE],
"account_id":[YOUR_ACCOUNT_ID_HERE],
"order_token":[ORDER_TOKEN],
"displayed_message":"Invalid payment token",
"complex_message":"The provided authorization grant is invalid, expired, or revoked Code: #401",
"possible_error":"Wrong token provided",
"possible_solution":"Verify payment API credentials",
}'`

export const LOG_PAYMENT_ERROR_PHP = `<?php

$curl = curl_init();

curl_setopt_array($curl, [
  CURLOPT_URL => "https://rqeejaczw2.execute-api.us-east-1.amazonaws.com/HaulingDeskGoAPIXXX",
  CURLOPT_RETURNTRANSFER => true,
  CURLOPT_ENCODING => "",
  CURLOPT_MAXREDIRS => 10,
  CURLOPT_TIMEOUT => 30,
  CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
  CURLOPT_CUSTOMREQUEST => "POST",
  CURLOPT_POSTFIELDS => " {\"resource\":\"payments/log-payment-error\",\"api_key\":[YOUR_API_KEY_HERE],\"account_id\":[YOUR_ACCOUNT_ID_HERE],\"order_token\":[ORDER_TOKEN],\"displayed_message\":\"Invalid payment token\",\"complex_message\":\"The provided authorization grant is invalid, expired, or revoked Code: #401\",\"possible_error\":\"Wrong token provided\",\"possible_solution\":\"Verify payment API credentials\",}",
  CURLOPT_HTTPHEADER => [
    "Accept: */*",
    "Content-Type: application/json"
  ],
]);

$response = curl_exec($curl);
$err = curl_error($curl);

curl_close($curl);

if ($err) {
  echo "cURL Error #:" . $err;
} else {
  echo $response;
}`

export const LOG_PAYMENT_ERROR_NODEJS = `var axios = require("axios").default;

var options = {
  method: 'POST',
  url: 'https://rqeejaczw2.execute-api.us-east-1.amazonaws.com/HaulingDeskGoAPIXXX',
  headers: {Accept: '*/*', 'Content-Type': 'application/json'},
  data: ' {"resource":"payments/log-payment-error","api_key":[YOUR_API_KEY_HERE],"account_id":[YOUR_ACCOUNT_ID_HERE],"order_token":[ORDER_TOKEN],"displayed_message":"Invalid payment token","complex_message":"The provided authorization grant is invalid, expired, or revoked Code: #401","possible_error":"Wrong token provided","possible_solution":"Verify payment API credentials",}'
};

axios.request(options).then(function (response) {
  console.log(response.data);
}).catch(function (error) {
  console.error(error);
});`

export const LOG_PAYMENT_ERROR_GO = `package main

import (
	"fmt"
	"strings"
	"net/http"
	"io/ioutil"
)

func main() {

	url := "https://rqeejaczw2.execute-api.us-east-1.amazonaws.com/HaulingDeskGoAPIXXX"

	payload := strings.NewReader(" {\"resource\":\"payments/log-payment-error\",\"api_key\":[YOUR_API_KEY_HERE],\"account_id\":[YOUR_ACCOUNT_ID_HERE],\"order_token\":[ORDER_TOKEN],\"displayed_message\":\"Invalid payment token\",\"complex_message\":\"The provided authorization grant is invalid, expired, or revoked Code: #401\",\"possible_error\":\"Wrong token provided\",\"possible_solution\":\"Verify payment API credentials\",}")

	req, _ := http.NewRequest("POST", url, payload)

	req.Header.Add("Accept", "*/*")
	req.Header.Add("Content-Type", "application/json")

	res, _ := http.DefaultClient.Do(req)

	defer res.Body.Close()
	body, _ := ioutil.ReadAll(res.Body)

	fmt.Println(res)
	fmt.Println(string(body))

}`

export const LOG_PAYMENT_ERROR_RESPONSE = `{
    "statusCode": 201,
    "success": true,
    "message": "Payment error successfully added."
}`

export const GET_BROKER_INFO_CURL = `curl  -X POST \
  'https://rqeejaczw2.execute-api.us-east-1.amazonaws.com/HaulingDeskGoAPIXXX' \
  --header 'Accept: */*' \
  --header 'Content-Type: application/json' \
  --data-raw '{
"resource":"accounts/load-broker-info",
"api_key":[YOUR_API_KEY_HERE],
"account_id":[YOUR_ACCOUNT_ID_HERE],
"fields":["*"]
}'`

export const GET_BROKER_INFO_PHP = `<?php

$curl = curl_init();

curl_setopt_array($curl, [
  CURLOPT_URL => "https://rqeejaczw2.execute-api.us-east-1.amazonaws.com/HaulingDeskGoAPIXXX",
  CURLOPT_RETURNTRANSFER => true,
  CURLOPT_ENCODING => "",
  CURLOPT_MAXREDIRS => 10,
  CURLOPT_TIMEOUT => 30,
  CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
  CURLOPT_CUSTOMREQUEST => "POST",
  CURLOPT_POSTFIELDS => "{\"resource\":\"accounts/load-broker-info\",\"api_key\":[YOUR_API_KEY_HERE],\"account_id\":[YOUR_ACCOUNT_ID_HERE],\"fields\":[\"*\"]}",
  CURLOPT_HTTPHEADER => [
    "Accept: */*",
    "Content-Type: application/json"
  ],
]);

$response = curl_exec($curl);
$err = curl_error($curl);

curl_close($curl);

if ($err) {
  echo "cURL Error #:" . $err;
} else {
  echo $response;
}`

export const GET_BROKER_INFO_NODEJS = `var axios = require("axios").default;

var options = {
  method: 'POST',
  url: 'https://rqeejaczw2.execute-api.us-east-1.amazonaws.com/HaulingDeskGoAPIXXX',
  headers: {Accept: '*/*', 'Content-Type': 'application/json'},
  data: '{"resource":"accounts/load-broker-info","api_key":[YOUR_API_KEY_HERE],"account_id":[YOUR_ACCOUNT_ID_HERE],"fields":["*"]}'
};

axios.request(options).then(function (response) {
  console.log(response.data);
}).catch(function (error) {
  console.error(error);
});`

export const GET_BROKER_INFO_GO = `package main

import (
	"fmt"
	"strings"
	"net/http"
	"io/ioutil"
)

func main() {

	url := "https://rqeejaczw2.execute-api.us-east-1.amazonaws.com/HaulingDeskGoAPIXXX"

	payload := strings.NewReader("{\"resource\":\"accounts/load-broker-info\",\"api_key\":[YOUR_API_KEY_HERE],\"account_id\":[YOUR_ACCOUNT_ID_HERE],\"fields\":[\"*\"]}")

	req, _ := http.NewRequest("POST", url, payload)

	req.Header.Add("Accept", "*/*")
	req.Header.Add("Content-Type", "application/json")

	res, _ := http.DefaultClient.Do(req)

	defer res.Body.Close()
	body, _ := ioutil.ReadAll(res.Body)

	fmt.Println(res)
	fmt.Println(string(body))

}`

export const GET_BROKER_INFO_RESPONSE = `{
    "statusCode": "200",
    "success": true,
    "message": "Success.",
    "data": {
        "returned_info": {
            "company_unique_id": "1BUPSJZ67YZ",
            "company_logo": "https:\/\/hauling-desk-logos.s3.amazonaws.com\/logo_1_1659822216709.png",
            "mc_number": "611862",
            "email": "johndoe011@gmail.com",
            "company_name": "Pro Car Movers",
            "api_key": "PRODUCTION-1-jJaj98OUUeuuey8786yuwYUYW909kMLRXiu93039a",
            "sandbox_api_key": "SANDBOX-1-jJaj98OUUeuuey8786SHue849356758Sj989a",
            "quote_details_info": "More info here...",
            "endpoints": {
                "payment_link": "http:\/\/local.procarmovers.com\/checkout.php?token=",
                "book_order_link": "http:\/\/local.procarmovers.com\/book-order.php?token=",
                "order_details_link": "",
                "quote_details_link": "http:\/\/local.procarmovers.com\/quote-details.php?token=",
                "show_tracking_details": "Yes",
                "shipper_signature_link": "http:\/\/local.procarmovers.com\/shipper-signature.php?token="
            },
            "auto_lock": "Yes",
            "thank_you": "https:\/\/elpasowakanda.com",
            "tracking_script": "<script src=\"\/\/codededd.jivosite.com\/widget\/tracking\" async><\/script>",
            "hotjar_script": "<script src=\"\/\/codede.jivosite.com\/widget\/hotjar\" async><\/script>",
            "livechat_script": "<script src=\"\/\/code.jivosite.com\/widget\/n4j0J9dUKN\" async><\/script>",
            "contact_info": {
                "fax": "84844744",
                "zip": "33101",
                "city": "Miami",
                "owner": "Oluwapaso",
                "state": "FL",
                "address": "Quarters oke odo iwo",
                "country": "United States",
                "address_2": "flat 57",
                "phone_cell": "(049) 944-8484",
                "phone_local": "(090) 898-8484",
                "phone_toll_free": "(800) 474-7447"
            },
            "departments_info": {
                "sales_fax": "789495958",
                "sales_email": "johndoe01@gmail.com",
                "sales_phone": "(084) 744-3633",
                "support_fax": "7574484",
                "dispatch_fax": "44484743",
                "support_email": "johndoe01@gmail.com",
                "support_phone": "(084) 735-3534",
                "dispatch_email": "johndoe01@gmail.com",
                "dispatch_phone": "(786) 663-6333",
                "dispatch_contact": "Oluwapso"
            },
            "order_terms": "If Seller for any reason anticipates difficulty in complying with the required delivery date...",
            "dispatch_terms": "Any claim by the Seller for adjustment under this Section 11 must be in a detailed writing and...",
            "order_terms_last_update":"2023-10-12 12:14:10",
            "dispatch_terms_last_update":"2023-10-11 10:18:22"
        }
    }
}`