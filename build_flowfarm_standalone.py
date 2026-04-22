import re

with open('/app/.agents/FlowFarmLanding2_MASTER.jsx', 'r') as f:
    jsx = f.read()

# Remove the import line
jsx = re.sub(r'^import React.*?\n', '', jsx, flags=re.MULTILINE)

# Remove export default keyword
jsx = jsx.replace('export default function FlowFarmLanding2', 'function FlowFarmLanding2')

# Also remove any other export statements
jsx = re.sub(r'^export \{[^}]+\};?\s*$', '', jsx, flags=re.MULTILINE)

# Add the render call at the end
render_call = """
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<FlowFarmLanding2 />);
"""

html = f'''<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Flow Farm | 107 Linden Trail, Aberdeen, NC</title>
<meta name="description" content="Agritourism established. Legacy ready. 15 acres, 6 structures, 8,519 sq ft. 3 miles from Pinehurst Resort. $5,250,000.">
<meta property="og:title" content="Flow Farm | Aberdeen, NC">
<meta property="og:description" content="Where architectural excellence meets working land. Three miles from Pinehurst Resort.">
<meta property="og:image" content="https://media.base44.com/images/public/69e248a2469cc39540781cce/2ca329bbf_flowfarmmasterphotoswebsite.jpg">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;1,300;1,400&display=swap" rel="stylesheet">
<script crossorigin src="https://unpkg.com/react@18/umd/react.production.min.js"></script>
<script crossorigin src="https://unpkg.com/react-dom@18/umd/react-dom.production.min.js"></script>
<script src="https://unpkg.com/@babel/standalone/babel.min.js"></script>
<style>
* {{ margin: 0; padding: 0; box-sizing: border-box; }}
html {{ scroll-behavior: smooth; }}
body {{ background: #0a0a0a; color: #F5F0E8; font-family: Georgia, serif; overflow-x: hidden; }}
::-webkit-scrollbar {{ width: 4px; }}
::-webkit-scrollbar-track {{ background: #0a0a0a; }}
::-webkit-scrollbar-thumb {{ background: rgba(201,169,110,0.3); border-radius: 2px; }}
input, textarea, button {{ font-family: inherit; }}
</style>
</head>
<body>
<div id="root"></div>
<script type="text/babel">
{jsx}
{render_call}
</script>
</body>
</html>'''

with open('/app/flowfarm_v3.html', 'w') as f:
    f.write(html)

print(f"Done. Lines: {len(html.splitlines())}, Size: {len(html)} chars")
