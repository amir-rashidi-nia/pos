export function useTitleFavicon(iconUrl, title) {
  if (import.meta.client) {
    document.title = `${title}`;
    const elements = document?.head.querySelectorAll(`link[rel*="icon"]`);
    if (!elements || elements.length === 0) {
      const link = document?.createElement("link");

      if (link) {
        link.rel = "icon";
        link.href = iconUrl;
        link.type = `image/png`;
        document?.head.append(link);
      }
      return;
    }
    elements?.forEach((el) => (el.href = iconUrl));
  }
}
