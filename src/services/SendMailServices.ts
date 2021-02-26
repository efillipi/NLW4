import nodemailer, { Transporter } from 'nodemailer'
import handlebars from 'handlebars'
import fs from 'fs'

interface SendMailData {
    to: string;

    subject: string;

    variables: object;

    patch: string;
}


class SendMailServices {

    private client: Transporter

    constructor() {
        nodemailer.createTestAccount().then(
            account => {
                const transporter = nodemailer.createTransport({
                    host: account.smtp.host,
                    port: account.smtp.port,
                    secure: account.smtp.secure,
                    auth: {
                        user: account.user,
                        pass: account.pass
                    }
                });

                this.client = transporter
            }
        )

    }

    async execute({ to, subject, variables, patch }: SendMailData) {

        const templateFileContent = fs.readFileSync(patch).toString("utf8")

        const mailTemplateParse = handlebars.compile(templateFileContent)

        const html = mailTemplateParse(variables)

        const message = await this.client.sendMail({
            to,
            subject,
            html,
            from: "NPS <noreplay@nps.com.br>"

        })

        console.log('Message sent: %s', message.messageId);
        console.log('Preview URL: %s', nodemailer.getTestMessageUrl(message));
    };

}




export default new SendMailServices;