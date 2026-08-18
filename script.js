/* =========================================================
   ASCB FORM 137 REQUEST SYSTEM
   JAVASCRIPT
========================================================= */

"use strict";

/* =========================================================
   DEFAULT DATA
========================================================= */

const DEFAULT_SCHOOLS = [
    { name: "ANDRES SORIANO COLLEGES OF BISLIG, INC.", address: "Mangagoy, Bislig City" },
    { name: "TABON M. ESTRELLA NATIONAL HIGH SCHOOL", address: "Tabon, Bislig City" },
    { name: "STAND ALONE SENIOR HIGH SCHOOL", address: "Comawas, Bislig City" },
    { name: "SOUTHERN TECHNOLOGICAL INSTITUTE OF THE PHILIPPINES, INC.", address: "Andres Soriano Avenue, Mangagoy, Bislig City" },
    { name: "AGUSAN NATIONAL HIGH SCHOOL", address: "Butuan City, Surigao del Sur" },
    { name: "BERNARDO D. CARPIO NATIONAL HIGH SCHOOL", address: "Pioneer Village, Buhangin, Davao City" },
    { name: "BISLIG CITY NATIONAL HIGH SCHOOL", address: "Purok 10 Villa Josefa Poblacion, Bislig City" },
    { name: "HINATUAN NATIONAL COMPREHENSIVE HIGH SCHOOL", address: "Sto. Niño, Hinatuan, Surigao del Sur" },
    { name: "LAWIGAN NATIONAL HIGH SCHOOL", address: "Lawigan, Bislig City" },
    { name: "LINGIG NATIONAL HIGH SCHOOL", address: "Lingig 1 District" },
    { name: "MAHARLIKA NATIONAL HIGH SCHOOL", address: "Maharlika, Bislig City" }
];

const DEFAULT_COURSES = [
    "BSIT", "BSCS", "BSIS", "BEED", "BSBA-MM", "BSBA-FM", "BSBA-HRDM", "BSED-ENGLISH"
];

const MAX_STUDENTS = 8;

/* =========================================================
   STORAGE KEYS
========================================================= */

const SCHOOL_STORAGE_KEY = "ascb_form137_schools";
const COURSE_STORAGE_KEY = "ascb_form137_courses";
const CURRENT_FORM_KEY = "ascb_form137_current_form";

/* =========================================================
   STATE
========================================================= */

let studentsList = [];

/* =========================================================
   GET ELEMENTS
========================================================= */

const studentName = document.getElementById("studentName");
const courseSelect = document.getElementById("courseSelect");
const schoolSelect = document.getElementById("schoolSelect");
const schoolAddress = document.getElementById("schoolAddress");
const schoolYear = document.getElementById("schoolYear");
const yearSection = document.getElementById("yearSection");
const requestDate = document.getElementById("requestDate");
const purpose = document.getElementById("purpose");
const firstRequest = document.getElementById("firstRequest");
const secondRequest = document.getElementById("secondRequest");
const urgentRequest = document.getElementById("urgentRequest");
const bearerRequest = document.getElementById("bearerRequest");

const generateBtn = document.getElementById("generateBtn");
const printBtn = document.getElementById("printBtn");
const clearBtn = document.getElementById("clearBtn");
const addSchoolBtn = document.getElementById("addSchoolBtn");
const addCourseBtn = document.getElementById("addCourseBtn");
const addStudentBtn = document.getElementById("addStudentBtn");
const saveSchoolBtn = document.getElementById("saveSchoolBtn");
const saveCourseBtn = document.getElementById("saveCourseBtn");

const schoolModal = document.getElementById("schoolModal");
const courseModal = document.getElementById("courseModal");

const newSchoolName = document.getElementById("newSchoolName");
const newSchoolAddress = document.getElementById("newSchoolAddress");
const newCourseName = document.getElementById("newCourseName");

const toast = document.getElementById("toast");
const toastMessage = document.getElementById("toastMessage");

const studentsListContainer = document.getElementById("studentsListContainer");
const studentTableBody = document.getElementById("studentTableBody");

