export function normalizeUrl(src: string) {
  const baseUrl = process.env.NEXT_PUBLIC_URL_SHOP_API;

  if (src.slice(0, 4) === "http") {
    return new URL(src);
  } else {
    return new URL(`${baseUrl}/${src[0] === "/" ? src.slice(1) : src}`);
  }
}


export default function VendureImageLoader({
  src,
  width,
  quality,
}: {
  src: string;
  width: number;
  quality: number;
}) {
  const url = normalizeUrl(src);

  const params = url.searchParams;

  params.set("w", params.get("w") || width.toString());
  params.set("h", params.get("h") || width.toString());
  params.set("mode", "crop");
  params.set("format", "webp");

  return url.href;
}
