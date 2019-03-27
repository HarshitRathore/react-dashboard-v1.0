import falcon
import json
from waitress import serve

api = falcon.API()


class AddCategory:
    def on_post(self, req, resp):
        data = req.stream.read()
        resp.body = data
        print(data)
        print(type(data))


class AddCategoryKey:
    def on_post(self, req, resp):
        data = req.stream.read()
        resp.body = data
        print(data)
        print(type(data))


api.add_route('/AddCategory', AddCategory())
api.add_route('/AddCategoryKey', AddCategoryKey())
serve(api, host="0.0.0.0", port="8800")
