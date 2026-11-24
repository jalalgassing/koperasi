import { useCallback, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import jsQR from "jsqr";
import MIcon from "./MIcons.jsx";
import { parseMemberQr } from "../../utils/memberId.js";

/**
 * Scanner QR member ID (kamera belakang + decode jsQR). Kalau QR valid,
 * langsung menuju halaman kartu anggota orang tersebut. Ada jalur cadangan
 * "pilih dari galeri" untuk perangkat/browser yang kameranya tidak bisa
 * dipakai (kamera butuh HTTPS atau localhost).
 */
export default function ScannerModal({ onClose }) {
  const navigate = useNavigate();
  const videoRef = useRef(null);
  const canvasRef = useRef(document.createElement("canvas"));
  const streamRef = useRef(null);
  const rafRef = useRef(0);
  const doneRef = useRef(false);
  const [status, setStatus] = useState("Starting camera…");
  const [error, setError] = useState("");

  const handleText = useCallback((text) => {
    const found = parseMemberQr(text);
    if (!found) {
      setError("This QR is not a Parakarsa member ID.");
      return false;
    }
    doneRef.current = true;
    const q = found.name ? `?name=${encodeURIComponent(found.name)}` : "";
    onClose();
    navigate(`/main/member-card/${found.memberId}${q}`);
    return true;
  }, [navigate, onClose]);

  const stop = useCallback(() => {
    cancelAnimationFrame(rafRef.current);
    streamRef.current?.getTracks().forEach((t) => t.stop());
    streamRef.current = null;
  }, []);

  useEffect(() => {
    let cancelled = false;
    let last = 0;

    const loop = (t) => {
      if (cancelled || doneRef.current) return;
      rafRef.current = requestAnimationFrame(loop);
      if (t - last < 120) return; // ~8x per detik cukup & hemat baterai
      last = t;
      const v = videoRef.current;
      if (!v || v.readyState < 2 || !v.videoWidth) return;
      const scale = Math.min(1, 640 / v.videoWidth);
      const w = Math.round(v.videoWidth * scale);
      const h = Math.round(v.videoHeight * scale);
      const c = canvasRef.current;
      c.width = w; c.height = h;
      const ctx = c.getContext("2d", { willReadFrequently: true });
      ctx.drawImage(v, 0, 0, w, h);
      const code = jsQR(ctx.getImageData(0, 0, w, h).data, w, h, { inversionAttempts: "attemptBoth" });
      if (code?.data) handleText(code.data);
    };

    (async () => {
      if (!navigator.mediaDevices?.getUserMedia) {
        setStatus("");
        setError("Camera is not available here (needs HTTPS or localhost). Use “Choose from gallery” instead.");
        return;
      }
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: { ideal: "environment" } }, audio: false });
        if (cancelled) return stream.getTracks().forEach((t) => t.stop());
        streamRef.current = stream;
        const v = videoRef.current;
        v.srcObject = stream;
        await v.play();
        setStatus("Point the camera at a member ID QR");
        rafRef.current = requestAnimationFrame(loop);
      } catch (e) {
        setStatus("");
        setError(e?.name === "NotAllowedError" ? "Camera permission was denied. Allow it in your browser, or choose from gallery." : "Could not open the camera. Choose from gallery instead.");
      }
    })();

    return () => { cancelled = true; stop(); };
  }, [handleText, stop]);

  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  const onFile = (e) => {
    const file = e.target.files?.[0];
    e.target.value = "";
    if (!file) return;
    const img = new Image();
    img.onload = () => {
      const c = canvasRef.current;
      const scale = Math.min(1, 1200 / Math.max(img.width, img.height));
      c.width = Math.round(img.width * scale);
      c.height = Math.round(img.height * scale);
      const ctx = c.getContext("2d", { willReadFrequently: true });
      ctx.drawImage(img, 0, 0, c.width, c.height);
      const code = jsQR(ctx.getImageData(0, 0, c.width, c.height).data, c.width, c.height, { inversionAttempts: "attemptBoth" });
      URL.revokeObjectURL(img.src);
      if (code?.data) handleText(code.data);
      else setError("No QR code found in that image.");
    };
    img.onerror = () => setError("Could not read that image.");
    img.src = URL.createObjectURL(file);
  };

  return (
    <div className="m-scan" role="dialog" aria-modal="true" aria-label="Scan member ID">
      <video ref={videoRef} className="m-scan__video" playsInline muted />
      <div className="m-scan__shade" />
      <button type="button" className="m-scan__close" onClick={onClose} aria-label="Close scanner"><MIcon name="close" size={22} /></button>
      <div className="m-scan__frame" aria-hidden="true"><i /><i /><i /><i /></div>
      <div className="m-scan__bottom">
        {error ? <p className="m-scan__error">{error}</p> : <p>{status}</p>}
        <label className="m-scan__gallery">
          <MIcon name="image" size={18} /> Choose from gallery
          <input type="file" accept="image/*" onChange={onFile} hidden />
        </label>
      </div>
    </div>
  );
}
