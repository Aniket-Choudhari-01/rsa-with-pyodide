import random
from sympy import isprime, mod_inverse

def generate_prime(bits=16):
    while True:
        num = random.randint(2**(bits-1), 2**bits - 1)
        if isprime(num):
            return num

def gcd(a, b):
    while b:
        a, b = b, a % b
    return a

def rsa_key_generation():
    p = generate_prime(bits=16)
    q = generate_prime(bits=16)
    n = p * q
    phi_n = (p - 1) * (q - 1)

    e = random.randint(2, phi_n - 1)
    while gcd(e, phi_n) != 1:
        e = random.randint(2, phi_n - 1)

    d = mod_inverse(e, phi_n)
    return p, q, n, phi_n, e, d

def encrypt(message, e, n):
    numerical_message = [ord(char) for char in message]
    cipher_text = [pow(num, e, n) for num in numerical_message]
    return cipher_text

def decrypt(cipher_text, d, n):
    decrypted_numerical_message = [pow(num, d, n) for num in cipher_text]
    decrypted_message = ''.join([chr(num) for num in decrypted_numerical_message])
    return decrypted_message
