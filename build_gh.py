# Convert the React JSX to a standalone HTML file with vanilla JS
# We'll inline everything — no build step needed

html = '''<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8"/>
<meta name="viewport" content="width=device-width, initial-scale=1.0"/>
<title>Garren Hill | 200 Hollycrest Drive, Pinehurst, NC</title>
<meta name="description" content="A century-old historic manor in Pinehurst, NC. 5 beds, 5 baths, 7 fireplaces, 4.15 acres. Built 1916 by Walter Hines Page."/>
<meta property="og:title" content="Garren Hill | Pinehurst, NC"/>
<meta property="og:description" content="The most historically significant private residence in the Pinehurst ETJ. Built 1916."/>
<meta property="og:image" content="https://media.base44.com/images/public/69e2578ca7113dbe93cb208d/6e1617ac3_200HollycrestDrive-222.jpg"/>
<style>
*{margin:0;padding:0;box-sizing:border-box;}
html{scroll-behavior:smooth;}
body{background:#0d0b09;color:#F2EDE4;font-family:Georgia,serif;overflow-x:hidden;}
img{display:block;}
a{text-decoration:none;}

/* Fade in animations */
.fade{opacity:0;transform:translateY(28px);transition:opacity 1.8s ease,transform 1.8s ease;}
.fade.visible{opacity:1;transform:none;}
.fade-d1{transition-delay:0.1s;}
.fade-d2{transition-delay:0.25s;}
.fade-d3{transition-delay:0.4s;}

/* HERO */
#hero{position:relative;height:100vh;min-height:640px;overflow:hidden;}
#hero img.bg{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;object-position:center 30%;z-index:1;opacity:0.68;}
#hero .overlay1{position:absolute;inset:0;z-index:2;background:linear-gradient(to bottom,rgba(13,11,9,0.3) 0%,transparent 25%,transparent 55%,rgba(13,11,9,0.97) 100%);}
#hero .overlay2{position:absolute;inset:0;z-index:2;background:radial-gradient(ellipse at center,transparent 30%,rgba(13,11,9,0.42) 100%);}
#hero .top-tag{position:absolute;top:2.6rem;left:0;right:0;z-index:10;text-align:center;}
#hero nav{position:absolute;top:2.4rem;right:3rem;z-index:10;display:flex;gap:2.8rem;}
#hero nav a{color:rgba(255,255,255,0.22);font-family:sans-serif;font-size:10px;letter-spacing:0.24em;text-transform:uppercase;}
#hero .center{position:absolute;inset:0;z-index:5;display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center;padding:0 10vw;}
#hero .eyebrow{font-family:sans-serif;font-size:9px;letter-spacing:0.4em;text-transform:uppercase;color:#B8986A;margin:0 0 2rem;}
#hero h1{color:#fff;font-family:Georgia,serif;font-weight:400;font-size:5.8rem;line-height:1.08;margin:0;letter-spacing:-0.02em;text-shadow:0 4px 80px rgba(0,0,0,0.7);}
#hero .sub{color:rgba(255,255,255,0.34);font-style:italic;font-size:1.08rem;margin:2.2rem 0 2.6rem;line-height:1.8;}
#hero .line{width:1px;height:44px;background:linear-gradient(to bottom,#B8986A,transparent);margin:0 auto;opacity:0.5;}
#hero .bottom{position:absolute;bottom:3rem;left:3rem;right:3rem;z-index:10;display:flex;justify-content:space-between;align-items:flex-end;}
#hero .addr{color:rgba(255,255,255,0.3);font-family:sans-serif;font-size:11px;letter-spacing:0.2em;text-transform:uppercase;margin:0 0 0.3rem;}
#hero .specs{color:rgba(255,255,255,0.12);font-family:sans-serif;font-size:9px;letter-spacing:0.16em;text-transform:uppercase;margin:0;}

/* LEGACY */
#legacy{background:#0d0b09;padding:18rem 0;text-align:center;}
#legacy .inner{max-width:840px;margin:0 auto;padding:0 6vw;display:flex;flex-direction:column;align-items:center;gap:3rem;}
.eyebrow{font-family:sans-serif;font-size:10px;letter-spacing:0.36em;text-transform:uppercase;color:#B8986A;margin:0;}
.goldline{width:36px;height:1px;background:#B8986A;opacity:0.3;}
.goldline-c{margin:0 auto;}
#legacy h2{color:#F2EDE4;font-weight:400;font-size:3.2rem;line-height:1.32;margin:0;letter-spacing:-0.018em;}
#legacy p.body{color:rgba(255,255,255,0.28);font-size:1.12rem;line-height:2.1;margin:0;max-width:640px;}
#legacy a.tour{color:#B8986A;font-family:sans-serif;font-size:10px;letter-spacing:0.32em;text-transform:uppercase;border-bottom:1px solid rgba(184,152,106,0.28);padding-bottom:0.3rem;}

/* CINEMATIC */
.cinematic{position:relative;min-height:100vh;overflow:hidden;display:flex;align-items:center;}
.cinematic img.bg{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;z-index:1;}
.cinematic .ov-left{position:absolute;inset:0;z-index:2;background:linear-gradient(to right,rgba(13,11,9,0.92) 0%,rgba(13,11,9,0.35) 55%,transparent 100%);}
.cinematic .ov-right{position:absolute;inset:0;z-index:2;background:linear-gradient(to left,rgba(13,11,9,0.92) 0%,rgba(13,11,9,0.35) 55%,transparent 100%);}
.cinematic .ov-center{position:absolute;inset:0;z-index:2;background:rgba(13,11,9,0.58);}
.cinematic .content{position:relative;z-index:5;width:100%;max-width:1360px;margin:0 auto;padding:10rem 6vw;}
.cinematic .glass{background:rgba(10,8,6,0.72);backdrop-filter:blur(20px);-webkit-backdrop-filter:blur(20px);border:1px solid rgba(255,255,255,0.07);padding:3.5rem 4rem;max-width:500px;}
.cinematic .glass .eyebrow{margin-bottom:1.4rem;}
.cinematic .glass .gl{width:28px;height:1px;background:#B8986A;opacity:0.3;margin:0 0 1.4rem;}
.cinematic .glass h2{color:#F2EDE4;font-weight:400;font-size:2.4rem;line-height:1.22;margin:0 0 1.6rem;letter-spacing:-0.015em;white-space:pre-line;}
.cinematic .glass p{color:rgba(255,255,255,0.4);font-size:1rem;line-height:2;margin:0;}
.cinematic .quote-wrap{max-width:680px;text-align:center;margin:0 auto;}
.cinematic .quote-wrap p{color:#F2EDE4;font-style:italic;font-size:2.8rem;line-height:1.4;margin:0;letter-spacing:-0.01em;}
.cinematic .right{display:flex;justify-content:flex-end;}

/* MANOR */
#manor{background:#100e0c;padding:16rem 0;}
#manor .inner{display:grid;grid-template-columns:1fr 1fr;max-width:1320px;margin:0 auto;padding:0 6vw;gap:8rem;align-items:center;}
#manor img{width:100%;height:600px;object-fit:cover;object-position:center 20%;}
#manor .text{display:flex;flex-direction:column;gap:2rem;}
#manor h2{color:#F2EDE4;font-weight:400;font-size:3rem;line-height:1.2;margin:0;letter-spacing:-0.018em;}
#manor p{color:rgba(255,255,255,0.28);font-size:1.05rem;line-height:2.1;margin:0;}
#manor .links{display:flex;gap:1.5rem;margin-top:0.5rem;}
#manor .links a{font-family:sans-serif;font-size:10px;letter-spacing:0.28em;text-transform:uppercase;padding-bottom:0.3rem;}
#manor .links a:first-child{color:#B8986A;border-bottom:1px solid rgba(184,152,106,0.28);}
#manor .links a:last-child{color:rgba(255,255,255,0.2);border-bottom:1px solid rgba(255,255,255,0.08);}

/* NUMBERS */
#numbers{background:#0d0b09;padding:12rem 0;border-top:1px solid rgba(255,255,255,0.04);border-bottom:1px solid rgba(255,255,255,0.04);}
#numbers .grid{display:grid;grid-template-columns:repeat(4,1fr);gap:4rem 3rem;max-width:1200px;margin:0 auto;padding:0 6vw;}
#numbers .stat{text-align:center;}
#numbers .val{color:#B8986A;font-family:Georgia,serif;font-size:2rem;font-weight:400;margin:0 0 0.5rem;letter-spacing:-0.01em;}
#numbers .lbl{color:rgba(255,255,255,0.22);font-family:sans-serif;font-size:9px;letter-spacing:0.26em;text-transform:uppercase;margin:0;}

/* INTERIORS */
#interiors{background:#0d0b09;padding:14rem 0;}
#interiors .header{text-align:center;margin-bottom:8rem;padding:0 6vw;}
#interiors h2{color:#F2EDE4;font-weight:400;font-size:3rem;line-height:1.25;margin:2rem 0 0;letter-spacing:-0.018em;}
#interiors .grid{display:grid;grid-template-columns:repeat(3,1fr);max-width:1320px;margin:0 auto;padding:0 5vw;gap:3.5rem;}
#interiors .card .img-wrap{position:relative;overflow:hidden;}
#interiors .card img{width:100%;aspect-ratio:4/3;object-fit:cover;}
#interiors .card .img-wrap .grad{position:absolute;inset:0;background:linear-gradient(to top,rgba(13,11,9,0.75) 0%,transparent 60%);}
#interiors .card .img-wrap .tag{position:absolute;bottom:0;left:0;right:0;padding:1.5rem;color:#B8986A;font-family:sans-serif;font-size:9px;letter-spacing:0.26em;text-transform:uppercase;}
#interiors .card p{color:rgba(255,255,255,0.25);font-size:0.95rem;line-height:1.9;margin:1.5rem 0 0;}

/* GROUNDS */
#grounds{background:#0f0d0b;padding:16rem 0;}
#grounds .inner{max-width:1320px;margin:0 auto;padding:0 6vw;}
#grounds .header{text-align:center;margin-bottom:8rem;}
#grounds h2{color:#F2EDE4;font-weight:400;font-size:3rem;line-height:1.25;margin:2rem 0 0;letter-spacing:-0.018em;}
#grounds .photos{display:grid;grid-template-columns:1fr 1fr;gap:2.5rem;}
#grounds .photos img.tall{width:100%;height:420px;object-fit:cover;object-position:center 40%;}
#grounds .photos .col{display:grid;gap:2.5rem;}
#grounds .photos .col img{width:100%;height:195px;object-fit:cover;}
#grounds p.caption{color:rgba(255,255,255,0.22);font-size:1.08rem;line-height:2.1;margin:5rem auto 0;max-width:680px;text-align:center;}

/* LOCATION */
#location{background:#0d0b09;padding:14rem 0;border-top:1px solid rgba(255,255,255,0.04);}
#location .inner{max-width:960px;margin:0 auto;padding:0 6vw;text-align:center;}
#location h2{color:#F2EDE4;font-weight:400;font-size:3rem;line-height:1.25;margin:2rem 0 3rem;letter-spacing:-0.018em;}
#location p{color:rgba(255,255,255,0.28);font-size:1.1rem;line-height:2.1;margin:3rem auto 0;max-width:640px;}

/* INQUIRE */
#inquire{background:#100e0c;padding:16rem 0;border-top:1px solid rgba(255,255,255,0.04);}
#inquire .inner{max-width:680px;margin:0 auto;padding:0 6vw;}
#inquire .header{text-align:center;margin-bottom:6rem;}
#inquire h2{color:#F2EDE4;font-weight:400;font-size:3rem;line-height:1.25;margin:2rem 0 1.5rem;letter-spacing:-0.018em;}
#inquire form{display:flex;flex-direction:column;gap:2.5rem;}
#inquire .row{display:grid;grid-template-columns:1fr 1fr;gap:2.5rem;}
#inquire input,#inquire textarea{background:transparent;border:none;border-bottom:1px solid rgba(255,255,255,0.12);color:#F2EDE4;font-family:Georgia,serif;font-size:1rem;padding:0.9rem 0;width:100%;outline:none;}
#inquire textarea{resize:none;min-height:100px;}
#inquire button{align-self:flex-start;background:transparent;border:1px solid #B8986A;color:#B8986A;font-family:sans-serif;font-size:10px;letter-spacing:0.32em;text-transform:uppercase;padding:1.1rem 3rem;cursor:pointer;}
#inquire .thanks{color:rgba(255,255,255,0.35);font-size:1.1rem;line-height:2;text-align:center;display:none;}

/* FOOTER */
footer{background:#0d0b09;padding:4rem 6vw;border-top:1px solid rgba(255,255,255,0.04);display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:2rem;}
footer .name{color:rgba(255,255,255,0.1);font-size:0.85rem;margin:0 0 0.4rem;letter-spacing:0.12em;}
footer .addr{color:rgba(255,255,255,0.06);font-family:sans-serif;font-size:9px;letter-spacing:0.18em;text-transform:uppercase;margin:0;}
footer .contact{color:rgba(255,255,255,0.06);font-family:sans-serif;font-size:9px;letter-spacing:0.12em;text-transform:uppercase;margin:0;}

/* MOBILE */
@media(max-width:768px){
  #hero h1{font-size:2.6rem;}
  #hero nav{display:none;}
  #hero .center{padding:0 6vw;}
  #hero .bottom{left:1.5rem;right:1.5rem;bottom:2rem;}
  #legacy{padding:8rem 0;}
  #legacy h2{font-size:2rem;}
  #manor{padding:8rem 0;}
  #manor .inner{grid-template-columns:1fr;gap:5rem;}
  #manor img{height:360px;}
  #manor h2{font-size:2rem;}
  #numbers{padding:7rem 0;}
  #numbers .grid{grid-template-columns:repeat(2,1fr);gap:3rem 2rem;}
  #numbers .val{font-size:1.6rem;}
  #interiors{padding:8rem 0;}
  #interiors .header{margin-bottom:5rem;}
  #interiors h2{font-size:2rem;}
  #interiors .grid{grid-template-columns:1fr;gap:3rem;}
  #grounds{padding:8rem 0;}
  #grounds .header{margin-bottom:5rem;}
  #grounds h2{font-size:2rem;}
  #grounds .photos{grid-template-columns:1fr;}
  #grounds .photos img.tall{height:280px;}
  #grounds .photos .col img{height:180px;}
  #grounds p.caption{margin-top:3rem;}
  #location{padding:8rem 0;}
  #location h2{font-size:2rem;}
  #location p{font-size:1rem;}
  #inquire{padding:8rem 0;}
  #inquire h2{font-size:2rem;}
  #inquire .row{grid-template-columns:1fr;}
  #inquire .header{margin-bottom:4rem;}
  #inquire button{align-self:stretch;}
  .cinematic{min-height:80vh;}
  .cinematic .glass{padding:2.5rem 2rem;max-width:100%;}
  .cinematic .glass h2{font-size:1.6rem;}
  .cinematic .quote-wrap p{font-size:1.5rem;}
  footer{flex-direction:column;gap:1rem;}
}
</style>
</head>
<body>

<!-- HERO -->
<section id="hero">
  <img class="bg" src="https://media.base44.com/images/public/69e2578ca7113dbe93cb208d/6e1617ac3_200HollycrestDrive-222.jpg" alt="Garren Hill"/>
  <div class="overlay1"></div>
  <div class="overlay2"></div>
  <div class="top-tag">
    <p style="font-family:sans-serif;font-size:10px;letter-spacing:0.52em;text-transform:uppercase;color:rgba(255,255,255,0.28);margin:0;">Garren Hill</p>
  </div>
  <nav>
    <a href="#the-manor">The Manor</a>
    <a href="#the-grounds">The Grounds</a>
    <a href="#inquire">Inquire</a>
  </nav>
  <div class="center">
    <p class="eyebrow">Pinehurst, North Carolina &mdash; Est. 1916</p>
    <h1>A Century of<br/><em>Quiet Consequence.</em></h1>
    <p class="sub">The most historically significant private residence<br/>in the Pinehurst ETJ.</p>
    <div class="line"></div>
  </div>
  <div class="bottom">
    <div>
      <p class="addr">200 Hollycrest Drive, Pinehurst, NC</p>
      <p class="specs">4.15 Acres &mdash; 5 Beds &mdash; 5 Baths &mdash; 7 Fireplaces</p>
    </div>
  </div>
</section>

<!-- LEGACY -->
<section id="legacy">
  <div class="inner">
    <p class="eyebrow fade">200 Hollycrest Drive &mdash; Pinehurst, North Carolina</p>
    <h2 class="fade fade-d1">Built in 1916 by Walter Hines Page.<br/>Co-founder of Doubleday, Page and Co.<br/><em>Still standing. Still rare.</em></h2>
    <div class="goldline goldline-c fade fade-d1"></div>
    <p class="body fade fade-d2">Recognized by the Village Historic Foundation. Meticulous restoration with period-accurate brick sourced over three months to match the original portico exactly. The year 1916 remains inlaid in brick at the entrance &mdash; a quiet declaration that some things are built to last.</p>
    <a href="https://my.matterport.com/show/?m=mfwyqT5Btwx&brand=0&mls=1&" target="_blank" class="tour fade fade-d3">Begin the Virtual Tour</a>
  </div>
</section>

<!-- MANOR -->
<section id="the-manor">
  <div id="manor">
    <div class="inner">
      <img class="fade" src="https://media.base44.com/images/public/69e2578ca7113dbe93cb208d/0275eccb6_200HollycrestDrive-225.jpg" alt="Garren Hill manor"/>
      <div class="text">
        <p class="eyebrow fade fade-d1">The Manor</p>
        <div class="goldline fade fade-d1"></div>
        <h2 class="fade fade-d2">Five bedrooms.<br/>Seven fireplaces.<br/>One hundred and nine<br/>years of character.</h2>
        <p class="fade fade-d2">Wide plank heart pine floors throughout. A central hall vista that runs the full depth of the house. Original millwork, period-accurate brick sourced over three months to match the entrance portico exactly.</p>
        <p class="fade fade-d3">A five-zone climate system engineered to protect the original architecture. The Wee Cottage &mdash; moved to the grounds by sky crane &mdash; sits quietly at the edge of the property, complete and self-contained.</p>
        <div class="links fade fade-d3">
          <a href="https://my.matterport.com/show/?m=mfwyqT5Btwx&brand=0&mls=1&" target="_blank">Virtual Tour</a>
          <a href="#inquire">Private Inquiry</a>
        </div>
      </div>
    </div>
  </div>
</section>

<!-- CINEMATIC 1 - Living Room -->
<div class="cinematic">
  <img class="bg" src="https://media.base44.com/images/public/69e2578ca7113dbe93cb208d/cee09ae5f_200HollycrestDrive-65.jpg" alt="Living Room" style="object-position:center 40%;"/>
  <div class="ov-left"></div>
  <div class="content">
    <div class="glass fade">
      <p class="eyebrow">The Living Room</p>
      <div class="gl"></div>
      <h2>40 feet long.&#10;Two fireplaces.&#10;One hundred years of&#10;life lived well.</h2>
      <p>Original heart pine floors. Proportions that command respect. The room Walter Hines Page built for conversation, literature, and the long view.</p>
    </div>
  </div>
</div>

<!-- NUMBERS -->
<section id="numbers">
  <div class="grid fade">
    <div class="stat"><p class="val">1916</p><p class="lbl">Year Built</p></div>
    <div class="stat"><p class="val">4.15</p><p class="lbl">Acres</p></div>
    <div class="stat"><p class="val">5 / 5</p><p class="lbl">Beds / Baths</p></div>
    <div class="stat"><p class="val">7</p><p class="lbl">Fireplaces</p></div>
    <div class="stat"><p class="val">VHF</p><p class="lbl">Recognized</p></div>
    <div class="stat"><p class="val">ETJ</p><p class="lbl">Tax Benefit</p></div>
    <div class="stat"><p class="val">Wee Cottage</p><p class="lbl">Guest Structure</p></div>
    <div class="stat"><p class="val">5 Zone</p><p class="lbl">Climate Control</p></div>
  </div>
</section>

<!-- INTERIORS -->
<section id="interiors">
  <div class="header">
    <p class="eyebrow fade">The Interior</p>
    <h2 class="fade fade-d1">Rooms that remember.</h2>
  </div>
  <div class="grid">
    <div class="card fade">
      <div class="img-wrap"><img src="https://media.base44.com/images/public/69e2578ca7113dbe93cb208d/cee09ae5f_200HollycrestDrive-65.jpg" alt="Living Room"/><div class="grad"></div><div class="tag">Living Room</div></div>
      <p>The 40-foot grand living room. Two fireplaces. Original pine floors.</p>
    </div>
    <div class="card fade fade-d1">
      <div class="img-wrap"><img src="https://media.base44.com/images/public/69e2578ca7113dbe93cb208d/78160e09e_200HollycrestDrive-69.jpg" alt="Primary Bath"/><div class="grad"></div><div class="tag">Primary Bath</div></div>
      <p>Fully renovated with period sensitivity. Every fixture chosen with intention.</p>
    </div>
    <div class="card fade fade-d2">
      <div class="img-wrap"><img src="https://media.base44.com/images/public/69e2578ca7113dbe93cb208d/18ea0e2c4_200HollycrestDrive-218.jpg" alt="The Pool"/><div class="grad"></div><div class="tag">The Pool</div></div>
      <p>20 by 40 feet. Surrounded by mature plantings and the quiet of Pinehurst.</p>
    </div>
    <div class="card fade">
      <div class="img-wrap"><img src="https://media.base44.com/images/public/69e2578ca7113dbe93cb208d/4e6cdb2f6_200HollycrestDrive-212.jpg" alt="Wee Cottage"/><div class="grad"></div><div class="tag">Wee Cottage</div></div>
      <p>Private guest structure. Moved to the grounds by sky crane. Self-contained.</p>
    </div>
    <div class="card fade fade-d1">
      <div class="img-wrap"><img src="https://media.base44.com/images/public/69e2578ca7113dbe93cb208d/f0b4bf90e_200HollycrestDrive-223.jpg" alt="The Grounds"/><div class="grad"></div><div class="tag">The Grounds</div></div>
      <p>4.15 acres of curated landscape. Circular drive. Private and protected.</p>
    </div>
    <div class="card fade fade-d2">
      <div class="img-wrap"><img src="https://media.base44.com/images/public/69e2578ca7113dbe93cb208d/0275eccb6_200HollycrestDrive-225.jpg" alt="The Portico"/><div class="grad"></div><div class="tag">The Portico</div></div>
      <p>1916 inlaid in the entrance brick. The first thing you see. The last you forget.</p>
    </div>
  </div>
</section>

<!-- QUOTE CINEMATIC -->
<div class="cinematic">
  <img class="bg" src="https://media.base44.com/images/public/69e2578ca7113dbe93cb208d/5f5f87315_200HollycrestDrive-65.jpg" alt="Garren Hill" style="object-position:center 50%;"/>
  <div class="ov-center"></div>
  <div class="content" style="display:flex;justify-content:center;align-items:center;">
    <div class="quote-wrap fade">
      <p>&ldquo;A house that has outlasted every trend that ever passed through Pinehurst.&rdquo;</p>
    </div>
  </div>
</div>

<!-- GROUNDS -->
<section id="the-grounds">
  <div id="grounds">
    <div class="inner">
      <div class="header">
        <p class="eyebrow fade">The Grounds</p>
        <h2 class="fade fade-d1">4.15 private acres.<br/>Two tennis courts. A pool.<br/>The Wee Cottage.</h2>
      </div>
      <div class="photos">
        <img class="tall fade" src="https://media.base44.com/images/public/69e2578ca7113dbe93cb208d/6e1fa56a6_200HollycrestDrive-219.jpg" alt="Pool"/>
        <div class="col">
          <img class="fade fade-d1" src="https://media.base44.com/images/public/69e2578ca7113dbe93cb208d/b38e74a20_200HollycrestDrive-216.jpg" alt="Tennis courts"/>
          <img class="fade fade-d2" src="https://media.base44.com/images/public/69e2578ca7113dbe93cb208d/4e6cdb2f6_200HollycrestDrive-212.jpg" alt="Wee Cottage"/>
        </div>
      </div>
      <p class="caption fade">The grounds have been tended with the same care as the house itself. A 20-by-40 pool, two tennis courts, a circular drive through mature pines, and the Wee Cottage &mdash; private, complete, and quietly extraordinary.</p>
    </div>
  </div>
</section>

<!-- PORTICO CINEMATIC -->
<div class="cinematic">
  <img class="bg" src="https://media.base44.com/images/public/69e2578ca7113dbe93cb208d/0275eccb6_200HollycrestDrive-225.jpg" alt="The Portico" style="object-position:center 25%;"/>
  <div class="ov-right"></div>
  <div class="content right">
    <div class="glass fade">
      <p class="eyebrow">The Portico</p>
      <div class="gl"></div>
      <h2>1916.&#10;Inlaid in brick.&#10;Still there.</h2>
      <p>Three months sourcing period-accurate brick to match what Walter Hines Page built over a century ago. Some things are worth getting exactly right.</p>
    </div>
  </div>
</div>

<!-- LOCATION -->
<section id="location">
  <div class="inner">
    <p class="eyebrow fade" style="text-align:center;">Location</p>
    <h2 class="fade fade-d1">Pinehurst, North Carolina.</h2>
    <div class="goldline goldline-c fade fade-d1"></div>
    <p class="fade fade-d2">Within the Pinehurst Extra-Territorial Jurisdiction &mdash; a designation that carries meaningful tax advantages. Minutes from the Village of Pinehurst, the golf courses, and everything that makes this corner of the Sandhills genuinely irreplaceable.</p>
  </div>
</section>

<!-- INQUIRE -->
<section id="inquire">
  <div class="inner">
    <div class="header">
      <p class="eyebrow fade" style="text-align:center;">Private Inquiry</p>
      <h2 class="fade fade-d1">This home deserves<br/>a thoughtful conversation.</h2>
      <div class="goldline goldline-c fade fade-d1" style="margin-top:1.5rem;"></div>
    </div>
    <form id="inquiry-form" class="fade">
      <div class="row">
        <input type="text" placeholder="Your name" required/>
        <input type="email" placeholder="Email address" required/>
      </div>
      <input type="text" placeholder="Phone (optional)"/>
      <textarea placeholder="Any specific questions or timeline?"></textarea>
      <button type="submit">Submit Inquiry</button>
    </form>
    <p class="thanks" id="thanks-msg">Thank you. Rachel will be in touch shortly.</p>
  </div>
</section>

<!-- FOOTER -->
<footer>
  <div>
    <p class="name">Garren Hill</p>
    <p class="addr">200 Hollycrest Drive, Pinehurst, NC &mdash; Est. 1916</p>
  </div>
  <p class="contact">Rachel Hernandez &mdash; rachelhernandezrealtor@gmail.com</p>
</footer>

<script>
// Intersection Observer for fade-in animations
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.08 });

document.querySelectorAll('.fade').forEach(el => observer.observe(el));

// Form submission
document.getElementById('inquiry-form').addEventListener('submit', function(e) {
  e.preventDefault();
  this.style.display = 'none';
  document.getElementById('thanks-msg').style.display = 'block';
});
</script>
</body>
</html>'''

with open('/app/garren_hill.html', 'w') as f:
    f.write(html)

print("Done")
