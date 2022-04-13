let body = document.body;
let doc={}; // html elements with a class
body.querySelectorAll('[class]').forEach(e=>doc[e.classList[0]]=e);

let setcount = s=>s;
if (doc.count) {
  let count_activeMin;
  setcount = (s,m) => {
    let l = Array.from(s).length;
    if (l<m && m!==count_activeMin) return;
    count_activeMin = m;
    doc.count.textContent = l<m ? "" : l+" char"+(l!=1?"s":"");
  }
  let c = doc.code;
  c.onmouseup = c.onkeyup = () => {
    let s=c.selectionStart, e=c.selectionEnd;
    setcount(c.value.slice(s,e), 2);
  }
}
let clearHighlight = doc.code.oninput = () => {
  doc.highlight.innerText = '';
}

let setExplain = e=>e;
let repl = () => {
  let s=Array.from(doc.code.value), src=str(s);
  doc.rslt.textContent=' '; setExplain(); clearHighlight();
  setcount(s);
  setTimeout(() => {
    doc.rslt.textContent = '';
    let ssep='', sep = () => doc.rslt.append(ssep);
    let disp = t => { sep(); ssep='\n'; doc.rslt.append(t); }
    sysvals.show = (x,w) => { disp(fmt(x)); return x; }
    sysvals.out  = (x,w) => { disp(req1str("•Out",x,w)); return x; }
    didInitPlot = 0;
    try {
      let c=compile(src);
      setExplain(src,c);
      disp(fmt(run.apply(null,c)));
    } catch(e) {
      let n = document.createElement('span');
      n.classList.add('Error');
      n.innerText = fmtErr(e);
      sep(); disp(n);
      highlightErr(s, e);
    }
    sysvals.js=dojs; // In case it was disabled by fragment loading
  }, 0);
}
if (doc.run) doc.run.onclick = repl;
let exp=0, explain;
if (doc.doexplain) doc.doexplain.onclick = () => {
  if (explain===undefined) {
    let drawEval = run(
      [0,19,33,0,0,48,33,0,1,48,6,1,1,33,0,2,48,6,1,2,33,0,3,48,6,1,3,33,0,4,48,6,1,4,33,0,5,48,6,0,20,0,47,32,0,5,27,0,32,20,0,20,0,51,34,0,5,27,1,5,11,3,0,53,0,16,0,5,0,57,21,27,33,0,6,48,6,32,0,6,32,0,6,0,42,0,21,26,0,70,21,0,21,20,0,25,0,56,21,1,6,11,3,0,53,0,16,0,5,0,57,21,27,33,0,7,48,6,0,44,1,7,26,0,21,0,83,21,33,0,8,48,6,0,56,0,54,32,0,8,0,47,0,11,27,27,0,21,20,0,50,0,21,27,33,0,9,48,6,1,8,33,0,10,48,6,32,0,6,0,41,0,22,26,0,86,0,87,11,2,21,33,0,11,48,6,32,0,9,0,47,34,0,4,27,33,0,12,48,6,1,9,33,0,13,48,6,0,64,0,65,11,2,33,0,14,48,6,0,57,0,56,11,2,0,2,32,0,14,17,33,0,15,48,6,0,57,0,58,11,2,0,3,32,0,14,17,0,0,0,59,0,66,11,2,17,33,0,16,48,6,0,62,33,0,17,48,6,0,90,32,0,10,16,33,0,18,48,6,0,91,32,0,10,16,33,0,19,48,6,0,93,32,0,10,0,92,17,33,0,20,48,6,0,94,32,0,10,0,92,17,33,0,21,48,6,0,95,32,0,10,0,92,17,33,0,22,48,6,0,96,34,0,10,0,92,17,33,0,23,48,6,0,97,0,98,0,21,0,62,0,26,16,0,0,0,71,17,17,0,99,0,100,0,101,0,102,0,103,0,104,0,105,0,106,0,107,0,108,0,21,0,74,17,0,21,0,85,17,0,109,0,110,11,14,0,20,0,47,0,57,11,2,17,0,28,16,0,41,0,11,26,16,33,0,24,33,0,25,12,2,48,6,0,111,0,112,0,113,0,114,0,115,0,116,0,117,11,7,0,21,33,0,24,50,6,1,10,32,0,25,26,33,0,26,48,6,34,0,24,0,42,1,11,26,16,33,0,27,48,6,0,120,33,0,28,48,6,0,123,0,124,0,125,0,126,11,4,0,42,0,122,0,50,0,21,27,0,21,0,121,21,26,16,33,0,29,48,6,1,12,33,0,30,48,7,0,56,0,18,34,0,2,19,0,55,0,17,0,40,0,20,26,0,56,0,57,11,2,21,0,50,0,40,0,42,0,25,0,21,0,76,21,0,21,0,24,21,26,26,27,27,33,0,3,48,6,34,0,1,32,1,1,0,49,32,1,0,0,32,0,51,34,0,3,27,20,0,21,0,49,0,11,27,0,42,0,56,26,21,27,16,7,1,13,33,0,3,48,6,0,77,32,0,2,0,78,11,3,0,21,16,33,0,4,48,6,0,79,32,0,2,0,29,0,70,0,13,34,0,2,17,0,46,0,9,26,16,17,0,78,11,3,0,21,16,33,0,5,48,6,32,0,1,0,16,16,33,0,6,48,0,11,0,56,17,33,0,7,48,6,34,0,5,32,0,7,0,55,0,11,0,47,0,20,27,27,0,48,1,14,34,0,1,34,0,7,0,55,1,15,27,16,26,27,34,0,4,17,0,21,16,7,0,77,34,0,1,0,81,11,3,0,21,16,7,32,0,1,0,61,0,50,0,11,27,0,9,0,11,0,49,0,60,27,21,16,0,44,0,9,26,16,0,38,16,6,0,62,33,0,3,48,0,40,0,4,26,0,58,17,33,0,4,48,6,0,71,0,1,0,82,17,33,0,5,33,0,6,12,2,48,6,0,59,0,11,32,0,1,17,33,0,7,48,6,34,0,1,0,7,16,33,0,8,48,6,34,0,8,0,2,32,0,4,17,0,0,0,63,17,0,5,16,33,0,9,48,6,34,0,7,0,29,16,0,42,34,0,5,26,0,50,0,23,27,16,0,22,16,32,0,4,0,3,32,0,9,17,0,5,16,1,16,0,49,0,13,0,47,0,26,27,27,16,34,0,9,1,17,0,49,0,13,0,47,0,26,27,27,16,0,13,0,11,0,59,21,0,55,0,21,0,49,0,31,0,47,0,27,0,32,20,0,51,0,42,34,0,6,26,27,27,27,27,16,11,3,0,21,16,0,28,16,0,41,0,21,0,47,0,11,27,26,16,0,44,0,0,0,49,0,71,27,0,50,0,37,27,26,16,7,34,0,1,6,0,59,0,38,16,7,34,0,1,6,0,59,0,38,16,7,34,0,2,0,84,34,0,1,0,85,11,4,0,21,16,7,1,18,33,0,3,48,6,34,0,1,32,0,3,0,73,26,16,0,42,34,0,3,0,72,26,26,16,0,42,32,1,8,26,0,21,20,0,50,0,21,27,0,52,0,12,27,34,0,2,19,7,34,0,1,32,1,3,0,89,34,0,2,32,1,7,16,11,2,32,1,9,0,88,17,17,7,0,33,0,49,32,0,1,0,21,16,27,0,30,34,0,1,0,42,0,13,26,16,0,46,0,0,26,16,21,7,0,119,0,21,34,0,1,17,0,21,0,118,17,7,34,0,2,33,0,3,33,0,4,33,0,5,33,0,6,33,0,7,33,0,8,12,2,33,0,9,12,6,48,6,0,127,0,128,0,129,0,130,0,131,11,5,0,40,0,1,26,0,71,17,0,25,0,49,0,56,27,0,42,0,29,26,0,31,21,16,33,0,10,33,0,11,33,0,12,33,0,13,12,4,48,6,1,19,33,0,14,48,6,32,0,3,34,0,7,11,2,0,42,0,29,0,49,32,0,14,27,26,16,0,42,0,25,26,0,59,0,66,11,2,17,33,0,15,33,0,16,12,2,48,6,34,0,11,0,31,32,0,15,17,33,0,17,48,0,14,0,66,17,33,0,18,48,6,34,0,14,0,29,16,0,40,0,29,0,49,32,0,18,27,0,51,0,18,0,0,0,56,21,0,40,0,31,26,32,0,3,21,27,26,33,0,17,50,6,34,0,12,0,31,32,0,15,17,0,32,0,49,0,66,27,0,51,0,56,27,16,33,0,19,48,6,32,0,17,0,1,32,0,19,17,0,46,0,0,26,16,33,0,20,48,6,32,0,20,0,32,0,66,17,0,14,0,56,17,0,38,16,6,32,0,17,0,11,0,59,17,33,0,21,48,0,2,0,49,0,2,0,49,32,0,19,27,0,46,0,0,26,20,27,16,33,0,22,48,6,34,0,19,0,8,34,0,17,17,0,29,16,0,31,0,49,0,34,0,0,32,0,20,0,50,0,31,27,21,0,30,0,48,0,31,0,49,0,30,27,27,34,0,20,0,25,0,66,17,21,27,16,33,0,23,48,6,34,0,21,0,8,16,0,24,0,49,0,13,27,32,0,23,17,33,0,24,48,6,32,0,1,1,20,34,0,9,17,33,0,25,33,0,26,33,0,27,12,3,48,6,32,0,23,1,21,16,0,13,0,55,0,40,0,31,26,27,16,0,40,0,31,26,32,0,27,0,31,32,0,24,0,46,0,0,26,16,0,40,0,1,26,0,56,17,17,17,0,25,0,66,17,33,0,28,48,6,0,67,0,21,32,0,28,17,33,0,29,48,6,32,0,23,0,18,0,22,0,31,21,34,0,18,0,1,32,0,29,17,0,31,32,0,23,17,0,13,34,0,28,17,0,15,32,0,24,17,0,29,16,17,33,0,30,48,6,32,0,22,0,22,34,0,29,17,0,0,0,63,0,68,11,2,17,0,2,32,1,14,17,0,28,16,32,1,6,16,0,31,34,0,30,17,0,45,0,40,0,41,0,27,0,50,0,21,27,0,42,0,21,26,0,134,21,0,21,20,0,47,0,11,27,26,26,26,16,33,0,31,48,6,32,0,22,0,31,34,0,23,0,29,32,0,24,17,17,0,42,0,22,0,2,32,1,14,21,0,0,32,1,16,21,0,47,32,1,11,32,1,9,0,135,21,27,26,34,0,27,17,33,0,32,48,6,32,1,15,0,2,0,57,0,59,11,2,17,0,0,34,0,1,0,13,16,34,0,22,0,44,0,6,26,16,0,0,0,57,17,11,2,0,2,32,1,14,17,17,33,0,33,48,6,32,0,33,32,1,6,16,0,41,0,22,26,0,137,0,138,11,2,17,0,21,32,1,15,0,1,16,32,1,11,16,17,0,21,32,1,19,17,32,1,12,0,136,17,0,11,16,34,0,25,32,1,3,0,135,17,0,11,16,34,0,31,0,42,0,19,0,23,0,140,21,0,21,32,1,18,21,32,1,12,0,139,21,26,16,34,0,26,0,42,0,21,26,0,19,0,42,32,1,3,26,34,0,32,21,0,48,0,23,27,0,42,0,32,0,49,0,56,27,26,21,16,0,42,32,1,3,26,32,1,22,32,1,23,11,2,17,32,1,3,32,1,21,17,11,4,0,42,0,20,26,16,0,21,16,32,1,3,32,1,20,17,32,1,13,32,1,17,0,2,0,57,17,0,0,34,0,33,17,0,39,0,57,26,0,3,0,40,0,1,26,21,0,40,0,1,26,32,1,15,0,0,32,1,17,17,21,0,40,0,21,26,0,18,21,0,49,0,6,0,49,0,69,0,59,11,2,27,27,16,17,7,34,0,1,0,20,16,0,59,0,47,0,38,27,0,11,0,20,20,0,19,0,42,34,0,0,26,0,21,20,11,4,0,53,0,16,0,5,0,58,21,27,16,7,34,0,2,34,0,4,34,0,1,11,3,7,34,0,1,0,20,16,32,1,6,0,15,0,58,17,0,55,0,42,32,1,3,26,0,21,20,27,16,0,42,0,21,0,49,0,80,27,26,16,7,32,0,1,0,15,32,1,3,17,33,0,3,48,6,34,0,2,34,0,1,11,2,0,22,0,27,0,32,20,0,51,0,7,0,49,32,1,3,27,27,0,21,0,44,0,29,0,49,32,0,3,27,0,48,32,1,3,0,50,0,3,27,0,5,20,0,50,34,0,0,27,27,26,21,11,2,0,53,34,0,3,0,44,0,10,26,16,27,16,7,32,0,1,0,7,32,1,4,17,33,0,1,49,0,2,16,33,0,3,48,6,34,0,1,0,59,0,57,11,2,0,26,16,0,29,0,49,32,0,3,27,0,48,0,2,0,49,32,1,3,27,0,50,34,0,0,0,21,32,1,4,0,50,0,3,27,0,5,20,0,50,0,23,27,21,27,27,11,2,0,53,34,0,3,0,44,0,10,26,16,27,34,0,2,19,7,0,37,0,49,0,14,0,49,34,0,1,27,0,1,0,49,0,8,0,2,0,46,0,0,26,21,27,20,27,7,32,1,3,0,19,0,2,0,12,0,49,0,13,27,21,0,40,0,31,26,0,18,21,32,1,10,17,0,0,0,56,17,0,0,32,1,3,0,13,16,0,26,16,17,33,0,0,48,6,0,19,0,32,0,66,21,0,14,0,59,21,0,55,1,22,27,33,0,1,48,6,34,0,0,0,42,0,59,26,0,21,0,56,21,32,0,1,0,13,0,50,0,21,27,21,0,24,0,13,21,16,7,34,0,2,33,0,3,33,0,4,33,0,5,33,0,6,33,0,7,12,5,48,6,32,2,25,0,13,16,33,0,8,48,6,32,0,1,0,31,32,0,6,17,32,2,26,16,0,14,0,49,32,0,8,27,0,2,0,1,21,0,0,0,19,21,34,0,4,0,0,0,58,17,0,0,34,0,8,17,17,0,40,0,31,26,32,2,27,17,33,0,9,48,6,32,0,7,0,42,0,132,26,16,33,0,10,48,6,32,0,9,0,21,32,0,10,17,33,0,11,48,6,0,62,0,0,0,75,17,0,14,32,0,1,17,0,29,16,33,0,12,48,6,32,0,1,0,31,0,49,32,0,12,27,0,51,0,133,0,31,32,0,6,0,35,34,0,12,17,17,27,16,33,0,1,49,6,32,0,1,0,33,32,2,28,17,33,0,13,48,0,12,0,49,0,13,27,32,2,28,17,33,0,14,48,0,8,16,0,29,16,33,0,15,48,6,32,0,13,0,29,32,0,14,17,0,40,0,31,26,32,2,29,17,0,40,0,21,26,33,0,11,50,6,0,56,0,1,32,0,6,17,0,21,32,0,7,17,0,21,34,0,14,0,29,16,17,0,29,32,0,11,0,42,0,13,26,16,17,0,21,32,0,15,17,0,30,16,33,0,16,48,6,34,0,11,0,21,16,0,21,32,0,1,0,31,34,0,15,17,17,0,31,32,0,16,17,33,0,17,48,6,0,56,0,21,32,2,29,0,42,0,13,26,16,17,0,31,34,0,13,17,33,0,18,48,6,32,0,17,0,29,0,49,0,13,0,47,0,26,27,0,12,32,0,18,0,44,0,0,26,16,21,0,31,34,0,16,21,27,16,33,0,19,48,6,34,0,9,32,0,7,0,0,0,56,17,0,43,0,29,26,0,24,34,0,1,0,13,16,21,0,46,0,0,26,20,0,48,0,12,0,2,0,18,21,27,32,0,6,17,0,40,0,1,26,0,56,17,0,29,34,0,18,17,0,40,0,37,26,34,0,19,17,34,0,10,11,3,0,12,16,0,28,16,0,41,0,11,26,16,33,0,20,48,6,32,1,16,0,29,32,1,24,17,0,33,32,0,6,17,33,0,21,48,6,34,0,17,34,0,20,0,31,32,0,21,17,0,57,0,3,34,0,7,0,0,34,0,6,17,17,0,31,34,0,21,17,11,3,7,32,0,1,0,30,16,33,0,3,48,0,40,0,31,26,34,0,1,17,33,0,4,48,6,32,1,15,0,13,16,0,26,16,0,31,0,49,32,0,4,0,36,16,27,0,51,32,1,13,0,31,32,1,15,17,0,31,32,0,4,17,0,14,34,0,4,0,34,16,17,0,40,0,29,26,34,0,3,17,27,16,7,32,0,1,0,31,0,49,32,0,2,0,29,34,0,1,17,27,0,51,0,42,0,56,26,27,16,32,1,1,34,0,2,0,40,0,31,26,16,17,7]
     ,[runtime[0],runtime[1],runtime[2],runtime[3],runtime[4],runtime[6],runtime[7],runtime[8],runtime[9],runtime[10],runtime[11],runtime[12],runtime[13],runtime[14],runtime[15],runtime[16],runtime[18],runtime[19],runtime[20],runtime[21],runtime[22],runtime[23],runtime[24],runtime[25],runtime[26],runtime[27],runtime[28],runtime[31],runtime[32],runtime[33],runtime[34],runtime[36],runtime[37],runtime[38],runtime[39],runtime[40],runtime[41],runtime[42],runtime[43],runtime[44],runtime[45],runtime[46],runtime[47],runtime[49],runtime[50],runtime[51],runtime[52],runtime[53],runtime[54],runtime[55],runtime[56],runtime[57],runtime[58],runtime[59],runtime[60],runtime[62],1,2,3,0,-Infinity,Infinity,10,0.5,10.84,24,-1,-1.25,0.1,512,' ','0','=','|','\"','\0',str("t"),str("<"),str(">"),str("</"),str("  "),str("/>"),str("-."),str(" "),str("=\'"),str("\'"),str("x"),str("y"),str("svg"),str("viewBox"),str("stroke=currentColor|fill=none|stroke-width=1"),str("class=code|stroke-width=1|rx=10"),str("g"),str("font-family=BQN,monospace|font-size=18px|class=Paren|fill=currentColor"),str("font-size=15px|text-anchor=middle"),str("class=codeCover|stroke-width=8|stroke-linejoin=round"),str("opacity=0.9"),str("Number"),str("¯.π∞"),str("Paren"),str("()"),str("Bracket"),str("⟨⟩"),str("Brace"),str("{}"),str("Nothing"),str("·"),str("String"),str("@"),str("Comment"),str("#"),str("Gets"),str("Ligature"),str("Separator"),str("Value"),str("Function"),str("Modifier"),str("Modifier2"),str("<tspan class=\'"),str("\'>"),str("\"&<>"),str("&"),str(";"),str("quot"),str("amp"),str("lt"),str("gt"),str("114113141111111311411413141111=111"),str("1110001100000000000222110000000111"),str("000111//23232303232000001122232111"),str("1110001111111101111111110101111111"),str("0000000011111101010000000000010000"),str("</tspan>"),str(" ⋄"),str("M VH"),str("text"),str("rect"),str("width"),str("height"),str("path"),str("d")]
     ,[[0,1,0],[0,0,1],[0,0,[[],[2]]],[0,0,3],[0,0,4],[0,0,5],[0,0,6],[0,0,[[],[7]]],[0,0,8],[0,0,[[],[9]]],[1,1,10],[0,0,11],[0,0,[[],[12]]],[0,0,13],[1,0,[[],[14]]],[0,0,15],[0,0,[[],[16]]],[0,0,17],[1,1,18],[0,1,19],[0,0,[[],[20]]],[0,0,21],[0,0,[[],[22]]]]
     ,[[0,31],[516,4],[603,8],[723,3],[736,10],[982,3],[992,3],[1002,3],[1018,4],[1069,3],[1094,2],[1124,3],[1138,34],[2058,3],[2101,5],[2113,3],[2152,4],[2242,4],[2338,2],[2368,2],[2470,22],[3000,5],[3082,3]]
    );
    let draw = (s,c) => {
      try {
        return drawEval(s,c).map(l=>l.join("")).join("\n");
      } catch(e) {
        return "Explain failed (it's a bug!)";
      }
    }
    explain = (s,c) => {
      let e = doc.explain;
      e.innerHTML = s ? draw(s,c) : '';
      setTimeout(() => {
        e.querySelectorAll('tspan').forEach(t => {
          let c = t.textContent, h = primhelp[c];
          if (!h) return;
          t.innerHTML = t.textContent+'<title>'+h+'</title>';
          t.classList.add('clickable');
          t.onclick = ev => { window.open(helpurl[c]); }
        });
      }, 0);
    }
  }
  explain(); // Clear
  setExplain = doc.doexplain.classList.toggle('selected')
             ? explain : (e=>e);
}

