import React, { useEffect, useRef, useState } from "react";
import AppShell from "../../components/AppShell.jsx";
import { Delay } from '../../utils/Helper.jsx';
import { InputText, InputDate, SelectSingle } from '../../components/Forms.jsx';


export default function PageAmlOnBoardScanning() {

  const FORM_EMPTY = {
    search_name: "",
    search_document_no: "",
    search_date_of_birth: "",
    search_gender: "",
    search_country: "",
    search_customer_type: ""
  };

  const [formSearch, setFormSearch] = useState(FORM_EMPTY);

  // refs so we don't re-run effect when state changes
  const setFormSearchRef = useRef(setFormSearch);
  setFormSearchRef.current = setFormSearch;

  useEffect(() => {
    if (!window.$ || !window.$.fn.select2 || !window.$.fn.datepicker) return;

    const $dob     = window.$("#search_date_of_birth");
    const $gender  = window.$("#search_gender");
    const $country = window.$("#search_country");
    const $ctype   = window.$("#search_customer_type");

    $gender.select2();
    $country.select2();
    $ctype.select2();

    // $dob.datepicker({
    //   autoclose: true,
    //   format: "yyyy-mm-dd",
    //   container: "#search_date_of_birth-container",
    //   todayHighlight: true,
    // });

    const onDob = (e) => {
      const v = e.format ? e.format("yyyy-mm-dd") : e.target.value;
      setFormSearchRef.current(prev => ({ ...prev, search_date_of_birth: v }));
    };

    const onGender  = (e) => setFormSearchRef.current(prev => ({ ...prev, search_gender: e.target.value }));
    const onCountry = (e) => setFormSearchRef.current(prev => ({ ...prev, search_country: e.target.value }));
    const onCType   = (e) => setFormSearchRef.current(prev => ({ ...prev, search_customer_type: e.target.value }));

    $gender.on("change", onGender);
    $country.on("change", onCountry);
    $ctype.on("change", onCType);
    $dob.on("changeDate", onDob);
    $dob.on("change", onDob);

    return () => {
      $gender.off("change", onGender);
      $country.off("change", onCountry);
      $ctype.off("change", onCType);
      $dob.off("changeDate", onDob);
      $dob.off("change", onDob);

      try { $dob.datepicker("destroy"); } catch (e) {}
      try { $gender.select2("destroy"); } catch (e) {}
      try { $country.select2("destroy"); } catch (e) {}
      try { $ctype.select2("destroy"); } catch (e) {}
    };
  }, []);

  return (
    <AppShell>

      <div className="row">
        <div className="col-12">
          <div className="page-title-box d-sm-flex align-items-center justify-content-between">
            <div className="page-title-right">
              <ol className="breadcrumb m-0">
                <li className="breadcrumb-item">Anti-Money Laundering</li>
                <li className="breadcrumb-item">OnBoard Scanning</li>
              </ol>
            </div>
          </div>
        </div>
      </div>

      <div className="row">
        <div className="col-lg-12">
          <div className="card">

            <div className="card-body">
              <div className="row px-2">
                
                <div className="mb-2 col-md-3 px-1">
                  <InputText id="search_name" value={formSearch.search_name} disable={false} placeholder="search by name"
                    onChange={(e) => { e.preventDefault(); setFormSearch({ ...formSearch, search_name: e.target.value })}}
                  />
                </div>
          
                <div className="mb-2 col-md-2 px-1">
                  <InputText id="search_document_no" value={formSearch.search_document_no} disable={false} placeholder="document no"
                    onChange={(e) => { e.preventDefault(); setFormSearch({ ...formSearch, search_document_no: e.target.value })}}
                  />
                </div>
          
                <div className="mb-2 col-md-2 px-1">
                  <InputDate id="search_date_of_birth" value={formSearch.search_date_of_birth} disable={false} placeholder="date of birth"
                    onChange={(e) => { e.preventDefault(); setFormSearch({ ...formSearch, search_date_of_birth: e.target.value })}}
                  />
                </div>
          
                <div className="mb-2 col-md-2 px-1">
                  <SelectSingle id="search_gender" onChange={(e) => setFormSearch({ ...formSearch, search_gender: e.target.value })}
                    listitems={[
                      {value:"", label:"All Genders"},
                      {value:"M", label:"Male"},
                      {value:"F", label:"Female"}
                    ]}
                  />
                </div>
          
                <div className="mb-2 col-md-2 px-1">
                  <SelectSingle id="search_country" onChange={(e) => setFormSearch({ ...formSearch, search_country: e.target.value })}
                    listitems={[
                      {value:"", label:"All Country"},
                      {value:"KHM", label:"Country 1"},
                      {value:"CHN", label:"Country 2"}
                    ]}
                  />
                </div>
          
                {/* <div className="mb-2 col-md-2 px-1">
                  <SelectSingle id="search_customer_type" onChange={(e) => setFormSearch({ ...formSearch, search_customer_type: e.target.value })}
                    listitems={[
                      {value:"", label:"All Customer Types"},
                      {value:"Individual", label:"Individual"},
                      {value:"Cooperate", label:"Cooperate"}
                    ]}
                  />
                </div> */}

                <div className="mb-2 col-md-1 px-1">
                  <a className="btn btn-soft-secondary w-100" type="button">
                    <i className="mdi mdi-filter-outline align-middle"></i>
                    Scan
                  </a>
                </div>
          
              </div>
            </div>

            <div className="card-body pt-0">
              
              <table className="table mb-0">
                <thead>
                  <tr>
                    <th className="py-2 col-10">Module Name</th>
                    <th className="py-2 col-1 text-center">Status</th>
                    <th className="py-2 col-1 text-center">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {Array.from({ length: 5 }).map((_, index) => (
                    <tr key={index}>
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
