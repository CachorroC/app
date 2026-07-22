type MailContent = {
  subject: string;
  text   : string;
  html   : string;
};

function wrap(
  titulo: string, cuerpoHtml: string, cta: { label: string; href: string } 
): string {
  return `<!doctype html>
<html lang="es">
  <body style="margin:0;padding:0;background:#fdfbff;font-family:'Quicksand',system-ui,sans-serif;color:#1b1b21;">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="padding:32px 16px;">
      <tr>
        <td align="center">
          <table role="presentation" width="480" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:16px;padding:32px;">
            <tr><td style="font-size:1.05rem;font-weight:700;color:#1b1b21;padding-bottom:20px;">R&amp;S Asesoría Jurídica</td></tr>
            <tr><td style="font-size:1.25rem;font-weight:700;color:#1b1b21;padding-bottom:12px;">${ titulo }</td></tr>
            <tr><td style="font-size:0.95rem;line-height:1.55;color:#48454e;padding-bottom:24px;">${ cuerpoHtml }</td></tr>
            <tr>
              <td>
                <a href="${ cta.href }" style="display:inline-block;background:#6a4fa8;color:#ffffff;text-decoration:none;font-weight:600;padding:12px 24px;border-radius:999px;font-size:0.9rem;">${ cta.label }</a>
              </td>
            </tr>
            <tr><td style="font-size:0.75rem;color:#79757f;padding-top:28px;">Si usted no solicitó este correo, puede ignorarlo con seguridad.</td></tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>`;
}

export function verificationEmail(
  nombre: string, link: string 
): MailContent {
  const subject = 'Confirme su correo electrónico';
  const cuerpo = `Hola ${ nombre }, gracias por registrarse en la plataforma de la firma. Confirme su correo electrónico para activar su cuenta. Este enlace vence en 24 horas.`;

  return {
    subject,
    text: `${ cuerpo }\n\n${ link }`,
    html: wrap(
      subject, cuerpo, {
        label: 'Confirmar correo',
        href : link
      }
    ),
  };
}

export function passwordResetEmail(
  nombre: string, link: string 
): MailContent {
  const subject = 'Restablecer su contraseña';
  const cuerpo = `Hola ${ nombre }, recibimos una solicitud para restablecer su contraseña. Este enlace vence en 1 hora. Si usted no la solicitó, puede ignorar este correo.`;

  return {
    subject,
    text: `${ cuerpo }\n\n${ link }`,
    html: wrap(
      subject, cuerpo, {
        label: 'Restablecer contraseña',
        href : link
      }
    ),
  };
}