let makePlot,setPlot,initPlot,didInitPlot;
let startPlot = () => {
  if (!makePlot) [makePlot,initPlot,setPlot] = run(
    [0,19,33,0,0,48,33,0,1,48,6,1,1,33,0,2,48,6,1,2,33,0,3,48,6,1,3,33,0,4,48,6,1,4,33,0,5,48,6,0,20,0,43,32,0,5,27,0,31,20,0,20,0,47,34,0,5,27,1,5,11,3,0,49,0,16,0,5,0,53,21,27,33,0,6,48,6,32,0,6,32,0,6,0,38,0,21,26,0,66,21,0,21,20,0,25,0,52,21,1,6,11,3,0,49,0,16,0,5,0,53,21,27,33,0,7,48,6,0,40,1,7,26,0,21,0,79,21,33,0,8,48,6,0,52,0,50,32,0,8,0,43,0,11,27,27,0,21,20,0,46,0,21,27,33,0,9,48,6,1,8,33,0,10,48,6,32,0,6,0,37,0,22,26,0,82,0,83,11,2,21,33,0,11,48,6,32,0,9,0,43,34,0,4,27,33,0,12,48,6,1,9,33,0,13,48,6,0,60,33,0,14,48,6,0,58,0,20,0,53,17,33,0,15,48,6,0,70,33,0,16,48,6,1,10,33,0,17,48,6,1,11,33,0,18,48,6,0,87,32,0,10,16,33,0,19,48,6,0,88,32,0,10,16,33,0,20,48,6,0,89,32,0,10,16,33,0,21,48,6,0,90,32,0,10,16,33,0,22,48,6,0,92,34,0,10,0,91,17,33,0,23,48,6,0,19,0,23,0,94,21,0,21,0,18,21,32,0,12,0,93,21,33,0,24,48,6,1,12,33,0,25,48,6,1,13,33,0,26,48,6,1,14,33,0,27,48,6,34,0,27,34,0,17,34,0,18,11,3,7,0,52,0,18,34,0,2,19,0,51,0,17,0,36,0,20,26,0,52,0,53,11,2,21,0,46,0,36,0,38,0,25,0,21,0,72,21,0,21,0,24,21,26,26,27,27,33,0,3,48,6,34,0,1,32,1,1,0,45,32,1,0,0,31,0,47,34,0,3,27,20,0,21,0,45,0,11,27,0,38,0,52,26,21,27,16,7,1,15,33,0,3,48,6,0,73,32,0,2,0,74,11,3,0,21,16,33,0,4,48,6,0,75,32,0,2,0,29,0,66,0,13,34,0,2,17,0,42,0,9,26,16,17,0,74,11,3,0,21,16,33,0,5,48,6,32,0,1,0,16,16,33,0,6,48,0,11,0,52,17,33,0,7,48,6,34,0,5,32,0,7,0,51,0,11,0,43,0,20,27,27,0,44,1,16,34,0,1,34,0,7,0,51,1,17,27,16,26,27,34,0,4,17,0,21,16,7,0,73,34,0,1,0,77,11,3,0,21,16,7,32,0,1,0,57,0,46,0,11,27,0,9,0,11,0,45,0,56,27,21,16,0,40,0,9,26,16,0,34,16,6,0,58,33,0,3,48,0,36,0,4,26,0,54,17,33,0,4,48,6,0,67,0,1,0,78,17,33,0,5,33,0,6,12,2,48,6,0,55,0,11,32,0,1,17,33,0,7,48,6,34,0,1,0,7,16,33,0,8,48,6,34,0,8,0,2,32,0,4,17,0,0,0,59,17,0,5,16,33,0,9,48,6,34,0,7,0,29,16,0,38,34,0,5,26,0,46,0,23,27,16,0,22,16,32,0,4,0,3,32,0,9,17,0,5,16,1,18,0,45,0,13,0,43,0,26,27,27,16,34,0,9,1,19,0,45,0,13,0,43,0,26,27,27,16,0,13,0,11,0,55,21,0,51,0,21,0,45,0,30,0,43,0,27,0,31,20,0,47,0,38,34,0,6,26,27,27,27,27,16,11,3,0,21,16,0,28,16,0,37,0,21,0,43,0,11,27,26,16,0,40,0,0,0,45,0,67,27,0,46,0,33,27,26,16,7,34,0,1,6,0,55,0,34,16,7,34,0,1,6,0,55,0,34,16,7,34,0,2,0,80,34,0,1,0,81,11,4,0,21,16,7,1,20,33,0,3,48,6,34,0,1,32,0,3,0,69,26,16,0,38,34,0,3,0,68,26,26,16,0,38,32,1,8,26,0,21,20,0,46,0,21,27,0,48,0,12,27,34,0,2,19,7,34,0,1,32,1,3,0,85,34,0,2,32,1,7,16,11,2,32,1,9,0,84,17,17,7,34,0,0,6,0,86,33,1,16,49,7,34,0,0,6,34,0,1,33,1,16,49,7,32,0,1,0,55,0,12,0,45,0,70,27,0,20,0,43,0,40,0,9,26,27,20,11,2,0,49,0,14,0,15,0,52,21,27,0,44,0,9,0,48,0,19,27,27,32,0,2,19,0,34,0,95,17,6,32,0,1,0,17,0,31,0,61,21,0,44,0,16,27,0,48,0,52,27,32,0,2,19,0,34,0,96,17,6,34,0,1,0,52,0,50,0,19,0,23,0,18,0,48,0,17,0,31,0,61,21,0,26,20,27,21,0,11,20,27,34,0,2,19,0,20,16,7,32,0,1,0,16,0,44,0,22,27,32,0,2,19,33,0,3,48,6,34,0,1,0,35,32,0,3,26,0,14,0,52,21,0,40,0,9,26,20,0,34,0,97,21,0,18,32,1,25,21,0,38,34,0,0,26,0,20,0,43,0,21,27,20,11,2,0,49,34,0,3,0,40,0,5,26,16,0,15,0,53,17,27,34,0,2,19,7,34,0,1,32,1,26,34,0,2,19,0,12,16,0,28,16,0,5,0,6,0,45,0,1,27,0,18,21,0,62,17,33,0,3,48,6,32,0,3,0,37,0,21,0,43,0,11,27,26,16,33,0,4,48,6,1,21,33,0,5,48,6,32,0,4,0,38,0,40,0,6,26,0,22,0,40,0,5,26,21,34,0,5,20,26,16,33,0,6,48,0,38,0,42,0,36,0,1,26,26,26,16,33,0,7,48,6,32,0,7,0,38,0,31,26,0,52,17,0,40,0,36,0,3,26,26,16,0,11,0,45,0,65,27,0,10,0,12,0,45,0,64,0,3,16,27,21,0,51,0,52,27,16,33,0,8,48,6,34,0,8,0,2,0,22,0,18,21,32,1,14,17,33,0,9,48,6,0,19,0,38,1,22,26,34,0,7,0,38,0,40,1,23,26,26,16,0,31,0,45,0,52,27,0,47,1,24,27,16,21,33,0,10,48,6,34,0,4,32,0,10,16,0,2,32,0,9,17,0,12,16,0,28,16,32,1,6,16,0,33,34,0,3,0,30,16,0,38,0,13,26,16,0,29,16,17,33,0,11,48,6,0,38,1,25,32,1,24,32,1,20,21,26,0,21,0,43,0,37,0,11,26,27,0,38,0,19,0,37,0,22,26,0,101,0,102,11,2,21,0,21,32,1,21,21,32,1,12,0,100,21,26,20,11,2,0,31,32,1,16,0,11,0,47,0,32,0,45,0,86,0,98,11,2,27,27,16,17,33,0,12,48,6,32,1,15,0,0,32,0,9,17,32,1,6,16,0,37,0,22,26,0,104,0,105,11,2,17,0,21,0,53,0,3,32,1,15,17,0,1,16,32,1,11,16,17,0,21,32,1,22,17,32,1,12,0,103,17,0,11,16,0,55,34,0,10,16,0,2,0,45,0,53,0,26,16,0,36,0,39,0,14,26,26,16,27,0,18,0,43,0,27,27,0,37,0,21,26,0,2,21,32,0,9,21,32,1,6,20,0,38,0,21,26,0,107,0,37,0,21,0,45,0,106,27,26,16,21,0,37,0,21,0,43,0,11,27,26,20,0,29,0,52,0,46,0,15,27,0,9,0,15,0,45,0,55,27,21,21,16,0,38,32,1,24,0,45,32,1,19,27,26,16,34,0,11,34,0,12,16,11,3,0,38,0,20,26,16,0,21,16,32,1,3,32,1,23,17,32,1,13,32,1,15,0,2,0,53,17,0,0,34,0,9,17,0,21,32,1,15,0,1,16,17,17,7,34,0,1,0,20,16,0,55,0,43,0,34,27,0,11,0,20,20,0,19,0,38,34,0,0,26,0,21,20,11,4,0,49,0,16,0,5,0,54,21,27,16,7,34,0,2,34,0,4,34,0,1,11,3,7,34,0,1,0,20,16,32,1,6,0,15,0,54,17,0,51,0,38,32,1,3,26,0,21,20,27,16,0,38,0,21,0,45,0,76,27,26,16,7,32,0,1,0,15,32,1,3,17,33,0,3,48,6,34,0,2,34,0,1,11,2,0,22,0,27,0,31,20,0,47,0,7,0,45,32,1,3,27,27,0,21,0,40,0,29,0,45,32,0,3,27,0,44,32,1,3,0,46,0,3,27,0,5,20,0,46,34,0,0,27,27,26,21,11,2,0,49,34,0,3,0,40,0,10,26,16,27,16,7,32,0,1,0,7,32,1,4,17,33,0,1,49,0,2,16,33,0,3,48,6,34,0,1,0,55,0,53,11,2,0,26,16,0,29,0,45,32,0,3,27,0,44,0,2,0,45,32,1,3,27,0,46,34,0,0,0,21,32,1,4,0,46,0,3,27,0,5,20,0,46,0,23,27,21,27,27,11,2,0,49,34,0,3,0,40,0,10,26,16,27,34,0,2,19,7,0,33,0,45,0,14,0,45,34,0,1,27,0,1,0,45,0,8,0,2,0,42,0,0,26,21,27,20,27,7,32,0,1,0,7,16,0,40,0,6,26,0,2,0,18,21,0,63,0,3,16,17,33,0,3,48,6,34,0,1,0,55,34,0,3,11,2,0,46,0,1,27,0,47,0,41,0,6,0,22,0,5,21,26,27,16,7,34,0,1,34,0,2,16,7,0,19,0,36,0,1,26,34,0,2,23,0,36,0,3,26,34,0,1,21,7,34,0,1,0,8,20,7,34,0,1,0,52,0,50,0,38,0,21,26,27,0,99,17,0,20,16,0,21,16,0,31,0,47,0,71,27,16,7]
   ,[runtime[0],runtime[1],runtime[2],runtime[3],runtime[4],runtime[6],runtime[7],runtime[8],runtime[9],runtime[10],runtime[11],runtime[12],runtime[13],runtime[14],runtime[15],runtime[16],runtime[18],runtime[19],runtime[20],runtime[21],runtime[22],runtime[23],runtime[24],runtime[25],runtime[26],runtime[27],runtime[28],runtime[31],runtime[32],runtime[33],runtime[36],runtime[37],runtime[38],runtime[42],runtime[43],runtime[44],runtime[45],runtime[46],runtime[47],runtime[48],runtime[50],runtime[51],runtime[52],runtime[53],runtime[54],runtime[55],runtime[56],runtime[57],runtime[58],runtime[59],runtime[60],runtime[62],1,2,3,0,-Infinity,Infinity,10,0.5,384,-1,1e300,5000000000000000,4,1.5,' ','0','=','|','\0','M',str("t"),str("<"),str(">"),str("</"),str("  "),str("/>"),str("-."),str(" "),str("=\'"),str("\'"),str("x"),str("y"),str("svg"),str("viewBox"),str("line"),str("class=Paren|stroke=currentColor|stroke-width=1"),str("class=red|style=fill:none|stroke-width=1"),str("class=red|r=4"),str("class=code|stroke-width=1|rx=5"),str("g"),str("font-family=BQN,monospace|font-size=18px"),str("path"),str("d"),str("•Plot: 𝕨 and 𝕩 must consist of rows of numbers"),str("•Plot: 𝕨 and 𝕩 must have the same length"),str("•Plot: invalid depth mixing"),str("scatter"),str("L "),str("circle"),str("cx"),str("cy"),str("rect"),str("width"),str("height"),str("M "),str("VH")]
   ,[[0,1,0],[0,0,1],[0,0,[[],[2]]],[0,0,3],[0,0,4],[0,0,5],[0,0,6],[0,0,[[],[7]]],[0,0,8],[0,0,[[],[9]]],[0,0,10],[0,0,11],[0,0,12],[0,0,13],[0,0,14],[0,0,15],[1,0,[[],[16]]],[0,0,17],[0,0,[[],[18]]],[0,0,19],[1,1,20],[0,0,21],[0,0,[[],[22]]],[0,0,23],[0,0,24],[0,0,25]]
   ,[[0,28],[360,4],[447,8],[567,3],[580,10],[826,3],[836,3],[846,3],[862,4],[913,3],[938,3],[949,3],[961,3],[1085,4],[1173,13],[1739,3],[1782,5],[1794,3],[1833,4],[1923,4],[2019,2],[2049,4],[2106,3],[2114,3],[2135,3],[2142,3]]
  );
  if (!didInitPlot) { initPlot('\0'); didInitPlot=1; }
}
sysvals.plot = (x,w) => {
  startPlot();
  doc.explain.innerHTML = makePlot(x,w).map(l=>l.join("")).join("\n");
  setExplain = () => doc.explain.innerHTML = '';
  return '\0';
}
sysvals.setplot = (x,w) => { startPlot(); setPlot(x,w); }

