import { NavLink, useLocation, Link } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
// lang
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Offcanvas from "react-bootstrap/Offcanvas";

// css
import "./navbar.css";
import Search from "./Search";
import NavTopBar from "./NavTopBar";

const navItems = [
  {
    label: {
      vi: "TRANG CHỦ",
      en: "HOME",
    },
    to: "/",
  },
  {
    label: {
      vi: "DU LỊCH CHÂU ÂU",
      en: "EUROPE TOURS",
    },
    to: "/du-lich-chau-au",
  },
  {
    label: {
      vi: "DU LỊCH TRONG NƯỚC",
      en: "VIETNAM TOURS",
    },
    to: "/du-lich-trong-nuoc",
  },
  {
    label: {
      vi: "DỊCH VỤ VISA",
      en: "VISA SERVICES",
    },
    to: "/dich-vu-visa",
  },
  {
    label: {
      vi: "GIỚI THIỆU",
      en: "ABOUT",
    },
    to: "/gioi-thieu",
  },
  {
    label: {
      vi: "GUIDES",
      en: "GUIDES",
    },
    to: "/guides",
  },
];

function Header() {
  const [expanded, setExpanded] = useState(false);
  const location = useLocation();
  const lang = useTranslation().i18n.language;

  useEffect(() => {
    if (expanded) {
      setExpanded(false);
    }
  }, [location]);

  const LogoComponent = location.pathname === "/" ? "a" : Link;
  return (
    <>
      <div className="travel__navbar">
        <div className="container-fluid travel__navbar__inner">
          <NavTopBar />
          <Navbar
            expand="lg"
            bg="white"
            expanded={expanded}
            onToggle={() => setExpanded((prev) => !prev)}
          >
            <Container fluid>
              <Navbar.Brand>
                <LogoComponent
                  to="/"
                  href="https://ntav.org"
                  className="travel__navbar__branch"
                >
                  <h5 className="m-0 text-center">JOYA LOGO</h5>
                  <h6 className="m-0 text-center">Slogan here</h6>
                </LogoComponent>
              </Navbar.Brand>

              <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-lg`} />

              <Navbar.Offcanvas placement="end">
                <Offcanvas.Header closeButton>
                  <Offcanvas.Title id={`offcanvasNavbarLabel-expand-lg`}>
                    <div className="travel__navbar__branch">
                      <h5 className="m-0 text-center">JOYA LOGO</h5>
                      <h6 className="m-0 text-center">Slogan here</h6>
                    </div>
                  </Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                  <Nav className="justify-content-end flex-grow-1 pe-3">
                    {navItems.map((item) => (
                      <NavLink key={item.to} end to={item.to}>
                        {item.label[lang]}
                      </NavLink>
                    ))}
                  </Nav>
                  {!location.pathname.startsWith("/du-lich/tim-kiem") && (
                    <div className="d-lg-flex align-items-center d-none">
                      <Search />
                    </div>
                  )}
                </Offcanvas.Body>
              </Navbar.Offcanvas>
            </Container>
          </Navbar>

          {!location.pathname.startsWith("/du-lich/tim-kiem") && (
            <div className="container-fluid pb-3 d-block d-sm-none">
              <Search />
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default Header;
