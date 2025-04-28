
# RSA Encryption Algorithm (CS1702)

## Table of Contents
1. [Aim](#aim)
2. [Implementation](#implementation)
3. [Key Generation](#key-generation)
4. [Encryption Process](#encryption-process)
5. [Decryption Process](#decryption-process)
6. [Prime Number Generation](#prime-number-generation)
7. [GCD and Mod Inverse](#gcd-and-mod-inverse)
8. [Live Demo](#live-demo)
9. [Conclusion](#conclusion)

## Aim
The aim of this project is to implement the RSA encryption algorithm using Python in the browser with Pyodide. This demonstration provides a way to encrypt and decrypt messages using the public and private keys, with a visual representation of each step in the algorithm.

## Implementation
The RSA algorithm is implemented entirely in the browser using Pyodide, which allows Python code to run within the browser environment. The process involves:
1. Key generation (public and private keys).
2. Encryption of plaintext messages.
3. Decryption of ciphertext messages back to plaintext.

## Key Generation
- **Prime Generation:** Two large prime numbers `p` and `q` are selected at random.
- **Modulus (n):** The modulus `n = p * q` is used for both encryption and decryption.
- **Public Key (e, n):** The public exponent `e` is chosen such that `gcd(e, φ(n)) = 1` (where φ(n) is Euler's Totient function).
- **Private Key (d):** The private key `d` is the modular inverse of `e` modulo φ(n), satisfying the equation `d * e ≡ 1 (mod φ(n))`.

### RSA Functions:
- **`generate_prime(bits=16)`**: Generates a random prime number of a specified bit size.
- **`gcd(a, b)`**: Computes the Greatest Common Divisor (GCD) of two numbers using the Euclidean algorithm.
- **`rsa_key_generation()`**: Generates the public and private keys `e` and `d` based on the prime numbers `p` and `q` and their respective totient `φ(n)`.
- **`encrypt(message, e, n)`**: Encrypts a message using the public key.
- **`decrypt(cipher_text, d, n)`**: Decrypts the ciphertext using the private key.

## Encryption Process
1. **Plaintext Conversion:** The plaintext message is converted into a numerical form using the ASCII values of each character.
2. **Encryption Formula:** The encrypted message (ciphertext) is obtained using the formula:
   \[
   \text{ciphertext} = \text{message}^e \mod n
   \]
3. The ciphertext is then displayed on the webpage for the user.

## Decryption Process
1. **Ciphertext Decryption:** The encrypted ciphertext is decrypted using the private key `d`:
   \[
   \text{decrypted message} = \text{ciphertext}^d \mod n
   \]
2. The decrypted message is converted back into readable text and displayed.

## Prime Number Generation
Prime numbers `p` and `q` are essential for key generation. A random number is selected, and a primality test is performed using the `sympy.isprime()` function to ensure the number is prime. This process continues until two distinct primes are selected.

## GCD and Mod Inverse
- **GCD Calculation:** The Greatest Common Divisor (GCD) of two numbers is calculated using the Euclidean algorithm. This ensures that `e` and φ(n) are coprime.
- **Modular Inverse:** The modular inverse of `e` is computed using the `sympy.mod_inverse()` function to obtain the private key `d`. This function ensures the inverse is calculated efficiently and correctly.

## Live Demo
You can interact with the live demo of this RSA encryption algorithm by visiting the following link:  
[**Live RSA Demo**](https://your-live-demo-link.com)

## Conclusion
This project demonstrates the RSA encryption algorithm implemented in Python using Pyodide, providing a simple and effective way to encrypt and decrypt messages using public and private keys. The process involves key generation, encryption, and decryption based on modular arithmetic and prime number properties.
