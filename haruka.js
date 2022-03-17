require('./settings/config.js')
const
	{
		WAConnection: _WAConnection,
		MessageType,
		Presence,
		MessageOptions,
		Mimetype,
		WALocationMessage,
		WA_MESSAGE_STUB_TYPES,
		WA_DEFAULT_EPHEMERAL,
		ReconnectMode,
		ProxyAgent,
		GroupSettingChange,
		waChatKey,
		mentionedJid,
		processTime,
	} = require("@adiwajshing/baileys")
const simple = require("./lib/simple.js");
const fs = require('fs')
const WAConnection = simple.WAConnection(_WAConnection);
const { banner, getBuffer, start, success } = require('./lib/functions')
const { color } = require('./lib/color')
const CFonts  = require('cfonts')
const { uploadImages } = require('./lib/uploadimage')

require('./command/case.js')
nocache('./command/case.js', module => console.log(`${module} is now updated!`))

const starts = async (nino = new WAConnection()) => {
    nino.logger.level = 'warn'
    nino.version = [2, 2143, 3]
    nino.browserDescription = [ 'nino-Bot', 'Chrome', '3.0' ]
	CFonts.say('nino', {
		font: 'block',
    	color: ['#ff9c00'],
    	align: 'center',
		})
	CFonts.say(`By Nino`, {
		font: 'console',
		align: 'center',
		gradient: ['red', 'magenta']
		})
		
    nino.on('qr', () => {
        console.log(color('[','white'), color('!','red'), color(']','white'), color(' Scan qr maks 20 detik sebelum qr expired'))
    })

    fs.existsSync('./session.json') && nino.loadAuthInfo('./session.json')
    nino.on('connecting', () => {
        start('2', 'Connecting...')
    })
    nino.on('open', () => {
        success('2', 'Connected')
    })
    await nino.connect({timeoutMs: 30*1000})
        fs.writeFileSync('./session.json', JSON.stringify(nino.base64EncodedAuthInfo(), null, '\t'))

    nino.on('chat-update', async (message) => {
        require('./command/case.js')(nino, message)
    })

	nino.on('group-participants-update', async (anu) => {
		console.log(anu)
		try {
						const sendButImage = async(id, text1, desc1, vid1, but = [], options = {}) => {
					them = vid1
					mediaxxaa = await nino.prepareMessage(id, them, MessageType.image, {thumbnail: Buffer.alloc(0)})
					imgmhan = mediaxxaa.message["ephemeralMessage"] ? mediaxxaa.message.ephemeralMessage : mediaxxaa
					const buttonMessages = {
						imageMessage: imgmhan.message.imageMessage,
						contentText: text1,
						footerText: desc1,
						buttons: but,
						headerType: 4
						}
					nino.sendMessage(id, buttonMessages, MessageType.buttonsMessage, options)
				}
						const mdata = await nino.groupMetadata(anu.jid)
						num = anu.participants[0]
						let v = nino.contacts[num] || { notify: num.replace(/@.+/, "") };
						anu_user = v.vname || v.notify || num.split("@")[0];
						try {
							ppmem = await nino.getProfilePicture(num);
							} catch (e) {
								ppmem = 'https://telegra.ph/file/9c220c7888ae88920ac33.jpg'
								}
						try {
							ppgc = await nino.getProfilePicture(anu.jid);
							} catch (e) {
								ppgc = 'https://telegra.ph/file/9c220c7888ae88920ac33.jpg'
								}
						let ppmem2 = await getBuffer(ppmem)
						let ppmem3 = await uploadImages(ppmem2)
						let ppgc2 = await getBuffer(ppgc)
						let ppgc3 = await uploadImages(ppgc2)
						let gakloo = [{
										"buttonId": `y`,
										"buttonText": {
											"displayText": "Welcome"
											},
										"type": "RESPONSE"
										}]
						if (anu.action == 'add' && !num.includes(nino.user.jid)) {						                                
							welcome = await getBuffer(`https://hadi-api.herokuapp.com/api/card/Welcome?nama=${encodeURI(anu_user)}&descriminator=Nino<&memcount=${encodeURI(mdata.participants.length)}&gcname=${encodeURI(mdata.subject)}&pp=${ppmem3}&bg=https://telegra.ph/file/6c1325b1428119d23baa8.jpg`)
							try{
							await sendButImage(mdata.id, `Welcome @${num.split('@')[0]}`, `By Nino`,welcome, [{"buttonId": `🤢`,"buttonText": {"displayText": "Welcome"},"type": "RESPONSE"}], {contextInfo: { mentionedJid: [num]}})
							} catch {
								await sendButImage(mdata.id, `Welcome @${num.split('@')[0]}`, `By Nino`,ppmem2, [{"buttonId": `🤢`,"buttonText": {"displayText": "Welcome"},"type": "RESPONSE"}], {contextInfo: { mentionedJid: [num]}})
														}
						} else if (anu.action == 'remove' && !num.includes(nino.user.jid)) {
							goodbye = await getBuffer(`https://hadi-api.herokuapp.com/api/card/Welcome?nama=${encodeURI(anu_user)}&descriminator=Nino<&memcount=${encodeURI(mdata.participants.length)}&gcname=${encodeURI(mdata.subject)}&pp=${ppmem3}&bg=https://telegra.ph/file/6c1325b1428119d23baa8.jpg`)
							try{                                            
							await sendButImage(mdata.id, `Sayonara @${num.split('@')[0]}`, `By Nino`,goodbye, [{"buttonId": `🤢`,"buttonText": {"displayText": "Sayonara"},"type": "RESPONSE"}], {contextInfo: { mentionedJid: [num]}})
							} catch {
								await sendButImage(mdata.id, `Sayonara @${num.split('@')[0]}`, `By Nino`,ppmem2, [{"buttonId": `🤢`,"buttonText": {"displayText": "Sayonara"},"type": "RESPONSE"}], {contextInfo: { mentionedJid: [num]}})
							}
							
						}
				} catch (e) {
					console.log('Error : %s', color(e, 'red'))
					}
		})

antidel = global.anti_delete
nino.on('message-delete', async (m) => {
if (m.key.remoteJid == 'status@broadcast') return
if (!m.key.fromMe && m.key.fromMe) return
if (antidel === false) return
m.message = (Object.keys(m.message)[0] === 'ephemeralMessage') ? m.message.ephemeralMessage.message : m.message
const jam = moment.tz('Asia/Jakarta').format('HH:mm:ss')
let d = new Date
let locale = 'id'
let gmt = new Date(0).getTime() - new Date('1 Januari 2021').getTime()
let weton = ['Pahing', 'Pon','Wage','Kliwon','Legi'][Math.floor(((d * 1) + gmt) / 84600000) % 5]
let week = d.toLocaleDateString(locale, { weekday: 'long' })
let calender = d.toLocaleDateString(locale, {
day: 'numeric',
month: 'long',
year: 'numeric'
})
const type = Object.keys(m.message)[0] 
nino.sendMessage(m.key.remoteJid, `*A N T I  - D E L E T E *

Name : @${m.participant.split("@")[0]}
Day :  ${week} ${calender}
Time : ${jam}
Type : ${type}`, MessageType.text, {quoted: m.message, contextInfo: {"mentionedJid": [m.participant]}})

nino.copyNForward(m.key.remoteJid, m.message, {quoted: falfaa})
})
antical = global.anticall     
nino.on('CB:action,,call', async json => {
if (antical === false) return
        const callerId = json[2][0][1].from;
        var vcard = 'BEGIN:VCARD\n' + 'VERSION:3.0\n' + 'FN:' + `${global.ownername}` + '\n' + `ORG:Creator ${global.botname}\n` + 'TEL;type=CELL;type=VOICE;waid=' + `${global.ownernumber}` + ':+' + `${global.ownernumber}` + '\n' + 'END:VCARD'
        nino.sendMessage(callerId, `*Sorry ${nino.user.name} can't receive calls.*\n*Call = Block!*`, MessageType.text)
        nino.sendMessage(callerId, { displayname: `${global.ownername}`, vcard: vcard}, MessageType.contact, {contextInfo: { externalAdReply:{title: `Creator ${setting.botname}`,body:"",previewType:"PHOTO",thumbnail: global.thumbnail ,sourceUrl:`https://wa.me/${global.ownernumber}?text=Assalamualaikum om, buka blokir saya`}}})
        await sleep(5000)
        await nino.blockUser(callerId, "add")
        })
}
	
/**
 * Uncache if there is file change
 * @param {string} module Module name or path
 * @param {function} cb <optional> 
 */
function nocache(module, cb = () => { }) {
    console.log('Module', `'${module}'`, 'is now being watched for changes')
    fs.watchFile(require.resolve(module), async () => {
        await uncache(require.resolve(module))
        cb(module)
    })
}

/**
 * Uncache a module
 * @param {string} module Module name or path
 */
function uncache(module = '.') {
    return new Promise((resolve, reject) => {
        try {
            delete require.cache[require.resolve(module)]
            resolve()
        } catch (e) {
            reject(e)
        }
    })
}

starts()
