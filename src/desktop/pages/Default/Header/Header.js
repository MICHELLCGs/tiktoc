import { useState } from "react";
import "./Header.scss";
import SearchBar from "../../../../components/SearchBar";

function Header() {
  const HandleHoverOpen = () => {
    setHover(true);
  };
  const HandleHoverClose = () => {
    setHover(false);
  };
  const [verify, setVerify] = useState(false);
  const [hover, setHover] = useState(false);
  return (
    <div className="father-of-header">
      <div className="header">
        <h1 className="logo">
          <img alt="Home" title="Home" src="/logos/logo.jfif" />
          TIKTOK
        </h1>
        <SearchBar />
        <div className="func-remain">
          <div className="upload">
            {/* wrap link here */}
            <div>
              <img alt="Upload" title="Upload" src="/logos/plus.png" />
              <span>Cargar</span>
            </div>
          </div>
          {verify ? (
            <>
              <div className="messenger">
                {/* wrap link here */}
                <img
                  alt="Tin nhắn"
                  tilte="Tin nhắn"
                  src="/logos/messenger.png"
                />
              </div>
              <div className="mail-box">
                <img alt="Hòm thư" title="Hòm thư" src="/logos/mail-box.png" />
              </div>
              <div className="avatar"></div>
            </>
          ) : (
            <>
              <div className="btn-login">Iniciar sesión</div>
              <div
                className="more-option"
                onMouseEnter={HandleHoverOpen}
                onMouseLeave={HandleHoverClose}
              >
                {hover ? (
                  <div className="value-options">
                    <div className="option">Ngôn ngữ</div>
                    <div className="option">Phím tắt trên bàn phím </div>
                    <div className="option">Trợ giúp</div>
                    <div className="option">
                      <div className="content-option">chế độ tối</div>
                      <label className="turn-on-or-turn-off-option">
                        <input type="checkbox" />
                        <span className="slider round"></span>
                      </label>
                    </div>
                  </div>
                ) : (
                  ""
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default Header;
