import KoaRouter from 'koa-router'
import controllers from '../controllers/index.js'
import validate from 'koa2-validation'

import { loginValidation } from '../validation/wechatSmallProgramParams'
const router = new KoaRouter()

const wechatSmallProgram = '/api/wechat_smallprogram/'

router
  .get('/public/get', function (ctx, next) {
    ctx.body = '禁止访问！'
  }) // 以/public开头则不用经过权限认证
  .all('/upload', controllers.upload.default)
  .get('/api/:name', controllers.api.Get)
  .post('/api/:name', controllers.api.Post)
  .put('/api/:name', controllers.api.Put)
  .del('/api/:name', controllers.api.Delect)
  .all('/auth/:action', controllers.auth.Post)

  // 小程序相关路由
  .all(`${wechatSmallProgram}user/login`, validate(loginValidation), controllers.usercontroller.login)

module.exports = router