let highlightErr = (s, e) => {
  let h = doc.highlight;
  h.style.height = doc.code.clientHeight+"px";
  let scroll = doc.code.onscroll = () => {
    h.scrollTop  = doc.code.scrollTop;
    h.scrollLeft = doc.code.scrollLeft;
  }

  clearHighlight();
  let w=e.message, is;
  while (w && (w.loc||(e.kind!=='!'&&w.sh&&w.sh[0]===2))
           && w.src.join('')===s.join('')) { [is,w]=w; }
  if (is) {
    let n, pair=0;
    if (!is.sh) { n=1; is=[is]; }
    else { n=is.sh[0]; pair=is.sh.length>1; if(pair)n*=2; }
    let l=0, sl = j=>s.slice(l,l=j).join('');
    for (let i=0; i<n; ) {
      let b=is[i++]; h.append(sl(b));
      if (pair) for (b=is[i++]; i<n&&b+1>=is[i]; i+=2) b=is[i+1];
      let m = document.createElement('mark');
      m.innerText = sl(b+1); h.append(m);
    }
    h.append(sl());
  }
  scroll();
}

let keymode=0; // 1 for prefix
let prefix='\\';
let modified=ev=>ev.shiftKey||ev.ctrlKey||ev.altKey||ev.metaKey;
doc.code.onkeydown = ev => {
  let k = ev.which;
  if (16<=k && k<=20) {
    return;
  } if (k==13 && modified(ev)) { // *-enter
    repl(); return false;
  } if (keymode) {
    keymode = 0;
    doc.kb.classList.remove('prefix');
    let c = keys[ev.key];
    if (c) return typeChar(ev.target, c, ev);
  } else if (ev.key==prefix) {
    keymode = 1;
    doc.kb.classList.add('prefix');
    return false;
  }
}
let typeChar = (t, c, ev) => {
  clearHighlight();
  let v = t.value;
  let i = t.selectionStart;
  t.value = v.slice(0,i)+c+v.slice(t.selectionEnd);
  t.selectionStart = t.selectionEnd = i+c.length;
  return false;
}

