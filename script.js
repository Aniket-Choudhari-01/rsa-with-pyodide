let pyodide = null;
let keys = {};

async function initializePyodideAndRSA() {
  pyodide = await loadPyodide();
  await pyodide.loadPackage("sympy");

  await pyodide.runPythonAsync(`
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

  def text_to_int(text):
      return int.from_bytes(text.encode('utf-8'), byteorder='big')

  def int_to_text(number):
      return number.to_bytes((number.bit_length() + 7) // 8, byteorder='big').decode('utf-8')

  def encrypt(message, e, n):
      numerical_message = [ord(char) for char in message]
      cipher_text = [pow(num, e, n) for num in numerical_message]
      return cipher_text

  def decrypt(cipher_text, d, n):
      decrypted_numerical_message = [pow(num, d, n) for num in cipher_text]
      decrypted_message = ''.join([chr(num) for num in decrypted_numerical_message])
      return decrypted_message
    `);
}

initializePyodideAndRSA();

async function runRSA(event) {
  event.preventDefault();
  if (!pyodide) {
    alert("Pyodide is still loading. Please wait.");
    return;
  }

  const originalMessage = document.getElementById("message").value.trim();
  if (originalMessage === "") {
    alert("Please enter a message to encrypt.");
    return;
  }
  console.log("Original Message:", originalMessage);

  await pyodide.runPythonAsync(`p, q, n, phi_n, e, d = rsa_key_generation()`);
  keys = {
    p: pyodide.globals.get("p"),
    q: pyodide.globals.get("q"),
    n: pyodide.globals.get("n"),
    phi_n: pyodide.globals.get("phi_n"),
    e: pyodide.globals.get("e"),
    d: pyodide.globals.get("d"),
  };

  pyodide.globals.set("message", originalMessage);
  pyodide.globals.set("e", keys.e);
  pyodide.globals.set("n", keys.n);

  const cipherText = pyodide.runPython("encrypt(message, e, n)");
  pyodide.globals.set("cipher", cipherText);
  pyodide.globals.set("d", keys.d);

  const decryptedMessage = pyodide.runPython("decrypt(cipher, d, n)");

  document.getElementById(
    "originalMessage"
  ).textContent = `📝 Original Message: ${originalMessage}`;
  document.getElementById(
    "publicKey"
  ).textContent = `🔐 Public Key: (e=${keys.e}, n=${keys.n})`;
  document.getElementById(
    "privateKey"
  ).textContent = `🔓 Private Key: (d=${keys.d})`;
  document.getElementById(
    "cipherText"
  ).textContent = `🔒 Cipher Text: ${cipherText}`;
  document.getElementById(
    "decryptedMessage"
  ).textContent = `🟢 Decrypted Message: ${decryptedMessage}`;
}
