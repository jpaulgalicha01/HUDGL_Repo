import React, { useEffect, useState } from "react";
import { Button, FloatingLabel, Form, Stack } from "react-bootstrap";
import { useNavigate } from "react-router";
import LoginBanner from "../Images/Banner-Login.jpg";
import { ClsCheckingConnection } from "../Class/ClsSecurity";
import { GetToken, LoginController } from "../Controller/Insert";
import { UserSession } from "../Class/ClsSession";
import { ClsAlert } from "../Class/ClsAlert";
export default function LoginPage() {
  const navigate = useNavigate();

  const [conectionStatus, setSonnectionStatus] = useState(false);
  const [showPassword, setshowPassword] = useState(false);
  const [btnLoading, setbtnLoading] = useState(false);

  const showPass = () => {
    setshowPassword(!showPassword);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      if (!conectionStatus) {
        checkingConnection();
      }
    }, 30000); // 30 seconds interval

    // Initial fetch
    checkingConnection();

    return () => clearInterval(interval); // Cleanup on unmount
  }, [conectionStatus]);

  const checkingConnection = async () => {
    const result = await ClsCheckingConnection();
    if (result.data === "Connected") {
      setSonnectionStatus(!conectionStatus);
      console.log(result.data);
    } else {
      console.log(result);
    }
  };

  const HandleSubmit = async (e) => {
    e.preventDefault();
    setbtnLoading(!btnLoading);
    const formJson = Object.fromEntries(new FormData(e.target).entries());
    const result = await LoginController(formJson);

    if (result === "OK") {
      const data = await GetToken(formJson);
      UserSession(data.data);
      if (data) {
        navigate("/admin");
      }
    } else {
      setbtnLoading(false);
      ClsAlert({ icon: "info", title: result });
    }
  };

  return (
    <>
      <div
        id="wrapper"
        className="d-flex justify-content-center align-items-center py-lg-5"
        style={{
          margin: 0,
          backgroundSize: "cover",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
          position: "relative",
        }}
      >
        <div className="container-fluid">
          <div className="row d-flex justify-content-center align-self-center">
            <div className="col-lg-8 col-11 card shadow-lg">
              <div className="row p-lg-5 p-4 d-flex align-items-center">
                <div className="col-lg-6 ">
                  <img src={LoginBanner} className="img-fluid" alt="logo" />
                </div>
                <div className="col-lg-6 col-12">
                  <p className="text-center fs-5 header-title">USER'S LOGIN</p>
                  <Form className="pt-3" onSubmit={HandleSubmit}>
                    <Stack gap={3} direction="vertical">
                      <FloatingLabel
                        controlId="username"
                        label={
                          <span>
                            {" "}
                            <i className="fa-regular fa-circle-user"></i>{" "}
                            Username{" "}
                          </span>
                        }
                        className="mb-3"
                      >
                        <Form.Control
                          className="rounded"
                          name="username"
                          type="text"
                          placeholder="username"
                          required
                        />
                      </FloatingLabel>
                      <FloatingLabel
                        controlId="Password"
                        label={
                          <span>
                            {" "}
                            <i className="fa-solid fa-key"></i> Password{" "}
                          </span>
                        }
                        className="mb-3"
                      >
                        <Form.Control
                          className="rounded"
                          name="password"
                          type={`${showPassword ? "text" : "password"}`}
                          placeholder="Password"
                          required
                        />
                      </FloatingLabel>
                    </Stack>
                    <div className="form-check pb-3">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        id="flexCheckChecked"
                        onClick={() => showPass()}
                      />
                      <label
                        className="form-check-label"
                        htmlFor="flexCheckChecked"
                      >
                        Show Password
                      </label>
                    </div>
                    <Button
                      type="submit"
                      variant="primary"
                      className={`text-center text-white form-control ${
                        btnLoading ? "disabled" : ""
                      }`}
                    >
                      {btnLoading ? (
                        <i className="spinner-border spinner-border-sm" />
                      ) : (
                        "LOGIN"
                      )}
                    </Button>
                  </Form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
