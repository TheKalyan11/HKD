import json

unicode_to_balaram = {
    'ā': 'ä', 'ī': 'ï', 'ū': 'ü', 'ṛ': 'å', 'ṝ': 'è', 'ḷ': 'ë', 'ḹ': 'í',
    'ṅ': 'ì', 'ñ': 'ñ', 'ṭ': 'ö', 'ḍ': 'ò', 'ṇ': 'ë',
    'ś': 'ç', 'ṣ': 'ñ', 'ṁ': 'à', 'ḥ': 'ù',
    'Ā': 'Ä', 'Ī': 'Ï', 'Ū': 'Ü', 'Ṛ': 'Å', 'Ṝ': 'È', 'Ḷ': 'Ë', 'Ḹ': 'Í',
    'Ṅ': 'Ì', 'Ñ': 'Ñ', 'Ṭ': 'Ö', 'Ḍ': 'Ò', 'Ṇ': 'Ë',
    'Ś': 'Ç', 'Ṣ': 'Ñ', 'Ṁ': 'À', 'Ḥ': 'Ù'
}

def to_balaram(text):
    return ''.join(unicode_to_balaram.get(c, c) for c in text)

result = {
    "1": to_balaram("naṣṭa-prāyeṣv abhadreṣu nityaṁ bhāgavata-sevayā"),
    "2": to_balaram("ceto-darpaṇa-mārjanam bhava-mahā-dāvāgni-nirvāpaṇaṁ")
}

with open("output.json", "w", encoding="utf-8") as f:
    json.dump(result, f, ensure_ascii=False)
