/**
 * Legacy pages config kept only for compatibility.
 * App.jsx is the active source of truth for routing in this app.
 */
import Home from './pages/Home';
import Location from './pages/Location';


export const PAGES = {
    "Home": Home,
    "Location": Location,
}

export const pagesConfig = {
    mainPage: "Home",
    Pages: PAGES,
};