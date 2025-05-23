export function formatReceipt(data) {
  const lines = [];

  lines.push("\x1B\x40"); // Initialize printer
  lines.push(centerText(data.shopName.toUpperCase()));
  lines.push("-----------------------------");

  for (const item of data.items) {
    const name = item.name.padEnd(12, " ");
    const qty = `x${item.qty}`.padEnd(4, " ");
    const price = `$${(item.price * item.qty).toFixed(2)}`.padStart(8, " ");
    lines.push(`${name}${qty}${price}`);
  }

  lines.push("-----------------------------");
  lines.push(`Total:         $${data.total.toFixed(2)}`);
  lines.push("");
  lines.push(centerText(data.footer));
  lines.push("\n\n\n");
  lines.push("\x1D\x56\x41"); // Cut paper

  return lines;
}

function centerText(text) {
  const width = 32;
  const pad = Math.floor((width - text.length) / 2);
  return " ".repeat(pad) + text;
}
