echo "Switching to branch master"
git checkout master

echo "Building app"
npm run build

echo "Deploying files to server"
rsync -avP build/ ev-academy@example.com:/var/www/ev-academy-app/
echo "Deployment complete"
