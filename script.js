/* =========================================================
   ASCB FORM 137 REQUEST SYSTEM
   JAVASCRIPT
========================================================= */

"use strict";


/* =========================================================
   DEFAULT DATA
========================================================= */

const DEFAULT_SCHOOLS = [
    {
        name: "ANDRES SORIANO COLLEGES OF BISLIG, INC.",
        address: "Mangagoy, Bislig City"
    }
];


const DEFAULT_COURSES = [
    "BSIT",
    "BSCS",
    "BSIS",
    "BEED",
    "BSBA-MM",
    "BSBA-FM",
    "BSBA-HRDM",
    "BSED-ENGLISH"
];


/* =========================================================
   STORAGE KEYS
========================================================= */

const SCHOOL_STORAGE_KEY = "ascb_form137_schools";

const COURSE_STORAGE_KEY = "ascb_form137_courses";


/* =========================================================
   GET ELEMENTS
========================================================= */

const studentName =
    document.getElementById("studentName");

const courseSelect =
    document.getElementById("courseSelect");

const schoolSelect =
    document.getElementById("schoolSelect");

const schoolAddress =
    document.getElementById("schoolAddress");

const schoolYear =
    document.getElementById("schoolYear");

const yearSection =
    document.getElementById("yearSection");

const requestDate =
    document.getElementById("requestDate");

const purpose =
    document.getElementById("purpose");

const firstRequest =
    document.getElementById("firstRequest");

const secondRequest =
    document.getElementById("secondRequest");

const urgentRequest =
    document.getElementById("urgentRequest");

const bearerRequest =
    document.getElementById("bearerRequest");


/* =========================================================
   BUTTONS
========================================================= */

const generateBtn =
    document.getElementById("generateBtn");

const printBtn =
    document.getElementById("printBtn");

const clearBtn =
    document.getElementById("clearBtn");

const addSchoolBtn =
    document.getElementById("addSchoolBtn");

const addCourseBtn =
    document.getElementById("addCourseBtn");

const saveSchoolBtn =
    document.getElementById("saveSchoolBtn");

const saveCourseBtn =
    document.getElementById("saveCourseBtn");


/* =========================================================
   MODALS
========================================================= */

const schoolModal =
    document.getElementById("schoolModal");

const courseModal =
    document.getElementById("courseModal");


/* =========================================================
   MODAL INPUTS
========================================================= */

const newSchoolName =
    document.getElementById("newSchoolName");

const newSchoolAddress =
    document.getElementById("newSchoolAddress");

const newCourseName =
    document.getElementById("newCourseName");


/* =========================================================
   TOAST
========================================================= */

const toast =
    document.getElementById("toast");

const toastMessage =
    document.getElementById("toastMessage");


/* =========================================================
   PREVIEW ELEMENTS
========================================================= */

const previewDate =
    document.getElementById("previewDate");

const previewStudentName =
    document.getElementById("previewStudentName");

const previewCourse =
    document.getElementById("previewCourse");

const previewSchoolYear =
    document.getElementById("previewSchoolYear");

const previewYearSection =
    document.getElementById("previewYearSection");

const previewSchool =
    document.getElementById("previewSchool");

const previewSchoolAddress =
    document.getElementById("previewSchoolAddress");

const previewFirstRequest =
    document.getElementById("previewFirstRequest");

const previewSecondRequest =
    document.getElementById("previewSecondRequest");

const previewUrgent =
    document.getElementById("previewUrgent");

const previewBearer =
    document.getElementById("previewBearer");

const previewPurpose =
    document.getElementById("previewPurpose");


/* =========================================================
   INITIALIZATION
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    initializeStorage();

    loadSchools();

    loadCourses();

    setTodayDate();

    setupEvents();

    updatePreview();

});


/* =========================================================
   INITIALIZE LOCAL STORAGE
========================================================= */

function initializeStorage() {

    const savedSchools =
        localStorage.getItem(SCHOOL_STORAGE_KEY);

    const savedCourses =
        localStorage.getItem(COURSE_STORAGE_KEY);


    if (!savedSchools) {

        localStorage.setItem(
            SCHOOL_STORAGE_KEY,
            JSON.stringify(DEFAULT_SCHOOLS)
        );

    }


    if (!savedCourses) {

        localStorage.setItem(
            COURSE_STORAGE_KEY,
            JSON.stringify(DEFAULT_COURSES)
        );

    }

}


