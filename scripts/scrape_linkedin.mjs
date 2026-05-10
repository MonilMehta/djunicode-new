import fs from 'fs';
import path from 'path';
import puppeteer from 'puppeteer-extra';
import StealthPlugin from 'puppeteer-extra-plugin-stealth';
import readline from 'readline';

puppeteer.use(StealthPlugin());

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const askQuestion = (query) => new Promise(resolve => rl.question(query, resolve));

async function run() {
    const dataPath = './content/data/profile/profile.json';
    const data = JSON.parse(fs.readFileSync(dataPath, 'utf-8'));
    
    const saveDir = './public/images/profile/';
    if (!fs.existsSync(saveDir)) {
        fs.mkdirSync(saveDir, { recursive: true });
    }

    console.log('Launching browser (non-headless) with stealth plugin...');
    const browser = await puppeteer.launch({ 
        headless: false,
        args: ['--no-sandbox', '--disable-setuid-sandbox']
    });
    const page = await browser.newPage();
    
    await page.setUserAgent('Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36');
    
    await page.goto('https://www.linkedin.com/login');
    
    console.log('\n======================================================');
    console.log('   ACTION REQUIRED: Please log in to LinkedIn now.');
    console.log('   Solve any CAPTCHAs in the browser window.');
    console.log('======================================================\n');
    await askQuestion('PRESS ENTER HERE in the terminal when you see your feed to continue scraping... ');
    
    let updatedCount = 0;

    for (let i = 0; i < data.length; i++) {
        const member = data[i];
        
        const hasImage = member.profile_pic && member.profile_pic.startsWith('/images/');
        const hasExtraData = member.linkedin_headline && member.location;
        
        // Skip if we already have BOTH the image and the extra metadata
        if (hasImage && hasExtraData) continue;
        if (!member.LinkedIn || !member.LinkedIn.includes('linkedin.com/in/')) continue;

        try {
            console.log(`[${i+1}/${data.length}] Visiting ${member.name}'s profile...`);
            await page.goto(member.LinkedIn, { waitUntil: 'domcontentloaded', timeout: 30000 });
            
            // Random delay to avoid hitting rate limits
            await new Promise(r => setTimeout(r, 2000 + Math.random() * 2000));
            
            const scraped = await page.evaluate(() => {
                const imgs = Array.from(document.querySelectorAll('img'));
                const profileImg = imgs.find(img => img.src.includes('profile-displayphoto-shrink'));
                
                const headlineMatch = document.querySelector('div.text-body-medium.break-words');
                const locationMatch = document.querySelector('span.text-body-small.inline.t-black--light.break-words');
                
                const companyMatchBtn = document.querySelector('button[aria-label^="Current company"]');
                const companyMatchRv = document.querySelector('.pv-text-details__right-panel');
                let company = null;
                if (companyMatchBtn) company = companyMatchBtn.innerText;
                else if (companyMatchRv) company = companyMatchRv.innerText;

                return {
                    imgSrc: profileImg ? profileImg.src : null,
                    headline: headlineMatch ? headlineMatch.innerText.trim() : null,
                    location: locationMatch ? locationMatch.innerText.trim() : null,
                    company: company ? company.trim().replace(/\n/g, ' ') : null
                };
            });
            
            let mutated = false;
            
            if (scraped.imgSrc && !hasImage) {
                const fileName = member.name.toLowerCase().trim().replace(/[^a-z0-9]/g, '_') + '.jpg';
                const filePath = path.join(saveDir, fileName);
                console.log(` -> Downloading picture to ${filePath}`);
                const response = await fetch(scraped.imgSrc);
                const buffer = await response.arrayBuffer();
                fs.writeFileSync(filePath, Buffer.from(buffer));
                member.profile_pic = `/images/profile/${fileName}`;
                mutated = true;
            }
            
            if (scraped.headline) {
                member.linkedin_headline = scraped.headline;
                console.log(` -> Headline: ${scraped.headline}`);
                mutated = true;
            }
            if (scraped.location) {
                member.location = scraped.location;
                console.log(` -> Location: ${scraped.location}`);
                mutated = true;
            }
            if (scraped.company) {
                member.company = scraped.company;
                console.log(` -> Company: ${scraped.company}`);
                mutated = true;
            }

            if (mutated) {
                updatedCount++;
                fs.writeFileSync(dataPath, JSON.stringify(data, null, 4));
            } else {
                 console.log(` -> No new data found for ${member.name}`);
            }
        } catch (err) {
            console.error(` -> Failed to process ${member.name}: ${err.message}`);
        }
    }
    
    console.log(`\n🎉 Success! Updated ${updatedCount} profiles with new data.`);
    await browser.close();
    process.exit(0);
}

run();
