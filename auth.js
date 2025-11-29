/*  
  ================================
      Firebase Auth (Safe File)
  ================================
  This file contains ONLY the logic.
  Your actual Firebase API keys must be added
  through environment variables or a private config.

  IMPORTANT:
  - apiKey and other Firebase config values are EMPTY.
  - Fill them in locally only — NEVER commit real keys.
*/

const firebaseConfig = {
    apiKey: "",            // <-- ADD LOCALLY, NEVER COMMIT
    authDomain: "",        // <-- ADD LOCALLY
    projectId: "",         // <-- ADD LOCALLY
    storageBucket: "",     // <-- ADD LOCALLY
    messagingSenderId: "", // <-- ADD LOCALLY
    appId: ""              // <-- ADD LOCALLY
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();

// Google provider
const provider = new firebase.auth.GoogleAuthProvider();

// ================================
// GOOGLE SIGN-IN BUTTON
// ================================

document.getElementById("login-btn")?.addEventListener("click", () => {
    auth.signInWithPopup(provider).then(result => {
        const email = result.user.email;

        // Allow only @aquinas.org emails
        if (!email.endsWith("@aquinas.org")) {
            alert("You must use an @aquinas.org email to sign in.");
            auth.signOut();
            return;
        }

        updateUI(result.user);
    }).catch(error => {
        console.error("Login error:", error);
        alert("Could not sign in. Check console for details.");
    });
});

// ================================
// SIGN OUT BUTTON
// ================================

document.getElementById("logout-btn")?.addEventListener("click", () => {
    auth.signOut().then(() => {
        updateUI(null);
    });
});

// ================================
// UPDATE UI BASED ON LOGIN STATE
// ================================

function updateUI(user) {
    const userInfo = document.getElementById("user-info");
    const loginBtn = document.getElementById("login-btn");
    const logoutBtn = document.getElementById("logout-btn");

    if (user) {
        userInfo.textContent = `${user.displayName} (${user.email})`;
        loginBtn.style.display = "none";
        logoutBtn.style.display = "inline-block";
    } else {
        userInfo.textContent = "";
        loginBtn.style.display = "inline-block";
        logoutBtn.style.display = "none";
    }
}

// Auto-update when user signs in/out
auth.onAuthStateChanged(user => updateUI(user));