/* =========================================================
   GET SAVED SCHOOLS
========================================================= */

function getSchools() {

    try {

        const data =
            localStorage.getItem(SCHOOL_STORAGE_KEY);

        return data
            ? JSON.parse(data)
            : [...DEFAULT_SCHOOLS];

    } catch (error) {

        console.error(
            "Error loading schools:",
            error
        );

        return [...DEFAULT_SCHOOLS];

    }

}


/* =========================================================
   GET SAVED COURSES
========================================================= */

function getCourses() {

    try {

        const data =
            localStorage.getItem(COURSE_STORAGE_KEY);

        return data
            ? JSON.parse(data)
            : [...DEFAULT_COURSES];

    } catch (error) {

        console.error(
            "Error loading courses:",
            error
        );

        return [...DEFAULT_COURSES];

    }

}


/* =========================================================
   LOAD SCHOOLS
========================================================= */

function loadSchools(selectedSchool = "") {

    const schools =
        getSchools();


    schoolSelect.innerHTML = `
        <option value="">
            Select School
        </option>
    `;


    schools.forEach((school) => {

        const option =
            document.createElement("option");

        option.value =
            school.name;

        option.textContent =
            school.name;

        option.dataset.address =
            school.address || "";

        schoolSelect.appendChild(option);

    });


    if (selectedSchool) {

        schoolSelect.value =
            selectedSchool;

        updateSchoolAddress();

    }

}


/* =========================================================
   LOAD COURSES
========================================================= */

function loadCourses(selectedCourse = "") {

    const courses =
        getCourses();


    courseSelect.innerHTML = `
        <option value="">
            Select Course
        </option>
    `;


    courses.forEach((course) => {

        const option =
            document.createElement("option");

        option.value =
            course;

        option.textContent =
            course;

        courseSelect.appendChild(option);

    });


    if (selectedCourse) {

        courseSelect.value =
            selectedCourse;

    }

}


/* =========================================================
   SET TODAY DATE
========================================================= */

function setTodayDate() {

    const today =
        new Date();


    const year =
        today.getFullYear();


    const month =
        String(
            today.getMonth() + 1
        ).padStart(2, "0");


    const day =
        String(
            today.getDate()
        ).padStart(2, "0");


    requestDate.value =
        `${year}-${month}-${day}`;

}


/* =========================================================
   FORMAT DATE
========================================================= */

function formatDate(dateValue) {

    if (!dateValue) {

        return "";

    }


    const date =
        new Date(
            dateValue + "T00:00:00"
        );


    if (Number.isNaN(date.getTime())) {

        return "";

    }


    return date.toLocaleDateString(
        "en-US",
        {
            month: "long",
            day: "numeric",
            year: "numeric"
        }
    );

}


/* =========================================================
   SETUP EVENTS
========================================================= */

