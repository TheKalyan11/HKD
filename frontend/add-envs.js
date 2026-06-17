const { execSync } = require('child_process');

const envs = {
  NEXT_PUBLIC_FIREBASE_API_KEY: "AIzaSyC7tcQy0yDiHWRvNO9yQJp5SdOCZGC80kI",
  NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN: "hare-krishna-dehradun.firebaseapp.com",
  NEXT_PUBLIC_FIREBASE_PROJECT_ID: "hare-krishna-dehradun",
  NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET: "hare-krishna-dehradun.firebasestorage.app",
  NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID: "927341613686",
  NEXT_PUBLIC_FIREBASE_APP_ID: "1:927341613686:web:217f95fbb495bb08024557",
  NEXT_PUBLIC_RAZORPAY_KEY_ID: "rzp_live_T0DH0G5GLWELiP"
};

const targets = ['production', 'preview', 'development'];

for (const [key, value] of Object.entries(envs)) {
  for (const target of targets) {
    try {
      console.log(`Adding ${key} to ${target}...`);
      execSync(`npx vercel env add ${key} ${target} --value "${value}" --yes`, { stdio: 'inherit' });
    } catch (e) {
      console.log(`Failed to add ${key} to ${target}`);
    }
  }
}
