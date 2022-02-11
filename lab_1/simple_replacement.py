import argparse

def encrypt(message: str, key: dict[int, int]) -> str:
  encrypted = map(lambda char: key[char], message)
  return encrypted

def decrypt(message: str, key: dict[int, int]) -> str:
  decrypted = map(lambda char: key[char], message)
  return decrypted


def main():
  parser = argparse.ArgumentParser()
  parser.add_argument('--file')
  parser.add_argument('--keyFile')
  parser.add_argument('--output')
  parser.add_argument('--encrypt', action='store_true')
  parser.add_argument('--decrypt', action='store_true')
  args = parser.parse_args()

  key = None
  with open(args.keyFile) as file:
    key = file.readline()

  encrypting_key = {idx: int(value) for idx, value in enumerate(key.split(' '))}
  decrypting_key = {int(value): idx for idx, value in enumerate(key.split(' '))}

  file_contents = None
  encrypted = None
  with open(args.file, 'rb') as file:
    file_contents = file.read()

  output = args.output

  if args.encrypt is True:
    encrypted = encrypt(file_contents, encrypting_key)
    with open(output, "wb") as out:
      out.write(bytearray(encrypted))
  elif args.decrypt is True:
    decrypted = decrypt(file_contents, decrypting_key)
    with open(output, "wb") as out:
      out.write(bytearray(decrypted))
  else:
    print('No action type was given')



if __name__ == '__main__':
  main()
