import admin from 'firebase-admin'
import dotenv from 'dotenv'

dotenv.config()

const serviceAccountBase64 = process.env.FIREBASE_SERVICE_ACCOUNT_KEY
if (!serviceAccountBase64) {
  throw new Error(
    'FIREBASE_SERVICE_ACCOUNT_KEY is not set in environment variables'
  )
}

const serviceAccount = JSON.parse(
  Buffer.from(serviceAccountBase64, 'base64').toString('utf8')
)

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET
})

export const bucket = admin.storage().bucket()
