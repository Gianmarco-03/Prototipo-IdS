import "./styles/SideBarDestra.css";
import React, { useEffect, useState, useContext } from "react";
import SideBarContent from "./SideBarDestraComponent/SideBarContent";
import { useNavigate, useLocation } from "react-router-dom";
import { UserIcon, PencilSquareIcon, ArrowLeftStartOnRectangleIcon} from "@heroicons/react/24/outline";
import { checkAdmin } from "../service/GruppoService";
import { checkOrganizzatore } from "../service/EventoService";
import { AuthContext } from "../Auth/AuthProvider";
const Sidebar = () => {

  const navigate = useNavigate();
  const { logout } = useContext(AuthContext);
  const location = useLocation();
  const [canEdit, setCanEdit] = useState(false);
  const [editPath, setEditPath] = useState("");

  useEffect(() => {
    const parts = location.pathname.split("/").filter(Boolean);
    const username =
      sessionStorage.getItem("user") ||
      sessionStorage.getItem("username") ||
      "";
    if (parts[0] === "gruppo" && parts[1]) {
      const nomeGruppo = decodeURIComponent(parts[1]);
      checkAdmin(nomeGruppo, username).then((ok) => {
        setCanEdit(ok);
        setEditPath(ok ? `/gruppo/${encodeURIComponent(nomeGruppo)}/modifica` : "");
      });
    } else if (parts[0] === "evento" && parts[2]) {
      const nomeGruppo = decodeURIComponent(parts[1]);
      const nomeEvento = decodeURIComponent(parts[2]);
      checkOrganizzatore(nomeEvento, nomeGruppo, username).then((ok) => {
        setCanEdit(ok);
        setEditPath(
          ok
            ? `/evento/${encodeURIComponent(nomeGruppo)}/${encodeURIComponent(
                nomeEvento
              )}/modifica`
            : ""
        );
      });
    } else if (parts[0] === "chat" && parts[1]) {
      const nomeGruppo = decodeURIComponent(parts[1]);
      if (parts.length >= 3) {
        const nomeEvento = decodeURIComponent(parts[2]);
        checkOrganizzatore(nomeEvento, nomeGruppo, username).then((ok) => {
          setCanEdit(ok);
          setEditPath(
            ok
              ? `/evento/${encodeURIComponent(nomeGruppo)}/${encodeURIComponent(
                  nomeEvento
                )}/modifica`
              : ""
          );
        });
      } else {
        checkAdmin(nomeGruppo, username).then((ok) => {
          setCanEdit(ok);
          setEditPath(ok ? `/gruppo/${encodeURIComponent(nomeGruppo)}/modifica` : "");
        });
      }
    } else {
      setCanEdit(false);
      setEditPath("");
    }
  }, [location]);

  const gotoProfilo = () => {
    navigate(`/profilo`);
  };
  const gotoEdit = () => {
    if (canEdit && editPath) navigate(editPath);
  };

   const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
      <aside className="sidebar">
        <div className="sidebar-header">
          <button
            className="sidebar-icon-button"
            onClick={gotoProfilo}
            title="Modifica profilo"
          >
            <UserIcon className="event-icon" width={30} height={30} />
          </button>
          {canEdit && (
            <button
              className="sidebar-icon-button"
              onClick={gotoEdit}
              title="Modifica"
            >
              <PencilSquareIcon className="event-icon" width={30} height={30} />
            </button>
          )}
          <button
            className="sidebar-icon-button"
            onClick={handleLogout}
            title="Logout"
          >
              <ArrowLeftStartOnRectangleIcon className="event-icon" width={30} height={30} />
          </button>
        </div>
        <SideBarContent/>
      </aside>

  );
};

export default Sidebar;
