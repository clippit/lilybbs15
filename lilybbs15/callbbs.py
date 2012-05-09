# -*- coding: utf-8 -*-

from flask import flash
import httplib2
import poplib
from random import randint
import re
from urllib import urlencode

BBS_SERVER = 'bbs.nju.edu.cn'


def validate_password(username, password):
    bbs = poplib.POP3(BBS_SERVER)
    try:
        bbs.user(username)
        bbs.pass_(password)
    except poplib.error_proto:
        ret = False
    except Exception:
        pass
    else:
        ret = True
    finally:
        bbs.quit()
    return ret


def find_identity(username, password):
    def parse_cookies(s):
        pos_N = s.find('N')
        pos_plus = s.rfind('+')
        _U_NUM = str(int(s[: pos_N]) + 2)
        _U_UID = s[pos_N + 1: pos_plus]
        _U_KEY = str(int(s[pos_plus + 1:]) - 2)
        return "_U_NUM=%s; _U_UID=%s; _U_KEY=%s" % (_U_NUM, _U_UID, _U_KEY)

    h = httplib2.Http()
    vd = randint(10000, 99999)
    re_cookies = re.compile(r"Net\.BBS\.setCookie\('([^']+)'\)")
    re_identity = re.compile(ur"有以 (.+) 实名")
    re_others = re.compile(ur"userid=([^>]+)")
    login_url = "http://%s/vd%d/bbslogin?type=2" % (BBS_SERVER, vd)
    identity_url = "http://%s/vd%d/bbsidreal" % (BBS_SERVER, vd)
    login_data = {'id': username, 'pw': password, 'lasturl': ''}

    # Login
    try:
        resp, content = h.request(login_url, "POST", urlencode(login_data))
    except:
        flash(u'抱歉，网络故障，请稍候重试。')
        return None, None

    # Set Cookies
    search_cookies = re_cookies.search(content)
    if search_cookies:
        headers = {'Cookie': parse_cookies(search_cookies.group(1))}
    else:
        flash(u'抱歉，出现错误，请稍候重试。')
        return None, None

    # Access bbsidreal page and get identity
    try:
        resp, content = h.request(identity_url, 'GET', headers=headers)
        content = unicode(content.decode('GBK', 'ignore'))
    except:
        flash(u'抱歉，获取帐号信息失败，请稍候重试。')
        return None, None

    search_identity = re_identity.search(content)
    if search_identity:
        identity = search_identity.group(1)
    else:
        flash(u'此帐号未经实名认证。')
        return None, None
    search_others = re_others.findall(content)
    if search_others:
        other_names = filter(lambda s: s != username.lower(), map(lambda s: s.lower(), search_others))

    return identity, other_names
