from flask import Flask
from flaskext.mongoengine import MongoEngine

app = Flask(__name__)
app.config["MONGODB_DB"] = 'lilybbs15'
app.secret_key = '\xd38p\xf4\xf2\xe2)o\xa0\xdfR\xf4\xf7Z|@\x1c\xe5\x1a\x8d6\xdfO\xbe'

db = MongoEngine(app)


def register_blueprints(app):
    # Prevents circular imports
    from views import topic
    app.register_blueprint(topic, url_prefix='/topics')

register_blueprints(app)


if __name__ == '__main__':
    app.run()
