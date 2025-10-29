// src/pages/enrollment/NewEnrollment.jsx
import React, { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  UploadCloud,
  CheckCircle2,
  Plus,
  Trash2,
  Eye,
  EyeOff,
} from "lucide-react";

/* ----------------------------- Real Select UI ----------------------------- */
function LabeledSelect({
  label,
  placeholder = "Select",
  options = [],
  value,
  onChange,
  required,
  id,
}) {
  const selectId = id || `sel-${label?.replace(/\W+/g, "-").toLowerCase()}`;
  return (
    <div className="flex-1 min-w-[240px]">
      {label && (
        <label htmlFor={selectId} className="mb-1 block text-sm font-medium text-slate-700">
          {label} {required && <span className="text-rose-600">*</span>}
        </label>
      )}
      <select
        id={selectId}
        className="w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm text-slate-700 outline-none focus:border-emerald-600"
        value={value ?? ""}
        onChange={(e) => onChange?.(e.target.value)}
        required={required}
      >
        <option value="" disabled>
          {placeholder}
        </option>
        {options.map((opt) => (
          <option key={opt} value={opt}>
            {opt}
          </option>
        ))}
      </select>
    </div>
  );
}

/* ------------------------------ DropZone UI ------------------------------- */
function DropZone({ title = "Upload a CSV file (.csv)" }) {
  return (
    <div className="rounded-md border-2 border-dashed border-slate-300 bg-white px-6 py-10 text-center text-sm text-slate-600">
      <div className="mx-auto mb-2 flex h-12 w-12 items-center justify-center rounded-full bg-slate-100">
        <UploadCloud size={20} className="text-slate-500" />
      </div>
      <div className="font-medium">{title}</div>
      <div className="mt-1 text-xs text-slate-500">Max. file size supported is 2MB</div>
    </div>
  );
}

/* ----------------------------- Guidelines Box ---------------------------- */
function CsvGuidelines() {
  return (
    <div className="rounded-md bg-slate-50 p-4 text-sm text-slate-700">
      <div className="font-semibold mb-2">Guidelines to upload CSV files</div>
      <ul className="list-disc pl-5 space-y-2">
        <li>
          <span className="font-medium">For Passwords</span><br />
          Minimum 4 characters required. Passwords can be left blank—an 8-character
          alphanumeric password will be auto-generated (users will be prompted to reset after
          first login).
        </li>
        <li>
          <span className="font-medium">For Date Fields</span><br />
          Date should be in the format <span className="font-mono">dd-mm-yyyy</span>.
        </li>
        <li>
          <span className="font-medium">For Dropdowns</span><br />
          Dropdowns are case sensitive. <span className="font-mono">John Smith ≠ john smith</span>.
        </li>
        <li>
          <span className="font-medium">For Custom Fields</span><br />
          Columns must use the prefix <span className="font-mono">#custom_</span> (e.g.,
          <span className="font-mono"> #custom_native language</span>).
        </li>
      </ul>
    </div>
  );
}

/* --------------------------- Manual Entry Row ---------------------------- */
function CountryCodeSelect({ value, onChange }) {
  const options = ["+91", "+1", "+44", "+61", "+81"];
  return (
    <select
      className="rounded-l-md border border-slate-300 bg-white px-2 py-2 text-sm text-slate-700 outline-none focus:border-emerald-600"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      style={{ width: 70 }}
    >
      {options.map((c) => (
        <option key={c} value={c}>
          {c}
        </option>
      ))}
    </select>
  );
}

