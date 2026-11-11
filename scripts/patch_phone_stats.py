#!/usr/bin/env python3
"""Fail-closed phone-click reporting patch. Never print or commit live stats.php."""
from pathlib import Path
import sys

def patch(text: str) -> str:
    if 'phone_link_clicked' in text:
        raise ValueError('phone_link_clicked already present; refusing duplicate patch')
    edits = [
        ("'recommendation'=>false, 'card'=>false, 'profile'=>false, 'contact'=>false,", "'recommendation'=>false, 'card'=>false, 'profile'=>false, 'phone'=>false, 'contact'=>false,"),
        ("    if ($type === 'profile_link_clicked') $v['profile'] = true;", "    if ($type === 'profile_link_clicked') $v['profile'] = true;\n    if ($type === 'phone_link_clicked') $v['phone'] = true;"),
        ("'profile_link_clicked'=>0, 'contact_shown'=>0];", "'profile_link_clicked'=>0, 'phone_link_clicked'=>0, 'contact_shown'=>0];"),
        ("    if ($v['profile']) $funnelMap['profile_link_clicked']++;", "    if ($v['profile']) $funnelMap['profile_link_clicked']++;\n    if ($v['phone']) $funnelMap['phone_link_clicked']++;"),
        ("    'profile_link_clicked' => 'Profilra kattintott',", "    'profile_link_clicked' => 'Profilra kattintott',\n    'phone_link_clicked' => 'Telefonszámra kattintott',"),
        ("WHERE event_type IN ('recommendation_shown_card','profile_link_clicked')", "WHERE event_type IN ('recommendation_shown_card','profile_link_clicked','phone_link_clicked')"),
        ("$spViewedCount = [];", "$spViewedCount = [];\n$spPhoneCount = [];"),
        ("    } else {\n        $spViewedCount[$d['name']] = ($spViewedCount[$d['name']] ?? 0) + 1;", "    } elseif ($row['event_type'] === 'phone_link_clicked') {\n        $spPhoneCount[$d['name']] = ($spPhoneCount[$d['name']] ?? 0) + 1;\n    } else {\n        $spViewedCount[$d['name']] = ($spViewedCount[$d['name']] ?? 0) + 1;"),
        ("arsort($spViewedCount);", "arsort($spViewedCount);\narsort($spPhoneCount);"),
        ('    fputcsv($out, ["KORCSOPORT MEGOSZLÁS"]);', '    fputcsv($out, ["TELEFONSZÁM-KATTINTÁSOK SZAKEMBERENKÉNT"]);\n    fputcsv($out, ["Név", "Kattintások"]);\n    foreach ($spPhoneCount as $n => $c) { fputcsv($out, [$n, $c]); }\n    fputcsv($out, []);\n\n    fputcsv($out, ["KORCSOPORT MEGOSZLÁS"]);'),
    ]
    for old, new in edits:
        if text.count(old) != 1:
            raise ValueError(f'Expected exactly one anchor; got {text.count(old)} for {old[:50]!r}')
        text = text.replace(old, new, 1)
    anchor = '\n<script>\nfunction renderCharts(){'
    if text.count(anchor) != 1:
        raise ValueError('Cannot locate statistics chart boundary')
    section = '''
<div class="card">
  <h2>Telefonszám-kattintások szakemberenként</h2>
  <p class="subtitle">Kattintások száma, nem igazolt telefonhívások. A keresési tölcsér egyedi kereséseket számol.</p>
  <table>
    <tr><th>Név</th><th>Kattintások</th></tr>
    <?php foreach ($spPhoneCount as $n => $c): ?>
    <tr><td><?php echo h($n); ?></td><td><?php echo (int)$c; ?></td></tr>
    <?php endforeach; ?>
    <?php if (!$spPhoneCount): ?><tr><td colspan="2">Nincs adat.</td></tr><?php endif; ?>
  </table>
</div>
'''
    return text.replace(anchor, section + anchor, 1)

if __name__ == '__main__':
    if len(sys.argv) != 3:
        raise SystemExit('usage: patch_phone_stats.py INPUT OUTPUT')
    src, dest = map(Path, sys.argv[1:])
    dest.write_text(patch(src.read_text(encoding='utf-8')), encoding='utf-8')
    print('stats.php phone-click patch applied without printing source')
