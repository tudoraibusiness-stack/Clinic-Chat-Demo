let step = 0;
let chosenArea = "";

function send() {
  const input = document.getElementById("input");
  const messages = document.getElementById("messages");
  const rawText = input.value.trim();
  const text = rawText.toLowerCase();
  if (!rawText) return;

  // STOP RESPONDING AFTER BOOKING
  if (step === 999) return;

  // Display client message
  messages.innerHTML += `<div class="msg client">${rawText}</div>`;
  input.value = "";
  messages.scrollTop = messages.scrollHeight;

  setTimeout(() => {
    let reply = "";

    /* -------------------------------
       HANDLE COMMON CLIENT QUESTIONS
       (DO NOT ADVANCE STEP)
    -------------------------------- */

    if (text.includes("how long")) {
      reply =
        "Great question 😊 Results typically last around 3–4 months, though this can vary depending on the individual and the area treated.";
    } 
    else if (text.includes("hurt") || text.includes("pain")) {
      reply =
        "Most patients describe it as a small pinch or pressure. The treatment is quick, and discomfort is usually minimal.";
    } 
    else if (text.includes("safe") || text.includes("side effect") || text.includes("risk")) {
      reply =
        "That’s a very common concern. When performed by a qualified practitioner, treatments like Botox are considered safe. Side effects are usually mild and temporary, and these are fully discussed during consultation.";
    } 
    else if (text.includes("price") || text.includes("cost") || text.includes("how much")) {
      reply =
        "Pricing depends on the area treated and the amount needed. That’s why we recommend a consultation so we can give you an accurate quote based on your goals.";
    }

    /* -------------------------------
       HANDLE BOOKING CONFIRMATION
    -------------------------------- */

    else if (
      step >= 6 &&
      (text === "yes" || text.includes("yes") || text.includes("book"))
    ) {
      reply =
        "Perfect 😊 Your consultation is booked. A member of the clinic team will follow up shortly with the details.";
      step = 999;
    }

    /* -------------------------------
       MAIN CONVERSATION FLOW
    -------------------------------- */

    else if (step === 0) {
      reply =
        "Thanks for reaching out 😊 Are you considering a treatment like Botox, fillers, or something else?";
      step++;
    } 
    else if (step === 1) {
      reply =
        "Got it! Is this your first time getting this treatment, or have you had it before?";
      step++;
    } 
    else if (step === 2) {
      reply =
        "Which area are you mainly interested in improving (e.g., forehead, lips, crow’s feet, cheeks)?";
      step++;
    } 
    else if (step === 3) {
      chosenArea = rawText;
      reply =
        `Thanks — ${chosenArea} is very common. What result are you hoping to achieve (e.g., smoother lines, fuller lips, a more refreshed look)?`;
      step++;
    } 
    else if (step === 4) {
      reply =
        "That makes sense 😊 Patients usually ask about results, how long they last, comfort during treatment, and safety. Feel free to ask anything that’s important to you.";
      step++;
    } 
    else if (step === 5) {
      reply =
        "Based on what you’ve shared, the best next step would be a consultation. This allows the practitioner to assess your goals and answer questions about results, risks, costs, and aftercare.";
      step++;
    } 
    else {
      reply =
        "Would you like me to help you book a consultation or check availability?";
    }

    messages.innerHTML += `<div class="msg assistant">${reply}</div>`;
    messages.scrollTop = messages.scrollHeight;
  }, 700);
}