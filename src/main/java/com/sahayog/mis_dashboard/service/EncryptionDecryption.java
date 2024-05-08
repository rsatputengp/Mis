/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.sahayog.mis_dashboard.service;

/**
 *
 * @author ritik
 */
import javax.crypto.Cipher;
import javax.crypto.SecretKey;
import javax.crypto.spec.SecretKeySpec;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.util.Arrays;
import java.util.Base64;

public class EncryptionDecryption {

    public static void main(String[] args) throws Exception {
        // Password to be encrypted
        String originalPassword = "myPassword123";

        // Encrypt the password
        String encryptedPassword = encryptPassword(originalPassword);
        System.out.println("Encrypted password: " + encryptedPassword);

        // Decrypt the password
        String decryptedPassword = decryptPassword(encryptedPassword);
        System.out.println("Decrypted password: " + decryptedPassword);
    }

    public static String encryptPassword(String password) throws Exception {
        byte[] key = generateKey(); // Generate a key from the fixed string
        SecretKeySpec secretKeySpec = new SecretKeySpec(key, "AES");
        Cipher cipher = Cipher.getInstance("AES");
        cipher.init(Cipher.ENCRYPT_MODE, secretKeySpec);
        byte[] encryptedBytes = cipher.doFinal(password.getBytes());
        return Base64.getEncoder().encodeToString(encryptedBytes);
    }

    public static String decryptPassword(String encryptedPassword) throws Exception {
        byte[] key = generateKey(); // Generate the key again
        SecretKeySpec secretKeySpec = new SecretKeySpec(key, "AES");
        Cipher cipher = Cipher.getInstance("AES");
        cipher.init(Cipher.DECRYPT_MODE, secretKeySpec);
        byte[] decryptedBytes = cipher.doFinal(Base64.getDecoder().decode(encryptedPassword));
        return new String(decryptedBytes);
    }

    private static byte[] generateKey() throws NoSuchAlgorithmException {
        // Generate a key from a fixed string, ensuring it's the correct length for AES
        String keyString = "mySecretKey"; // You should use a more secure way to generate the key
        MessageDigest sha = MessageDigest.getInstance("SHA-256");
        byte[] key = sha.digest(keyString.getBytes());
        key = Arrays.copyOf(key, 16); // Use only the first 16 bytes for AES-128
        return key;
    }
}