const previewDate = document.getElementById("previewDate");
const previewSchool = document.getElementById("previewSchool");
const previewSchoolAddress = document.getElementById("previewSchoolAddress");
const previewFirstRequest = document.getElementById("previewFirstRequest");
const previewSecondRequest = document.getElementById("previewSecondRequest");
const previewUrgent = document.getElementById("previewUrgent");
const previewBearer = document.getElementById("previewBearer");
const previewPurpose = document.getElementById("previewPurpose");

const officialHeader = document.getElementById("officialHeader");
const headerImage = document.getElementById("headerImage");

const pluralTag = document.getElementById("pluralTag");
const pluralTag2 = document.getElementById("pluralTag2");
const isAreTag = document.getElementById("isAreTag");

/* =========================================================
   INITIALIZATION
========================================================= */

document.addEventListener("DOMContentLoaded", () => {
    initializeStorage();
    loadSchools();
    loadCourses();
    setTodayDate();
    setupEvents();
    checkHeaderImage();
    renderStudentsList();
    updatePreview();
});

window.addEventListener("load", () => {
    setTimeout(() => { loadPreviousForm(); }, 100);
});

/* =========================================================
   HEADER IMAGE FALLBACK
   If Capture.JPG isn't provided next to these files, show a
   clean text-based header instead of a broken image icon.
========================================================= */

function checkHeaderImage() {
    if (!headerImage) return;

    headerImage.addEventListener("error", () => {
        officialHeader.classList.add("no-image");
    });

    if (headerImage.complete && headerImage.naturalWidth === 0) {
        officialHeader.classList.add("no-image");
    }
}

/* =========================================================
   STORAGE HELPERS
========================================================= */

function initializeStorage() {
    const savedSchools = localStorage.getItem(SCHOOL_STORAGE_KEY);
    const savedCourses = localStorage.getItem(COURSE_STORAGE_KEY);

    if (!savedSchools) {
        localStorage.setItem(SCHOOL_STORAGE_KEY, JSON.stringify(DEFAULT_SCHOOLS));
    }

    if (!savedCourses) {
        localStorage.setItem(COURSE_STORAGE_KEY, JSON.stringify(DEFAULT_COURSES));
    }
}

function getSchools() {
    try {
        const data = localStorage.getItem(SCHOOL_STORAGE_KEY);
        return data ? JSON.parse(data) : [...DEFAULT_SCHOOLS];
    } catch (error) {
        console.error("Error loading schools:", error);
        return [...DEFAULT_SCHOOLS];
    }
}

function getCourses() {
    try {
        const data = localStorage.getItem(COURSE_STORAGE_KEY);
        return data ? JSON.parse(data) : [...DEFAULT_COURSES];
    } catch (error) {
        console.error("Error loading courses:", error);
        return [...DEFAULT_COURSES];
    }
}

/* =========================================================
   LOAD SCHOOLS / COURSES INTO DROPDOWNS
========================================================= */

function loadSchools(selectedSchool = "") {
    const schools = getSchools();

    schoolSelect.innerHTML = `<option value="">Select School</option>`;

    schools.forEach((school) => {
        const option = document.createElement("option");
        option.value = school.name;
        option.textContent = school.name;
        option.dataset.address = school.address || "";
        schoolSelect.appendChild(option);
    });

    if (selectedSchool) {
        schoolSelect.value = selectedSchool;
        updateSchoolAddress();
    }
}

function loadCourses(selectedCourse = "") {
    const courses = getCourses();

    courseSelect.innerHTML = `<option value="">Select Course</option>`;

    courses.forEach((course) => {
        const option = document.createElement("option");
        option.value = course;
        option.textContent = course;
        courseSelect.appendChild(option);
    });

    if (selectedCourse) {
        courseSelect.value = selectedCourse;
    }
}

/* =========================================================
   DATE HELPERS
========================================================= */

function setTodayDate() {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, "0");
    const day = String(today.getDate()).padStart(2, "0");
    requestDate.value = `${year}-${month}-${day}`;
}

function formatDate(dateValue) {
    if (!dateValue) return "";
    const date = new Date(dateValue + "T00:00:00");
    if (Number.isNaN(date.getTime())) return "";
    return date.toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" });
}

/* =========================================================
   EVENTS
========================================================= */

