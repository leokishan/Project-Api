if(process.env.NODE_ENV !=="production"){
  require('dotenv').config()
}
const koa = require('koa')
const bodyParser = require('koa-bodyparser');
const cors = require('@koa/cors');
const {mailRoutes} = require('./routes')

const APP_PORT = process.env.PORT || 8000
const app = new koa()
app.use(cors({
  origin: "*",
  allowHeaders: ["APP_TOKEN", "content-type"]
}));
app.use(bodyParser());

app.use(async (ctx, next) => {
  if(process.env.secret !== ctx.request.header['app_token']){
    ctx.status = 401
    ctx.body = "Unauthorized access."
  } else{
    await next()
  }
})

app.use(mailRoutes.routes())

app.on('error', err => {
  console.log(err);
});

app.listen(APP_PORT)