import sys
import argparse


# Usage example:
# `python caesar_cipher.py --key 5 --input "helloworld" --encrypt` produces "mjqqtbtwi"
# `python caesar_cipher.py --key 5 --input "helloworld" --decrypt` produces  "helloword"

def encrypt(message, key):
  lowerBound = ord('a')
  encrypted_chars  = map(lambda char: chr((ord(char) + key - lowerBound) % 26 + lowerBound), message)
  return ''.join(encrypted_chars)

def decrypt(message, key):
  lowerBound = ord('a')
  decrypted_chars = map(lambda char: chr((ord(char) - lowerBound - key) % 26 + lowerBound), message)
  return ''.join(decrypted_chars)

def main():
  parser = argparse.ArgumentParser()
  parser.add_argument('--message')
  parser.add_argument('--key')
  parser.add_argument('--encrypt', action='store_true')
  parser.add_argument('--decrypt', action='store_true')
  args = parser.parse_args()

  message = args.message
  key = int(args.key)

  if args.encrypt is True:
    print(encrypt(message, key))
  elif args.decrypt is True:
    print(decrypt(message, key))
  else:
    print('No action type was given')


if __name__ == '__main__':
  main()



