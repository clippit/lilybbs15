# -*- coding: utf-8 -*-

import os
from flask import Blueprint, flash, render_template, request, redirect, send_from_directory, session, url_for
from . import app
from models import *

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
    if request.method == 'POST':
        if not User.login_bbs(request.form['username'], request.form['password']):
            flash(u'登录失败，请重试。')
        else:
            session['logged_name'] = request.form['username']
            return redirect(url_for('index'))

    return render_template('login.html')


@app.route('/logout')
def logout():
    session.pop('logged_name', None)
    return redirect(url_for('index'))


@app.route('/favicon.ico')
def favicon():
    return send_from_directory(os.path.join(app.root_path, 'static/img'),
                               'favicon.ico', mimetype='image/vnd.microsoft.icon')
