/**
 * ══════════════════════════════════════════════════════════════════════════════
 * FIREWALL INTELLIGENCE PLATFORM — FIREBASE MODULAR SDK BRIDGE (v10+)
 * Firebase Authentication & Cloud Firestore Persistence Layer
 * ══════════════════════════════════════════════════════════════════════════════
 */

import { initializeApp, getApps, getApp } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-app.js";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInAnonymously,
  signOut,
  onAuthStateChanged,
  updateProfile,
  setPersistence,
  browserLocalPersistence
} from "https://www.gstatic.com/firebasejs/10.13.0/firebase-auth.js";
import {
  getFirestore,
  doc,
  setDoc,
  getDoc,
  collection,
  addDoc,
  onSnapshot,
  serverTimestamp
} from "https://www.gstatic.com/firebasejs/10.13.0/firebase-firestore.js";

// ─── 1. FIREBASE CONFIGURATION SETUP ───
export const firebaseConfig = {
  apiKey: "AIzaSyBWNdRLiQjxo0ydumvyA5XOFucfOR-9ZrA",
  authDomain: "jobers-69267.firebaseapp.com",
  projectId: "jobers-69267",
  storageBucket: "jobers-69267.firebasestorage.app",
  messagingSenderId: "575742680341",
  appId: "1:575742680341:web:ed17e6b5c11617cefb1d1c",
  measurementId: "G-DW5DMCD6LB"
};

// Initialize or reuse Firebase App instance
export const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();
export const auth = getAuth(app);
export const db = getFirestore(app);

// Maintain persistent session across reloads
try {
  setPersistence(auth, browserLocalPersistence).catch((err) => {
    console.warn("[Firebase Auth] setPersistence warning:", err);
  });
} catch (e) {
  console.warn("[Firebase Auth] Persistence setup error:", e);
}

// ─── 2. USER AUTHENTICATION & PROFILE PERSISTENCE ───

/**
 * Sign up with Email, Password, and Display Name
 */
export async function signUpWithEmail(email, password, displayName = "") {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    if (displayName) {
      await updateProfile(user, { displayName });
    }

    // Persist default profile to Firestore `users/{userId}`
    const defaultProfile = {
      name: displayName || email.split("@")[0],
      email: user.email,
      handle: "@" + (displayName ? displayName.toLowerCase().replace(/\s+/g, "_") : email.split("@")[0]),
      role: "AI Systems Architect",
      org: "Neural Defense Operations",
      bio: "Active security operator & intelligence researcher.",
      clearance: "LEVEL 4 · NEURAL ACCESS",
      avatar: "preset-1",
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp()
    };

    await setDoc(doc(db, "users", user.uid), defaultProfile, { merge: true });
    return { success: true, user, profile: defaultProfile };
  } catch (error) {
    console.error("[Firebase Auth] Sign up error:", error);
    return { success: false, error: formatAuthError(error) };
  }
}

/**
 * Sign in with Email and Password
 */
export async function signInWithEmail(email, password) {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    const profile = await getUserProfile(user.uid);
    return { success: true, user, profile };
  } catch (error) {
    console.error("[Firebase Auth] Sign in error:", error);
    return { success: false, error: formatAuthError(error) };
  }
}

/**
 * Sign in Anonymously / Guest Access
 */
export async function signInAnonymouslyUser() {
  try {
    const userCredential = await signInAnonymously(auth);
    const user = userCredential.user;
    const existing = await getUserProfile(user.uid);
    if (!existing) {
      const guestProfile = {
        name: "Guest Operator",
        email: null,
        handle: "@guest_" + user.uid.slice(0, 5),
        role: "Field Researcher",
        org: "Guest Sandbox",
        bio: "Anonymous guest terminal access.",
        clearance: "LEVEL 2 · STANDARD",
        avatar: "preset-1",
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp()
      };
      await setDoc(doc(db, "users", user.uid), guestProfile, { merge: true });
      return { success: true, user, profile: guestProfile };
    }
    return { success: true, user, profile: existing };
  } catch (error) {
    console.error("[Firebase Auth] Anonymous sign-in error:", error);
    return { success: false, error: formatAuthError(error) };
  }
}

/**
 * Sign out
 */
export async function signOutUser() {
  try {
    await signOut(auth);
    return { success: true };
  } catch (error) {
    console.error("[Firebase Auth] Sign out error:", error);
    return { success: false, error: error.message };
  }
}

/**
 * Session Observer
 */
export function onAuthUserChanged(callback) {
  return onAuthStateChanged(auth, async (user) => {
    if (user) {
      const profile = await getUserProfile(user.uid);
      callback(user, profile);
    } else {
      callback(null, null);
    }
  });
}

/**
 * Get current authenticated user
 */
export function getCurrentUser() {
  return auth.currentUser;
}

/**
 * Fetch profile from `users/{userId}`
 */
export async function getUserProfile(userId) {
  try {
    const userDocRef = doc(db, "users", userId);
    const snapshot = await getDoc(userDocRef);
    if (snapshot.exists()) {
      return { id: snapshot.id, ...snapshot.data() };
    }
    return null;
  } catch (error) {
    console.error("[Firestore] Get user profile error:", error);
    return null;
  }
}

