#!/bin/bash

# Ensure the .git/hooks directory exists
mkdir -p .git/hooks

# Copy the commit-msg hook to the hooks directory
cp .githooks/commit-msg .git/hooks/commit-msg

# Make it executable
chmod +x .git/hooks/commit-msg

echo "Git hooks installed successfully!"
