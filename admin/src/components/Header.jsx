import React, { useEffect, useState, useRef } from "react";
import maleAvatar from "../assets/avatar-male.svg";
import femaleAvatar from "../assets/avatar-female.svg";
import "../styles/Header.css";

const Header = () => {
  const [session, setSession] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [selectedGender, setSelectedGender] = useState("");
  const menuRef = useRef(null);

  useEffect(() => {
    const s = localStorage.getItem("user_session");
    if (s) {
      const parsed = JSON.parse(s);
      setSession(parsed);
      setSelectedGender(parsed.user?.gender || "");
    }

    const onStorage = (e) => {
      if (e.key === "user_session") {
        const parsed = e.newValue ? JSON.parse(e.newValue) : null;
        setSession(parsed);
        setSelectedGender(parsed?.user?.gender || "");
      }
    };
    window.addEventListener("storage", onStorage);

    const onDocClick = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) setMenuOpen(false);
    };
    document.addEventListener("click", onDocClick);

    return () => {
      window.removeEventListener("storage", onStorage);
      document.removeEventListener("click", onDocClick);
    };
  }, []);

  if (!session || !session.user) return null;

  const { email } = session.user;
  const gender = session.user.gender || selectedGender;

  const getAvatarSource = () => {
    if (gender === "male") return maleAvatar;
    if (gender === "female") return femaleAvatar;
    return null;
  };

  const saveGender = (g) => {
    const s = JSON.parse(localStorage.getItem("user_session") || "{}");
    s.user = s.user || {};
    s.user.gender = g;
    localStorage.setItem("user_session", JSON.stringify(s));
    setSession(s);
    setSelectedGender(g);
    setMenuOpen(false);
  };

  const Avatar = () => {
    const avatarSource = getAvatarSource();
    if (avatarSource) return <img src={avatarSource} alt="avatar" className="header-avatar-img" />;
    // default generic circle
    return (
      <svg viewBox="0 0 64 64" width="40" height="40" xmlns="http://www.w3.org/2000/svg">
        <circle cx="32" cy="32" r="32" fill="#6b7280" />
        <g transform="translate(12,10)" fill="#fff">
          <circle cx="20" cy="12" r="8" />
          <path d="M2 44c0-11 18-11 18-11s18 0 18 11v3H2v-3z" />
        </g>
      </svg>
    );
  };

  return (
    <div className="header-top-right" ref={menuRef}>
      <div className="header-user" title={email}>
        <div className="header-avatar" onClick={() => setMenuOpen(!menuOpen)} style={{ cursor: "pointer" }}>
          <Avatar />
        </div>
        <div className="header-email">{email}</div>
      </div>

      {menuOpen && (
        <div className="header-menu">
          <div className="header-menu-row">
            <div className="header-menu-avatar">
              {getAvatarSource() ? (
                <img src={getAvatarSource()} alt="avatar-large" style={{ width: 56, height: 56, borderRadius: 8, objectFit: "cover" }} />
              ) : (
                <div style={{ width: 56, height: 56, display: "flex", alignItems: "center", justifyContent: "center", borderRadius: 8, background: "#6b7280", color: "#fff", fontWeight: 700 }}>?</div>
              )}
            </div>
            <div className="header-menu-info">
              <div className="header-menu-name">{(session.user.nombres || session.user.name || "Usuario")}</div>
              <div className="header-menu-email">{email}</div>
            </div>
          </div>

          <div className="header-menu-divider" />

          <div className="header-menu-gender">
            <label>
              <input type="radio" name="gender" value="male" checked={selectedGender === "male"} onChange={() => setSelectedGender("male")} /> Masculino
            </label>
            <label>
              <input type="radio" name="gender" value="female" checked={selectedGender === "female"} onChange={() => setSelectedGender("female")} /> Femenino
            </label>
            <label>
              <input type="radio" name="gender" value="other" checked={selectedGender === "other"} onChange={() => setSelectedGender("other")} /> Otro
            </label>
            <label>
              <input type="radio" name="gender" value="none" checked={selectedGender === "none"} onChange={() => setSelectedGender("none")} /> Prefiero no decir
            </label>
          </div>

          <div style={{ display: "flex", gap: 8, marginTop: 10 }}>
            <button className="btn-primary" onClick={() => saveGender(selectedGender)}>Guardar</button>
            <button className="btn-secondary" onClick={() => setMenuOpen(false)}>Cancelar</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Header;