function setupEvents() {

    if (addSchoolBtn) addSchoolBtn.addEventListener("click", openSchoolModal);
    if (addCourseBtn) addCourseBtn.addEventListener("click", openCourseModal);
    if (saveSchoolBtn) saveSchoolBtn.addEventListener("click", saveNewSchool);
    if (saveCourseBtn) saveCourseBtn.addEventListener("click", saveNewCourse);
    if (addStudentBtn) addStudentBtn.addEventListener("click", addStudentToList);

    schoolSelect.addEventListener("change", () => { updateSchoolAddress(); updatePreview(); saveCurrentForm(); });
    schoolAddress.addEventListener("input", () => { updatePreview(); saveCurrentForm(); });

    requestDate.addEventListener("change", () => { updatePreview(); saveCurrentForm(); });
    purpose.addEventListener("input", () => { updatePreview(); saveCurrentForm(); });

    firstRequest.addEventListener("change", () => {
        if (firstRequest.checked) secondRequest.checked = false;
        updatePreview();
        saveCurrentForm();
    });

    secondRequest.addEventListener("change", () => {
        if (secondRequest.checked) firstRequest.checked = false;
        updatePreview();
        saveCurrentForm();
    });

    urgentRequest.addEventListener("change", () => { updatePreview(); saveCurrentForm(); });
    bearerRequest.addEventListener("change", () => { updatePreview(); saveCurrentForm(); });

    generateBtn.addEventListener("click", generateLetter);
    printBtn.addEventListener("click", printLetter);
    clearBtn.addEventListener("click", clearForm);

    document.querySelectorAll("[data-close]").forEach((button) => {
        button.addEventListener("click", () => closeModal(button.dataset.close));
    });

    if (schoolModal) {
        schoolModal.addEventListener("click", (event) => {
            if (event.target === schoolModal) closeModal("schoolModal");
        });
    }

    if (courseModal) {
        courseModal.addEventListener("click", (event) => {
            if (event.target === courseModal) closeModal("courseModal");
        });
    }

    newSchoolName.addEventListener("keydown", (event) => {
        if (event.key === "Enter") { event.preventDefault(); saveNewSchool(); }
    });

    newCourseName.addEventListener("keydown", (event) => {
        if (event.key === "Enter") { event.preventDefault(); saveNewCourse(); }
    });

    studentName.addEventListener("keydown", (event) => {
        if (event.key === "Enter") { event.preventDefault(); addStudentToList(); }
    });

    document.addEventListener("keydown", (event) => {
        if (event.key === "Escape") {
            closeModal("schoolModal");
            closeModal("courseModal");
        }
    });

    schoolSelect.addEventListener("dblclick", deleteSelectedSchool);
    courseSelect.addEventListener("dblclick", deleteSelectedCourse);
}

/* =========================================================
   MODALS
========================================================= */

function openSchoolModal() {
    newSchoolName.value = "";
    newSchoolAddress.value = "";
    schoolModal.classList.add("show");
    setTimeout(() => newSchoolName.focus(), 100);
}

function openCourseModal() {
    newCourseName.value = "";
    courseModal.classList.add("show");
    setTimeout(() => newCourseName.focus(), 100);
}

function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (!modal) return;
    modal.classList.remove("show");
}

/* =========================================================
   SAVE NEW SCHOOL / COURSE
========================================================= */

function saveNewSchool() {
    const name = newSchoolName.value.trim();
    const address = newSchoolAddress.value.trim();

    if (!name) {
        showToast("Please enter the school name.", "error");
        newSchoolName.focus();
        return;
    }

    const schools = getSchools();
    const alreadyExists = schools.some((school) => school.name.toLowerCase() === name.toLowerCase());

    if (alreadyExists) {
        showToast("This school is already saved.", "error");
        return;
    }

    schools.push({ name, address: address || "" });
    localStorage.setItem(SCHOOL_STORAGE_KEY, JSON.stringify(schools));

    loadSchools(name);
    if (address) schoolAddress.value = address;

    closeModal("schoolModal");
    updatePreview();
    saveCurrentForm();
    showToast("School successfully added and saved.");
}