function ManualLearnerRow({ row, onChange, onRemove }) {
  const [showPwd, setShowPwd] = useState(false);

  return (
    <div className="grid grid-cols-[1.2fr_1.4fr_1.6fr_1.4fr_1fr_56px] gap-2 border-t border-slate-200 px-3 py-2">
      {/* Name */}
      <input
        type="text"
        value={row.name}
        onChange={(e) => onChange({ ...row, name: e.target.value })}
        placeholder="Enter name"
        className="rounded-md border border-slate-300 px-3 py-2 text-sm outline-none focus:border-emerald-600"
      />
      {/* Email */}
      <input
        type="email"
        value={row.email}
        onChange={(e) => onChange({ ...row, email: e.target.value })}
        placeholder="Enter email address"
        className="rounded-md border border-slate-300 px-3 py-2 text-sm outline-none focus:border-emerald-600"
      />
      {/* Mobile */}
      <div className="flex">
        <CountryCodeSelect
          value={row.cc}
          onChange={(cc) => onChange({ ...row, cc })}
        />
        <input
          type="tel"
          value={row.mobile}
          onChange={(e) => onChange({ ...row, mobile: e.target.value })}
          placeholder="Enter mobile number"
          className="w-full rounded-r-md border border-slate-300 px-3 py-2 text-sm outline-none focus:border-emerald-600"
        />
      </div>
      {/* Password (optional) */}
      <div className="relative">
        <input
          type={showPwd ? "text" : "password"}
          value={row.password}
          onChange={(e) => onChange({ ...row, password: e.target.value })}
          placeholder="Enter password"
          className="w-full rounded-md border border-slate-300 px-3 py-2 pr-10 text-sm outline-none focus:border-emerald-600"
        />
        <button
          type="button"
          className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-500"
          onClick={() => setShowPwd((s) => !s)}
          title={showPwd ? "Hide" : "Show"}
        >
          {showPwd ? <EyeOff size={16} /> : <Eye size={16} />}
        </button>
      </div>
      {/* Reg. No (optional) */}
      <input
        type="text"
        value={row.regno}
        onChange={(e) => onChange({ ...row, regno: e.target.value })}
        placeholder="Enter Reg. no."
        className="rounded-md border border-slate-300 px-3 py-2 text-sm outline-none focus:border-emerald-600"
      />
      {/* Action */}
      <div className="flex items-center justify-center">
        <button
          type="button"
          onClick={onRemove}
          className="inline-flex items-center justify-center rounded-md border border-slate-300 bg-white p-2 text-slate-600 hover:bg-slate-50"
          title="Remove"
        >
          <Trash2 size={16} />
        </button>
      </div>
    </div>
  );
}

