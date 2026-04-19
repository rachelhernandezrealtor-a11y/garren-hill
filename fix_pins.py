with open('/app/pages/FlowFarmLanding2.jsx', 'r') as f:
    content = f.read()

old = '''    {
      label: "Main Residence",
      tag: "Robert Clark AIA",
      sf: "8,519 SF",
      top: "38%", left: "40%",'''

new = '''    {
      label: "Main Residence",
      tag: "Robert Clark AIA",
      sf: "8,519 SF",
      top: "22%", left: "52%",'''

content = content.replace(old, new, 1)

old2 = '''    {
      label: "Cabana House",
      tag: "Guest Retreat",
      sf: "Private Suite",
      top: "55%", left: "60%",'''

new2 = '''    {
      label: "Cabana House",
      tag: "Guest Retreat",
      sf: "Private Suite",
      top: "40%", left: "60%",'''

content = content.replace(old2, new2, 1)

old3 = '''    {
      label: "3-Acre Veganic Farm",
      tag: "USDA Agricultural",
      sf: "3 of 15 Acres",
      top: "20%", left: "28%",'''

new3 = '''    {
      label: "3-Acre Veganic Farm",
      tag: "USDA Agricultural",
      sf: "3 of 15 Acres",
      top: "45%", left: "22%",'''

content = content.replace(old3, new3, 1)

old4 = '''    {
      label: "High Tunnel",
      tag: "Greenhouse",
      sf: "96 x 36 ft",
      top: "22%", left: "62%",'''

new4 = '''    {
      label: "High Tunnel",
      tag: "Greenhouse",
      sf: "96 x 36 ft",
      top: "65%", left: "48%",'''

content = content.replace(old4, new4, 1)

old5 = '''    {
      label: "Farm Workshop",
      tag: "Infrastructure",
      sf: "30 x 40 ft",
      top: "68%", left: "70%",'''

new5 = '''    {
      label: "Farm Workshop",
      tag: "Infrastructure",
      sf: "30 x 40 ft",
      top: "55%", left: "72%",'''

content = content.replace(old5, new5, 1)

old6 = '''    {
      label: "Compost + Biochar",
      tag: "Regenerative Systems",
      sf: "Covered Structure",
      top: "75%", left: "52%",'''

new6 = '''    {
      label: "Compost + Biochar",
      tag: "Regenerative Systems",
      sf: "Covered Structure",
      top: "70%", left: "62%",'''

content = content.replace(old6, new6, 1)

with open('/app/pages/FlowFarmLanding2.jsx', 'w') as f:
    f.write(content)
print("SUCCESS")
