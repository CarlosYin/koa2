import path from 'path'

// 系统配置
export let System = {
  API_server_type: 'http://', // API服务器协议类型,包含"http://"或"https://"
  API_server_host: 'localhost', // API服务器暴露的域名地址,请勿添加"http://"
  API_server_port: '3004', // API服务器监听的端口号
  HTTP_server_type: 'http://', // HTTP服务器协议类型,包含"http://"或"https://"
  HTTP_server_host: 'www.XXX.com', // HTTP服务器地址,请勿添加"http://" （即前端调用使用的服务器地址，如果是APP请设置为 * ）
  HTTP_server_port: '65534', // HTTP服务器端口号
  System_country: 'zh-cn', // 所在国家的国家代码
  System_plugin_path: path.join(__dirname, './plugins'), // 插件路径
  Session_Key: 'RESTfulAPI', // 生产环境务必随机设置一个值
  db_type: 'mysql' // 数据库类型
}

//日志配置
export let LOG4Config = {
  //日志格式等设置
  appenders:
    {
      "rule-console": { "type": "console" },
      "errorLogger": {
        "type": "dateFile",
        "filename": path.join(__dirname, '../logs/error'),
        "pattern": "-yyyy-MM-dd-hh.log",
        "alwaysIncludePattern": true,
        "encoding": "utf-8",
        "maxLogSize": 1000,
        "numBackups": 3,
        "path": path.join(__dirname, '../logs')
      },
      "resLogger": {
        "type": "dateFile",
        "filename": path.join(__dirname, '../logs/response'),
        "pattern": "-yyyy-MM-dd-hh.log",
        "alwaysIncludePattern": true,
        "encoding": "utf-8",
        "maxLogSize": 1000,
        "numBackups": 3,
        "path": path.join(__dirname, '../logs')
      },
    },
  //供外部调用的名称和对应设置定义
  categories: {
    "default": { "appenders": ["rule-console"], "level": "all" },
    "resLogger": { "appenders": ["resLogger"], "level": "info" },
    "errorLogger": { "appenders": ["errorLogger"], "level": "error" },
    "http": { "appenders": ["resLogger"], "level": "info" }
  },
  "baseLogPath": path.join(__dirname, '../logs')
}

export let DB = {
  host: 'localhost', // 服务器地址
  port: 3306, // 数据库端口号
  username: 'admin', // 数据库用户名
  password: 'admin888', // 数据库密码
  database: 'development', // 数据库名称
  prefix: 'api_' // 默认"api_"
}

export let MongoDBUri = 'mongodb://test1:test1@39.107.104.119:3399/aodvod'

export let SendEmail = {
  service: 'smtp.abcd.com', // SMTP服务提供商域名
  username: 'postmaster%40abcd.com', // 用户名/用户邮箱
  password: 'password', // 邮箱密码
  sender_address: '"XX平台 👥" <postmaster@abcd.com>'
}

//全局变量
export let CONSTANT = {
  // 微信小程序ID
  WXPROGRAMAPPID: 'wx90387536af90c7db',
  WXPROGRAMAPPSECRET: 'f62ce7f8ce5fd155eda5b44f75b6e3a1',
  RETCODE: {
    DBERR: {
      code: 30000,
      msg: '30000错误'
    },
    TRYCATCHERR: {
      code: 40000,
      msg: '40000错误'
    },
    NOAPI: {
      msg: '不存在的接口！'
    },
    USER: {
      REGISTERED: {
        code: 20001,
        msg: '微信账号已绑定'
      },
      WXDECRYPT: {
        code: 20002,
        msg: '微信解密失败'
      },
      LOGINSUC: {
        code: 20003,
        msg: '欢迎光临!'
      },
      REGISTSUC: {
        code: 20004,
        msg: '欢迎光临!'
      },
      registErr: {
        code: 2004,
        msg: '注册失败!'
      }
    }
  }
}
