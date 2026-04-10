import re

def main():
    with open('c:/Users/valen/clinic_site/relationships.html', 'r', encoding='utf-8') as f:
        content = f.read()

    # 1. Update Title and Meta Descriptions
    content = content.replace('<title>זוגיות ומערכות יחסים | אברהם דגן – פסיכותרפיסט ומטפל רגשי</title>', '<title>שחיקה בעבודה | אברהם דגן – פסיכותרפיסט ומטפל רגשי</title>')
    content = content.replace('content="זוגיות ומערכות יחסים | אברהם דגן – פסיכותרפיסט ומטפל רגשי"', 'content="שחיקה בעבודה | אברהם דגן – פסיכותרפיסט ומטפל רגשי"')
    content = content.replace('content="טיפול במערכות יחסים וזוגיות בפרדס חנה. עם אברהם דגן, פסיכותרפיסט ומטפל רגשי."', 'content="טיפול בשחיקה בעבודה בפרדס חנה. עם אברהם דגן, פסיכותרפיסט ומטפל רגשי."')

    # 2. Update canonical links, OpenGraph urls and JSON-LD URLs
    content = content.replace('href="https://abrahamdagan.co.il/relationships"', 'href="https://abrahamdagan.co.il/career"')
    content = content.replace('content="https://abrahamdagan.co.il/relationships"', 'content="https://abrahamdagan.co.il/career"')
    content = content.replace('"url": "https://abrahamdagan.co.il/relationships"', '"url": "https://abrahamdagan.co.il/career"')
    content = content.replace('"item": "https://abrahamdagan.co.il/relationships"', '"item": "https://abrahamdagan.co.il/career"')

    # 3. Update JSON-LD Service and Breadcrumb titles
    content = content.replace('"name": "זוגיות ומערכות יחסים", /* TO CHANGE */', '"name": "שחיקה בעבודה", /* TO CHANGE */')
    content = content.replace('"serviceType": "זוגיות ומערכות יחסים", /* TO CHANGE */', '"serviceType": "שחיקה בעבודה", /* TO CHANGE */')
    content = content.replace('"description": "טיפול במערכות יחסים וזוגיות בפרדס חנה. עם אברהם דגן, פסיכותרפיסט ומטפל רגשי.", /* TO CHANGE */', '"description": "טיפול בשחיקה בעבודה בפרדס חנה. עם אברהם דגן, פסיכותרפיסט ומטפל רגשי.", /* TO CHANGE */')

    # 4. Update Navigation active state (Desktop & Mobile)
    content = content.replace('<li><a href="/relationships" aria-current="page" class="rounded">זוגיות ומערכות יחסים</a></li>', '<li><a href="/relationships" class="rounded">זוגיות ומערכות יחסים</a></li>')
    content = content.replace('<li><a href="/career" class="rounded">שחיקה בעבודה</a></li>', '<li><a href="/career" aria-current="page" class="rounded">שחיקה בעבודה</a></li>')
    
    content = content.replace('<li><a href="/relationships" class="mobile-sublink" aria-current="page">זוגיות ומערכות יחסים</a></li>', '<li><a href="/relationships" class="mobile-sublink">זוגיות ומערכות יחסים</a></li>')
    content = content.replace('<li><a href="/career" class="mobile-sublink">שחיקה בעבודה</a></li>', '<li><a href="/career" class="mobile-sublink" aria-current="page">שחיקה בעבודה</a></li>')

    # 5. Update the inline breadcrumb in the Hero section (this is exactly the string)
    content = content.replace('<li><span class="text-cream/90" aria-current="page">זוגיות ומערכות יחסים</span></li>', '<li><span class="text-cream/90" aria-current="page">שחיקה בעבודה</span></li>')

    # 6. Update the Hero H1 Title
    # It might have arbitrary spaces/newlines, so we use a regex just for the h1 block containing the text inner string.
    # Find h1 tag and replace its contents. Since there are other sections, we will only replace the text in the hero section.
    # Let's replace the first exact match within a specific context.
    h1_match_pattern = r'(<h1[^>]*>[\s\n]*)(זוגיות ומערכות יחסים)([\s\n]*</h1>)'
    content = re.sub(h1_match_pattern, r'\1שחיקה בעבודה\3', content, count=1)

    with open('c:/Users/valen/clinic_site/career.html', 'w', encoding='utf-8') as f:
        f.write(content)

    print("Success")

if __name__ == "__main__":
    main()
