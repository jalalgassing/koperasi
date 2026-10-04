/**
 * Placeholder generik untuk menu sidebar yang belum ada desainnya
 * (Trending, Haki Studio, Collective Purchase, dst). Supaya link di
 * sidebar tidak mati/404 sebelum desainnya siap.
 */
export default function DashboardComingSoon({ title }) {
  return (
    <div
      style={{
        border: "1.5px dashed var(--color-border)",
        borderRadius: "16px",
        minHeight: "320px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        gap: "8px",
        color: "var(--color-muted)",
      }}
    >
      <strong style={{ color: "var(--color-ink)", fontSize: "16px" }}>{title}</strong>
      <span style={{ fontSize: "14px" }}>Halaman ini masih dalam pengembangan.</span>
    </div>
  );
}
