/* Pre-Calculus 11 · Inequalities — question bank.
   To add questions, append objects to `questions` below. Each item:
     { topic, q, options:[4 strings], answer:0, trap, tip }
   Write the CORRECT option FIRST (answer:0); the engine shuffles positions.
   `topic` must appear in `topicOrder`. Math is KaTeX \\( ... \\) — DOUBLE every backslash. */
window.UNIT = {
  meta: {
    course: "Pre-Calculus 11",
    crumb: "Inequalities",
    kicker: "Linear & Quadratic Inequalities",
    title: "Inequalities",
    storeKey: "pc11_inequalities_records_v1",
    reportTitle: "LINEAR & QUADRATIC INEQUALITIES — CHALLENGE TEST RESULTS",
    reportSubtitle: "Pre-Calculus 11 · Chapter 9",
    quizSize: 50
  },
  topicOrder: ["Linear (2 variables)","Quadratic (1 variable)","Quadratic (2 variables)","Applications"],
  questions: [
  // ================= LINEAR INEQUALITIES (2 VARIABLES) =================
  {topic:"Linear (2 variables)", q:`The boundary line for \\(y>2x+1\\) is drawn:`,
   options:[`dashed`,`solid`,`dotted then solid`,`not drawn`], answer:0,
   trap:`A strict inequality (\\(>\\)) excludes the boundary, so it is dashed.`,
   tip:`\\(<,>\\) → dashed; \\(\\le,\\ge\\) → solid.`},

  {topic:"Linear (2 variables)", q:`The boundary line for \\(y\\le x-3\\) is drawn:`,
   options:[`solid`,`dashed`,`dotted`,`not drawn`], answer:0,
   trap:`\\(\\le\\) includes the boundary, so the line is solid.`,
   tip:`\\"Or equal to\\" → solid line.`},

  {topic:"Linear (2 variables)", q:`Is \\((0,0)\\) a solution of \\(y<x+2\\)?`,
   options:[`yes`,`no`,`only on the line`,`cannot tell`], answer:0,
   trap:`\\(0<0+2=2\\) is true, so \\((0,0)\\) is a solution.`,
   tip:`Test the point by substitution.`},

  {topic:"Linear (2 variables)", q:`For \\(y>2x\\), you shade the region:`,
   options:[`above the line`,`below the line`,`left of the line`,`on the line only`], answer:0,
   trap:`\\(y>\\) means \\(y\\) is greater, so shade above the boundary.`,
   tip:`Test \\((0,1)\\): \\(1>0\\) is true, and \\((0,1)\\) is above the line.`},

  {topic:"Linear (2 variables)", q:`For \\(y<-x+4\\), you shade the region:`,
   options:[`below the line`,`above the line`,`right of the line`,`on the line only`], answer:0,
   trap:`\\(y<\\) means \\(y\\) is smaller, so shade below the boundary.`,
   tip:`Test the origin: \\(0<4\\) is true, and it lies below the line.`},

  {topic:"Linear (2 variables)", q:`Is \\((1,1)\\) a solution of \\(y\\ge3x-1\\)?`,
   options:[`no`,`yes`,`only if \\(x=0\\)`,`cannot tell`], answer:0,
   trap:`\\(3(1)-1=2\\), and \\(1\\ge2\\) is false.`,
   tip:`Substitute and compare.`},

  {topic:"Linear (2 variables)", q:`The graph of \\(x>2\\) (in two variables) is:`,
   options:[`the region right of the dashed line \\(x=2\\)`,`the region left of \\(x=2\\)`,`the single line \\(x=2\\)`,`the region below \\(y=2\\)`], answer:0,
   trap:`\\(x>2\\) shades everything to the right of a dashed vertical line.`,
   tip:`No \\(y\\) means a vertical boundary.`},

  {topic:"Linear (2 variables)", q:`The graph of \\(y\\le2\\) is:`,
   options:[`on and below the solid line \\(y=2\\)`,`above the line \\(y=2\\)`,`right of \\(x=2\\)`,`the line \\(y=2\\) only`], answer:0,
   trap:`\\(y\\le2\\) shades on and below a solid horizontal line.`,
   tip:`\\"\\(\\le\\)\\" keeps the boundary (solid).`},

  {topic:"Linear (2 variables)", q:`Which point satisfies \\(y>x\\)?`,
   options:[`\\((1,3)\\)`,`\\((3,1)\\)`,`\\((2,2)\\)`,`\\((0,-1)\\)`], answer:0,
   trap:`Only \\((1,3)\\) has \\(3>1\\).`,
   tip:`Check that the \\(y\\)-value exceeds the \\(x\\)-value.`},

  {topic:"Linear (2 variables)", q:`A \\(\\ge\\) or \\(\\le\\) linear inequality is graphed with a:`,
   options:[`solid boundary line`,`dashed boundary line`,`curved boundary`,`no boundary`], answer:0,
   trap:`\\"Or equal to\\" includes the line, so it is solid.`,
   tip:`Solid = boundary included.`},

  // ================= QUADRATIC INEQUALITIES (1 VARIABLE) =================
  {topic:"Quadratic (1 variable)", q:`Solve \\(x^{2}-4<0\\).`,
   options:[`\\(-2<x<2\\)`,`\\(x<-2\\) or \\(x>2\\)`,`\\(x<2\\)`,`no solution`], answer:0,
   trap:`Roots \\(\\pm2\\); an upward parabola is below zero between its roots.`,
   tip:`\\(<0\\) → between the roots.`},

  {topic:"Quadratic (1 variable)", q:`Solve \\(x^{2}-9>0\\).`,
   options:[`\\(x<-3\\) or \\(x>3\\)`,`\\(-3<x<3\\)`,`\\(x>3\\)`,`all real numbers`], answer:0,
   trap:`Roots \\(\\pm3\\); the parabola is above zero outside the roots.`,
   tip:`\\(>0\\) → outside the roots.`},

  {topic:"Quadratic (1 variable)", q:`Solve \\(x^{2}-5x+6\\le0\\).`,
   options:[`\\(2\\le x\\le3\\)`,`\\(x\\le2\\) or \\(x\\ge3\\)`,`\\(-3\\le x\\le-2\\)`,`no solution`], answer:0,
   trap:`Roots \\(2,3\\); \\(\\le0\\) holds between them (inclusive).`,
   tip:`Factor \\((x-2)(x-3)\\), then test a middle value.`},

  {topic:"Quadratic (1 variable)", q:`Solve \\(x^{2}-x-6>0\\).`,
   options:[`\\(x<-2\\) or \\(x>3\\)`,`\\(-2<x<3\\)`,`\\(x>3\\)`,`\\(-3<x<2\\)`], answer:0,
   trap:`Roots \\(-2,3\\); \\(>0\\) outside them.`,
   tip:`\\((x-3)(x+2)>0\\).`},

  {topic:"Quadratic (1 variable)", q:`Solve \\(x^{2}+2x-8<0\\).`,
   options:[`\\(-4<x<2\\)`,`\\(x<-4\\) or \\(x>2\\)`,`\\(-2<x<4\\)`,`no solution`], answer:0,
   trap:`Roots \\(-4,2\\); \\(<0\\) between them.`,
   tip:`\\((x+4)(x-2)<0\\).`},

  {topic:"Quadratic (1 variable)", q:`Solve \\((x-1)(x+2)>0\\).`,
   options:[`\\(x<-2\\) or \\(x>1\\)`,`\\(-2<x<1\\)`,`\\(x>1\\)`,`\\(x<1\\)`], answer:0,
   trap:`Roots \\(1,-2\\); the product is positive outside the roots.`,
   tip:`Sketch the sign chart across \\(-2\\) and \\(1\\).`},

  {topic:"Quadratic (1 variable)", q:`Solve \\(x^{2}\\le16\\).`,
   options:[`\\(-4\\le x\\le4\\)`,`\\(x\\le-4\\) or \\(x\\ge4\\)`,`\\(x\\le4\\)`,`\\(0\\le x\\le4\\)`], answer:0,
   trap:`\\(x^{2}-16\\le0\\) between the roots \\(\\pm4\\).`,
   tip:`\\(x^{2}\\le c\\Rightarrow-\\sqrt c\\le x\\le\\sqrt c\\).`},

  {topic:"Quadratic (1 variable)", q:`Solve \\(x^{2}>25\\).`,
   options:[`\\(x<-5\\) or \\(x>5\\)`,`\\(-5<x<5\\)`,`\\(x>5\\)`,`all real numbers`], answer:0,
   trap:`\\(x^{2}-25>0\\) outside the roots \\(\\pm5\\).`,
   tip:`\\(x^{2}>c\\Rightarrow x<-\\sqrt c\\) or \\(x>\\sqrt c\\).`},

  {topic:"Quadratic (1 variable)", q:`Solve \\(x^{2}+x-12\\ge0\\).`,
   options:[`\\(x\\le-4\\) or \\(x\\ge3\\)`,`\\(-4\\le x\\le3\\)`,`\\(x\\ge3\\)`,`\\(-3\\le x\\le4\\)`], answer:0,
   trap:`Roots \\(-4,3\\); \\(\\ge0\\) outside them (inclusive).`,
   tip:`\\((x+4)(x-3)\\ge0\\).`},

  {topic:"Quadratic (1 variable)", q:`Solve \\(x^{2}-6x+9>0\\).`,
   options:[`all real numbers except \\(x=3\\)`,`\\(x>3\\)`,`\\(x<3\\)`,`no solution`], answer:0,
   trap:`\\((x-3)^{2}>0\\) is true everywhere except where it equals zero, at \\(x=3\\).`,
   tip:`A perfect square is positive except at its root.`},

  {topic:"Quadratic (1 variable)", q:`Solve \\(x^{2}+4>0\\).`,
   options:[`all real numbers`,`\\(x>-2\\)`,`\\(x>2\\)`,`no solution`], answer:0,
   trap:`\\(x^{2}+4\\ge4>0\\) for every \\(x\\); it never reaches zero.`,
   tip:`A parabola with no real roots opening up is always positive.`},

  {topic:"Quadratic (1 variable)", q:`Solve \\(x^{2}<0\\).`,
   options:[`no solution`,`all real numbers`,`\\(x<0\\)`,`\\(x=0\\)`], answer:0,
   trap:`A square is never negative, so there is no solution.`,
   tip:`\\(x^{2}\\ge0\\) always.`},

  // ================= QUADRATIC INEQUALITIES (2 VARIABLES) =================
  {topic:"Quadratic (2 variables)", q:`For \\(y>x^{2}\\), you shade the region:`,
   options:[`inside (above) the parabola`,`outside (below) the parabola`,`left of the parabola`,`on the curve only`], answer:0,
   trap:`\\(y>\\) shades where \\(y\\) exceeds \\(x^{2}\\) — the inside of the upward parabola.`,
   tip:`Test \\((0,1)\\): \\(1>0\\) is true, and it's inside.`},

  {topic:"Quadratic (2 variables)", q:`For \\(y<x^{2}-1\\), you shade the region:`,
   options:[`below (outside) the parabola`,`above (inside) the parabola`,`right of the parabola`,`on the curve only`], answer:0,
   trap:`\\(y<\\) shades where \\(y\\) is less than \\(x^{2}-1\\) — outside the parabola.`,
   tip:`Test the origin: \\(0<-1\\) is false, so the origin is NOT shaded.`},

  {topic:"Quadratic (2 variables)", q:`The boundary of \\(y\\ge x^{2}+2\\) is drawn:`,
   options:[`a solid parabola`,`a dashed parabola`,`a solid line`,`a dashed line`], answer:0,
   trap:`\\(\\ge\\) includes the curve, so it is a solid parabola.`,
   tip:`The boundary of a quadratic inequality is a parabola, not a line.`},

  {topic:"Quadratic (2 variables)", q:`The boundary of \\(y<-x^{2}+3\\) is drawn:`,
   options:[`a dashed parabola`,`a solid parabola`,`a dashed line`,`a solid line`], answer:0,
   trap:`\\(<\\) excludes the curve, so it is a dashed parabola.`,
   tip:`Strict inequality → dashed boundary.`},

  {topic:"Quadratic (2 variables)", q:`Is \\((0,0)\\) a solution of \\(y>x^{2}-1\\)?`,
   options:[`yes`,`no`,`only on the curve`,`cannot tell`], answer:0,
   trap:`\\(0>0-1=-1\\) is true.`,
   tip:`Substitute the point into the inequality.`},

  {topic:"Quadratic (2 variables)", q:`Is \\((2,1)\\) a solution of \\(y<x^{2}\\)?`,
   options:[`yes`,`no`,`only if \\(y=4\\)`,`cannot tell`], answer:0,
   trap:`\\(1<2^{2}=4\\) is true.`,
   tip:`Check whether \\(y\\) is below \\(x^{2}\\).`},

  {topic:"Quadratic (2 variables)", q:`Is \\((1,3)\\) a solution of \\(y\\le x^{2}\\)?`,
   options:[`no`,`yes`,`only on the curve`,`cannot tell`], answer:0,
   trap:`\\(3\\le1^{2}=1\\) is false.`,
   tip:`\\(3\\) is not less than or equal to \\(1\\).`},

  {topic:"Quadratic (2 variables)", q:`Is \\((0,2)\\) a solution of \\(y>x^{2}+1\\)?`,
   options:[`yes`,`no`,`only on the curve`,`cannot tell`], answer:0,
   trap:`\\(2>0+1=1\\) is true.`,
   tip:`Compare \\(y\\) with \\(x^{2}+1\\).`},

  // ================= APPLICATIONS =================
  {topic:"Applications", q:`A number squared is less than \\(9\\). The number satisfies:`,
   options:[`\\(-3<x<3\\)`,`\\(x<3\\)`,`\\(x<-3\\) or \\(x>3\\)`,`\\(0<x<3\\)`], answer:0,
   trap:`\\(x^{2}<9\\Rightarrow-3<x<3\\).`,
   tip:`\\(x^{2}<c\\) gives a bounded interval.`},

  {topic:"Applications", q:`A ball's height is \\(h=-5t^{2}+20t\\). It is above \\(15\\) m when:`,
   options:[`\\(1<t<3\\)`,`\\(t<1\\) or \\(t>3\\)`,`\\(t>3\\)`,`\\(0<t<4\\)`], answer:0,
   trap:`\\(-5t^{2}+20t>15\\Rightarrow t^{2}-4t+3<0\\Rightarrow(t-1)(t-3)<0\\Rightarrow 1<t<3\\).`,
   tip:`Move everything to one side and factor.`},

  {topic:"Applications", q:`Profit is \\(P=-x^{2}+10x-16\\). The profit is positive when:`,
   options:[`\\(2<x<8\\)`,`\\(x<2\\) or \\(x>8\\)`,`\\(x>8\\)`,`\\(4<x<6\\)`], answer:0,
   trap:`\\(-x^{2}+10x-16>0\\Rightarrow x^{2}-10x+16<0\\Rightarrow(x-2)(x-8)<0\\Rightarrow 2<x<8\\).`,
   tip:`Dividing by \\(-1\\) flips the inequality sign.`},

  {topic:"Applications", q:`A rectangle has length \\(x\\) and width \\(x-2\\) with area at least \\(15\\). Then:`,
   options:[`\\(x\\ge5\\)`,`\\(x\\ge3\\)`,`\\(3\\le x\\le5\\)`,`\\(x\\ge15\\)`], answer:0,
   trap:`\\(x(x-2)\\ge15\\Rightarrow x^{2}-2x-15\\ge0\\Rightarrow(x-5)(x+3)\\ge0\\); a positive length gives \\(x\\ge5\\).`,
   tip:`Reject the negative branch since \\(x>2\\).`},

  {topic:"Applications", q:`A square's area is at most \\(49\\). Its side length \\(x\\) satisfies:`,
   options:[`\\(0<x\\le7\\)`,`\\(x\\le7\\)`,`\\(-7\\le x\\le7\\)`,`\\(x\\ge7\\)`], answer:0,
   trap:`\\(x^{2}\\le49\\Rightarrow-7\\le x\\le7\\), but a length is positive, so \\(0<x\\le7\\).`,
   tip:`Keep only the physically meaningful (positive) values.`},

  {topic:"Applications", q:`For which numbers is \\(x^{2}+x<6\\)?`,
   options:[`\\(-3<x<2\\)`,`\\(x<-3\\) or \\(x>2\\)`,`\\(-2<x<3\\)`,`\\(x<2\\)`], answer:0,
   trap:`\\(x^{2}+x-6<0\\Rightarrow(x+3)(x-2)<0\\Rightarrow-3<x<2\\).`,
   tip:`Bring the \\(6\\) over first, then factor.`}
  ]
};
