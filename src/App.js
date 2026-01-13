import React, { useState } from "react";
import "./App.css";

function App() {
  const steps = ["Section A", "Section B", "Section C", "Declaration"];

  const [currentStep, setCurrentStep] = useState(0);
  const [error, setError] = useState("");

  const [formData, setFormData] = useState({
    // Section A
    city: "",
    state: "",
    applicantName: "",
    entityType: "",
    address: "",
    pinCode: "",
    mobile: "",
    email: "",
    contactPerson: "",
    designation: "",
    existingBusiness: "",
    existingBusinessDetails: "",

    // Section B
    year1Sales: "",
    year2Sales: "",
    year3Sales: "",
    workshopCapacity: "",
    salesPlan: "",
    servicePlan: "",
    marketingPlan: "",

    // Section C
    fullName: "",
    dob: "",
    qualification: "",
    residenceAddress: "",
    permanentAddress: "",
    experience: "",
    familyDetails: "",

    // Section D
    declAccepted: false,
    declName: "",
    declPlace: "",
    declDate: "",
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const requiredFieldsByStep = {
    0: ["city", "state", "applicantName", "entityType", "mobile"],
    1: ["salesPlan", "servicePlan"],
    2: ["fullName"],
    3: ["declAccepted"],
  };

  const validateStep = () => {
    const requiredKeys = requiredFieldsByStep[currentStep] || [];
    const missing = requiredKeys.filter((key) => {
      if (key === "declAccepted") {
        return !formData.declAccepted;
      }
      return !String(formData[key]).trim();
    });

    if (missing.length > 0) {
      setError("Please fill all required (*) fields in this section.");
      return false;
    }
    setError("");
    return true;
  };

  const goNext = () => {
    if (!validateStep()) return;
    setCurrentStep((prev) => prev + 1);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const goPrev = () => {
    setError("");
    setCurrentStep((prev) => prev - 1);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateStep()) return;

    console.log("Final form data:", formData);

    alert(
      "Application submitted successfully! (Abhi ye frontend demo hai, baad me is data ko backend/DB me save kar sakte hain.)"
    );

    setFormData({
      city: "",
      state: "",
      applicantName: "",
      entityType: "",
      address: "",
      pinCode: "",
      mobile: "",
      email: "",
      contactPerson: "",
      designation: "",
      existingBusiness: "",
      existingBusinessDetails: "",
      year1Sales: "",
      year2Sales: "",
      year3Sales: "",
      workshopCapacity: "",
      salesPlan: "",
      servicePlan: "",
      marketingPlan: "",
      fullName: "",
      dob: "",
      qualification: "",
      residenceAddress: "",
      permanentAddress: "",
      experience: "",
      familyDetails: "",
      declAccepted: false,
      declName: "",
      declPlace: "",
      declDate: "",
    });
    setCurrentStep(0);
  };

  return (
    <div className="app-shell">
      <div className="layout">
        <aside className="sidebar">
          <div className="brand">
            <div className="logo-circle">EV</div>
            <div>
              <h1>Dealership Portal</h1>
              <p>EV–2W Application Form</p>
            </div>
          </div>

          <div className="sidebar-text">
            <p>
              Multi–step professional form built with <b>React.js</b>. Use this
              portal to capture dealership applications in a clean, structured
              way.
            </p>
            <ul>
              <li>Step-wise guided form</li>
              <li>Validation on each section</li>
              <li>Modern responsive UI</li>
            </ul>
          </div>
        </aside>

        <main className="content">
          <header className="content-header">
            <div>
              <h2>EV–2W Dealership Application</h2>
              <p>Fill all sections carefully before submitting.</p>
            </div>
            <span className="badge">React Frontend</span>
          </header>

          <div className="card">
            <div className="progress-wrapper">
              {steps.map((step, index) => {
                const isActive = index === currentStep;
                const isCompleted = index < currentStep;

                return (
                  <div className="progress-step" key={step}>
                    <div
                      className={`progress-dot ${
                        isActive ? "active" : ""
                      } ${isCompleted ? "completed" : ""}`}
                    >
                      {isCompleted ? "✓" : index + 1}
                    </div>
                    <p
                      className={`progress-label ${
                        isActive ? "label-active" : ""
                      }`}
                    >
                      {step}
                    </p>
                    {index < steps.length - 1 && (
                      <div
                        className={`progress-line ${
                          isCompleted ? "completed" : ""
                        }`}
                      />
                    )}
                  </div>
                );
              })}
            </div>

            {error && <div className="error-banner">{error}</div>}

            <form onSubmit={handleSubmit} className="form">
              {currentStep === 0 && (
                <>
                  <h3 className="section-title">
                    Section A – Applicant Details
                  </h3>
                  <p className="section-subtitle">
                    Provide basic details of the applicant / firm.
                  </p>

                  <div className="grid two">
                    <div className="field">
                      <label>
                        City <span>*</span>
                      </label>
                      <input
                        name="city"
                        value={formData.city}
                        onChange={handleChange}
                        placeholder="Enter city"
                      />
                    </div>

                    <div className="field">
                      <label>
                        State <span>*</span>
                      </label>
                      <input
                        name="state"
                        value={formData.state}
                        onChange={handleChange}
                        placeholder="Enter state"
                      />
                    </div>
                  </div>

                  <div className="field">
                    <label>
                      Applicant Name <span>*</span>
                    </label>
                    <input
                      name="applicantName"
                      value={formData.applicantName}
                      onChange={handleChange}
                      placeholder="Name of firm / individual"
                    />
                  </div>

                  <div className="field">
                    <label>
                      Type of Entity <span>*</span>
                    </label>
                    <div className="inline-options">
                      {["Company", "Partnership", "Proprietorship", "Others"].map(
                        (type) => (
                          <label key={type}>
                            <input
                              type="radio"
                              name="entityType"
                              value={type}
                              checked={formData.entityType === type}
                              onChange={handleChange}
                            />
                            {type}
                          </label>
                        )
                      )}
                    </div>
                  </div>

                  <div className="field">
                    <label>Registered Address</label>
                    <textarea
                      name="address"
                      rows={3}
                      value={formData.address}
                      onChange={handleChange}
                      placeholder="House no, Street, Area, City"
                    />
                  </div>

                  <div className="grid two">
                    <div className="field">
                      <label>Pin Code</label>
                      <input
                        type="number"
                        name="pinCode"
                        value={formData.pinCode}
                        onChange={handleChange}
                        placeholder="e.g. 110001"
                      />
                    </div>
                    <div className="field">
                      <label>
                        Mobile No. <span>*</span>
                      </label>
                      <input
                        name="mobile"
                        value={formData.mobile}
                        onChange={handleChange}
                        placeholder="10-digit mobile"
                      />
                    </div>
                  </div>

                  <div className="grid two">
                    <div className="field">
                      <label>Email ID</label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="example@mail.com"
                      />
                    </div>
                    <div className="field">
                      <label>Contact Person</label>
                      <input
                        name="contactPerson"
                        value={formData.contactPerson}
                        onChange={handleChange}
                        placeholder="Primary contact person"
                      />
                    </div>
                  </div>

                  <div className="field">
                    <label>Designation</label>
                    <input
                      name="designation"
                      value={formData.designation}
                      onChange={handleChange}
                      placeholder="e.g. Managing Director"
                    />
                  </div>

                  <div className="field">
                    <label>
                      Existing Business? <span>*</span>
                    </label>
                    <div className="inline-options">
                      {["Yes", "No"].map((val) => (
                        <label key={val}>
                          <input
                            type="radio"
                            name="existingBusiness"
                            value={val}
                            checked={formData.existingBusiness === val}
                            onChange={handleChange}
                          />
                          {val}
                        </label>
                      ))}
                    </div>
                  </div>

                  <div className="field">
                    <label>
                      If Yes, brief details of existing business
                    </label>
                    <textarea
                      name="existingBusinessDetails"
                      rows={3}
                      value={formData.existingBusinessDetails}
                      onChange={handleChange}
                      placeholder="Type of business, turnover, brands handled, etc."
                    />
                  </div>
                </>
              )}

              {currentStep === 1 && (
                <>
                  <h3 className="section-title">Section B – Business Plan</h3>
                  <p className="section-subtitle">
                    Projected sales and workshop / marketing plan for EV-2W.
                  </p>

                  <h4 className="subheading">Vehicle Sales Plan</h4>
                  <div className="grid three">
                    <div className="field">
                      <label>Year 1 (no. of vehicles)</label>
                      <input
                        type="number"
                        name="year1Sales"
                        value={formData.year1Sales}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="field">
                      <label>Year 2</label>
                      <input
                        type="number"
                        name="year2Sales"
                        value={formData.year2Sales}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="field">
                      <label>Year 3</label>
                      <input
                        type="number"
                        name="year3Sales"
                        value={formData.year3Sales}
                        onChange={handleChange}
                      />
                    </div>
                  </div>

                  <div className="field">
                    <label>Workshop Capacity (vehicles per day)</label>
                    <input
                      type="number"
                      name="workshopCapacity"
                      value={formData.workshopCapacity}
                      onChange={handleChange}
                      placeholder="e.g. 20"
                    />
                  </div>

                  <div className="field">
                    <label>
                      Brief Sales Plan <span>*</span>
                    </label>
                    <textarea
                      name="salesPlan"
                      rows={3}
                      value={formData.salesPlan}
                      onChange={handleChange}
                      placeholder="Showroom, digital marketing, corporate & fleet sales etc."
                    />
                  </div>

                  <div className="field">
                    <label>
                      Service & Workshop Plan <span>*</span>
                    </label>
                    <textarea
                      name="servicePlan"
                      rows={3}
                      value={formData.servicePlan}
                      onChange={handleChange}
                      placeholder="Service bays, technicians, customer handling process etc."
                    />
                  </div>

                  <div className="field">
                    <label>Marketing Plan</label>
                    <textarea
                      name="marketingPlan"
                      rows={3}
                      value={formData.marketingPlan}
                      onChange={handleChange}
                      placeholder="Local campaigns, social media, tie-ups etc."
                    />
                  </div>
                </>
              )}

              {currentStep === 2 && (
                <>
                  <h3 className="section-title">Section C – Personal Details</h3>
                  <p className="section-subtitle">
                    Key proprietor / partner / director information.
                  </p>

                  <div className="field">
                    <label>
                      Full Name <span>*</span>
                    </label>
                    <input
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleChange}
                      placeholder="Full name of key person"
                    />
                  </div>

                  <div className="grid two">
                    <div className="field">
                      <label>Date of Birth</label>
                      <input
                        type="date"
                        name="dob"
                        value={formData.dob}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="field">
                      <label>Educational Qualification</label>
                      <input
                        name="qualification"
                        value={formData.qualification}
                        onChange={handleChange}
                        placeholder="e.g. B.Com, MBA"
                      />
                    </div>
                  </div>

                  <div className="field">
                    <label>Residential Address</label>
                    <textarea
                      name="residenceAddress"
                      rows={3}
                      value={formData.residenceAddress}
                      onChange={handleChange}
                      placeholder="House no, Street, City, State"
                    />
                  </div>

                  <div className="field">
                    <label>Permanent Address</label>
                    <textarea
                      name="permanentAddress"
                      rows={3}
                      value={formData.permanentAddress}
                      onChange={handleChange}
                      placeholder="Permanent address if different"
                    />
                  </div>

                  <div className="field">
                    <label>Business / Professional Experience</label>
                    <textarea
                      name="experience"
                      rows={3}
                      value={formData.experience}
                      onChange={handleChange}
                      placeholder="Brief details of business / employment experience."
                    />
                  </div>

                  <div className="field">
                    <label>Family Details (optional)</label>
                    <textarea
                      name="familyDetails"
                      rows={3}
                      value={formData.familyDetails}
                      onChange={handleChange}
                      placeholder="Family members and their occupation (optional)."
                    />
                  </div>
                </>
              )}

              {currentStep === 3 && (
                <>
                  <h3 className="section-title">Section D – Declaration</h3>
                  <p className="section-subtitle">
                    Confirm that all information shared is correct.
                  </p>

                  <div className="field">
                    <label className="checkbox-label">
                      <input
                        type="checkbox"
                        name="declAccepted"
                        checked={formData.declAccepted}
                        onChange={handleChange}
                      />
                      I hereby declare that the information furnished above is
                      true and correct to the best of my knowledge.
                      <span> *</span>
                    </label>
                  </div>

                  <div className="grid two">
                    <div className="field">
                      <label>Name of Applicant</label>
                      <input
                        name="declName"
                        value={formData.declName}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="field">
                      <label>Place</label>
                      <input
                        name="declPlace"
                        value={formData.declPlace}
                        onChange={handleChange}
                      />
                    </div>
                  </div>

                  <div className="field">
                    <label>Date</label>
                    <input
                      type="date"
                      name="declDate"
                      value={formData.declDate}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="review-box">
                    <h4>Quick review</h4>
                    <p>
                      A short summary of key fields is logged in the browser
                      console when you submit. This is similar to how real
                      portals send your data to an API / database.
                    </p>
                  </div>
                </>
              )}

              <div className="button-row">
                {currentStep > 0 && (
                  <button
                    type="button"
                    className="btn secondary"
                    onClick={goPrev}
                  >
                    Back
                  </button>
                )}

                {currentStep < steps.length - 1 && (
                  <button
                    type="button"
                    className="btn primary"
                    onClick={goNext}
                  >
                    Next
                  </button>
                )}

                {currentStep === steps.length - 1 && (
                  <button type="submit" className="btn success">
                    Submit Application
                  </button>
                )}
              </div>
            </form>
          </div>

          <footer className="page-footer">
            EV–2W Dealership Application Portal · React Frontend · {new Date().getFullYear()}
          </footer>
        </main>
      </div>
    </div>
  );
}

export default App;
