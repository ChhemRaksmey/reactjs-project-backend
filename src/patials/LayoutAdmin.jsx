import React, { useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";


export function LayoutAdminNavigation () {

    const { user, logout } = useAuth();
    const navigate = useNavigate();

    function AuthLogout() {
        logout();
        navigate("/login", { replace: true });
    }

    return <>
        <header id="page-topbar">
            <div className="navbar-header">

                <div className="d-flex">
                    
                    <div className="navbar-brand-box">
                        <NavLink className="logo logo-dark" to="/">
                            <span className="logo-sm">
                                <img alt="" height="22" src="/assets/images/logo.svg" />
                            </span>
                            <span className="logo-lg">
                                <img alt="" height="17" src="/assets/images/logo-dark.png" />
                            </span>
                        </NavLink>
                        <NavLink className="logo logo-light" to="/">
                            <span className="logo-sm">
                                <img alt="" height="22" src="/assets/images/logo-light.svg" />
                            </span>
                            <span className="logo-lg">
                                <img alt="" height="19" src="/assets/images/logo-light.png" />
                            </span>
                        </NavLink>
                    </div>
                    
                </div>

                <div className="d-flex">
                    
                    <div className="dropdown d-inline-block d-lg-none ms-2">
                        <button aria-expanded="false" aria-haspopup="true" className="btn header-item noti-icon waves-effect" data-bs-toggle="dropdown" id="page-header-search-dropdown" type="button" >
                            <i className="mdi mdi-magnify"></i>
                        </button>
                        <div aria-labelledby="page-header-search-dropdown" className="dropdown-menu dropdown-menu-lg dropdown-menu-end p-0" >
                            <form className="p-3">
                                <div className="form-group m-0">
                                    <div className="input-group">
                                        <input aria-label="Recipient's username" className="form-control" placeholder="Search ..." type="text" />
                                        <div className="input-group-append">
                                            <button className="btn btn-primary" type="submit">
                                                <i className="mdi mdi-magnify"></i>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                    
                    <div className="dropdown d-inline-block">
                        <button aria-expanded="false" aria-haspopup="true" className="btn header-item waves-effect" data-bs-toggle="dropdown" type="button">
                            <img alt="Header Language" height="16" id="header-lang-img" src="/assets/images/flags/us.jpg"/>
                        </button>
                        <div className="dropdown-menu dropdown-menu-end">
                        <a className="dropdown-item notify-item language" data-lang="en" href="#">
                            <img alt="user-image" className="me-1" height="12" src="/assets/images/flags/us.jpg" />
                            <span className="align-middle">English</span>
                        </a>
                        <a className="dropdown-item notify-item language" data-lang="sp" href="#">
                            <img alt="user-image" className="me-1" height="12" src="/assets/images/flags/spain.jpg"/>
                            <span className="align-middle">Spanish</span>
                        </a>
                        <a className="dropdown-item notify-item language" data-lang="gr" href="#">
                            <img alt="user-image" className="me-1" height="12" src="/assets/images/flags/germany.jpg"/>
                            <span className="align-middle">German</span>
                        </a>
                        <a className="dropdown-item notify-item language" data-lang="it" href="#">
                            <img alt="user-image" className="me-1" height="12" src="/assets/images/flags/italy.jpg"/>
                            <span className="align-middle">Italian</span>
                        </a>
                        <a className="dropdown-item notify-item language" data-lang="ru" href="#">
                            <img alt="user-image" className="me-1" height="12" src="/assets/images/flags/russia.jpg"/>
                            <span className="align-middle">Russian</span>
                        </a>
                        </div>
                    </div>
                    
                    <div className="dropdown d-inline-block">
                        <button aria-expanded="false" aria-haspopup="true" className="btn header-item noti-icon waves-effect" data-bs-toggle="dropdown" id="page-header-notifications-dropdown" type="button">
                            <i className="bx bx-bell bx-tada"></i>
                            <span className="badge bg-danger rounded-pill">3</span>
                        </button>
                        <div aria-labelledby="page-header-notifications-dropdown" className="dropdown-menu dropdown-menu-lg dropdown-menu-end p-0" >
                            <div className="p-3">
                                <div className="row align-items-center">
                                    <div className="col">
                                        <h6 className="m-0" key="t-notifications">Notifications</h6>
                                    </div>
                                    <div className="col-auto">
                                        <a className="small" href="#!" key="t-view-all">View All</a>
                                    </div>
                                </div>
                            </div>
                            <div data-simplebar="" style={{ maxHeight: 230 }}>
                                <a className="text-reset notification-item" href="#">
                                    <div className="d-flex">
                                        <div className="avatar-xs me-3">
                                            <span className="avatar-title bg-primary rounded-circle font-size-16">
                                                <i className="bx bx-cart"></i>
                                            </span>
                                        </div>
                                        <div className="flex-grow-1">
                                            <h6 className="mb-1" key="t-your-order">
                                                Your order is placed
                                            </h6>
                                            <div className="font-size-12 text-muted">
                                                <p className="mb-1" key="t-grammer">If several languages coalesce the grammar</p>
                                                <p className="mb-0">
                                                    <i className="mdi mdi-clock-outline"></i>
                                                    <span key="t-min-ago">3 min ago</span>
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </a>
                                <a className="text-reset notification-item" href="#">
                                    <div className="d-flex">
                                        <img alt="user-pic" className="me-3 rounded-circle avatar-xs" src="/assets/images/users/avatar-3.jpg" />
                                        <div className="flex-grow-1">
                                            <h6 className="mb-1">James Lemire</h6>
                                            <div className="font-size-12 text-muted">
                                                <p className="mb-1" key="t-simplified">It will seem like simplified English.</p>
                                                <p className="mb-0">
                                                    <i className="mdi mdi-clock-outline"></i>
                                                    <span key="t-hours-ago">1 hours ago</span>
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </a>
                                <a className="text-reset notification-item" href="#">
                                    <div className="d-flex">
                                        <div className="avatar-xs me-3">
                                            <span className="avatar-title bg-success rounded-circle font-size-16">
                                                <i className="bx bx-badge-check"></i>
                                            </span>
                                        </div>
                                        <div className="flex-grow-1">
                                            <h6 className="mb-1" key="t-shipped">Your item is shipped</h6>
                                            <div className="font-size-12 text-muted">
                                                <p className="mb-1" key="t-grammer">If several languages coalesce the grammar</p>
                                                <p className="mb-0">
                                                    <i className="mdi mdi-clock-outline"></i>
                                                    <span key="t-min-ago">3 min ago</span>
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </a>
                                <a className="text-reset notification-item" href="#">
                                    <div className="d-flex">
                                        <img alt="user-pic" className="me-3 rounded-circle avatar-xs" src="/assets/images/users/avatar-4.jpg" />
                                        <div className="flex-grow-1">
                                            <h6 className="mb-1">Salena Layfield</h6>
                                            <div className="font-size-12 text-muted">
                                                <p className="mb-1" key="t-occidental"> As a skeptical Cambridge friend of mine occidental.</p>
                                                <p className="mb-0">
                                                    <i className="mdi mdi-clock-outline"></i>
                                                    <span key="t-hours-ago">1 hours ago</span>
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </a>
                            </div>
                            <div className="p-2 border-top d-grid">
                                <a className="btn btn-sm btn-link font-size-14 text-center" href="#" >
                                <i className="mdi mdi-arrow-right-circle me-1"></i>
                                    <span key="t-view-more">View More..</span>
                                </a>
                            </div>
                        </div>
                    </div>
                    
                    <div className="dropdown d-inline-block">
                        <button aria-expanded="false" aria-haspopup="true" className="btn header-item waves-effect" data-bs-toggle="dropdown" id="page-header-user-dropdown" type="button">
                            <span className="d-none d-xl-inline-block ms-1" key="t-StarCode Kh" >StarCode Kh</span>
                            <i className="mdi mdi-chevron-down d-none d-xl-inline-block"></i>
                        </button>
                        <div className="dropdown-menu dropdown-menu-end">
                            <a className="dropdown-item" href="#">
                                <i className="bx bx-user font-size-16 align-middle me-1"></i>
                                <span key="t-profile">Profile</span>
                            </a>
                            <a className="dropdown-item" href="#">
                                <i className="bx bx-wallet font-size-16 align-middle me-1"></i>
                                <span key="t-my-wallet">My Wallet</span>
                            </a>
                            <a className="dropdown-item d-block" href="#">
                                <span className="badge bg-success float-end">11</span>
                                <i className="bx bx-wrench font-size-16 align-middle me-1"></i>
                                <span key="t-settings">Settings</span>
                            </a>
                            <a className="dropdown-item" href="#">
                                <i className="bx bx-lock-open font-size-16 align-middle me-1"></i>
                                <span key="t-lock-screen">Lock screen</span>
                            </a>
                            <div className="dropdown-divider"></div>
                            <a className="dropdown-item text-danger" href="#" onClick={AuthLogout}>
                                <i className="bx bx-power-off font-size-16 align-middle me-1 text-danger"></i>
                                <span key="t-logout">Logout</span>
                            </a>
                        </div>
                    </div>

                </div>

            </div>
        </header>
    </>;
}

export function LayoutAdminSidebar () {
    return <>
        <div className="vertical-menu">
            <div className="h-100" data-simplebar="">
                <div id="sidebar-menu">
                    <ul className="metismenu list-unstyled" id="side-menu">
                        
                        <li className="menu-title" key="t-menu">Administrator</li>

                        <li>
                            <a className="has-arrow waves-effect pt-2 pb-1" href="#">
                                <span key="t-dashboards">Dashboard</span>
                            </a>
                            <ul aria-expanded="false" className="sub-menu" >
                                <li><NavLink className="ps-5" to="/dashboard">System Administrator</NavLink></li>
                            </ul>
                        </li>

                        <li>
                            <a className="has-arrow waves-effect pt-2 pb-1" href="#">
                                <span key="t-dashboards">System Administrator</span>
                            </a>
                            <ul aria-expanded="false" className="sub-menu">
                                <li><NavLink className="ps-5" key="t-admin-modules"      to="/admin/modules">System Modules</NavLink></li>
                                <li><NavLink className="ps-5" key="t-admin-applications" to="/admin/applications">Applications</NavLink></li>
                                <li><NavLink className="ps-5" key="t-admin-privileges"   to="/admin/privileges">Privileges</NavLink></li>
                                <li><NavLink className="ps-5" key="t-admin-users"        to="/admin/users">User Setup</NavLink></li>
                            </ul>
                        </li>

                    </ul>
                </div>
            </div>
        </div>
    </>;
}


