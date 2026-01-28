// Bible College of India - Professional Branding with Dual Signatures & Ranking
(function() {
    'use strict';

    if (typeof STUDENT_DATA === 'undefined') {
        console.error('STUDENT_DATA is not defined. Make sure student-data.js is loaded first.');
        return;
    }

    // --- 1. INITIALIZATION ---
    function init() {
        setTimeout(() => {
            if (window.studentEmail === 'jlibiblecollege@gmail.com' && document.getElementById('adminDashboard')) {
                if (document.getElementById('adminDashboard').style.display !== 'block') {
                    window.showAdminDashboard();
                }
            }
        }, 500);
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

    // --- 2. GLOBAL EXPOSURE ---
    window.addAdditionalButtons = function() {
        const studentInfo = document.querySelector('.student-info');
        if (!studentInfo || document.getElementById('marksheetBtn')) return;

        const buttonsContainer = document.createElement('div');
        buttonsContainer.className = 'header-actions';
        buttonsContainer.style.cssText = `display: flex; gap: 10px; align-items: center; flex-wrap: wrap;`;

        const profileBtn = createButton('profileBtn', '👤 Student Profile', '#667eea', '#764ba2');
        profileBtn.onclick = () => window.showStudentProfile(window.studentEmail);

        const marksheetBtn = createButton('marksheetBtn', '📊 View Marksheet', '#f093fb', '#f5576c');
        marksheetBtn.onclick = () => window.showMarksheet(window.studentEmail);

        buttonsContainer.appendChild(profileBtn);
        buttonsContainer.appendChild(marksheetBtn);

        const logoutBtn = studentInfo.querySelector('.logout-btn');
        if (logoutBtn) studentInfo.insertBefore(buttonsContainer, logoutBtn);
        else studentInfo.appendChild(buttonsContainer);
    };

    function createButton(id, text, color1, color2) {
        const btn = document.createElement('button');
        btn.id = id;
        btn.innerHTML = text;
        btn.style.cssText = `
            padding: 10px 20px;
            background: linear-gradient(135deg, ${color1} 0%, ${color2} 100%);
            color: white; border: none; border-radius: 8px; cursor: pointer;
            font-size: 0.9em; font-weight: 600; transition: all 0.3s;
            text-transform: uppercase; letter-spacing: 0.5px; white-space: nowrap;
        `;
        return btn;
    }

    window.showMarksheet = function(email) {
        if (!email) return;
        const studentMarksData = STUDENT_DATA.marks[email];
        const studentProfileData = STUDENT_DATA.profiles[email];

        if (!studentMarksData) {
            alert('No marksheet data available.');
            return;
        }

        window.hideAllContentSections();
        let marksheetSection = document.getElementById('marksheetSection');
        if (!marksheetSection) {
            marksheetSection = createMarksheetSection();
            document.querySelector('.container').appendChild(marksheetSection);
        }

        populateMarksheet(studentMarksData, studentProfileData, email);
        marksheetSection.style.display = 'block';
    };

    window.showStudentProfile = function(email) {
        const data = STUDENT_DATA.profiles[email];
        if (!data) return;
        window.hideAllContentSections();
        
        let section = document.getElementById('profileSection');
        if (!section) {
            section = document.createElement('div');
            section.id = 'profileSection';
            section.style.cssText = 'padding: 20px; display: none;';
            document.querySelector('.container').appendChild(section);
        }

        section.innerHTML = `
            <div style="max-width: 1000px; margin: 0 auto;">
                <button onclick="window.backToDashboardFromProfile()" style="padding: 10px 20px; background: #6c757d; color: white; border: none; border-radius: 5px; cursor: pointer; margin-bottom: 20px; font-weight: bold;">⬅ BACK TO DASHBOARD</button>
                
                <div style="text-align: center; margin-bottom: 25px; border-bottom: 2px solid #eee; padding-bottom: 20px;">
                    <h1 style="margin: 0; font-size: 2.2em; color: #1e3c72; font-family: 'Arial Black', Gadget, sans-serif; text-transform: uppercase; line-height: 1.2;">BIBLE COLLEGE OF INDIA PASTORS FOUNDATION</h1>
                    <p style="margin: 8px 0 0 0; font-size: 1em; color: #555; font-weight: 600;">(AFFILIATED TO JESUS LOVES INDIA CHURCH FOUNDATION)</p>
                </div>

                <div style="background: #00aeef; color: white; padding: 30px 20px; text-align: center; border-radius: 15px; margin-bottom: 30px; box-shadow: 0 4px 15px rgba(0,0,0,0.1);">
                    <div style="font-size: 3em; margin-bottom: 10px;">👤</div>
                    <h2 style="margin: 0; font-size: 2.2em; font-family: 'Times New Roman', serif;">Student Profile</h2>
                    <h3 style="margin: 15px 0 5px 0; font-weight: normal; font-size: 1.6em;">${data.name}</h3>
                    <p style="margin: 0; opacity: 0.9; font-size: 1.1em;">${email}</p>
                </div>

                <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(320px, 1fr)); gap: 30px; margin-bottom: 30px;">
                    <div style="background: white; padding: 25px; border-radius: 12px; border-left: 10px solid #4caf50; box-shadow: 0 5px 15px rgba(0,0,0,0.08);">
                        <h3 style="color: #1e3c72; margin-top: 0; border-bottom: 2px solid #eee; padding-bottom: 15px; font-size: 1.5em;">Personal Information</h3>
                        <div style="line-height: 2.5; font-size: 1.05em;">
                            <p>📍 <strong>Address:</strong> <span style="float: right;">${data.address}</span></p>
                            <p>📱 <strong>Mobile:</strong> <span style="float: right;">${data.mobile}</span></p>
                            <p>📅 <strong>DOB:</strong> <span style="float: right;">${data.dob || 'N/A'}</span></p>
                            <p>🔢 <strong>Age:</strong> <span style="float: right;">${data.age || 'N/A'}</span></p>
                            <p>⚧ <strong>Gender:</strong> <span style="float: right;">${data.gender || 'N/A'}</span></p>
                            <p>🎓 <strong>Education:</strong> <span style="float: right;">${data.education || 'N/A'}</span></p>
                        </div>
                    </div>

                    <div style="background: white; padding: 25px; border-radius: 12px; border-left: 10px solid #ff9800; box-shadow: 0 5px 15px rgba(0,0,0,0.08);">
                        <h3 style="color: #1e3c72; margin-top: 0; border-bottom: 2px solid #eee; padding-bottom: 15px; font-size: 1.5em;">Church Information</h3>
                        <div style="line-height: 2.5; font-size: 1.05em;">
                            <p>⛪ <strong>Church:</strong> <span style="float: right;">${data.church}</span></p>
                            <p>👨‍💼 <strong>Pastor:</strong> <span style="float: right;">${data.pastor}</span></p>
                            <p>👤 <strong>Ref 1:</strong> <span style="float: right;">${data.ref1 || 'N/A'}</span></p>
                            <p>👤 <strong>Ref 2:</strong> <span style="float: right;">${data.ref2 || 'N/A'}</span></p>
                        </div>
                    </div>
                </div>

                <div style="background: white; padding: 25px; border-radius: 12px; border-left: 10px solid #9c27b0; box-shadow: 0 5px 15px rgba(0,0,0,0.08); width: 100%; margin-bottom: 30px;">
                    <h3 style="color: #1e3c72; margin-top: 0; font-size: 1.5em;">Your Future plan for god's work / देवाच्या कार्यासाठी तुमची भविष्यातील योजना</h3>
                    <hr style="border: 0; border-top: 1px solid #eee; margin: 15px 0;">
                    <p style="font-size: 1.1em; color: #444; white-space: pre-wrap; line-height: 1.6;">${data.futurePlan || 'No information provided.'}</p>
                </div>
            </div>
        `;
        section.style.display = 'block';
    };

    window.downloadMarksheet = function() {
        const element = document.getElementById('marksheet-to-print');
        const name = document.getElementById('marksheet-student-name').textContent;
        const btn = document.getElementById('downloadBtn');
        btn.innerText = "⌛ Processing...";
        
        const opt = {
            margin: [10, 10, 10, 10],
            filename: `Marksheet_${name}.pdf`,
            image: { type: 'jpeg', quality: 0.98 },
            html2canvas: { scale: 2, useCORS: true },
            jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
        };

        html2pdf().set(opt).from(element).save().then(() => {
            btn.innerText = "📥 DOWNLOAD PDF";
        });
    };

    window.backToDashboardFromMarksheet = function() {
        document.getElementById('marksheetSection').style.display = 'none';
        if (window.studentEmail === 'jlibiblecollege@gmail.com') window.showAdminDashboard();
        else document.getElementById('pdfSelection').style.display = 'block';
    };

    window.backToDashboardFromProfile = function() {
        document.getElementById('profileSection').style.display = 'none';
        if (window.studentEmail === 'jlibiblecollege@gmail.com') window.showAdminDashboard();
        else document.getElementById('pdfSelection').style.display = 'block';
    };

    window.showAdminDashboard = function() {
        window.hideAllContentSections();
        const dash = document.getElementById('adminDashboard');
        if (!dash) return;
        dash.style.display = 'block';
        const list = document.getElementById('studentList');
        list.innerHTML = '';
        Object.keys(STUDENT_DATA.profiles).filter(e => e !== 'jlibiblecollege@gmail.com').forEach(email => {
            const p = STUDENT_DATA.profiles[email];
            const card = document.createElement('div');
            
            card.style.cssText = `
                background: white; 
                padding: 20px; 
                margin-bottom: 15px; 
                border-radius: 12px; 
                box-shadow: 0 4px 10px rgba(0,0,0,0.08); 
                display: flex; 
                flex-direction: column; 
                align-items: center; 
                text-align: center; 
                border: 1px solid #eee;
            `;
            
            card.innerHTML = `
                <div style="margin-bottom: 15px;">
                    <strong style="font-size: 1.1em; color: #1e3c72; display: block; margin-bottom: 2px;">${p.name}</strong>
                    <small style="color: #666; font-size: 0.85em;">${email}</small>
                </div>
                <div style="display: flex; flex-direction: column; gap: 8px; width: 100%; max-width: 160px;">
                    <button onclick="window.showStudentProfile('${email}')" style="width: 100%; padding: 10px; background: #2196f3; color: white; border: none; border-radius: 6px; cursor: pointer; font-weight: 700; font-size: 0.85em; letter-spacing: 0.5px;">PROFILE</button>
                    <button onclick="window.showMarksheet('${email}')" style="width: 100%; padding: 10px; background: #f5576c; color: white; border: none; border-radius: 6px; cursor: pointer; font-weight: 700; font-size: 0.85em; letter-spacing: 0.5px;">MARKSHEET</button>
                </div>
            `;
            list.appendChild(card);
        });
    };

    function createMarksheetSection() {
        const section = document.createElement('div');
        section.id = 'marksheetSection';
        section.style.cssText = 'padding: 20px; background: #f8f9fa; display: none;';
        
        section.innerHTML = `
            <div class="no-print-controls" style="display: flex; justify-content: space-between; margin-bottom: 20px;">
                <button class="back-btn" onclick="window.backToDashboardFromMarksheet()" style="padding: 10px 20px; background: #6c757d; color: white; border: none; border-radius: 8px; cursor: pointer; font-weight: 600;">⬅️ BACK</button>
                <button id="downloadBtn" onclick="window.downloadMarksheet()" style="padding: 10px 20px; background: #27ae60; color: white; border: none; border-radius: 8px; cursor: pointer; font-weight: 600;">📥 DOWNLOAD PDF</button>
            </div>
            
            <div id="marksheet-to-print" style="background: white; padding: 30px; border-radius: 10px; box-shadow: 0 0 10px rgba(0,0,0,0.1); position: relative;">
                <div style="text-align: center; margin-bottom: 25px; border-bottom: 2px solid #1e3c72; padding-bottom: 20px;">
                    <h1 style="margin: 0; font-size: 2em; color: #1e3c72; font-family: 'Arial Black', Gadget, sans-serif; text-transform: uppercase; line-height: 1.2;">BIBLE COLLEGE OF INDIA PASTORS FOUNDATION</h1>
                    <p style="margin: 8px 0 0 0; font-size: 0.95em; color: #555; font-weight: 600;">(AFFILIATED TO JESUS LOVES INDIA CHURCH FOUNDATION)</p>
                </div>

                <div class="marksheet-header" style="background: linear-gradient(135deg, #ff9800 0%, #ff5722 100%); color: white; padding: 20px; text-align: center; border-radius: 12px; margin-bottom: 20px;">
                    <div id="rank-badge-container"></div>
                    <div style="font-size: 1.25em; font-weight: bold; line-height: 1.2; margin-top: 10px; margin-bottom: 5px; text-transform: uppercase; letter-spacing: 0.5px; vertical-align: middle; font-variant-numeric: lining-nums;">
                        CERTIFICATE IN THEOLOGY (C.T.H) 2025 OLD TESTAMENT EXAM RESULT
                    </div>
                    <h2 style="margin: 5px 0;">Academic Performance</h2>
                    <p id="marksheet-student-name" style="font-size: 1.2em; margin: 0; font-weight: bold;"></p>
                    <p id="marksheet-student-email-display" style="font-size: 0.9em; margin: 0; opacity: 0.8;"></p>
                </div>

                <div class="summary-cards" style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 15px; margin-bottom: 20px;">
                    <div class="summary-card" style="background: #fff; padding: 15px; border-radius: 8px; text-align: center; border-left: 5px solid #9c27b0; box-shadow: 0 2px 5px rgba(0,0,0,0.1);">
                        <div style="font-size: 0.75em; font-weight: bold; color: #666;">ONLINE EXAMS</div>
                        <div id="online-exams-taken" style="font-size: 1.8em; font-weight: bold; color: #9c27b0; font-variant-numeric: lining-nums;">0/7</div>
                    </div>
                    <div class="summary-card" style="background: #fff; padding: 15px; border-radius: 8px; text-align: center; border-left: 5px solid #4caf50; box-shadow: 0 2px 5px rgba(0,0,0,0.1);">
                        <div style="font-size: 0.75em; font-weight: bold; color: #666;">PERCENTAGE</div>
                        <div id="final-percentage-score" style="font-size: 1.8em; font-weight: bold; color: #4caf50; line-height: 1.2; display: inline-block; font-variant-numeric: lining-nums; vertical-align: middle;">0%</div>
                    </div>
                    <div class="summary-card" style="background: #fff; padding: 15px; border-radius: 8px; text-align: center; border-left: 5px solid #f44336; box-shadow: 0 2px 5px rgba(0,0,0,0.1);">
                        <div style="font-size: 0.75em; font-weight: bold; color: #666;">GRADE</div>
                        <div id="final-grade-display" style="font-size: 1.8em; font-weight: bold; color: #f44336;">-</div>
                    </div>
                </div>

                <table style="width: 100%; border-collapse: collapse; font-family: sans-serif; margin-bottom: 40px;">
                    <thead>
                        <tr style="background: #1e3c72; color: white;">
                            <th style="padding: 8px; border: 1px solid #ddd; font-size: 0.9em;">Exam</th>
                            <th style="padding: 8px; border: 1px solid #ddd; font-size: 0.9em;">Marks</th>
                            <th style="padding: 8px; border: 1px solid #ddd; font-size: 0.9em;">Out of</th>
                            <th style="padding: 8px; border: 1px solid #ddd; font-size: 0.9em;">%</th>
                            <th style="padding: 8px; border: 1px solid #ddd; font-size: 0.9em;">Status</th>
                        </tr>
                    </thead>
                    <tbody id="marks-table-body"></tbody>
                </table>

               <div style="display: flex; justify-content: space-around; align-items: flex-end;">
        
        <div style="text-align: center; width: 220px; display: flex; flex-direction: column; align-items: center;">
            <img src="sign with stamp.png" style="width: 140px; height: auto; margin-bottom: 2px;">
            <div style="width: 180px; height: 2px; background-color: #1e3c72; margin-bottom: 5px;"></div>
            <div style="font-weight: bold; font-size: 0.85em; color: #1e3c72; line-height: 1.2;">
                Prabha Sadanand Amolik<br>
                <span style="font-size: 0.7em; color: #666; font-weight: normal;">DIRECTOR</span>
            </div>
        </div>

        <div style="text-align: center; width: 220px; display: flex; flex-direction: column; align-items: center;">
            <img src="DIGITAL STAMP.jpeg" style="width: 140px; height: auto; margin-bottom: 2px;">
            <div style="width: 180px; height: 2px; background-color: #1e3c72; margin-bottom: 5px;"></div>
            <div style="font-weight: bold; font-size: 0.85em; color: #1e3c72; line-height: 1.2;">
                Sadanand Shamrao Amolik<br>
                <span style="font-size: 0.7em; color: #666; font-weight: normal;">DIRECTOR</span>
            </div>
        </div>

    </div>
</div>
        `;
        return section;
    }

    function populateMarksheet(studentMarksData, studentProfileData, email) {
        const onlineMarks = studentMarksData.marks;
        const examMonths = STUDENT_DATA.examMonths;
        const offlineMark = studentMarksData.offlineMark;
        
        let totalOnlineMarks = 0;
        let onlineExamsTaken = 0;
        const tableBody = document.getElementById('marks-table-body');
        tableBody.innerHTML = '';

        onlineMarks.forEach((mark, index) => {
            if (mark !== null && typeof mark === 'number') {
                totalOnlineMarks += mark;
                onlineExamsTaken++;
            }
            const statusText = getStatus(mark);
            const row = document.createElement('tr');
            row.innerHTML = `
                <td style="padding: 6px; border: 1px solid #ddd; font-size: 0.85em; font-weight: 600;">${examMonths[index]}</td>
                <td style="padding: 6px; border: 1px solid #ddd; font-size: 0.85em; text-align: center; font-variant-numeric: lining-nums;">${mark !== null ? mark : 'Absent'}</td>
                <td style="padding: 6px; border: 1px solid #ddd; font-size: 0.85em; text-align: center;">100</td>
                <td style="padding: 6px; border: 1px solid #ddd; font-size: 0.85em; text-align: center; font-variant-numeric: lining-nums;">${mark !== null ? mark + '%' : '-'}</td>
                <td style="padding: 6px; border: 1px solid #ddd; font-size: 0.85em; text-align: center; font-weight: 600;">${statusText}</td>
            `;
            tableBody.appendChild(row);
        });

        // Calculations
        const monthlyAvg = (totalOnlineMarks / 700) * 100;
        const weight20 = monthlyAvg * 0.20;
        const actualOffline = (offlineMark !== null && typeof offlineMark === 'number') ? offlineMark : 0;
        const weight80 = actualOffline * 0.80;
        const finalPer = parseFloat((weight20 + weight80).toFixed(2));

        // Rows for Monthly Total and Offline Exam
        const summaryData = [
            { label: 'Total Monthly (700)', val: totalOnlineMarks.toFixed(2), outOf: 700, per: monthlyAvg.toFixed(2) + '%' },
            { label: 'Offline Exam (%)', val: actualOffline.toFixed(2), outOf: 100, per: actualOffline + '%' }
        ];

        summaryData.forEach((item) => {
            const r = document.createElement('tr');
            r.style.background = '#f8f9fa';
            // Calculate status based on actual performance percentage
            const performancePercentage = item.label.includes('700') ? (item.val / 7) : item.val;
            r.innerHTML = `
                <td style="padding: 6px; border: 1px solid #ddd; font-size: 0.85em; font-weight: bold;">${item.label}</td>
                <td style="padding: 6px; border: 1px solid #ddd; font-size: 0.85em; text-align: center; font-variant-numeric: lining-nums;">${item.val}</td>
                <td style="padding: 6px; border: 1px solid #ddd; font-size: 0.85em; text-align: center;">${item.outOf}</td>
                <td style="padding: 6px; border: 1px solid #ddd; font-size: 0.85em; text-align: center; font-variant-numeric: lining-nums;">${item.per}</td>
                <td style="padding: 6px; border: 1px solid #ddd; font-size: 0.85em; text-align: center; font-weight: 600;">${getStatus(performancePercentage)}</td>
            `;
            tableBody.appendChild(r);
        });

        // --- FIXED STATUS FOR WEIGHTAGE ROWS ---
        const rows2080 = [
            { label: '20% of Monthly average', val: weight20.toFixed(2), outOf: 20, statusVal: monthlyAvg },
            { label: '80% of Offline exam', val: weight80.toFixed(2), outOf: 80, statusVal: actualOffline }
        ];

        rows2080.forEach(item => {
            const row = document.createElement('tr');
            row.style.background = '#eef2f7';
            row.innerHTML = `
                <td style="padding: 6px; border: 1px solid #ddd; font-size: 0.85em; font-weight: bold; color: #1e3c72;">${item.label}</td>
                <td style="padding: 6px; border: 1px solid #ddd; font-size: 0.85em; text-align: center; font-variant-numeric: lining-nums;">${item.val}</td>
                <td style="padding: 6px; border: 1px solid #ddd; font-size: 0.85em; text-align: center;">${item.outOf}</td>
                <td style="padding: 6px; border: 1px solid #ddd; font-size: 0.85em; text-align: center;">-</td>
                <td style="padding: 6px; border: 1px solid #ddd; font-size: 0.85em; text-align: center; font-weight: 600;">${getStatus(item.statusVal)}</td>
            `;
            tableBody.appendChild(row);
        });

        // Final Result Row
        const finalRow = document.createElement('tr');
        finalRow.style.background = '#fff3cd';
        finalRow.innerHTML = `
            <td style="padding: 6px; border: 1px solid #ddd; font-size: 0.9em; font-weight: 900; color: #856404;">Final result</td>
            <td style="padding: 6px; border: 1px solid #ddd; font-size: 0.9em; text-align: center; font-weight: 900; font-variant-numeric: lining-nums;">${finalPer.toFixed(2)}</td>
            <td style="padding: 6px; border: 1px solid #ddd; font-size: 0.9em; text-align: center; font-weight: 900;">100</td>
            <td style="padding: 6px; border: 1px solid #ddd; font-size: 0.9em; text-align: center; font-weight: 900; font-variant-numeric: lining-nums;">${finalPer}%</td>
            <td style="padding: 6px; border: 1px solid #ddd; font-size: 0.9em; text-align: center; font-weight: 900;">${getStatus(finalPer)}</td>
        `;
        tableBody.appendChild(finalRow);

        // Ranking logic
        const allScores = Object.keys(STUDENT_DATA.marks).map(e => {
            const m = STUDENT_DATA.marks[e];
            const avg = (m.marks.reduce((a, b) => (typeof b === 'number' ? a + b : a), 0) / 700) * 100;
            const off = (typeof m.offlineMark === 'number') ? m.offlineMark : 0;
            return parseFloat(((avg * 0.20) + (off * 0.80)).toFixed(2));
        }).sort((a, b) => b - a);

        const rank = allScores.indexOf(finalPer) + 1;
        const rankContainer = document.getElementById('rank-badge-container');
        rankContainer.innerHTML = '';
        
       if (rank > 0 && rank <= 5) {
    const badge = document.createElement('div');
    // THE FIX: Use 'display: flex', 'align-items: center', and 'line-height: 1'
    badge.style.cssText = `
        background: #ffd700; 
        color: #000; 
        padding: 0 20px; 
        border-radius: 30px; 
        font-weight: 900; 
        display: flex; 
        align-items: center; 
        justify-content: center; 
        height: 35px; 
        line-height: 1; 
        margin: 0 auto 15px auto; 
        border: 3px solid #fff; 
        box-shadow: 0 4px 8px rgba(0,0,0,0.2); 
        font-size: 1rem; 
        text-transform: uppercase;
        font-family: 'Segoe UI', Roboto, Arial, sans-serif; /* Added for alignment */
    `;

    // Wrap the rank in a span to control its vertical behavior
    badge.innerHTML = `🏆 TOP <span style="margin: 0 5px; display: inline-block; line-height: 1;">${rank}</span> RANK`;
    rankContainer.appendChild(badge);
}

        // Update Final UI with alignment fixes
        console.log("studentProfileData:", studentProfileData); // Add this line
        document.getElementById('marksheet-student-name').textContent = studentProfileData.name;
        document.getElementById('marksheet-student-email-display').textContent = email;
        document.getElementById('online-exams-taken').textContent = `${onlineExamsTaken}/7`;
        
        const finalPerElement = document.getElementById('final-percentage-score');
        finalPerElement.textContent = finalPer + '%';
        finalPerElement.style.fontVariantNumeric = 'lining-nums';
        
        document.getElementById('final-grade-display').textContent = calculateGrade(finalPer);
    }

    function calculateGrade(percentage) {
        if (percentage === null || isNaN(percentage)) return 'N/A';
        if (percentage >= 90) return 'A+';
        else if (percentage >= 80) return 'A';
        else if (percentage >= 70) return 'B+';
        else if (percentage >= 60) return 'B';
        else if (percentage >= 50) return 'C';
        else return 'Needs Improvement';
    }

    function getStatus(mark) {
        if (mark === null || isNaN(mark)) return 'N/A';
        const num = parseFloat(mark);
        if (num >= 90) return 'Excellent';
        if (num >= 80) return 'Good';
        if (num >= 70) return 'Average';
        return 'Needs Improvement';
    }

})();
