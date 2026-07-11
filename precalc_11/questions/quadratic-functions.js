/* Pre-Calculus 11 · Quadratic Functions — question bank.
   To add questions, append objects to `questions` below. Each item:
     { topic, q, options:[4 strings], answer:0, trap, tip }
   Write the CORRECT option FIRST (answer:0); the engine shuffles positions.
   `topic` must appear in `topicOrder`. Math is KaTeX \\( ... \\) — DOUBLE every backslash. */
window.UNIT = {
  meta: {
    course: "Pre-Calculus 11",
    crumb: "Quadratic Functions",
    kicker: "Quadratic Functions",
    title: "Quadratic Functions",
    storeKey: "pc11_quadfn_records_v1",
    reportTitle: "QUADRATIC FUNCTIONS — CHALLENGE TEST RESULTS",
    reportSubtitle: "Pre-Calculus 11 · Chapter 3",
    quizSize: 50
  },
  topicOrder: ["Vertex Form & Graphing","Completing the Square","Properties","Intercepts","Applications"],
  questions: [
  // ================= VERTEX FORM & GRAPHING =================
  {topic:"Vertex Form & Graphing", q:`State the vertex of \\(y=2(x-3)^{2}-5\\).`,
   options:[`\\((3,-5)\\)`,`\\((-3,-5)\\)`,`\\((3,5)\\)`,`\\((-3,5)\\)`], answer:0,
   trap:`In \\(a(x-p)^{2}+q\\) the vertex is \\((p,q)\\); the sign inside flips, so \\(x-3\\) gives \\(p=3\\).`,
   tip:`Read \\(p\\) as the value that makes the bracket zero, and \\(q\\) as the constant.`},

  {topic:"Vertex Form & Graphing", q:`State the vertex of \\(y=-\\tfrac12(x+4)^{2}+7\\).`,
   options:[`\\((-4,7)\\)`,`\\((4,7)\\)`,`\\((-4,-7)\\)`,`\\((4,-7)\\)`], answer:0,
   trap:`\\(x+4=x-(-4)\\), so \\(p=-4\\); \\(q=+7\\).`,
   tip:`A plus inside the bracket means a negative \\(p\\).`},

  {topic:"Vertex Form & Graphing", q:`The graph of \\(y=-3(x-1)^{2}+4\\) opens which way and has what extreme value?`,
   options:[`down; maximum \\(4\\)`,`up; minimum \\(4\\)`,`down; minimum \\(4\\)`,`up; maximum \\(4\\)`], answer:0,
   trap:`\\(a=-3<0\\) opens the parabola down, so the vertex value \\(q=4\\) is a maximum.`,
   tip:`\\(a<0\\) → opens down → vertex is the highest point.`},

  {topic:"Vertex Form & Graphing", q:`How is \\(y=(x+2)^{2}-3\\) obtained from \\(y=x^{2}\\)?`,
   options:[`left \\(2\\), down \\(3\\)`,`right \\(2\\), down \\(3\\)`,`left \\(2\\), up \\(3\\)`,`right \\(2\\), up \\(3\\)`], answer:0,
   trap:`\\(x+2\\) shifts LEFT (opposite sign); \\(-3\\) shifts down.`,
   tip:`Inside the bracket: opposite sign; the constant outside: as written.`},

  {topic:"Vertex Form & Graphing", q:`A parabola has vertex \\((2,-1)\\) and passes through \\((0,7)\\). Its equation is:`,
   options:[`\\(y=2(x-2)^{2}-1\\)`,`\\(y=2(x+2)^{2}-1\\)`,`\\(y=-2(x-2)^{2}-1\\)`,`\\(y=\\tfrac12(x-2)^{2}-1\\)`], answer:0,
   trap:`Sub the point: \\(7=a(0-2)^{2}-1\\Rightarrow 4a=8\\Rightarrow a=2\\).`,
   tip:`Write \\(y=a(x-2)^{2}-1\\), then plug in the extra point to find \\(a\\).`},

  {topic:"Vertex Form & Graphing", q:`\\(y=x^{2}\\) is reflected in the \\(x\\)-axis and vertically stretched by \\(3\\), vertex at the origin. The equation is:`,
   options:[`\\(y=-3x^{2}\\)`,`\\(y=3x^{2}\\)`,`\\(y=-\\tfrac13x^{2}\\)`,`\\(y=(x-3)^{2}\\)`], answer:0,
   trap:`Reflection in the \\(x\\)-axis makes \\(a\\) negative; a stretch by \\(3\\) gives \\(|a|=3\\).`,
   tip:`Reflection → negative \\(a\\); vertical stretch → \\(|a|>1\\).`},

  {topic:"Vertex Form & Graphing", q:`Compared with \\(y=x^{2}\\), the parabola \\(y=\\tfrac13(x-6)^{2}+2\\) is:`,
   options:[`wider (vertically compressed)`,`narrower (vertically stretched)`,`the same width`,`a straight line`], answer:0,
   trap:`\\(0<|a|<1\\) makes the parabola wider.`,
   tip:`\\(|a|<1\\) → wider; \\(|a|>1\\) → narrower.`},

  {topic:"Vertex Form & Graphing", q:`Find the \\(y\\)-intercept of \\(y=2(x-3)^{2}-5\\).`,
   options:[`\\(13\\)`,`\\(-5\\)`,`\\(3\\)`,`\\(18\\)`], answer:0,
   trap:`Set \\(x=0\\): \\(2(0-3)^{2}-5=2(9)-5=13\\) — the \\(-5\\) is the minimum value, not the \\(y\\)-intercept.`,
   tip:`Substitute \\(x=0\\) to get the \\(y\\)-intercept.`},

  {topic:"Vertex Form & Graphing", q:`State the axis of symmetry of \\(y=-(x+5)^{2}+1\\).`,
   options:[`\\(x=-5\\)`,`\\(x=5\\)`,`\\(x=1\\)`,`\\(y=1\\)`], answer:0,
   trap:`The axis is the vertical line \\(x=p\\), and \\(p=-5\\).`,
   tip:`Axis of symmetry: \\(x=p\\), the \\(x\\)-coordinate of the vertex.`},

  {topic:"Vertex Form & Graphing", q:`Which equation has its vertex farthest to the right?`,
   options:[`\\(y=(x-6)^{2}\\)`,`\\(y=(x-2)^{2}\\)`,`\\(y=(x+4)^{2}\\)`,`\\(y=x^{2}+3\\)`], answer:0,
   trap:`Vertices sit at \\(x=6,2,-4,0\\); the largest \\(x\\) is \\(6\\).`,
   tip:`Compare the \\(p\\)-values; the biggest \\(p\\) is farthest right.`},

  // ================= COMPLETING THE SQUARE =================
  {topic:"Completing the Square", q:`Write \\(y=x^{2}+6x+5\\) in vertex form.`,
   options:[`\\(y=(x+3)^{2}-4\\)`,`\\(y=(x+3)^{2}+4\\)`,`\\(y=(x-3)^{2}-4\\)`,`\\(y=(x+6)^{2}-31\\)`], answer:0,
   trap:`Half of \\(6\\) is \\(3\\); \\((\\tfrac{b}{2})^{2}=9\\). Add and subtract \\(9\\): \\(5-9=-4\\).`,
   tip:`\\((x+3)^{2}=x^{2}+6x+9\\), so subtract the extra \\(9\\) from the constant.`},

  {topic:"Completing the Square", q:`Write \\(y=x^{2}-8x+10\\) in vertex form.`,
   options:[`\\(y=(x-4)^{2}-6\\)`,`\\(y=(x-4)^{2}+6\\)`,`\\(y=(x+4)^{2}-6\\)`,`\\(y=(x-8)^{2}-54\\)`], answer:0,
   trap:`Half of \\(-8\\) is \\(-4\\); square is \\(16\\); \\(10-16=-6\\).`,
   tip:`\\((x-4)^{2}=x^{2}-8x+16\\); adjust the constant by \\(-16\\).`},

  {topic:"Completing the Square", q:`Write \\(y=2x^{2}+12x+7\\) in vertex form.`,
   options:[`\\(y=2(x+3)^{2}-11\\)`,`\\(y=2(x+3)^{2}+7\\)`,`\\(y=2(x+6)^{2}-11\\)`,`\\(y=2(x+3)^{2}-25\\)`], answer:0,
   trap:`Factor \\(2\\): \\(2(x^{2}+6x)+7\\). The \\(-9\\) inside is multiplied by \\(2\\Rightarrow-18\\): \\(7-18=-11\\).`,
   tip:`Factor \\(a\\) from the \\(x\\)-terms first; the subtracted square gets multiplied by \\(a\\).`},

  {topic:"Completing the Square", q:`Write \\(y=-x^{2}+4x-1\\) in vertex form.`,
   options:[`\\(y=-(x-2)^{2}+3\\)`,`\\(y=-(x-2)^{2}-3\\)`,`\\(y=-(x+2)^{2}+3\\)`,`\\(y=(x-2)^{2}+3\\)`], answer:0,
   trap:`Factor \\(-1\\): \\(-(x^{2}-4x)-1=-(x-2)^{2}+4-1\\). The inside \\(-4\\) becomes \\(+4\\) outside.`,
   tip:`Watch every sign flip when you factor out \\(-1\\).`},

  {topic:"Completing the Square", q:`Write \\(y=3x^{2}-12x+5\\) in vertex form.`,
   options:[`\\(y=3(x-2)^{2}-7\\)`,`\\(y=3(x-2)^{2}+5\\)`,`\\(y=3(x-2)^{2}-12\\)`,`\\(y=3(x-4)^{2}-7\\)`], answer:0,
   trap:`\\(3(x^{2}-4x)+5=3(x-2)^{2}-12+5=3(x-2)^{2}-7\\); the inside \\(-4\\) times \\(3\\) is \\(-12\\).`,
   tip:`\\(3\\cdot(-4)=-12\\); then \\(5-12=-7\\).`},

  {topic:"Completing the Square", q:`Write \\(y=x^{2}+3x\\) in vertex form.`,
   options:[`\\(y=(x+\\tfrac32)^{2}-\\tfrac94\\)`,`\\(y=(x+\\tfrac32)^{2}+\\tfrac94\\)`,`\\(y=(x+3)^{2}-9\\)`,`\\(y=(x+\\tfrac32)^{2}\\)`], answer:0,
   trap:`Half of \\(3\\) is \\(\\tfrac32\\); its square is \\(\\tfrac94\\), which you subtract.`,
   tip:`\\((x+\\tfrac32)^{2}=x^{2}+3x+\\tfrac94\\), so subtract \\(\\tfrac94\\).`},

  {topic:"Completing the Square", q:`Write \\(y=4x^{2}+16x+1\\) in vertex form.`,
   options:[`\\(y=4(x+2)^{2}-15\\)`,`\\(y=4(x+2)^{2}+1\\)`,`\\(y=4(x+2)^{2}-16\\)`,`\\(y=4(x+4)^{2}-15\\)`], answer:0,
   trap:`\\(4(x^{2}+4x)+1=4(x+2)^{2}-16+1=4(x+2)^{2}-15\\).`,
   tip:`The inside \\(-4\\) times \\(4\\) is \\(-16\\); then \\(1-16=-15\\).`},

  {topic:"Completing the Square", q:`The vertex of \\(y=x^{2}-10x+21\\) is:`,
   options:[`\\((5,-4)\\)`,`\\((-5,-4)\\)`,`\\((5,4)\\)`,`\\((10,21)\\)`], answer:0,
   trap:`Complete the square: \\((x-5)^{2}-4\\), so the vertex is \\((5,-4)\\).`,
   tip:`Half of \\(-10\\) is \\(-5\\); \\(21-25=-4\\).`},

  {topic:"Completing the Square", q:`The minimum value of \\(y=x^{2}-6x+11\\) is:`,
   options:[`\\(2\\)`,`\\(11\\)`,`\\(-3\\)`,`\\(3\\)`], answer:0,
   trap:`\\((x-3)^{2}+2\\); the minimum is \\(q=2\\), not the constant \\(11\\).`,
   tip:`Complete the square; the minimum value is \\(q\\).`},

  {topic:"Completing the Square", q:`Write \\(y=x^{2}+5x+4\\) in vertex form.`,
   options:[`\\(y=(x+\\tfrac52)^{2}-\\tfrac94\\)`,`\\(y=(x+\\tfrac52)^{2}+\\tfrac94\\)`,`\\(y=(x+\\tfrac52)^{2}-4\\)`,`\\(y=(x+5)^{2}-21\\)`], answer:0,
   trap:`\\((\\tfrac52)^{2}=\\tfrac{25}{4}\\); \\(4-\\tfrac{25}{4}=\\tfrac{16-25}{4}=-\\tfrac94\\).`,
   tip:`Subtract \\(\\tfrac{25}{4}\\) from \\(4\\) using a common denominator.`},

  // ================= PROPERTIES =================
  {topic:"Properties", q:`State the range of \\(y=2(x-3)^{2}-5\\).`,
   options:[`\\(y\\ge -5\\)`,`\\(y\\le -5\\)`,`\\(y\\ge 3\\)`,`all real numbers`], answer:0,
   trap:`Opens up (\\(a>0\\)) with minimum \\(q=-5\\), so \\(y\\ge-5\\).`,
   tip:`Up-parabola: \\(y\\ge q\\); down-parabola: \\(y\\le q\\).`},

  {topic:"Properties", q:`State the range of \\(y=-3(x-1)^{2}+4\\).`,
   options:[`\\(y\\le 4\\)`,`\\(y\\ge 4\\)`,`\\(y\\le 1\\)`,`all real numbers`], answer:0,
   trap:`Opens down (\\(a<0\\)) with maximum \\(q=4\\), so \\(y\\le4\\).`,
   tip:`\\(a<0\\) → the vertex value is the upper bound.`},

  {topic:"Properties", q:`The domain of any quadratic function \\(y=ax^{2}+bx+c\\) is:`,
   options:[`all real numbers`,`\\(x\\ge 0\\)`,`\\(y\\ge q\\)`,`\\(x\\ne p\\)`], answer:0,
   trap:`A parabola is defined for every \\(x\\); only the range is restricted.`,
   tip:`Domain: all reals. The restriction shows up in the range.`},

  {topic:"Properties", q:`The \\(x\\)-coordinate of the vertex of \\(y=ax^{2}+bx+c\\) is:`,
   options:[`\\(-\\tfrac{b}{2a}\\)`,`\\(\\tfrac{b}{2a}\\)`,`\\(-\\tfrac{c}{a}\\)`,`\\(\\tfrac{b}{a}\\)`], answer:0,
   trap:`The vertex/axis formula is \\(x=-\\tfrac{b}{2a}\\).`,
   tip:`Memorize \\(x=-\\tfrac{b}{2a}\\) for standard form.`},

  {topic:"Properties", q:`Find the axis of symmetry of \\(y=2x^{2}-8x+3\\).`,
   options:[`\\(x=2\\)`,`\\(x=-2\\)`,`\\(x=8\\)`,`\\(x=4\\)`], answer:0,
   trap:`\\(x=-\\tfrac{b}{2a}=-\\tfrac{-8}{2(2)}=2\\).`,
   tip:`Plug \\(a=2,\\ b=-8\\) into \\(-\\tfrac{b}{2a}\\).`},

  {topic:"Properties", q:`Find the maximum value of \\(y=-2x^{2}+8x-3\\).`,
   options:[`\\(5\\)`,`\\(-3\\)`,`\\(2\\)`,`\\(8\\)`], answer:0,
   trap:`Vertex \\(x=-\\tfrac{8}{2(-2)}=2\\); sub back: \\(-2(4)+16-3=5\\).`,
   tip:`Find \\(x=-\\tfrac{b}{2a}\\), then evaluate the function there.`},

  {topic:"Properties", q:`How many \\(x\\)-intercepts does \\(y=(x-4)^{2}+2\\) have?`,
   options:[`none`,`one`,`two`,`infinitely many`], answer:0,
   trap:`The vertex \\((4,2)\\) is above the \\(x\\)-axis and the parabola opens up, so it never crosses.`,
   tip:`Vertex above the axis + opens up → no real \\(x\\)-intercepts.`},

  {topic:"Properties", q:`How many \\(x\\)-intercepts does \\(y=-(x-1)^{2}\\) have?`,
   options:[`one`,`none`,`two`,`three`], answer:0,
   trap:`The vertex \\((1,0)\\) sits ON the \\(x\\)-axis, so there is exactly one intercept.`,
   tip:`A vertex on the axis means a single (double) root.`},

  {topic:"Properties", q:`The \\(y\\)-intercept of \\(y=ax^{2}+bx+c\\) is:`,
   options:[`\\(c\\)`,`\\(a\\)`,`\\(-\\tfrac{b}{2a}\\)`,`\\(b\\)`], answer:0,
   trap:`Set \\(x=0\\): every term but \\(c\\) vanishes.`,
   tip:`The constant term \\(c\\) is always the \\(y\\)-intercept.`},

  {topic:"Properties", q:`The minimum value of \\(y=x^{2}+4x+1\\) is:`,
   options:[`\\(-3\\)`,`\\(1\\)`,`\\(-2\\)`,`\\(3\\)`], answer:0,
   trap:`\\((x+2)^{2}-3\\); the minimum is \\(-3\\).`,
   tip:`Complete the square: \\(1-4=-3\\).`},

  {topic:"Properties", q:`If a parabola opens up with vertex \\((3,-4)\\), its range is:`,
   options:[`\\(y\\ge -4\\)`,`\\(y\\le -4\\)`,`\\(y\\ge 3\\)`,`\\(x\\ge 3\\)`], answer:0,
   trap:`Opens up → \\(-4\\) is the minimum, so \\(y\\ge-4\\).`,
   tip:`Range starts at the vertex \\(y\\)-value for an up-parabola.`},

  // ================= INTERCEPTS =================
  {topic:"Intercepts", q:`Find the \\(x\\)-intercepts of \\(y=x^{2}-5x+6\\).`,
   options:[`\\(x=2,\\ 3\\)`,`\\(x=-2,\\ -3\\)`,`\\(x=1,\\ 6\\)`,`\\(x=6\\)`], answer:0,
   trap:`Factor: \\((x-2)(x-3)=0\\Rightarrow x=2,3\\).`,
   tip:`Two numbers that multiply to \\(6\\) and add to \\(-5\\): \\(-2,-3\\).`},

  {topic:"Intercepts", q:`Find the \\(x\\)-intercepts of \\(y=x^{2}-9\\).`,
   options:[`\\(x=\\pm3\\)`,`\\(x=3\\)`,`\\(x=\\pm9\\)`,`\\(x=9\\)`], answer:0,
   trap:`\\(x^{2}=9\\Rightarrow x=\\pm3\\) (difference of squares).`,
   tip:`\\(x^{2}-9=(x-3)(x+3)\\).`},

  {topic:"Intercepts", q:`Find the \\(x\\)-intercepts of \\(y=2x^{2}-8x\\).`,
   options:[`\\(x=0,\\ 4\\)`,`\\(x=0,\\ -4\\)`,`\\(x=4\\)`,`\\(x=2,\\ 4\\)`], answer:0,
   trap:`Factor \\(2x(x-4)=0\\Rightarrow x=0\\) or \\(4\\).`,
   tip:`Always look for a common factor first; here it is \\(2x\\).`},

  {topic:"Intercepts", q:`Find the \\(y\\)-intercept of \\(y=3x^{2}-2x-5\\).`,
   options:[`\\(-5\\)`,`\\(-2\\)`,`\\(3\\)`,`\\(5\\)`], answer:0,
   trap:`Set \\(x=0\\): \\(y=-5\\).`,
   tip:`The constant term is the \\(y\\)-intercept.`},

  {topic:"Intercepts", q:`The axis of symmetry of \\(y=(x+1)(x-5)\\) is:`,
   options:[`\\(x=2\\)`,`\\(x=-2\\)`,`\\(x=3\\)`,`\\(x=1\\)`], answer:0,
   trap:`Roots are \\(-1\\) and \\(5\\); the axis is their midpoint \\(\\tfrac{-1+5}{2}=2\\).`,
   tip:`Axis of symmetry = average of the two \\(x\\)-intercepts.`},

  {topic:"Intercepts", q:`The vertex of \\(y=(x+1)(x-5)\\) is:`,
   options:[`\\((2,-9)\\)`,`\\((-2,-9)\\)`,`\\((2,9)\\)`,`\\((-1,5)\\)`], answer:0,
   trap:`Axis \\(x=2\\) (midpoint of roots); sub: \\((2+1)(2-5)=(3)(-3)=-9\\).`,
   tip:`Find the axis, then substitute to get the vertex \\(y\\)-value.`},

  {topic:"Intercepts", q:`A parabola with \\(x\\)-intercepts \\(2\\) and \\(-3\\) and leading coefficient \\(1\\) is:`,
   options:[`\\(y=(x-2)(x+3)\\)`,`\\(y=(x+2)(x-3)\\)`,`\\(y=(x-2)(x-3)\\)`,`\\(y=x^{2}-6\\)`], answer:0,
   trap:`A root at \\(2\\) gives \\((x-2)\\); a root at \\(-3\\) gives \\((x+3)\\).`,
   tip:`Factored form: \\(y=a(x-r_1)(x-r_2)\\).`},

  {topic:"Intercepts", q:`How many \\(x\\)-intercepts does \\(y=x^{2}+2x+5\\) have?`,
   options:[`none`,`one`,`two`,`three`], answer:0,
   trap:`Discriminant \\(b^{2}-4ac=4-20=-16<0\\), so no real roots.`,
   tip:`A negative discriminant means no \\(x\\)-intercepts.`},

  {topic:"Intercepts", q:`Find the \\(x\\)-intercept(s) of \\(y=x^{2}-4x+4\\).`,
   options:[`one: \\(x=2\\)`,`two: \\(x=\\pm2\\)`,`none`,`\\(x=4\\)`], answer:0,
   trap:`\\((x-2)^{2}=0\\) gives a single (double) root \\(x=2\\).`,
   tip:`A perfect-square trinomial has one repeated intercept.`},

  {topic:"Intercepts", q:`Find the \\(x\\)-intercepts of \\(y=x^{2}+x-12\\).`,
   options:[`\\(x=3,\\ -4\\)`,`\\(x=-3,\\ 4\\)`,`\\(x=2,\\ -6\\)`,`\\(x=12\\)`], answer:0,
   trap:`\\((x+4)(x-3)=0\\Rightarrow x=-4,3\\).`,
   tip:`Factors of \\(-12\\) adding to \\(+1\\): \\(+4,-3\\).`},

  // ================= APPLICATIONS =================
  {topic:"Applications", q:`A ball's height is \\(h=-5t^{2}+20t\\) (metres, seconds). Its maximum height is:`,
   options:[`\\(20\\) m`,`\\(40\\) m`,`\\(10\\) m`,`\\(4\\) m`], answer:0,
   trap:`\\(t=-\\tfrac{20}{2(-5)}=2\\); then \\(h=-5(4)+40=20\\).`,
   tip:`Time to the peak is \\(-\\tfrac{b}{2a}\\); substitute for the height.`},

  {topic:"Applications", q:`For \\(h=-5t^{2}+20t\\), the ball returns to the ground at:`,
   options:[`\\(t=4\\) s`,`\\(t=2\\) s`,`\\(t=20\\) s`,`\\(t=5\\) s`], answer:0,
   trap:`\\(-5t^{2}+20t=0\\Rightarrow -5t(t-4)=0\\Rightarrow t=0\\) or \\(4\\); landing is \\(t=4\\).`,
   tip:`Set height to zero and factor; \\(t=0\\) is the launch.`},

  {topic:"Applications", q:`Revenue is \\(R=-2x^{2}+40x\\). The price/quantity \\(x\\) that maximizes revenue is:`,
   options:[`\\(x=10\\)`,`\\(x=20\\)`,`\\(x=40\\)`,`\\(x=5\\)`], answer:0,
   trap:`\\(x=-\\tfrac{40}{2(-2)}=10\\).`,
   tip:`Maximum is at the vertex \\(x=-\\tfrac{b}{2a}\\).`},

  {topic:"Applications", q:`For \\(R=-2x^{2}+40x\\), the maximum revenue is:`,
   options:[`\\(200\\)`,`\\(400\\)`,`\\(100\\)`,`\\(20\\)`], answer:0,
   trap:`At \\(x=10\\): \\(R=-2(100)+400=200\\).`,
   tip:`Find the vertex \\(x\\), then evaluate \\(R\\).`},

  {topic:"Applications", q:`Two numbers have a sum of \\(20\\). Their greatest possible product is:`,
   options:[`\\(100\\)`,`\\(40\\)`,`\\(200\\)`,`\\(20\\)`], answer:0,
   trap:`\\(P=x(20-x)=-x^{2}+20x\\), maximized at \\(x=10\\): product \\(10\\cdot10=100\\).`,
   tip:`For a fixed sum, the product is greatest when the numbers are equal.`},

  {topic:"Applications", q:`A rectangle has a perimeter of \\(40\\) m. Its greatest possible area is:`,
   options:[`\\(100\\) m²`,`\\(40\\) m²`,`\\(400\\) m²`,`\\(80\\) m²`], answer:0,
   trap:`Width \\(+\\) length \\(=20\\); area \\(=x(20-x)\\) peaks at the square \\(10\\times10=100\\).`,
   tip:`For a fixed perimeter, a square maximizes area.`},

  {topic:"Applications", q:`For \\(h=-5t^{2}+30t+2\\), the height at \\(t=1\\) s is:`,
   options:[`\\(27\\) m`,`\\(32\\) m`,`\\(2\\) m`,`\\(37\\) m`], answer:0,
   trap:`\\(-5(1)+30(1)+2=27\\).`,
   tip:`Substitute \\(t=1\\) directly.`},

  {topic:"Applications", q:`Profit is \\(P=-(x-8)^{2}+50\\). The maximum profit is:`,
   options:[`\\(50\\)`,`\\(8\\)`,`\\(-8\\)`,`\\(58\\)`], answer:0,
   trap:`The vertex value \\(q=50\\) is the maximum (reached at \\(x=8\\)).`,
   tip:`In vertex form the maximum is \\(q\\).`},

  {topic:"Applications", q:`A parabolic arch is modelled by \\(y=-0.5(x-4)^{2}+8\\). Its greatest height is:`,
   options:[`\\(8\\)`,`\\(4\\)`,`\\(0.5\\)`,`\\(16\\)`], answer:0,
   trap:`The peak of the arch is the vertex value \\(q=8\\).`,
   tip:`Maximum height = \\(q\\) in vertex form.`},

  {topic:"Applications", q:`A firework's height is \\(h=-5(t-3)^{2}+50\\). It reaches its peak at:`,
   options:[`\\(t=3\\) s`,`\\(t=50\\) s`,`\\(t=-3\\) s`,`\\(t=5\\) s`], answer:0,
   trap:`The vertex time is \\(p=3\\); \\(50\\) is the height, not the time.`,
   tip:`In \\(a(t-p)^{2}+q\\), the peak occurs at \\(t=p\\).`}
  ]
};