/* ---------------------------------- Page ---------------------------------- */
export default function NewEnrollment() {
  const navigate = useNavigate();
  const tabs = useMemo(
    () => [
      { key: "bulk", label: "Bulk Enrollment" },
      { key: "single", label: "Single Enrollment" },
      { key: "registration", label: "Learner Registration" },
    ],
    []
  );
  const [active, setActive] = useState("bulk");

  /* Mock options */
  const courses = ["Python: Master the Language", "Data Science 101", "AWS Cloud"];
  const batches = ["PY MAY SP", "PY JUNE SP", "PY JULY SP"];
  const currencies = ["INR", "USD"];
  const feeTemplates = ["Template A", "Template B"];
  const places = ["Karnataka", "Tamil Nadu", "Telangana"];

  /* Local state */
  const [bulk, setBulk] = useState({
    course: "",
    batch: "",
    currency: "",
    fee: "",
    pos: "",
  });

  const [single, setSingle] = useState({
    mode: "Mobile",
    value: "",
    course: "",
    batch: "",
  });

  const [regMode, setRegMode] = useState("upload"); // upload | manual

  // Manual learners list
  const [rows, setRows] = useState([
    { id: 1, name: "", email: "", cc: "+91", mobile: "", password: "", regno: "" },
  ]);

  const addRow = () =>
    setRows((r) => [
      ...r,
      {
        id: (r[r.length - 1]?.id || 0) + 1,
        name: "",
        email: "",
        cc: "+91",
        mobile: "",
        password: "",
        regno: "",
      },
    ]);

  const updateRow = (idx, value) =>
    setRows((r) => r.map((row, i) => (i === idx ? value : row)));

  const removeRow = (idx) => setRows((r) => r.filter((_, i) => i !== idx));

  const canRegister =
    rows.length > 0 &&
    rows.every(
      (r) =>
        r.name.trim() &&
        (r.email.trim() || r.mobile.trim())
    );

  return (
    <div className="p-6">
      {/* Header with back */}
      <div className="mb-4 flex items-center gap-3">
        <button
          className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 bg-white hover:bg-slate-50"
          onClick={() => navigate(-1)}
          title="Go back"
        >
          <ArrowLeft size={18} />
        </button>
        <div>
          <h1 className="text-xl font-semibold text-slate-900">New Enrollment</h1>
          <p className="text-sm text-slate-500">
            Add and enroll learners manually or import in bulk with CSVs.
          </p>
        </div>
      </div>

      {/* Tabs */}
      <div className="mb-6 border-b border-slate-200">
        <nav className="-mb-px flex gap-6">
          {tabs.map((t) => {
            const isActive = active === t.key;
            return (
              <button
                key={t.key}
                className={`py-2 text-sm font-medium ${
                  isActive
                    ? "text-emerald-700 border-b-2 border-emerald-700"
                    : "text-slate-600 hover:text-slate-900 border-b-2 border-transparent"
                }`}
                onClick={() => setActive(t.key)}
              >
                {t.label}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Tab: Bulk Enrollment */}
      {active === "bulk" && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            <LabeledSelect
              label="Course *"
              placeholder="Select course"
              options={courses}
              value={bulk.course}
              onChange={(v) => setBulk((s) => ({ ...s, course: v }))}
              required
            />
            <LabeledSelect
              label="Batch *"
              placeholder="Select batch"
              options={batches}
              value={bulk.batch}
              onChange={(v) => setBulk((s) => ({ ...s, batch: v }))}
              required
            />
            <LabeledSelect
              label="Place of Supply"
              placeholder="Select place of supply"
              options={places}
              value={bulk.pos}
              onChange={(v) => setBulk((s) => ({ ...s, pos: v }))}
            />
            <LabeledSelect
              label="Currency *"
              placeholder="Select currency"
              options={currencies}
              value={bulk.currency}
              onChange={(v) => setBulk((s) => ({ ...s, currency: v }))}
              required
            />
            <LabeledSelect
              label="Fees scheme *"
              placeholder="Select Template"
              options={feeTemplates}
              value={bulk.fee}
              onChange={(v) => setBulk((s) => ({ ...s, fee: v }))}
              required
            />
          </div>

          <div className="flex items-center justify-between">
            <button
              type="button"
              className="text-sm text-emerald-700 hover:underline"
              onClick={() => alert("Download Sample File")}
            >
              Download Sample File
            </button>
          </div>

          <DropZone />

          <div>
            <button
              className="rounded-md bg-emerald-700 px-4 py-2 text-sm font-semibold text-white hover:bg-emerald-700/90"
              onClick={() => alert("Add learners (mock)")}
              disabled={!bulk.course || !bulk.batch || !bulk.currency || !bulk.fee}
              title={!bulk.course || !bulk.batch || !bulk.currency || !bulk.fee ? "Fill required fields" : "Add learners"}
            >
              Add learners
            </button>
          </div>

          <CsvGuidelines />
        </div>
      )}

      {/* Tab: Single Enrollment */}
      {active === "single" && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
            <LabeledSelect
              label="Select email or mobile number *"
              placeholder="Choose"
              options={["Mobile", "Email"]}
              value={single.mode}
              onChange={(v) => setSingle((s) => ({ ...s, mode: v }))}
              required
            />

            {/* value input */}
            <div className="flex-1 min-w-[240px]">
              <label className="mb-1 block text-sm font-medium text-slate-700">
                {single.mode === "Mobile" ? "Enter mobile number *" : "Enter email *"}
              </label>
              <div className="flex">
                {single.mode === "Mobile" && (
                  <span className="inline-flex items-center rounded-l-md border border-slate-300 bg-slate-50 px-3 text-sm text-slate-600">
                    +91
                  </span>
                )}
                <input
                  type={single.mode === "Mobile" ? "tel" : "email"}
                  value={single.value}
                  onChange={(e) => setSingle((s) => ({ ...s, value: e.target.value }))}
                  placeholder={single.mode === "Mobile" ? "Enter mobile number" : "Enter email"}
                  className={`w-full ${single.mode === "Mobile" ? "rounded-r-md" : "rounded-md"} border border-slate-300 px-3 py-2 text-sm outline-none focus:border-emerald-600`}
                  required
                />
              </div>
            </div>

            <LabeledSelect
              label="Course *"
              placeholder="Select course"
              options={courses}
              value={single.course}
              onChange={(v) => setSingle((s) => ({ ...s, course: v }))}
              required
            />
            <LabeledSelect
              label="Batch"
              placeholder="Select batch"
              options={batches}
              value={single.batch}
              onChange={(v) => setSingle((s) => ({ ...s, batch: v }))}
            />
          </div>

          <button
            className="rounded-md bg-slate-200 px-4 py-2 text-sm font-semibold text-slate-600 disabled:opacity-60"
            disabled={!single.value || !single.course}
            onClick={() => alert("Proceed (mock)")}
          >
            Proceed
          </button>
        </div>
      )}

      {/* Tab: Learner Registration */}
      {active === "registration" && (
        <div className="space-y-6">
          <div>
            <div className="text-sm font-medium text-slate-700 mb-2">Select the mode of import</div>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              <button
                className={`rounded-md border px-4 py-4 text-left ${
                  regMode === "upload"
                    ? "border-emerald-600 ring-2 ring-emerald-100"
                    : "border-slate-200 hover:bg-slate-50"
                }`}
                onClick={() => setRegMode("upload")}
              >
                <div className="flex items-center gap-2">
                  {regMode === "upload" ? (
                    <CheckCircle2 size={18} className="text-emerald-600" />
                  ) : (
                    <div className="h-4 w-4 rounded-full border border-slate-300" />
                  )}
                  <div className="font-semibold">Upload file</div>
                </div>
                <div className="mt-1 text-sm text-slate-600">
                  Upload a file with the learner’s details
                </div>
              </button>

              <button
                className={`rounded-md border px-4 py-4 text-left ${
                  regMode === "manual"
                    ? "border-emerald-600 ring-2 ring-emerald-100"
                    : "border-slate-200 hover:bg-slate-50"
                }`}
                onClick={() => setRegMode("manual")}
              >
                <div className="flex items-center gap-2">
                  {regMode === "manual" ? (
                    <CheckCircle2 size={18} className="text-emerald-600" />
                  ) : (
                    <div className="h-4 w-4 rounded-full border border-slate-300" />
                  )}
                  <div className="font-semibold">Enter details manually</div>
                </div>
                <div className="mt-1 text-sm text-slate-600">
                  Enter the details of one or more learners manually
                </div>
              </button>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <button
              type="button"
              className="text-sm text-emerald-700 hover:underline"
              onClick={() => alert("Download Sample File")}
            >
              Download Sample File
            </button>
          </div>

          {/* Manual entry form */}
          {regMode === "manual" ? (
            <div className="rounded-lg border border-slate-200 bg-white">
              {/* Header row */}
              <div className="grid grid-cols-[1.2fr_1.4fr_1.6fr_1.4fr_1fr_56px] gap-2 bg-slate-50 px-3 py-2 text-xs font-medium text-slate-600">
                <div>Name</div>
                <div>Email</div>
                <div>Mobile number</div>
                <div>Password (optional)</div>
                <div>Reg. No (optional)</div>
                <div className="text-right pr-2">Action</div>
              </div>

              {/* Rows */}
              {rows.map((row, idx) => (
                <ManualLearnerRow
                  key={row.id}
                  row={row}
                  onChange={(v) => updateRow(idx, v)}
                  onRemove={() => removeRow(idx)}
                />
              ))}
            </div>
          ) : (
            <>
              <DropZone />
              <CsvGuidelines />
            </>
          )}

          {/* Add another learner */}
          {regMode === "manual" && (
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={addRow}
                className="inline-flex items-center gap-2 text-sm font-medium text-emerald-700 hover:underline"
              >
                <Plus size={16} />
                Add Another Learner
              </button>
            </div>
          )}

          {/* Register button */}
          <div>
            <button
              className={`rounded-md px-4 py-2 text-sm font-semibold ${
                regMode === "manual"
                  ? canRegister
                    ? "bg-emerald-700 text-white hover:bg-emerald-700/90"
                    : "bg-slate-200 text-slate-500"
                  : "bg-slate-200 text-slate-600"
              }`}
              disabled={regMode === "manual" ? !canRegister : false}
              onClick={() => {
                if (regMode === "manual") {
                  // You can replace this with API call
                  console.log("Register rows:", rows);
                  alert("Registering learners (mock). Check console for payload.");
                } else {
                  alert("Register Learners (mock)");
                }
              }}
            >
              Register Learners
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