function setupEvents() {


    /* -----------------------------------------------------
       ADD SCHOOL
    ----------------------------------------------------- */

    if (addSchoolBtn) {

        addSchoolBtn.addEventListener(
            "click",
            openSchoolModal
        );

    }


    /* -----------------------------------------------------
       ADD COURSE
    ----------------------------------------------------- */

    if (addCourseBtn) {

        addCourseBtn.addEventListener(
            "click",
            openCourseModal
        );

    }


    /* -----------------------------------------------------
       SAVE SCHOOL
    ----------------------------------------------------- */

    if (saveSchoolBtn) {

        saveSchoolBtn.addEventListener(
            "click",
            saveNewSchool
        );

    }


    /* -----------------------------------------------------
       SAVE COURSE
    ----------------------------------------------------- */

    if (saveCourseBtn) {

        saveCourseBtn.addEventListener(
            "click",
            saveNewCourse
        );

    }


    /* -----------------------------------------------------
       SCHOOL CHANGE
    ----------------------------------------------------- */

    schoolSelect.addEventListener(
        "change",
        () => {

            updateSchoolAddress();

            updatePreview();

        }
    );


    /* -----------------------------------------------------
       COURSE CHANGE
    ----------------------------------------------------- */

    courseSelect.addEventListener(
        "change",
        updatePreview
    );


    /* -----------------------------------------------------
       INPUT EVENTS
    ----------------------------------------------------- */

    studentName.addEventListener(
        "input",
        updatePreview
    );


    schoolAddress.addEventListener(
        "input",
        updatePreview
    );


    schoolYear.addEventListener(
        "input",
        updatePreview
    );


    yearSection.addEventListener(
        "input",
        updatePreview
    );


    purpose.addEventListener(
        "input",
        updatePreview
    );


    requestDate.addEventListener(
        "change",
        updatePreview
    );


    /* -----------------------------------------------------
       REQUEST CHECKBOXES
    ----------------------------------------------------- */

    firstRequest.addEventListener(
        "change",
        () => {

            if (firstRequest.checked) {

                secondRequest.checked = false;

            }

            updatePreview();

        }
    );


    secondRequest.addEventListener(
        "change",
        () => {

            if (secondRequest.checked) {

                firstRequest.checked = false;

            }

            updatePreview();

        }
    );


    urgentRequest.addEventListener(
        "change",
        updatePreview
    );


    bearerRequest.addEventListener(
        "change",
        updatePreview
    );


    /* -----------------------------------------------------
       GENERATE
    ----------------------------------------------------- */

    generateBtn.addEventListener(
        "click",
        generateLetter
    );


    /* -----------------------------------------------------
       PRINT
    ----------------------------------------------------- */

    printBtn.addEventListener(
        "click",
        printLetter
    );


    /* -----------------------------------------------------
       CLEAR
    ----------------------------------------------------- */

    clearBtn.addEventListener(
        "click",
        clearForm
    );


    /* -----------------------------------------------------
       CLOSE MODALS
    ----------------------------------------------------- */

    document
        .querySelectorAll("[data-close]")
        .forEach((button) => {

            button.addEventListener(
                "click",
                () => {

                    const modalId =
                        button.dataset.close;

                    closeModal(
                        modalId
                    );

                }
            );

        });


    /* -----------------------------------------------------
       CLICK OUTSIDE MODAL
    ----------------------------------------------------- */

    if (schoolModal) {

        schoolModal.addEventListener(
            "click",
            (event) => {

                if (
                    event.target ===
                    schoolModal
                ) {

                    closeModal(
                        "schoolModal"
                    );

                }

            }
        );

    }


    if (courseModal) {

        courseModal.addEventListener(
            "click",
            (event) => {

                if (
                    event.target ===
                    courseModal
                ) {

                    closeModal(
                        "courseModal"
                    );

                }

            }
        );

    }


    /* -----------------------------------------------------
       ENTER KEY MODALS
    ----------------------------------------------------- */

    newSchoolName.addEventListener(
        "keydown",
        (event) => {

            if (
                event.key === "Enter"
            ) {

                event.preventDefault();

                saveNewSchool();

            }

        }
    );


    newCourseName.addEventListener(
        "keydown",
        (event) => {

            if (
                event.key === "Enter"
            ) {

                event.preventDefault();

                saveNewCourse();

            }

        }
    );


    /* -----------------------------------------------------
       ESCAPE KEY
    ----------------------------------------------------- */

    document.addEventListener(
        "keydown",
        (event) => {

            if (
                event.key === "Escape"
            ) {

                closeModal(
                    "schoolModal"
                );

                closeModal(
                    "courseModal"
                );

            }

        }
    );

}


/* =========================================================
   OPEN SCHOOL MODAL
========================================================= */

function openSchoolModal() {

    newSchoolName.value = "";

    newSchoolAddress.value = "";

    schoolModal.classList.add("show");

    setTimeout(() => {

        newSchoolName.focus();

    }, 100);

}


/* =========================================================
   OPEN COURSE MODAL
========================================================= */

function openCourseModal() {

    newCourseName.value = "";

    courseModal.classList.add("show");

    setTimeout(() => {

        newCourseName.focus();

    }, 100);

}


/* =========================================================
   CLOSE MODAL
========================================================= */

function closeModal(modalId) {

    const modal =
        document.getElementById(
            modalId
        );


    if (!modal) {

        return;

    }


    modal.classList.remove("show");

}


/* =========================================================
   SAVE NEW SCHOOL
========================================================= */

