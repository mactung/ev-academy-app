echo "Switching to branch master"
git checkout master

echo "Building app"
npm run build

echo "Deploying files to server"
rsync -avP build/ examhelp.org.uk:/var/www/ev-academy-client/
echo "Deployment complete"
