#!/usr/bin/env bash
set -euo pipefail
env -i PATH="$PATH" GIT_CONFIG_NOSYSTEM=1 GIT_CONFIG_GLOBAL=/dev/null \
  GIT_TERMINAL_PROMPT=0 GIT_ASKPASS=/bin/false bash --noprofile --norc <<'BASH'
set -euo pipefail
repo=https://github.com/fabiojuniort-cyber/radar-fiscal-backend.git
check_pin() {
  local dir=$1 pin=$2 actual
  mkdir -- "$dir"
  git init --quiet --template= "$dir"
  git -C "$dir" fetch --quiet --no-tags --depth=1 "$repo" "$pin"
  git -C "$dir" checkout --quiet --detach FETCH_HEAD
  actual=$(git -C "$dir" rev-parse --verify HEAD)
  if [[ "$actual" != "$pin" ]]; then
    printf 'stage=head tree=%s expected=%s actual=%s result=mismatch\n' "$dir" "$pin" "$actual"
    return 1
  fi
  printf 'stage=head tree=%s expected=%s actual=%s result=match\n' "$dir" "$pin" "$actual"
}
check_pin backend-control b2150ab5ef34e9f9646e219d522e47738d9c04f5
check_pin backend-integration 2c41fbab8169b7efca6bd2e80c963d57a50585b6
BASH
