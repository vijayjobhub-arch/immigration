import re

def process_file(filepath):
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    # 1. Remove font-telugu elements
    content = re.sub(r'<[^>]*class="[^"]*font-telugu[^"]*"[^>]*>.*?</[^>]*>', '', content, flags=re.DOTALL)
    
    # 2. Remove data-te attributes
    content = re.sub(r'\s*data-te="[^"]*"', '', content)

    # 3. Text replacements for Telugu characters and branding
    replacements = [
        ("BridgeBuilder AI (సేతు / Setu)", "BridgeBuilder AI"),
        ("BridgeBuilder AI (సేతు)", "BridgeBuilder AI"),
        ("(సేతు)", ""),
        (">సే<", ">AI<"),
        ("లక్షణాలు", "Symptoms"),
        ("డాక్టర్ లేదా అత్యవసర క్లినిక్‌కి వెళ్ళినప్పుడు తెలుగులో లక్షణాలు ఎంచుకోండి — నర్సు మరియు డాక్టర్‌కు సులభంగా అర్థమయ్యే మెడికల్ సమ్మరీని తక్షణమే తయారుచేస్తుంది.", "Select your symptoms before visiting the doctor or emergency clinic — instantly generates a clear, professional medical summary for the nursing staff."),
        ("Bilingual", "Clinical"),
        ("Telugu Translation & Jargon Decoder", "Jargon Decoder"),
        ("Plain Telugu Decision Matrix", "Plain English Decision Matrix"),
        ("Plain Telugu", "Plain English"),
        ("5th-grade Telugu & English", "Simple English")
    ]
    for old, new in replacements:
        content = content.replace(old, new)

    # 4. Color Palette Refinement (Premium Aesthetic)
    color_replacements = [
        ("bg-amber-", "bg-violet-"),
        ("text-amber-", "text-violet-"),
        ("border-amber-", "border-violet-"),
        ("ring-amber-", "ring-violet-"),
        ("selection:bg-amber-", "selection:bg-violet-"),
        ("selection:text-amber-", "selection:text-violet-"),
        ("bg-slate-", "bg-zinc-"),
        ("text-slate-", "text-zinc-"),
        ("border-slate-", "border-zinc-"),
        ("from-brand-navy", "from-zinc-950"),
        ("to-brand-dark", "to-zinc-900"),
        ("to-slate-800", "to-zinc-800"),
        ("text-emerald-", "text-teal-"),
        ("bg-emerald-", "bg-teal-"),
        ("border-emerald-", "border-teal-")
    ]
    for old, new in color_replacements:
        content = content.replace(old, new)

    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(content)

if __name__ == "__main__":
    process_file("index.html")
    print("Done cleaning index.html")
