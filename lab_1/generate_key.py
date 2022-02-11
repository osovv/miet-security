import random

def generate(filename):
  key_list = random.sample(range(0,256), 256)
  key = ' '.join([str(x) for x in key_list])
  with open(filename, 'w') as file:
    file.write(key)

def main():
  generate('key.txt')

if __name__ == '__main__':
  main()
