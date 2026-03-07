const fs = require('fs');
const file = 'c:/Users/valen/clinic_site/index.html';
let html = fs.readFileSync(file, 'utf8');

// I need to find the H1 tag and the Image side tag to replace everything in between.
const h1End = '</h1>';
const imageSideStart = '<!-- Image side -->';

const startIndex = html.indexOf(h1End) + h1End.length;
const endIndex = html.indexOf(imageSideStart);

if (startIndex > -1 && endIndex > -1 && startIndex < endIndex) {
    const replacement = `

                <!-- Sub-headline -->
                <p class="text-lg md:text-xl text-muted font-light mb-8 max-w-md leading-relaxed">
                    מטפל רגשי לגברים בגישת האקומי, מיינדפולנס וטיפול דינמי<br class="hidden md:block">
                </p>

                <!-- Actions & Credentials -->
                <div class="flex flex-col gap-5 sm:gap-10 sm:mb-10 w-full">
                    <!-- CTA buttons (Mobile: Order 1, Centered | Desktop: Order 2, Left-aligned) -->
                    <div class="flex flex-wrap gap-4 order-1 sm:order-2 justify-center sm:justify-start w-full">
                        <!-- COMPONENT: btn-cta -->
                        <a href="#contact" title="קביעת פגישת ייעוץ עם אברהם"
                            class="btn-cta inline-flex items-center justify-center gap-2 bg-sage text-white font-semibold px-7 py-4 rounded-full shadow-xl hover:bg-sage-dark transition-colors text-base focus:outline-none focus:ring-2 focus:ring-white">
                            קביעת פגישת היכרות
                            <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none" viewBox="0 0 24 24"
                                stroke="currentColor" stroke-width="2" aria-hidden="true">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M7 17l9.2-9.2M17 17V7H7" />
                            </svg>
                        </a>
                        <!-- Desktop secondary button -->
                        <a href="#about" aria-label="קראו עוד על הגישה הטיפולית של אברהם"
                            class="hidden sm:inline-flex items-center gap-2 border border-navy-dark/20 text-navy-dark font-medium px-7 py-4 rounded-full hover:border-sage hover:text-sage transition-colors text-base focus:outline-none focus:ring-2 focus:ring-white">
                            קראו עוד
                        </a>
                    </div>

                    <!-- Credentials & Mobile Secondary Button (Mobile: Order 2, Centered row | Desktop: Order 1) -->
                    <div class="flex flex-row flex-wrap justify-center sm:justify-start items-center gap-3 order-2 sm:order-1 w-full mt-2 sm:mt-0 mb-6 sm:mb-0">
                        <span class="credential-badge inline-flex items-center justify-center text-xs font-medium text-navy-dark px-4 py-2 rounded-full">
                            📍 <strong>פרדס חנה</strong>
                        </span>
                        
                        <!-- Mobile secondary button (styled like badge) -->
                        <a href="#about" aria-label="קראו עוד"
                            class="sm:hidden credential-badge inline-flex text-center items-center justify-center text-[11px] sm:text-xs font-medium text-navy-dark px-4 py-2 rounded-full hover:bg-sage/10 transition-colors border border-navy-dark/10">
                            קראו עוד
                        </a>

                        <span class="hidden sm:inline-flex credential-badge text-xs font-medium text-navy-dark px-4 py-2 rounded-full items-center">
                            🏛️ חבר ב<strong>איגוד הישראלי הרב-תחומי לפסיכותרפיה</strong>
                        </span>
                    </div>
                </div>
            </div>

            `;

    // The previous replace_file_content accidentally wiped out the opening <div class="flex-1..."> of the image side.
    const restoredImageStart = `<!-- Image side -->
            <div
                class="flex-1 order-1 lg:order-2 min-h-[35vh] sm:min-h-[45vh] lg:min-h-screen relative overflow-hidden">`;

    let finalHtml = html.slice(0, startIndex) + replacement + restoredImageStart + html.slice(html.indexOf('class="flex-1 order-1 lg:order-2 min-h-[35vh]') + 109);
    fs.writeFileSync(file, finalHtml, 'utf8');
    console.log("Restored missing sub-headline and constructed Hero mobile layout perfectly.");
} else {
    console.log("Could not locate headers. Trying broader search.");
}
