
                      MOVIE APP - REACT APPLICATION


A modern, fast, and responsive movie exploration application built with 
React, React Router, and The Movie Database (TMDB) API. The application 
allows users to browse popular films, search by keyword, filter by dynamic 
criteria, view exhaustive details, and persist a curated "Favorites" list 
via browser local storage.


------------------------------------------------------------------------
1. KEY FEATURES
------------------------------------------------------------------------
* Dynamic Discovery: Filter and find movies seamlessly by Genre, Release 
  Year, or Minimum User Rating.
* Universal Keyword Search: Search the entire TMDB database instantly 
  via movie title strings.
* Smart State Resets: Automatic state cleaning triggers whenever navigating 
  back to the Home feed, ensuring fresh discovery views.
* Persistent Favorites List: Seamless add/remove toggle capabilities 
  hooked directly into localStorage to preserve choice over browser reloads.
* Deep Linking: Clean routing patterns mapped directly to individual movie 
  ID profiles (/movie/:id).
* Pagination Support: Click-to-extend "Load More" layout pattern smoothly 
  appends subsequent page sets cleanly without destroying existing grids.


------------------------------------------------------------------------
2. SYSTEM ARCHITECTURE & COMPONENT OVERVIEW
------------------------------------------------------------------------
* Main / Bootstrapper Components:
  - index.js / main.jsx: Boots the Virtual DOM, attaches <StrictMode>, and
    wraps the tree inside a semantic <BrowserRouter>.
  - App.jsx: Scopes global state inside <MovieProvider>, maps out the layout
    wireframes, and provisions core path routes using <Routes> and <Route>.

* Navigation:
  - NavBar.jsx: Serves top-level links using <Link> tags to skip browser
    refresh cycles and maintain SPA speed performance.

* Global State (React Context):
  - MovieContext.js: Tracks favorite arrays globally, implements hooks to 
    push/pull items, and handles synchronized LocalStorage updates.

* Core UI Interfaces (Pages):
  - Home.jsx: Primary controller orchestrating form searches, multi-selector
    dropdown combinations, logic checks, errors, and load-more pagination.
  - Favorites.jsx: Pulls localized states from context to display saved movie
    grids. Renders semantic empty states gracefully if no items exist.
  - MovieDetails.jsx: Uses hook parameters (:id) to query single API profiles,
    mapping data metrics, genre tags, and contextual favorite states.

* Isolated Visual Elements:
  - MovieCard.jsx: Modular grid elements utilizing useNavigate links. Uses 
    event propagation stoppers (stopPropagation) on nested favorite buttons 
    to stop conflicts with main container click handlers.


------------------------------------------------------------------------
3. PROJECT DIRECTORY STRUCTURE
------------------------------------------------------------------------
src/
│
├── components/
│   ├── MovieCard.jsx
│   └── NavBar.jsx
│
├── contexts/
│   └── MovieContext.js
│
├── pages/
│   ├── Home.jsx
│   ├── Favorites.jsx
│   └── MovieDetails.jsx
│
├── services/
│   └── api.js         <-- Houses search/popular/discover fetch functions
│
├── css/
│   ├── App.css
│   ├── index.css
│   ├── MovieCard.css
│   ├── navbar.css
│   ├── Favorites.css
│   ├── Home.css
│   └── MovieDetails.css
│
├── App.jsx
└── main.jsx / index.js


------------------------------------------------------------------------
4. TECH STACK USED
------------------------------------------------------------------------
* Library Core: React (Functional Hooks: useState, useEffect, useContext)
* Navigation: React Router DOM (v6 API: Link, Routes, Route, useParams, 
  useNavigate, useLocation)
* Styling Layout: Raw CSS3 Native Grids and Variables
* Database Origin: The Movie Database (TMDB) REST API v3


------------------------------------------------------------------------
5. LOCAL INSTALLATION & DEVELOPMENT PREPARATION
------------------------------------------------------------------------
To launch and experiment with this codebase environment locally:

1. Clone or unpack the source directory.
2. Initialize terminal paths within the root folder directory.
3. Execute standard package installation nodes:
   $ npm install

4. Configure your environment tokens (Ensure your API configuration details 
   exist or are accurately wired within "src/services/api.js").
5. Trigger the localized development hot reload script:
   $ npm run dev

6. Follow local address ports prompted in terminal dashboards 
   (typically http://localhost:5173).


