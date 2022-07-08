#!/bin/sh

ssh -p 7386 root@server01-nginx.lamecoserver.com 'cd /home/snackify/domains/snacks.lameco.nl/public_html/ && nvm use 14 && npm i'
ssh -p 7386 root@server01-nginx.lamecoserver.com 'cd /home/snackify/domains/snacks.lameco.nl/public_html/ && nvm use 14 && npx prisma migrate dev'
ssh -p 7386 root@server01-nginx.lamecoserver.com 'cd /home/snackify/domains/snacks.lameco.nl/public_html/ && nvm use 14 && pm2 restart snackify'
scp -rP 7386 dist/* root@server01-nginx.lamecoserver.com:/home/snackify/domains/snacks.lameco.nl/public_html/
echo Snackify is deployed!
