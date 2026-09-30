import React, { useMemo, useEffect, useState } from "react";
import AppShell from "../../components/AppShell.jsx";
import { Delay } from '../../utils/Helper.jsx';

import { InputText, InputDate, InputTime, SelectSingle, TabNav } from '../../components/Forms.jsx';


export default function PageAdminApplications() {

  const FORM_EMPTY = {
    id_module: "",
    full_name: "",
    status: ""
  };

  const formNotAllowEdit = ["", "Reset", "View", "Authorize"];

  const [enableButtons, setEnableButtons] = useState(false);
  const [enableForm,    setEnableForm]    = useState(false);

  const [lblBtnSubmit,  setLblBtnSubmit]  = useState("Submit");
  const [lblBtnApprove, setLblBtnApprove] = useState("Approve");
  const [lblBtnDelete,  setLblBtnDelete]  = useState("Delete");

  const [modalShow,  setModalShow] = useState("");
  const [formRecid,  setFormRecid] = useState("");
  const [form,       setForm]      = useState(FORM_EMPTY);


  useEffect(() => {
    if (window.$) {

      window.$("#form_status").select2();

      window.$("#selectmulti-form_module").select2({
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
    toastr["info"]("record had been Created");
  }

  const handleFormEditSubmit = async (e) => {
    e.preventDefault();
    handleEnableForm(false, false, modalShow);

    setLblBtnSubmit("Updating .....");
    await Delay();
    
    handleEnableForm(true, true, "");
    setLblBtnSubmit("Submit");
    toastr["info"]("record had been Updated");
  }

  const handleFormAuthorizeApprove = async (e) => {
    e.preventDefault();
    handleEnableForm(false, false, modalShow);
    setLblBtnApprove("Approving .....");

    await Delay();

    handleEnableForm(true, true, "");
    setLblBtnApprove("Submit");
    toastr["success"]("record had been Approved");
  }

  const handleFormAuthorizeDelete = async (e) => {
    e.preventDefault();
    handleEnableForm(false, false, modalShow);
    setLblBtnDelete("Deleting .....");

    await Delay();

    handleEnableForm(true, true, "");
    setLblBtnDelete("Submit");
    toastr["danger"]("record had been Deleted");
  }


  return (
    <AppShell>

      <div className="row">
        <div className="col-12">
          <div className="page-title-box d-sm-flex align-items-center justify-content-between">
            <div className="page-title-right">
              <ol className="breadcrumb m-0">
                <li className="breadcrumb-item">Core System</li>
                <li className="breadcrumb-item">Modules</li>
                <li className="breadcrumb-item">Applictions</li>
              </ol>
            </div>
          </div>
        </div>
      </div>

      <div data-bs-backdrop="static" data-bs-keyboard="false" role="dialog" aria-hidden="true" className={`modal fade ${modalShow === "" ? '' : 'show'}`} style={{ display: modalShow === "" ? "none" : "block" }}>
        <div className="modal-dialog" role="document">
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
                        <button disabled={enableButtons} type="submit" className="btn btn-success" onClick={handleFormAuthorizeApprove}>{lblBtnApprove}</button>
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

                    <div className="mb-2 col-md-12">
                      <label className="form-label mb-1">Module Name</label>
                      <select
                        className="form-control"
                        id="selectmulti-form_module"
                        readOnly={enableForm ?? !formNotAllowEdit.includes(modalShow)}
                        disabled={enableForm ?? !formNotAllowEdit.includes(modalShow)}
                        onChange={(e) => setForm({ ...form, id_module: e.target.value })}
                      />
                    </div>

                    <div className="mb-2 col-md-12">
                      <label className="form-label mb-1">Application Name</label>
                      <InputText
                        id="" name=""
                        value={form.full_name || ''} disable={enableForm ?? !formNotAllowEdit.includes(modalShow)}
                        onChange={(e) => setForm({ ...form, full_name: e.target.value })}
                      />
                    </div>

                    <div className="mb-2 col-md-12">
                      <label className="form-label mb-1">Status</label>
                      <SelectSingle
                        id="form_status"
                        value={form.UserStatus || ''} disable={enableForm ?? !formNotAllowEdit.includes(modalShow)}
                        onChange={(e) => setForm({ ...form, UserStatus: e.target.value })}
                        listitems={[
                          {value:"1", label:"Enable"},
                          {value:"0", label:"Disable"}
                        ]}
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

          </div>
        </div>
      </div>

      <div className="row">
        <div className="col-lg-12">
          <div className="card">

            <div className="card-body pb-0">
              <div className="d-flex align-items-center">
                <span className="mb-0 card-title flex-grow-1 text-muted">System Applictions in Modules</span>
                <div className="d-flex flex-wrap gap-1">
                  <a className="btn btn-primary" href="#!" onClick={(e) => { e.preventDefault(); handleFormOpen("123456", "Create"); }}>Add New</a>
                  <a className="btn btn-light" href="#!"><i className="mdi mdi-refresh"></i></a>
                </div>
              </div>
            </div>

            <div className="card-body pt-2 pb-0">
              <div className="row px-2">
                
                <div className="col-md-1 px-1"></div>
                      
                <div className="col-md-3 px-1">
                  <InputText id="search_text" />
                </div>

                <div className="col-md-3 px-1">
                  <SelectSingle
                    id="search_status"
                    listitems={[
                      {value:"", label:"All Modules"},
                      {value:"1", label:"Enable"},
                      {value:"0", label:"Disabled"}
                    ]}
                  />
                </div>
                      
                <div className="col-md-2 px-1">
                  <SelectSingle
                    id="search_status"
                    listitems={[
                      {value:"", label:"All Status"},
                      {value:"1", label:"Enable"},
                      {value:"0", label:"Disabled"}
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
                    <th className="py-2 col-4">Module Name</th>
                    <th className="py-2 col-6">Application Name</th>
                    <th className="py-2 col-1 text-center">Status</th>
                    <th className="py-2 col-1 text-center">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {Array.from({ length: 5 }).map((_, index) => (
                    <tr key={index}>
                      <td className="py-1">User Name {index + 1}</td>
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