let syncls={ v:"Value", f:"Function", m:"Modifier", d:"Modifier2", n:"Number", g:"Gets", p:"Paren", b:"Bracket", k:"Brace", h:"Head", l:"Ligature", n:"Nothing", s:"Separator", c:"Comment", a:"String" };
let keydesc='f+Conjugate;Add_f-Negate;Subtract_f×Sign;Multiply_f÷Reciprocal;Divide_f⋆Exponential;Power_f√Square Root;Root_f⌊Floor;Minimum_f⌈Ceiling;Maximum_f∧Sort Up;And_f∨Sort Down;Or_f¬Not;Span_f|Absolute Value;Modulus_f≤Less Than or Equal to_f<Enclose;Less Than_f>Merge;Greater Than_f≥Greater Than or Equal to_f=Rank;Equals_f≠Length;Not Equals_f≡Depth;Match_f≢Shape;Not Match_f⊣Identity;Left_f⊢Identity;Right_f⥊Deshape;Reshape_f∾Join;Join to_f≍Solo;Couple_f⋈Enlist;Pair_f↑Prefixes;Take_f↓Suffixes;Drop_f↕Range;Windows_f«Shift Before_f»Shift After_f⌽Reverse;Rotate_f⍉Transpose;Reorder axes_f/Indices;Replicate_f⍋Grade Up;Bins Up_f⍒Grade Down;Bins Down_f⊏First Cell;Select_f⊑First;Pick_f⊐Classify;Index of_f⊒Occurrence Count;Progressive Index of_f∊Mark First;Member of_f⍷Deduplicate;Find_f⊔Group Indices;Group_f!Assert;Assert with message_m˙Constant_m˜Self/Swap_d∘Atop_d○Over_d⊸Before/Bind_d⟜After/Bind_d⌾Under_d⊘Valences_d◶Choose_d⎊Catch_d⎉Rank_m˘Cells_d⚇Depth_m¨Each_m⌜Table_d⍟Repeat_m⁼Undo_m´Fold_m˝Insert_m`Scan_g←Define_g⇐Export_g↩Change_s⋄Separator_s,Separator_v.Namespace field_p(Begin expression_p)End expression_k{Begin block_k}End block_h;Next body_h:Header_h?Predicate_b⟨Begin list_b⟩End list_l‿Strand_n·Nothing_v•System_v𝕨Left argument_f𝕎Left argument (as function)_v𝕩Right argument_f𝕏Right argument (as function)_v𝕗Modifier left operand (as subject)_f𝔽Modifier left operand_v𝕘2-modifier right operand (as subject)_f𝔾2-modifier right operand_v𝕤Current function (as subject)_f𝕊Current function_m𝕣Current modifier_n¯Minus_nπPi_n∞Infinity_a@Null character_c#Comment'.split(/[\n_]/);
let kk=Array.from('`123456890-=~!@#$%^&*()_+qwertuiop[]QWERTIOP{}asdfghjkl;ASFGHKL:"zxcvbm,./ZXVBM<>? \'');
let kv=Array.from('˜˘¨⁼⌜´˝∞¯•÷×¬⎉⚇⍟◶⊘⎊⍎⍕⟨⟩√⋆⌽𝕨∊↑∧⊔⊏⊐π←→↙𝕎⍷𝕣⍋⊑⊒⍳⊣⊢⍉𝕤↕𝕗𝕘⊸∘○⟜⋄↖𝕊𝔽𝔾«⌾»·˙⥊𝕩↓∨⌊≡∾≍≠⋈𝕏⍒⌈≢≤≥⇐‿↩');
let keys={}, revkeys={}, primhelp={}, helpurl={};
kk.map((k,i)=>{keys[k]=kv[i];revkeys[kv[i]]=k;});
doc.kb.innerHTML = keydesc
  .map(d=>'<a class="key '+syncls[d[0]]+'">'+Array.from(d)[1]+'</a>')
  .concat(['<a href="keymap.html" target="_blank" title="Link to a BQN keyboard diagram">map</a>'])
  .join("&#8203;"); // zero-width space
