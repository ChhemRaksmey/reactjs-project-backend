import React, { useEffect } from "react";
import { Outlet } from "react-router-dom";


export function InputText ({ id="", name="", value="", disable="", placeholder="", onChange=() => {}}) {
    return (<>
        <input
            className="form-control"
            type="text"
            id={id}
            name={name}
            placeholder={placeholder}
            readOnly={disable}
            disabled={disable}
            value={value}
            onChange={onChange}
        />
    </>);
}

export function InputNumber ({ id="", name="", value="", disable="", placeholder="", onChange=() => {}}) {
    return (<>
        <input
            className="form-control"
            type="number"
            id={id}
            name={name}
            placeholder={placeholder}
            readOnly={disable}
            disabled={disable}
            value={value}
            onChange={onChange}
        />
    </>);
}

export function InputTextArea ({ id="", name="", value="", disable="", placeholder="", onChange=() => {}}) {
    return (<>
        <textarea
            className="form-control"
            rows="4"
            id={id}
            name={name}
            placeholder={placeholder}
            readOnly={disable}
            disabled={disable}
            value={value}
            onChange={onChange}
        />
    </>);
}

export function InputCheckbox ({ label="", id="", name="", value="", disable="", placeholder="", onChange=() => {}}) {
    return (<>
        <div className="form-check">
            <label className="form-check-label">
                <input className="form-check-input" type="checkbox"
                    id={id}
                    name={name}
                    placeholder={placeholder}
                    readOnly={disable}
                    disabled={disable}
                    value={value}
                    onChange={onChange}
                /> {label || ""}
            </label>
        </div>
    </>);
}

export function InputDate ({ id="", name="", value="", disable="", format="yyyy M dd", onChange=() => {}}) {
    return (<>
        <div className="input-group" id={id}>
            <input className="form-control"
                id={id}
                name={name}
                readOnly={disable}
                disabled={disable}
                value={value}
                onChange={onChange}
                data-date-autoclose="true"
                data-date-container={"#" + id}
                data-date-format={format}
                data-provide="datepicker"
            />
        </div>
    </>);
}

export function InputTime ({ id="", name="", value="", disable="", format="yyyy M dd", onChange=() => {}}) {

    useEffect(() => {
        if (window.$ && window.$.fn.timepicker) {
        
            window.$("#" + id).timepicker({
                showMeridian: false,
                icons: { up: "mdi mdi-chevron-up", down: "mdi mdi-chevron-down" },
                appendWidgetTo: "#"+ id +"-container",
            });
        
        }
    }, []);

    return (<>
        <div className="input-group" id={id + "-container"}>
            <input
                className="form-control"
                data-provide="timepicker"
                id={id}
                name={name}
                value={value}
                readOnly={disable}
                disabled={disable}
                onChange={onChange}
            />
        </div>
    </>);
}

export function SelectSingle ({ id="", name="", value="", disable="", listitems=[], onChange=() => {}}) {

    return (<>
        <select className="form-control"
            readOnly={disable}
            disabled={disable}
            id={id}
            name={name}
            value={value}
            onChange={onChange}
        >
            {listitems.map(item => (
                <option key={item.value} value={item.value}>{item.label}</option>
            ))}
        </select>
    </>);
}

export function InputButton ({ children, id="", name="", value="", disable="", type="button", label, onChange=() => {}}) {
    return (<>
        <button className="btn btn-primary"
            disabled={disable}
            type={type}
            id={id}
            name={name}
            value={value}
            onChange={onChange}
        >{label ?? children ?? <Outlet /> ?? ""}</button>
    </>);
}

export function TabNav ({ children, mainid="", listitems=[] }) {
    return (<>
        <ul className="nav nav-tabs" role="tablist">
            {listitems.map((item, index) => (
                <li key={item.name} className="nav-item" role="presentation">
                    <a role="tab" data-bs-toggle="tab" aria-selected="false" className={"nav-link py-1 "+ (index <= 0 ? "active" : "")} href={"#tab-"+ mainid +"-"+ item.name}>
                        <span className="d-none d-sm-block">{item.label}</span>
                    </a>
                </li>
            ))}
        </ul>
        <div className="tab-content pt-3 text-muted">{children}</div>
    </>);
}







