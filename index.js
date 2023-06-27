const axios = require('axios')
const fs = require('fs')
const cheerio = require('cheerio') // 类似jq，在node环境下操作dom

axios.get('https://www.baidu.com/s?wd=上海家化1', {
    headers: {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/59.0.3071.115 Safari/537.36",
	"Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
	"Accept-Language": "zh-CN,zh;q=0.9,en-US;q=0.8,en;q=0.7",
	"Connection": "keep-alive",
	"Accept-Encoding": "gzip, deflate, br",
	"Host": "www.baidu.com",
        "Cookie": `PSTM=1676795753; BIDUPSID=CFD6B07A74BE19FD2DFA90C6061F6AF2; BAIDUID=5228092D1E334287F8A0D84F1F0BE5C8:SL=0:NR=10:FG=1; BD_UPN=12314753; MCITY=-265%3A; newlogin=1; BDORZ=B490B5EBF6F3CD402E515D22BCDA1598; sug=3; sugstore=1; ORIGIN=2; bdime=0; ab_sr=1.0.1_N2QzNDYzZjY3MjQ0NGM0YjVjYmZkNDkyYWNjZTQwZDM5Y2M2MDAxOGZkNzBjYmVlNTE5ZDRjMTE1M2U3NWEyNWJmZjE0MDk5YjY0MTlhNDc1MTU3NGE1MmNkYTU5OTNiNTY0NTAyNDdkMWI4MTNlMjU4ZDFjYjlhM2ZjNTllOGEzMzczYzlmNmM0MmYzMDExZmNhYmZmMWIzNzVkMDkxNTlmYWM5OTI2ZmRmOWFkMDdiYTM3YzQ1YTIwYjRkN2I0NjRjYWQzMDIyNmU4YjU0NzUxNTA0MTAwZWQwNjkzYzg=; H_PS_PSSID=36543_38860_38799_38957_38793_38841_38963_38916_38829_38839_38639_26350; H_PS_645EC=a2d2qxgc3eCHXCCX1y8dojxwIbz0UYISJPpAJg%2F43dbGqhvm22YP7aknObefSkGbO4ic; BAIDUID_BFESS=5228092D1E334287F8A0D84F1F0BE5C8:SL=0:NR=10:FG=1; WWW_ST=1687872555666`
    }
}).then(res => {
  	// 使用 cheerio 将页面内容解析为 dom 树
    const $ = cheerio.load(res.data)
    console.log(res)

    // 电影列表包含在一个类名为 article 的盒子里面，其中每一个电影包含在 类名为 item 的盒子里面
    // 因此，获取信息的逻辑如下：
    const items = Array.from($('.article .item'))
    items.forEach( item => {
        const title = $($($(item).find('.title'))[0]).text()
        const pic = $(item).find('.pic a').attr('href')
        const quote = $(item).find('.quote').text()?.trim()
        console.log({title, pic, quote})
    })
}).catch(e => console.log('error=', e))
