/* Blue Horizon AI Studio v0.2
   Front-end prototype: local browser storage only; no account, server, paid AI API, or checkout. */
(() => {
  "use strict";
  const STORAGE_KEY = "horizon-ai-studio-v02";
  const $ = (id) => document.getElementById(id);
  const FONT_STACKS = {
    "DM Sans": '"DM Sans", sans-serif', Inter: 'Inter, sans-serif', Manrope: 'Manrope, sans-serif', Roboto: 'Roboto, sans-serif',
    "Open Sans": '"Open Sans", sans-serif', Lato: 'Lato, sans-serif', Montserrat: 'Montserrat, sans-serif', Poppins: 'Poppins, sans-serif',
    Nunito: 'Nunito, sans-serif', Raleway: 'Raleway, sans-serif', "Source Sans 3": '"Source Sans 3", sans-serif', "Space Grotesk": '"Space Grotesk", sans-serif',
    "Playfair Display": '"Playfair Display", Georgia, serif', "DM Serif Display": '"DM Serif Display", Georgia, serif', Merriweather: 'Merriweather, Georgia, serif',
    Lora: 'Lora, Georgia, serif', Oswald: 'Oswald, sans-serif', "Bebas Neue": '"Bebas Neue", Impact, sans-serif', Cinzel: 'Cinzel, Georgia, serif',
    "Dancing Script": '"Dancing Script", cursive', Pacifico: 'Pacifico, cursive', Georgia: 'Georgia, serif', Arial: 'Arial, sans-serif', "Courier New": '"Courier New", monospace'
  };
  const TEXTURES = {
    "assets/textures/galaxy.svg": "Galaxy Nebula",
    "assets/textures/gold-foil.svg": "Gold Foil",
    "assets/textures/ocean.svg": "Ocean Waves",
    "assets/textures/marble.svg": "White Marble",
    "assets/textures/floral.svg": "Floral Garden",
    "assets/textures/circuit.svg": "Digital Circuit",
    "assets/textures/sunset.svg": "Sunset Horizon",
    "assets/textures/stone.svg": "Dark Stone"
  };
  const HEADER_DESIGNS = {
    executive: { label: "EXECUTIVE BLUE", title: "Business Report", subtitle: "A clear plan for the next step" },
    horizon: { label: "BLUE HORIZON · CREATIVE BRIEF", title: "Creative Brief", subtitle: "Purpose, direction, and next steps" },
    editorial: { label: "THE DAILY BRIEF · EDITORIAL", title: "The Daily Brief", subtitle: "Ideas worth communicating clearly" },
    gold: { label: "STRATEGY NOTES", title: "Strategy Notes", subtitle: "Priorities · Decisions · Action" },
    minimal: { label: "PROJECT OVERVIEW", title: "Project Overview", subtitle: "A concise summary for the team" },
    banner: { label: "EVENT PLAN", title: "Event Plan", subtitle: "Schedule, details, and responsibilities" },
    memo: { label: "INTERNAL MEMO", title: "Internal Memo", subtitle: "Date · Team · Topic — update as needed" },
    creative: { label: "CREATIVE DIRECTION", title: "Make It Matter", subtitle: "A concept that moves the idea forward" },
    formal: { label: "FORMAL REPORT", title: "Annual Summary", subtitle: "Prepared for review and discussion" },
    modern: { label: "PROJECT UPDATE", title: "Project Update", subtitle: "Current status and immediate actions" }
  };

  let state;
  let currentDocId = null;
  let currentView = "writer";
  let currentFilter = "all";
  let saveTimer = null;
  let textureImage = null;
  let uploadedTextureUrl = null;
  let currentTextureKey = "assets/textures/galaxy.svg";
  let lastArtDataUrl = null;

  const uid = (prefix = "id") => `${prefix}-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`;
  const nowISO = () => new Date().toISOString();
  const dateLabel = (iso) => {
    const date = new Date(iso || Date.now());
    if (Number.isNaN(date.getTime())) return "Just now";
    return date.toLocaleString([], { month: "short", day: "numeric", year: "numeric", hour: "numeric", minute: "2-digit" });
  };
  const wordsFromHTML = (html) => {
    const tmp = document.createElement("div");
    tmp.innerHTML = html || "";
    return (tmp.textContent || "").trim().split(/\s+/).filter(Boolean).length;
  };
  const textFromHTML = (html) => {
    const tmp = document.createElement("div");
    tmp.innerHTML = html || "";
    return (tmp.textContent || "").replace(/\u00a0/g, " ").trim();
  };
  const escapeHTML = (str) => String(str ?? "").replace(/[&<>"']/g, (char) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[char]));
  const slug = (str) => String(str || "horizon-document").trim().replace(/[^a-z0-9-_]+/gi, "-").replace(/^-+|-+$/g, "").slice(0, 70) || "horizon-document";

  function defaultState() {
    const folderId = "folder-my-documents";
    const docId = "doc-welcome";
    return {
      folders: [{ id: folderId, name: "My Documents", createdAt: nowISO(), fixed: true }],
      docs: [{
        id: docId, title: "Welcome to Blue Horizon AI Studio", folderId,
        html: '<h1>Welcome to Blue Horizon AI Studio</h1><p>This is your local creative workspace. Write a document, add a header design, or open Image Text Studio to turn letters and numbers into image-filled artwork.</p><h2>What you can do</h2><ul><li>Create and organize documents in folders.</li><li>Choose from more than 20 font families.</li><li>Insert one of 10 editable header designs.</li><li>Export formatted HTML, plain text, or a JSON backup.</li><li>Create transparent PNG lettering filled with built-in or uploaded image textures.</li></ul><blockquote>Important: this prototype saves your documents in this browser only. Export a backup of anything important.</blockquote><p>Try selecting this text and changing the font or color using the toolbar above.</p>',
        createdAt: nowISO(), updatedAt: nowISO()
      }], createdAt: nowISO()
    };
  }

  function loadState() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return defaultState();
      const parsed = JSON.parse(raw);
      if (!parsed || !Array.isArray(parsed.folders) || !Array.isArray(parsed.docs)) return defaultState();
      if (!parsed.folders.length) parsed.folders.push({ id: "folder-my-documents", name: "My Documents", createdAt: nowISO(), fixed: true });
      parsed.docs = parsed.docs.map((doc) => ({
        id: doc.id || uid("doc"), title: doc.title || "Untitled document", folderId: parsed.folders.some((f) => f.id === doc.folderId) ? doc.folderId : parsed.folders[0].id,
        html: typeof doc.html === "string" ? doc.html : "", createdAt: doc.createdAt || nowISO(), updatedAt: doc.updatedAt || nowISO()
      }));
      return parsed;
    } catch (error) {
      console.warn("Could not load Blue Horizon AI Studio local workspace.", error);
      return defaultState();
    }
  }

  function persistState(showFeedback = false) {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
      if (showFeedback) toast("Workspace saved in this browser.");
      $("save-state").textContent = "Saved locally ✓";
      return true;
    } catch (error) {
      console.error(error);
      $("save-state").textContent = "Storage full — export backup";
      toast("The browser could not save more data. Export a backup and remove large embedded images or unused documents.");
      return false;
    }
  }

  function toast(message) {
    const node = $("studio-toast");
    node.textContent = message;
    node.classList.add("show");
    clearTimeout(toast.timer);
    toast.timer = setTimeout(() => node.classList.remove("show"), 4000);
  }

  function activeDocument() { return state.docs.find((doc) => doc.id === currentDocId) || null; }
  function currentFolderName(folderId) { return state.folders.find((folder) => folder.id === folderId)?.name || "Unfiled"; }

  function sanitizeHTML(html) {
    const parsed = new DOMParser().parseFromString(`<body>${html || ""}</body>`, "text/html");
    parsed.querySelectorAll("script,iframe,object,embed,form,link,meta,style,base").forEach((node) => node.remove());
    parsed.body.querySelectorAll("*").forEach((node) => {
      [...node.attributes].forEach((attr) => {
        const name = attr.name.toLowerCase();
        const value = attr.value.trim().toLowerCase();
        if (name.startsWith("on") || name === "srcdoc" || ((name === "href" || name === "src" || name === "xlink:href") && value.startsWith("javascript:"))) node.removeAttribute(attr.name);
      });
    });
    return parsed.body.innerHTML;
  }

  function updateWordCount() {
    const text = textFromHTML($("doc-editor").innerHTML);
    $("word-count").textContent = `${text ? text.split(/\s+/).filter(Boolean).length : 0} words · ${text.length} characters`;
  }

  function renderFolders() {
    const list = $("folder-list");
    list.innerHTML = "";
    const allButton = document.createElement("button");
    allButton.type = "button";
    allButton.className = `folder-button ${currentFilter === "all" ? "is-active" : ""}`;
    allButton.innerHTML = `<span class="folder-emoji">▦</span><span>All documents</span><span class="folder-count">${state.docs.length}</span>`;
    allButton.addEventListener("click", () => { currentFilter = "all"; renderFolders(); renderDocList(); });
    list.appendChild(allButton);
    state.folders.forEach((folder) => {
      const count = state.docs.filter((doc) => doc.folderId === folder.id).length;
      const button = document.createElement("button");
      button.type = "button";
      button.className = `folder-button ${currentFilter === folder.id ? "is-active" : ""}`;
      button.innerHTML = `<span class="folder-emoji">▰</span><span>${escapeHTML(folder.name)}</span><span class="folder-count">${count}</span>`;
      button.addEventListener("click", () => { currentFilter = folder.id; renderFolders(); renderDocList(); });
      list.appendChild(button);
    });
    const select = $("document-folder");
    const previous = select.value;
    select.innerHTML = state.folders.map((folder) => `<option value="${escapeHTML(folder.id)}">${escapeHTML(folder.name)}</option>`).join("");
    const doc = activeDocument();
    select.value = (doc && state.folders.some((f) => f.id === doc.folderId)) ? doc.folderId : (state.folders.some((f) => f.id === previous) ? previous : state.folders[0]?.id || "");
  }

  function renderDocList() {
    // Library UI is the fuller file manager, while this mini list keeps the sidebar practical.
    const container = $("folder-list");
    const previous = container.querySelector(".mini-doc-list");
    if (previous) previous.remove();
    const list = document.createElement("div");
    list.className = "mini-doc-list";
    const heading = document.createElement("div");
    heading.className = "mini-doc-title";
    heading.textContent = currentFilter === "all" ? "RECENT DOCUMENTS" : "FILES IN FOLDER";
    list.appendChild(heading);
    const docs = state.docs.filter((doc) => currentFilter === "all" || doc.folderId === currentFilter).sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt));
    docs.forEach((doc) => {
      const button = document.createElement("button");
      button.type = "button";
      button.className = `folder-button mini-doc-button ${doc.id === currentDocId ? "is-active" : ""}`;
      button.innerHTML = `<span class="folder-emoji">▤</span><span title="${escapeHTML(doc.title)}">${escapeHTML(doc.title)}</span>`;
      button.addEventListener("click", () => openDocument(doc.id));
      list.appendChild(button);
    });
    container.appendChild(list);
  }

  function syncDocumentToState() {
    const doc = activeDocument();
    if (!doc) return;
    const folderId = $("document-folder").value;
    doc.title = $("document-title").value.trim() || "Untitled document";
    doc.folderId = state.folders.some((folder) => folder.id === folderId) ? folderId : state.folders[0]?.id;
    doc.html = sanitizeHTML($("doc-editor").innerHTML);
    doc.updatedAt = nowISO();
  }

  function markDirty() {
    $("save-state").textContent = "Unsaved edits…";
    updateWordCount();
    clearTimeout(saveTimer);
    saveTimer = setTimeout(() => saveCurrentDocument(false), 650);
  }

  function saveCurrentDocument(showFeedback = true) {
    if (!activeDocument()) return;
    syncDocumentToState();
    if (!persistState(showFeedback)) return;
    $("document-title").value = activeDocument().title;
    $("doc-updated").textContent = `Edited ${dateLabel(activeDocument().updatedAt)}`;
    renderFolders();
    renderDocList();
    renderLibrary();
  }

  function openDocument(id) {
    if (activeDocument() && currentDocId !== id) {
      syncDocumentToState();
      persistState(false);
    }
    const doc = state.docs.find((item) => item.id === id);
    if (!doc) return;
    currentDocId = id;
    $("document-title").value = doc.title;
    $("doc-editor").innerHTML = sanitizeHTML(doc.html);
    $("document-folder").value = doc.folderId;
    $("doc-updated").textContent = `Edited ${dateLabel(doc.updatedAt)}`;
    $("print-title").textContent = doc.title;
    updateWordCount();
    renderFolders();
    renderDocList();
    if (currentView === "library") renderLibrary();
    $("save-state").textContent = "Saved locally ✓";
  }

  function createDocument(title) {
    if (activeDocument()) {
      syncDocumentToState();
      persistState(false);
    }
    const cleanTitle = String(title || "Untitled document").trim().slice(0, 140) || "Untitled document";
    const preferredFolder = state.folders.some((f) => f.id === $("document-folder").value) ? $("document-folder").value : state.folders[0]?.id;
    const doc = { id: uid("doc"), title: cleanTitle, folderId: preferredFolder, html: "<p><br></p>", createdAt: nowISO(), updatedAt: nowISO() };
    state.docs.unshift(doc);
    currentDocId = doc.id;
    persistState(false);
    openDocument(doc.id);
    setView("writer", false);
    $("doc-editor").focus();
    toast("New document created. Start writing, then save or export it.");
  }

  function promptNewDocument() {
    const title = window.prompt("Name your new document:", "Untitled document");
    if (title === null) return;
    createDocument(title);
  }

  function addFolder() {
    const raw = window.prompt("Name your new folder:", "New folder");
    if (raw === null) return;
    const name = raw.trim().slice(0, 65);
    if (!name) { toast("Enter a folder name first."); return; }
    if (state.folders.some((folder) => folder.name.toLowerCase() === name.toLowerCase())) { toast("A folder with that name already exists."); return; }
    const folder = { id: uid("folder"), name, createdAt: nowISO() };
    state.folders.push(folder);
    currentFilter = folder.id;
    persistState(false);
    renderFolders();
    renderDocList();
    renderLibrary();
    toast(`Folder “${name}” created. Use the Folder selector on a document to file it there.`);
  }

  function setView(view, updateHash = true) {
    const allowed = ["writer", "letter-art", "library", "contact"];
    if (!allowed.includes(view)) view = "writer";
    currentView = view;
    document.querySelectorAll("[data-page]").forEach((panel) => {
      const active = panel.dataset.page === view;
      panel.hidden = !active;
      panel.classList.toggle("is-visible", active);
    });
    document.querySelectorAll(".side-tab").forEach((button) => {
      const active = button.dataset.view === view;
      button.classList.toggle("is-active", active);
      button.setAttribute("aria-pressed", String(active));
    });
    if (view === "library") renderLibrary();
    if (view === "letter-art") drawArt();
    if (updateHash && history.replaceState) history.replaceState(null, "", `#${view}`);
  }

  function createHeaderMarkup(key) {
    const design = HEADER_DESIGNS[key] || HEADER_DESIGNS.executive;
    return `<div class="doc-header doc-header--${key}" contenteditable="true"><small>${escapeHTML(design.label)}</small><h1>${escapeHTML(design.title)}</h1><p>${escapeHTML(design.subtitle)}</p></div><p><br></p>`;
  }

  function insertHeader(key) {
    const editor = $("doc-editor");
    editor.insertAdjacentHTML("afterbegin", createHeaderMarkup(key));
    markDirty();
    toast(`${HEADER_DESIGNS[key]?.label || "Header"} added. Click the heading and replace the sample text.`);
    editor.scrollTop = 0;
    editor.focus();
  }

  function performFormat(command, value = null) {
    $("doc-editor").focus();
    try {
      document.execCommand(command, false, value);
      markDirty();
    } catch (error) {
      toast("That formatting command is not supported by this browser. You can still type and export the document.");
    }
  }

  function setBlockStyle(tag) {
    performFormat("formatBlock", tag);
  }

  function setFont(font) {
    if (!font) return;
    performFormat("fontName", font);
    // Set the active editor default too, so subsequent typing remains consistent in common browsers.
    $("doc-editor").style.fontFamily = FONT_STACKS[font] || font;
  }

  function updateDocFolder() {
    const doc = activeDocument();
    if (!doc) return;
    doc.folderId = $("document-folder").value;
    markDirty();
  }

  function deleteCurrentDocument() {
    const doc = activeDocument();
    if (!doc) return;
    if (!window.confirm(`Delete “${doc.title}”? This removes the saved copy from this browser.`)) return;
    state.docs = state.docs.filter((item) => item.id !== doc.id);
    currentDocId = state.docs[0]?.id || null;
    if (!currentDocId) {
      const doc2 = { id: uid("doc"), title: "Untitled document", folderId: state.folders[0].id, html: "<p><br></p>", createdAt: nowISO(), updatedAt: nowISO() };
      state.docs.push(doc2); currentDocId = doc2.id;
    }
    persistState(false);
    openDocument(currentDocId);
    renderLibrary();
    toast("Document deleted from the local workspace.");
  }

  function downloadBlob(filename, blob) {
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = filename;
    document.body.appendChild(anchor);
    anchor.click();
    anchor.remove();
    setTimeout(() => URL.revokeObjectURL(url), 1200);
  }
  function downloadText(filename, content, type = "text/plain;charset=utf-8") { downloadBlob(filename, new Blob([content], { type })); }
  function documentFileName(doc, extension) { return `${slug(doc?.title || "horizon-document")}.${extension}`; }

  function exportHTML() {
    saveCurrentDocument(false);
    const doc = activeDocument(); if (!doc) return;
    const html = `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>${escapeHTML(doc.title)}</title><link rel="preconnect" href="https://fonts.googleapis.com"><link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;700&family=Playfair+Display:wght@400;700&family=Merriweather:wght@400;700&display=swap" rel="stylesheet"><style>body{max-width:850px;margin:48px auto;padding:0 24px;font:16px/1.75 'DM Sans',Arial,sans-serif;color:#23344d}h1,h2,h3{line-height:1.2}img{max-width:100%;height:auto}.doc-header{padding:25px;margin:0 0 25px}.doc-header small{display:block;font-size:10px;letter-spacing:.16em;font-weight:bold}.doc-header h1{margin:8px 0}.doc-header--executive{color:#fff;background:linear-gradient(110deg,#0e315d,#2171bd);border-bottom:4px solid #72deff}.doc-header--horizon,.doc-header--creative,.doc-header--banner{color:#fff;background:linear-gradient(110deg,#07152d,#247ce3)}.doc-header--gold{color:#f4d28a;background:#10223d;border:1px solid #d3ac5f}.doc-header--editorial{background:#fbf7ee;border-bottom:1px solid #c49a57;font-family:'Playfair Display',serif}.doc-header--editorial h1,.doc-header--minimal h1,.doc-header--formal h1,.doc-header--memo h1,.doc-header--modern h1{color:#152d4b}.doc-header--minimal,.doc-header--formal{background:white;border-bottom:3px solid #1979ec}.doc-header--memo{background:#f5f7fa;border-left:5px solid #1e7ce9}.doc-header--modern{background:#edf4ff;border:1px solid #c9dcf8}.doc-header--formal{border-top:5px solid #193c64;font-family:'Merriweather',serif}</style></head><body><h1>${escapeHTML(doc.title)}</h1>${sanitizeHTML(doc.html)}</body></html>`;
    downloadText(documentFileName(doc, "html"), html, "text/html;charset=utf-8");
    toast("Formatted HTML file downloaded.");
  }
  function exportText() {
    saveCurrentDocument(false);
    const doc = activeDocument(); if (!doc) return;
    downloadText(documentFileName(doc, "txt"), `${doc.title}\n${"=".repeat(Math.min(doc.title.length, 60))}\n\n${textFromHTML(doc.html)}\n`);
    toast("Plain text file downloaded.");
  }
  function exportDocumentJSON(doc = activeDocument()) {
    if (!doc) return;
    const payload = { type: "horizon-ai-document", version: 1, title: doc.title, folderName: currentFolderName(doc.folderId), contentHtml: doc.html, text: textFromHTML(doc.html), createdAt: doc.createdAt, updatedAt: doc.updatedAt, exportedAt: nowISO() };
    downloadText(documentFileName(doc, "json"), JSON.stringify(payload, null, 2), "application/json;charset=utf-8");
    toast("Portable JSON document backup downloaded.");
  }
  function exportAllJSON() {
    if (activeDocument()) syncDocumentToState();
    if (!persistState(false)) return;
    downloadText("horizon-ai-workspace-backup.json", JSON.stringify({ type: "horizon-ai-workspace", version: 1, exportedAt: nowISO(), folders: state.folders, docs: state.docs }, null, 2), "application/json;charset=utf-8");
    toast("Full workspace backup downloaded.");
  }

  function markdownToHTML(markdown) {
    return String(markdown || "").split(/\r?\n/).map((line) => {
      const trimmed = line.trim();
      if (!trimmed) return "";
      if (trimmed.startsWith("### ")) return `<h3>${escapeHTML(trimmed.slice(4))}</h3>`;
      if (trimmed.startsWith("## ")) return `<h2>${escapeHTML(trimmed.slice(3))}</h2>`;
      if (trimmed.startsWith("# ")) return `<h1>${escapeHTML(trimmed.slice(2))}</h1>`;
      if (/^[-*]\s+/.test(trimmed)) return `<p>• ${escapeHTML(trimmed.replace(/^[-*]\s+/, ""))}</p>`;
      return `<p>${escapeHTML(trimmed)}</p>`;
    }).join("\n");
  }
  function importDocument(file) {
    if (!file) return;
    if (activeDocument()) saveCurrentDocument(false);
    if (file.size > 4 * 1024 * 1024) { toast("For this browser-only prototype, import files smaller than 4 MB."); return; }
    const reader = new FileReader();
    reader.onerror = () => toast("The browser could not read that file. Try a TXT, MD, HTML, or Horizon JSON file.");
    reader.onload = () => {
      let title = file.name.replace(/\.(txt|md|html?|json)$/i, "") || "Imported document";
      let html = "";
      const raw = String(reader.result || "");
      const extension = (file.name.split(".").pop() || "").toLowerCase();
      try {
        if (extension === "json") {
          const data = JSON.parse(raw);
          if (data.type === "horizon-ai-workspace" && Array.isArray(data.docs) && Array.isArray(data.folders)) {
            if (!window.confirm("Import this workspace backup? The documents will be added to your current local workspace.")) return;
            const folderMap = new Map();
            data.folders.forEach((folder) => {
              let target = state.folders.find((existing) => existing.name.toLowerCase() === String(folder.name).toLowerCase());
              if (!target) { target = { id: uid("folder"), name: String(folder.name || "Imported Folder").slice(0,65), createdAt: nowISO() }; state.folders.push(target); }
              folderMap.set(folder.id, target.id);
            });
            data.docs.forEach((doc) => state.docs.unshift({ id: uid("doc"), title: String(doc.title || "Imported document").slice(0,140), folderId: folderMap.get(doc.folderId) || state.folders[0].id, html: sanitizeHTML(doc.html || doc.contentHtml || ""), createdAt: nowISO(), updatedAt: nowISO() }));
            persistState(false); renderFolders(); renderDocList(); renderLibrary();
            openDocument(state.docs[0].id); setView("library"); toast("Workspace backup imported."); return;
          }
          if (data.type === "horizon-ai-document") { title = String(data.title || title); html = sanitizeHTML(data.contentHtml || ""); }
          else { throw new Error("This JSON is not a Blue Horizon AI Studio document backup."); }
        } else if (extension === "html" || extension === "htm") {
          const parsed = new DOMParser().parseFromString(raw, "text/html");
          title = parsed.querySelector("title")?.textContent?.trim() || title;
          html = sanitizeHTML(parsed.body?.innerHTML || raw);
        } else if (extension === "md") html = markdownToHTML(raw);
        else html = raw.split(/\r?\n/).map((line) => line ? `<p>${escapeHTML(line)}</p>` : "<p><br></p>").join("");
      } catch (error) {
        toast(error.message || "Could not read this JSON file.");
        return;
      }
      const folderId = state.folders.some((f) => f.id === $("document-folder").value) ? $("document-folder").value : state.folders[0].id;
      const imported = { id: uid("doc"), title, folderId, html, createdAt: nowISO(), updatedAt: nowISO() };
      state.docs.unshift(imported); currentDocId = imported.id; persistState(false); openDocument(imported.id); setView("writer");
      toast(`Imported “${title}” into your local workspace.`);
    };
    reader.readAsText(file);
  }

  function renderLibrary() {
    const body = $("library-table-body"); if (!body) return;
    body.innerHTML = "";
    $("library-doc-count").textContent = String(state.docs.length);
    $("library-folder-count").textContent = String(state.folders.length);
    $("empty-library").hidden = state.docs.length > 0;
    const sorted = [...state.docs].sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt));
    sorted.forEach((doc) => {
      const row = document.createElement("tr");
      const plainText = textFromHTML(doc.html);
      const fileSize = new Blob([doc.html || ""]).size;
      row.innerHTML = `<td><div class="table-file"><span class="table-file-icon">▤</span><span>${escapeHTML(doc.title)}</span></div></td><td>${escapeHTML(currentFolderName(doc.folderId))}</td><td>${escapeHTML(dateLabel(doc.updatedAt))}</td><td>${fileSize < 1024 ? `${fileSize} B` : `${(fileSize / 1024).toFixed(1)} KB`}</td><td><button class="table-action" type="button" data-open-doc="${escapeHTML(doc.id)}">Open</button> <button class="table-action" type="button" data-export-doc="${escapeHTML(doc.id)}">Backup</button></td>`;
      body.appendChild(row);
    });
    body.querySelectorAll("[data-open-doc]").forEach((button) => button.addEventListener("click", () => { openDocument(button.dataset.openDoc); setView("writer"); }));
    body.querySelectorAll("[data-export-doc]").forEach((button) => button.addEventListener("click", () => exportDocumentJSON(state.docs.find((doc) => doc.id === button.dataset.exportDoc))));
  }

  function setupHeaderButtons() {
    $("insert-header").addEventListener("click", () => insertHeader($("header-design").value));
    document.querySelectorAll("[data-header]").forEach((button) => button.addEventListener("click", () => {
      const key = button.dataset.header;
      $("header-design").value = key;
      insertHeader(key);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }));
  }

  function loadTexture(key) {
    if (uploadedTextureUrl && key !== "uploaded") { URL.revokeObjectURL(uploadedTextureUrl); uploadedTextureUrl = null; }
    currentTextureKey = key;
    const src = key === "uploaded" ? uploadedTextureUrl : key;
    if (!src) return;
    const img = new Image();
    img.onload = () => { textureImage = img; $("texture-mini-preview").src = src; $("texture-title").textContent = key === "uploaded" ? "Uploaded image" : (TEXTURES[key] || "Custom image texture"); drawArt(); };
    img.onerror = () => toast("That texture could not be loaded. Choose another image texture.");
    img.src = src;
    document.querySelectorAll(".swatch").forEach((button) => button.classList.toggle("is-selected", button.dataset.texture === key));
  }

  function wrapTextLines(ctx, text, maxWidth, fontSize) {
    const explicitLines = String(text || "").split("\n");
    const lines = [];
    explicitLines.forEach((rawLine) => {
      const line = rawLine.trim();
      if (!line) { lines.push(""); return; }
      // Keep words together when possible. A long single word is still shrunk to fit later.
      const words = line.split(/\s+/);
      let current = "";
      words.forEach((word) => {
        const trial = current ? `${current} ${word}` : word;
        if (current && ctx.measureText(trial).width > maxWidth) { lines.push(current); current = word; }
        else current = trial;
      });
      if (current) lines.push(current);
    });
    return lines.length ? lines : [""];
  }

  async function drawArt() {
    const canvas = $("art-canvas"); if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const W = canvas.width; const H = canvas.height;
    ctx.clearRect(0, 0, W, H);
    const text = $("art-text").value || "Blue Horizon AI Studio";
    const font = $("art-font").value || "Bebas Neue";
    let size = Number($("art-size").value || 150);
    $("art-size-value").value = String(size);
    $("art-size-value").textContent = String(size);
    $("art-char-count").textContent = `${text.length} character${text.length === 1 ? "" : "s"}`;
    const mode = $("art-mode").value;
    const maxWidth = W - 140;
    let lines = [text];
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    const stack = FONT_STACKS[font] || 'sans-serif';
    if (document.fonts?.ready) { try { await document.fonts.ready; } catch (_) {} }
    while (size > 26) {
      ctx.font = `900 ${size}px ${stack}`;
      lines = wrapTextLines(ctx, text, maxWidth, size);
      const tooWide = lines.some((line) => ctx.measureText(line).width > maxWidth);
      if (!tooWide && lines.length * size * 1.26 <= H - 120) break;
      size -= 2;
    }
    ctx.font = `900 ${size}px ${stack}`;
    lines = wrapTextLines(ctx, text, maxWidth, size);
    const lineHeight = size * 1.23;
    const totalHeight = lineHeight * lines.length;
    const top = (H - totalHeight) / 2 + lineHeight / 2;

    if (mode === "solid") {
      ctx.fillStyle = $("art-color").value || "#65d7ff";
      lines.forEach((line, index) => ctx.fillText(line, W / 2, top + index * lineHeight, maxWidth));
    } else {
      ctx.fillStyle = "#fff";
      lines.forEach((line, index) => ctx.fillText(line, W / 2, top + index * lineHeight, maxWidth));
      ctx.globalCompositeOperation = "source-in";
      if (textureImage && textureImage.complete && textureImage.naturalWidth) {
        // Cover the canvas with the texture; source-in keeps only the pixels inside the character shapes.
        const scale = Math.max(W / textureImage.naturalWidth, H / textureImage.naturalHeight);
        const drawW = textureImage.naturalWidth * scale;
        const drawH = textureImage.naturalHeight * scale;
        ctx.drawImage(textureImage, (W - drawW) / 2, (H - drawH) / 2, drawW, drawH);
      } else {
        const gradient = ctx.createLinearGradient(0, 0, W, H); gradient.addColorStop(0, "#3fe0ff"); gradient.addColorStop(.55, "#4a68ff"); gradient.addColorStop(1, "#f0be62");
        ctx.fillStyle = gradient; ctx.fillRect(0, 0, W, H);
      }
      ctx.globalCompositeOperation = "source-over";
      // Give the glyphs a restrained outline so busy textures remain legible on many backgrounds.
      ctx.lineJoin = "round"; ctx.strokeStyle = "rgba(5, 22, 46, 0.66)"; ctx.lineWidth = Math.max(4, size * .035);
      lines.forEach((line, index) => ctx.strokeText(line, W / 2, top + index * lineHeight, maxWidth));
    }
    try { lastArtDataUrl = canvas.toDataURL("image/png"); } catch (_) { lastArtDataUrl = null; }
  }

  function downloadArt() {
    const canvas = $("art-canvas");
    try {
      canvas.toBlob((blob) => {
        if (!blob) { toast("PNG export failed. Try opening the folder with a local development server such as VS Code Live Server."); return; }
        const filename = `${slug($("art-text").value || "horizon-image-text")}.png`;
        downloadBlob(filename, blob);
        toast("Transparent PNG downloaded. The exported file contains the rendered text image.");
      }, "image/png");
    } catch (error) {
      toast("PNG export was blocked by the browser's local-file security. Open the folder in VS Code and use Live Server, then try again.");
    }
  }

  function insertArtIntoDocument() {
    const canvas = $("art-canvas");
    let dataUrl;
    try { dataUrl = canvas.toDataURL("image/png"); }
    catch (_) { toast("To insert art, open Blue Horizon AI Studio with a local development server such as VS Code Live Server, then try again."); return; }
    setView("writer");
    const editor = $("doc-editor");
    editor.focus();
    editor.insertAdjacentHTML("beforeend", `<p><img src="${dataUrl}" alt="Image text art: ${escapeHTML($("art-text").value)}" style="max-width:100%;height:auto"></p><p><br></p>`);
    markDirty();
    toast("Image text inserted into the current document. Save it to store the art with the document.");
  }

  function resetArt() {
    $("art-text").value = "Blue Horizon AI Studio";
    $("art-font").value = "Bebas Neue";
    $("art-mode").value = "texture";
    $("art-color").value = "#65d7ff";
    $("art-size").value = "150";
    $("art-texture").value = "assets/textures/galaxy.svg";
    loadTexture("assets/textures/galaxy.svg");
    drawArt();
  }

  function setupContactForm() {
    $("studio-contact-form").addEventListener("submit", async (event) => {
      event.preventDefault();
      const form = event.currentTarget;
      if (!form.reportValidity()) return;
      const name = $("studio-contact-name").value.trim();
      const email = $("studio-contact-email").value.trim();
      const type = $("studio-contact-type").value;
      const message = $("studio-contact-message").value.trim();
      await window.submitBlueHorizonContact({
        name,
        email,
        subject: `Blue Horizon AI Studio — ${type}`,
        message: `Message type: ${type}\n\n${message}`,
        status: $("studio-contact-status")
      });
    });
  }

  function setupEvents() {
    document.querySelectorAll(".side-tab").forEach((button) => button.addEventListener("click", () => setView(button.dataset.view)));
    $("top-new-doc").addEventListener("click", promptNewDocument);
    $("library-new-doc").addEventListener("click", promptNewDocument);
    $("add-folder").addEventListener("click", addFolder);
    $("add-folder-library").addEventListener("click", addFolder);
    $("save-doc").addEventListener("click", () => saveCurrentDocument(true));
    $("delete-doc").addEventListener("click", deleteCurrentDocument);
    $("document-title").addEventListener("input", markDirty);
    $("document-folder").addEventListener("change", updateDocFolder);
    $("doc-editor").addEventListener("input", markDirty);
    $("doc-editor").addEventListener("paste", () => setTimeout(markDirty, 20));
    document.querySelectorAll("[data-command]").forEach((button) => button.addEventListener("click", () => performFormat(button.dataset.command)));
    $("block-style").addEventListener("change", () => setBlockStyle($("block-style").value));
    $("font-family").addEventListener("change", () => setFont($("font-family").value));
    $("font-size").addEventListener("change", () => performFormat("fontSize", $("font-size").value));
    $("text-color").addEventListener("input", () => performFormat("foreColor", $("text-color").value));
    setupHeaderButtons();
    $("tool-export-html").addEventListener("click", exportHTML);
    $("tool-export-txt").addEventListener("click", exportText);
    $("tool-export-json").addEventListener("click", () => exportDocumentJSON());
    $("tool-print").addEventListener("click", () => window.print());
    $("tool-insert-art").addEventListener("click", () => setView("letter-art"));
    $("import-file").addEventListener("change", (event) => { importDocument(event.target.files?.[0]); event.target.value = ""; });
    $("library-import").addEventListener("change", (event) => { importDocument(event.target.files?.[0]); event.target.value = ""; });
    $("export-all-json").addEventListener("click", exportAllJSON);
    $("art-text").addEventListener("input", drawArt);
    $("art-font").addEventListener("change", drawArt);
    $("art-mode").addEventListener("change", () => { $("art-color").disabled = $("art-mode").value !== "solid"; drawArt(); });
    $("art-color").addEventListener("input", drawArt);
    $("art-size").addEventListener("input", drawArt);
    $("art-texture").addEventListener("change", () => {
      if ($("art-texture").value === "uploaded") {
        if (!uploadedTextureUrl) { toast("Use the upload box below to choose your image first."); $("art-texture").value = currentTextureKey === "uploaded" ? "assets/textures/galaxy.svg" : currentTextureKey; return; }
        loadTexture("uploaded");
      } else loadTexture($("art-texture").value);
    });
    document.querySelectorAll(".swatch").forEach((button) => button.addEventListener("click", () => { $("art-texture").value = button.dataset.texture; loadTexture(button.dataset.texture); }));
    $("texture-upload").addEventListener("change", (event) => {
      const file = event.target.files?.[0]; if (!file) return;
      if (!/^image\/(png|jpeg|webp|gif)$/.test(file.type)) { toast("Choose a PNG, JPG, WebP, or GIF image."); event.target.value = ""; return; }
      if (file.size > 8 * 1024 * 1024) { toast("Please use an image smaller than 8 MB for this browser prototype."); event.target.value = ""; return; }
      if (uploadedTextureUrl) URL.revokeObjectURL(uploadedTextureUrl);
      uploadedTextureUrl = URL.createObjectURL(file);
      $("art-texture").value = "uploaded";
      loadTexture("uploaded");
      event.target.value = "";
    });
    $("download-art").addEventListener("click", downloadArt);
    $("clear-art").addEventListener("click", resetArt);
    $("insert-art-into-doc").addEventListener("click", insertArtIntoDocument);
    setupContactForm();
    document.addEventListener("keydown", (event) => {
      if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === "s") { event.preventDefault(); saveCurrentDocument(true); }
    });
    window.addEventListener("beforeunload", () => { if (activeDocument()) { syncDocumentToState(); persistState(false); } });
  }

  function init() {
    state = loadState();
    if (!state.folders.length) state.folders.push({ id: uid("folder"), name: "My Documents", createdAt: nowISO(), fixed: true });
    if (!state.docs.length) state.docs.push({ id: uid("doc"), title: "Untitled document", folderId: state.folders[0].id, html: "<p><br></p>", createdAt: nowISO(), updatedAt: nowISO() });
    currentDocId = state.docs[0].id;
    renderFolders();
    openDocument(currentDocId);
    setupEvents();
    loadTexture("assets/textures/galaxy.svg");
    $("art-color").disabled = true;
    const fromHash = location.hash.replace(/^#/, "");
    if (["writer", "letter-art", "library", "contact"].includes(fromHash)) setView(fromHash, false);
    else setView("writer", false);
    renderLibrary();
    persistState(false);
  }

  document.addEventListener("DOMContentLoaded", init);
})();
