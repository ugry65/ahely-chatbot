#!/usr/bin/env python3
"""Fail closed on undocumented PRs and critical chatbot-data regressions."""
import os
import re
import subprocess
import sys
from pathlib import Path

def fail(message):
    print("ERROR:", message, file=sys.stderr)
    sys.exit(1)

def git(*args):
    return subprocess.check_output(["git", *args], text=True).strip()

html = Path("ahely_v8.html").read_text(encoding="utf-8")
log = Path("docs/CHANGELOG.md").read_text(encoding="utf-8")
if not re.search(r"^## CHB-\d{8}-\d{2} – ", log, re.M):
    fail("Missing structured CHANGELOG entry")
# Parse specialist objects and category mappings without assuming IDs are contiguous.
sp_start = re.search(r"\b(?:const|var|let)\s+SP\s*=\s*\[", html)
if not sp_start:
    fail("SP array not found")
sp_text = html[sp_start.end():]
sp_text = sp_text[:sp_text.find("];")]
ids = [int(x) for x in re.findall(r"\bid\s*:\s*(\d+)", sp_text)]
if len(ids) != 31 or len(set(ids)) != 31:
    fail(f"Expected 31 unique specialist IDs; found {len(ids)}")
if set(ids) & {23, 30, 37}:
    fail("Removed specialist ID has returned")
capacity = re.search(r"\bSZABAD_KAPACITAS\s*=\s*\[([^\]]+)\]", html)
if not capacity or [int(x) for x in re.findall(r"\d+", capacity.group(1))] != [8,9,15,41,50,53]:
    fail("Capacity list changed without updating the validator")
mapping = re.search(r"\b(?:const|var|let)\s+KATEGORIA_MAP\s*=\s*\{", html)
if not mapping:
    fail("KATEGORIA_MAP not found")
section = html[mapping.end():]
section = section[:section.find("\n};")]
coaching = {"karrier","coaching","celkeress","celkituzes","vezeto","munkahelyi","motivacio"}
for key, values in re.findall(r"\b([a-zA-Z_][\w]*)\s*:\s*\[([^\]]*)\]", section):
    members = [int(x) for x in re.findall(r"\d+", values)]
    if key in coaching and members != [9]:
        fail(f"Coaching key {key} must equal [9]")
    if key not in coaching and 9 in members:
        fail(f"ID 9 appears in non-coaching key {key}")
if os.environ.get("GITHUB_EVENT_NAME") == "pull_request":
    base = os.environ.get("GITHUB_BASE_REF", "main")
    changed = set(git("diff", "--name-only", f"origin/{base}...HEAD").splitlines())
    if changed and "docs/CHANGELOG.md" not in changed:
        fail("Every PR must update docs/CHANGELOG.md")
    if changed and not any(re.search(r"^\+## CHB-\d{8}-\d{2} – ", line) for line in git("diff", "--unified=0", f"origin/{base}...HEAD", "--", "docs/CHANGELOG.md").splitlines()):
        fail("CHANGELOG must contain a NEW dated entry in this PR")
print("Mandatory changelog and critical data checks passed")
