import { formatReceipt } from './receiptFormatter'; // if split into another file

export async function printReceipt(dynamicData) {
  try {
    if (!window.qz) {
      alert("QZ Tray not loaded.");
      return;
    }

    await qz.websocket.connect();
    const config = qz.configs.create(null); // Default printer
    const commands = formatReceipt(dynamicData);
    await qz.print(config, commands);
    await qz.websocket.disconnect();
  } catch (err) {
    console.error("Print Error:", err);
  }
}
