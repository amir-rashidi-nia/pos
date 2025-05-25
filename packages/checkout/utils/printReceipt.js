import qz  from 'qz-tray'; 

export async function printReceipt(receiptData) {
  try {
    
    if (!qz.websocket.isActive()) {
      console.log("QZ Tray is not connected. Attempting to connect...");
      await qz.websocket.connect();
      console.log("Connected to QZ Tray!");
    }


    const printer = await qz.printers.getDefault();
    if (!printer) {
      console.error("No printer found");
      return;
    }

    const config = qz.configs.create(printer, {
      rasterize: true,
      scaleContent: true,
      density: '203dpi',
      colorType: 'blackwhite'
    })
    await qz.print(config, [
      {
        type: 'image',
        format: 'base64',
        data: receiptData
      }
    ])
  } catch (err) {
    console.error("Print Error:", err);
  }
}