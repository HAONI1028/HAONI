/* Pre-Calculus 11 · Absolute Value & Reciprocals — question bank.
   To add questions, append objects to `questions` below. Each item:
     { topic, q, options:[4 strings], answer:0, trap, tip }
   Write the CORRECT option FIRST (answer:0); the engine shuffles positions.
   `topic` must appear in `topicOrder`. Math is KaTeX \\( ... \\) — DOUBLE every backslash. */
window.UNIT = {
  meta: {
    course: "Pre-Calculus 11",
    crumb: "Absolute Value & Reciprocals",
    kicker: "Absolute Value & Reciprocal Functions",
    title: "Absolute Value & Reciprocals",
    storeKey: "pc11_absrecip_records_v1",
    reportTitle: "ABSOLUTE VALUE & RECIPROCAL FUNCTIONS — CHALLENGE TEST RESULTS",
    reportSubtitle: "Pre-Calculus 11 · Chapter 7",
    quizSize: 50
  },
  topicOrder: ["Absolute Value","Graphing","Absolute Value Equations","Reciprocal Functions"],
  questions: [
  // ================= ABSOLUTE VALUE (EVALUATE / SIMPLIFY) =================
  {topic:"Absolute Value", q:`Evaluate \\(|{-7}|\\).`,
   options:[`\\(7\\)`,`\\(-7\\)`,`\\(0\\)`,`\\(\\pm7\\)`], answer:0,
   trap:`Absolute value is the distance from zero, always non-negative: \\(|{-7}|=7\\).`,
   tip:`\\(|a|\\ge0\\) for every \\(a\\).`},

  {topic:"Absolute Value", q:`Evaluate \\(|3-8|\\).`,
   options:[`\\(5\\)`,`\\(-5\\)`,`\\(11\\)`,`\\(-11\\)`], answer:0,
   trap:`Work inside first: \\(3-8=-5\\), then \\(|{-5}|=5\\).`,
   tip:`Simplify inside the bars before applying \\(|\\ |\\).`},

  {topic:"Absolute Value", q:`Evaluate \\(-|{-4}|\\).`,
   options:[`\\(-4\\)`,`\\(4\\)`,`\\(0\\)`,`\\(-8\\)`], answer:0,
   trap:`\\(|{-4}|=4\\), and the outside negative gives \\(-4\\).`,
   tip:`The bars act first; the leading minus stays.`},

  {topic:"Absolute Value", q:`Evaluate \\(|2-9|+|{-3}|\\).`,
   options:[`\\(10\\)`,`\\(4\\)`,`\\(-10\\)`,`\\(6\\)`], answer:0,
   trap:`\\(|{-7}|+|{-3}|=7+3=10\\).`,
   tip:`Evaluate each absolute value, then add.`},

  {topic:"Absolute Value", q:`For \\(x<0\\), \\(|x|\\) equals:`,
   options:[`\\(-x\\)`,`\\(x\\)`,`\\(0\\)`,`\\(-|x|\\)`], answer:0,
   trap:`When \\(x\\) is negative, \\(-x\\) is the positive result: \\(|x|=-x\\).`,
   tip:`\\(|x|=x\\) if \\(x\\ge0\\), and \\(-x\\) if \\(x<0\\).`},

  {topic:"Absolute Value", q:`Evaluate \\(|{-5}|\\cdot|{-2}|\\).`,
   options:[`\\(10\\)`,`\\(-10\\)`,`\\(7\\)`,`\\(3\\)`], answer:0,
   trap:`\\(5\\cdot2=10\\); both factors are positive after the bars.`,
   tip:`\\(|a|\\cdot|b|=|ab|\\).`},

  {topic:"Absolute Value", q:`Evaluate \\(|{-3}|-|{-7}|\\).`,
   options:[`\\(-4\\)`,`\\(4\\)`,`\\(10\\)`,`\\(-10\\)`], answer:0,
   trap:`\\(3-7=-4\\); the bars finish before the subtraction.`,
   tip:`\\(|{-3}|=3\\), \\(|{-7}|=7\\), then subtract.`},

  {topic:"Absolute Value", q:`Evaluate \\(|\\pi-4|\\) exactly.`,
   options:[`\\(4-\\pi\\)`,`\\(\\pi-4\\)`,`\\(\\pi+4\\)`,`\\(4+\\pi\\)`], answer:0,
   trap:`Since \\(\\pi\\approx3.14<4\\), \\(\\pi-4<0\\), so \\(|\\pi-4|=4-\\pi\\).`,
   tip:`Flip the sign when the inside is negative.`},

  {topic:"Absolute Value", q:`Simplify \\(|x-3|\\) for \\(x\\ge3\\).`,
   options:[`\\(x-3\\)`,`\\(3-x\\)`,`\\(x+3\\)`,`\\(-(x-3)\\)`], answer:0,
   trap:`For \\(x\\ge3\\) the inside \\(x-3\\ge0\\), so the bars drop unchanged.`,
   tip:`If the inside is non-negative, \\(|A|=A\\).`},

  {topic:"Absolute Value", q:`Evaluate \\(|{-2}|+|5|\\).`,
   options:[`\\(7\\)`,`\\(3\\)`,`\\(-7\\)`,`\\(10\\)`], answer:0,
   trap:`\\(2+5=7\\).`,
   tip:`Both terms become positive.`},

  // ================= GRAPHING ABSOLUTE VALUE =================
  {topic:"Graphing", q:`Find the vertex of \\(y=|x-2|+3\\).`,
   options:[`\\((2,3)\\)`,`\\((-2,3)\\)`,`\\((2,-3)\\)`,`\\((3,2)\\)`], answer:0,
   trap:`Like vertex form: \\(x-2=0\\) gives \\(x=2\\), and \\(+3\\) gives \\(y=3\\).`,
   tip:`Vertex of \\(y=|x-p|+q\\) is \\((p,q)\\).`},

  {topic:"Graphing", q:`Find the vertex of \\(y=|x+1|-4\\).`,
   options:[`\\((-1,-4)\\)`,`\\((1,-4)\\)`,`\\((-1,4)\\)`,`\\((1,4)\\)`], answer:0,
   trap:`\\(x+1=0\\Rightarrow x=-1\\); the constant \\(-4\\) gives \\(y=-4\\).`,
   tip:`A plus inside means a negative \\(x\\)-coordinate.`},

  {topic:"Graphing", q:`State the range of \\(y=|x|\\).`,
   options:[`\\(y\\ge0\\)`,`\\(y\\le0\\)`,`all real numbers`,`\\(y>0\\)`], answer:0,
   trap:`Absolute value is never negative, so \\(y\\ge0\\).`,
   tip:`The \\"V\\" sits on the \\(x\\)-axis.`},

  {topic:"Graphing", q:`The minimum value of \\(y=|x-5|\\) is:`,
   options:[`\\(0\\)`,`\\(5\\)`,`\\(-5\\)`,`\\(1\\)`], answer:0,
   trap:`The lowest point is the vertex, where \\(|0|=0\\) at \\(x=5\\).`,
   tip:`The minimum of a basic absolute-value graph is \\(q\\).`},

  {topic:"Graphing", q:`State the range of \\(y=|x|+2\\).`,
   options:[`\\(y\\ge2\\)`,`\\(y\\ge0\\)`,`\\(y\\le2\\)`,`\\(y>2\\)`], answer:0,
   trap:`The V is shifted up \\(2\\), so the smallest \\(y\\) is \\(2\\).`,
   tip:`Add the vertical shift to the base range.`},

  {topic:"Graphing", q:`State the range of \\(y=-|x|+3\\).`,
   options:[`\\(y\\le3\\)`,`\\(y\\ge3\\)`,`\\(y\\le0\\)`,`\\(y\\ge-3\\)`], answer:0,
   trap:`The \\(-|x|\\) reflects the V downward, so \\(3\\) is the maximum: \\(y\\le3\\).`,
   tip:`A negative in front opens the V downward.`},

  {topic:"Graphing", q:`Find the \\(x\\)-intercept of \\(y=|x-4|\\).`,
   options:[`\\(x=4\\)`,`\\(x=-4\\)`,`\\(x=0\\)`,`none`], answer:0,
   trap:`\\(|x-4|=0\\Rightarrow x=4\\).`,
   tip:`Set \\(y=0\\) and solve the inside \\(=0\\).`},

  {topic:"Graphing", q:`Compared with \\(y=|x|\\), the graph of \\(y=2|x|\\) is:`,
   options:[`narrower (steeper)`,`wider`,`shifted up`,`reflected`], answer:0,
   trap:`A factor of \\(2\\) makes the V steeper, so it is narrower.`,
   tip:`\\(|a|>1\\) → narrower; \\(|a|<1\\) → wider.`},

  {topic:"Graphing", q:`How many \\(x\\)-intercepts does \\(y=|x|+1\\) have?`,
   options:[`none`,`one`,`two`,`infinitely many`], answer:0,
   trap:`The minimum value is \\(1>0\\), so the graph never touches the \\(x\\)-axis.`,
   tip:`If the vertex is above the axis, there are no intercepts.`},

  {topic:"Graphing", q:`The graph of \\(y=|x+3|\\) is \\(y=|x|\\) shifted:`,
   options:[`left \\(3\\)`,`right \\(3\\)`,`up \\(3\\)`,`down \\(3\\)`], answer:0,
   trap:`\\(x+3\\) inside shifts the graph LEFT by \\(3\\).`,
   tip:`Inside the bars: opposite direction.`},

  // ================= ABSOLUTE VALUE EQUATIONS =================
  {topic:"Absolute Value Equations", q:`Solve \\(|x|=5\\).`,
   options:[`\\(x=\\pm5\\)`,`\\(x=5\\)`,`\\(x=-5\\)`,`no solution`], answer:0,
   trap:`Both \\(5\\) and \\(-5\\) have absolute value \\(5\\).`,
   tip:`\\(|x|=c\\ (c>0)\\) gives \\(x=\\pm c\\).`},

  {topic:"Absolute Value Equations", q:`Solve \\(|x-2|=3\\).`,
   options:[`\\(x=5,\\ -1\\)`,`\\(x=5,\\ 1\\)`,`\\(x=-5,\\ 1\\)`,`\\(x=3\\)`], answer:0,
   trap:`\\(x-2=3\\) or \\(x-2=-3\\Rightarrow x=5\\) or \\(-1\\).`,
   tip:`Split into the positive and negative cases.`},

  {topic:"Absolute Value Equations", q:`Solve \\(|2x-1|=7\\).`,
   options:[`\\(x=4,\\ -3\\)`,`\\(x=4,\\ 3\\)`,`\\(x=-4,\\ 3\\)`,`\\(x=4\\)`], answer:0,
   trap:`\\(2x-1=7\\Rightarrow x=4\\); \\(2x-1=-7\\Rightarrow x=-3\\).`,
   tip:`Solve both linear equations.`},

  {topic:"Absolute Value Equations", q:`Solve \\(|x+4|=0\\).`,
   options:[`\\(x=-4\\) (one solution)`,`\\(x=\\pm4\\)`,`\\(x=4\\)`,`no solution`], answer:0,
   trap:`Only \\(0\\) has absolute value \\(0\\), so \\(x+4=0\\Rightarrow x=-4\\) — a single solution.`,
   tip:`\\(|A|=0\\) means \\(A=0\\).`},

  {topic:"Absolute Value Equations", q:`Solve \\(|x|=-3\\).`,
   options:[`no solution`,`\\(x=\\pm3\\)`,`\\(x=-3\\)`,`\\(x=3\\)`], answer:0,
   trap:`Absolute value can never be negative, so there is no solution.`,
   tip:`\\(|x|=c\\) with \\(c<0\\) has no solution.`},

  {topic:"Absolute Value Equations", q:`Solve \\(|3x|=12\\).`,
   options:[`\\(x=\\pm4\\)`,`\\(x=4\\)`,`\\(x=\\pm12\\)`,`\\(x=\\pm36\\)`], answer:0,
   trap:`\\(3x=\\pm12\\Rightarrow x=\\pm4\\).`,
   tip:`Divide by \\(3\\) after splitting the cases.`},

  {topic:"Absolute Value Equations", q:`Solve \\(|x-1|=2x\\).`,
   options:[`\\(x=\\tfrac13\\)`,`\\(x=-1\\)`,`\\(x=\\tfrac13,\\ -1\\)`,`no solution`], answer:0,
   trap:`\\(x-1=2x\\Rightarrow x=-1\\) fails the check; \\(-(x-1)=2x\\Rightarrow x=\\tfrac13\\) works.`,
   tip:`With a variable on the right, always check each case.`},

  {topic:"Absolute Value Equations", q:`Solve \\(|x+5|=x-1\\).`,
   options:[`no solution`,`\\(x=-2\\)`,`\\(x=-3\\)`,`\\(x=2\\)`], answer:0,
   trap:`The only candidate \\(x=-2\\) makes the right side \\(-3<0\\), which \\(|\\ |\\) can't equal — reject.`,
   tip:`The right side must be \\(\\ge0\\); here it can't be.`},

  {topic:"Absolute Value Equations", q:`Solve \\(|2x+3|=5\\).`,
   options:[`\\(x=1,\\ -4\\)`,`\\(x=1,\\ 4\\)`,`\\(x=-1,\\ 4\\)`,`\\(x=1\\)`], answer:0,
   trap:`\\(2x+3=5\\Rightarrow x=1\\); \\(2x+3=-5\\Rightarrow x=-4\\).`,
   tip:`Two cases, two solutions.`},

  {topic:"Absolute Value Equations", q:`How many solutions does \\(|x-7|=4\\) have?`,
   options:[`two`,`one`,`none`,`four`], answer:0,
   trap:`\\(x-7=\\pm4\\) gives \\(x=11\\) and \\(x=3\\) — two solutions.`,
   tip:`\\(|A|=c\\ (c>0)\\) always gives two solutions.`},

  // ================= RECIPROCAL FUNCTIONS & ASYMPTOTES =================
  {topic:"Reciprocal Functions", q:`The vertical asymptote of \\(y=\\dfrac{1}{x}\\) is:`,
   options:[`\\(x=0\\)`,`\\(y=0\\)`,`\\(x=1\\)`,`\\(y=1\\)`], answer:0,
   trap:`The function is undefined at \\(x=0\\), giving a vertical asymptote there.`,
   tip:`Vertical asymptote: where the denominator is zero.`},

  {topic:"Reciprocal Functions", q:`The horizontal asymptote of \\(y=\\dfrac{1}{x}\\) is:`,
   options:[`\\(y=0\\)`,`\\(x=0\\)`,`\\(y=1\\)`,`\\(y=x\\)`], answer:0,
   trap:`As \\(x\\to\\pm\\infty\\), \\(\\dfrac1x\\to0\\), so \\(y=0\\).`,
   tip:`The reciprocal shrinks toward zero for large \\(x\\).`},

  {topic:"Reciprocal Functions", q:`The vertical asymptote of \\(y=\\dfrac{1}{x-3}\\) is:`,
   options:[`\\(x=3\\)`,`\\(x=-3\\)`,`\\(y=3\\)`,`\\(x=0\\)`], answer:0,
   trap:`Set the denominator to zero: \\(x-3=0\\Rightarrow x=3\\).`,
   tip:`The asymptote is where the original expression is zero.`},

  {topic:"Reciprocal Functions", q:`The vertical asymptote of \\(y=\\dfrac{1}{x+2}\\) is:`,
   options:[`\\(x=-2\\)`,`\\(x=2\\)`,`\\(y=-2\\)`,`\\(x=0\\)`], answer:0,
   trap:`\\(x+2=0\\Rightarrow x=-2\\).`,
   tip:`Solve denominator \\(=0\\).`},

  {topic:"Reciprocal Functions", q:`For \\(y=\\dfrac{1}{x-4}\\), the vertical asymptote matches where \\(y=x-4\\) equals:`,
   options:[`\\(0\\) (at \\(x=4\\))`,`\\(1\\)`,`\\(4\\)`,`\\(-4\\)`], answer:0,
   trap:`A reciprocal has a vertical asymptote where the original function is zero: \\(x=4\\).`,
   tip:`Zeros of the base become asymptotes of the reciprocal.`},

  {topic:"Reciprocal Functions", q:`As \\(x\\to\\infty\\), \\(\\dfrac{1}{x}\\) approaches:`,
   options:[`\\(0\\)`,`\\(1\\)`,`\\(\\infty\\)`,`\\(-1\\)`], answer:0,
   trap:`Larger denominators make the fraction shrink toward \\(0\\).`,
   tip:`Reciprocal of a huge number is tiny.`},

  {topic:"Reciprocal Functions", q:`The invariant points of a reciprocal graph occur where the function equals:`,
   options:[`\\(\\pm1\\)`,`\\(0\\)`,`\\(\\pm2\\)`,`its asymptote`], answer:0,
   trap:`Since \\(\\dfrac1y=y\\) only when \\(y=\\pm1\\), the graphs cross there.`,
   tip:`Invariant points sit at \\(y=1\\) and \\(y=-1\\).`},

  {topic:"Reciprocal Functions", q:`The vertical asymptotes of \\(y=\\dfrac{1}{x^{2}-4}\\) are:`,
   options:[`\\(x=\\pm2\\)`,`\\(x=2\\)`,`\\(x=\\pm4\\)`,`\\(x=0\\)`], answer:0,
   trap:`\\(x^{2}-4=0\\Rightarrow x=\\pm2\\).`,
   tip:`Factor \\(x^{2}-4=(x-2)(x+2)\\); each root is an asymptote.`},

  {topic:"Reciprocal Functions", q:`The domain of \\(y=\\dfrac{1}{x}\\) is:`,
   options:[`\\(x\\ne0\\)`,`\\(x>0\\)`,`all real numbers`,`\\(x\\ne1\\)`], answer:0,
   trap:`Only \\(x=0\\) is excluded (division by zero).`,
   tip:`Exclude the value that makes the denominator zero.`},

  {topic:"Reciprocal Functions", q:`The domain of \\(y=\\dfrac{1}{x-1}\\) is:`,
   options:[`\\(x\\ne1\\)`,`\\(x\\ne-1\\)`,`\\(x\\ne0\\)`,`all real numbers`], answer:0,
   trap:`\\(x-1=0\\Rightarrow x=1\\) is excluded.`,
   tip:`Set the denominator \\(\\ne0\\).`},

  {topic:"Reciprocal Functions", q:`The domain of \\(y=\\dfrac{1}{x+5}\\) is:`,
   options:[`\\(x\\ne-5\\)`,`\\(x\\ne5\\)`,`\\(x\\ne0\\)`,`\\(x>-5\\)`], answer:0,
   trap:`\\(x+5=0\\Rightarrow x=-5\\) is excluded.`,
   tip:`Exclude the denominator's zero.`}
  ]
};
