const http = require('http')
const fetch = require('node-fetch')
const cheerio = require('cheerio');

const getRates = (html) => {
	const $ = cheerio.load(html)
    return $('.rate-content-cash.text-right.print_table-cell')
	    .filter((index) => {
	      return index % 2 && index < 14
	    })
	    .map((index, obj) => {
	      return $(obj).text()
	    })
	    .get()
}

const getData = () =>
	fetch('http://rate.bot.com.tw/xrt/quote/ltm/JPY').then(res => res.text())

http.createServer(async (req, res) => {
	console.log(getRates(await getData()))
	res.end()
}).listen(3000)
