import codecs
import re

with codecs.open(r'c:\Users\valen\clinic_site\relationships.html', 'r', 'utf-8') as f:
    html = f.read()

# Renumber sections 4 -> 5, 3 -> 4, 2 -> 3
html = html.replace('SECTION 4: Placeholder', 'SECTION 5: Placeholder')
html = html.replace('id="section-4"', 'id="section-5"')
html = html.replace('כותרת הדרכה 4', 'כותרת הדרכה 5')

html = html.replace('SECTION 3: Placeholder', 'SECTION 4: Placeholder')
html = html.replace('id="section-3"', 'id="section-4"')
html = html.replace('כותרת הדרכה 3', 'כותרת הדרכה 4')

html = html.replace('SECTION 2: Placeholder', 'SECTION 3: Placeholder')
html = html.replace('id="section-2"', 'id="section-3"')
html = html.replace('כותרת הדרכה 2', 'כותרת הדרכה 3')

# Now insert the new Section 2

# We need the 4 accordions from Hakomi.
with codecs.open(r'c:\Users\valen\clinic_site\hakomi.html', 'r', 'utf-8') as f:
    hakomi_html = f.read()

# Extract from LEFT COLUMN to /left column
m = re.search(r'<!-- LEFT COLUMN -->\s*<div class="flex flex-col gap-4">(.*?)</div><!-- /left column -->', hakomi_html, re.DOTALL)
left_col_accordions = m.group(1) if m else ""

# We will build the new section
new_section = f"""
        <!-- ════════════════════════════════════════════
       SECTION 2: ACCORDION PRINCIPLES
  ═════════════════════════════════════════════ -->
        <section id="section-2" class="py-12 md:py-24 bg-white">
            <div class="mx-auto px-4 md:px-8 lg:px-16 max-w-6xl">

                <!-- Heading -->
                <div data-reveal
                    class="text-center opacity-0 translate-y-6 transition-all duration-700 ease-out [&.visible]:opacity-100 [&.visible]:translate-y-0">
                    <!-- COMPONENT: section-heading -->
                    <h2 class="text-sage-accessible font-semibold text-sm tracking-widest uppercase block mb-3">כותרת משנית</h2>
                    <p class="text-3xl md:text-4xl font-bold text-navy-dark mb-5 leading-tight tracking-tight">
                        כותרת הדרכה 2
                    </p>
                    <span
                        class="w-14 h-[2px] bg-gradient-to-r from-sage via-sage-light to-transparent block mx-auto mb-8 rounded-full"></span>
                </div>

                <!-- 2-column accordion grid -->
                <div data-reveal
                    class="grid grid-cols-1 lg:grid-cols-2 gap-4 opacity-0 translate-y-6 transition-all duration-700 ease-out [&.visible]:opacity-100 [&.visible]:translate-y-0">

                    <!-- RIGHT COLUMN (Accordions) -->
                    <div class="flex flex-col gap-4">
{left_col_accordions}
                    </div><!-- /right column -->

                    <!-- LEFT COLUMN (Text) -->
                    <div class="flex flex-col gap-4">
                        <div class="bg-white rounded-2xl p-7 text-muted text-base md:text-lg leading-loose h-full border border-stone-medium/20 shadow-sm">
                            <p class="mb-5">לורם איפסום דולור סיט אמט, בראיט וסטיבולום אט ארקוס אליקאמוס. סת אלמנקום ניסי נון ניבאה. דס איאקוליס וולופטה דיאם.</p>
                            <p>קולהורקמוס קוואלוס לורם איפסום דולור סיט אמט. בראיט קונסקטורר אדיפיסינג אלית. סת אלמנקום ניסי נון ניבאה. לורם איפסום דולור סיט אמט, בראיט וסטיבולום אט ארקוס אליקאמוס.</p>
                        </div>
                    </div><!-- /left column -->

                </div><!-- /grid -->
            </div>
        </section>
"""

# Find where to insert it. After Section 1 ends.
# We'll split the HTML right before "SECTION 3: Placeholder" (formerly SECTION 2: Placeholder)

# the previous one was SECTION 2: Placeholder (now replaced to SECTION 3: Placeholder)
split_str = r'        <!-- ════════════════════════════════════════════\s*SECTION 3: Placeholder'
parts = re.split(split_str, html, 1)

if len(parts) == 2:
    new_html = parts[0] + new_section + "\n        <!-- ════════════════════════════════════════════\n       SECTION 3: Placeholder" + parts[1]
    with codecs.open(r'c:\Users\valen\clinic_site\relationships.html', 'w', 'utf-8') as f:
        f.write(new_html)
    print("Successfully added new Section 2.")
else:
    print("Failed to find injection point.")

