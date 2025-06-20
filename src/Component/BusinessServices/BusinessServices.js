import React, { useState, useEffect } from 'react';
import styles from '../BusinessServices/BusinessServices.module.css';
import { useNavigate } from "react-router-dom";
import { validateEmail as validateEmailAPI } from '../../Store/apiStore';
import PopUp from '../Popup/Popup';
import { useAgentCreator } from '../../hooks/useAgentCreator';
const BusinessServices = () => {
    const navigate = useNavigate();
    const [businessType, setBusinessType] = useState("Restaurant");
    const [selectedService, setSelectedService] = useState([]);
    const [businessName, setBusinessName] = useState("");
    const [businessSize, setBusinessSize] = useState("");
    const [email, setEmail] = useState("");
    // Error states
    const [emailError, setEmailError] = useState("");
    const [serviceError, setServiceError] = useState("");
    const [isEmailVerified, setIsEmailVerified] = useState(false);
    const [popupMessage, setPopupMessage] = useState("");
    const [popupType, setPopupType] = useState("");
    // const [selectedServices, setSelectedServices] = useState([]);
    const [Loading, setLoading] = useState(false);
    const [showPopup, setShowPopup] = useState(false);
    const stepEditingMode = localStorage.getItem('UpdationModeStepWise')
    const EditingMode = localStorage.getItem('UpdationMode')
    const setHasFetched = true
    const { handleCreateAgent } = useAgentCreator({
        stepValidator: () => "businesServices",
        setLoading,
        setPopupMessage,
        setPopupType,
        setShowPopup,
        navigate,
        setHasFetched,
    });

    const businessServices = [
        {
            type: "Restaurant",
            subtype: "Your Journey Begins Here",
            icon: "svg/Restaurant-icon.svg",
            services: [
                "Dine-in Service",
                "Takeaway Orders",
                "Home Delivery",
                "Event Catering",
                "Online Ordering"
            ]
        },
        {
            type: "Real Estate Broker",
            subtype: "Your Journey Begins Here",
            icon: "svg/Estate-icon.svg",
            services: [
                "Property Sales",
                "Property Rentals",
                "Property Viewings",
                "Price Valuation",
                "Legal Help"
            ]
        },
        {
            type: "Saloon",
            subtype: "Your Journey Begins Here",
            icon: "svg/Saloon-icon.svg",
            services: [
                "Haircuts",
                "Hair Spa Treatments",
                "Hair Straightening",
                "Nail Extensions",
                "Facials"
            ]
        },
        {
            type: "Doctor's Clinic",
            subtype: "Your Journey Begins Here",
            icon: "svg/Doctor-clinic-icon.svg",
            services: [
                "General Checkups",
                "Specialist Consultations",
                "Vaccinations",
                "Blood Tests",
                "Health Screenings"
            ]
        },
        {
            type: "Dry Cleaner",
            subtype: "Your Journey Begins Here",
            icon: "svg/Dry -Cleaner-icon.svg",
            services: [
                "Garment Cleaning",
                "Stain Removal",
                "Clothing Alterations",
                "Leather & Suede Cleaning"
            ]
        },
        {
            type: "Web Design Agency",
            subtype: "Your Journey Begins Here",
            icon: "svg/Web-Design-Agency-icon.svg",
            services: [
                "Website Creation",
                "Responsive Design",
                "SEO Services",
                "Website Maintenance",
                "E-commerce Setup"
            ]
        },
        {
            type: "Gym & Fitness Center",
            subtype: "Your Journey Begins Here",
            icon: "svg/Gym-icon.svg",
            services: [
                "Group Fitness Classes",
                "Weight Training Equipment",
                "Cardio Workouts",
                "Personal Training Sessions"
            ]
        },
        {
            type: "Marketing Agency",
            subtype: "Your Journey Begins Here",
            icon: "images/other.png",
            services: [
                "Social Media Advertising",
                "Content Creation",
                "Email Marketing",
                "PPC Ads",
                "Branding Strategy"
            ]
        },
        {
            type: "Personal Trainer",
            subtype: "Your Journey Begins Here",
            icon: "images/other.png",
            services: [
                "Personalized Workout Plans",
                "One-on-One Training",
                "Nutrition Guidance",
                "Fitness Assessments"
            ]
        },
        {
            type: "Architect",
            subtype: "Your Journey Begins Here",
            icon: "images/other.png",
            services: [
                "Residential Building Design",
                "Commercial Building Plans",
                "Renovation Planning",
                "Project Management"
            ]
        },
        {
            type: "Interior Designer",
            subtype: "Your Journey Begins Here",
            icon: "images/other.png",
            services: [
                "Space Planning",
                "Furniture Selection",
                "Color Consultation",
                "Lighting Design",
                "Home Makeovers"
            ]
        },
        {
            type: "Construction Services",
            subtype: "Your Journey Begins Here",
            icon: "images/other.png",
            services: [
                "New Building Construction",
                "Home Renovations",
                "Project Supervision",
                "Structural Repairs"
            ]
        },
        {
            type: "Cleaning/Janitorial Service",
            subtype: "Your Journey Begins Here",
            icon: "images/other.png",
            services: [
                "Office Cleaning",
                "Deep Carpet Cleaning",
                "Window Washing",
                "Floor Polishing",
                "Regular Maintenance"
            ]
        },
        {
            type: "Transport Company",
            subtype: "Your Journey Begins Here",
            icon: "images/other.png",
            services: [
                "Freight Shipping",
                "Passenger Transport",
                "Courier Services",
                "Vehicle Rentals",
                "Logistics Management"
            ]
        },
        {
            type: "Landscaping Company",
            subtype: "Your Journey Begins Here",
            icon: "images/other.png",
            services: [
                "Lawn Mowing & Maintenance",
                "Garden Design",
                "Tree Pruning & Removal",
                "Irrigation Installation"
            ]
        },
        {
            type: "Insurance Agency",
            subtype: "Your Journey Begins Here",
            icon: "images/other.png",
            services: [
                "Life Insurance",
                "Health Insurance",
                "Car Insurance",
                "Home Insurance",
                "Business Insurance"
            ]
        },
        {
            type: "Financial Services",
            subtype: "Your Journey Begins Here",
            icon: "images/other.png",
            services: [
                "Investment Planning",
                "Tax Preparation",
                "Retirement Planning",
                "Wealth Management",
                "Loan Consulting"
            ]
        },
        {
            type: "Accounting Services",
            subtype: "Your Journey Begins Here",
            icon: "images/other.png",
            services: [
                "Bookkeeping",
                "Tax Filing",
                "Payroll Services",
                "Financial Auditing",
                "Business Financial Reports"
            ]
        },
        {
            type: "Car Repair & Garage",
            subtype: "Your Journey Begins Here",
            icon: "images/other.png",
            services: [
                "Oil & Filter Change",
                "Brake Repairs",
                "Engine Diagnostics",
                "Tire Replacement",
                "Battery Service"
            ]
        },
        {
            type: "Boat Repair & Maintenance",
            subtype: "Your Journey Begins Here",
            icon: "images/other.png",
            services: [
                "Hull Repair",
                "Engine Maintenance",
                "Electrical System Repairs",
                "Boat Cleaning",
                "Winterizing Services"
            ]
        },
        {
            type: "Dentist",
            subtype: "Your Journey Begins Here",
            icon: "images/other.png",
            services: [
                "Teeth",
                "Cleaning",
                "Teeth Whitening",
                "Braces & Aligners",
                "Root Canal",
                "Tooth Extraction"
            ]
        },
      
        {
            type: "Property Rental & Leasing Service",
            subtype: "Your Journey Begins Here",
            icon: "images/other.png",
            services: [
                "Tenant Screening",
                "Lease Agreement Preparation",
                "Rent Collection",
                "Property Maintenance Coordination"
            ]
        },
        {
            type: "Other Local Business",
            subtype: "Your Journey Begins Here",
            icon: "images/other.png",
            services: [
                "Custom Services – Please Specify Your Business Type and Needs"
            ]
        }
    ];

    const [searchTerm, setSearchTerm] = useState("");
    const selectedBusiness = businessServices.find(biz => biz.type === businessType);
    const selectedServices = selectedBusiness?.services || [];
    const filteredServices = selectedServices.filter(service =>
        service.toLowerCase().includes(searchTerm.toLowerCase()));

    const validateService = (value) => {
        if (!value) {
            setServiceError("Please select a service.");
            return false;
        }
        setServiceError("");
        return true;
    };

    const handleContinue = () => {
        //   const isEmailValid = validateEmail(email);
        const isServiceValid = selectedService.length > 0;

        // Step 1: Get old businesServices (if any)
        const raw = sessionStorage.getItem("businesServices");
        let previous = {};
        try {
            previous = raw ? JSON.parse(raw) : {};
        } catch (err) {
            console.error("Failed to parse businesServices:", err);
        }

        // Step 2: Merge selectedService & email
        const updatedBusinessServices = {
            ...previous,
            selectedService,
            email,
        };

        sessionStorage.setItem("businesServices", JSON.stringify(updatedBusinessServices));

        //   if (isEmailValid && isServiceValid) {
        if (isServiceValid) {
            // Save selected services in sessionStorage
            sessionStorage.setItem("businessDetails", JSON.stringify({
                businessType,
                businessName,
                businessSize,
                selectedService,
                email,
            }));

            // Save selected services as selectedServices
            sessionStorage.setItem("selectedServices", JSON.stringify(selectedService));

            navigate("/about-business-next");
        } else {
            const errorMessage = isServiceValid
                ? "Please select at least one service."
                : "";

            setPopupMessage(errorMessage);
            setPopupType("failed");
        }
    };
    const handleEmailVerify = async () => {
        try {
            const response = await validateEmailAPI(email);

            if (response.valid) {
                setIsEmailVerified(true);
                setEmailError("");
                setPopupMessage("Email verified successfully!");
                setPopupType("success");
            } else {
                setIsEmailVerified(false);
                setPopupMessage("Invalid email address.");
                setPopupType("failed");
                setEmailError("Invalid email address.");
            }
        } catch (error) {
            console.error("Error verifying email:", error);
            setEmailError("Error verifying email.");
            setPopupMessage("Error verifying email.");
            setPopupType("failed");
            setIsEmailVerified(false);
        }
    };

    useEffect(() => {
        try {
            const isUpdateMode = localStorage.getItem("UpdationMode") === "ON";

            const rawBusinessDetails = sessionStorage.getItem("businessDetails");
            const rawBusinessServices = sessionStorage.getItem("businesServices");
            const businessDetails =
                rawBusinessDetails &&
                    rawBusinessDetails !== "null" &&
                    rawBusinessDetails !== "undefined"
                    ? JSON.parse(rawBusinessDetails)
                    : null;

            const businessServices =
                rawBusinessServices &&
                    rawBusinessServices !== "null" &&
                    rawBusinessServices !== "undefined"
                    ? JSON.parse(rawBusinessServices)
                    : null;

            if (!isUpdateMode) {
                if (businessDetails) {
                    setBusinessType(businessDetails.businessType || "");
                    setBusinessName(businessDetails.businessName || "");
                    setBusinessSize(businessDetails.businessSize || "");
                    // For selectedService: if it's an array, use it; if a string, try to parse it.

                    if (Array.isArray(businessDetails.selectedService)) {
                        setSelectedService(businessDetails.selectedService);
                    } else if (typeof businessDetails.selectedService === "string") {
                        try {
                            const parsed = JSON.parse(businessDetails.selectedService);
                            if (Array.isArray(parsed)) {
                                setSelectedService(parsed);
                            }
                        } catch { }
                    }
                    setEmail(businessDetails.email || "");
                }
            } else {
                if (businessDetails) {
                    setBusinessType(businessDetails.businessType || "");
                    setBusinessName(businessDetails.businessName || "");
                    setBusinessSize(businessDetails.businessSize || "");
                }

                if (businessServices?.selectedService) {
                
                    try {
                        let finalSelected = [];


                        if (typeof businessServices.selectedService === "string") {
                            const parsed = JSON.parse(businessServices.selectedService);
                            if (Array.isArray(parsed)) {
                                finalSelected = parsed;
                            }
                        } else if (Array.isArray(businessServices.selectedService)) {
                            finalSelected = businessServices.selectedService;
                        }


                        setSelectedService(finalSelected);
                        
                    } catch (err) {
                        console.error("❌ Failed to parse selectedService:", err);
                    }

                    setEmail(businessServices.email || "");
                }
            }
        } catch (error) {
            console.error("Error loading session data:", error);
        }
    }, []);



    const handleServiceToggle = (service) => {
        setSelectedService((prev) =>
            prev.includes(service)
                ? prev.filter((s) => s !== service)
                : [...prev, service]
        );
        setServiceError("");
    };

    const handleSaveEdit = (e) => {
        e.preventDefault();

        const isServiceValid = selectedService.length > 0;

        // Step 1: Get old businesServices (if any)
        const raw = sessionStorage.getItem("businesServices");
        let previous = {};
        try {
            previous = raw ? JSON.parse(raw) : {};
        } catch (err) {
            console.error("Failed to parse businesServices:", err);
        }

        // Step 2: Merge selectedService & email
        const updatedBusinessServices = {
            ...previous,
            selectedService,
            email,
        };

        sessionStorage.setItem("businesServices", JSON.stringify(updatedBusinessServices));
        sessionStorage.setItem(
            "businessDetails",
            JSON.stringify({
                businessType,
                businessName,
                businessSize,
                selectedService: updatedBusinessServices,
                email,
            })
        )

        handleCreateAgent();

    };

    return (
        <div className={styles.container} id='servies'>
            <h1 className={styles.title}>{EditingMode ? 'Edit: Business Services' : 'Business Services'}</h1>

            <div className={styles.searchBox}>
                <span className={styles.searchIcon}>
                    <img src="svg/Search-Icon.svg" alt="Search icon" />
                </span>
                <input
                    type="text"
                    placeholder="Quick find Business services"
                    className={styles.searchInput}
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>
            <div className={styles.ListDiv}>
                <div className={styles.optionList}>
                    {filteredServices.length > 0 ? (
                        filteredServices.map((service, index) => (
                            <label className={styles.option} key={index}>
                                <div className={styles.forflex}>
                                    <div className={styles.icon}>
                                        <img
                                            src={selectedBusiness.icon}
                                            alt="service-icon"
                                            className={styles.iconImg}
                                        />
                                    </div>
                                    <div>
                                        <strong>{service}</strong>
                                        <p className={styles.subType}>{selectedBusiness.subtype}</p>
                                    </div>
                                </div>

                                <div>
                                    <input
                                        type="checkbox"
                                        name="service"
                                        value={service}
                                        checked={selectedService.includes(service)}
                                        onChange={() => handleServiceToggle(service)}
                                    />
                                </div>
                            </label>
                        ))
                    ) : (
                        <p>No services match your search.</p>
                    )}
                    {serviceError && (
                        <p style={{ color: 'red', marginTop: '5px' }}>{serviceError}</p>
                    )}
                </div>

            </div>

            <div className={styles.labReq}>
                <div className={styles.inputGroup}>
                    <div className={styles.Dblock}>
                        <label> Business Email Address</label>
                        <input
                            type="email"
                            placeholder="Business Email Address"
                            value={email}
                            onChange={(e) => {
                                setEmail(e.target.value);
                                setEmailError("");
                                // setIsEmailVerified(false); 
                            }}
                        // onBlur={(e) => validateEmail(e.target.value)}
                        />
                        {emailError && (
                            <p style={{ color: 'red', marginTop: '5px' }}>{emailError}</p>
                        )}


                        {isEmailVerified && (
                            <p style={{ color: 'green', marginTop: '5px' }}>Email verified successfully!</p>
                        )}
                    </div>
                </div>
            </div>
            {/* {stepEditingMode!='ON'?  */}
            <div>
                <div type="submit">
                    <div
                        className={styles.btnTheme}
                        onClick={handleContinue}
                    // disabled={!isEmailVerified} 
                    >
                        <img src="svg/svg-theme.svg" alt="" type="button" />
                        <p>Continue</p>
                    </div>
                </div>
            </div>
            {/* :
          <div>
                <div type="submit">
                    <div
                        className={styles.btnTheme}
                        onClick={handleSaveEdit}
                        // disabled={!isEmailVerified} 
                    >
                        <img src="svg/svg-theme.svg" alt="" type="button" />
                         <p>Save Edits</p>
                    </div>
                </div>
            </div>
} */}
            {/* Show PopUp */}
            <PopUp
                type={popupType}
                message={popupMessage}
                onClose={() => setPopupMessage("")}  // Close the popup
            />
        </div>
    );
};

export default BusinessServices;