function saveNewSchool() {

    const name =
        newSchoolName.value.trim();

    const address =
        newSchoolAddress.value.trim();


    if (!name) {

        showToast(
            "Please enter the school name.",
            "error"
        );

        newSchoolName.focus();

        return;

    }


    const schools =
        getSchools();


    const alreadyExists =
        schools.some(
            (school) =>
                school.name.toLowerCase() ===
                name.toLowerCase()
        );


    if (alreadyExists) {

        showToast(
            "This school is already saved.",
            "error"
        );

        return;

    }


    const newSchool = {

        name: name,

        address:
            address || ""

    };


    schools.push(
        newSchool
    );


    localStorage.setItem(
        SCHOOL_STORAGE_KEY,
        JSON.stringify(schools)
    );


    loadSchools(
        name
    );


    if (address) {

        schoolAddress.value =
            address;

    }


    closeModal(
        "schoolModal"
    );


    updatePreview();


    showToast(
        "School successfully added and saved."
    );

}


/* =========================================================
   SAVE NEW COURSE
========================================================= */

function saveNewCourse() {

    const course =
        newCourseName.value.trim();


    if (!course) {

        showToast(
            "Please enter the course name.",
            "error"
        );

        newCourseName.focus();

        return;

    }


    const courses =
        getCourses();


    const alreadyExists =
        courses.some(
            (item) =>
                item.toLowerCase() ===
                course.toLowerCase()
        );


    if (alreadyExists) {

        showToast(
            "This course is already saved.",
            "error"
        );

        return;

    }


    courses.push(
        course
    );


    localStorage.setItem(
        COURSE_STORAGE_KEY,
        JSON.stringify(courses)
    );


    loadCourses(
        course
    );


    closeModal(
        "courseModal"
    );


    updatePreview();


    showToast(
        "Course successfully added and saved."
    );

}


/* =========================================================
   UPDATE SCHOOL ADDRESS
========================================================= */

function updateSchoolAddress() {

    const selectedOption =
        schoolSelect.options[
            schoolSelect.selectedIndex
        ];


    if (
        !selectedOption ||
        !schoolSelect.value
    ) {

        return;

    }


    const address =
        selectedOption.dataset.address || "";


    schoolAddress.value =
        address;

}


/* =========================================================
   UPDATE PREVIEW
========================================================= */

function updatePreview() {


    /* -----------------------------------------------------
       DATE
    ----------------------------------------------------- */

    const formattedDate =
        formatDate(
            requestDate.value
        );


    if (formattedDate) {

        previewDate.textContent =
            formattedDate;

    } else {

        previewDate.textContent =
            "Date";

    }


    /* -----------------------------------------------------
       STUDENT
    ----------------------------------------------------- */

    previewStudentName.textContent =
        studentName.value.trim() ||
        "STUDENT NAME";


    /* -----------------------------------------------------
       COURSE
    ----------------------------------------------------- */

    previewCourse.textContent =
        courseSelect.value ||
        "COURSE";


    /* -----------------------------------------------------
       SCHOOL YEAR
    ----------------------------------------------------- */

    previewSchoolYear.textContent =
        schoolYear.value.trim() ||
        "SCHOOL YEAR";


    /* -----------------------------------------------------
       YEAR SECTION
    ----------------------------------------------------- */

    previewYearSection.textContent =
        yearSection.value.trim() ||
        "YEAR & SECTION";


    /* -----------------------------------------------------
       SCHOOL
    ----------------------------------------------------- */

    previewSchool.textContent =
        schoolSelect.value ||
        "ANDRES SORIANO COLLEGES OF BISLIG, INC.";


    /* -----------------------------------------------------
       SCHOOL ADDRESS
    ----------------------------------------------------- */

    previewSchoolAddress.textContent =
        schoolAddress.value.trim() ||
        "Mangagoy, Bislig City";


    /* -----------------------------------------------------
       CHECKBOXES
    ----------------------------------------------------- */

    setPreviewCheck(
        previewFirstRequest,
        firstRequest.checked
    );


    setPreviewCheck(
        previewSecondRequest,
        secondRequest.checked
    );


    setPreviewCheck(
        previewUrgent,
        urgentRequest.checked
    );


    setPreviewCheck(
        previewBearer,
        bearerRequest.checked
    );


    /* -----------------------------------------------------
       PURPOSE
    ----------------------------------------------------- */

    const purposeText =
        purpose.value.trim();


    if (purposeText) {

        previewPurpose.textContent =
            "Purpose: " + purposeText;

        previewPurpose.classList.add(
            "visible"
        );

    } else {

        previewPurpose.textContent =
            "";

        previewPurpose.classList.remove(
            "visible"
        );

    }

}


/* =========================================================
   SET PREVIEW CHECK
========================================================= */

