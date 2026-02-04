import { initializeApp } from 'firebase/app';
import { getFirestore, collection, addDoc, query, where, getDocs, doc, getDoc, setDoc, updateDoc, serverTimestamp } from 'firebase/firestore';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged, User } from 'firebase/auth';
import { getAnalytics, logEvent } from 'firebase/analytics';

// Firebase configuration
const firebaseConfig = {
  apiKey: process.env.EXPO_PUBLIC_FIREBASE_API_KEY || "AIzaSyDummyKeyForDevelopment",
  authDomain: process.env.EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN || "shorthand-simplified.firebaseapp.com",
  projectId: process.env.EXPO_PUBLIC_FIREBASE_PROJECT_ID || "shorthand-simplified",
  storageBucket: process.env.EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET || "shorthand-simplified.appspot.com",
  messagingSenderId: process.env.EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID || "123456789",
  appId: process.env.EXPO_PUBLIC_FIREBASE_APP_ID || "1:123456789:web:abcd1234"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

// Initialize Analytics (web only)
let analytics = null;
if (typeof window !== 'undefined') {
  try {
    analytics = getAnalytics(app);
  } catch (e) {
    console.error('Analytics not available:', e);
  }
}

// Types
export interface PurchaseRecord {
  id?: string;
  userId: string;
  email: string;
  planType: 'monthly' | 'annual' | 'lifetime';
  amount: number;
  currency: string;
  paypalOrderId: string;
  paypalTransactionId?: string;
  status: 'pending' | 'completed' | 'failed';
  purchaseDate: any; // Firestore timestamp
  expiresAt: Date | null;
  deviceInfo?: string;
}

export interface UserProfile {
  uid: string;
  email: string;
  displayName?: string;
  createdAt: any;
  lastLogin: any;
  totalSpent: number;
  purchaseCount: number;
  isPremium: boolean;
  premiumExpiresAt: Date | null;
  currentPlan?: 'monthly' | 'annual' | 'lifetime';
}

// Authentication functions
export async function registerUser(email: string, password: string) {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    // Create user profile
    const userProfile: UserProfile = {
      uid: user.uid,
      email: user.email || email,
      createdAt: serverTimestamp(),
      lastLogin: serverTimestamp(),
      totalSpent: 0,
      purchaseCount: 0,
      isPremium: false,
      premiumExpiresAt: null,
    };

    await setDoc(doc(db, 'users', user.uid), userProfile);
    
    // Log event
    if (analytics) {
      logEvent(analytics, 'user_registered', { email });
    }

    return { success: true, user };
  } catch (error: any) {
    console.error('Registration error:', error);
    return { success: false, error: error.message };
  }
}

export async function loginUser(email: string, password: string) {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    // Update last login
    await updateDoc(doc(db, 'users', user.uid), {
      lastLogin: serverTimestamp(),
    });

    if (analytics) {
      logEvent(analytics, 'user_login', { email });
    }

    return { success: true, user };
  } catch (error: any) {
    console.error('Login error:', error);
    return { success: false, error: error.message };
  }
}

export async function logoutUser() {
  try {
    await signOut(auth);
    return { success: true };
  } catch (error: any) {
    console.error('Logout error:', error);
    return { success: false, error: error.message };
  }
}

export function onAuthChange(callback: (user: User | null) => void) {
  return onAuthStateChanged(auth, callback);
}

// Purchase tracking functions
export async function recordPurchase(purchase: PurchaseRecord) {
  try {
    // Add purchase record
    const docRef = await addDoc(collection(db, 'purchases'), {
      ...purchase,
      purchaseDate: serverTimestamp(),
    });

    // Update user profile
    const userRef = doc(db, 'users', purchase.userId);
    const userSnap = await getDoc(userRef);

    if (userSnap.exists()) {
      const userData = userSnap.data();
      await updateDoc(userRef, {
        totalSpent: (userData.totalSpent || 0) + purchase.amount,
        purchaseCount: (userData.purchaseCount || 0) + 1,
        isPremium: true,
        premiumExpiresAt: purchase.expiresAt,
        currentPlan: purchase.planType,
        lastLogin: serverTimestamp(),
      });
    }

    // Log event
    if (analytics) {
      logEvent(analytics, 'purchase_complete', {
        planType: purchase.planType,
        amount: purchase.amount,
      });
    }

    return { success: true, purchaseId: docRef.id };
  } catch (error: any) {
    console.error('Purchase recording error:', error);
    return { success: false, error: error.message };
  }
}

export async function getPurchaseHistory(userId: string) {
  try {
    const q = query(
      collection(db, 'purchases'),
      where('userId', '==', userId)
    );
    const snapshot = await getDocs(q);
    
    return {
      success: true,
      purchases: snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })),
    };
  } catch (error: any) {
    console.error('Error fetching purchase history:', error);
    return { success: false, error: error.message, purchases: [] };
  }
}

export async function getUserProfile(userId: string) {
  try {
    const userRef = doc(db, 'users', userId);
    const userSnap = await getDoc(userRef);

    if (userSnap.exists()) {
      return { success: true, user: { id: userSnap.id, ...userSnap.data() } };
    } else {
      return { success: false, error: 'User not found' };
    }
  } catch (error: any) {
    console.error('Error fetching user profile:', error);
    return { success: false, error: error.message };
  }
}

export async function getAllPurchases() {
  try {
    const snapshot = await getDocs(collection(db, 'purchases'));
    
    return {
      success: true,
      purchases: snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })),
    };
  } catch (error: any) {
    console.error('Error fetching all purchases:', error);
    return { success: false, error: error.message, purchases: [] };
  }
}

export async function getPurchaseStats() {
  try {
    const purchases = await getAllPurchases();
    
    if (!purchases.success) {
      return { success: false, error: purchases.error };
    }

    const stats = {
      totalPurchases: purchases.purchases.length,
      totalRevenue: 0,
      byPlan: {
        monthly: 0,
        annual: 0,
        lifetime: 0,
      },
      completedPurchases: 0,
      failedPurchases: 0,
    };

    purchases.purchases.forEach((purchase: any) => {
      stats.totalRevenue += purchase.amount;
      stats.byPlan[purchase.planType]++;
      
      if (purchase.status === 'completed') {
        stats.completedPurchases++;
      } else if (purchase.status === 'failed') {
        stats.failedPurchases++;
      }
    });

    return { success: true, stats };
  } catch (error: any) {
    console.error('Error calculating stats:', error);
    return { success: false, error: error.message };
  }
}

export { auth, db, analytics };
