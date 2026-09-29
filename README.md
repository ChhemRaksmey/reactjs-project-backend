# Panelio — React CRUD Starter

A small React + Vite app with three screens:

- **Login** — mock authentication (accepts any email + password of 4+ characters), session persisted in `localStorage`.
- **Dashboard** — summary stat cards, protected route.
- **Users** — full CRUD (create, read, update, delete) with a modal form for add/edit, a confirmation modal for delete, search/filter, and toast notifications for every action.

## Getting started

```bash
npm install
npm run dev
```

Then open the printed local URL (usually `http://localhost:5173`).

To build for production:

```bash
npm run build
npm run preview
```

## Project structure

```
public/
  assets/                 the admin theme's static css/js/fonts/images
src/
  context/
    AuthContext.jsx     mock login/logout + session persistence
    ToastContext.jsx     global toast queue
  components/
    AppShell.jsx          topbar + sidebar shell (theme markup) used by Dashboard & Users
    Modal.jsx             reusable accessible modal (Esc to close, backdrop click)
    Toast.jsx             toast viewport/rendering
    ProtectedRoute.jsx    redirects to /login when signed out
  pages/
    Login.jsx
    Dashboard.jsx
    Users.jsx             CRUD table + modal + toasts
  App.jsx                 routes
  index.css               design tokens & page-specific styles
```

## The admin theme (`public/assets`)

`AppShell.jsx` uses the Bootstrap admin theme's topbar/sidebar markup and classes
(`#layout-wrapper`, `.vertical-menu`, `#sidebar-menu`, `.header-profile-user`, etc.),
styled by `assets/css/bootstrap.min.css`, `icons.min.css`, and `app.min.css`, all
loaded from `index.html`.

Only `assets/libs/bootstrap/js/bootstrap.bundle.min.js` (vanilla JS, no jQuery) is
loaded — it's what powers the `data-bs-toggle="dropdown"` profile menu. The theme's
original `jquery.min.js`, `metisMenu.min.js`, and `app.js` are **not** loaded: they
directly mutate DOM that React also owns (inside `#root`), and the two would fight
each other. Two bits of behavior from `app.js` were ported to plain React instead:
- the sidebar-collapse toggle (`toggleSidebar()` in `AppShell.jsx`, toggling the
  same `sidebar-enable` / `vertical-collpsed` body classes the theme's CSS expects)
- the sidebar nav's active-link state (via React Router's `NavLink`, instead of the
  theme's URL-matching script)

The rest of the theme (mega menu, notifications dropdown, language switcher, the
right-hand "Choose Layouts" settings drawer, dark/RTL mode switching) was **left
out** of `AppShell.jsx` since none of it was wired to real functionality in this
app — only the pieces actually in use (logo, sidebar toggle, nav links, profile
menu with real sign-out) were kept. All the theme's other assets are still sitting
in `public/assets` if you want to build any of that back in later — the theme's
own docs (usually shipped as `documentation.html` alongside these assets) are the
best reference for that markup.

## Notes

- Data is in-memory (seeded with 3 sample users) — refreshing resets the Users list, but the login session persists via `localStorage`.
- Swap `AuthContext`'s `login` function for a real API call when you're ready to connect a backend.
- Swap the in-memory array in `Users.jsx` for real fetch/create/update/delete calls the same way.
- `public/assets` is ~30 MB (fonts + demo images for the full theme) — most apps only need a fraction of it; feel free to prune unused libs under `assets/libs` once you know what you're keeping.
