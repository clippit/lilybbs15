from flask import Flask
from flaskext.mongoengine import MongoEngine

app = Flask(__name__)
app.config["MONGODB_DB"] = 'lilybbs15'

db = MongoEngine(app)


def register_blueprints(app):
    # Prevents circular imports
    from views import topic
    app.register_blueprint(topic, url_prefix='/topics')

register_blueprints(app)


if __name__ == '__main__':
    app.run()
