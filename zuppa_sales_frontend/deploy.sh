if [ "$1" == "prod" ]; then
  ENVIRONMENT="prod"
  REMOTE_USER="ubuntu"
  REMOTE_HOST="13.233.28.52" 
  #13.233.28.52, 3.110.161.136
  REMOTE_DIR="rubicr/frontend"
  ENV_FILE=".env.example_prod"
  BUILD_COMMAND="npm run build:prod"
else
  ENVIRONMENT="dev"
  REMOTE_USER="ubuntu"
  REMOTE_HOST="13.235.31.115"
  REMOTE_DIR="rubicr/frontend"
  ENV_FILE=".env.example_dev"
  BUILD_COMMAND="npm run build:dev"
fi

echo "Deploying to $ENVIRONMENT environment..."

rm -rf .next/

npm install

echo "Running build command: $BUILD_COMMAND"
$BUILD_COMMAND

if [[ "$(uname -s)" == *"MINGW"* || "$(uname -s)" == *"CYGWIN"* ]]; then
  CURRENT_DIR=$(cygpath -w $(pwd))
else
  CURRENT_DIR=$(pwd)
fi

echo "Current Directory: $CURRENT_DIR"

scp -r "$CURRENT_DIR/.next" "$REMOTE_USER@$REMOTE_HOST:$REMOTE_DIR"
scp -r "$CURRENT_DIR/package.json" "$REMOTE_USER@$REMOTE_HOST:$REMOTE_DIR"
scp -r "$CURRENT_DIR/next.config.js" "$REMOTE_USER@$REMOTE_HOST:$REMOTE_DIR"
echo "Current Env File: $ENV_FILE"
scp -r "$CURRENT_DIR/$ENV_FILE" "$REMOTE_USER@$REMOTE_HOST:$REMOTE_DIR/.env"

echo "Updating environment variables on remote server..."

echo "Environment variables have been updated for $ENVIRONMENT."

ssh "$REMOTE_USER@$REMOTE_HOST" <<EOF
  cd $REMOTE_DIR
  npm install
  pm2 restart rubicr-frontend
EOF

echo "Deployment and application start complete!"
