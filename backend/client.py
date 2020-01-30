import os
import json
import requests
from flask import Flask, request

app = Flask(__name__, static_url_path='')
swapi_api_url = 'https://swapi.co/api/'


@app.route('/health', methods=['GET'])
def health():
    return json.dumps({'message': 'OK'})


@app.route('/altagram', methods=['GET'])
def altagram():
    swapi_response = requests.get(
        swapi_api_url + 'starships/?format=json').content
    swapi_response_json = json.loads(swapi_response)['results']
    starships = []
    starships_without_rating = []

    for starship in swapi_response_json:
        # I am considering that unknown hyperdrive attr doesn't
        # exist in json, not that it exists and have the value unknown
        if 'hyperdrive_rating' in starship:
            starships.append(
                {'name': starship['name'], 'hyperdrive': starship['hyperdrive_rating']})
        else:
            starships_without_rating.append({'name': starship['name']})

    sorted_starships = sorted(
        starships, key=lambda x: x['hyperdrive'])

    altagram_starships_response = {"starships": sorted_starships,
                                   "starships_unknown_hyperdrive": starships_without_rating}

    return json.dumps(altagram_starships_response)


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=3000, threaded=True)