/**
 * Save / Update Profile in `users/{userId}` using { merge: true }
 */
export async function saveUserProfile(userId, profileData) {
  try {
    const userDocRef = doc(db, "users", userId);
    const payload = {
      ...profileData,
      updatedAt: serverTimestamp()
    };
    await setDoc(userDocRef, payload, { merge: true });
    return { success: true, profile: payload };
  } catch (error) {
    console.error("[Firestore] Save profile error:", error);
    return { success: false, error: error.message };
  }
}

/**
 * Realtime profile observer
 */
export function subscribeUserProfile(userId, callback) {
  const userDocRef = doc(db, "users", userId);
  return onSnapshot(userDocRef, (snap) => {
    if (snap.exists()) {
      callback({ id: snap.id, ...snap.data() });
    } else {
      callback(null);
    }
  }, (err) => {
    console.error("[Firestore] Profile subscription error:", err);
  });
}

// ─── 3. FORM DATA SUBMISSION & PERSISTENCE ───

/**
 * Save job application submission to Firestore
 * 1. Inside global `submissions` collection
 * 2. Under user-specific `users/{userId}/formSubmissions` sub-collection
 */
export async function saveJobApplication(formData, user = null) {
  try {
    const currentUserId = user ? user.uid : (auth.currentUser ? auth.currentUser.uid : "anonymous");
    const currentEmail = user ? user.email : (formData.email || "applicant@domain.com");

    const submissionRecord = {
      ...formData,
      userId: currentUserId,
      userEmail: currentEmail,
      submittedAt: serverTimestamp(),
      systemPlatform: "Career Axis · India Roster",
      status: "Verified & Under Review"
    };

    // 1. Global collection `submissions`
    const globalCol = collection(db, "submissions");
    const globalDocRef = await addDoc(globalCol, submissionRecord);

    // 2. User sub-collection `users/{userId}/formSubmissions`
    if (currentUserId && currentUserId !== "anonymous") {
      try {
        const userSubCol = collection(db, "users", currentUserId, "formSubmissions");
        await addDoc(userSubCol, {
          ...submissionRecord,
          globalSubmissionId: globalDocRef.id
        });
      } catch (subColErr) {
        console.warn("[Firestore] User sub-collection write note:", subColErr);
      }
    }

    return {
      success: true,
      submissionId: globalDocRef.id,
      timestamp: new Date().toISOString()
    };
  } catch (error) {
    console.error("[Firestore] Form submission error:", error);
    return {
      success: false,
      error: error.message || "Failed to persist application into Cloud Firestore."
    };
  }
}

// ─── 4. TYPING CLUB STREAK SYSTEM & REALTIME SYNC ───

/**
 * Fetch typing stats for a user
 */
export async function getTypingStats(userId) {
  try {
    if (!userId) return null;
    const userDoc = await getDoc(doc(db, "users", userId));
    if (userDoc.exists()) {
      const data = userDoc.data();
      return data.typingStats || {
        currentStreak: 0,
        bestStreak: 0,
        lastActiveDate: null,
        totalTestsCompleted: 0,
        highestWpm: 0
      };
    }
    return null;
  } catch (err) {
    console.error("[Firestore] Error fetching typing stats:", err);
    return null;
  }
}

/**
 * Streak Calculation Logic & Realtime Sync:
 * - When the user completes a typing session, check `lastActiveDate`.
 * - If `lastActiveDate` is yesterday, increment `currentStreak` by 1.
 * - If `lastActiveDate` is today, maintain the current streak.
 * - If `lastActiveDate` is older than yesterday, reset `currentStreak` to 1.
 * - Update `bestStreak` if `currentStreak > bestStreak`.
 * - Save the updated values to Firestore immediately.
 */
