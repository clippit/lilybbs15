# -*- coding: utf-8 -*-

import os
from flask import Blueprint, flash, render_template, request, abort, redirect, send_from_directory, session, url_for
from . import app
from models import *

topic = Blueprint('topics', __name__, template_folder='templates/topics')


@topic.before_request
def login_required():
    if 'logged_name' not in session:
        flash(u'请先登录。')
        return redirect(url_for('login', next=request.url))


@topic.route('/')
def topics():
    topics = Topic.objects.all()
    return render_template('topic_index.html', topics=topics)


@topic.route('/<slug>/')
def show(slug):
    topic = Topic.objects.get_or_404(slug=slug)
    current_user = session['logged_name'].lower()
    voted = [c.cid for c in topic.comments if current_user in c.votes]
    return render_template('topic_detail.html', topic=topic, voted=voted)


@topic.route('/<slug>/voteup', methods=['POST'])
def voteup(slug):
    if not request.is_xhr:
        abort(405)
    cid = request.form.get('cid', None)
    if cid is None:
        abort(400)
    topic = Topic.objects.get_or_404(slug=slug)
    current_user = session['logged_name'].lower()
    for comment in topic.comments:
        if str(comment.cid) == cid and current_user not in comment.votes:
            comment.votes.append(current_user)
            topic.save()
            return 'ok'
            break
    abort(404)


@app.route('/')
def index():
    return render_template('index.html')


@app.route('/login/', methods=['GET', 'POST'])
def login():
    redirect_url = request.args.get('next', url_for('index'))
    if 'logged_name' in session:
        return redirect(redirect_url)
    if request.method == 'POST':
        if not User.login_bbs(request.form['username'], request.form['password']):
            flash(u'登录失败，请重试。')
        else:
            session['logged_name'] = request.form['username']
            return redirect(redirect_url)

    return render_template('login.html')


@app.route('/logout/')
def logout():
    session.pop('logged_name', None)
    return redirect(url_for('index'))


@app.route('/favicon.ico')
def favicon():
    return send_from_directory(os.path.join(app.root_path, 'static/img'),
                               'favicon.ico', mimetype='image/vnd.microsoft.icon')
