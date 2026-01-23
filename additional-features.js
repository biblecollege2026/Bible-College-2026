// additional-features.js
// Bible College of India - Additional Features Module

(function() {
    'use strict';

    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

    function init() {
        // Wait a bit for main page to load
        setTimeout(() => {
            addAdditionalButtons();
        }, 500);
    }

    // Add View Marksheet and Student Profile buttons
    function addAdditionalButtons() {
        const studentInfo = document.querySelector('.student-info');
        
        if (!studentInfo) {
            console.warn('Student info section not found');
            return;
        }

        // Check if buttons already exist
        if (document.getElementById('marksheetBtn')) {
            return;
        }

        // Create buttons container
        const buttonsContainer = document.createElement('div');
        buttonsContainer.className = 'header-actions';
        buttonsContainer.style.cssText = `
            display: flex;
            gap: 10px;
            align-items: center;
            flex-wrap: wrap;
        `;

        // Student Profile Button
        const profileBtn = createButton('profileBtn', '👤 Student Profile', '#667eea', '#764ba2');
        profileBtn.onclick = showStudentProfile;

        // View Marksheet Button
        const marksheetBtn = createButton('marksheetBtn', '📊 View Marksheet', '#f093fb', '#f5576c');
        marksheetBtn.onclick = showMarksheet;

        // Append buttons
        buttonsContainer.appendChild(profileBtn);
        buttonsContainer.appendChild(marksheetBtn);

        // Insert before logout button
        const logoutBtn = studentInfo.querySelector('.logout-btn');
        if (logoutBtn) {
            studentInfo.insertBefore(buttonsContainer, logoutBtn);
        } else {
            studentInfo.appendChild(buttonsContainer);
        }
    }

    // Helper function to create styled buttons
    function createButton(id, text, color1, color2) {
        const btn = document.createElement('button');
        btn.id = id;
        btn.className = 'action-btn';
        btn.innerHTML = text;
        btn.style.cssText = `
            padding: 10px 20px;
            background: linear-gradient(135deg, ${color1} 0%, ${color2} 100%);
            color: white;
            border: none;
            border-radius: 8px;
            cursor: pointer;
            font-size: 0.9em;
            font-weight: 600;
            transition: all 0.3s;
            text-transform: uppercase;
            letter-spacing: 0.5px;
        `;

        btn.onmouseenter = function() {
            this.style.transform = 'translateY(-2px)';
            this.style.boxShadow = '0 8px 20px rgba(0, 0, 0, 0.3)';
        };

        btn.onmouseleave = function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = 'none';
        };

        return btn;
    }

    // Show Student Marksheet
    function showMarksheet() {
        const email = window.studentEmail;
        
        if (!email) {
            alert('Please login first');
            return;
        }

        const studentData = STUDENT_DATA.marks[email];
        
        if (!studentData) {
            alert('No marksheet data available for your account');
            return;
        }

        // Hide current sections
        document.getElementById('pdfSelection').style.display = 'none';
        document.getElementById('pdfViewer').style.display = 'none';
        
        // Create or show marksheet section
        let marksheetSection = document.getElementById('marksheetSection');
        
        if (!marksheetSection) {
            marksheetSection = createMarksheetSection();
            document.querySelector('.container').appendChild(marksheetSection);
        }

        // Populate marksheet with data
        populateMarksheet(studentData, email);
        marksheetSection.style.display = 'block';
    }

    // Create Marksheet HTML Structure
    function createMarksheetSection() {
        const section = document.createElement('div');
        section.id = 'marksheetSection';
        section.style.cssText = 'padding: 40px; background: #f8f9fa; display: none;';
        
        section.innerHTML = `
            <div class="back-btn-container" style="margin-bottom: 20px;">
                <button class="back-btn" onclick="backToDashboardFromMarksheet()" style="
                    padding: 10px 20px;
                    background: #6c757d;
                    color: white;
                    border: none;
                    border-radius: 8px;
                    cursor: pointer;
                    font-size: 0.95em;
                    font-weight: 600;
                ">⬅️ BACK TO DASHBOARD</button>
            </div>

            <div class="marksheet-header" style="
                background: linear-gradient(135deg, #ff9800 0%, #ff5722 100%);
                color: white;
                padding: 30px;
                text-align: center;
                border-radius: 12px;
                margin-bottom: 30px;
                box-shadow: 0 5px 15px rgba(0,0,0,0.2);
            ">
                <div style="font-size: 3em; margin-bottom: 10px;">📊</div>
                <h2 style="font-size: 2em; margin-bottom: 10px;">Academic Performance</h2>
                <p id="marksheet-student-name" style="font-size: 1.3em; opacity: 0.95;"></p>
            </div>

            <div class="summary-cards" style="
                display: grid;
                grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
                gap: 20px;
                margin-bottom: 30px;
            ">
                <div class="summary-card" style="
                    background: white;
                    padding: 25px;
                    border-radius: 10px;
                    text-align: center;
                    box-shadow: 0 3px 10px rgba(0,0,0,0.1);
                    border-left: 5px solid #2196f3;
                ">
                    <div style="color: #666; font-size: 0.85em; margin-bottom: 8px; text-transform: uppercase; font-weight: 600;">TOTAL MARKS</div>
                    <div id="total-marks" style="color: #2196f3; font-size: 2.5em; font-weight: 700;">0</div>
                </div>

                <div class="summary-card" style="
                    background: white;
                    padding: 25px;
                    border-radius: 10px;
                    text-align: center;
                    box-shadow: 0 3px 10px rgba(0,0,0,0.1);
                    border-left: 5px solid #9c27b0;
                ">
                    <div style="color: #666; font-size: 0.85em; margin-bottom: 8px; text-transform: uppercase; font-weight: 600;">EXAMS TAKEN</div>
                    <div id="exams-taken" style="color: #9c27b0; font-size: 2.5em; font-weight: 700;">0/7</div>
                </div>

                <div class="summary-card" style="
                    background: white;
                    padding: 25px;
                    border-radius: 10px;
                    text-align: center;
                    box-shadow: 0 3px 10px rgba(0,0,0,0.1);
                    border-left: 5px solid #ff9800;
                ">
                    <div style="color: #666; font-size: 0.85em; margin-bottom: 8px; text-transform: uppercase; font-weight: 600;">AVERAGE</div>
                    <div id="average-score" style="color: #ff9800; font-size: 2.5em; font-weight: 700;">0</div>
                </div>

                <div class="summary-card" style="
                    background: white;
                    padding: 25px;
                    border-radius: 10px;
                    text-align: center;
                    box-shadow: 0 3px 10px rgba(0,0,0,0.1);
                    border-left: 5px solid #4caf50;
                ">
                    <div style="color: #666; font-size: 0.85em; margin-bottom: 8px; text-transform: uppercase; font-weight: 600;">PERCENTAGE</div>
                    <div id="percentage-score" style="color: #4caf50; font-size: 2.5em; font-weight: 700;">0%</div>
                </div>

                <div class="summary-card" style="
                    background: white;
                    padding: 25px;
                    border-radius: 10px;
                    text-align: center;
                    box-shadow: 0 3px 10px rgba(0,0,0,0.1);
                    border-left: 5px solid #f44336;
                ">
                    <div style="color: #666; font-size: 0.85em; margin-bottom: 8px; text-transform: uppercase; font-weight: 600;">GRADE</div>
                    <div id="grade-display" style="color: #4caf50; font-size: 2.5em; font-weight: 700;">A+</div>
                </div>
            </div>

            <div class="marks-table-container" style="
                background: white;
                padding: 30px;
                border-radius: 12px;
                box-shadow: 0 5px 15px rgba(0,0,0,0.1);
            ">
                <table id="marks-table" style="
                    width: 100%;
                    border-collapse: collapse;
                ">
                    <thead>
                        <tr style="background: #1e3c72; color: white;">
                            <th style="padding: 15px; text-align: left; font-size: 1.1em;">Exam</th>
                            <th style="padding: 15px; text-align: center; font-size: 1.1em;">Marks</th>
                            <th style="padding: 15px; text-align: center; font-size: 1.1em;">Out of</th>
                            <th style="padding: 15px; text-align: center; font-size: 1.1em;">%</th>
                            <th style="padding: 15px; text-align: center; font-size: 1.1em;">Status</th>
                        </tr>
                    </thead>
                    <tbody id="marks-table-body">
                    </tbody>
                </table>
            </div>
        `;

        return section;
    }

    // Populate Marksheet with Student Data
    function populateMarksheet(studentData, email) {
        const marks = studentData.marks;
        const examMonths = STUDENT_DATA.examMonths;
        
        // Calculate statistics
        let totalMarks = 0;
        let examsTaken = 0;
        
        marks.forEach(mark => {
            if (mark !== null) {
                totalMarks += mark;
                examsTaken++;
            }
        });

        const average = examsTaken > 0 ? (totalMarks / examsTaken).toFixed(2) : 0;
        const percentage = average;
        const grade = calculateGrade(percentage);

        // Update summary cards
        document.getElementById('marksheet-student-name').textContent = studentData.name;
        document.getElementById('total-marks').textContent = totalMarks;
        document.getElementById('exams-taken').textContent = `${examsTaken}/7`;
        document.getElementById('average-score').textContent = average;
        document.getElementById('percentage-score').textContent = percentage + '%';
        document.getElementById('grade-display').textContent = grade;

        // Set grade color
        const gradeDisplay = document.getElementById('grade-display');
        if (percentage >= 90) gradeDisplay.style.color = '#4caf50';
        else if (percentage >= 80) gradeDisplay.style.color = '#2196f3';
        else if (percentage >= 70) gradeDisplay.style.color = '#ff9800';
        else gradeDisplay.style.color = '#f44336';

        // Populate table
        const tableBody = document.getElementById('marks-table-body');
        tableBody.innerHTML = '';

        marks.forEach((mark, index) => {
            const row = document.createElement('tr');
            row.style.borderBottom = '1px solid #e0e0e0';
            
            const examMonth = examMonths[index];
            const markValue = mark !== null ? mark : 'Absent';
            const outOf = 100;
            const examPercentage = mark !== null ? mark + '%' : '-';
            const status = getStatus(mark);

            // Color code marks
            let markColor = '#333';
            if (mark === 100) markColor = '#4caf50';
            else if (mark >= 90) markColor = '#4caf50';
            else if (mark >= 80) markColor = '#2196f3';
            else if (mark >= 70) markColor = '#ff9800';
            else if (mark !== null) markColor = '#f44336';

            row.innerHTML = `
                <td style="padding: 15px; font-weight: 600;">${examMonth}</td>
                <td style="padding: 15px; text-align: center; color: ${markColor}; font-weight: 700; font-size: 1.1em;">${markValue}</td>
                <td style="padding: 15px; text-align: center;">${outOf}</td>
                <td style="padding: 15px; text-align: center; font-weight: 600;">${examPercentage}</td>
                <td style="padding: 15px; text-align: center; font-weight: 600; color: ${markColor};">${status}</td>
            `;

            tableBody.appendChild(row);
        });
    }

    // Calculate Grade
    function calculateGrade(percentage) {
        if (percentage >= 90) return 'A+';
        else if (percentage >= 80) return 'A';
        else if (percentage >= 70) return 'B+';
        else if (percentage >= 60) return 'B';
        else if (percentage >= 50) return 'C';
        else return 'F';
    }

    // Get Status based on marks
    function getStatus(mark) {
        if (mark === null) return 'Absent';
        if (mark >= 90) return 'Excellent';
        if (mark >= 80) return 'Good';
        if (mark >= 70) return 'Average';
        return 'Needs Improvement';
    }

    // Show Student Profile
    function showStudentProfile() {
        const email = window.studentEmail;
        
        if (!email) {
            alert('Please login first');
            return;
        }

        const profileData = STUDENT_DATA.profiles[email];
        
        if (!profileData) {
            alert('No profile data available for your account');
            return;
        }

        // Hide current sections
        document.getElementById('pdfSelection').style.display = 'none';
        document.getElementById('pdfViewer').style.display = 'none';
        const marksheetSection = document.getElementById('marksheetSection');
        if (marksheetSection) marksheetSection.style.display = 'none';
        
        // Create or show profile section
        let profileSection = document.getElementById('profileSection');
        
        if (!profileSection) {
            profileSection = createProfileSection();
            document.querySelector('.container').appendChild(profileSection);
        }

        // Populate profile with data
        populateProfile(profileData);
        profileSection.style.display = 'block';
    }

    // Create Profile HTML Structure
    function createProfileSection() {
        const section = document.createElement('div');
        section.id = 'profileSection';
        section.style.cssText = 'padding: 40px; background: #f8f9fa; display: none;';
        
        section.innerHTML = `
            <div class="back-btn-container" style="margin-bottom: 20px;">
                <button class="back-btn" onclick="backToDashboardFromProfile()" style="
                    padding: 10px 20px;
                    background: #6c757d;
                    color: white;
                    border: none;
                    border-radius: 8px;
                    cursor: pointer;
                    font-size: 0.95em;
                    font-weight: 600;
                ">⬅️ BACK TO DASHBOARD</button>
            </div>

            <div class="profile-header" style="
                background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                color: white;
                padding: 40px;
                text-align: center;
                border-radius: 12px;
                margin-bottom: 30px;
                box-shadow: 0 5px 15px rgba(0,0,0,0.2);
            ">
                <div style="font-size: 5em; margin-bottom: 15px;">👤</div>
                <h2 id="profile-student-name" style="font-size: 2.2em; margin-bottom: 10px; font-weight: 700;">Student Name</h2>
                <p id="profile-student-email" style="font-size: 1.1em; opacity: 0.9;"></p>
            </div>

            <div class="profile-cards" style="
                display: grid;
                grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
                gap: 25px;
            ">
                <!-- Personal Information Card -->
                <div class="profile-card" style="
                    background: white;
                    padding: 30px;
                    border-radius: 12px;
                    box-shadow: 0 5px 15px rgba(0,0,0,0.1);
                    border-top: 5px solid #2196f3;
                ">
                    <h3 style="color: #1e3c72; margin-bottom: 20px; font-size: 1.5em; display: flex; align-items: center; gap: 10px;">
                        📋 Personal Information
                    </h3>
                    <div id="personal-info"></div>
                </div>

                <!-- Church Information Card -->
                <div class="profile-card" style="
                    background: white;
                    padding: 30px;
                    border-radius: 12px;
                    box-shadow: 0 5px 15px rgba(0,0,0,0.1);
                    border-top: 5px solid #4caf50;
                ">
                    <h3 style="color: #1e3c72; margin-bottom: 20px; font-size: 1.5em; display: flex; align-items: center; gap: 10px;">
                        ⛪ Church Information
                    </h3>
                    <div id="church-info"></div>
                </div>

                <!-- Ministry Goals Card -->
                <div class="profile-card" style="
                    background: white;
                    padding: 30px;
                    border-radius: 12px;
                    box-shadow: 0 5px 15px rgba(0,0,0,0.1);
                    border-top: 5px solid #ff9800;
                    grid-column: 1 / -1;
                ">
                    <h3 style="color: #1e3c72; margin-bottom: 20px; font-size: 1.5em; display: flex; align-items: center; gap: 10px;">
                        🎯 Ministry Goals & Future Plans
                    </h3>
                    <div id="ministry-info" style="
                        background: #fff3cd;
                        padding: 20px;
                        border-radius: 8px;
                        border-left: 5px solid #ffc107;
                        font-size: 1.1em;
                        line-height: 1.6;
                        font-style: italic;
                    "></div>
                </div>
            </div>
        `;

        return section;
    }

    // Populate Profile with Student Data
    function populateProfile(profileData) {
        // Header
        document.getElementById('profile-student-name').textContent = profileData.name;
        document.getElementById('profile-student-email').textContent = window.studentEmail;

        // Personal Information
        const personalInfo = document.getElementById('personal-info');
        personalInfo.innerHTML = `
            ${createInfoRow('📍 Address', profileData.address)}
            ${createInfoRow('📱 Mobile', profileData.mobile)}
            ${createInfoRow('🎂 Date of Birth', profileData.dob)}
            ${createInfoRow('🔢 Age', profileData.age)}
            ${createInfoRow('⚧️ Gender', profileData.gender)}
            ${createInfoRow('🎓 Education', profileData.education)}
            ${createInfoRow('💼 Occupation', profileData.occupation)}
            ${createInfoRow('💑 Marital Status', profileData.marital)}
        `;

        // Church Information
        const churchInfo = document.getElementById('church-info');
        churchInfo.innerHTML = `
            ${createInfoRow('⛪ Church', profileData.church)}
            ${createInfoRow('👨‍💼 Pastor', profileData.pastor)}
            ${createInfoRow('👤 Reference 1', profileData.reference1 || 'Not Specified')}
            ${createInfoRow('👤 Reference 2', profileData.reference2 || 'Not Specified')}
        `;

        // Ministry Goals
        document.getElementById('ministry-info').textContent = profileData.futurePlan;
    }

    // Helper function to create info rows
    function createInfoRow(label, value) {
        return `
            <div style="
                display: flex;
                padding: 12px 0;
                border-bottom: 1px solid #f0f0f0;
            ">
                <div style="
                    font-weight: 600;
                    color: #666;
                    min-width: 150px;
                ">${label}:</div>
                <div style="
                    color: #333;
                    flex: 1;
                ">${value}</div>
            </div>
        `;
    }

    // Global functions for navigation
    window.backToDashboardFromMarksheet = function() {
        document.getElementById('marksheetSection').style.display = 'none';
        document.getElementById('pdfSelection').style.display = 'block';
    };

    window.backToDashboardFromProfile = function() {
        document.getElementById('profileSection').style.display = 'none';
        document.getElementById('pdfSelection').style.display = 'block';
    };

})();