let setPrefix = () => {
  doc.kb.querySelectorAll("a.key").forEach((x,i) => {
    let d = keydesc[i];
    let c = Array.from(d)[1];
    let t = d.slice(1+c.length).replace(';','\n');
    let h = t.toLowerCase().replace(/ (\(.*)?/g,'')
                           .replace(/[\n/]/g,'_');
    let k = revkeys[c]; if (k) t += '\n'+prefix+(k==='"'?'&quot;':k);
    x.title = primhelp[c] = t;
    x.href = helpurl[c] = 'help/'+h+'.html';
    x.onmousedown = ev => false; // don't take focus
    x.onclick = ev => ev.button || modified(ev) ? true
                    : typeChar(doc.code, c, ev);
  });
}
setPrefix();

let appendHTML = (e,a) => e.insertAdjacentHTML('beforeend', a);
appendHTML(doc.kb, '<div class="kbext"></div>');
doc.kbext = doc.kb.querySelector('.kbext');

if (doc.demo) {
  let fonts=[["BQN386"],["DejaVu","Mod"],["Fairfax","HD"],["3270","font"],["Iosevka","Term"],["Julia","Mono"]];
  let fclass = f => f==="3270"?"f"+f:f
  let fontsel = '<select title="Select font">'+fonts.map(f =>
      '<option value="'+f[0]+'">'+f[0]+(f[1]?' '+f[1]:'')+'</option>'
    ).join("")+'select';
  appendHTML(doc.kbext, fontsel);
  doc.kbext.querySelector('select').onchange =
    e=>doc.cont.className='cont '+fclass(e.target.value);
}

appendHTML(doc.kbext, '<input class="prfx" type="text" maxlength="1" title="Configure prefix key" value="'+prefix+'"/>');
doc.kbext.querySelector(".prfx").onchange = ev => {
  prefix = ev.target.value; setPrefix();
}

if (doc.perm) doc.perm.onmouseover = doc.perm.onfocus = () => {
  let b=(new TextEncoder()).encode(doc.code.value);
  doc.perm.href='#code='+btoa(String.fromCharCode(...b));
}

let demo = 0;
if (doc.demo) doc.demo.onclick = () => {
  const demos = [
    '<⟜\'a\'⊸/ "Big Questions Notation"'
   ,'≠⌜˜ 8 ⥊ 0‿1'
   ,'+´ 1 + ↕100'
   ,'(+´ ÷ ≠) 2‿5‿7‿4'
   ,'+`-˝ "()" =⌜ "(2×(4-1)÷(√9))"'
   ,'(⊑ + ↕∘¬˜´) "CG"'
   ,'0‿1‿10‿100⊸⍋⊸⊔ ⟨6,11,9,20,105,1,¯1,4⟩'
   ,'{(+`𝕩<\'a\') ⊔ 𝕩} "camelCaseWord"'
   ,'3‿4‿2⌾(0‿0⊸⍉) 3‿3⥊¯1'
   ,'∾ (<˘ ≍¨¨ 1↓↓) "abcd"'
   ,'Life←{∨´1‿𝕩∧3‿4=+˝⥊⌽⟜𝕩¨1-˜↕3‿3}\nLife⍟(↕4) 6‿6↑(1⊸=∨5⊸≤)3‿3⥊↕9'
   ,'⥊ 1‿0‿1 ∧⌜⍟3 1'
   ,'⌈˝ (≠ ↕ 0‿0⊸∾) 1‿2‿5‿4‿0‿2‿1'
  ];
  ++demo; if (demo===demos.length) demo=0;
  doc.code.value = demos[demo]; repl();
}

if (location.hash) {
  let code, run=1, ee=0;
  location.hash.slice(1).split('&').map(s => {
    if (s.slice(0,5)==='code=') code=s.slice(5);
    if (s.slice(0,5)==='norun') run=0;
    if (s.slice(0,7)==='explain') ee=1;
  });
  if (code!==undefined) {
    let b=new Uint8Array([...atob(code)].map(c=>c.charCodeAt(0)));
    let c=doc.code.value=(new TextDecoder()).decode(b);
    setcount(c); doc.code.rows = Math.max(doc.code.rows, 1+c.split("\n").length);
    if (ee && doc.doexplain) doc.doexplain.onclick();
    nojs = () => { throw Error("Possible script injection; press Run to confirm"); }
    if (run) { sysvals.js=nojs; repl(); }
    doc.code.focus();
  }
}
