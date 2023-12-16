const { Resend } = require("resend");

const resend = new  Resend("re_8o4eUBG4_5yTkunqSHo41gt98MbLkQtah")

(async function(){
    try {
        const data = await resend.emails.send({
            from: "Acme <IDECTiemposdeGloria.dev>",
            to: "estudiosrg5@gmail.com",
            subject: "",
            html: "<strong></strong>",
        })
        console.log(data);
    } catch (error) {
        console.error(error);
    }
})