function saveNewCourse() {
    const course = newCourseName.value.trim();

    if (!course) {
        showToast("Please enter the course name.", "error");
        newCourseName.focus();
        return;
    }

    const courses = getCourses();
    const alreadyExists = courses.some((item) => item.toLowerCase() === course.toLowerCase());

    if (alreadyExists) {
        showToast("This course is already saved.", "error");
        return;
    }

    courses.push(course);
    localStorage.setItem(COURSE_STORAGE_KEY, JSON.stringify(courses));

    loadCourses(course);
    closeModal("courseModal");
    updatePreview();
    saveCurrentForm();
    showToast("Course successfully added and saved.");
}

/* =========================================================
   DELETE SCHOOL / COURSE (DOUBLE CLICK)
========================================================= */

function deleteSelectedSchool() {
    const selected = schoolSelect.value;
    if (!selected) return;

    const confirmed = window.confirm("Do you want to remove this school from the saved dropdown?");
    if (!confirmed) return;

    const schools = getSchools().filter((school) => school.name !== selected);
    localStorage.setItem(SCHOOL_STORAGE_KEY, JSON.stringify(schools));

    loadSchools();
    schoolAddress.value = "";
    updatePreview();
    saveCurrentForm();
    showToast("School removed from the dropdown.");
}

function deleteSelectedCourse() {
    const selected = courseSelect.value;
    if (!selected) return;

    const confirmed = window.confirm("Do you want to remove this course from the saved dropdown?");
    if (!confirmed) return;

    const courses = getCourses().filter((course) => course !== selected);
    localStorage.setItem(COURSE_STORAGE_KEY, JSON.stringify(courses));

    loadCourses();
    updatePreview();
    saveCurrentForm();
    showToast("Course removed from the dropdown.");
}

/* =========================================================
   SCHOOL ADDRESS AUTOFILL
========================================================= */

function updateSchoolAddress() {
    const selectedOption = schoolSelect.options[schoolSelect.selectedIndex];
    if (!selectedOption || !schoolSelect.value) return;
    schoolAddress.value = selectedOption.dataset.address || "";
}

/* =========================================================
   MULTI-STUDENT LIST
========================================================= */

function addStudentToList() {
    const name = studentName.value.trim();
    const course = courseSelect.value;
    const year = schoolYear.value.trim();
    const section = yearSection.value.trim();

    if (!name || !course || !year || !section) {
        showToast("Kumpletuhin muna ang detalye ng estudyante bago mag-add.", "error");
        return;
    }

    if (studentsList.length >= MAX_STUDENTS) {
        showToast(`Pinakamaramihan ay ${MAX_STUDENTS} estudyante bawat request.`, "error");
        return;
    }

    studentsList.push({ name, course, schoolYear: year, yearSection: section });

    studentName.value = "";
    courseSelect.value = "";
    schoolYear.value = "";
    yearSection.value = "";
    studentName.focus();

    renderStudentsList();
    updatePreview();
    saveCurrentForm();
    showToast("Naidagdag ang estudyante sa request.");
}

function removeStudentFromList(index) {
    studentsList.splice(index, 1);
    renderStudentsList();
    updatePreview();
    saveCurrentForm();
}

function renderStudentsList() {
    if (!studentsListContainer) return;

    studentsListContainer.innerHTML = "";

    studentsList.forEach((student, index) => {
        const item = document.createElement("div");
        item.className = "student-chip";
        item.innerHTML = `
            <span>
                <span class="student-chip-name">${index + 1}. ${escapeHtml(student.name)}</span>
                <span class="student-chip-meta">${escapeHtml(student.course)} &bull; ${escapeHtml(student.schoolYear)} &bull; ${escapeHtml(student.yearSection)}</span>
            </span>
            <button type="button" class="remove-student-btn" data-index="${index}" title="Remove">
                <i class="fa-solid fa-xmark"></i>
            </button>
        `;
        studentsListContainer.appendChild(item);
    });

    studentsListContainer.querySelectorAll(".remove-student-btn").forEach((btn) => {
        btn.addEventListener("click", () => removeStudentFromList(Number(btn.dataset.index)));
    });
}

