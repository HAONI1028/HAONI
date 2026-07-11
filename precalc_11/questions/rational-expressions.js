/* Pre-Calculus 11 · Rational Expressions — question bank.
   To add questions, append objects to `questions` below. Each item:
     { topic, q, options:[4 strings], answer:0, trap, tip }
   Write the CORRECT option FIRST (answer:0); the engine shuffles positions.
   `topic` must appear in `topicOrder`. Math is KaTeX \\( ... \\) — DOUBLE every backslash. */
window.UNIT = {
  meta: {
    course: "Pre-Calculus 11",
    crumb: "Rational Expressions",
    kicker: "Rational Expressions & Equations",
    title: "Rational Expressions",
    storeKey: "pc11_rational_records_v1",
    reportTitle: "RATIONAL EXPRESSIONS & EQUATIONS — CHALLENGE TEST RESULTS",
    reportSubtitle: "Pre-Calculus 11 · Chapter 6",
    quizSize: 50
  },
  topicOrder: ["Simplify & NPVs","Multiply & Divide","Add & Subtract","Solving Equations","Applications"],
  questions: [
  // ================= SIMPLIFY & NON-PERMISSIBLE VALUES =================
  {topic:"Simplify & NPVs", q:`State the non-permissible values of \\(\\dfrac{x+2}{x^{2}-9}\\).`,
   options:[`\\(x=\\pm3\\)`,`\\(x=-2\\)`,`\\(x=3\\)`,`\\(x=\\pm9\\)`], answer:0,
   trap:`Set the denominator to zero: \\(x^{2}-9=0\\Rightarrow x=\\pm3\\). The numerator is irrelevant.`,
   tip:`NPVs come only from where the denominator is zero.`},

  {topic:"Simplify & NPVs", q:`Simplify \\(\\dfrac{x^{2}-4}{x^{2}+5x+6}\\).`,
   options:[`\\(\\dfrac{x-2}{x+3}\\)`,`\\(\\dfrac{x+2}{x+3}\\)`,`\\(\\dfrac{x-2}{x-3}\\)`,`\\(x-2\\)`], answer:0,
   trap:`\\(\\dfrac{(x-2)(x+2)}{(x+2)(x+3)}\\); cancel \\((x+2)\\) to get \\(\\dfrac{x-2}{x+3}\\).`,
   tip:`Factor top and bottom, then cancel common factors.`},

  {topic:"Simplify & NPVs", q:`Simplify \\(\\dfrac{x^{2}-x-6}{x^{2}-9}\\).`,
   options:[`\\(\\dfrac{x+2}{x+3}\\)`,`\\(\\dfrac{x-2}{x+3}\\)`,`\\(\\dfrac{x+2}{x-3}\\)`,`\\(\\dfrac{x-3}{x+3}\\)`], answer:0,
   trap:`\\(\\dfrac{(x-3)(x+2)}{(x-3)(x+3)}\\); cancel \\((x-3)\\).`,
   tip:`The common factor here is \\((x-3)\\).`},

  {topic:"Simplify & NPVs", q:`Simplify \\(\\dfrac{3x+9}{x^{2}-9}\\).`,
   options:[`\\(\\dfrac{3}{x-3}\\)`,`\\(\\dfrac{3}{x+3}\\)`,`\\(\\dfrac{x+3}{x-3}\\)`,`\\(\\dfrac{1}{x-3}\\)`], answer:0,
   trap:`\\(\\dfrac{3(x+3)}{(x-3)(x+3)}\\); cancel \\((x+3)\\) to get \\(\\dfrac{3}{x-3}\\).`,
   tip:`Factor the \\(3\\) out of the numerator first.`},

  {topic:"Simplify & NPVs", q:`State the non-permissible values of \\(\\dfrac{5}{x^{2}-x}\\).`,
   options:[`\\(x=0,\\ 1\\)`,`\\(x=1\\)`,`\\(x=0\\)`,`\\(x=-1,\\ 0\\)`], answer:0,
   trap:`\\(x^{2}-x=x(x-1)=0\\Rightarrow x=0\\) or \\(1\\).`,
   tip:`Factor the denominator to find every zero.`},

  {topic:"Simplify & NPVs", q:`Simplify \\(\\dfrac{x^{2}-16}{4-x}\\).`,
   options:[`\\(-x-4\\)`,`\\(x+4\\)`,`\\(x-4\\)`,`\\(-x+4\\)`], answer:0,
   trap:`\\(4-x=-(x-4)\\), so \\(\\dfrac{(x-4)(x+4)}{-(x-4)}=-(x+4)=-x-4\\).`,
   tip:`Factor out \\(-1\\) when the terms are reversed.`},

  {topic:"Simplify & NPVs", q:`Simplify \\(\\dfrac{x^{2}+6x+9}{x^{2}-9}\\).`,
   options:[`\\(\\dfrac{x+3}{x-3}\\)`,`\\(\\dfrac{x-3}{x+3}\\)`,`\\(\\dfrac{x+3}{x+3}\\)`,`\\(1\\)`], answer:0,
   trap:`\\(\\dfrac{(x+3)^{2}}{(x-3)(x+3)}\\); cancel one \\((x+3)\\).`,
   tip:`\\(x^{2}+6x+9=(x+3)^{2}\\).`},

  {topic:"Simplify & NPVs", q:`Simplify \\(\\dfrac{6x^{2}y}{9xy^{3}}\\).`,
   options:[`\\(\\dfrac{2x}{3y^{2}}\\)`,`\\(\\dfrac{2x}{3y}\\)`,`\\(\\dfrac{3x}{2y^{2}}\\)`,`\\(\\dfrac{2x^{2}}{3y^{2}}\\)`], answer:0,
   trap:`\\(\\dfrac{6}{9}=\\dfrac23\\), \\(\\dfrac{x^{2}}{x}=x\\), \\(\\dfrac{y}{y^{3}}=\\dfrac{1}{y^{2}}\\).`,
   tip:`Reduce the coefficients and subtract exponents.`},

  {topic:"Simplify & NPVs", q:`Simplify \\(\\dfrac{2x^{2}-8}{x^{2}-4x+4}\\).`,
   options:[`\\(\\dfrac{2(x+2)}{x-2}\\)`,`\\(\\dfrac{2(x-2)}{x+2}\\)`,`\\(2(x+2)\\)`,`\\(\\dfrac{x+2}{x-2}\\)`], answer:0,
   trap:`\\(\\dfrac{2(x-2)(x+2)}{(x-2)^{2}}\\); cancel one \\((x-2)\\).`,
   tip:`Factor the \\(2\\) and recognize \\((x-2)^{2}\\).`},

  {topic:"Simplify & NPVs", q:`State the non-permissible values of \\(\\dfrac{x-1}{(x+2)(x-5)}\\).`,
   options:[`\\(x=-2,\\ 5\\)`,`\\(x=2,\\ -5\\)`,`\\(x=1\\)`,`\\(x=-2,\\ 1,\\ 5\\)`], answer:0,
   trap:`The denominator is zero at \\(x=-2\\) and \\(x=5\\).`,
   tip:`Each denominator factor gives one NPV.`},

  // ================= MULTIPLY & DIVIDE =================
  {topic:"Multiply & Divide", q:`Simplify \\(\\dfrac{x}{3}\\cdot\\dfrac{9}{x^{2}}\\).`,
   options:[`\\(\\dfrac{3}{x}\\)`,`\\(\\dfrac{9}{x}\\)`,`\\(\\dfrac{3}{x^{2}}\\)`,`\\(3x\\)`], answer:0,
   trap:`\\(\\dfrac{9x}{3x^{2}}=\\dfrac{3}{x}\\).`,
   tip:`Multiply across, then reduce.`},

  {topic:"Multiply & Divide", q:`Simplify \\(\\dfrac{x^{2}-4}{x+3}\\cdot\\dfrac{x+3}{x-2}\\).`,
   options:[`\\(x+2\\)`,`\\(x-2\\)`,`\\(\\dfrac{x+2}{x+3}\\)`,`\\(\\dfrac{1}{x-2}\\)`], answer:0,
   trap:`\\(\\dfrac{(x-2)(x+2)}{x+3}\\cdot\\dfrac{x+3}{x-2}\\); cancel \\((x+3)\\) and \\((x-2)\\).`,
   tip:`Factor before cancelling across the product.`},

  {topic:"Multiply & Divide", q:`Simplify \\(\\dfrac{x+1}{x-2}\\div\\dfrac{x+1}{x+2}\\).`,
   options:[`\\(\\dfrac{x+2}{x-2}\\)`,`\\(\\dfrac{x-2}{x+2}\\)`,`\\(1\\)`,`\\(\\dfrac{(x+1)^{2}}{x^{2}-4}\\)`], answer:0,
   trap:`Multiply by the reciprocal: \\(\\dfrac{x+1}{x-2}\\cdot\\dfrac{x+2}{x+1}\\); cancel \\((x+1)\\).`,
   tip:`Dividing = multiply by the flip of the second fraction.`},

  {topic:"Multiply & Divide", q:`Simplify \\(\\dfrac{2x}{x-3}\\div\\dfrac{4x^{2}}{x^{2}-9}\\).`,
   options:[`\\(\\dfrac{x+3}{2x}\\)`,`\\(\\dfrac{x-3}{2x}\\)`,`\\(\\dfrac{2x}{x+3}\\)`,`\\(\\dfrac{x+3}{2}\\)`], answer:0,
   trap:`\\(\\dfrac{2x}{x-3}\\cdot\\dfrac{(x-3)(x+3)}{4x^{2}}=\\dfrac{2x(x+3)}{4x^{2}}=\\dfrac{x+3}{2x}\\).`,
   tip:`Flip, factor \\(x^{2}-9\\), then cancel.`},

  {topic:"Multiply & Divide", q:`Simplify \\(\\dfrac{x^{2}-1}{x^{2}}\\cdot\\dfrac{x}{x-1}\\).`,
   options:[`\\(\\dfrac{x+1}{x}\\)`,`\\(\\dfrac{x-1}{x}\\)`,`\\(\\dfrac{x+1}{x^{2}}\\)`,`\\(x+1\\)`], answer:0,
   trap:`\\(\\dfrac{(x-1)(x+1)}{x^{2}}\\cdot\\dfrac{x}{x-1}=\\dfrac{(x+1)x}{x^{2}}=\\dfrac{x+1}{x}\\).`,
   tip:`Cancel \\((x-1)\\) and one factor of \\(x\\).`},

  {topic:"Multiply & Divide", q:`Simplify \\(\\dfrac{3}{x+2}\\cdot\\dfrac{x^{2}-4}{6}\\).`,
   options:[`\\(\\dfrac{x-2}{2}\\)`,`\\(\\dfrac{x+2}{2}\\)`,`\\(\\dfrac{x-2}{6}\\)`,`\\(3(x-2)\\)`], answer:0,
   trap:`\\(\\dfrac{3(x-2)(x+2)}{6(x+2)}=\\dfrac{x-2}{2}\\).`,
   tip:`Cancel \\((x+2)\\) and reduce \\(\\tfrac36=\\tfrac12\\).`},

  {topic:"Multiply & Divide", q:`Simplify \\(\\dfrac{a^{2}-b^{2}}{a}\\div(a-b)\\).`,
   options:[`\\(\\dfrac{a+b}{a}\\)`,`\\(\\dfrac{a-b}{a}\\)`,`\\(a+b\\)`,`\\(\\dfrac{a}{a+b}\\)`], answer:0,
   trap:`\\(\\dfrac{(a-b)(a+b)}{a}\\cdot\\dfrac{1}{a-b}=\\dfrac{a+b}{a}\\).`,
   tip:`Divide by \\((a-b)\\) = multiply by \\(\\tfrac{1}{a-b}\\).`},

  {topic:"Multiply & Divide", q:`Simplify \\(\\dfrac{x^{2}+2x}{x^{2}-4}\\cdot\\dfrac{x-2}{x}\\).`,
   options:[`\\(1\\)`,`\\(\\dfrac{x+2}{x-2}\\)`,`\\(x\\)`,`\\(\\dfrac{1}{x}\\)`], answer:0,
   trap:`\\(\\dfrac{x(x+2)}{(x-2)(x+2)}\\cdot\\dfrac{x-2}{x}=1\\); everything cancels.`,
   tip:`Factor each piece, then cancel systematically.`},

  {topic:"Multiply & Divide", q:`Simplify \\(\\dfrac{x^{2}-5x+6}{x-1}\\div\\dfrac{x-2}{x-1}\\).`,
   options:[`\\(x-3\\)`,`\\(x+3\\)`,`\\(\\dfrac{x-3}{x-1}\\)`,`\\(\\dfrac{(x-2)(x-3)}{x-1}\\)`], answer:0,
   trap:`\\(\\dfrac{(x-2)(x-3)}{x-1}\\cdot\\dfrac{x-1}{x-2}=x-3\\).`,
   tip:`Flip the divisor, then cancel \\((x-1)\\) and \\((x-2)\\).`},

  {topic:"Multiply & Divide", q:`Simplify \\(\\dfrac{10x^{3}}{3y}\\cdot\\dfrac{9y^{2}}{5x}\\).`,
   options:[`\\(6x^{2}y\\)`,`\\(6xy\\)`,`\\(\\dfrac{6x^{2}}{y}\\)`,`\\(15x^{2}y\\)`], answer:0,
   trap:`\\(\\dfrac{10\\cdot9}{3\\cdot5}=6\\), \\(\\dfrac{x^{3}}{x}=x^{2}\\), \\(\\dfrac{y^{2}}{y}=y\\).`,
   tip:`Multiply coefficients and combine variable powers.`},

  // ================= ADD & SUBTRACT =================
  {topic:"Add & Subtract", q:`Simplify \\(\\dfrac{2}{x}+\\dfrac{3}{x}\\).`,
   options:[`\\(\\dfrac{5}{x}\\)`,`\\(\\dfrac{5}{2x}\\)`,`\\(\\dfrac{6}{x}\\)`,`\\(\\dfrac{5}{x^{2}}\\)`], answer:0,
   trap:`Same denominator: add numerators only, keep \\(x\\).`,
   tip:`\\(\\dfrac{a}{x}+\\dfrac{b}{x}=\\dfrac{a+b}{x}\\).`},

  {topic:"Add & Subtract", q:`Simplify \\(\\dfrac{x}{x+1}+\\dfrac{1}{x+1}\\).`,
   options:[`\\(1\\)`,`\\(\\dfrac{x}{x+1}\\)`,`\\(\\dfrac{x+1}{2}\\)`,`\\(\\dfrac{2x}{x+1}\\)`], answer:0,
   trap:`\\(\\dfrac{x+1}{x+1}=1\\).`,
   tip:`Add the numerators over the shared denominator.`},

  {topic:"Add & Subtract", q:`Simplify \\(\\dfrac{3}{x}+\\dfrac{2}{x^{2}}\\).`,
   options:[`\\(\\dfrac{3x+2}{x^{2}}\\)`,`\\(\\dfrac{5}{x^{2}}\\)`,`\\(\\dfrac{5}{x^{3}}\\)`,`\\(\\dfrac{3x+2}{x}\\)`], answer:0,
   trap:`LCD is \\(x^{2}\\): \\(\\dfrac{3x}{x^{2}}+\\dfrac{2}{x^{2}}=\\dfrac{3x+2}{x^{2}}\\).`,
   tip:`Rewrite \\(\\dfrac3x\\) as \\(\\dfrac{3x}{x^{2}}\\).`},

  {topic:"Add & Subtract", q:`Simplify \\(\\dfrac{1}{x}+\\dfrac{1}{x+1}\\).`,
   options:[`\\(\\dfrac{2x+1}{x(x+1)}\\)`,`\\(\\dfrac{2}{2x+1}\\)`,`\\(\\dfrac{1}{x(x+1)}\\)`,`\\(\\dfrac{2x+1}{x+1}\\)`], answer:0,
   trap:`LCD \\(x(x+1)\\): \\(\\dfrac{(x+1)+x}{x(x+1)}=\\dfrac{2x+1}{x(x+1)}\\).`,
   tip:`Never add denominators — build a common one.`},

  {topic:"Add & Subtract", q:`Simplify \\(\\dfrac{2}{x-1}-\\dfrac{1}{x+1}\\).`,
   options:[`\\(\\dfrac{x+3}{(x-1)(x+1)}\\)`,`\\(\\dfrac{1}{(x-1)(x+1)}\\)`,`\\(\\dfrac{x-3}{(x-1)(x+1)}\\)`,`\\(\\dfrac{1}{x^{2}-1}\\)`], answer:0,
   trap:`\\(\\dfrac{2(x+1)-1(x-1)}{(x-1)(x+1)}=\\dfrac{2x+2-x+1}{\\ldots}=\\dfrac{x+3}{(x-1)(x+1)}\\).`,
   tip:`Distribute the minus sign across \\((x-1)\\).`},

  {topic:"Add & Subtract", q:`Simplify \\(\\dfrac{5}{6x}-\\dfrac{1}{4x}\\).`,
   options:[`\\(\\dfrac{7}{12x}\\)`,`\\(\\dfrac{4}{2x}\\)`,`\\(\\dfrac{7}{24x}\\)`,`\\(\\dfrac{1}{12x}\\)`], answer:0,
   trap:`LCD \\(12x\\): \\(\\dfrac{10}{12x}-\\dfrac{3}{12x}=\\dfrac{7}{12x}\\).`,
   tip:`LCD of \\(6x\\) and \\(4x\\) is \\(12x\\).`},

  {topic:"Add & Subtract", q:`Simplify \\(\\dfrac{3}{x+2}+\\dfrac{4}{x-2}\\).`,
   options:[`\\(\\dfrac{7x+2}{(x+2)(x-2)}\\)`,`\\(\\dfrac{7}{(x+2)(x-2)}\\)`,`\\(\\dfrac{7x-2}{(x+2)(x-2)}\\)`,`\\(\\dfrac{7}{2x}\\)`], answer:0,
   trap:`\\(\\dfrac{3(x-2)+4(x+2)}{(x+2)(x-2)}=\\dfrac{3x-6+4x+8}{\\ldots}=\\dfrac{7x+2}{\\ldots}\\).`,
   tip:`Multiply each numerator by the other denominator.`},

  {topic:"Add & Subtract", q:`Simplify \\(\\dfrac{1}{x^{2}-1}+\\dfrac{1}{x+1}\\).`,
   options:[`\\(\\dfrac{x}{x^{2}-1}\\)`,`\\(\\dfrac{2}{x^{2}-1}\\)`,`\\(\\dfrac{x+2}{x^{2}-1}\\)`,`\\(\\dfrac{2}{2x}\\)`], answer:0,
   trap:`LCD \\((x-1)(x+1)\\): \\(\\dfrac{1+(x-1)}{(x-1)(x+1)}=\\dfrac{x}{x^{2}-1}\\).`,
   tip:`Factor \\(x^{2}-1\\) first to see the LCD.`},

  {topic:"Add & Subtract", q:`Simplify \\(\\dfrac{x+3}{x}-\\dfrac{x-3}{x}\\).`,
   options:[`\\(\\dfrac{6}{x}\\)`,`\\(\\dfrac{2x}{x}\\)`,`\\(\\dfrac{6}{x^{2}}\\)`,`\\(0\\)`], answer:0,
   trap:`\\(\\dfrac{(x+3)-(x-3)}{x}=\\dfrac{6}{x}\\); the \\(x\\)'s cancel in the numerator.`,
   tip:`Subtract the whole second numerator, so \\(-(x-3)=-x+3\\).`},

  {topic:"Add & Subtract", q:`Simplify \\(\\dfrac{x}{x-2}-\\dfrac{2}{x-2}\\).`,
   options:[`\\(1\\)`,`\\(\\dfrac{x-2}{x-2}\\)`,`\\(\\dfrac{x+2}{x-2}\\)`,`\\(x\\)`], answer:0,
   trap:`\\(\\dfrac{x-2}{x-2}=1\\).`,
   tip:`Combine numerators over the common denominator.`},

  // ================= SOLVING RATIONAL EQUATIONS =================
  {topic:"Solving Equations", q:`Solve \\(\\dfrac{2}{x}=\\dfrac{4}{x+3}\\).`,
   options:[`\\(x=3\\)`,`\\(x=-3\\)`,`\\(x=6\\)`,`\\(x=1\\)`], answer:0,
   trap:`Cross-multiply: \\(2(x+3)=4x\\Rightarrow 2x+6=4x\\Rightarrow x=3\\).`,
   tip:`Cross-multiply, then solve the linear equation.`},

  {topic:"Solving Equations", q:`Solve \\(\\dfrac{x}{2}+\\dfrac{x}{3}=5\\).`,
   options:[`\\(x=6\\)`,`\\(x=5\\)`,`\\(x=15\\)`,`\\(x=\\tfrac52\\)`], answer:0,
   trap:`Multiply by \\(6\\): \\(3x+2x=30\\Rightarrow 5x=30\\Rightarrow x=6\\).`,
   tip:`Clear fractions by multiplying by the LCD \\(6\\).`},

  {topic:"Solving Equations", q:`Solve \\(\\dfrac{1}{x}+\\dfrac{1}{2}=\\dfrac{3}{x}\\).`,
   options:[`\\(x=4\\)`,`\\(x=2\\)`,`\\(x=\\tfrac12\\)`,`\\(x=8\\)`], answer:0,
   trap:`\\(\\dfrac{1}{2}=\\dfrac{3}{x}-\\dfrac{1}{x}=\\dfrac{2}{x}\\Rightarrow x=4\\).`,
   tip:`Collect the \\(\\tfrac1x\\) terms first.`},

  {topic:"Solving Equations", q:`Solve \\(\\dfrac{3}{x-1}=\\dfrac{6}{x+1}\\).`,
   options:[`\\(x=3\\)`,`\\(x=-3\\)`,`\\(x=1\\)`,`\\(x=2\\)`], answer:0,
   trap:`\\(3(x+1)=6(x-1)\\Rightarrow 3x+3=6x-6\\Rightarrow x=3\\).`,
   tip:`Cross-multiply, then isolate \\(x\\).`},

  {topic:"Solving Equations", q:`Solve \\(\\dfrac{x}{x-2}=\\dfrac{2}{x-2}+3\\).`,
   options:[`no solution`,`\\(x=2\\)`,`\\(x=3\\)`,`\\(x=-2\\)`], answer:0,
   trap:`Multiplying gives \\(x=2+3(x-2)\\Rightarrow x=2\\), but \\(x=2\\) is non-permissible — extraneous.`,
   tip:`Always check roots against the NPVs.`},

  {topic:"Solving Equations", q:`Solve \\(\\dfrac{5}{x}=\\dfrac{x}{5}\\).`,
   options:[`\\(x=\\pm5\\)`,`\\(x=5\\)`,`\\(x=25\\)`,`\\(x=\\pm25\\)`], answer:0,
   trap:`Cross-multiply: \\(x^{2}=25\\Rightarrow x=\\pm5\\).`,
   tip:`Both roots are permissible (only \\(x=0\\) is excluded).`},

  {topic:"Solving Equations", q:`Solve \\(\\dfrac{4}{x+2}=\\dfrac{x}{x+2}+1\\).`,
   options:[`\\(x=1\\)`,`\\(x=-2\\)`,`\\(x=2\\)`,`no solution`], answer:0,
   trap:`Multiply by \\((x+2)\\): \\(4=x+(x+2)\\Rightarrow 2x+2=4\\Rightarrow x=1\\) (permissible).`,
   tip:`Clear the common denominator, then check.`},

  {topic:"Solving Equations", q:`Solve \\(\\dfrac{1}{x-3}+\\dfrac{1}{x+3}=\\dfrac{6}{x^{2}-9}\\).`,
   options:[`no solution`,`\\(x=3\\)`,`\\(x=-3\\)`,`\\(x=6\\)`], answer:0,
   trap:`Multiplying by \\(x^{2}-9\\) gives \\((x+3)+(x-3)=6\\Rightarrow x=3\\), but \\(x=3\\) is an NPV — extraneous.`,
   tip:`\\(x^{2}-9=(x-3)(x+3)\\); \\(x=3\\) is excluded.`},

  {topic:"Solving Equations", q:`Solve \\(\\dfrac{x+1}{x}=\\dfrac{3}{2}\\).`,
   options:[`\\(x=2\\)`,`\\(x=3\\)`,`\\(x=\\tfrac12\\)`,`\\(x=-2\\)`], answer:0,
   trap:`\\(2(x+1)=3x\\Rightarrow 2x+2=3x\\Rightarrow x=2\\).`,
   tip:`Cross-multiply and solve.`},

  {topic:"Solving Equations", q:`Solve \\(\\dfrac{2}{x-1}=\\dfrac{3}{x}\\).`,
   options:[`\\(x=3\\)`,`\\(x=-3\\)`,`\\(x=1\\)`,`\\(x=\\tfrac23\\)`], answer:0,
   trap:`\\(2x=3(x-1)\\Rightarrow 2x=3x-3\\Rightarrow x=3\\).`,
   tip:`Cross-multiply, then isolate \\(x\\).`},

  // ================= APPLICATIONS =================
  {topic:"Applications", q:`A number plus its reciprocal equals \\(\\tfrac{13}{6}\\). The number is:`,
   options:[`\\(\\tfrac32\\) or \\(\\tfrac23\\)`,`\\(\\tfrac13\\) or \\(3\\)`,`\\(6\\) or \\(\\tfrac16\\)`,`\\(2\\) or \\(\\tfrac12\\)`], answer:0,
   trap:`\\(x+\\tfrac1x=\\tfrac{13}{6}\\Rightarrow 6x^{2}-13x+6=0\\Rightarrow(2x-3)(3x-2)=0\\Rightarrow x=\\tfrac32,\\tfrac23\\).`,
   tip:`Multiply through by \\(6x\\) to clear fractions.`},

  {topic:"Applications", q:`One worker finishes a job in \\(3\\) h, another in \\(6\\) h. Together they take:`,
   options:[`\\(2\\) h`,`\\(4.5\\) h`,`\\(9\\) h`,`\\(3\\) h`], answer:0,
   trap:`\\(\\tfrac13+\\tfrac16=\\tfrac12\\) of the job per hour, so the whole job takes \\(2\\) h.`,
   tip:`Add the rates, then invert to get the time.`},

  {topic:"Applications", q:`Two pipes fill a tank in \\(4\\) h and \\(6\\) h. Together they fill it in:`,
   options:[`\\(\\tfrac{12}{5}\\) h`,`\\(5\\) h`,`\\(10\\) h`,`\\(2\\) h`], answer:0,
   trap:`\\(\\tfrac14+\\tfrac16=\\tfrac{5}{12}\\) per hour, so the time is \\(\\tfrac{12}{5}=2.4\\) h.`,
   tip:`Combined rate is the sum; time is its reciprocal.`},

  {topic:"Applications", q:`Painter A finishes in \\(4\\) h and painter B in \\(12\\) h. Together they finish in:`,
   options:[`\\(3\\) h`,`\\(8\\) h`,`\\(6\\) h`,`\\(16\\) h`], answer:0,
   trap:`\\(\\tfrac14+\\tfrac{1}{12}=\\tfrac{3}{12}+\\tfrac{1}{12}=\\tfrac13\\) per hour → \\(3\\) h.`,
   tip:`Use a common denominator when adding the rates.`},

  {topic:"Applications", q:`Two resistors \\(6\\ \\Omega\\) and \\(3\\ \\Omega\\) are in parallel: \\(\\tfrac1R=\\tfrac16+\\tfrac13\\). Then \\(R=\\)`,
   options:[`\\(2\\ \\Omega\\)`,`\\(9\\ \\Omega\\)`,`\\(\\tfrac12\\ \\Omega\\)`,`\\(4.5\\ \\Omega\\)`], answer:0,
   trap:`\\(\\tfrac16+\\tfrac13=\\tfrac12\\Rightarrow R=2\\ \\Omega\\).`,
   tip:`Add the reciprocals, then invert.`},

  {topic:"Applications", q:`The reciprocals of two consecutive integers add to \\(\\tfrac{5}{6}\\). The integers are:`,
   options:[`\\(2\\) and \\(3\\)`,`\\(3\\) and \\(4\\)`,`\\(1\\) and \\(2\\)`,`\\(5\\) and \\(6\\)`], answer:0,
   trap:`\\(\\tfrac1x+\\tfrac{1}{x+1}=\\tfrac56\\); testing gives \\(\\tfrac12+\\tfrac13=\\tfrac56\\), so \\(2,3\\).`,
   tip:`Let the integers be \\(x\\) and \\(x+1\\).`}
  ]
};
