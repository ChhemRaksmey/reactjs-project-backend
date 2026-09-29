import React, { useState } from "react";
import { useNavigate, useLocation, Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";
import { useToast } from "../context/ToastContext.jsx";

export default function Login() {
  const { user, login } = useAuth();
  const { notify } = useToast();
  const navigate = useNavigate();
  const location = useLocation();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  if (user) {
    const dest = location.state?.from?.pathname || "/dashboard";
    return <Navigate to={dest} replace />;
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await login(email, password);
      notify("Welcome back.", { type: "success" });
      navigate("/dashboard", { replace: true });
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <div className="account-pages my-5 pt-sm-5">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-md-8 col-lg-6 col-xl-5">

              <div className="card overflow-hidden">

                <div className="bg-primary-subtle">
                  <div className="row">
                    <div className="col-7">
                      <div className="text-primary p-4">
                        <h5 className="text-primary">Welcome Back !</h5>
                        <p>Sign in to continue to Skote.</p>
                      </div>
                    </div>
                    <div className="col-5 align-self-end">
                      <img alt="" className="img-fluid" src="/assets/images/profile-img.png"/>
                    </div>
                  </div>
                </div>

                <div className="card-body pt-0">

                  <div className="auth-logo">

                    <a className="auth-logo-light">
                      <div className="avatar-md profile-user-wid mb-4">
                        <span className="avatar-title rounded-circle bg-light">
                          <img alt="" className="rounded-circle" height="34" src="/assets/images/logo-light.svg"/>
                        </span>
                      </div>
                    </a>

                    <a className="auth-logo-dark">
                      <div className="avatar-md profile-user-wid mb-4">
                        <span className="avatar-title rounded-circle bg-light">
                          <img alt="" className="rounded-circle" height="34" src="/assets/images/logo.svg"/>
                        </span>
                      </div>
                    </a>

                  </div>

                  {error && <div className="text-center text-danger" role="alert">{error}</div>}

                  <div className="p-2">
                    <form onSubmit={handleSubmit} noValidate className="form-horizontal">
                      
                      <div className="mb-3">
                        <label className="form-label" for="username">Username</label>
                        <input className="form-control" id="username" placeholder="Enter username" type="text" onChange={(e) => setEmail(e.target.value)} value={email} />
                      </div>
                      
                      <div className="mb-3">
                        <label className="form-label">Password</label>
                        <div className="input-group auth-pass-inputgroup">
                          <input aria-describedby="password-addon" aria-label="Password" className="form-control" placeholder="Enter password" type="password" onChange={(e) => setPassword(e.target.value)} value={password} />
                          <button className="btn btn-light" id="password-addon" type="button">
                            <i className="mdi mdi-eye-outline"></i>
                          </button>
                        </div>
                      </div>
                      
                      <br />
                      
                      <div className="mt-3 d-grid">
                        <button className="btn btn-primary waves-effect waves-light" type="submit" disabled={loading}>{loading ? "Signing in…" : "Sign in"}</button>
                      </div>

                    </form>
                  </div>

                </div>

              </div>

              <div className="mt-5 text-center">
                <div>
                  <p>Don't have an account ?<a className="fw-medium text-primary" href="auth-register.html">Signup now</a></p>
                  <p>Â©<script>document.write(new Date().getFullYear())</script>Skote. Crafted with<i className="mdi mdi-heart text-danger"></i>by Themesbrand</p>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </>
  );
}
