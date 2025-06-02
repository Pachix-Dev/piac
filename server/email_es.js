const email_es = ({ data }) => {
  return `
  <table align="center" role="presentation" border="0" cellpadding="0" cellspacing="0" style="max-width:680px;" >
    <tbody>
      <tr>
        <td colspan="2" align="center>
          <img src="https://www.piac.org.mx/wp-content/uploads/2020/12/Logo-PIAC_sinfondo_small-2.png" alt="Logo PIAC" width="200px">
        </td>
      </tr>
      <tr>
        <td colspan="2">
          <h2 style="text-align: center; margin:0; font-weight: bold; margin-top: 20px; margin-bottom: 10px;">
            COMENTARIOS PÁGINA PIAC
          </h2>
          <p style="margin:0; font-weight: none;">
            Estimado equipo PIAC, <BR /> <BR />
            Les comparto algunos comentarios enviados desde el correo
            <span style="font-weight: none; font-style: italic; margin-top: 7px; maring-bottom: 7px;color:#367AE0">${data.email}</span>
          </p>
          <h3 style="font-weight: none;">
            Tema: 
            <span style="color:#367AE0; font-style: italic;">${data.topic}</span> <BR />
            Comentario: <BR />
          </h3>
          <div style="font-style: italic; font-size: 16px; margin-top: 10px; margin-bottom: 20px; text-align: justify;">
            ${data.about}
          </div>
          <p style="font-size:14px; font-weight:none; line-height:15px;color:#70A5EB;text-align:center">
            Por favor, no respondan a este correo electrónico
          </p>
        </td>
      </tr>
      <tr>
        <td colspan="2">
          <hr style="width:100%;border-top:1px solid rgb(214,216,219);border-right:none rgb(214,216,219);border-bottom:none rgb(214,216,219);border-left:none rgb(214,216,219);margin:30px 0px">
          <p style="font-size:12px;line-height:15px;margin:4px 0px;color:rgb(145,153,161);text-align:center">
            © 2025 PIAC. Patronato de la Industria Alemana para la Cultura es una Asociación Civil.
          </p>
        </td>
      </tr>
    </tbody>
  </table>
  `;
};

export { email_es };
