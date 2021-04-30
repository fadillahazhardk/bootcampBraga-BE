const { BasicMessage } = require("../schema");
const nodemailer = require("nodemailer");

// UNTUK EMAIL AKU PAKE MAILTRAP HEHE
async function routes(fastify, options) {
  let transporter = nodemailer.createTransport({
    host: "smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: "1c72e29f35df39",
      pass: "690c0d2ddd0d8f"
    }
  });

  fastify.post(
    "/",
    {
      schema: {
        tags: ["Mailer"],
        body: {
          type: "object",
          properties: {
            name: { type: "object", properties: { value: { type: "string" } } },
            email: {
              type: "object",
              properties: { value: { type: "string" } },
            },
            subject: {
              type: "object",
              properties: { value: { type: "string" } },
            },
            message: {
              type: "object",
              properties: { value: { type: "string" } },
            },
          },
        },
        response: {
          "5xx": { ...BasicMessage, description: "Failed response" },
        },
      },
    },
    async (req, reply) => {
      try {
        const {
          name: { value: nameValue },
          email,
          subject,
          message,
        } = req.body;

        let info = await transporter.sendMail({
          from: `Braga Email Service <admin@gmail.com}>`,
          to: "fadillahazhar74@gmail.com",
          subject: subject.value,
          text: `You got a message from ${nameValue} (${email.value}). The message is : ${message.value}`,
        });

        reply.send(`Message sent: ${info.messageId}`);
      } catch (err) {
        return err;
      }
    }
  );
}

module.exports = routes;
