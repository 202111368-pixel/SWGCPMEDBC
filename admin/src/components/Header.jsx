import React, { useEffect, useState } from "react";
import "../styles/Header.css";

const Header = () => {
  const [session, setSession] = useState(null);

  useEffect(() => {
    const s = localStorage.getItem("user_session");
    if (s) setSession(JSON.parse(s));

    const onStorage = (e) => {
      if (e.key === "user_session") setSession(e.newValue ? JSON.parse(e.newValue) : null);
    };
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  if (!session || !session.user) return null;

  const { email, picture } = session.user;

  const Avatar = () => {
    if (picture) return <img src={picture} alt="avatar" className="header-avatar-img" />;
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
    <div className="header-top-right">
      <div className="header-user" title={email}>
        <div className="header-avatar"><Avatar /></div>
        <div className="header-email">{email}</div>
      </div>
    </div>
  );
};

export default Header;
