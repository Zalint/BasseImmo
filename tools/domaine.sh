#!/usr/bin/env bash
# Remplace le domaine du site partout : liens canoniques, Open Graph, sitemap, robots.
#
#   ./tools/domaine.sh https://basseimmo.onrender.com
#   ./tools/domaine.sh https://basseimmo.sn
#
set -euo pipefail

NOUVEAU="${1:-}"
if [[ -z "$NOUVEAU" ]]; then
  echo "Usage : $0 https://mon-domaine.tld" >&2
  exit 1
fi
NOUVEAU="${NOUVEAU%/}"                       # on enlève le slash final éventuel

cd "$(dirname "$0")/.."

ACTUEL=$(grep -m1 -oE 'https?://[^/"]+' robots.txt || true)
if [[ -z "$ACTUEL" ]]; then
  echo "Domaine actuel introuvable dans robots.txt" >&2
  exit 1
fi

if [[ "$ACTUEL" == "$NOUVEAU" ]]; then
  echo "Le domaine est déjà $NOUVEAU, rien à faire."
  exit 0
fi

echo "Remplacement de $ACTUEL par $NOUVEAU"
# Les URL apparaissent dans les pages HTML, le sitemap et robots.txt.
grep -rlF "$ACTUEL" --include='*.html' --include='*.xml' --include='*.txt' . \
  | xargs sed -i.bak "s|${ACTUEL}|${NOUVEAU}|g"
find . -name '*.bak' -delete

echo "Occurrences restantes de l'ancien domaine : $(grep -rcF "$ACTUEL" --include='*.html' --include='*.xml' --include='*.txt' . | grep -v ':0$' | wc -l)"
echo "Terminé. Pensez à committer, puis à redéployer."
