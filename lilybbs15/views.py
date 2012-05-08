import os
from flask import Blueprint, render_template, send_from_directory
from . import app
from models import Topic

topic = Blueprint('topics', __name__, template_folder='templates')


@topic.route('/')
def topics():
    return "Hello!"


@topic.route('/<slug>')
def show(slug):
    topic = Topic.objects.get_or_404(slug=slug)
    return render_template('topics/detail.html', topic=topic)


@app.route('/')
def index():
    return render_template('index.html')


@app.route('/login', methods=['GET', 'POST'])
def login():
    pass


@app.route('/favicon.ico')
def favicon():
    return send_from_directory(os.path.join(app.root_path, 'static/img'),
                               'favicon.ico', mimetype='image/vnd.microsoft.icon')
