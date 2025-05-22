export function useSplitHostname(hostname) {
  const parts = hostname.split(".");
  if (parts[0] === "www") {
    parts.shift();
  }
  const subdomain = parts[0];
  let isDomain = 1;
  if (["localhost", "busibuy", "busilink"].includes(subdomain)) {
    return false;
  }
  if (parts[1] && ["localhost", "busibuy", "busilink"].includes(parts[1])) {
    isDomain = 0;
  }
  return { subdomain, isDomain };
}
