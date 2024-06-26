import { VercelRequest, VercelResponse } from '@vercel/node'
import { Bot } from 'grammy'

const { BOT_TOKEN, BOT_URL } = process.env

export const bot = new Bot(BOT_TOKEN)

type IP = {
    result: string
    addr: string
    domains: string
}

type DDNSRequest = {
    ipv4: IP
    ipv6: IP
}

function buildOneIPResult(type: string, data: IP) {
    return `${type}: ${data.result}\nIP: ${data.addr}\nDomains: ${data.domains}\n`
}

export default async (req: VercelRequest, res: VercelResponse) => {
    const chatId = req.query['chatId'] as string
    let ddnsReq = JSON.stringify(req.body)
    
    // let text = ""
    // if (ddnsReq.ipv4) {
    //     text += buildOneIPResult('IPv4', ddnsReq.ipv4)
    // }

    // if (ddnsReq.ipv6) {
    //     text += buildOneIPResult('IPv6', ddnsReq.ipv6)
    // }

    await bot.api.sendMessage(chatId, ddnsReq)

    res.json({
        msg: 'works'
    })
}