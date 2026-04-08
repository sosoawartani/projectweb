function getSymptomFlags() {
  return {
    fever: document.getElementById("symptom-fever").checked,
    cough: document.getElementById("symptom-cough").checked,
    headache: document.getElementById("symptom-headache").checked,
    nausea: document.getElementById("symptom-nausea").checked,
    fatigue: document.getElementById("symptom-fatigue").checked,
    soreThroat: document.getElementById("symptom-sore-throat").checked,
  };
}

function analyze() {
  const s = getSymptomFlags();
  const any =
    s.fever ||
    s.cough ||
    s.headache ||
    s.nausea ||
    s.fatigue ||
    s.soreThroat;

  if (!any) {
    alert("الرجاء إدخال الأعراض");
    return;
  }

  const possibilities = [];

  if (s.fever && s.cough) {
    possibilities.push("إنفلونزا");
    possibilities.push("نزلة برد");
  } else if (s.cough && !s.fever) {
    possibilities.push("نزلة برد");
  }

  if (s.headache && s.nausea) {
    possibilities.push("صداع نصفي");
  }

  if (s.fever && s.soreThroat) {
    possibilities.push("التهاب حلق / برد");
  } else if (s.soreThroat && !s.fever) {
    possibilities.push("التهاب حلق بسيط");
  }

  if (s.fatigue && possibilities.length === 0) {
    possibilities.push("إرهاق عام (قد يكون بسبب نوم أو إجهاد)");
  }

  const unique = [];
  for (let i = 0; i < possibilities.length; i++) {
    if (unique.indexOf(possibilities[i]) === -1) {
      unique.push(possibilities[i]);
    }
  }

  let severityLabel = "خفيف";
  let severityIcon = "🟢";

  if (s.fever && s.cough && s.fatigue) {
    severityLabel = "خطير";
    severityIcon = "🔴";
  } else if (
    (s.fever && s.cough) ||
    (s.headache && s.nausea) ||
    (s.fever && s.soreThroat)
  ) {
    severityLabel = "متوسط";
    severityIcon = "🟡";
  }

  if (unique.length === 0) {
    unique.push("لا يمكن الجزم بتشخيص — يُنصح بمراجعة طبيب");
  }

  const lines = [];
  lines.push("الاحتمالات المحتملة:");
  lines.push(unique.join("، "));
  lines.push("");
  lines.push("مستوى الخطورة: " + severityIcon + " " + severityLabel);

  const out = document.getElementById("result-container");
  out.innerText = lines.join("\n");
}

function showInfo(disease) {
  let info = "";

  if (disease === "flu") {
    info =
      "إنفلونزا\n" +
      "أعراضه:\n" +
      "- حمى وفجأة\n" +
      "- سعال وجسم مُتَوَرِّع\n" +
      "- إرهاق شديد أحياناً";
  } else if (disease === "cold") {
    info =
      "نزلة برد\n" +
      "أعراضه:\n" +
      "- سيلان أنف واحتقان\n" +
      "- سعال خفيف\n" +
      "- تطور تدريجي للأعراض";
  } else if (disease === "migraine") {
    info =
      "صداع نصفي\n" +
      "أعراضه:\n" +
      "- صداع نابض غالباً جانب واحد\n" +
      "- حساسية للضوء أو الصوت\n" +
      "- غثيان أحياناً";
  } else if (disease === "strep") {
    info =
      "التهاب حلق ستربتوكوكي\n" +
      "أعراضه:\n" +
      "- ألم حلق شديد وفجأة\n" +
      "- حمى\n" +
      "- يحتاج تشخيصاً طبياً";
  } else {
    info = "لا يوجد شرح لهذا الاختيار.";
  }

  const el = document.getElementById("disease-info");
  el.innerText = info;
}

function initDiagnosis() {
  const btn = document.getElementById("analyze-btn");
  if (!btn) {
    return;
  }
  btn.addEventListener("click", analyze);
}

function initDiseases() {
  const infoEl = document.getElementById("disease-info");
  if (!infoEl) {
    return;
  }
  const buttons = document.querySelectorAll("[data-disease]");
  for (let i = 0; i < buttons.length; i++) {
    buttons[i].addEventListener("click", function () {
      const disease = this.getAttribute("data-disease");
      showInfo(disease);
    });
  }
}

function initContact() {
  const form = document.getElementById("contact-form");
  if (!form) {
    return;
  }

  form.addEventListener("submit", function (event) {
    event.preventDefault();

    const name = document.getElementById("contact-name").value.trim();
    const email = document.getElementById("contact-email").value.trim();
    const message = document.getElementById("contact-message").value.trim();

    if (name === "" || email === "" || message === "") {
      alert("الرجاء تعبئة جميع الحقول");
      return;
    }

    alert("تم إرسال الرسالة بنجاح");
  });
}

function init() {
  initDiagnosis();
  initDiseases();
  initContact();
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", init);
} else {
  init();
}
