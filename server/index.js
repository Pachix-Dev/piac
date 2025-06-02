// import routes
import express from "express";
import { Resend } from "resend";
import "dotenv/config";
import cors from "cors";
import { email_es } from "./email_es.js";
import { email_en } from "./email_en.js";

//variables de entorno
const app = express();
const port = process.env.PORT || 3010;
const resend = new Resend(process.env.RESEND_API_KEY);

// middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: (origin, callback) => {
      const ACCEPTED_ORIGINS = process.env.ACCEPTED_ORIGINS.split(",");

      if (ACCEPTED_ORIGINS.includes(origin)) {
        return callback(null, true);
      }
      if (!origin) {
        return callback(null, true);
      }
      return callback(new Error("Not allowed by CORS"));
    },
  })
);

//endpoints
app.post("/sendEmail", async (req, res) => {
  const { body } = req;

  try {
    const mailResponse = await sendEmail(body);

    if (!mailResponse.status) {
      return res.status(500).send({
        mailResponse,
      });
    }

    res.status(200).json(mailResponse);
  } catch (error) {
    res.status(500).json({
      status: false,
      message: "Ups, algo salió mal, intentalo de nuevo",
      message_en: "Ups, something went wrong, try again",
    });
  }
});

//funciones
async function sendEmail(data) {
  try {
    const emailContent =
      data.currentLanguage === "es"
        ? await email_es({ data })
        : await email_en({ data });

    await resend.emails.send({
      from: "PIAC <noreply@piac.org.mx>",
      //to: 'contacto@piac.org.mx',
      to: "aidee.casillas@igeco.mx",
      subject: "Sección Comentarios de PIAC - " + data.topic,
      html: emailContent,
      attachments: [],
      headers: {
        "Reply-To": data.email,
      },
    });

    return {
      status: true,
      message:
        "Gracias por ponerte en contacto, te responderemos lo antes posible",
      message_en:
        "Thanks for contacting us, we will get back to you as soon as possible",
    };
  } catch (error) {
    return {
      status: false,
      message: "Error al enviar el correo, intentalo de nuevo",
      message_en: "Error sending the email, try again",
    };
  }
}

//puerto del servidor
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
