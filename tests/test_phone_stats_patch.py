import importlib.util
import unittest
from pathlib import Path

spec=importlib.util.spec_from_file_location('patch_phone_stats',Path(__file__).resolve().parents[1]/'scripts'/'patch_phone_stats.py')
module=importlib.util.module_from_spec(spec)
spec.loader.exec_module(module)

class PhoneStatsPatchTests(unittest.TestCase):
    def fixture(self):
        return """<?php
$searches[$sid] = ['recommendation'=>false, 'card'=>false, 'profile'=>false, 'contact'=>false,];
    if ($type === 'profile_link_clicked') $v['profile'] = true;
$funnelMap = ['profile_link_clicked'=>0, 'contact_shown'=>0];
    if ($v['profile']) $funnelMap['profile_link_clicked']++;
$funnelOrder = [
    'profile_link_clicked' => 'Profilra kattintott',
];
WHERE event_type IN ('recommendation_shown_card','profile_link_clicked')
$spViewedCount = [];
    } else {
        $spViewedCount[$d['name']] = ($spViewedCount[$d['name']] ?? 0) + 1;
arsort($spViewedCount);
    fputcsv($out, ["KORCSOPORT MEGOSZLÁS"]);
?>
<script>
function renderCharts(){
"""
    def test_patch_adds_reporting(self):
        result=module.patch(self.fixture())
        for expected in ['phone_link_clicked','spPhoneCount','Telefonszám-kattintások szakemberenként','TELEFONSZÁM-KATTINTÁSOK SZAKEMBERENKÉNT']:
            self.assertIn(expected,result)
        self.assertIn("if ($v['phone'])",result)
    def test_fail_closed_on_drift(self):
        with self.assertRaises(ValueError):
            module.patch('<?php echo "unrelated";')
    def test_fail_closed_on_repeat(self):
        with self.assertRaises(ValueError):
            module.patch(module.patch(self.fixture()))

if __name__ == '__main__':
    unittest.main()
