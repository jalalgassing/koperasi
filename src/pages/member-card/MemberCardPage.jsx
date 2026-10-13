import { useState } from "react";
import "./MemberCardPage.css";

const member = {
  name: "Andika Putra",
  initials: "AP",
  number: "SAH-2026-001",
  role: "Anggota Koperasi",
  business: "UMKM Kuliner",
  joined: "12 Sep 2025",
  equityScore: 846,
  scoreGrowth: "+10%",
};

const auditLogs = [
  {
    date: "12 Sep 2025 · 10:30",
    activity: "Penerbitan Kartu Anggota",
    hash: "0x7a3f2e9c4b1...8d6f",
    status: "Terverifikasi",
  },
  {
    date: "15 Sep 2025 · 14:22",
    activity: "Pembaruan Data Profil",
    hash: "0x5b6d8f2a1c3...9e7a",
    status: "Terverifikasi",
  },
  {
    date: "20 Sep 2025 · 09:17",
    activity: "Transaksi Kolektif",
    hash: "0x9c2e1f4b7d6...3a8c",
    status: "Terverifikasi",
  },
];

function MiniIcon({ name, size = 20 }) {
  const common = {
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.8,
    strokeLinecap: "round",
    strokeLinejoin: "round",
    "aria-hidden": true,
  };

  const paths = {
    shield: (
      <>
        <path d="M12 22s8-4 8-11V5l-8-3-8 3v6c0 7 8 11 8 11Z" />
        <path d="m9 12 2 2 4-4" />
      </>
    ),
    copy: (
      <>
        <rect x="8" y="8" width="12" height="12" rx="2" />
        <path d="M16 8V5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h3" />
      </>
    ),
    download: (
      <>
        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
        <path d="m7 10 5 5 5-5M12 15V3" />
      </>
    ),
    user: (
      <>
        <circle cx="12" cy="8" r="4" />
        <path d="M5 21a7 7 0 0 1 14 0" />
      </>
    ),
    calendar: (
      <>
        <rect x="3" y="5" width="18" height="16" rx="2" />
        <path d="M16 3v4M8 3v4M3 10h18" />
      </>
    ),
    building: (
      <>
        <rect x="4" y="3" width="16" height="18" rx="2" />
        <path d="M9 21v-4h6v4M8 7h2M14 7h2M8 11h2M14 11h2" />
      </>
    ),
    box: (
      <>
        <path d="m12 3 9 5-9 5-9-5 9-5Z" />
        <path d="m3 8 9 5 9-5M3 8v9l9 5 9-5V8M12 13v9" />
      </>
    ),
    arrow: <path d="M5 12h14m-6-6 6 6-6 6" />,
    clock: (
      <>
        <circle cx="12" cy="12" r="9" />
        <path d="M12 7v5l3 2" />
      </>
    ),
  };

  return <svg {...common}>{paths[name] || paths.user}</svg>;
}

function QRPreview() {
  // Pola dekoratif untuk preview UI, bukan QR yang dapat dipindai.
  const cells = [
    "111111100101101111111",
    "100000101110101000001",
    "101110100011101011101",
    "101110101101001011101",
    "101110100110101011101",
    "100000101001101000001",
    "111111101010101111111",
    "000000001101100000000",
    "101101111000111010110",
    "011010001111000101101",
    "110111101001101110010",
    "001001011110010011100",
    "111010110011101101011",
    "000000001010010000000",
    "111111101101101111111",
    "100000101011001000001",
    "101110101110101011101",
    "101110100011001011101",
    "101110101101101011101",
    "100000100110001000001",
    "111111101011101111111",
  ];

  return (
    <div className="member-card__qr" aria-label="QR simulasi">
      {cells.join("").split("").map((cell, index) => (
        <span
          key={index}
          className={cell === "1" ? "member-card__qr-cell is-dark" : "member-card__qr-cell"}
        />
      ))}
    </div>
  );
}

