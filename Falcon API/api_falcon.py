import falcon
import json
from waitress import serve
import pymongo

myclient = pymongo.MongoClient("mongodb://localhost:27017/")
mydb = myclient["tests"]
mycol = mydb["all_data"]


class GetDefAll:
    def on_get(self, req, resp):
        all_documents = mycol.find()
        d = {}
        for document in all_documents:
            d[document["_id"]] = document["category"]
        resp.body = json.dumps(d)


class InsertOneDocument:
    def on_post(self, req, resp):
        # extracting the keys

        all_documents = mycol.find()
        d = {}
        for document in all_documents:
            d[document["_id"]] = document["category"]

        # return list of database keys
        database_keys = list(d.keys())

        data_input = json.loads(req.stream.read())
        for i in data_input.keys():  # categoryies as keys
            # print(i)
            d_temp = {}
            if i in database_keys:
                temp_database_dict = mycol.find_one({"_id": i})["category"]
                temp_input_dict = data_input[i]
                # print(list(temp_database_dict.keys()))
                for j in temp_input_dict.keys():
                    # print(temp_input_dict[j])
                    temp_database_dict[j] = temp_input_dict[j]
                # print(temp_database_dict)
                d_temp = {
                    "_id": i,
                    "category": temp_database_dict
                }
                # print("temperary database dictionary")
                # print(temp_database_dict)
                mycol.delete_one({"_id": i})
                # mycol.insert_one(temp_database_dict)
            else:
                d_temp = {
                    "_id": i,
                    "category": data_input[i]
                }

            mycol.insert_one(d_temp)
        # d1 = {}
        # for i in data_input.keys():
        #     d1[i] = mycol.find_one({"_id": i})["category"]
        # # print(d1)

        resp.body = json.dumps({"note": "executed"})


class InsertOneItem:
    def on_post(self, req, resp):
        data_input = json.loads(req.stream.read())
        for i in data_input.keys():
            matched_document = mycol.find({'_id': i})
            if matched_document:
                result = mycol.insert_one(data_input[i])
                # Insert
            else:
                updated_document = matched_document[0]
                print("updated_document")
                print(updated_document)
                for k, v in data_input[i].items():
                    updated_document[i][k] = v
                    result = mycol.update_one(matched_document[0], {
                        "$set": updated_document})
            # resp.body = str(result.matched_count)
            # if result.matched_count > 0:
            #     resp.body = "record updated"
            # else:
            #     resp.body = 'record not updated'


api = falcon.API()
api.add_route('/GetDefAll', GetDefAll())
api.add_route('/InsertOneDocument', InsertOneDocument())
api.add_route('/InsertOneItem', InsertOneItem())
serve(api, host="0.0.0.0", port="8800")
