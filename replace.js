const fs = require('fs');
let html = fs.readFileSync('hakomi.html', 'utf-8');

html = html.replaceAll('?????????? ?????? | ????? ??? – ??????????? ????? ????', '?????? | ????? ??? – ??????????? ????? ????');
html = html.replaceAll('content=\"?????????? ?????? ????? ??? – ????? ?????? ?? ???? ?????? ?? ??????, ?????? ??? ??????? ?????. ?? ????? ???, ??????????? ????? ????.\"', 'content=\"?????? ????? ??? – ????? ????? ??????????, ????? ????-??? ?????? ????????. ?? ????? ???, ??????????? ????? ????.\"');
html = html.replaceAll('https://abrahamdagan.co.il/psychotherapy', 'https://abrahamdagan.co.il/hakomi');

html = html.replace('\"name\": \"?????????? ??????\", /* TO CHANGE */', '\"name\": \"??????\", /* TO CHANGE */');
html = html.replace('<li><span class=\"text-cream/90\" aria-current=\"page\">?????????? ??????</span></li>', '<li><span class=\"text-cream/90\" aria-current=\"page\">??????</span></li>');

// Hero Title
html = html.replace('?????????? ??????\\r\\n                </h1>', '??????\\r\\n                </h1>');
html = html.replace('?????????? ??????\\n                </h1>', '??????\\n                </h1>');

html = html.replace('\"serviceType\": \"??????????\", /* TO CHANGE */', '\"serviceType\": \"??????\", /* TO CHANGE */');

html = html.replace('<li><a href=\"/psychotherapy\" class=\"rounded\" aria-current=\"page\">??????????\\r\\n                                            ??????</a> <!-- to change --></li>\\r\\n                                    <li><a href=\"/mindfulness\" class=\"rounded\">??????????</a></li>\\r\\n                                    <li><a href=\"/hakomi\" class=\"rounded\">??????</a></li>', '<li><a href=\"/psychotherapy\" class=\"rounded\">??????????\\n                                            ??????</a></li>\\n                                    <li><a href=\"/mindfulness\" class=\"rounded\">??????????</a></li>\\n                                    <li><a href=\"/hakomi\" class=\"rounded\" aria-current=\"page\">??????</a> <!-- to change --></li>');
html = html.replace('<li><a href=\"/psychotherapy\" class=\"rounded\" aria-current=\"page\">??????????\\n                                            ??????</a> <!-- to change --></li>\\n                                    <li><a href=\"/mindfulness\" class=\"rounded\">??????????</a></li>\\n                                    <li><a href=\"/hakomi\" class=\"rounded\">??????</a></li>', '<li><a href=\"/psychotherapy\" class=\"rounded\">??????????\\n                                            ??????</a></li>\\n                                    <li><a href=\"/mindfulness\" class=\"rounded\">??????????</a></li>\\n                                    <li><a href=\"/hakomi\" class=\"rounded\" aria-current=\"page\">??????</a> <!-- to change --></li>');

html = html.replace('<li><a href=\"/psychotherapy\" class=\"mobile-sublink\" aria-current=\"page\">?????????? ??????</a>\\r\\n                        <!-- to change --></li>\\r\\n                    <li><a href=\"/mindfulness\" class=\"mobile-sublink\">??????????</a></li>\\r\\n                    <li><a href=\"/hakomi\" class=\"mobile-sublink\">??????</a></li>', '<li><a href=\"/psychotherapy\" class=\"mobile-sublink\">?????????? ??????</a></li>\\n                    <li><a href=\"/mindfulness\" class=\"mobile-sublink\">??????????</a></li>\\n                    <li><a href=\"/hakomi\" class=\"mobile-sublink\" aria-current=\"page\">??????</a>\\n                        <!-- to change --></li>');
html = html.replace('<li><a href=\"/psychotherapy\" class=\"mobile-sublink\" aria-current=\"page\">?????????? ??????</a>\\n                        <!-- to change --></li>\\n                    <li><a href=\"/mindfulness\" class=\"mobile-sublink\">??????????</a></li>\\n                    <li><a href=\"/hakomi\" class=\"mobile-sublink\">??????</a></li>', '<li><a href=\"/psychotherapy\" class=\"mobile-sublink\">?????????? ??????</a></li>\\n                    <li><a href=\"/mindfulness\" class=\"mobile-sublink\">??????????</a></li>\\n                    <li><a href=\"/hakomi\" class=\"mobile-sublink\" aria-current=\"page\">??????</a>\\n                        <!-- to change --></li>');

