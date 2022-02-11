
# Usage example
# `python simple_replacement.py --encrypt --message "hellorworld" --keyFile "key.txt"`
# `python simple_replacement.py --decrypt --message --keyFile "key.txt"`

import argparse

def encrypt(message: str, key: dict[int, int]) -> str:
  encrypted = map(lambda char: chr(int(key[ord(char)])), message)
  return ''.join(encrypted)

def decrypt(message: str, key: dict[int, int]) -> str:
  decrypted = map(lambda char: chr(key[ord(char)]), message)
  return ''.join(decrypted)


def main():
  parser = argparse.ArgumentParser()
  parser.add_argument('--message')
  parser.add_argument('--keyFile')
  parser.add_argument('--encrypt', action='store_true')
  parser.add_argument('--decrypt', action='store_true')
  args = parser.parse_args()

  key = None
  with open(args.keyFile) as file:
    key = file.readline()

  message = args.message
  encrypting_key = {idx: int(value) for idx, value in enumerate(key.split(' '))}
  decrypting_key = {int(value): idx for idx, value in enumerate(key.split(' '))}


  if args.encrypt is True:
    print(encrypt(message, encrypting_key))
  elif args.decrypt is True:
    print(decrypt(message, decrypting_key))
  else:
    print('No action type was given')



if __name__ == '__main__':
  main()
