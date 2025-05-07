from flask import Flask, request, jsonify
import json
import re

app = Flask(__name__)

with open("responses.json", "r", encoding="utf-8") as file:
    responses = json.load(file)

def normalize_input(text):
    text = text.lower()
    text = re.sub(r"[^\w\s]", "", text)
    replacements = {
        "إ": "ا", "أ": "ا", "آ": "ا", "ى": "ي", "ة": "ه", "ٱ": "ا", "ذ": "د", "ٰ": "",
        "ـ": "", "ْ": "", "ٌ": "", "ٍ": "", "ً": "", "ُ": "", "ِ": "", "َ": "", "ّ": ""
    }
    for src, target in replacements.items():
        text = text.replace(src, target)
    return text

@app.route("/chat", methods=["POST"])
def chat():
    user_input = request.json.get("message", "")
    normalized = normalize_input(user_input)

    # نفس الشروط زي الكود اللي فوق (هحطها كلها هنا برضو)

    if (
        any(word in normalized for word in ["معلومات", "تفاصيل", "ايه هي", "ما هي"]) and
        any(word in normalized for word in ["اعتيادية", "اعتيادي", "عادية", "عادي"])
    ):
        return jsonify({"response": responses.get("normalData")})

    if (
        any(word in normalized for word in ["معلومات", "تفاصيل", "ايه هي", "ما هي"]) and
        any(word in normalized for word in ["عارضه", "عارضة"])
    ):
        return jsonify({"response": responses.get("casualData")})

    if (
        any(word in normalized for word in ["معلومات", "تفاصيل", "ايه هي", "ما هي"]) and
        any(word in normalized for word in ["مرضي", "مرضية", "مرض"])
    ):
        return jsonify({"response": responses.get("sickData")})

    if (
        any(word in normalized for word in ["معلومات", "تفاصيل", "ايه هي", "ما هي"]) and
        any(word in normalized for word in ["وضع", "ولادة", "حمل"])
    ):
        return jsonify({"response": responses.get("maternityData")})

    if (
        any(word in normalized for word in ["معلومات", "تفاصيل", "ايه هي", "ما هي"]) and
        any(word in normalized for word in ["حج", "عمرة"])
    ):
        return jsonify({"response": responses.get("hajjData")})

    if (
        any(word in normalized for word in ["معلومات", "تفاصيل", "ايه هي", "ما هي"]) and
        any(word in normalized for word in ["بدون", "غير", "بدون مرتب"])
    ):
        return jsonify({"response": responses.get("unpaidData")})

    if (
        any(word in normalized for word in ["معلومات", "تفاصيل", "ايه هي", "ما هي"]) and
        any(word in normalized for word in ["وفاة", "وفاه", "حداد", "ميت", "موت"])
    ):
        return jsonify({"response": responses.get("deathData")})

    if (
        any(word in normalized for word in ["معلومات", "تفاصيل", "ايه هي", "ما هي"]) and
        any(word in normalized for word in ["زواج", "جواز", "فرح"])
    ):
        return jsonify({"response": responses.get("marriageData")})

    if (
        any(word in normalized for word in ["معلومات", "تفاصيل", "ايه هي", "ما هي"]) and
        any(word in normalized for word in ["امتحانات", "امتحان", "اختبار"])
    ):
        return jsonify({"response": responses.get("examData")})

    if (
        any(word in normalized for word in ["معلومات", "تفاصيل", "ايه هي", "ما هي"]) and
        any(word in normalized for word in ["تصريح", "خروج", "قصيره", "قصيرة"])
    ):
        return jsonify({"response": responses.get("permissionData")})

    if any(phrase in normalized for phrase in ["تعرف اجازات", "عارف اجازات", "تفهم في الاجازات", "عندك معلومات عن الاجازات", "انت على معرفه بالاجازات"]):
        return jsonify({"response": "نعم، لدي معرفة بجميع أنواع الإجازات وفقًا للقانون المصري. ما سؤالك؟"})

    if any(word in normalized for word in ["اهلا", "مرحبا", "السلام عليكم", "هاي", "ازيك", "صباح الخير", "مساء الخير"]):
        return jsonify({"response": "أهلاً بك! كيف يمكنني مساعدتك بخصوص الإجازات؟"})

    if any(word in normalized for word in ["شكرا", "شكر", "مشكور", "يسلمو", "يعطيك العافيه", "كتر خيرك", "حبيبي", "تسلم"]):
        return jsonify({"response": responses.get("thanks")})

    if any(word in normalized for word in ["عام", "معلومات عامة", "معلومات", "عامة", "القانون", "انواع"]):
        return jsonify({"response": responses.get("general_info")})

    if any(word in normalized for word in ["قانون", "مراجع قانونية"]):
        return jsonify({"response": responses.get("legal_reference")})

    return jsonify({"response": "عذرًا، لم أفهم طلبك"})


if __name__ == "__main__":
    app.run(debug=True)
