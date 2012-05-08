# -*- coding: utf-8 -*-

import datetime
from flask import url_for, flash
from . import db
import callbbs


class User(db.Document):
    name = db.StringField(max_length=255, required=True)
    name_lower = db.StringField(max_length=255, required=True)
    created_at = db.DateTimeField(default=datetime.datetime.now, required=True)
    identity = db.StringField(max_length=25, required=True)
    other_names = db.ListField(db.StringField(max_length=255))

    def __unicode__(self):
        return self.name

    @staticmethod
    def login_bbs(username, password):
        if not callbbs.validate_password(username, password):
            flash(u'<strong>错误！</strong>用户名或密码不正确，或者已经超过最大重试次数。')
            return False
        if User.objects(name_lower=username.lower()).count() == 1:
            return True
        print 'not implement'
        return False


class Comment(db.EmbeddedDocument):
    created_at = db.DateTimeField(default=datetime.datetime.now, required=True)
    body = db.StringField(verbose_name="Comment", required=True)
    author = db.ReferenceField(User)
    votes = db.ListField(db.ReferenceField(User))


class Topic(db.Document):
    title = db.StringField(max_length=255, required=True)
    slug = db.StringField(max_length=255, required=True)
    body = db.StringField(required=True)
    comments = db.ListField(db.EmbeddedDocumentField(Comment))

    def get_absolute_url(self):
        return url_for('topic', kwargs={"slug": self.slug})

    def __unicode__(self):
        return self.title
