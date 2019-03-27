import re

l = open('none.html', 'r').read()

print(re.search(
    r'^(http:\/\/|https:\/\/)([a-z]+\.)*[a-z0-9]+\.[a-z]+(\/[a-z]+|\.[a-z]+)*', l))
