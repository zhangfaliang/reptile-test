require("core-js");
const Koa = require('koa');
const superagent = require('superagent');
const cheerio = require('cheerio')

const app = new Koa();
const port = 8000
    // superagent
    //   .post('/api/pet')
    //   .send({ name: 'Manny', species: 'cat' }) // sends a JSON post body
    //   .set('X-API-Key', 'foobar')
    //   .set('accept', 'json')
    //   .end((err, res) => {
    //     console.log(res)
    //   });

 
// response
app.use( async ctx => {
    try {
        const res = await superagent.get('https://www.weibo.com/mygroups?gid=3865919329213366&wvr=6&leftnav=1');
        console.log(res);
    } catch (err) {
        console.error(err);
    }
    ctx.body = 'Hello Koa';
});

app.listen(port);