export async function recordTypingSession(userId, sessionResult = {}) {
  try {
    if (!userId) {
      if (auth.currentUser) {
        userId = auth.currentUser.uid;
      } else {
        // Fallback to anonymous ID or local ID if unauthenticated
        userId = getLocalFallbackId();
      }
    }

    const todayDate = new Date();
    const todayStr = todayDate.toISOString().slice(0, 10); // YYYY-MM-DD
    const yesterdayDate = new Date(Date.now() - 86400000);
    const yesterdayStr = yesterdayDate.toISOString().slice(0, 10);

    // Retrieve previous stats from Firestore or localStorage fallback
    let currentStats = await getTypingStats(userId);
    if (!currentStats) {
      currentStats = {
        currentStreak: parseInt(localStorage.getItem("stickman_typing_streak") || "0", 10),
        bestStreak: parseInt(localStorage.getItem("stickman_typing_best_streak") || "0", 10),
        lastActiveDate: localStorage.getItem("typing_last_active_date") || null,
        totalTestsCompleted: parseInt(localStorage.getItem("typing_total_tests") || "0", 10),
        highestWpm: parseInt(localStorage.getItem("typing_highest_wpm") || "0", 10)
      };
    }

    const lastActiveStr = currentStats.lastActiveDate
      ? (typeof currentStats.lastActiveDate === "string"
          ? currentStats.lastActiveDate.slice(0, 10)
          : new Date(currentStats.lastActiveDate).toISOString().slice(0, 10))
      : null;

    let newCurrentStreak = currentStats.currentStreak || 0;

    if (!lastActiveStr) {
      // First session ever
      newCurrentStreak = 1;
    } else if (lastActiveStr === todayStr) {
      // Completed another session today: maintain current streak (ensure at least 1)
      newCurrentStreak = Math.max(1, newCurrentStreak);
    } else if (lastActiveStr === yesterdayStr) {
      // Completed session yesterday: increment streak!
      newCurrentStreak += 1;
    } else {
      // Last active was older than yesterday: reset streak to 1
      newCurrentStreak = 1;
    }

    const sessionWpm = Math.round(Number(sessionResult.wpm) || 0);
    const newBestStreak = Math.max(currentStats.bestStreak || 0, newCurrentStreak);
    const newTotalTests = (currentStats.totalTestsCompleted || 0) + 1;
    const newHighestWpm = Math.max(currentStats.highestWpm || 0, sessionWpm);

    const updatedStats = {
      currentStreak: newCurrentStreak,
      bestStreak: newBestStreak,
      lastActiveDate: todayDate.toISOString(),
      totalTestsCompleted: newTotalTests,
      highestWpm: newHighestWpm
    };

    // Cache locally for immediate instantaneous UI responsiveness
    localStorage.setItem("stickman_typing_streak", newCurrentStreak.toString());
    localStorage.setItem("stickman_typing_best_streak", newBestStreak.toString());
    localStorage.setItem("typing_last_active_date", todayDate.toISOString());
    localStorage.setItem("typing_total_tests", newTotalTests.toString());
    localStorage.setItem("typing_highest_wpm", newHighestWpm.toString());

    // Save to Firestore under `users/{userId}` in `typingStats` map
    try {
      await setDoc(
        doc(db, "users", userId),
        {
          typingStats: updatedStats,
          updatedAt: serverTimestamp()
        },
        { merge: true }
      );

      // Also record into `users/{userId}/stats/typing` for sub-collection structure
      await setDoc(
        doc(db, "users", userId, "stats", "typing"),
        {
          ...updatedStats,
          updatedAt: serverTimestamp()
        },
        { merge: true }
      );
    } catch (firestoreErr) {
      console.warn("[Firestore] Sync warning (persisted locally):", firestoreErr);
    }

    return { success: true, stats: updatedStats };
  } catch (error) {
    console.error("[Typing Streak] Error recording session:", error);
    return { success: false, error: error.message };
  }
}

/**
 * Subscribe to typing stats in realtime
 */
export function subscribeTypingStats(userId, callback) {
  if (!userId) return () => {};
  return onSnapshot(doc(db, "users", userId), (snap) => {
    if (snap.exists() && snap.data().typingStats) {
      callback(snap.data().typingStats);
    }
  }, (err) => {
    console.warn("[Firestore] Typing stats listener note:", err);
  });
}

// ─── 5. HELPER UTILITIES ───

function getLocalFallbackId() {
  let id = localStorage.getItem("firewall_fallback_uid");
  if (!id) {
    id = "anon_" + Math.random().toString(36).substring(2, 10);
    localStorage.setItem("firewall_fallback_uid", id);
  }
  return id;
}

function formatAuthError(error) {
  const code = error?.code || "";
  switch (code) {
    case "auth/invalid-email":
      return "The email address is improperly formatted.";
    case "auth/user-disabled":
      return "This account has been disabled by security administrators.";
    case "auth/user-not-found":
      return "No account exists with this email address. Please sign up!";
    case "auth/wrong-password":
    case "auth/invalid-credential":
      return "Incorrect email or password. Please verify your credentials.";
    case "auth/email-already-in-use":
      return "An account with this email already exists. Please sign in instead.";
    case "auth/weak-password":
      return "Password is too weak. Please use at least 6 characters.";
    case "auth/network-request-failed":
      return "Network connection error. Please check your internet connection.";
    case "auth/configuration-not-found":
      return "Firebase Auth provider is not enabled yet in Firebase Console. Please enable Email/Password or Anonymous under Authentication > Sign-in method in Firebase Console.";
    default:
      return error.message || "An authentication error occurred. Please try again.";
  }
}

// Expose bridge on window for unified access across scripts
if (typeof window !== "undefined") {
  window.FirebaseBridge = {
    app,
    auth,
    db,
    signUpWithEmail,
    signInWithEmail,
    signInAnonymouslyUser,
    signOutUser,
    onAuthUserChanged,
    getCurrentUser,
    getUserProfile,
    saveUserProfile,
    subscribeUserProfile,
    saveJobApplication,
    getTypingStats,
    recordTypingSession,
    subscribeTypingStats
  };

  // Dispatch global ready event
  window.dispatchEvent(new CustomEvent("firebase-bridge-ready", { detail: window.FirebaseBridge }));
}
