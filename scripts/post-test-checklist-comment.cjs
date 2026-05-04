const fs = require("fs");

const siteUrl = "https://golfnow.atlassian.net";
const cloudId = process.env.JIRA_CLOUD_ID || "24a77690-829a-4704-94eb-fafef6370d21";
const email = process.env.JIRA_EMAIL || "dewan.kabir@versantmedia.com";
const token = process.env.JIRA_MCP_TOKEN;

function normalize(value) {
  return String(value || "").trim().toLowerCase().replace(/\s+/g, " ");
}

function writeOutput(name, value) {
  if (!process.env.GITHUB_OUTPUT) {
    return;
  }

  fs.appendFileSync(process.env.GITHUB_OUTPUT, `${name}=${String(value).replace(/\r?\n/g, " ")}\n`);
}

function writeSummary(markdown) {
  if (process.env.GITHUB_STEP_SUMMARY) {
    fs.appendFileSync(process.env.GITHUB_STEP_SUMMARY, `${markdown.trim()}\n`);
  }
  console.log(markdown);
}

function getTrustedActors() {
  return (process.env.TRUSTED_GITHUB_ACTORS || "DewanKabir009")
    .split(",")
    .map(normalize)
    .filter(Boolean);
}

function getRequest() {
  return {
    issueKey: process.env.INPUT_ISSUE_KEY || process.env.ISSUE_KEY || "",
    payloadText: process.env.CHECKLIST_PAYLOAD || process.env.INPUT_CHECKLIST_PAYLOAD || "",
  };
}

function validateRequest(request) {
  const actor = process.env.GITHUB_ACTOR || "";
  const trustedActors = getTrustedActors();

  if (!trustedActors.includes(normalize(actor))) {
    throw new Error(`GitHub actor ${actor || "unknown"} is not allowed to post Jira comments from this workflow.`);
  }

  if (!/^[A-Z][A-Z0-9]+-\d+$/.test(request.issueKey)) {
    throw new Error(`Invalid Jira issue key: ${request.issueKey || "blank"}.`);
  }

  if (!token) {
    throw new Error("JIRA_MCP_TOKEN is not set.");
  }

  let payload;
  try {
    payload = JSON.parse(request.payloadText || "{}");
  } catch (error) {
    throw new Error(`Checklist payload is not valid JSON: ${error.message}`);
  }

  if (payload.issueKey !== request.issueKey) {
    throw new Error(`Checklist payload issue ${payload.issueKey || "blank"} does not match workflow issue ${request.issueKey}.`);
  }

  if (!Array.isArray(payload.items) || !payload.items.length) {
    throw new Error("Checklist payload must include at least one item.");
  }

  if (payload.items.length > 100) {
    throw new Error("Checklist payload has too many items.");
  }

  return payload;
}

async function jiraFetch(apiPath, options = {}) {
  const auth = Buffer.from(`${email}:${token}`).toString("base64");
  const response = await fetch(`https://api.atlassian.com/ex/jira/${cloudId}/rest/api/3${apiPath}`, {
    ...options,
    headers: {
      Authorization: `Basic ${auth}`,
      Accept: "application/json",
      "Content-Type": "application/json",
      ...(options.headers || {}),
    },
  });
  const text = await response.text();

  if (!response.ok) {
    throw new Error(`Jira API failed: HTTP ${response.status} ${response.statusText}\n${text}`);
  }

  return text ? JSON.parse(text) : null;
}

function textNode(value) {
  return {
    type: "text",
    text: String(value || ""),
  };
}

function paragraph(value) {
  const text = String(value || "");
  return {
    type: "paragraph",
    content: text ? [textNode(text)] : [],
  };
}

function tableCell(value, header = false) {
  return {
    type: header ? "tableHeader" : "tableCell",
    attrs: {},
    content: [paragraph(value)],
  };
}

function tableRow(values, header = false) {
  return {
    type: "tableRow",
    content: values.map((value) => tableCell(value, header)),
  };
}

function truncate(value, limit) {
  const text = String(value || "").replace(/\s+/g, " ").trim();
  return text.length > limit ? `${text.slice(0, limit - 1)}...` : text;
}

function buildCommentBody(payload) {
  const items = payload.items.map((item, index) => ({
    number: String(index + 1),
    status: item.done ? "Complete" : "Open",
    title: truncate(item.title || "Untitled test case", 500),
    notes: truncate(item.notes || "", 1000),
  }));
  const complete = items.filter((item) => item.status === "Complete").length;
  const sourceFiles = (payload.sourceFiles || []).join(", ") || "Markdown attachment";
  const dashboardUrl = payload.dashboardUrl || "";
  const summary = [
    `Test checklist submitted for ${payload.issueKey}.`,
    `Progress: ${complete} of ${items.length} complete.`,
    `Source file: ${sourceFiles}.`,
    dashboardUrl ? `Dashboard: ${dashboardUrl}` : "",
  ].filter(Boolean);

  return {
    type: "doc",
    version: 1,
    content: [
      ...summary.map(paragraph),
      {
        type: "table",
        attrs: {
          isNumberColumnEnabled: false,
          layout: "default",
        },
        content: [
          tableRow(["#", "Status", "Test case", "Notes"], true),
          ...items.map((item) => tableRow([item.number, item.status, item.title, item.notes])),
        ],
      },
    ],
  };
}

async function postComment(issueKey, body) {
  return jiraFetch(`/issue/${encodeURIComponent(issueKey)}/comment`, {
    method: "POST",
    body: JSON.stringify({ body }),
  });
}

async function main() {
  const request = getRequest();
  const payload = validateRequest(request);
  const comment = await postComment(request.issueKey, buildCommentBody(payload));

  writeOutput("issue_key", request.issueKey);
  writeOutput("comment_id", comment?.id || "");
  writeSummary([
    `Posted test checklist comment for ${request.issueKey}.`,
    "",
    `- Comment: ${comment?.id || "unknown"}`,
    `- Jira: ${siteUrl}/browse/${request.issueKey}`,
    `- Items: ${payload.items.length}`,
    `- Complete: ${payload.items.filter((item) => item.done).length}`,
  ].join("\n"));
}

main().catch((error) => {
  console.error(error && error.stack ? error.stack : error);
  process.exit(1);
});
