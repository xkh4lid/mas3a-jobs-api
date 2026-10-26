import {readFileSync} from "node:fs";
import {strict as assert} from "node:assert";
const css=readFileSync(new URL("./masaa-taste.css",import.meta.url),"utf8");
for(const s of [".hero",".topbar",".job-card",".jobs-grid",".search-panel",".smart-card",".mobile-dock",":focus-visible","prefers-reduced-motion",'html[data-theme="dark"]'])assert.ok(css.includes(s),"missing "+s);
assert.ok(!/display\s*:\s*none\b/i.test(css),"CSS unexpectedly hides UI");
assert.ok(!/pointer-events\s*:\s*none\b/i.test(css),"CSS unexpectedly blocks clicks");
let depth=0;for(const c of css){if(c==="{")depth++;if(c==="}")depth--;assert.ok(depth>=0,"Unexpected closing brace");}assert.equal(depth,0,"Unclosed braces");
console.log("Masaa Taste: static checks passed");