function escapeHtml(text) {
    const div = document.createElement("div");
    div.textContent = text;
    return div.innerHTML;
}

/* =========================================================
   BUILD + RENDER STUDENT TABLE (used in preview / print)
========================================================= */

function buildStudentRows() {
    if (studentsList.length > 0) {
        return studentsList;
    }

    return [{
        name: studentName.value.trim() || "STUDENT NAME",
        course: courseSelect.value || "COURSE",
        schoolYear: schoolYear.value.trim() || "SCHOOL YEAR",
        yearSection: yearSection.value.trim() || "YEAR & SECTION"
    }];
}

function renderStudentTable() {
    if (!studentTableBody) return;

    const rows = buildStudentRows();

    studentTableBody.innerHTML = "";

    rows.forEach((student) => {
        const tr = document.createElement("tr");
        tr.innerHTML = `
            <td>${escapeHtml(student.name)}</td>
            <td>${escapeHtml(student.course)}</td>
            <td>${escapeHtml(student.schoolYear)}</td>
            <td>${escapeHtml(student.yearSection)}</td>
        `;
        studentTableBody.appendChild(tr);
    });

    const nothingFollowsRow = document.createElement("tr");
    nothingFollowsRow.innerHTML = `<td colspan="4" class="nothing-follows">*Nothing Follows*</td>`;
    studentTableBody.appendChild(nothingFollowsRow);

    /* SINGULAR / PLURAL WORDING */
    const isPlural = rows.length > 1;

    if (pluralTag) pluralTag.textContent = isPlural ? "s" : "";
    if (pluralTag2) pluralTag2.textContent = isPlural ? "s" : "";
    if (isAreTag) isAreTag.textContent = isPlural ? "are" : "is";
}

/* =========================================================
   UPDATE PREVIEW
========================================================= */

function updatePreview() {

    const formattedDate = formatDate(requestDate.value);
    previewDate.textContent = formattedDate || "Date";

    previewSchool.textContent = schoolSelect.value || "ANDRES SORIANO COLLEGES OF BISLIG, INC.";
    previewSchoolAddress.textContent = schoolAddress.value.trim() || "Mangagoy, Bislig City";

    setPreviewCheck(previewFirstRequest, firstRequest.checked);
    setPreviewCheck(previewSecondRequest, secondRequest.checked);
    setPreviewCheck(previewUrgent, urgentRequest.checked);
    setPreviewCheck(previewBearer, bearerRequest.checked);

    const purposeText = purpose.value.trim();

    if (purposeText) {
        previewPurpose.textContent = "Purpose: " + purposeText;
        previewPurpose.classList.add("visible");
    } else {
        previewPurpose.textContent = "";
        previewPurpose.classList.remove("visible");
    }

    renderStudentTable();
}

function setPreviewCheck(element, checked) {
    if (!element) return;
    element.classList.toggle("active", checked);
}

/* =========================================================
   GENERATE LETTER
========================================================= */

function generateLetter() {

    /* Auto-add any student info still sitting in the form fields */
    const hasPendingStudent =
        studentName.value.trim() ||
        courseSelect.value ||
        schoolYear.value.trim() ||
        yearSection.value.trim();

    if (hasPendingStudent) {
        const name = studentName.value.trim();
        const course = courseSelect.value;
        const year = schoolYear.value.trim();
        const section = yearSection.value.trim();

        if (name && course && year && section) {
            if (studentsList.length < MAX_STUDENTS) {
                studentsList.push({ name, course, schoolYear: year, yearSection: section });
                studentName.value = "";
                courseSelect.value = "";
                schoolYear.value = "";
                yearSection.value = "";
                renderStudentsList();
            }
        }
    }

    updatePreview();

    const missingFields = [];

    if (studentsList.length === 0) {
        missingFields.push("Student Information (complete the fields and click Add Student)");
    }

    if (!schoolSelect.value) {
        missingFields.push("School");
    }

    if (missingFields.length > 0) {
        showToast("Please complete: " + missingFields.join(", "), "error");
        highlightMissingFields();
        return;
    }

    saveCurrentForm();

    const paperContainer = document.querySelector(".paper-container");
    if (paperContainer) paperContainer.scrollTo({ top: 0, behavior: "smooth" });

    showToast("Form 137 request letter generated successfully.");
}

