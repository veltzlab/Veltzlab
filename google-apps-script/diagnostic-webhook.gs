const SPREADSHEET_ID = "1u85-EvKcyPf6VW6hEfBq9wFBoIb1uMAWh0_pCztyQe8";
const SHEET_NAME = "Diagn?sticos";

function doGet() {
  return jsonResponse({ ok: true, service: "veltz-diagnostic-webhook" });
}

function doPost(event) {
  try {
    const payload = JSON.parse(event.postData && event.postData.contents ? event.postData.contents : "{}");
    const lead = payload.lead || {};
    const result = payload.result || {};
    const pillars = result.pillars || {};
    const impact = result.impact || {};

    const row = [
      Utilities.getUuid(),
      payload.submittedAt || new Date().toISOString(),
      safeText(lead.nome),
      safeText(lead.empresa),
      safeText(lead.email),
      safeText(lead.whatsapp),
      safeText(lead.segmento),
      safeText(lead.porte),
      list(lead.canais),
      list(lead.ferramentas),
      list(lead.prioridades),
      value(result.overall),
      safeText(result.level),
      value(pillars.marketing),
      value(pillars.comercial),
      value(pillars.atendimento),
      value(pillars.ferramentas),
      value(pillars.dados),
      value(pillars.processos),
      list(result.modules),
      list(result.priorities),
      list(result.strengths),
      value(impact.horas),
      value(impact.conversao),
      value(impact.retrabalho),
      JSON.stringify(payload.answers || {}),
    ];

    SpreadsheetApp.openById(SPREADSHEET_ID).getSheetByName(SHEET_NAME).appendRow(row);
    return jsonResponse({ ok: true });
  } catch (error) {
    console.error(error);
    return jsonResponse({ ok: false, error: String(error) });
  }
}

function list(value) {
  return safeText(Array.isArray(value) ? value.join(", ") : "");
}

function value(input) {
  return input === undefined || input === null ? "" : input;
}

function safeText(input) {
  const text = String(value(input));
  return /^[=+\-@]/.test(text) ? "'" + text : text;
}

function jsonResponse(data) {
  return ContentService.createTextOutput(JSON.stringify(data)).setMimeType(ContentService.MimeType.JSON);
}
