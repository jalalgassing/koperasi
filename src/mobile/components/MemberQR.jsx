import { useMemo } from "react";
import QRCode from "qrcode";

// QR asli (bisa discan kamera HP maupun scanner di app ini). Dirender sebagai
// satu <path> SVG supaya ringan dan tajam di semua ukuran layar.
// Warna modul gelap (#2f5a50) di atas putih -> kontras tinggi, aman discan.
export default function MemberQR({ value, size = 220, dark = "#2f5a50", quiet = 0, className = "", ...rest }) {
  const { count, d } = useMemo(() => {
    const qr = QRCode.create(value, { errorCorrectionLevel: "M" });
    const n = qr.modules.size;
    const data = qr.modules.data;
    let path = "";
    for (let y = 0; y < n; y++) {
      let x = 0;
      while (x < n) {
        if (data[y * n + x]) {
          let run = 1;
          while (x + run < n && data[y * n + x + run]) run++;
          path += `M${x + quiet} ${y + quiet}h${run}v1h-${run}z`;
          x += run;
        } else x++;
      }
    }
    return { count: n + quiet * 2, d: path };
  }, [value, quiet]);

  return (
    <svg
      className={className}
      width={size}
      height={size}
      viewBox={`0 0 ${count} ${count}`}
      shapeRendering="crispEdges"
      role="img"
      aria-label="QR code member ID"
      {...rest}
    >
      <path d={d} fill={dark} />
    </svg>
  );
}