let footerMenu1 =                             <a href=\"/psychotherapy\" aria-current=\"page\"\\r
                                class=\"text-white transition-colors duration-300 w-fit rounded inline-flex items-center gap-2 group\"><span\\r
                                    class=\"hidden lg:inline text-sage text-xs\" aria-hidden=\"true\">?</span> ??????????\\r
                                ??????</a> <!-- to change -->\\r
                            <a href=\"/mindfulness\"\\r
                                class=\"hover:text-white transition-colors duration-300 w-fit rounded inline-flex items-center gap-2 group\">\\r
                                <span\\r
                                    class=\"hidden lg:inline text-sage/0 group-hover:text-sage transition-colors text-xs\"\\r
                                    aria-hidden=\"true\">?</span>\\r
                                ??????????\\r
                            </a>\\r
                            <a href=\"/hakomi\"\\r
                                class=\"hover:text-white transition-colors duration-300 w-fit rounded inline-flex items-center gap-2 group\">\\r
                                <span\\r
                                    class=\"hidden lg:inline text-sage/0 group-hover:text-sage transition-colors text-xs\"\\r
                                    aria-hidden=\"true\">?</span>\\r
                                ??????\\r
                            </a>;

let footerMenu2 =                             <a href=\"/psychotherapy\" aria-current=\"page\"\n                                class=\"text-white transition-colors duration-300 w-fit rounded inline-flex items-center gap-2 group\"><span\n                                    class=\"hidden lg:inline text-sage text-xs\" aria-hidden=\"true\">?</span> ??????????\n                                ??????</a> <!-- to change -->\n                            <a href=\"/mindfulness\"\n                                class=\"hover:text-white transition-colors duration-300 w-fit rounded inline-flex items-center gap-2 group\">\n                                <span\n                                    class=\"hidden lg:inline text-sage/0 group-hover:text-sage transition-colors text-xs\"\n                                    aria-hidden=\"true\">?</span>\n                                ??????????\n                            </a>\n                            <a href=\"/hakomi\"\n                                class=\"hover:text-white transition-colors duration-300 w-fit rounded inline-flex items-center gap-2 group\">\n                                <span\n                                    class=\"hidden lg:inline text-sage/0 group-hover:text-sage transition-colors text-xs\"\n                                    aria-hidden=\"true\">?</span>\n                                ??????\n                            </a>;

let newFooterMenu =                             <a href=\"/psychotherapy\"\n                                class=\"hover:text-white transition-colors duration-300 w-fit rounded inline-flex items-center gap-2 group\"><span\n                                    class=\"hidden lg:inline text-sage/0 group-hover:text-sage transition-colors text-xs\" aria-hidden=\"true\">?</span> ??????????\n                                ??????</a>\n                            <a href=\"/mindfulness\"\n                                class=\"hover:text-white transition-colors duration-300 w-fit rounded inline-flex items-center gap-2 group\">\n                                <span\n                                    class=\"hidden lg:inline text-sage/0 group-hover:text-sage transition-colors text-xs\"\n                                    aria-hidden=\"true\">?</span>\n                                ??????????\n                            </a>\n                            <a href=\"/hakomi\" aria-current=\"page\"\n                                class=\"text-white transition-colors duration-300 w-fit rounded inline-flex items-center gap-2 group\">\n                                <span\n                                    class=\"hidden lg:inline text-sage text-xs\"\n                                    aria-hidden=\"true\">?</span>\n                                ??????\n                            </a> <!-- to change -->;

html = html.replace(footerMenu1, newFooterMenu);
html = html.replace(footerMenu2, newFooterMenu);

fs.writeFileSync('hakomi.html', html);
