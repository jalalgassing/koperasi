import { Link } from "react-router-dom";
import { IconArrow } from "../../../components/MintIcons.jsx";
import handshake from "../../../assets/images/mockup/jabat-tangan.png";

export default function JoinBanner() {
  return (
    <section className="lyj">
      <div className="container">
        <div className="lyj__box">
          <div className="lyj__copy">
            <h2>Bersama Parakarsa, wujudkan koperasi yang lebih maju dan terhubung.</h2>
            <Link to="/daftar" className="lyj__btn">
              Daftar Sekarang <IconArrow size={16} />
            </Link>
          </div>
          <img className="lyj__photo" src={handshake} alt="" aria-hidden="true" />
        </div>
      </div>
    </section>
  );
}