function highlightMissingFields() {
    const wrapper = schoolSelect.closest(".input-wrapper");
    if (!schoolSelect.value && wrapper) {
        wrapper.style.borderRadius = "8px";
        wrapper.style.boxShadow = "0 0 0 2px rgba(180, 35, 24, 0.30)";
        setTimeout(() => { wrapper.style.boxShadow = ""; }, 1800);
    }

    if (studentsList.length === 0 && addStudentBtn) {
        addStudentBtn.style.boxShadow = "0 0 0 2px rgba(180, 35, 24, 0.30)";
        setTimeout(() => { addStudentBtn.style.boxShadow = ""; }, 1800);
    }
}

/* =========================================================
   PRINT
========================================================= */

function printLetter() {
    updatePreview();
    requestAnimationFrame(() => {
        requestAnimationFrame(() => {
            window.print();
        });
    });
}

window.addEventListener("beforeprint", () => { updatePreview(); });
window.addEventListener("afterprint", () => { updatePreview(); });

/* =========================================================
   CLEAR FORM
========================================================= */

function clearForm() {
    const confirmed = window.confirm("Clear all entered student information?");
    if (!confirmed) return;

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

    studentsList = [];
    renderStudentsList();

    setTodayDate();
    updatePreview();
    saveCurrentForm();

    showToast("Form has been cleared.");
}

/* =========================================================
   SAVE / LOAD CURRENT FORM (AUTOSAVE)
========================================================= */

function saveCurrentForm() {
    const formData = {
        studentName: studentName.value.trim(),
        course: courseSelect.value,
        school: schoolSelect.value,
        schoolAddress: schoolAddress.value.trim(),
        schoolYear: schoolYear.value.trim(),
        yearSection: yearSection.value.trim(),
        requestDate: requestDate.value,
        purpose: purpose.value.trim(),
        firstRequest: firstRequest.checked,
        secondRequest: secondRequest.checked,
        urgentRequest: urgentRequest.checked,
        bearerRequest: bearerRequest.checked,
        studentsList: studentsList
    };

    localStorage.setItem(CURRENT_FORM_KEY, JSON.stringify(formData));
}

function loadPreviousForm() {
    try {
        const saved = localStorage.getItem(CURRENT_FORM_KEY);
        if (!saved) return;

        const data = JSON.parse(saved);

        studentName.value = data.studentName || "";
        courseSelect.value = data.course || "";
        schoolSelect.value = data.school || "";

        updateSchoolAddress();
        if (data.schoolAddress) schoolAddress.value = data.schoolAddress;

        schoolYear.value = data.schoolYear || "";
        yearSection.value = data.yearSection || "";
        requestDate.value = data.requestDate || requestDate.value;
        purpose.value = data.purpose || "";

        firstRequest.checked = Boolean(data.firstRequest);
        secondRequest.checked = Boolean(data.secondRequest);
        urgentRequest.checked = Boolean(data.urgentRequest);
        bearerRequest.checked = Boolean(data.bearerRequest);

        studentsList = Array.isArray(data.studentsList) ? data.studentsList : [];
        renderStudentsList();

        updatePreview();
    } catch (error) {
        console.error("Could not load previous form:", error);
    }
}

/* =========================================================
   TOAST
========================================================= */

let toastTimer = null;

function showToast(message, type = "success") {
    if (!toast) return;

    toastMessage.textContent = message;
    toast.classList.toggle("error", type === "error");
    toast.classList.add("show");

    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => { toast.classList.remove("show"); }, 3000);
}

/* =========================================================
   AUTO SAVE ON INPUT
========================================================= */

const autoSaveFields = [
    studentName, courseSelect, schoolSelect, schoolAddress,
    schoolYear, yearSection, requestDate, purpose,
    firstRequest, secondRequest, urgentRequest, bearerRequest
];

autoSaveFields.forEach((field) => {
    if (!field) return;
    field.addEventListener("input", saveCurrentForm);
    field.addEventListener("change", saveCurrentForm);
});

/* =========================================================
   END OF SCRIPT
========================================================= */
