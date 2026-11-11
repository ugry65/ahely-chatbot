const {test, expect} = require('@playwright/test');
const fs = require('fs');
const path = require('path');
const html = fs.readFileSync(path.join(__dirname, '../ahely_v8.html'), 'utf8');

test.beforeEach(async ({page}) => {
  await page.route('**/*', route => route.fulfill({status:200,contentType:'application/json',body:'{}'}));
  await page.setContent(html);
  await page.getByRole('button', {name:'Igen, konkrét szakembert keresek',exact:true}).click();
});

test('first letter shows choices; each prefix narrows the list', async ({page}) => {
  const input = page.locator('#inp');
  let previous;
  for (const text of ['k','ke','keu','keul']) {
    await input.fill(text);
    const names = await page.getByRole('option').allTextContents();
    expect(names.length).toBeGreaterThan(0);
    if (previous) expect(names.every(name => previous.includes(name))).toBe(true);
    previous = names;
  }
  await expect(page.getByRole('option')).toContainText('Keul Andrea');
  await expect(page.locator('.card')).toHaveCount(0);
  await page.getByRole('option').click();
  await expect(page.locator('.card h4')).toHaveText('Keul Andrea');
  await expect(page.locator('#nameSuggestions')).toBeHidden();
  await expect(input).toHaveValue('');
});

test('accentless input and typos offer the expected specialist', async ({page}) => {
  for (const [query,name] of [['olah','Oláh Imre'],['keol','Keul Andrea'],['keul andera','Keul Andrea'],['sipos bodor','Sipos-Bodor Anna'],['perger','Dr. Perger Mónika']]) {
    await page.locator('#inp').fill(query);
    await expect(page.getByRole('option').filter({hasText:name}).first()).toBeVisible();
  }
});

test('a name absent from the database is not invented', async ({page}) => {
  await page.locator('#inp').fill('zzzzunknown');
  await expect(page.getByRole('option')).toHaveCount(0);
  await expect(page.locator('#nameSearchStatus')).toContainText('Nincs találat');
});

test('ambiguous name requires a choice; keyboard can select', async ({page}) => {
  const input=page.locator('#inp');
  await input.fill('k');
  expect(await page.getByRole('option').count()).toBeGreaterThan(1);
  await input.press('Enter');
  await expect(page.locator('.card')).toHaveCount(0);
  await input.press('ArrowDown');
  const selected=await page.locator('[role=option][aria-selected=true]').evaluate(el=>el.firstChild.textContent);
  await input.press('Enter');
  await expect(page.locator('.card h4')).toHaveText(selected);
});

test('no results, clearing, escape and reset keep the search usable', async ({page}) => {
  const input=page.locator('#inp');
  await input.fill('zzzzzzzz');
  await page.getByRole('button',{name:'Küldés',exact:true}).click();
  await expect(page.locator('#nameSearchStatus')).toContainText('Nincs találat');
  await expect(input).toBeVisible();
  await input.fill('k');
  await input.press('Escape');
  await expect(page.locator('#nameSuggestions')).toBeHidden();
  await input.press('ArrowDown');
  await expect(page.getByRole('option').first()).toBeVisible();
  await input.fill('');
  await expect(page.locator('#nameSuggestions')).toBeHidden();
  await input.fill('ke');
  await page.locator('#restartBottom').click();
  await expect(page.locator('#nameSuggestions')).toBeHidden();
  await expect(input).toBeHidden();
  await page.getByRole('button',{name:'Nem, segíts választani!',exact:true}).click();
  await expect(page.getByRole('button',{name:'Felnőtt (18+)',exact:true})).toBeVisible();
});

test('all matching names remain accessible in a scrollable list', async ({page}) => {
  await page.locator('#inp').fill('s');
  const results=await page.evaluate(()=>getNameMatches('s').length);
  await expect(page.getByRole('option')).toHaveCount(results);
  await page.getByRole('option').last().click();
  await expect(page.locator('.card')).toHaveCount(1);
  expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true);
});

test('specialist data and recommendation invariants stay intact', async ({page}) => {
  const data=await page.evaluate(()=>({ids:SP.map(sp=>sp.id),capacity:SZABAD_KAPACITAS,coaching:Object.entries(KATEGORIA_MAP).filter(([key])=>key.includes('coach'))}));
  expect(data.ids).toHaveLength(32);
  for (const id of [23,30,37]) expect(data.ids).not.toContain(id);
  expect(data.capacity).toEqual([8,9,15,41,50,53,60]);
  expect(data.coaching.length).toBeGreaterThan(0);
  for (const [,ids] of data.coaching) expect(ids).toEqual([9,60]);
});

test('guided age and topic search still renders recommendations', async ({page}) => {
  await page.locator('#restartBottom').click();
  await page.getByRole('button',{name:'Nem, segíts választani!',exact:true}).click();
  await page.getByRole('button',{name:'Felnőtt (18+)',exact:true}).click();
  await page.getByRole('button',{name:'Szorongás',exact:true}).click();
  await page.getByRole('button',{name:'Tovább a kiválasztott témákkal',exact:true}).click();
  await expect(page.locator('.card').first()).toBeVisible();
  await expect(page.locator('#nameSuggestions')).toBeHidden();
  const names=await page.locator('.card h4').allTextContents();
  expect(names).not.toContain('Oláh Imre');
});

