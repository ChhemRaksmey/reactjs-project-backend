import React, { useMemo, useEffect, useState } from "react";
import AppShell from "../../components/AppShell.jsx";
import { Delay } from '../../utils/Helper.jsx';

import { InputText, InputDate, InputTime, SelectSingle, TabNav } from '../../components/Forms.jsx';


export default function PageAdminUsers() {

  const FORM_EMPTY = {
    StaffId: "",
    SignonName: "",
    FullName: "",
    DateStart: "",
    DateExpire: "",
    TimeStart: "",
    TimeEnd: "",
    UserStatus: "",
    Override: "",
    MainBranch: "",
    PrivilegesAccess: ""
  };

  const formNotAllowEdit = ["", "Reset", "View", "Authorize"];

  const [enableButtons, setEnableButtons] = useState(false);
  const [enableForm,    setEnableForm]    = useState(false);

  const [lblBtnSubmit,        setLblBtnSubmit]        = useState("Submit");
  const [lblBtnApprove,       setLblBtnApprove]       = useState("Approve");
  const [lblBtnDelete,        setLblBtnDelete]        = useState("Delete");
  const [lblBtnResetPassword, setLblBtnResetPassword] = useState("Reset Password");
  const [lblBtnResetExpired,  setLblBtnResetExpired]  = useState("Reset Expired");
  const [lblBtnResetDisable,  setLblBtnResetDisable]  = useState("Reset Disable");
  const [lblBtnResetEnable,   setLblBtnResetEnable]   = useState("Reset Enable");

  const [modalShow,  setModalShow] = useState("");
  const [formRecid,  setFormRecid] = useState("");
  const [form,       setForm]      = useState(FORM_EMPTY);


  useEffect(() => {
    if (window.$) {

      window.$("#selectmulti-form_branch").select2({
        ajax: {
          url: "https://api.github.com/search/repositories",
          dataType: "json",
          delay: 250,
          data: function (e) {
            console.log(e);
            return { q: e.term, page: e.page };
          },
          processResults: function (e, t) {
            return (
              (t.page = t.page || 1),
              {
                results: e.items,
                pagination: { more: 30 * t.page < e.total_count },
              }
            );
          },
          cache: !0,
        },
        placeholder: "Search for a repository",
        minimumInputLength: 1,
        templateResult: function (e) {
          if (e.loading) return e.text;
          var t = window.$(
            "<div class='select2-result-repository clearfix'><div class='select2-result-repository__meta'><div class='select2-result-repository__title'></div><div class='select2-result-repository__description'></div><div class='select2-result-repository__statistics'><div class='select2-result-repository__forks'><i class='fa fa-flash'></i> </div><div class='select2-result-repository__stargazers'><i class='fa fa-star'></i> </div><div class='select2-result-repository__watchers'><i class='fa fa-eye'></i> </div></div></div></div>",
          );
          return (
            t.find(".select2-result-repository__title").text(e.full_name),
            t.find(".select2-result-repository__description").text(e.description),
            t.find(".select2-result-repository__forks").append(e.forks_count + " Forks"),
            t.find(".select2-result-repository__stargazers").append(e.stargazers_count + " Stars"),
            t.find(".select2-result-repository__watchers").append(e.watchers_count + " Watchers"),
            t
          );
        },
        templateSelection: function (e) {
          return e.full_name || e.text;
        },
      });

      window.$("#selectmulti-form_privilege").select2({
        ajax: {
          url: "https://api.github.com/search/repositories",
          dataType: "json",
          delay: 250,
          data: function (e) {
            console.log(e);
            return { q: e.term, page: e.page };
          },
          processResults: function (e, t) {
            return (
              (t.page = t.page || 1),
              {
                results: e.items,
                pagination: { more: 30 * t.page < e.total_count },
              }
            );
          },
          cache: !0,
        },
        placeholder: "Search for a repository",
        minimumInputLength: 1,
        templateResult: function (e) {
          if (e.loading) return e.text;
          var t = window.$(
            "<div class='select2-result-repository clearfix'><div class='select2-result-repository__meta'><div class='select2-result-repository__title'></div><div class='select2-result-repository__description'></div><div class='select2-result-repository__statistics'><div class='select2-result-repository__forks'><i class='fa fa-flash'></i> </div><div class='select2-result-repository__stargazers'><i class='fa fa-star'></i> </div><div class='select2-result-repository__watchers'><i class='fa fa-eye'></i> </div></div></div></div>",
          );
          return (
            t.find(".select2-result-repository__title").text(e.full_name),
            t.find(".select2-result-repository__description").text(e.description),
            t.find(".select2-result-repository__forks").append(e.forks_count + " Forks"),
            t.find(".select2-result-repository__stargazers").append(e.stargazers_count + " Stars"),
            t.find(".select2-result-repository__watchers").append(e.watchers_count + " Watchers"),
            t
          );
        },
        templateSelection: function (e) {
          return e.full_name || e.text;
        },
      });

      window.$("#form_status").select2();
      window.$("#form_override").select2();

      window.$("#search_branch").select2();
      window.$("#search_privilege").select2();
      window.$("#search_status").select2();
      
    }
  }, [formRecid, form, modalShow, enableButtons, enableForm]);

  
  const handleEnableForm = (buttons, form, modal_show) => {
    setEnableButtons(!buttons);
    setEnableForm(!form);
    setModalShow(modal_show);
  }

  const handleFormOpen = (recid, type) => {

    if (type) {

      if (formNotAllowEdit.includes(type))
        handleEnableForm(true, false, type);
      else
        handleEnableForm(true, true, type);

      setFormRecid(recid || "");
      setForm(FORM_EMPTY);

      setLblBtnSubmit("Submit");
      setLblBtnApprove("Approve");
      setLblBtnDelete("Delete");

    }

  }

  const handleFormCreateSubmit = async (e) => {
    e.preventDefault();
    handleEnableForm(false, false, modalShow);
    setLblBtnSubmit("Creating .....");

    await Delay();

    handleEnableForm(true, true, "");
    setLblBtnSubmit("Submit");
  }

  const handleFormEditSubmit = async (e) => {
    e.preventDefault();
    handleEnableForm(false, false, modalShow);

    setLblBtnSubmit("Updating .....");
    await Delay();
    
    handleEnableForm(true, true, "");
    setLblBtnSubmit("Submit");
  }

  const handleFormAuthorizeApprove = async (e) => {
    e.preventDefault();
    handleEnableForm(false, false, modalShow);
    setLblBtnApprove("Approving .....");

    await Delay();

    handleEnableForm(true, true, "");
    setLblBtnApprove("Submit");
  }

  const handleFormAuthorizeDelete = async (e) => {
    e.preventDefault();
    handleEnableForm(false, false, modalShow);
    setLblBtnDelete("Deleting .....");

    await Delay();

    handleEnableForm(true, true, "");
    setLblBtnDelete("Submit");
  }

  const handleFormResetPassword = async (e) => {
    e.preventDefault();
    handleEnableForm(false, false, modalShow);
    setLblBtnResetPassword("Reset Password .....");
    
    await Delay();
    handleEnableForm(true, true, "");
    setLblBtnResetPassword("Reset Password");
  }
  
  const handleFormResetExpired = async (e) => {
    e.preventDefault();
    handleEnableForm(false, false, modalShow);
    setLblBtnResetExpired("Reset Expired .....");
    
    await Delay();
  
    handleEnableForm(true, true, "");
    setLblBtnResetExpired("Reset Expired");
  }
  
  const handleFormResetDisable = async (e) => {
    e.preventDefault();
    handleEnableForm(false, false, modalShow);
    setLblBtnResetDisable("Reset Disable .....");
    
    await Delay();
  
    handleEnableForm(true, true, "");
    setLblBtnResetDisable("Reset Disable");
  }
  
  const handleFormResetEnable = async (e) => {
    e.preventDefault();
    handleEnableForm(false, false, modalShow);
    setLblBtnResetEnable("Reset Enable .....");
    
    await Delay();
  
    handleEnableForm(true, true, "");
    setLblBtnResetEnable("Reset Enable");
  }


  return (
    <AppShell>

      <div className="row">
        <div className="col-12">
          <div className="page-title-box d-sm-flex align-items-center justify-content-between">
            <div className="page-title-right">
              <ol className="breadcrumb m-0">
                <li className="breadcrumb-item">Core System</li>
                <li className="breadcrumb-item">User</li>
              </ol>
            </div>
          </div>
        </div>
      </div>

      <div data-bs-backdrop="static" data-bs-keyboard="false" role="dialog" aria-hidden="true" className={`modal fade ${modalShow === "" ? '' : 'show'}`} style={{ display: modalShow === "" ? "none" : "block" }}>
        <div className="modal-dialog modal-xl" role="document">
          <div className="modal-content shadow-lg">

            <div className="modal-header">
              <h5 className="modal-title">
                {(() => {
                  switch (modalShow) {
                    case "Create":    return (<>Record Create</>);
                    case "Edit":      return (<>Record Edit</>);
                    case "Authorize": return (<>Record Authorize</>);
                    default:          return (<>Record Detail</>);
                  }
                })()}
              </h5>
              <div className="d-flex flex-wrap gap-1">
                
                {(() => {
                  switch (modalShow) {
                    case "Create":
                      return (<>
                        <button disabled={enableButtons} type="button" className="btn btn-primary" onClick={handleFormCreateSubmit}>{lblBtnSubmit}</button>
                      </>);
                    case "Edit":
                      return (<>
                        <button disabled={enableButtons} type="button" className="btn btn-primary" onClick={handleFormEditSubmit}>{lblBtnSubmit}</button>
                      </>);
                    case "Authorize":
                      return (<>
                        <button disabled={enableButtons} type="submit" className="btn btn-primary" onClick={handleFormAuthorizeApprove}>{lblBtnApprove}</button>
                        <button disabled={enableButtons} type="submit" className="btn btn-danger" onClick={handleFormAuthorizeDelete}>{lblBtnDelete}</button>
                      </>);
                  }
                })()}

                <button disabled={enableButtons} type="button" className="btn btn-light" onClick={() => {setModalShow("");}}>Close</button>

              </div>
            </div>

            <div className="modal-body">

              <TabNav
                mainid="form"
                listitems={[
                  {name:"master", label:"Master"},
                  {name:"audit_Audit", label:"Audit"},
                  {name:"audit_Changes", label:"Changes"}
                ]}
              >

                <div role="tabpanel" className="tab-pane active show" id="tab-form-master">
                  <div className="row">

                    <div className="mb-2 col-md-2">
                      <label className="form-label mb-1">Staff Id</label>
                      <InputText
                        id="" name=""
                        value={form.StaffId || ''} disable={enableForm ?? !formNotAllowEdit.includes(modalShow)}
                        onChange={(e) => setForm({ ...form, StaffId: e.target.value })}
                      />
                    </div>

                    <div className="mb-2 col-md-4">
                      <label className="form-label mb-1">Signon Name</label>
                      <InputText
                        id="" name=""
                        value={form.SignonName || ''} disable={enableForm ?? !formNotAllowEdit.includes(modalShow)}
                        onChange={(e) => setForm({ ...form, SignonName: e.target.value })}
                      />
                    </div>

                    <div className="mb-2 col-md-6">
                      <label className="form-label mb-1">Full Name</label>
                      <InputText
                        id="" name=""
                        value={form.FullName || ''} disable={enableForm ?? !formNotAllowEdit.includes(modalShow)}
                        onChange={(e) => setForm({ ...form, FullName: e.target.value })}
                      />
                    </div>
                    
                    <div className="mb-2 col-md-2">
                      <label className="form-label mb-1">Date Start</label>
                      <InputDate
                        id="picker-date-start" name=""
                        value={form.DateStart || ''} disable={enableForm ?? !formNotAllowEdit.includes(modalShow)}
                        onChange={(e) => setForm({ ...form, DateStart: e.target.value })}
                      />
                    </div>

                    <div className="mb-2 col-md-2">
                      <label className="form-label mb-1">Date Expire</label>
                      <InputDate
                        id="picker-date-expire" name=""
                        value={form.DateExpire || ''} disable={enableForm ?? !formNotAllowEdit.includes(modalShow)}
                        onChange={(e) => setForm({ ...form, DateExpire: e.target.value })}
                      />
                    </div>

                    <div className="mb-2 col-md-1">
                      <label className="form-label mb-1">Time Start</label>
                      <InputTime
                        id="picker-time-start" name=""
                        value={form.TimeStart || ''} disable={enableForm ?? !formNotAllowEdit.includes(modalShow)}
                        onChange={(e) => setForm({ ...form, TimeStart: e.target.value })}
                      />
                    </div>

                    <div className="mb-2 col-md-1">
                      <label className="form-label mb-1">Time End</label>
                      <InputTime
                        id="picker-time-end" name=""
                        value={form.TimeEnd || ''} disable={enableForm ?? !formNotAllowEdit.includes(modalShow)}
                        onChange={(e) => setForm({ ...form, TimeEnd: e.target.value })}
                      />
                    </div>

                    <div className="mb-2 col-md-3">
                      <label className="form-label mb-1">User Status</label>
                      <SelectSingle
                        id="form_status"
                        value={form.UserStatus || ''} disable={enableForm ?? !formNotAllowEdit.includes(modalShow)}
                        onChange={(e) => setForm({ ...form, UserStatus: e.target.value })}
                        listitems={[
                          {value:"", label:"New Profile"},
                          {value:"A", label:"Profile Active"},
                          {value:"D", label:"Profile Disabled"},
                          {value:"L", label:"Profile Locked"},
                          {value:"E", label:"Profile Expired"},
                          {value:"P", label:"Password Expired"},
                          {value:"R", label:"Profile Reseted"}
                        ]}
                      />
                    </div>

                    <div className="mb-2 col-md-3">
                      <label className="form-label mb-1">Override</label>
                      <SelectSingle
                        id="form_override"
                        value={form.Override || ''} disable={enableForm ?? !formNotAllowEdit.includes(modalShow)}
                        onChange={(e) => setForm({ ...form, Override: e.target.value })}
                        listitems={[
                          {value:"", label:"Can Not Override"},
                          {value:"All", label:"Override All"},
                          {value:"Transction", label:"Override Only Transction"},
                          {value:"System", label:"Override Only Backend"}
                        ]}
                      />
                    </div>

                    <div className="mb-2 col-xxl-6 col-lg-12 ajax-select">
                      <label className="form-label mb-1">Detault Branch</label>
                      <select
                        className="form-control"
                        id="selectmulti-form_branch"
                        readOnly={enableForm ?? !formNotAllowEdit.includes(modalShow)}
                        disabled={enableForm ?? !formNotAllowEdit.includes(modalShow)}
                        onChange={(e) => setForm({ ...form, Override: e.target.value })}
                      />
                    </div>

                    <div className="mb-2 col-md-6">
                      <label className="form-label mb-1">Privileges Access</label>
                      <select
                        className="form-control"
                        id="selectmulti-form_privilege"
                        readOnly={enableForm ?? !formNotAllowEdit.includes(modalShow)}
                        disabled={enableForm ?? !formNotAllowEdit.includes(modalShow)}
                        onChange={(e) => setForm({ ...form, Override: e.target.value })}
                      />
                    </div>

                  </div>
                </div>

                <div role="tabpanel" className="tab-pane" id="tab-form-audit_Audit"></div>

                <div role="tabpanel" className="tab-pane" id="tab-form-audit_Changes">
                  <table className="table table-striped">
                    <thead>
                      <tr>
                        <th className="py-2 col-md-3">Field Name</th>
                        <th className="py-2 col-md-4">Old Value</th>
                        <th className="py-2 col-md-4">New Value</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="py-2">Field Name 1</td>
                        <td className="py-2">xxxxxxx</td>
                        <td className="py-2">xxxxxxx</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

              </TabNav>
              
            </div>

            {
              modalShow !== "Reset"
              ? <></>
              : <>
                <div className="modal-footer d-flex flex-wrap">
                  <button disabled={enableButtons} type="button" className="btn btn-primary" onClick={handleFormResetPassword}>{lblBtnResetPassword}</button>
                  <button disabled={enableButtons} type="button" className="btn btn-primary" onClick={handleFormResetExpired}>{lblBtnResetExpired}</button>
                  <button disabled={enableButtons} type="button" className="btn btn-primary" onClick={handleFormResetDisable}>{lblBtnResetDisable}</button>
                  <button disabled={enableButtons} type="button" className="btn btn-primary" onClick={handleFormResetEnable}>{lblBtnResetEnable}</button>
                </div>
              </>
            }

          </div>
        </div>
      </div>

      <div className="row">
        <div className="col-lg-12">
          <div className="card">

            <div className="card-body pb-0">
              <div className="d-flex align-items-center">
                <span className="mb-0 card-title flex-grow-1 text-muted">System User Setup</span>
                <div className="d-flex flex-wrap gap-1">
                  <a className="btn btn-primary" href="#!" onClick={(e) => { e.preventDefault(); handleFormOpen("123456", "Create"); }}>Add New</a>
                  <a className="btn btn-light" href="#!"><i className="mdi mdi-refresh"></i></a>
                </div>
              </div>
            </div>

            <div className="card-body pt-2 pb-0">
              <div className="row px-2">
                
                <div className="col-md-3 px-1">
                  <InputText id="search_text" placeholder="staff id /signon name / full name " />
                </div>
                
                <div className="col-md-3 px-1">
                  <SelectSingle
                    id="search_branch"
                    listitems={[
                      {value:"", label:"All Branches"},
                      {value:"KH0010001", label:"Head Office"},
                      {value:"KH0010002", label:"Main Branch"},
                      {value:"KH0010003", label:"Branch 01"}
                    ]}
                  />
                </div>
                
                <div className="col-md-3 px-1">
                  <SelectSingle
                    id="search_privilege"
                    listitems={[
                      {value:"", label:"All Privileges"},
                      {value:"Privileges-1", label:"Privileges 1"},
                      {value:"Privileges-2", label:"Privileges 2"},
                      {value:"Privileges-3", label:"Privileges 3"}
                    ]}
                  />
                </div>

                <div className="col-md-2 px-1">
                  <SelectSingle
                    id="search_status"
                    listitems={[
                      {value:"", label:"All Status"},
                      {value:"N", label:"New User"},
                      {value:"A", label:"Active"},
                      {value:"D", label:"Disabled"},
                      {value:"E", label:"Expired"},
                      {value:"L", label:"Locked"},
                      {value:"R", label:"Reset Password"}
                    ]}
                  />
                </div>
                
                <div className="col-md-1 px-1">
                  <a className="btn btn-soft-secondary w-100" type="button">
                    <i className="mdi mdi-filter-outline align-middle"></i>
                    Filter
                  </a>
                </div>

              </div>
            </div>

            <div className="card-body pt-2">

              <table className="table mb-0">
                <thead>
                  <tr>
                    <th className="py-2 col-4">Signon Name</th>
                    <th className="py-2 col-6">Full Name</th>
                    <th className="py-2 col-1 text-center">Status</th>
                    <th className="py-2 col-1 text-center">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {Array.from({ length: 5 }).map((_, index) => (
                    <tr key={index}>
                      <td className="py-1">Signon-{index + 1}</td>
                      <td className="py-1">User Name {index + 1}</td>
                      <td className="py-1 text-center"><span className="badge badge-soft-primary">Active</span></td>
                      <td className="py-1 text-center">
                        <div className="btn-group">
                          <a aria-expanded="true" className="dropdown-toggle font-size-16" data-bs-toggle="dropdown" type="button">
                            <i className="mdi mdi-cog"></i>
                          </a>
                          <div className="dropdown-menu" data-popper-placement="top-start" style={{position: "absolute", inset: "auto auto 0px 0px", margin: "0px", transform: "translate3d(0px, -28.8px, 0px)"}}>
                            <a className="font-size-12 dropdown-item" type="button" onClick={(e) => { e.preventDefault(); handleFormOpen(index, "View", ); }}>View</a>
                            <a className="font-size-12 dropdown-item" type="button" onClick={(e) => { e.preventDefault(); handleFormOpen(index, "Edit", ); }}>Edit</a>
                            <a className="font-size-12 dropdown-item" type="button" onClick={(e) => { e.preventDefault(); handleFormOpen(index, "Reset", ); }}>Reset</a>
                            <div className="dropdown-divider"></div>
                            <a className="font-size-12 dropdown-item" type="button" onClick={(e) => { e.preventDefault(); handleFormOpen(index, "Authorize"); }}>Authorize</a>
                          </div>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              <div className="mt-4 d-sm-flex align-items-center justify-content-between">
                <div className="mb-sm-0">Records 60 to 70 of 991</div>
                <nav>
                  <ul className="mb-0 pagination justify-content-end">
                    <li className="page-item"><a className="page-link py-1 px-3"><i className="fas fa-angle-double-left"></i></a></li>
                    <li className="page-item"><a className="page-link py-1 px-3"><i className="fas fa-angle-left"></i></a></li>
                    <li className="page-item disabled"><a className="page-link py-1 px-3">...</a></li>
                    <li className="page-item"><a className="page-link py-1 px-3">60</a></li>
                    <li className="page-item active"><a className="page-link py-1 px-3">61</a></li>
                    <li className="page-item"><a className="page-link py-1 px-3">62</a></li>
                    <li className="page-item disabled"><a className="page-link py-1 px-3">...</a></li>
                    <li className="page-item"><a className="page-link py-1 px-3"><i className="fas fa-angle-right"></i></a></li>
                    <li className="page-item"><a className="page-link py-1 px-3"><i className="fas fa-angle-double-right"></i></a></li>
                  </ul>
                </nav>
              </div>

            </div>
          
          </div>
        </div>
      </div>

    </AppShell>
  );

}