function setPreviewCheck(
    element,
    checked
) {

    if (!element) {

        return;

    }


    element.classList.toggle(
        "active",
        checked
    );

}


/* =========================================================
   GENERATE LETTER
========================================================= */

function generateLetter() {

    updatePreview();


    const missingFields = [];


    if (
        !studentName.value.trim()
    ) {

        missingFields.push(
            "Student Name"
        );

    }


    if (
        !courseSelect.value
    ) {

        missingFields.push(
            "Course"
        );

    }


    if (
        !schoolSelect.value
    ) {

        missingFields.push(
            "School"
        );

    }


    if (
        !schoolYear.value.trim()
    ) {

        missingFields.push(
            "Last School Year Attended"
        );

    }


    if (
        !yearSection.value.trim()
    ) {

        missingFields.push(
            "Year & Section"
        );

    }


    if (
        missingFields.length > 0
    ) {

        showToast(
            "Please complete: " +
            missingFields.join(", "),
            "error"
        );


        highlightMissingFields(
            missingFields
        );


        return;

    }


    /* -----------------------------------------------------
       SAVE CURRENT FORM
    ----------------------------------------------------- */

    saveCurrentForm();


    /* -----------------------------------------------------
       SCROLL PREVIEW TO TOP
    ----------------------------------------------------- */

    const paperContainer =
        document.querySelector(
            ".paper-container"
        );


    if (paperContainer) {

        paperContainer.scrollTo({
            top: 0,
            behavior: "smooth"
        });

    }


    showToast(
        "Form 137 request letter generated successfully."
    );

}


/* =========================================================
   HIGHLIGHT MISSING FIELDS
========================================================= */

function highlightMissingFields(
    fields
) {

    const map = {

        "Student Name":
            studentName,

        "Course":
            courseSelect,

        "School":
            schoolSelect,

        "Last School Year Attended":
            schoolYear,

        "Year & Section":
            yearSection

    };


    fields.forEach(
        (field) => {

            const element =
                map[field];


            if (!element) {

                return;

            }


            element.focus();


            const wrapper =
                element.closest(
                    ".input-wrapper"
                );


            if (wrapper) {

                wrapper.style.borderRadius =
                    "8px";

                wrapper.style.boxShadow =
                    "0 0 0 2px rgba(180, 35, 24, 0.30)";

            }


            setTimeout(() => {

                if (wrapper) {

                    wrapper.style.boxShadow =
                        "";

                }

            }, 1800);

        }
    );

}


/* =========================================================
   PRINT LETTER
========================================================= */

function printLetter() {

    /* Always synchronize the paper before opening Print Preview. */
    updatePreview();

    /* Give the browser one render cycle to paint the final values. */
    requestAnimationFrame(() => {
        requestAnimationFrame(() => {
            window.print();
        });
    });

}


/* =========================================================
   PRINT SYNCHRONIZATION
   Keeps screen preview and print output identical.
========================================================= */

window.addEventListener("beforeprint", () => {
    updatePreview();
});

window.addEventListener("afterprint", () => {
    updatePreview();
});


/* =========================================================
   CLEAR FORM
========================================================= */

function clearForm() {

    const confirmed =
        window.confirm(
            "Clear all entered student information?"
        );


    if (!confirmed) {

        return;

    }


    studentName.value = "";

    courseSelect.value = "";

    schoolSelect.value = "";

    schoolAddress.value = "";

    schoolYear.value = "";

    yearSection.value = "";

    purpose.value = "";

    firstRequest.checked = false;

    secondRequest.checked = false;

    urgentRequest.checked = false;

    bearerRequest.checked = false;


    setTodayDate();

    updatePreview();


    showToast(
        "Form has been cleared."
    );

}


/* =========================================================
   SAVE CURRENT FORM
========================================================= */

function saveCurrentForm() {

    const formData = {

        studentName:
            studentName.value.trim(),

        course:
            courseSelect.value,

        school:
            schoolSelect.value,

        schoolAddress:
            schoolAddress.value.trim(),

        schoolYear:
            schoolYear.value.trim(),

        yearSection:
            yearSection.value.trim(),

        requestDate:
            requestDate.value,

        purpose:
            purpose.value.trim(),

        firstRequest:
            firstRequest.checked,

        secondRequest:
            secondRequest.checked,

        urgentRequest:
            urgentRequest.checked,

        bearerRequest:
            bearerRequest.checked

    };


    localStorage.setItem(
        "ascb_form137_current_form",
        JSON.stringify(formData)
    );

}


