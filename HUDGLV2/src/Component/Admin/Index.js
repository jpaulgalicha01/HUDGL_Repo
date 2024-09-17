import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./index.css";
import {
  ExpireComponentToken,
  GetSession,
  UserSession,
} from "../../Class/ClsSession";
import axios from "axios";
import ClsModal from "../../Tools/Modal";

export default function AdminMainMenu({ children, title }) {
  const navigate = useNavigate();
  const [toggle, setToggled] = useState(false);

  const handleToggled = () => {
    setToggled(!toggle);
  };

  const [modal, setModal] = useState(false);

  async function HandleLogout() {
    UserSession(null);
    if ((await ExpireComponentToken()) === null) {
      navigate("/");
    }
  }

  useEffect(() => {
    const varToken = ExpireComponentToken();
    if (varToken === null) {
      navigate("/");
    } else {
      axios.defaults.headers.common["Authorization"] = `Bearer ${varToken}`;
    }
  }, [navigate]);

  return (
    <div className={`d-flex ${toggle ? "toggled" : ""}`} id="wrapper">
      {/* Sidebar */}
      <div className="bg-white" id="sidebar-wrapper">
        <div className="sidebar-heading text-center py-4 primary-text fs-4 fw-bold text-uppercase ">
          <i className="fas fa-user-secret me-2"></i>HUDGLV
        </div>

        <div className="list-group list-group-flush my-1">
          <Link
            to={"/admin"}
            className={`list-group-item list-group-item-action bg-transparent ${
              title === "Dashboard"
                ? "primary-text active"
                : "second-text fw-bold"
            }`}
          >
            <i className="fas fa-tachometer-alt me-2"></i>Dashboard
          </Link>
        </div>

        <hr />
        <span
          className="sidebar-heading  fw-light text-uppercase fw-bold "
          style={{ paddingBottom: "0px", marginBottom: "0px" }}
        >
          vouchers
        </span>

        <div className="list-group list-group-flush my-1">
          <Link
            to={"/admin/purchase-delivery"}
            className={`list-group-item list-group-item-action bg-transparent ${
              title === "Purchase Delivery"
                ? "primary-text active"
                : "second-text fw-bold"
            }`}
          >
            <i class="fas fa-truck me-2"></i>Purchase Delivery
          </Link>
        </div>

        <div className="list-group list-group-flush my-1">
          <Link
            to={"/admin/adjustment-slip"}
            className={`list-group-item list-group-item-action bg-transparent ${
              title === "Adjustment Slip"
                ? "primary-text active"
                : "second-text fw-bold"
            }`}
          >
            <i class="fa-solid fa-file-pen me-2"></i>Adjustment Slip
          </Link>
        </div>

        <div className="list-group list-group-flush my-1">
          <Link
            to={"/admin/delivery-reciept"}
            className={`list-group-item list-group-item-action bg-transparent ${
              title === "Delivery Reciept"
                ? "primary-text active"
                : "second-text fw-bold"
            }`}
          >
            <i class="fa-solid fa-receipt me-2"></i>Delivery Reciept
          </Link>
        </div>

        <div className="list-group list-group-flush my-1">
          <Link
            to={"/admin/return-slip"}
            className={`list-group-item list-group-item-action bg-transparent ${
              title === "Return Slip"
                ? "primary-text active"
                : "second-text fw-bold"
            }`}
          >
            <i class="fas fa-people-pulling me-2"></i>Return Slip
          </Link>
        </div>

        <hr />
        <span
          className="sidebar-heading  fw-light text-uppercase fw-bold "
          style={{ paddingBottom: "0px", marginBottom: "0px" }}
        >
          reports
        </span>
        <div className="list-group list-group-flush my-1">
          <Link
            to={"#collapseExample"}
            className={`list-group-item list-group-item-action bg-transparent second-text fw-bold`}
            data-bs-toggle="collapse"
            role="button"
            aria-expanded="false"
            aria-controls="collapseExample"
          >
            <i class="fa-solid fa-book me-2"></i>Individual Report
          </Link>
          <div className="collapse" id="collapseExample">
            <div>
              <Link
                to={"#"}
                className={`list-group-item list-group-item-action bg-transparent ${
                  title === "Report 1"
                    ? "primary-text active"
                    : "second-text fw-bold"
                }`}
              >
                Report 1
              </Link>
            </div>
          </div>
        </div>

        <div className="list-group list-group-flush my-1">
          <Link
            className={`list-group-item list-group-item-action bg-transparent danger-text fw-bold`}
            onClick={() => setModal(!modal)}
          >
            <i class="fa-solid fa-right-from-bracket"></i>Logout
          </Link>
        </div>
      </div>
      {/* sidebar-wrapper */}

      <div id="page-content-wrapper">
        {/* Topbar Navigation */}
        <nav className="navbar navbar-expand-lg navbar-light bg-transparent py-4 px-4 d-flex justify-content-between  ">
          <div className="d-flex align-items-center ">
            <i
              className="fas fa-align-left primary-text fs-4 me-3"
              id="menu-toggle"
              onClick={() => handleToggled()}
            ></i>
            <h2 className="fs-2 m-0">{title}</h2>
          </div>
          <p className="fst-italic fs-underline text-decoration-underline m-0">
            {GetSession().userName}
          </p>
        </nav>
        {/* End Topbar Navigation */}

        {/* Content */}
        <div className="container-fluid px-4">{children}</div>
        {/* End Content */}
      </div>

      <ClsModal
        handleSubmit={HandleLogout}
        show={modal}
        //  handleClose={props.handleModal}
        title={"Confirmation"}
        size={"md"}
        footer={
          <>
            <button
              type="button"
              className="btn btn-secondary"
              onClick={async () => {
                await setModal(!modal);
              }}
            >
              Close
            </button>
            <button type="submit" className="btn btn-primary">
              Logout
            </button>
          </>
        }
      >
        <>
          <p>Are you sure to logout ?</p>
        </>
      </ClsModal>
    </div>
  );
}
