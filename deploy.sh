#!/bin/sh

scp -rP 7386 dist/* root@server01-nginx.lamecoserver.com:/home/snackify/domains/snacks.lameco.nl/public_html/dist/
scp -rP 7386 package.json root@server01-nginx.lamecoserver.com:/home/snackify/domains/snacks.lameco.nl/public_html/dist/
scp -rP 7386 prisma root@server01-nginx.lamecoserver.com:/home/snackify/domains/snacks.lameco.nl/public_html/dist/
scp -rP 7386 client/public/* root@server01-nginx.lamecoserver.com:/home/snackify/domains/snacks.lameco.nl/public_html/client/public/
#ssh -p 7386 root@server01-nginx.lamecoserver.com 'cd /home/snackify/domains/snacks.lameco.nl/public_html/dist && nvm use 14 && npm i'
#ssh -p 7386 root@server01-nginx.lamecoserver.com 'cd /home/snackify/domains/snacks.lameco.nl/public_html/ && nvm use 14 && npx prisma migrate dev'
ssh -p 7386 root@server01-nginx.lamecoserver.com 'cd /home/snackify/domains/snacks.lameco.nl/public_html/ && nvm use 14 && pm2 restart snackify'
echo Snackify is deployed!
