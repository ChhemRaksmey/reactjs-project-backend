import React, { useMemo, useState } from "react";
import AppShell from "../components/AppShell.jsx";
import { Delay } from '../utils/Helper.jsx';
import { useToast } from "../context/ToastContext.jsx";


const FORM_EMPTY = { full_name: "", status: "", narrative: "" };

export default function Users() {

  const { notify } = useToast();

  const [modalCreate,    setModalCreateOpen]    = useState(false);
  const [modalEdit,      setModalEditOpen]      = useState(false);
  const [modalView,      setModalViewOpen]      = useState(false);
  const [modalAuthorize, setModalAuthorizeOpen] = useState(false);
  
  const [lblBtnSubmit,  setlblBtnSubmit]  = useState("Submit");
  const [lblBtnApprove, setlblBtnApprove] = useState("Approve");
  const [lblBtnDelete,  setlblBtnDelete]  = useState("Delete");
  
  const [formRecid,     setFormRecid]     = useState("");
  const [formCreate,    setFormCreate]    = useState(FORM_EMPTY);
  const [formEdit,      setFormEdit]      = useState(FORM_EMPTY);
  const [formView,      setFormView]      = useState(FORM_EMPTY);
  const [formAuthorize, setFormAuthorize] = useState(FORM_EMPTY);



  const handleFormOpen = (type, recid) => {

    setFormRecid(recid || "");
    setFormCreate(FORM_EMPTY);
    setFormEdit(FORM_EMPTY);
    setFormView(FORM_EMPTY);
    setFormAuthorize(FORM_EMPTY);

    setlblBtnSubmit("Submit");
    setlblBtnApprove("Approve");
    setlblBtnDelete("Delete");

    setModalCreateOpen(false);
    setModalEditOpen(false);
    setModalViewOpen(false);
    setModalAuthorizeOpen(false);

    switch (type) {
      case "Create":    setModalCreateOpen(true); break;
      case "View":      setModalViewOpen(true); break;
      case "Edit":      setModalEditOpen(true); break;
      case "Authorize": setModalAuthorizeOpen(true); break;
    }

  }

  const handleFormCreateSubmit = async (e) => {
    e.preventDefault();

    setlblBtnSubmit("Creating .....");
    console.log(formCreate);
    await Delay();

    setlblBtnSubmit("Submit");
    setModalCreateOpen(false);
    notify(`Record Had Been Created`, { type: "success" });
  }

  const handleFormEditSubmit = async (e) => {
    e.preventDefault();

    setlblBtnSubmit("Updating .....");
    console.log(formEdit);
    await Delay();

    setlblBtnSubmit("Submit");
    setModalEditOpen(false);
    notify(`Record Had Been Updated`, { type: "success" });
  }

  const handleFormAuthorizeApprove = async (e) => {
    e.preventDefault();

    setlblBtnApprove("Approving .....");
    console.log(formAuthorize);
    await Delay();

    setlblBtnApprove("Submit");
    setModalAuthorizeOpen(false);
    notify(`Record Had Been Approved`, { type: "success" });
  }

  const handleFormAuthorizeDelete = async (e) => {
    e.preventDefault();

    setlblBtnDelete("Deleting .....");
    console.log(formAuthorize);
    await Delay();

    setlblBtnDelete("Submit");
    setModalAuthorizeOpen(false);
    notify(`Record Had Been Deleted`, { type: "success" });
  }


  return (
    <AppShell>

      <div className="row">
        <div className="col-12">
          <div className="page-title-box d-sm-flex align-items-center justify-content-between">
            <h4 className="mb-sm-0 font-size-18">Modules</h4>
            <div className="page-title-right">
              <ol className="breadcrumb m-0">
                <li className="breadcrumb-item">Core System</li>
                <li className="breadcrumb-item">Modules</li>
              </ol>
            </div>
          </div>
        </div>
      </div>

      <div data-bs-backdrop="static" data-bs-keyboard="false" role="dialog" aria-hidden="true" id="modalFormCreate" className={`modal fade ${modalCreate ? 'show' : ''}`} style={{ display: modalCreate ? "block" : "none" }}>
        <div className="modal-dialog modal-lg shadow-lg" role="document">
          <div className="modal-content">

            <div className="modal-header">
              <h5 className="modal-title">Add Record</h5>
            </div>

            <div className="modal-body">
              <div className="row">

                <div className="col-md-10">
                  <label className="form-label">Module Name</label>
                  <input className="form-control" type="text" value={formCreate.full_name || ''} onChange={(e) => setFormCreate({ ...formCreate, full_name: e.target.value })} />
                </div>

                <div className="col-md-2">
                  <label className="form-label">Status</label>
                  <input className="form-control" type="text" value={formCreate.status || ''} onChange={(e) => setFormCreate({ ...formCreate, status: e.target.value })} />
                </div>

                <div className="col-md-12">
                  <label className="form-label">Module Name</label>
                  <textarea className="form-control" rows="4" value={formCreate.narrative || ''} onChange={(e) => setFormCreate({ ...formCreate, narrative: e.target.value })} />
                </div>

              </div>
            </div>

            <div className="modal-footer">
              <button type="button" className="btn btn-sm w-sm btn-primary" onClick={handleFormCreateSubmit}>{lblBtnSubmit}</button>
              <button type="button" className="btn btn-sm w-sm btn-light" onClick={handleFormOpen}>Cancel</button>
            </div>

          </div>
        </div>
      </div>

      <div data-bs-backdrop="static" data-bs-keyboard="false" role="dialog" aria-hidden="true" id="modalFormEdit" className={`modal fade ${modalEdit ? 'show' : ''}`} style={{ display: modalEdit ? "block" : "none" }}>
        <div className="modal-dialog modal-lg shadow-lg" role="document">
          <div className="modal-content">

            <div className="modal-header">
              <h5 className="modal-title">Add Record</h5>
            </div>

            <div className="modal-body">
              <div className="row">

                <div className="col-md-10">
                  <label className="form-label">Module Name</label>
                  <input className="form-control" type="text" value={formEdit.full_name || ''} onChange={(e) => setFormEdit({ ...formEdit, full_name: e.target.value })} />
                </div>

                <div className="col-md-2">
                  <label className="form-label">Status</label>
                  <input className="form-control" type="text" value={formEdit.status || ''} onChange={(e) => setFormEdit({ ...formEdit, status: e.target.value })} />
                </div>

                <div className="col-md-12">
                  <label className="form-label">Module Name</label>
                  <textarea className="form-control" rows="4" value={formEdit.narrative || ''} onChange={(e) => setFormEdit({ ...formEdit, narrative: e.target.value })} />
                </div>

              </div>
            </div>

            <div className="modal-footer">
              <button type="button" className="btn btn-sm w-sm btn-primary" onClick={handleFormEditSubmit}>{lblBtnSubmit}</button>
              <button type="button" className="btn btn-sm w-sm btn-light" onClick={handleFormOpen}>Cancel</button>
            </div>

          </div>
        </div>
      </div>

      <div data-bs-backdrop="static" data-bs-keyboard="false" role="dialog" aria-hidden="true" id="modalFormView" className={`modal fade ${modalView ? 'show' : ''}`} style={{ display: modalView ? "block" : "none" }}>
        <div className="modal-dialog modal-lg shadow-lg" role="document">
          <div className="modal-content">

            <div className="modal-header">
              <h5 className="modal-title">Add Record</h5>
            </div>

            <div className="modal-body">
              <div className="row">

                <div className="col-md-10">
                  <label className="form-label">Module Name</label>
                  <input readOnly disabled className="form-control" type="text" value={formView.full_name || ''} onChange={(e) => setFormView({ ...formView, full_name: e.target.value })} />
                </div>

                <div className="col-md-2">
                  <label className="form-label">Status</label>
                  <input readOnly disabled className="form-control" type="text" value={formView.status || ''} onChange={(e) => setFormView({ ...formView, status: e.target.value })} />
                </div>

                <div className="col-md-12">
                  <label className="form-label">Module Name</label>
                  <textarea readOnly disabled className="form-control" rows="4" value={formView.narrative || ''} onChange={(e) => setFormView({ ...formView, narrative: e.target.value })} />
                </div>

              </div>
            </div>

            <div className="modal-footer">
              <button type="button" className="btn btn-sm w-sm btn-light" onClick={handleFormOpen}>Cancel</button>
            </div>

          </div>
        </div>
      </div>

      <div data-bs-backdrop="static" data-bs-keyboard="false" role="dialog" aria-hidden="true" id="modalFormAuthorize" className={`modal fade ${modalAuthorize ? 'show' : ''}`} style={{ display: modalAuthorize ? "block" : "none" }}>
        <div className="modal-dialog modal-lg shadow-lg" role="document">
          <div className="modal-content modal-lg">

            <div className="modal-header">
              <h5 className="modal-title">Authorize Record</h5>
            </div>

            <div className="modal-body">
              <div className="row">

                <div className="col-md-10">
                  <label className="form-label">Module Name</label>
                  <input readOnly disabled className="form-control" type="text" value={formAuthorize.full_name || ''} onChange={(e) => setFormAuthorize({ ...formAuthorize, full_name: e.target.value })} />
                </div>

                <div className="col-md-2">
                  <label className="form-label">Status</label>
                  <input readOnly disabled className="form-control" type="text" value={formAuthorize.status || ''} onChange={(e) => setFormAuthorize({ ...formAuthorize, status: e.target.value })} />
                </div>

                <div className="col-md-12">
                  <label className="form-label">Module Name</label>
                  <textarea readOnly disabled className="form-control" rows="4" value={formAuthorize.narrative || ''} onChange={(e) => setFormAuthorize({ ...formAuthorize, narrative: e.target.value })} />
                </div>

              </div>
            </div>

            <div className="modal-footer">
              <button type="submit" className="btn btn-sm w-sm btn-primary" form="formAuthorize" onClick={handleFormAuthorizeApprove}>{lblBtnApprove}</button>
              <button type="submit" className="btn btn-sm w-sm btn-danger" form="formAuthorize" onClick={handleFormAuthorizeDelete}>{lblBtnDelete}</button>
              <button type="button" className="btn btn-sm w-sm btn-light" onClick={handleFormOpen}>Cancel</button>
            </div>

          </div>
        </div>
      </div>

      <div className="row">
        <div className="col-lg-12">
          <div className="card">

            <div className="card-body border-bottom">
              <div className="d-flex align-items-center">
                <span className="mb-0 card-title flex-grow-1 text-muted">System Application Main Modules</span>
                <div className="flex-shrink-0">
                  <a className="btn btn-sm ms-2 btn-primary" href="#!" onClick={(e) => { e.preventDefault(); handleFormOpen("Create", "123456"); }}>Add New</a>
                  <a className="btn btn-sm ms-2 btn-light" href="#!"><i className="mdi mdi-refresh"></i></a>
                </div>
              </div>
            </div>

            <div className="card-body border-bottom">
              <div className="row g-3">
                
                <div className="col-xxl-4 col-lg-6">
                  <input className="form-control" id="searchTableList" placeholder="Search for ..." type="search" />
                </div>
                
                <div className="col-xxl-2 col-lg-6">
                  <select aria-label="Default select example" className="form-select" id="idStatus">
                  <option value="all">Status</option>
                  <option value="Active">Active</option>
                  <option value="New">New</option>
                  <option value="Close">Close</option>
                  </select>
                </div>
                
                <div className="col-xxl-2 col-lg-4">
                  <select aria-label="Default select example" className="form-select" id="idType">
                    <option value="all">Select Type</option>
                    <option value="Full Time">Full Time</option>
                    <option value="Part Time">Part Time</option>
                  </select>
                </div>
                
                <div className="col-xxl-2 col-lg-4">
                  <div id="datepicker1">
                  <input className="form-control" data-date-autoclose="true" data-date-container="#datepicker1" data-date-format="dd M, yyyy" data-provide="datepicker" placeholder="Select date" type="text" />
                  </div>
                </div>
                
                <div className="col-xxl-2 col-lg-4">
                  <a className="btn btn-soft-secondary w-100" type="button">
                    <i className="mdi mdi-filter-outline align-middle"></i>
                    Filter
                  </a>
                </div>

              </div>
            </div>

            <div className="card-body">
              <table className="table mb-0">
                <thead>
                  <tr>
                    <th className="py-2 col-11">Full Name</th>
                    <th className="py-2 col-1 text-center">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="py-2">1</td>
                    <td className="py-2 text-center">
                      <div className="btn-group">
                        <a aria-expanded="true" className="dropdown-toggle font-size-16" data-bs-toggle="dropdown" type="button">
                          <i className="mdi mdi-cog"></i>
                        </a>
                        <div className="dropdown-menu" data-popper-placement="top-start" style={{position: "absolute", inset: "auto auto 0px 0px", margin: "0px", transform: "translate3d(0px, -28.8px, 0px)"}}>
                          <a className="font-size-12 dropdown-item" type="button" onClick={(e) => { e.preventDefault(); handleFormOpen("Create", "123456"); }}>Create</a>
                          <a className="font-size-12 dropdown-item" type="button" onClick={(e) => { e.preventDefault(); handleFormOpen("View", "123456"); }}>View</a>
                          <a className="font-size-12 dropdown-item" type="button" onClick={(e) => { e.preventDefault(); handleFormOpen("Edit", "123456"); }}>Edit</a>
                          <div className="dropdown-divider"></div>
                          <a className="font-size-12 dropdown-item" type="button" onClick={(e) => { e.preventDefault(); handleFormOpen("Authorize", "123456"); }}>Authorize</a>
                        </div>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          
          </div>
        </div>
      </div>

    </AppShell>
  );

}
