
const $ = (sel) => document.querySelector(sel);
const $$ = (sel) => Array.from(document.querySelectorAll(sel));

const state = {
  baseUrl: localStorage.getItem("baseUrl") || "http://127.0.0.1:8000",
};

const baseUrlInput = $("#baseUrl");
baseUrlInput.value = state.baseUrl;
baseUrlInput.addEventListener("change", () => {
  state.baseUrl = baseUrlInput.value.trim();
  localStorage.setItem("baseUrl", state.baseUrl);
  refreshAll();
});

$("#useFastAPI").addEventListener("click", () => {
  state.baseUrl = "http://127.0.0.1:8000";
  baseUrlInput.value = state.baseUrl;
  localStorage.setItem("baseUrl", state.baseUrl);
  refreshAll();
});
$("#useJsonServer").addEventListener("click", () => {
  state.baseUrl = "http://127.0.0.1:3001";
  baseUrlInput.value = state.baseUrl;
  localStorage.setItem("baseUrl", state.baseUrl);
  refreshAll();
});

// Tabs
$$("nav button").forEach(btn => {
  btn.addEventListener("click", () => {
    $$(".tab").forEach(s => s.classList.remove("active"));
    $("#" + btn.dataset.tab).classList.add("active");
  });
});

async function api(path, options={}) {
  const url = `${state.baseUrl}${path}`;
  const res = await fetch(url, { headers: { "Content-Type": "application/json" }, ...options });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(res.status + " " + text);
  }
  if (res.status === 204) return null;
  return res.json();
}

// ------- Users -------
async function loadUsers() {
  try {
    const data = await api("/api/v1/users");
    const list = $("#usersList");
    list.innerHTML = "";
    data.forEach(u => {
      const el = document.createElement("div");
      el.className = "card";
      el.innerHTML = `
        <div>
          <div><strong>${u.name}</strong> <span class="small">(#${u.id})</span></div>
          <div class="meta">${u.email} • ${u.role}</div>
        </div>
        <div class="actions">
          <button class="edit">Edit</button>
          <button class="danger delete">Delete</button>
        </div>
      `;
      el.querySelector(".edit").onclick = async () => {
        const role = prompt("Nowa rola:", u.role);
        if (role) {
          await api("/api/v1/users/" + u.id, { method: "PATCH", body: JSON.stringify({ role }) });
          loadUsers();
        }
      };
      el.querySelector(".delete").onclick = async () => {
        if (confirm("Usunąć użytkownika #" + u.id + "?")) {
          await api("/api/v1/users/" + u.id, { method: "DELETE" });
          loadUsers();
        }
      };
      list.appendChild(el);
    });
  } catch (e) {
    $("#usersList").innerHTML = `<div class="card">Błąd: ${e.message}</div>`;
  }
}

$("#userForm").addEventListener("submit", async (e) => {
  e.preventDefault();
  const fd = new FormData(e.target);
  try {
    await api("/api/v1/users", { method: "POST", body: JSON.stringify(Object.fromEntries(fd)) });
    e.target.reset();
    loadUsers();
  } catch (e2) { alert(e2.message); }
});

// ------- Products -------
async function loadProducts() {
  try {
    const data = await api("/api/v1/products");
    const list = $("#productsList");
    list.innerHTML = "";
    data.forEach(p => {
      const el = document.createElement("div");
      el.className = "card";
      el.innerHTML = `
        <div>
          <div><strong>${p.name}</strong> <span class="small">(#${p.id})</span></div>
          <div class="meta">${p.price} • stock: ${p.stock}</div>
        </div>
        <div class="actions">
          <button class="edit">+1 stock</button>
          <button class="danger delete">Delete</button>
        </div>
      `;
      el.querySelector(".edit").onclick = async () => {
        await api("/api/v1/products/" + p.id, { method: "PATCH", body: JSON.stringify({ stock: (p.stock || 0) + 1 }) });
        loadProducts();
      };
      el.querySelector(".delete").onclick = async () => {
        if (confirm("Usunąć produkt #" + p.id + "?")) {
          await api("/api/v1/products/" + p.id, { method: "DELETE" });
          loadProducts();
        }
      };
      list.appendChild(el);
    });
  } catch (e) {
    $("#productsList").innerHTML = `<div class="card">Błąd: ${e.message}</div>`;
  }
}

$("#productForm").addEventListener("submit", async (e) => {
  e.preventDefault();
  const fd = new FormData(e.target);
  const payload = Object.fromEntries(fd);
  payload.price = parseFloat(payload.price);
  payload.stock = parseInt(payload.stock, 10);
  try {
    await api("/api/v1/products", { method: "POST", body: JSON.stringify(payload) });
    e.target.reset();
    loadProducts();
  } catch (e2) { alert(e2.message); }
});

// ------- Posts -------
async function loadPosts() {
  try {
    const data = await api("/api/v1/posts");
    const list = $("#postsList");
    list.innerHTML = "";
    data.forEach(p => {
      const el = document.createElement("div");
      el.className = "card";
      el.innerHTML = `
        <div>
          <div><strong>${p.title}</strong> <span class="small">(#${p.id})</span></div>
          <div class="meta">user_id: ${p.user_id}</div>
          <div class="small">${p.body}</div>
        </div>
        <div class="actions">
          <button class="edit">Edit title</button>
          <button class="danger delete">Delete</button>
        </div>
      `;
      el.querySelector(".edit").onclick = async () => {
        const title = prompt("Nowy tytuł:", p.title);
        if (title) {
          await api("/api/v1/posts/" + p.id, { method: "PATCH", body: JSON.stringify({ title }) });
          loadPosts();
        }
      };
      el.querySelector(".delete").onclick = async () => {
        if (confirm("Usunąć post #" + p.id + "?")) {
          await api("/api/v1/posts/" + p.id, { method: "DELETE" });
          loadPosts();
        }
      };
      list.appendChild(el);
    });
  } catch (e) {
    $("#postsList").innerHTML = `<div class="card">Błąd: ${e.message}</div>`;
  }
}

$("#postForm").addEventListener("submit", async (e) => {
  e.preventDefault();
  const fd = new FormData(e.target);
  const payload = Object.fromEntries(fd);
  payload.user_id = parseInt(payload.user_id, 10);
  try {
    await api("/api/v1/posts", { method: "POST", body: JSON.stringify(payload) });
    e.target.reset();
    loadPosts();
  } catch (e2) { alert(e2.message); }
});

function refreshAll() {
  loadUsers();
  loadProducts();
  loadPosts();
}

// initial load
refreshAll();
