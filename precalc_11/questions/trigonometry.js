/* Pre-Calculus 11 · Trigonometry — question bank.
   To add questions, append objects to `questions` below. Each item:
     { topic, q, options:[4 strings], answer:0, trap, tip }
   Write the CORRECT option FIRST (answer:0); the engine shuffles positions.
   `topic` must appear in `topicOrder`. Math is KaTeX \\( ... \\) — DOUBLE every backslash. */
window.UNIT = {
  meta: {
    course: "Pre-Calculus 11",
    crumb: "Trigonometry",
    kicker: "Trigonometry",
    title: "Trigonometry",
    storeKey: "pc11_trig_records_v1",
    reportTitle: "TRIGONOMETRY — CHALLENGE TEST RESULTS",
    reportSubtitle: "Pre-Calculus 11 · Chapter 2",
    quizSize: 50
  },
  topicOrder: ["Standard Position","Exact Ratios","Solving 0°–360°","Sine Law","Cosine Law","Ambiguous Case"],
  questions: [
  // ================= ANGLES IN STANDARD POSITION =================
  {topic:"Standard Position", q:`Find the reference angle for \\(150^{\\circ}\\).`,
   options:[`\\(30^{\\circ}\\)`,`\\(150^{\\circ}\\)`,`\\(60^{\\circ}\\)`,`\\(210^{\\circ}\\)`], answer:0,
   trap:`In Quadrant II the reference angle is \\(180^{\\circ}-150^{\\circ}=30^{\\circ}\\).`,
   tip:`QII: subtract from \\(180^{\\circ}\\).`},

  {topic:"Standard Position", q:`Find the reference angle for \\(210^{\\circ}\\).`,
   options:[`\\(30^{\\circ}\\)`,`\\(60^{\\circ}\\)`,`\\(210^{\\circ}\\)`,`\\(150^{\\circ}\\)`], answer:0,
   trap:`In Quadrant III the reference angle is \\(210^{\\circ}-180^{\\circ}=30^{\\circ}\\).`,
   tip:`QIII: subtract \\(180^{\\circ}\\).`},

  {topic:"Standard Position", q:`Find the reference angle for \\(300^{\\circ}\\).`,
   options:[`\\(60^{\\circ}\\)`,`\\(30^{\\circ}\\)`,`\\(120^{\\circ}\\)`,`\\(300^{\\circ}\\)`], answer:0,
   trap:`In Quadrant IV the reference angle is \\(360^{\\circ}-300^{\\circ}=60^{\\circ}\\).`,
   tip:`QIV: subtract from \\(360^{\\circ}\\).`},

  {topic:"Standard Position", q:`In which quadrant does the terminal arm of \\(225^{\\circ}\\) lie?`,
   options:[`III`,`II`,`IV`,`I`], answer:0,
   trap:`\\(180^{\\circ}<225^{\\circ}<270^{\\circ}\\), so it is Quadrant III.`,
   tip:`QI: 0–90, QII: 90–180, QIII: 180–270, QIV: 270–360.`},

  {topic:"Standard Position", q:`In which quadrant is \\(\\sin\\theta>0\\) and \\(\\cos\\theta<0\\)?`,
   options:[`II`,`I`,`III`,`IV`], answer:0,
   trap:`Sine positive, cosine negative happens only in Quadrant II.`,
   tip:`Use CAST: only Sine is positive in QII.`},

  {topic:"Standard Position", q:`Cosine is positive in which quadrants?`,
   options:[`I and IV`,`I and II`,`II and III`,`III and IV`], answer:0,
   trap:`By CAST, cosine is positive in QI (All) and QIV (Cosine).`,
   tip:`\\(\\cos\\theta=\\tfrac{x}{r}\\) is positive where \\(x>0\\).`},

  {topic:"Standard Position", q:`The point \\((-3,4)\\) lies on the terminal arm of \\(\\theta\\). Then \\(r=\\)`,
   options:[`\\(5\\)`,`\\(7\\)`,`\\(1\\)`,`\\(25\\)`], answer:0,
   trap:`\\(r=\\sqrt{(-3)^{2}+4^{2}}=\\sqrt{9+16}=5\\).`,
   tip:`\\(r=\\sqrt{x^{2}+y^{2}}\\) is always positive.`},

  {topic:"Standard Position", q:`For the point \\((-3,4)\\) on the terminal arm, \\(\\cos\\theta=\\)`,
   options:[`\\(-\\tfrac35\\)`,`\\(\\tfrac35\\)`,`\\(-\\tfrac45\\)`,`\\(\\tfrac45\\)`], answer:0,
   trap:`\\(\\cos\\theta=\\tfrac{x}{r}=\\tfrac{-3}{5}\\).`,
   tip:`Cosine uses the \\(x\\)-coordinate over \\(r\\).`},

  {topic:"Standard Position", q:`If \\(\\theta\\) terminates in Quadrant III, then \\(\\tan\\theta\\) is:`,
   options:[`positive`,`negative`,`zero`,`undefined`], answer:0,
   trap:`In QIII both \\(x<0\\) and \\(y<0\\), so \\(\\tan\\theta=\\tfrac{y}{x}>0\\).`,
   tip:`Tangent is positive in QI and QIII.`},

  // ================= REFERENCE ANGLES & EXACT RATIOS =================
  {topic:"Exact Ratios", q:`Evaluate \\(\\sin 30^{\\circ}\\).`,
   options:[`\\(\\tfrac12\\)`,`\\(\\tfrac{\\sqrt3}{2}\\)`,`\\(\\tfrac{\\sqrt2}{2}\\)`,`\\(1\\)`], answer:0,
   trap:`From the \\(30\\)-\\(60\\)-\\(90\\) triangle, \\(\\sin30^{\\circ}=\\tfrac12\\).`,
   tip:`\\(\\sin30^{\\circ}=\\tfrac12\\), \\(\\sin60^{\\circ}=\\tfrac{\\sqrt3}{2}\\).`},

  {topic:"Exact Ratios", q:`Evaluate \\(\\cos 60^{\\circ}\\).`,
   options:[`\\(\\tfrac12\\)`,`\\(\\tfrac{\\sqrt3}{2}\\)`,`\\(\\tfrac{\\sqrt2}{2}\\)`,`\\(0\\)`], answer:0,
   trap:`\\(\\cos60^{\\circ}=\\tfrac12\\) (same as \\(\\sin30^{\\circ}\\)).`,
   tip:`\\(\\cos60^{\\circ}=\\sin30^{\\circ}=\\tfrac12\\).`},

  {topic:"Exact Ratios", q:`Evaluate \\(\\tan 45^{\\circ}\\).`,
   options:[`\\(1\\)`,`\\(0\\)`,`\\(\\tfrac{\\sqrt2}{2}\\)`,`\\(\\sqrt3\\)`], answer:0,
   trap:`The \\(45\\)-\\(45\\)-\\(90\\) triangle has equal legs, so \\(\\tan45^{\\circ}=1\\).`,
   tip:`Opposite = adjacent at \\(45^{\\circ}\\).`},

  {topic:"Exact Ratios", q:`Evaluate \\(\\sin 60^{\\circ}\\).`,
   options:[`\\(\\tfrac{\\sqrt3}{2}\\)`,`\\(\\tfrac12\\)`,`\\(\\tfrac{\\sqrt2}{2}\\)`,`\\(\\sqrt3\\)`], answer:0,
   trap:`\\(\\sin60^{\\circ}=\\tfrac{\\sqrt3}{2}\\).`,
   tip:`The larger acute angle has the larger sine.`},

  {topic:"Exact Ratios", q:`Evaluate \\(\\sin 45^{\\circ}\\).`,
   options:[`\\(\\tfrac{\\sqrt2}{2}\\)`,`\\(\\tfrac12\\)`,`\\(\\tfrac{\\sqrt3}{2}\\)`,`\\(1\\)`], answer:0,
   trap:`\\(\\sin45^{\\circ}=\\tfrac{1}{\\sqrt2}=\\tfrac{\\sqrt2}{2}\\).`,
   tip:`Rationalize \\(\\tfrac{1}{\\sqrt2}\\) to \\(\\tfrac{\\sqrt2}{2}\\).`},

  {topic:"Exact Ratios", q:`Evaluate \\(\\cos 150^{\\circ}\\).`,
   options:[`\\(-\\tfrac{\\sqrt3}{2}\\)`,`\\(\\tfrac{\\sqrt3}{2}\\)`,`\\(-\\tfrac12\\)`,`\\(\\tfrac12\\)`], answer:0,
   trap:`Reference angle \\(30^{\\circ}\\) in QII, where cosine is negative: \\(-\\tfrac{\\sqrt3}{2}\\).`,
   tip:`\\(\\cos150^{\\circ}=-\\cos30^{\\circ}\\).`},

  {topic:"Exact Ratios", q:`Evaluate \\(\\sin 210^{\\circ}\\).`,
   options:[`\\(-\\tfrac12\\)`,`\\(\\tfrac12\\)`,`\\(-\\tfrac{\\sqrt3}{2}\\)`,`\\(\\tfrac{\\sqrt3}{2}\\)`], answer:0,
   trap:`Reference angle \\(30^{\\circ}\\) in QIII, where sine is negative: \\(-\\tfrac12\\).`,
   tip:`\\(\\sin210^{\\circ}=-\\sin30^{\\circ}\\).`},

  {topic:"Exact Ratios", q:`Evaluate \\(\\tan 135^{\\circ}\\).`,
   options:[`\\(-1\\)`,`\\(1\\)`,`\\(-\\sqrt3\\)`,`\\(0\\)`], answer:0,
   trap:`Reference angle \\(45^{\\circ}\\) in QII, where tangent is negative: \\(-1\\).`,
   tip:`\\(\\tan135^{\\circ}=-\\tan45^{\\circ}\\).`},

  {topic:"Exact Ratios", q:`Evaluate \\(\\cos 240^{\\circ}\\).`,
   options:[`\\(-\\tfrac12\\)`,`\\(\\tfrac12\\)`,`\\(-\\tfrac{\\sqrt3}{2}\\)`,`\\(\\tfrac{\\sqrt3}{2}\\)`], answer:0,
   trap:`Reference angle \\(60^{\\circ}\\) in QIII, where cosine is negative: \\(-\\tfrac12\\).`,
   tip:`\\(\\cos240^{\\circ}=-\\cos60^{\\circ}\\).`},

  {topic:"Exact Ratios", q:`Evaluate \\(\\sin 300^{\\circ}\\).`,
   options:[`\\(-\\tfrac{\\sqrt3}{2}\\)`,`\\(\\tfrac{\\sqrt3}{2}\\)`,`\\(-\\tfrac12\\)`,`\\(\\tfrac12\\)`], answer:0,
   trap:`Reference angle \\(60^{\\circ}\\) in QIV, where sine is negative: \\(-\\tfrac{\\sqrt3}{2}\\).`,
   tip:`\\(\\sin300^{\\circ}=-\\sin60^{\\circ}\\).`},

  {topic:"Exact Ratios", q:`Evaluate \\(\\cos 180^{\\circ}\\).`,
   options:[`\\(-1\\)`,`\\(1\\)`,`\\(0\\)`,`\\(-\\tfrac12\\)`], answer:0,
   trap:`At \\(180^{\\circ}\\) the point is \\((-1,0)\\), so \\(\\cos180^{\\circ}=-1\\).`,
   tip:`Quadrantal angle: read the coordinates on the unit circle.`},

  // ================= SOLVING 0-360 =================
  {topic:"Solving 0°–360°", q:`Solve \\(\\sin\\theta=\\tfrac12\\) for \\(0^{\\circ}\\le\\theta<360^{\\circ}\\).`,
   options:[`\\(\\theta=30^{\\circ},\\ 150^{\\circ}\\)`,`\\(\\theta=30^{\\circ},\\ 330^{\\circ}\\)`,`\\(\\theta=60^{\\circ},\\ 120^{\\circ}\\)`,`\\(\\theta=30^{\\circ}\\)`], answer:0,
   trap:`Sine is positive in QI and QII: reference \\(30^{\\circ}\\) gives \\(30^{\\circ}\\) and \\(150^{\\circ}\\).`,
   tip:`Positive sine → QI and QII.`},

  {topic:"Solving 0°–360°", q:`Solve \\(\\cos\\theta=-\\tfrac12\\) for \\(0^{\\circ}\\le\\theta<360^{\\circ}\\).`,
   options:[`\\(\\theta=120^{\\circ},\\ 240^{\\circ}\\)`,`\\(\\theta=60^{\\circ},\\ 300^{\\circ}\\)`,`\\(\\theta=120^{\\circ},\\ 300^{\\circ}\\)`,`\\(\\theta=60^{\\circ},\\ 120^{\\circ}\\)`], answer:0,
   trap:`Cosine negative in QII and QIII: reference \\(60^{\\circ}\\) gives \\(120^{\\circ}\\) and \\(240^{\\circ}\\).`,
   tip:`Negative cosine → QII and QIII.`},

  {topic:"Solving 0°–360°", q:`Solve \\(\\tan\\theta=1\\) for \\(0^{\\circ}\\le\\theta<360^{\\circ}\\).`,
   options:[`\\(\\theta=45^{\\circ},\\ 225^{\\circ}\\)`,`\\(\\theta=45^{\\circ},\\ 135^{\\circ}\\)`,`\\(\\theta=135^{\\circ},\\ 315^{\\circ}\\)`,`\\(\\theta=45^{\\circ}\\)`], answer:0,
   trap:`Tangent positive in QI and QIII: reference \\(45^{\\circ}\\) gives \\(45^{\\circ}\\) and \\(225^{\\circ}\\).`,
   tip:`Positive tangent → QI and QIII.`},

  {topic:"Solving 0°–360°", q:`Solve \\(\\sin\\theta=-\\tfrac{\\sqrt3}{2}\\) for \\(0^{\\circ}\\le\\theta<360^{\\circ}\\).`,
   options:[`\\(\\theta=240^{\\circ},\\ 300^{\\circ}\\)`,`\\(\\theta=60^{\\circ},\\ 120^{\\circ}\\)`,`\\(\\theta=210^{\\circ},\\ 330^{\\circ}\\)`,`\\(\\theta=120^{\\circ},\\ 240^{\\circ}\\)`], answer:0,
   trap:`Sine negative in QIII and QIV: reference \\(60^{\\circ}\\) gives \\(240^{\\circ}\\) and \\(300^{\\circ}\\).`,
   tip:`Negative sine → QIII and QIV.`},

  {topic:"Solving 0°–360°", q:`Solve \\(\\cos\\theta=\\tfrac{\\sqrt2}{2}\\) for \\(0^{\\circ}\\le\\theta<360^{\\circ}\\).`,
   options:[`\\(\\theta=45^{\\circ},\\ 315^{\\circ}\\)`,`\\(\\theta=45^{\\circ},\\ 135^{\\circ}\\)`,`\\(\\theta=135^{\\circ},\\ 225^{\\circ}\\)`,`\\(\\theta=45^{\\circ}\\)`], answer:0,
   trap:`Cosine positive in QI and QIV: reference \\(45^{\\circ}\\) gives \\(45^{\\circ}\\) and \\(315^{\\circ}\\).`,
   tip:`Positive cosine → QI and QIV.`},

  {topic:"Solving 0°–360°", q:`Solve \\(2\\sin\\theta-1=0\\) for \\(0^{\\circ}\\le\\theta<360^{\\circ}\\).`,
   options:[`\\(\\theta=30^{\\circ},\\ 150^{\\circ}\\)`,`\\(\\theta=60^{\\circ},\\ 120^{\\circ}\\)`,`\\(\\theta=30^{\\circ},\\ 330^{\\circ}\\)`,`\\(\\theta=45^{\\circ},\\ 135^{\\circ}\\)`], answer:0,
   trap:`Isolate first: \\(\\sin\\theta=\\tfrac12\\Rightarrow\\theta=30^{\\circ},150^{\\circ}\\).`,
   tip:`Isolate the trig ratio before finding angles.`},

  {topic:"Solving 0°–360°", q:`Solve \\(\\tan\\theta=-\\sqrt3\\) for \\(0^{\\circ}\\le\\theta<360^{\\circ}\\).`,
   options:[`\\(\\theta=120^{\\circ},\\ 300^{\\circ}\\)`,`\\(\\theta=60^{\\circ},\\ 240^{\\circ}\\)`,`\\(\\theta=150^{\\circ},\\ 330^{\\circ}\\)`,`\\(\\theta=60^{\\circ},\\ 120^{\\circ}\\)`], answer:0,
   trap:`Reference \\(60^{\\circ}\\) (since \\(\\tan60^{\\circ}=\\sqrt3\\)); tangent negative in QII and QIV → \\(120^{\\circ},300^{\\circ}\\).`,
   tip:`Negative tangent → QII and QIV.`},

  {topic:"Solving 0°–360°", q:`Solve \\(\\cos\\theta=1\\) for \\(0^{\\circ}\\le\\theta<360^{\\circ}\\).`,
   options:[`\\(\\theta=0^{\\circ}\\)`,`\\(\\theta=90^{\\circ}\\)`,`\\(\\theta=180^{\\circ}\\)`,`\\(\\theta=0^{\\circ},\\ 360^{\\circ}\\)`], answer:0,
   trap:`\\(\\cos\\theta=1\\) only at \\(\\theta=0^{\\circ}\\); \\(360^{\\circ}\\) is outside the interval.`,
   tip:`Quadrantal solution on the positive \\(x\\)-axis.`},

  {topic:"Solving 0°–360°", q:`Solve \\(\\sin\\theta=1\\) for \\(0^{\\circ}\\le\\theta<360^{\\circ}\\).`,
   options:[`\\(\\theta=90^{\\circ}\\)`,`\\(\\theta=0^{\\circ}\\)`,`\\(\\theta=270^{\\circ}\\)`,`\\(\\theta=90^{\\circ},\\ 270^{\\circ}\\)`], answer:0,
   trap:`Sine reaches its maximum \\(1\\) only at \\(\\theta=90^{\\circ}\\).`,
   tip:`\\(\\sin\\theta=1\\) at the top of the unit circle.`},

  // ================= SINE LAW =================
  {topic:"Sine Law", q:`The sine law states:`,
   options:[`\\(\\dfrac{a}{\\sin A}=\\dfrac{b}{\\sin B}=\\dfrac{c}{\\sin C}\\)`,`\\(a^{2}=b^{2}+c^{2}-2bc\\cos A\\)`,`\\(\\dfrac{\\sin A}{\\sin B}=\\dfrac{b}{a}\\)`,`\\(a\\sin A=b\\sin B\\)`], answer:0,
   trap:`Each side is proportional to the sine of its opposite angle.`,
   tip:`Side over sine of the opposite angle is constant.`},

  {topic:"Sine Law", q:`In \\(\\triangle ABC\\), \\(A=40^{\\circ}\\), \\(a=10\\), \\(B=60^{\\circ}\\). Find \\(b\\).`,
   options:[`\\(\\approx 13.5\\)`,`\\(\\approx 7.4\\)`,`\\(\\approx 15.0\\)`,`\\(\\approx 11.6\\)`], answer:0,
   trap:`\\(b=\\dfrac{a\\sin B}{\\sin A}=\\dfrac{10\\sin60^{\\circ}}{\\sin40^{\\circ}}\\approx13.5\\).`,
   tip:`Pair each side with its opposite angle.`},

  {topic:"Sine Law", q:`In \\(\\triangle ABC\\), \\(A=45^{\\circ}\\), \\(a=8\\), \\(B=60^{\\circ}\\). Find \\(b\\).`,
   options:[`\\(\\approx 9.8\\)`,`\\(\\approx 6.5\\)`,`\\(\\approx 11.3\\)`,`\\(\\approx 8.0\\)`], answer:0,
   trap:`\\(b=\\dfrac{8\\sin60^{\\circ}}{\\sin45^{\\circ}}\\approx9.8\\).`,
   tip:`\\(\\sin60^{\\circ}>\\sin45^{\\circ}\\), so \\(b>a\\).`},

  {topic:"Sine Law", q:`In \\(\\triangle ABC\\), \\(a=12\\), \\(A=50^{\\circ}\\), \\(b=10\\). Find \\(B\\).`,
   options:[`\\(\\approx 40^{\\circ}\\)`,`\\(\\approx 50^{\\circ}\\)`,`\\(\\approx 60^{\\circ}\\)`,`\\(\\approx 25^{\\circ}\\)`], answer:0,
   trap:`\\(\\sin B=\\dfrac{10\\sin50^{\\circ}}{12}\\approx0.638\\Rightarrow B\\approx40^{\\circ}\\).`,
   tip:`Solve for \\(\\sin B\\) first, then take the inverse.`},

  {topic:"Sine Law", q:`In \\(\\triangle ABC\\), \\(a=15\\), \\(A=40^{\\circ}\\), \\(C=75^{\\circ}\\). Find \\(b\\).`,
   options:[`\\(\\approx 21.1\\)`,`\\(\\approx 18.0\\)`,`\\(\\approx 15.0\\)`,`\\(\\approx 23.3\\)`], answer:0,
   trap:`\\(B=180^{\\circ}-40^{\\circ}-75^{\\circ}=65^{\\circ}\\); \\(b=\\dfrac{15\\sin65^{\\circ}}{\\sin40^{\\circ}}\\approx21.1\\).`,
   tip:`Find the third angle first with the angle sum.`},

  {topic:"Sine Law", q:`The sine law is the tool of choice when you know:`,
   options:[`an angle and its opposite side`,`three sides only`,`two sides and the included angle`,`the two shorter sides`], answer:0,
   trap:`Sine law needs a complete side–opposite-angle pair.`,
   tip:`Cosine law handles SSS and SAS; sine law handles the rest.`},

  // ================= COSINE LAW =================
  {topic:"Cosine Law", q:`The cosine law states:`,
   options:[`\\(c^{2}=a^{2}+b^{2}-2ab\\cos C\\)`,`\\(c^{2}=a^{2}+b^{2}+2ab\\cos C\\)`,`\\(c=a+b-2ab\\cos C\\)`,`\\(\\dfrac{c}{\\sin C}=\\dfrac{a}{\\sin A}\\)`], answer:0,
   trap:`It is \\(a^{2}+b^{2}\\) minus \\(2ab\\cos C\\), where \\(C\\) is opposite \\(c\\).`,
   tip:`A Pythagorean-like law with a \\(-2ab\\cos C\\) correction.`},

  {topic:"Cosine Law", q:`In \\(\\triangle ABC\\), \\(a=5\\), \\(b=7\\), \\(C=60^{\\circ}\\). Find \\(c\\).`,
   options:[`\\(\\approx 6.2\\)`,`\\(\\approx 8.6\\)`,`\\(\\approx 5.0\\)`,`\\(\\approx 12\\)`], answer:0,
   trap:`\\(c^{2}=25+49-2(5)(7)\\cos60^{\\circ}=74-35=39\\Rightarrow c\\approx6.2\\).`,
   tip:`\\(\\cos60^{\\circ}=\\tfrac12\\), so the correction is \\(35\\).`},

  {topic:"Cosine Law", q:`In \\(\\triangle ABC\\), \\(a=4\\), \\(b=5\\), \\(c=6\\). Find angle \\(C\\).`,
   options:[`\\(\\approx 82.8^{\\circ}\\)`,`\\(\\approx 60^{\\circ}\\)`,`\\(\\approx 97.2^{\\circ}\\)`,`\\(\\approx 41.4^{\\circ}\\)`], answer:0,
   trap:`\\(\\cos C=\\dfrac{16+25-36}{2(4)(5)}=\\dfrac{5}{40}=0.125\\Rightarrow C\\approx82.8^{\\circ}\\).`,
   tip:`Rearrange the cosine law to \\(\\cos C=\\dfrac{a^{2}+b^{2}-c^{2}}{2ab}\\).`},

  {topic:"Cosine Law", q:`Find the largest angle of a triangle with sides \\(3\\), \\(5\\), \\(7\\).`,
   options:[`\\(120^{\\circ}\\)`,`\\(90^{\\circ}\\)`,`\\(60^{\\circ}\\)`,`\\(150^{\\circ}\\)`], answer:0,
   trap:`The largest angle faces the side \\(7\\): \\(\\cos\\theta=\\dfrac{9+25-49}{30}=-0.5\\Rightarrow\\theta=120^{\\circ}\\).`,
   tip:`The largest angle is opposite the longest side.`},

  {topic:"Cosine Law", q:`In \\(\\triangle ABC\\), \\(b=10\\), \\(c=12\\), \\(A=45^{\\circ}\\). Find \\(a\\).`,
   options:[`\\(\\approx 8.6\\)`,`\\(\\approx 15.6\\)`,`\\(\\approx 11.0\\)`,`\\(\\approx 6.2\\)`], answer:0,
   trap:`\\(a^{2}=100+144-2(10)(12)\\cos45^{\\circ}\\approx74.3\\Rightarrow a\\approx8.6\\).`,
   tip:`Use the sides and their included angle \\(A\\).`},

  {topic:"Cosine Law", q:`Use the cosine law when you are given:`,
   options:[`two sides and the included angle`,`an angle and its opposite side`,`three angles`,`one side and one angle`], answer:0,
   trap:`Cosine law handles SAS (and SSS); sine law needs a side–opposite-angle pair.`,
   tip:`SAS or SSS → cosine law.`},

  {topic:"Cosine Law", q:`In \\(\\triangle ABC\\), \\(a=8\\), \\(b=6\\), \\(C=90^{\\circ}\\). Find \\(c\\).`,
   options:[`\\(10\\)`,`\\(14\\)`,`\\(\\approx 11.7\\)`,`\\(\\approx 7.2\\)`], answer:0,
   trap:`\\(\\cos90^{\\circ}=0\\), so the cosine law reduces to \\(c^{2}=64+36=100\\Rightarrow c=10\\).`,
   tip:`At \\(90^{\\circ}\\) the cosine law becomes the Pythagorean theorem.`},

  // ================= AMBIGUOUS CASE =================
  {topic:"Ambiguous Case", q:`In the ambiguous (SSA) case, the number of possible triangles is:`,
   options:[`\\(0\\), \\(1\\), or \\(2\\)`,`always \\(1\\)`,`always \\(2\\)`,`\\(1\\) or \\(3\\)`], answer:0,
   trap:`Depending on the height \\(h=b\\sin A\\), SSA can give no triangle, one, or two.`,
   tip:`Compare \\(a\\) with \\(h\\) and \\(b\\).`},

  {topic:"Ambiguous Case", q:`Given \\(A=30^{\\circ}\\), \\(a=5\\), \\(b=8\\) (so \\(h=b\\sin A=4\\)). How many triangles?`,
   options:[`two`,`one`,`none`,`three`], answer:0,
   trap:`Since \\(h=4<a=5<b=8\\), the side \\(a\\) can close in two ways → two triangles.`,
   tip:`\\(h<a<b\\) (with \\(A\\) acute) → two triangles.`},

  {topic:"Ambiguous Case", q:`Given \\(A=30^{\\circ}\\), \\(a=3\\), \\(b=8\\) (so \\(h=4\\)). How many triangles?`,
   options:[`none`,`one`,`two`,`infinitely many`], answer:0,
   trap:`\\(a=3<h=4\\): the side is too short to reach the base, so no triangle forms.`,
   tip:`\\(a<h\\) → no triangle.`},

  {topic:"Ambiguous Case", q:`Given \\(A=30^{\\circ}\\), \\(a=4\\), \\(b=8\\) (so \\(h=4\\)). How many triangles?`,
   options:[`one (right triangle)`,`two`,`none`,`three`], answer:0,
   trap:`\\(a=h=4\\): the side just reaches the base perpendicularly → exactly one right triangle.`,
   tip:`\\(a=h\\) → one right triangle.`},

  {topic:"Ambiguous Case", q:`In an SSA situation with \\(A\\) acute and \\(a\\ge b\\), the number of triangles is:`,
   options:[`exactly one`,`zero`,`exactly two`,`three`], answer:0,
   trap:`When \\(a\\ge b\\), the longer side forces a single triangle.`,
   tip:`\\(a\\ge b\\) → one triangle.`},

  {topic:"Ambiguous Case", q:`The ambiguous case arises when you are given:`,
   options:[`two sides and a non-included angle`,`two sides and the included angle`,`three sides`,`two angles and a side`], answer:0,
   trap:`SSA (a non-included angle) is the configuration that can yield more than one triangle.`,
   tip:`\\"Non-included angle\\" is the giveaway for the ambiguous case.`}
  ]
};
