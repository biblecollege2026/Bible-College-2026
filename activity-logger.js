const ActivityLogger = {
    CONFIG: {
        // REPLACE THE URL BELOW WITH YOUR NEW WEB APP URL
        SCRIPT_URL: 'https://script.google.com/macros/s/AKfycby7eXy51_62Lh_H_TkAYWSWyZ6pJaLJ7OoFNW2dofSQ9TtRi5UprElciBhNMIqafDrY/exec',
        IS_ADMIN: false
    },

    init: function() {
        // Delay by 1 second so window.studentEmail is definitely ready
        setTimeout(() => {
            this.CONFIG.IS_ADMIN = (window.studentEmail === 'jlibiblecollege@gmail.com');
            console.log("Security System Initialized. Admin Status:", this.CONFIG.IS_ADMIN);
            
            if (this.CONFIG.IS_ADMIN) {
                // This makes the 'Open' button or section appear for you
                this.ui.createAdminDashboard();
            }

            // Log activity now that identity is known
            this.logActivity('Portal Accessed', 'Dashboard');
            this.setupListeners();
        }, 1000); 
    },

ui: {
    createAdminDashboard: function() {
        const adminSecurity = document.getElementById('admin-security-section');
        const adminStudents = document.getElementById('admin-students-toggle-div');
        if (adminSecurity) adminSecurity.style.display = 'block';
        if (adminStudents) adminStudents.style.display = 'block';
    },

    toggleStudents: function() {
        console.log("Toggle button clicked!"); // Check your browser console for this!
        
        const wrapper = document.getElementById('student-directory-wrapper');
        const btn = document.getElementById('viewStudentsBtn');

        if (!wrapper) {
            console.error("Error: Could not find the element 'student-directory-wrapper'");
            return;
        }

        if (wrapper.style.display === 'none' || wrapper.style.display === '') {
            wrapper.style.display = 'block';
            btn.innerHTML = '❌ CLOSE STUDENT DIRECTORY';
            btn.style.backgroundColor = '#dc3545';
            console.log("Directory opened");
        } else {
            wrapper.style.display = 'none';
            btn.innerHTML = '👥 VIEW STUDENT DIRECTORY';
            btn.style.backgroundColor = '#1e3c72';
            console.log("Directory closed");
        }
    },

    togglePanel: function() {
        window.open('security-dashboard.html', '_blank');
    }
},
    logActivity: function(action, location) {
        const data = {
            email: window.studentEmail || 'Unknown',
            name: window.studentName || 'Unknown',
            action: action,
            location: location,
            device: navigator.userAgent.slice(0, 50)
        };

        // Standard fetch for POSTing data to Google
        fetch(this.CONFIG.SCRIPT_URL, {
            method: 'POST',
            mode: 'no-cors', 
            body: JSON.stringify(data)
        }).catch(err => console.error("Logging error:", err));
    }
};

// Start the logger
ActivityLogger.init();
