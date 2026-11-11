#!/usr/bin/env python3
"""Print ONLY non-sensitive structural booleans about live PHP files."""
from pathlib import Path
import sys
stats = Path(sys.argv[1]).read_text(encoding="utf-8", errors="replace")
logger = Path(sys.argv[2]).read_text(encoding="utf-8", errors="replace")
checks = {
    "stats_has_funnelMap": "$funnelMap" in stats,
    "stats_has_funnelOrder": "$funnelOrder" in stats,
    "stats_has_spRows": "$spRows" in stats,
    "stats_has_searches": "$searches" in stats,
    "stats_has_profile_link_clicked": "profile_link_clicked" in stats,
    "stats_has_phone_link_clicked": "phone_link_clicked" in stats,
    "logger_has_event_type": "event_type" in logger,
    "logger_has_phone_link_clicked": "phone_link_clicked" in logger,
}
for key, value in checks.items():
    print(f"{key}={'yes' if value else 'no'}")
if not all(checks[k] for k in (
    "stats_has_funnelMap", "stats_has_funnelOrder",
    "stats_has_spRows", "stats_has_searches",
    "stats_has_profile_link_clicked", "logger_has_event_type"
)):
    raise SystemExit("Live PHP structure differs from expected; STOP and review before editing.")
