import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import MIcon, { Clover } from "../components/MIcons.jsx";
import MemberQR from "../components/MemberQR.jsx";
import ShareSheet from "../components/ShareSheet.jsx";
import ScannerModal from "../components/ScannerModal.jsx";
import useToast from "../components/Toast.jsx";
import useMe from "../useMe.js";
import useT from "../i18n.js";
import { logActivity } from "../../services/activityLog.js";
import useMemberRelations from "../../hooks/useMemberRelations.js";
import logo from "../../assets/images/logo.png";

async function copyText(text) {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    try {
      const ta = document.createElement("textarea");
      ta.value = text; ta.style.position = "fixed"; ta.style.opacity = "0";
      document.body.appendChild(ta); ta.select();
      const ok = document.execCommand("copy");
      ta.remove();
      return ok;
    } catch { return false; }
  }
}

export default function MobileMemberId() {
  const me = useMe();
  const t = useT();
  const location = useLocation();
  const { favorites } = useMemberRelations();
  const [toastNode, toast] = useToast();
  const [copied, setCopied] = useState(false);
  const [sharing, setSharing] = useState(false);
  const [scanning, setScanning] = useState(false);

  // Dari shortcut "Scan QR" di Home: langsung buka scanner
  useEffect(() => { if (location.state?.scan) setScanning(true); }, [location.state]);

  // Yang di-copy = link halaman kartu anggota ini (sama persis dengan isi QR),
  // jadi siapa pun yang membukanya sampai ke kartu anggota kita.
  const onCopy = async () => {
    const ok = await copyText(me.url);
    toast(ok ? "Member ID link copied" : "Could not copy the link");
    if (ok) { logActivity("Copied your member ID link", "link"); setCopied(true); setTimeout(() => setCopied(false), 2000); }
  };

  return (
    <div className="m-mid">
      <Clover className="m-mid__clover m-mid__clover--a" size={26} color="#e7edeb" />
      <Clover className="m-mid__clover m-mid__clover--b" size={92} color="#e7edeb" />
      <Clover className="m-mid__clover m-mid__clover--c" size={16} color="#e7edeb" />
      <Clover className="m-mid__clover m-mid__clover--d" size={52} color="#e7edeb" />

      <section className="m-mid__card">
        <button type="button" className="m-mid__scan" onClick={() => setScanning(true)} aria-label="Scan another member's QR">
          <MIcon name="scan" size={22} />
        </button>
        <h2>{me.name}</h2>
        <MemberQR value={me.url} size={216} className="m-mid__qr" />
        <p className="m-mid__number">{me.display}</p>
        <img className="m-mid__logo" src={logo} alt="Parakarsa" />
      </section>

      <div className="m-mid__actions">
        <button type="button" className="m-mid__btn" onClick={onCopy}>
          <MIcon name={copied ? "check" : "link"} size={30} />
          <span>{copied ? t("mid.copied") : t("mid.copy")}</span>
        </button>
        <button type="button" className="m-mid__btn" onClick={() => setSharing(true)}>
          <MIcon name="share" size={30} />
          <span>{t("mid.share")}</span>
        </button>
      </div>

      {toastNode}
      {sharing && <ShareSheet me={me} favorites={favorites} toast={toast} onClose={() => setSharing(false)} />}
      {scanning && <ScannerModal onClose={() => setScanning(false)} />}
    </div>
  );
}