/* =========================================================
   LOAD PREVIOUS FORM
========================================================= */

function loadPreviousForm() {

    try {

        const saved =
            localStorage.getItem(
                "ascb_form137_current_form"
            );


        if (!saved) {

            return;

        }


        const data =
            JSON.parse(saved);


        studentName.value =
            data.studentName || "";


        courseSelect.value =
            data.course || "";


        schoolSelect.value =
            data.school || "";


        updateSchoolAddress();


        if (
            data.schoolAddress
        ) {

            schoolAddress.value =
                data.schoolAddress;

        }


        schoolYear.value =
            data.schoolYear || "";


        yearSection.value =
            data.yearSection || "";


        requestDate.value =
            data.requestDate ||
            requestDate.value;


        purpose.value =
            data.purpose || "";


        firstRequest.checked =
            Boolean(
                data.firstRequest
            );


        secondRequest.checked =
            Boolean(
                data.secondRequest
            );


        urgentRequest.checked =
            Boolean(
                data.urgentRequest
            );


        bearerRequest.checked =
            Boolean(
                data.bearerRequest
            );


        updatePreview();

    } catch (error) {

        console.error(
            "Could not load previous form:",
            error
        );

    }

}


/* =========================================================
   TOAST
========================================================= */

let toastTimer = null;


function showToast(
    message,
    type = "success"
) {

    if (!toast) {

        return;

    }


    toastMessage.textContent =
        message;


    toast.classList.remove(
        "error"
    );


    if (type === "error") {

        toast.classList.add(
            "error"
        );

        toast.style.background =
            "#5b1f1f";

    } else {

        toast.style.background =
            "#183b2b";

    }


    toast.classList.add(
        "show"
    );


    clearTimeout(
        toastTimer
    );


    toastTimer =
        setTimeout(() => {

            toast.classList.remove(
                "show"
            );

        }, 3000);

}


/* =========================================================
   AUTO SAVE
========================================================= */

const autoSaveFields = [

    studentName,

    courseSelect,

    schoolSelect,

    schoolAddress,

    schoolYear,

    yearSection,

    requestDate,

    purpose,

    firstRequest,

    secondRequest,

    urgentRequest,

    bearerRequest

];


autoSaveFields.forEach(
    (field) => {

        if (!field) {

            return;

        }


        field.addEventListener(
            "input",
            saveCurrentForm
        );


        field.addEventListener(
            "change",
            saveCurrentForm
        );

    }
);


/* =========================================================
   LOAD PREVIOUS DATA AFTER INITIALIZATION
========================================================= */

window.addEventListener(
    "load",
    () => {

        setTimeout(
            () => {

                loadPreviousForm();

            },
            100
        );

    }
);


/* =========================================================
   OPTIONAL:
   DOUBLE CLICK SCHOOL TO DELETE
========================================================= */

schoolSelect.addEventListener(
    "dblclick",
    () => {

        const selected =
            schoolSelect.value;


        if (!selected) {

            return;

        }


        const confirmed =
            window.confirm(
                "Do you want to remove this school from the saved dropdown?"
            );


        if (!confirmed) {

            return;

        }


        const schools =
            getSchools();


        const filtered =
            schools.filter(
                (school) =>
                    school.name !==
                    selected
            );


        localStorage.setItem(
            SCHOOL_STORAGE_KEY,
            JSON.stringify(filtered)
        );


        loadSchools();


        schoolAddress.value = "";

        updatePreview();


        showToast(
            "School removed from the dropdown."
        );

    }
);


/* =========================================================
   OPTIONAL:
   DOUBLE CLICK COURSE TO DELETE
========================================================= */

courseSelect.addEventListener(
    "dblclick",
    () => {

        const selected =
            courseSelect.value;


        if (!selected) {

            return;

        }


        const confirmed =
            window.confirm(
                "Do you want to remove this course from the saved dropdown?"
            );


        if (!confirmed) {

            return;

        }


        const courses =
            getCourses();


        const filtered =
            courses.filter(
                (course) =>
                    course !==
                    selected
            );


        localStorage.setItem(
            COURSE_STORAGE_KEY,
            JSON.stringify(filtered)
        );


        loadCourses();


        updatePreview();


        showToast(
            "Course removed from the dropdown."
        );

    }
    
);



/* =========================================================
   END OF SCRIPT
========================================================= */
