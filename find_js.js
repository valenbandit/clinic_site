const fs = require('fs');

const htmlFiles = ['index.html', 'teens.html'];

let fullHtml = '';
for (const file of htmlFiles) {
    if (fs.existsSync(file)) {
        fullHtml += ' ' + fs.readFileSync(file, 'utf-8');
    }
}

const terms = [
    'navbar',
    'hero-parallax-img',
    'hamburger',
    'mobile-menu',
    'mobile-close',
    'nav-dropdown-toggle',
    'nav-dropdown',
    'reveal',
    'contact-form',
    'submit-btn',
    'form-feedback'
];

for (const t of terms) {
    if (!fullHtml.includes(t)) {
        console.log(`Unused: ${t}`);
    }
}
