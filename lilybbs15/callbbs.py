import poplib

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
