from flask import Flask
from flaskext.mongoengine import MongoEngine

app = Flask(__name__)
app.config["MONGODB_DB"] = 'lilybbs15'

db = MongoEngine(app)


if __name__ == '__main__':
    app.run()
