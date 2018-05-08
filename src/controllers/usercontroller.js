import User from '../models/usermodel.js'
import koa2Req from 'koa2-request'
import WXBizDataCrypt from '../lib/WXBizDataCrypt'
import { RetBase } from '../tool/Common'
import { CONSTANT } from '../config'

const REGISTERED = CONSTANT.RETCODE.USER.REGISTERED
const LOGINSUC = CONSTANT.RETCODE.USER.LOGINSUC
const REGISTSUC = CONSTANT.RETCODE.USER.REGISTSUC
const DBERR = CONSTANT.RETCODE.USER.DBERR
const TRYCATCHERR = CONSTANT.RETCODE.TRYCATCHERR

/**
 * 用户登录
 * @api {POST} /api/wechat_smallprogram/user/login 用户登录
 * @apiDescription 微信小程序用户登录--自动注册
 * @apiName login
 * @apiParam (path参数) {String} code 微信code——必填
 * @apiParam (path参数) {String} encryptedData 用户加密信息——必填
 * @apiParam (path参数) {String} iv  用户加密iv——必填
 * @apiSampleRequest /api/wechat_smallprogram/user/login
 * @apiGroup /user
 * @apiVersion 0.0.1
 */
export let login = async (ctx) => {
  let _body = {}
  try {
    const { code = '', encryptedData = '', iv = '' } = ctx.request.body
    const AppID = CONSTANT.WXPROGRAMAPPID
    const AppSecret = CONSTANT.WXPROGRAMAPPSECRET
    const uri = `https://api.weixin.qq.com/sns/jscode2session?appid=${AppID}&secret=${AppSecret}&js_code=${code}&grant_type=authorization_code`
    const res = await koa2Req(uri)
    const wxBack = res.body || '{}'
    const JsonWXBack = JSON.parse(wxBack)
    const sessionkey = JsonWXBack.session_key || ''
    const WXBizDCrypt = new WXBizDataCrypt(AppID, sessionkey)
    const WXUserInfo = WXBizDCrypt.decryptData(encryptedData, iv)
    const user = new User({
      openId: WXUserInfo.openId,
      nickName: WXUserInfo.nickName,
      gender: WXUserInfo.gender,
      city: WXUserInfo.city,
      province: WXUserInfo.province,
      country: WXUserInfo.country,
      avatarUrl: WXUserInfo.avatarUrl
    })
    let _users = await User.findByOpenId(WXUserInfo.openId)
    if (_users.length > 0) _body = RetBase(LOGINSUC, { user: _users[0] })
    else {
      let _registBack = await user.save()
        .then(savedUser => { return { code: 200, user: savedUser } })
        .catch(e => { return { code: 400, errcode: e } })
      _registBack.code == 400 ? _body = RetBase(REGISTSUC, { user: _registBack.user }) : _body = RetBase(DBERR, { errcode: _registBack.errcode })
    }
  } catch (ex) {
    _body = RetBase(TRYCATCHERR, { errcode: ex })
  }

  ctx.body = _body
}


/**
 * 问题22
 * @api {POST} /api/wechat_smallprogram/user/regist 问题
 * @apiDescription 微信小程序用户登录--自动注册
 * @apiName regist
 * @apiParam (path参数) {String} code 微信code——必填
 * @apiParam (path参数) {String} encryptedData 用户加密信息——必填
 * @apiParam (path参数) {String} iv  用户加密iv——必填
 * @apiSampleRequest /api/wechat_smallprogram/user/regist
 * @apiGroup wechat_smallprogram/querstion
 * @apiVersion 0.0.1
 */
export let regist = async (ctx) => {
  ctx.body = _body
}