#!/usr/bin/env bash
# Download the EAS-built Android App Bundle (.aab) to the current directory.
set -euo pipefail

URL="https://expo.dev/artifacts/eas/jwHZvfSu3j9d9Y6qNcEqz3.aab"
OUT="shorthand-simplified.aab"

echo "Downloading .aab from: $URL"
curl -L --fail --retry 3 -o "$OUT" "$URL"
echo "Saved to $OUT"
