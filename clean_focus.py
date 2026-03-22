import os

files = [
    r'c:\Users\valen\clinic_site\index.html',
    r'c:\Users\valen\clinic_site\psychotherapy.html',
    r'c:\Users\valen\clinic_site\relationships.html'
]

targets = [
    'focus:ring-2',
    'focus:ring-sage/50',
    'focus:ring-sage',
    'focus:ring-white'
]

for file in files:
    if os.path.exists(file):
        with open(file, 'r', encoding='utf-8') as f:
            content = f.read()
        
        for t in targets:
            # Try replacing with leading space first, then trailing space, then just the target
            content = content.replace(' ' + t, '')
            content = content.replace(t + ' ', '')
            content = content.replace(t, '')
            
        with open(file, 'w', encoding='utf-8') as f:
            f.write(content)
        print(f"Processed {file}")
    else:
        print(f"File not found: {file}")
