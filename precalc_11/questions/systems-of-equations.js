/* Pre-Calculus 11 · Systems of Equations — question bank.
   To add questions, append objects to `questions` below. Each item:
     { topic, q, options:[4 strings], answer:0, trap, tip }
   Write the CORRECT option FIRST (answer:0); the engine shuffles positions.
   `topic` must appear in `topicOrder`. Math is KaTeX \\( ... \\) — DOUBLE every backslash. */
window.UNIT = {
  meta: {
    course: "Pre-Calculus 11",
    crumb: "Systems of Equations",
    kicker: "Systems of Equations",
    title: "Systems of Equations",
    storeKey: "pc11_systems_records_v1",
    reportTitle: "SYSTEMS OF EQUATIONS — CHALLENGE TEST RESULTS",
    reportSubtitle: "Pre-Calculus 11 · Chapter 8",
    quizSize: 50
  },
  topicOrder: ["Linear–Quadratic","Quadratic–Quadratic","Number of Solutions","Applications"],
  questions: [
  // ================= LINEAR-QUADRATIC SYSTEMS =================
  {topic:"Linear–Quadratic", q:`Solve the system \\(y=x^{2}\\), \\(y=x+2\\).`,
   options:[`\\((2,4)\\) and \\((-1,1)\\)`,`\\((2,4)\\) only`,`\\((1,1)\\) and \\((-2,4)\\)`,`no solution`], answer:0,
   trap:`\\(x^{2}=x+2\\Rightarrow x^{2}-x-2=0\\Rightarrow(x-2)(x+1)=0\\Rightarrow x=2,-1\\).`,
   tip:`Substitute, then solve the quadratic and back-substitute for \\(y\\).`},

  {topic:"Linear–Quadratic", q:`Solve the system \\(y=x^{2}-4\\), \\(y=0\\).`,
   options:[`\\((2,0)\\) and \\((-2,0)\\)`,`\\((4,0)\\)`,`\\((0,-4)\\)`,`no solution`], answer:0,
   trap:`\\(x^{2}-4=0\\Rightarrow x=\\pm2\\); both give \\(y=0\\).`,
   tip:`Setting \\(y=0\\) finds the \\(x\\)-intercepts.`},

  {topic:"Linear–Quadratic", q:`Solve the system \\(y=x^{2}\\), \\(y=2x-1\\).`,
   options:[`\\((1,1)\\) only`,`\\((1,1)\\) and \\((-1,1)\\)`,`\\((1,1)\\) and \\((1,-1)\\)`,`no solution`], answer:0,
   trap:`\\(x^{2}-2x+1=0\\Rightarrow(x-1)^{2}=0\\Rightarrow x=1\\) — the line is tangent.`,
   tip:`A repeated root means one point of contact.`},

  {topic:"Linear–Quadratic", q:`Solve the system \\(y=x^{2}+1\\), \\(y=x-1\\).`,
   options:[`no solution`,`\\((1,0)\\)`,`\\((0,1)\\)`,`\\((1,0)\\) and \\((-1,-2)\\)`], answer:0,
   trap:`\\(x^{2}+1=x-1\\Rightarrow x^{2}-x+2=0\\), discriminant \\(1-8<0\\) → no real solution.`,
   tip:`A negative discriminant means the line misses the parabola.`},

  {topic:"Linear–Quadratic", q:`Solve the system \\(y=x^{2}-2x\\), \\(y=3\\).`,
   options:[`\\((3,3)\\) and \\((-1,3)\\)`,`\\((3,3)\\) only`,`\\((1,3)\\) and \\((-3,3)\\)`,`no solution`], answer:0,
   trap:`\\(x^{2}-2x-3=0\\Rightarrow(x-3)(x+1)=0\\Rightarrow x=3,-1\\).`,
   tip:`Both points share \\(y=3\\).`},

  {topic:"Linear–Quadratic", q:`The best algebraic method for a linear-quadratic system is:`,
   options:[`substitution`,`completing the square`,`the sine law`,`long division`], answer:0,
   trap:`Substitute the linear expression for \\(y\\) into the quadratic.`,
   tip:`Reduce two equations to one quadratic in \\(x\\).`},

  {topic:"Linear–Quadratic", q:`Solve the system \\(y=2x^{2}\\), \\(y=-x+3\\). The \\(x\\)-values are:`,
   options:[`\\(x=1,\\ -\\tfrac32\\)`,`\\(x=1,\\ 3\\)`,`\\(x=-1,\\ \\tfrac32\\)`,`\\(x=1\\)`], answer:0,
   trap:`\\(2x^{2}=-x+3\\Rightarrow 2x^{2}+x-3=0\\Rightarrow(2x+3)(x-1)=0\\).`,
   tip:`Move all terms to one side before factoring.`},

  {topic:"Linear–Quadratic", q:`Solve the system \\(x^{2}+y=5\\), \\(y=x+3\\).`,
   options:[`\\((1,4)\\) and \\((-2,1)\\)`,`\\((1,4)\\) only`,`\\((2,5)\\) and \\((-1,2)\\)`,`no solution`], answer:0,
   trap:`\\(x^{2}+x+3=5\\Rightarrow x^{2}+x-2=0\\Rightarrow(x+2)(x-1)=0\\Rightarrow x=1,-2\\).`,
   tip:`Isolate \\(y\\) from the linear equation and substitute.`},

  {topic:"Linear–Quadratic", q:`Solve the system \\(y=x^{2}-1\\), \\(y=x+1\\).`,
   options:[`\\((2,3)\\) and \\((-1,0)\\)`,`\\((2,3)\\) only`,`\\((1,2)\\) and \\((-2,-1)\\)`,`no solution`], answer:0,
   trap:`\\(x^{2}-1=x+1\\Rightarrow x^{2}-x-2=0\\Rightarrow(x-2)(x+1)=0\\).`,
   tip:`Back-substitute to get each \\(y\\).`},

  {topic:"Linear–Quadratic", q:`Solve the system \\(y=x^{2}\\), \\(y=3x-2\\).`,
   options:[`\\((1,1)\\) and \\((2,4)\\)`,`\\((1,1)\\) only`,`\\((2,4)\\) only`,`no solution`], answer:0,
   trap:`\\(x^{2}-3x+2=0\\Rightarrow(x-1)(x-2)=0\\Rightarrow x=1,2\\).`,
   tip:`Two real roots → two intersection points.`},

  {topic:"Linear–Quadratic", q:`Solve the system \\(y=x^{2}\\), \\(y=4\\).`,
   options:[`\\((2,4)\\) and \\((-2,4)\\)`,`\\((4,4)\\)`,`\\((2,4)\\) only`,`\\((0,4)\\)`], answer:0,
   trap:`\\(x^{2}=4\\Rightarrow x=\\pm2\\).`,
   tip:`A horizontal line cuts the parabola at two symmetric points.`},

  // ================= QUADRATIC-QUADRATIC SYSTEMS =================
  {topic:"Quadratic–Quadratic", q:`Solve the system \\(y=x^{2}\\), \\(y=-x^{2}+8\\).`,
   options:[`\\((2,4)\\) and \\((-2,4)\\)`,`\\((2,4)\\) only`,`\\((4,16)\\) and \\((-4,16)\\)`,`no solution`], answer:0,
   trap:`\\(x^{2}=-x^{2}+8\\Rightarrow 2x^{2}=8\\Rightarrow x=\\pm2\\).`,
   tip:`Set the two expressions equal and collect \\(x^{2}\\).`},

  {topic:"Quadratic–Quadratic", q:`Solve the system \\(y=x^{2}+1\\), \\(y=2x^{2}-3\\).`,
   options:[`\\((2,5)\\) and \\((-2,5)\\)`,`\\((2,5)\\) only`,`\\((4,17)\\)`,`no solution`], answer:0,
   trap:`\\(x^{2}+1=2x^{2}-3\\Rightarrow x^{2}=4\\Rightarrow x=\\pm2\\).`,
   tip:`The \\(x^{2}\\) terms don't cancel — solve for \\(x^{2}\\).`},

  {topic:"Quadratic–Quadratic", q:`Solve the system \\(y=x^{2}-2\\), \\(y=x^{2}+3\\).`,
   options:[`no solution`,`\\((0,-2)\\)`,`\\((1,-1)\\)`,`infinitely many`], answer:0,
   trap:`\\(x^{2}-2=x^{2}+3\\Rightarrow -2=3\\), which is impossible.`,
   tip:`Identical \\(x^{2}\\) terms cancel; a false statement means no solution.`},

  {topic:"Quadratic–Quadratic", q:`Solve the system \\(y=x^{2}-4\\), \\(y=-x^{2}+4\\).`,
   options:[`\\((2,0)\\) and \\((-2,0)\\)`,`\\((2,0)\\) only`,`\\((0,4)\\) and \\((0,-4)\\)`,`no solution`], answer:0,
   trap:`\\(x^{2}-4=-x^{2}+4\\Rightarrow 2x^{2}=8\\Rightarrow x=\\pm2\\), giving \\(y=0\\).`,
   tip:`Collect the \\(x^{2}\\) terms on one side.`},

  {topic:"Quadratic–Quadratic", q:`Solve the system \\(y=2x^{2}\\), \\(y=x^{2}+x\\).`,
   options:[`\\((0,0)\\) and \\((1,2)\\)`,`\\((0,0)\\) only`,`\\((1,2)\\) only`,`no solution`], answer:0,
   trap:`\\(2x^{2}=x^{2}+x\\Rightarrow x^{2}-x=0\\Rightarrow x(x-1)=0\\Rightarrow x=0,1\\).`,
   tip:`Don't divide by \\(x\\) — you'd lose \\(x=0\\).`},

  {topic:"Quadratic–Quadratic", q:`Solve the system \\(y=x^{2}+2x\\), \\(y=x^{2}-2\\).`,
   options:[`\\((-1,-1)\\)`,`\\((-1,-1)\\) and \\((1,3)\\)`,`\\((1,3)\\)`,`no solution`], answer:0,
   trap:`\\(x^{2}+2x=x^{2}-2\\Rightarrow 2x=-2\\Rightarrow x=-1\\) — the \\(x^{2}\\) cancels, leaving one solution.`,
   tip:`When the \\(x^{2}\\) terms cancel, you get a single linear equation.`},

  {topic:"Quadratic–Quadratic", q:`Solve the system \\(y=x^{2}-3\\), \\(y=1-x^{2}\\).`,
   options:[`\\((\\sqrt2,-1)\\) and \\((-\\sqrt2,-1)\\)`,`\\((2,-1)\\) and \\((-2,-1)\\)`,`\\((\\sqrt2,-1)\\) only`,`no solution`], answer:0,
   trap:`\\(x^{2}-3=1-x^{2}\\Rightarrow 2x^{2}=4\\Rightarrow x=\\pm\\sqrt2\\), giving \\(y=-1\\).`,
   tip:`Not every solution is an integer — keep the radical.`},

  {topic:"Quadratic–Quadratic", q:`Solve the system \\(y=x^{2}+2\\), \\(y=-x^{2}+2\\).`,
   options:[`\\((0,2)\\)`,`\\((0,2)\\) and \\((2,6)\\)`,`\\((2,6)\\)`,`no solution`], answer:0,
   trap:`\\(x^{2}+2=-x^{2}+2\\Rightarrow 2x^{2}=0\\Rightarrow x=0\\) — the parabolas touch once.`,
   tip:`A single repeated root means the curves are tangent.`},

  {topic:"Quadratic–Quadratic", q:`Two distinct parabolas \\(y=ax^{2}+\\cdots\\) and \\(y=bx^{2}+\\cdots\\) intersect in at most:`,
   options:[`\\(2\\) points`,`\\(1\\) point`,`\\(3\\) points`,`\\(4\\) points`], answer:0,
   trap:`Their difference is at most quadratic, so at most \\(2\\) real roots.`,
   tip:`Subtracting gives a quadratic (or linear) equation.`},

  {topic:"Quadratic–Quadratic", q:`Solve the system \\(y=x^{2}\\), \\(y=x^{2}\\).`,
   options:[`infinitely many solutions`,`no solution`,`\\((0,0)\\) only`,`\\((1,1)\\) only`], answer:0,
   trap:`The two equations are identical, so every point on the parabola works.`,
   tip:`Same curve → infinitely many common points.`},

  // ================= NUMBER OF SOLUTIONS =================
  {topic:"Number of Solutions", q:`A line and a parabola can intersect in how many points?`,
   options:[`\\(0\\), \\(1\\), or \\(2\\)`,`exactly \\(1\\)`,`exactly \\(2\\)`,`up to \\(3\\)`], answer:0,
   trap:`Substitution gives a quadratic, which has \\(0\\), \\(1\\), or \\(2\\) real roots.`,
   tip:`The discriminant decides the count.`},

  {topic:"Number of Solutions", q:`If a linear-quadratic system gives a negative discriminant, the number of solutions is:`,
   options:[`\\(0\\)`,`\\(1\\)`,`\\(2\\)`,`infinitely many`], answer:0,
   trap:`No real roots means the line misses the parabola.`,
   tip:`Discriminant \\(<0\\) → no intersection.`},

  {topic:"Number of Solutions", q:`If the discriminant of the combined equation is zero, there is/are:`,
   options:[`\\(1\\) solution (tangent)`,`\\(0\\) solutions`,`\\(2\\) solutions`,`infinitely many`], answer:0,
   trap:`A zero discriminant means one repeated root — the line touches the parabola once.`,
   tip:`Tangency ⇔ discriminant \\(=0\\).`},

  {topic:"Number of Solutions", q:`How many solutions does \\(y=x^{2}+3\\), \\(y=1\\) have?`,
   options:[`\\(0\\)`,`\\(1\\)`,`\\(2\\)`,`infinitely many`], answer:0,
   trap:`\\(x^{2}+3=1\\Rightarrow x^{2}=-2\\), impossible → \\(0\\) solutions.`,
   tip:`The line lies below the parabola's minimum.`},

  {topic:"Number of Solutions", q:`How many solutions does \\(y=x^{2}\\), \\(y=2x-1\\) have?`,
   options:[`\\(1\\)`,`\\(0\\)`,`\\(2\\)`,`infinitely many`], answer:0,
   trap:`\\((x-1)^{2}=0\\) gives one repeated root — the line is tangent.`,
   tip:`Perfect square → single solution.`},

  {topic:"Number of Solutions", q:`How many solutions does \\(y=x^{2}\\), \\(y=x+6\\) have?`,
   options:[`\\(2\\)`,`\\(1\\)`,`\\(0\\)`,`infinitely many`], answer:0,
   trap:`\\(x^{2}-x-6=0\\), discriminant \\(1+24=25>0\\) → two solutions.`,
   tip:`Positive discriminant → two intersection points.`},

  {topic:"Number of Solutions", q:`Geometrically, exactly one solution to a linear-quadratic system means the line is:`,
   options:[`tangent to the parabola`,`parallel to the axis`,`the axis of symmetry`,`a secant`], answer:0,
   trap:`One point of contact means tangency.`,
   tip:`Tangent line = one shared point.`},

  {topic:"Number of Solutions", q:`How many real solutions does \\(y=x^{2}\\), \\(y=-3\\) have?`,
   options:[`\\(0\\)`,`\\(1\\)`,`\\(2\\)`,`infinitely many`], answer:0,
   trap:`\\(x^{2}=-3\\) has no real roots.`,
   tip:`A parabola opening up never reaches \\(y=-3\\).`},

  {topic:"Number of Solutions", q:`A line tangent to a parabola produces a combined equation with discriminant:`,
   options:[`\\(=0\\)`,`\\(>0\\)`,`\\(<0\\)`,`undefined`], answer:0,
   trap:`Tangency corresponds to a single repeated root, i.e. discriminant \\(=0\\).`,
   tip:`Set the discriminant to \\(0\\) to find tangent lines.`},

  {topic:"Number of Solutions", q:`How many solutions does \\(y=x^{2}+1\\), \\(y=x\\) have?`,
   options:[`\\(0\\)`,`\\(1\\)`,`\\(2\\)`,`infinitely many`], answer:0,
   trap:`\\(x^{2}-x+1=0\\), discriminant \\(1-4=-3<0\\) → no real solutions.`,
   tip:`Negative discriminant → the curves never meet.`},

  // ================= APPLICATIONS =================
  {topic:"Applications", q:`Two numbers have a sum of \\(10\\) and a sum of squares of \\(58\\). The numbers are:`,
   options:[`\\(3\\) and \\(7\\)`,`\\(4\\) and \\(6\\)`,`\\(2\\) and \\(8\\)`,`\\(5\\) and \\(5\\)`], answer:0,
   trap:`\\(y=10-x,\\ x^{2}+(10-x)^{2}=58\\Rightarrow x^{2}-10x+21=0\\Rightarrow(x-3)(x-7)=0\\).`,
   tip:`Substitute the sum equation into the sum-of-squares equation.`},

  {topic:"Applications", q:`A rectangle has perimeter \\(20\\) and area \\(24\\). Its dimensions are:`,
   options:[`\\(6\\) by \\(4\\)`,`\\(8\\) by \\(3\\)`,`\\(12\\) by \\(2\\)`,`\\(5\\) by \\(5\\)`], answer:0,
   trap:`\\(l+w=10,\\ lw=24\\Rightarrow t^{2}-10t+24=0\\Rightarrow(t-4)(t-6)=0\\).`,
   tip:`Sum and product of the sides are roots of one quadratic.`},

  {topic:"Applications", q:`Two numbers have a product of \\(12\\) and differ by \\(1\\). They are:`,
   options:[`\\(3\\) and \\(4\\)`,`\\(2\\) and \\(6\\)`,`\\(6\\) and \\(7\\)`,`\\(1\\) and \\(12\\)`], answer:0,
   trap:`\\(x(x+1)=12\\Rightarrow x^{2}+x-12=0\\Rightarrow(x+4)(x-3)=0\\Rightarrow x=3\\).`,
   tip:`Let the numbers be \\(x\\) and \\(x+1\\).`},

  {topic:"Applications", q:`Two numbers have a sum of \\(5\\) and a product of \\(6\\). They are:`,
   options:[`\\(2\\) and \\(3\\)`,`\\(1\\) and \\(6\\)`,`\\(-1\\) and \\(6\\)`,`\\(4\\) and \\(1\\)`], answer:0,
   trap:`\\(x(5-x)=6\\Rightarrow x^{2}-5x+6=0\\Rightarrow(x-2)(x-3)=0\\).`,
   tip:`Sum \\(=5\\), product \\(=6\\): roots of \\(t^{2}-5t+6=0\\).`},

  {topic:"Applications", q:`The curve \\(y=x^{2}\\) crosses the line \\(y=2x+3\\) at \\(x=\\)`,
   options:[`\\(3\\) and \\(-1\\)`,`\\(3\\) only`,`\\(1\\) and \\(-3\\)`,`\\(2\\) and \\(-2\\)`], answer:0,
   trap:`\\(x^{2}=2x+3\\Rightarrow x^{2}-2x-3=0\\Rightarrow(x-3)(x+1)=0\\).`,
   tip:`Set the expressions equal and solve.`},

  {topic:"Applications", q:`Two consecutive integers have squares summing to \\(25\\). The smaller is:`,
   options:[`\\(3\\)`,`\\(4\\)`,`\\(2\\)`,`\\(5\\)`], answer:0,
   trap:`\\(x^{2}+(x+1)^{2}=25\\Rightarrow 2x^{2}+2x-24=0\\Rightarrow x^{2}+x-12=0\\Rightarrow x=3\\).`,
   tip:`\\(3^{2}+4^{2}=9+16=25\\).`},

  {topic:"Applications", q:`A rectangle has perimeter \\(26\\) and area \\(40\\). Its dimensions are:`,
   options:[`\\(5\\) by \\(8\\)`,`\\(4\\) by \\(10\\)`,`\\(6\\) by \\(7\\)`,`\\(2\\) by \\(20\\)`], answer:0,
   trap:`\\(l+w=13,\\ lw=40\\Rightarrow t^{2}-13t+40=0\\Rightarrow(t-5)(t-8)=0\\).`,
   tip:`Use half the perimeter as the sum of the sides.`}
  ]
};
