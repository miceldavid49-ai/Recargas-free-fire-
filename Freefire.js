// Archivo: api/get-player.js
export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST');

  const { id } = req.query;

  if (!id) {
    return res.status(400).json({ success: false, error: 'Debes ingresar un ID válido' });
  }

  try {
    // Petición al endpoint de PagoStore / Garena
    const response = await fetch('https://shop.garena.sg/api/auth/player_id_login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)'
      },
      body: JSON.stringify({
        app_id: 100067, // ID de la aplicación oficial de Free Fire
        login_id: id
      })
    });

    const data = await response.json();

    if (data && data.nickname) {
      return res.status(200).json({
        success: true,
        nickname: data.nickname
      });
    } else {
      return res.status(404).json({
        success: false,
        error: 'El ID ingresado no existe en PagoStore'
      });
    }
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: 'Error al conectar con PagoStore'
    });
  }
}