test('existing crisis handling is reachable with Enter in name mode', async ({page}) => {
  await page.locator('#inp').fill('bantom magam');
  await page.locator('#inp').press('Enter');
  await expect(page.locator('.crisis')).toBeVisible();
});

test('the input stays inside the visible panel with the suggestion list open', async ({page}) => {
  await page.locator('#inp').fill('s');
  const bounds=await page.evaluate(()=>({
    wrap:document.getElementById('wrap').getBoundingClientRect().bottom,
    input:document.getElementById('inp').getBoundingClientRect().bottom,
    viewport:innerHeight
  }));
  expect(bounds.input).toBeLessThanOrEqual(bounds.wrap);
  expect(bounds.input).toBeLessThanOrEqual(bounds.viewport);
});

test('surname prefixes exclude given names and internal letter matches', async ({page}) => {
  const input=page.locator('#inp');
  await input.fill('k');
  const names=await page.getByRole('option').evaluateAll(options=>options.map(el=>el.firstChild.textContent));
  expect(names).toEqual(['Keul Andrea','Kocka Alexandra']);
  for(const query of ['andrea','imre','krisztina','arcs']){
    await input.fill(query);
    await expect(page.getByRole('option')).toHaveCount(0);
  }
  await input.fill('p');
  await expect(page.getByRole('option').filter({hasText:'Dr. Perger Mónika'})).toBeVisible();
  await input.fill('dr. perger');
  await expect(page.getByRole('option')).toHaveCount(1);
});

test('both parts of a compound surname resolve without matching given names', async ({page}) => {
  for(const term of ['g','géczi','geczi','répássy','repassy','repasy','sipos','bodor']){
    await page.locator('#inp').fill(term);
    const expected = /sipos|bodor/.test(term) ? 'Sipos-Bodor Anna' : 'Géczi-Répássy Helga';
    await expect(page.getByRole('option').filter({hasText:expected})).toBeVisible();
  }
  for(const firstName of ['helga','anna','andrea']){
    await page.locator('#inp').fill(firstName);
    await expect(page.getByRole('option')).toHaveCount(0);
  }
});

test('Helga has a direct local photo, proper profile, available capacity and callable phone', async ({page}) => {
  await page.locator('#inp').fill('repassy');
  await page.getByRole('option').filter({hasText:'Géczi-Répássy Helga'}).click();
  const card=page.locator('.card');
  await expect(card.locator('h4')).toHaveText('Géczi-Répássy Helga');
  await expect(card.locator('.cap-free')).toBeVisible();
  await expect(card.locator('img')).toHaveAttribute('src','https://a-hely.com/images/repasi%20helga%20540.png');
  await expect(card.locator('a[href^="tel:"]')).toHaveAttribute('href','tel:+36303578003');
  await expect(card.locator('a[href^="tel:"]')).toHaveText('+36 30 357 8003');
  await expect(card.getByText('Profil megtekintése')).toHaveAttribute('href','https://a-hely.com/ai/60-geczi-repassy-helga');
});

test('stored phones have consistent display and dialing formats, and missing numbers stay absent', async ({page}) => {
  const audit=await page.evaluate(()=>SP.map(sp=>({id:sp.id,name:sp.n,phone:sp.phone||null})));
  expect(audit.filter(x=>x.phone)).toHaveLength(27);
  expect(audit.filter(x=>!x.phone).map(x=>x.id).sort((a,b)=>a-b)).toEqual([15,28,39,50,59]);
  for(const sp of audit.filter(x=>x.phone)){
    expect(sp.phone,sp.name).toMatch(/^\+36 (20|30|70) \d{3} \d{4}$/);
  }
  await page.locator('#inp').fill('spák');
  await page.getByRole('option').filter({hasText:'Spák Brigitta'}).click();
  await expect(page.locator('.card a[href^="tel:"]')).toHaveCount(0);
});

test('telephone link click sends phone_link_clicked without phone number in payload', async ({page}) => {
  const events=[];
  await page.route('**/log.php', async route => {
    events.push(route.request().postDataJSON());
    await route.fulfill({status:200,contentType:'application/json',body:'{}'});
  });
  await page.locator('#inp').fill('keul');
  await page.getByRole('option').filter({hasText:'Keul Andrea'}).click();
  const link=page.locator('.card a[href^="tel:"]').first();
  await expect(link).toBeVisible();
  await link.evaluate(el=>el.click());
  await expect.poll(()=>events.some(x=>x.event_type==='phone_link_clicked')).toBe(true);
  const click=events.find(x=>x.event_type==='phone_link_clicked');
  expect(click.event_data.specialist_id).toBe(8);
  expect(JSON.stringify(click)).not.toContain('+36');
});
