const Router = require('koa-router')
const sendgrid = require("@sendgrid/mail");
sendgrid.setApiKey(process.env.SENDGRID_API)

const router = new Router({
  prefix: '/mails'
})

const submitQuery = async (ctx) => {
  ctx.body = sendgrid
    .send({
      templateId: process.env.SENDGRID_TEMPLATE_ID,
      to: ctx.request.body.email,
      from: "thakkarkishan097@gmail.com",
      dynamicTemplateData: {
        name: ctx.request.body.name
      }
    })
    .then((response) => {
      console.log(response);
      return "Mail sent successfully."
    });
  ctx.body="Response"
};

const status = async ctx => {
  ctx.body = "Running"
}

router.post('/submit_query', submitQuery)
router.get('/status', status)

module.exports = router