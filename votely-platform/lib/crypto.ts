// Simple utility to encrypt/decrypt strings using AES-256-CBC.
//
// Notes:
// - AES-CBC provides confidentiality but not authenticity/integrity. For stronger guarantees prefer an AEAD mode (e.g. aes-256-gcm) or add an HMAC.
// - Keep ENCRYPTION_KEY secret and never commit it to source control.

import crypto from 'crypto' // Node.js built-in crypto module

// AES algorithm and block/IV size constants
const ALGORITHM = 'aes-256-cbc'
const SECRET_KEY = process.env.ENCRYPTION_KEY || '' // read key from env, fallback to empty string
const IV_LENGTH = 16 // AES block size in bytes (16 bytes for AES)

// Basic validation: ensure the key string has length 32 characters.
// Note: .length measures characters; for non-ASCII or to guarantee 32 bytes, use Buffer.byteLength.
if (SECRET_KEY.length !== 32) {
  throw new Error("ENCRYPTION_KEY harus tepat 32 karakter!") // error if key length is not exactly 32 chars
}

/**
 * Encrypts a UTF-8 string and returns a simple compound string:
 *   ivHex:ciphertextHex
 *
 * Flow:
 * 1. generate a random IV
 * 2. create a Cipher using the algorithm, key, and IV
 * 3. feed the plaintext into cipher.update and cipher.final to get ciphertext Buffer
 * 4. return IV and ciphertext encoded as hex separated by colon
 */
export function encryptKey(text: string): string {
    // generate a random initialization vector (IV) for this encryption
    const iv = crypto.randomBytes(IV_LENGTH)

    // create a cipher instance using AES-256-CBC with the secret key and IV
    const cipher = crypto.createCipheriv(ALGORITHM, Buffer.from(SECRET_KEY), iv) // Creates cipher

    // encrypt the plaintext in two steps (update + final) and concatenate the results
    let encrypted = cipher.update(text) // process plaintext -> partial ciphertext
    encrypted = Buffer.concat([encrypted, cipher.final()]) // finalize and combine

    // return the result as "ivHex:cipherHex" so the IV is available for decryption
    return iv.toString('hex') + ':' + encrypted.toString('hex')
}

/**
 * Decrypts a string produced by encryptKey which uses the "ivHex:cipherHex" format.
 *
 * Flow:
 * 1. split input into IV and ciphertext parts
 * 2. convert hex strings back to Buffers
 * 3. create a Decipher with the same algorithm/key/IV and run update + final to recover plaintext
 */
export function decryptKey(text: string): string {
    // split the input by ':' to separate iv and ciphertext parts
    const textParts = text.split(':')
    // first part is IV (hex -> Buffer)
    const iv = Buffer.from(textParts.shift()!, 'hex')
    // remaining parts joined form the ciphertext (hex -> Buffer)
    const encryptedText = Buffer.from(textParts.join(':'), 'hex')

    // create a decipher instance with same algorithm, key, and IV
    const decipher = crypto.createDecipheriv(ALGORITHM, Buffer.from(SECRET_KEY), iv)

    // decrypt the ciphertext (update + final) and return utf-8 string
    let decrypted = decipher.update(encryptedText)
    decrypted = Buffer.concat([decrypted, decipher.final()])
    return decrypted.toString()
}