export default function MemberCardPage() {
  const [copied, setCopied] = useState(false);
  const transactionHash = "0x7a3f2e9c4b1...8d6f";

  async function copyHash() {
    try {
      await navigator.clipboard.writeText(transactionHash);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      setCopied(false);
    }
  }

  function printCard() {
    window.print();
  }

  return (
    <section className="member-page">
      <div className="member-page__heading">
        <div>
          <span className="member-page__eyebrow">PROFIL ANGGOTA</span>
          <h2>Kartu Anggota</h2>
          <p>
            Kartu anggota digital dan ringkasan aktivitas keanggotaan koperasi
            Anda.
          </p>
        </div>

        <button
          type="button"
          className="member-page__print"
          onClick={printCard}
        >
          <MiniIcon name="download" size={17} />
          Cetak Kartu
        </button>
      </div>

      <div className="member-page__layout">
        <div className="member-page__primary">
          <article className="member-card">
            <div className="member-card__decoration member-card__decoration--one" />
            <div className="member-card__decoration member-card__decoration--two" />

            <div className="member-card__top">
              <div className="member-card__brand">
                <div className="member-card__brand-mark">P</div>
                <div>
                  <strong>ParaKarsa</strong>
                  <span>Koperasi Industri Kolektif</span>
                </div>
              </div>

              <span className="member-card__verified">
                <MiniIcon name="shield" size={15} />
                Terverifikasi*
              </span>
            </div>

            <div className="member-card__middle">
              <div className="member-card__identity">
                <div className="member-card__avatar">
                  <MiniIcon name="user" size={46} />
                </div>

                <div className="member-card__identity-info">
                  <h3>{member.name}</h3>
                  <p>{member.role}</p>

                  <span className="member-card__number-label">
                    Nomor Anggota
                  </span>
                  <strong className="member-card__number">
                    {member.number}
                  </strong>
                </div>
              </div>

              <div className="member-card__qr-wrap">
                <QRPreview />
                <span>QR Preview</span>
              </div>
            </div>

            <div className="member-card__bottom">
              <div className="member-card__detail">
                <MiniIcon name="building" size={21} />
                <div>
                  <span>Jenis Usaha</span>
                  <strong>{member.business}</strong>
                </div>
              </div>

              <div className="member-card__detail">
                <MiniIcon name="calendar" size={21} />
                <div>
                  <span>Bergabung Sejak</span>
                  <strong>{member.joined}</strong>
                </div>
              </div>

              <div className="member-card__detail">
                <MiniIcon name="shield" size={21} />
                <div>
                  <span>Equity Score</span>
                  <strong>
                    {member.equityScore}{" "}
                    <small>{member.scoreGrowth}</small>
                  </strong>
                </div>
              </div>
            </div>
          </article>

          <div className="member-chain">
            <div className="member-chain__icon">
              <MiniIcon name="box" size={23} />
            </div>

            <div className="member-chain__text">
              <strong>
                Pencatatan Blockchain
                <span className="member-chain__dot" />
              </strong>
              <p>
                Status dan hash di bawah ini merupakan data simulasi prototype.
              </p>
            </div>

            <button
              type="button"
              className="member-chain__copy"
              onClick={copyHash}
            >
              <span>{copied ? "Tersalin!" : "Salin Hash"}</span>
              <MiniIcon name="copy" size={17} />
            </button>
          </div>

          <section className="member-audit">
            <div className="member-section-heading">
              <div>
                <h3>Riwayat Audit</h3>
                <p>Contoh riwayat aktivitas anggota</p>
              </div>
              <span className="member-audit__count">
                {auditLogs.length} aktivitas
              </span>
            </div>

            <div className="member-audit__table-wrap">
              <table className="member-audit__table">
                <thead>
                  <tr>
                    <th>Tanggal & Waktu</th>
                    <th>Jenis Aktivitas</th>
                    <th>Transaction Hash</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {auditLogs.map((log) => (
                    <tr key={log.activity}>
                      <td>{log.date}</td>
                      <td className="member-audit__activity">
                        {log.activity}
                      </td>
                      <td className="member-audit__hash">{log.hash}</td>
                      <td>
                        <span className="member-audit__status">
                          <MiniIcon name="shield" size={13} />
                          {log.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <p className="member-audit__note">
              *Status verifikasi pada halaman ini hanya contoh tampilan dan
              belum membuktikan adanya transaksi blockchain sungguhan.
            </p>
          </section>
        </div>

        <aside className="member-page__secondary">
          <section className="member-panel">
            <div className="member-section-heading">
              <div>
                <h3>Status Kartu</h3>
                <p>Ringkasan data keanggotaan</p>
              </div>
            </div>

            <div className="member-timeline">
              <div className="member-timeline__item">
                <span className="member-timeline__marker">1</span>
                <div>
                  <strong>Data Anggota</strong>
                  <span>Data contoh telah dimuat</span>
                </div>
              </div>

              <div className="member-timeline__item">
                <span className="member-timeline__marker">2</span>
                <div>
                  <strong>Kartu Digital</strong>
                  <span>Preview kartu tersedia</span>
                </div>
              </div>

              <div className="member-timeline__item">
                <span className="member-timeline__marker member-timeline__marker--pending">
                  3
                </span>
                <div>
                  <strong>Blockchain</strong>
                  <span>Belum terhubung ke jaringan asli</span>
                </div>
              </div>
            </div>

            <div className="member-panel__hash">
              <MiniIcon name="box" size={22} />
              <div>
                <span>Transaction Hash</span>
                <strong>{transactionHash}</strong>
              </div>
            </div>
          </section>

          <section className="member-panel">
            <div className="member-section-heading">
              <div>
                <h3>Aksi Cepat</h3>
                <p>Kelola kartu digital Anda</p>
              </div>
            </div>

            <button
              type="button"
              className="member-action"
              onClick={printCard}
            >
              <span className="member-action__icon">
                <MiniIcon name="download" size={18} />
              </span>
              <span>Cetak / Simpan PDF</span>
              <MiniIcon name="arrow" size={17} />
            </button>

            <button
              type="button"
              className="member-action"
              onClick={copyHash}
            >
              <span className="member-action__icon">
                <MiniIcon name="copy" size={18} />
              </span>
              <span>{copied ? "Hash Tersalin" : "Salin Transaction Hash"}</span>
              <MiniIcon name="arrow" size={17} />
            </button>

            <div className="member-panel__info">
              <MiniIcon name="clock" size={18} />
              <p>
                Integrasi verifikasi dan pembaruan data anggota akan
                dikembangkan pada tahap backend.
              </p>
            </div>
          </section>

          <section className="member-score">
            <div className="member-score__top">
              <span>Equity Score</span>
              <MiniIcon name="shield" size={20} />
            </div>
            <strong>{member.equityScore}</strong>
            <div className="member-score__bar">
              <span />
            </div>
            <p>
              <b>{member.scoreGrowth}</b> perubahan pada data simulasi
            </p>
          </section>
        </aside>
      </div>
    </section>
  );
}