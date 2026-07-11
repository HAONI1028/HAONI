/* Pre-Calculus 11 · Quadratic Equations — question bank.
   To add questions, append objects to `questions` below. Each item:
     { topic, q, options:[4 strings], answer:0, trap, tip }
   Write the CORRECT option FIRST (answer:0); the engine shuffles positions.
   `topic` must appear in `topicOrder`. Math is KaTeX \\( ... \\) — DOUBLE every backslash. */
window.UNIT = {
  meta: {
    course: "Pre-Calculus 11",
    crumb: "Quadratic Equations",
    kicker: "Quadratic Equations",
    title: "Quadratic Equations",
    storeKey: "pc11_quadeq_records_v1",
    reportTitle: "QUADRATIC EQUATIONS — CHALLENGE TEST RESULTS",
    reportSubtitle: "Pre-Calculus 11 · Chapter 4",
    quizSize: 50
  },
  topicOrder: ["Factoring","Completing the Square","Quadratic Formula","Discriminant & Roots","Applications"],
  questions: [
  // ================= FACTORING =================
  {topic:"Factoring", q:`Solve \\(x^{2}-7x+12=0\\).`,
   options:[`\\(x=3,\\ 4\\)`,`\\(x=-3,\\ -4\\)`,`\\(x=2,\\ 6\\)`,`\\(x=12\\)`], answer:0,
   trap:`Factors of \\(12\\) that add to \\(-7\\): \\(-3\\) and \\(-4\\), giving \\((x-3)(x-4)=0\\).`,
   tip:`Find two numbers multiplying to \\(c\\) and adding to \\(b\\).`},

  {topic:"Factoring", q:`Solve \\(x^{2}+2x-15=0\\).`,
   options:[`\\(x=3,\\ -5\\)`,`\\(x=-3,\\ 5\\)`,`\\(x=3,\\ 5\\)`,`\\(x=15\\)`], answer:0,
   trap:`\\((x+5)(x-3)=0\\Rightarrow x=-5,3\\).`,
   tip:`Factors of \\(-15\\) adding to \\(+2\\): \\(+5,-3\\).`},

  {topic:"Factoring", q:`Solve \\(x^{2}-x-20=0\\).`,
   options:[`\\(x=5,\\ -4\\)`,`\\(x=-5,\\ 4\\)`,`\\(x=5,\\ 4\\)`,`\\(x=20\\)`], answer:0,
   trap:`\\((x-5)(x+4)=0\\Rightarrow x=5,-4\\).`,
   tip:`Factors of \\(-20\\) adding to \\(-1\\): \\(-5,+4\\).`},

  {topic:"Factoring", q:`Solve \\(2x^{2}+7x+3=0\\).`,
   options:[`\\(x=-\\tfrac12,\\ -3\\)`,`\\(x=\\tfrac12,\\ 3\\)`,`\\(x=-1,\\ -3\\)`,`\\(x=-\\tfrac13,\\ -2\\)`], answer:0,
   trap:`\\((2x+1)(x+3)=0\\Rightarrow x=-\\tfrac12,-3\\).`,
   tip:`Decompose the middle term: \\(7x=6x+x\\).`},

  {topic:"Factoring", q:`Solve \\(3x^{2}-10x-8=0\\).`,
   options:[`\\(x=4,\\ -\\tfrac23\\)`,`\\(x=-4,\\ \\tfrac23\\)`,`\\(x=4,\\ \\tfrac23\\)`,`\\(x=2,\\ -\\tfrac43\\)`], answer:0,
   trap:`\\((3x+2)(x-4)=0\\Rightarrow x=4,-\\tfrac23\\).`,
   tip:`Split \\(-10x=-12x+2x\\).`},

  {topic:"Factoring", q:`Solve \\(4x^{2}-25=0\\).`,
   options:[`\\(x=\\pm\\tfrac52\\)`,`\\(x=\\pm5\\)`,`\\(x=\\tfrac52\\)`,`\\(x=\\pm\\tfrac{25}{4}\\)`], answer:0,
   trap:`Difference of squares: \\((2x-5)(2x+5)=0\\Rightarrow x=\\pm\\tfrac52\\).`,
   tip:`\\(4x^{2}-25=(2x)^{2}-5^{2}\\).`},

  {topic:"Factoring", q:`Solve \\(x^{2}+6x=0\\).`,
   options:[`\\(x=0,\\ -6\\)`,`\\(x=0,\\ 6\\)`,`\\(x=-6\\)`,`\\(x=6\\)`], answer:0,
   trap:`Factor \\(x(x+6)=0\\); don't lose the root \\(x=0\\).`,
   tip:`Never divide both sides by \\(x\\) — you would drop \\(x=0\\).`},

  {topic:"Factoring", q:`Solve \\(x^{2}-10x+25=0\\).`,
   options:[`\\(x=5\\) (double root)`,`\\(x=\\pm5\\)`,`\\(x=5,\\ -5\\)`,`\\(x=25\\)`], answer:0,
   trap:`\\((x-5)^{2}=0\\) gives a single repeated root \\(x=5\\).`,
   tip:`A perfect-square trinomial has one double root.`},

  {topic:"Factoring", q:`Solve \\(6x^{2}-x-2=0\\).`,
   options:[`\\(x=\\tfrac23,\\ -\\tfrac12\\)`,`\\(x=-\\tfrac23,\\ \\tfrac12\\)`,`\\(x=\\tfrac13,\\ -2\\)`,`\\(x=2,\\ -\\tfrac16\\)`], answer:0,
   trap:`\\((3x-2)(2x+1)=0\\Rightarrow x=\\tfrac23,-\\tfrac12\\).`,
   tip:`Split \\(-x=-4x+3x\\).`},

  {topic:"Factoring", q:`Solve \\(9x^{2}-4=0\\).`,
   options:[`\\(x=\\pm\\tfrac23\\)`,`\\(x=\\pm\\tfrac49\\)`,`\\(x=\\pm2\\)`,`\\(x=\\tfrac23\\)`], answer:0,
   trap:`\\((3x-2)(3x+2)=0\\Rightarrow x=\\pm\\tfrac23\\).`,
   tip:`\\(9x^{2}-4=(3x)^{2}-2^{2}\\).`},

  {topic:"Factoring", q:`Solve \\(x^{2}-2x-8=0\\).`,
   options:[`\\(x=4,\\ -2\\)`,`\\(x=-4,\\ 2\\)`,`\\(x=4,\\ 2\\)`,`\\(x=8\\)`], answer:0,
   trap:`\\((x-4)(x+2)=0\\Rightarrow x=4,-2\\).`,
   tip:`Factors of \\(-8\\) adding to \\(-2\\): \\(-4,+2\\).`},

  // ================= COMPLETING THE SQUARE =================
  {topic:"Completing the Square", q:`Solve \\(x^{2}+4x-1=0\\) by completing the square.`,
   options:[`\\(x=-2\\pm\\sqrt{5}\\)`,`\\(x=2\\pm\\sqrt{5}\\)`,`\\(x=-2\\pm\\sqrt{3}\\)`,`\\(x=-4\\pm\\sqrt{5}\\)`], answer:0,
   trap:`\\((x+2)^{2}=1+4=5\\Rightarrow x=-2\\pm\\sqrt5\\).`,
   tip:`Move the constant, add \\((\\tfrac{b}{2})^{2}=4\\) to both sides.`},

  {topic:"Completing the Square", q:`Solve \\(x^{2}-6x+2=0\\).`,
   options:[`\\(x=3\\pm\\sqrt{7}\\)`,`\\(x=-3\\pm\\sqrt{7}\\)`,`\\(x=3\\pm\\sqrt{11}\\)`,`\\(x=6\\pm\\sqrt{7}\\)`], answer:0,
   trap:`\\((x-3)^{2}=9-2=7\\Rightarrow x=3\\pm\\sqrt7\\).`,
   tip:`\\((\\tfrac{-6}{2})^{2}=9\\); the constant moves over.`},

  {topic:"Completing the Square", q:`Solve \\(x^{2}+2x-5=0\\).`,
   options:[`\\(x=-1\\pm\\sqrt{6}\\)`,`\\(x=1\\pm\\sqrt{6}\\)`,`\\(x=-1\\pm\\sqrt{5}\\)`,`\\(x=-2\\pm\\sqrt{6}\\)`], answer:0,
   trap:`\\((x+1)^{2}=5+1=6\\Rightarrow x=-1\\pm\\sqrt6\\).`,
   tip:`Add \\(1\\) to complete the square, and \\(1\\) to the other side.`},

  {topic:"Completing the Square", q:`Solve \\(x^{2}-8x+11=0\\).`,
   options:[`\\(x=4\\pm\\sqrt{5}\\)`,`\\(x=-4\\pm\\sqrt{5}\\)`,`\\(x=4\\pm\\sqrt{11}\\)`,`\\(x=8\\pm\\sqrt{5}\\)`], answer:0,
   trap:`\\((x-4)^{2}=16-11=5\\Rightarrow x=4\\pm\\sqrt5\\).`,
   tip:`\\((\\tfrac{-8}{2})^{2}=16\\).`},

  {topic:"Completing the Square", q:`Solve \\(x^{2}+10x+18=0\\).`,
   options:[`\\(x=-5\\pm\\sqrt{7}\\)`,`\\(x=5\\pm\\sqrt{7}\\)`,`\\(x=-5\\pm\\sqrt{18}\\)`,`\\(x=-10\\pm\\sqrt{7}\\)`], answer:0,
   trap:`\\((x+5)^{2}=25-18=7\\Rightarrow x=-5\\pm\\sqrt7\\).`,
   tip:`Half of \\(10\\) is \\(5\\); \\((x+5)^{2}=25\\).`},

  {topic:"Completing the Square", q:`Solve \\(x^{2}-3x+1=0\\) by completing the square.`,
   options:[`\\(x=\\tfrac{3\\pm\\sqrt{5}}{2}\\)`,`\\(x=\\tfrac{-3\\pm\\sqrt{5}}{2}\\)`,`\\(x=\\tfrac{3\\pm\\sqrt{13}}{2}\\)`,`\\(x=3\\pm\\sqrt5\\)`], answer:0,
   trap:`\\((x-\\tfrac32)^{2}=\\tfrac94-1=\\tfrac54\\Rightarrow x=\\tfrac32\\pm\\tfrac{\\sqrt5}{2}\\).`,
   tip:`\\((\\tfrac{-3}{2})^{2}=\\tfrac94\\).`},

  {topic:"Completing the Square", q:`To complete the square for \\(x^{2}+12x\\), you add:`,
   options:[`\\(36\\)`,`\\(12\\)`,`\\(6\\)`,`\\(144\\)`], answer:0,
   trap:`Add \\((\\tfrac{b}{2})^{2}=(6)^{2}=36\\).`,
   tip:`Half the \\(x\\)-coefficient, then square.`},

  {topic:"Completing the Square", q:`Solve \\(2x^{2}-4x-3=0\\) by completing the square.`,
   options:[`\\(x=1\\pm\\tfrac{\\sqrt{10}}{2}\\)`,`\\(x=1\\pm\\sqrt{10}\\)`,`\\(x=-1\\pm\\tfrac{\\sqrt{10}}{2}\\)`,`\\(x=2\\pm\\tfrac{\\sqrt{10}}{2}\\)`], answer:0,
   trap:`Divide by \\(2\\): \\(x^{2}-2x=\\tfrac32\\); \\((x-1)^{2}=\\tfrac52\\Rightarrow x=1\\pm\\tfrac{\\sqrt{10}}{2}\\).`,
   tip:`Divide by the leading coefficient first, then complete the square.`},

  // ================= QUADRATIC FORMULA =================
  {topic:"Quadratic Formula", q:`The quadratic formula gives \\(x=\\)`,
   options:[`\\(\\tfrac{-b\\pm\\sqrt{b^{2}-4ac}}{2a}\\)`,`\\(\\tfrac{-b\\pm\\sqrt{b^{2}+4ac}}{2a}\\)`,`\\(\\tfrac{b\\pm\\sqrt{b^{2}-4ac}}{2a}\\)`,`\\(\\tfrac{-b\\pm\\sqrt{b^{2}-4ac}}{a}\\)`], answer:0,
   trap:`It is \\(-b\\), a \\(-4ac\\) under the root, and \\(2a\\) in the denominator.`,
   tip:`Memorize \\(x=\\tfrac{-b\\pm\\sqrt{b^{2}-4ac}}{2a}\\).`},

  {topic:"Quadratic Formula", q:`Solve \\(x^{2}+5x+2=0\\).`,
   options:[`\\(x=\\tfrac{-5\\pm\\sqrt{17}}{2}\\)`,`\\(x=\\tfrac{5\\pm\\sqrt{17}}{2}\\)`,`\\(x=\\tfrac{-5\\pm\\sqrt{33}}{2}\\)`,`\\(x=\\tfrac{-5\\pm\\sqrt{17}}{4}\\)`], answer:0,
   trap:`\\(b^{2}-4ac=25-8=17\\); denominator \\(2a=2\\).`,
   tip:`Substitute \\(a=1,b=5,c=2\\).`},

  {topic:"Quadratic Formula", q:`Solve \\(2x^{2}-3x-1=0\\).`,
   options:[`\\(x=\\tfrac{3\\pm\\sqrt{17}}{4}\\)`,`\\(x=\\tfrac{-3\\pm\\sqrt{17}}{4}\\)`,`\\(x=\\tfrac{3\\pm\\sqrt{17}}{2}\\)`,`\\(x=\\tfrac{3\\pm\\sqrt{1}}{4}\\)`], answer:0,
   trap:`\\(b^{2}-4ac=9-4(2)(-1)=9+8=17\\); \\(2a=4\\).`,
   tip:`Watch the sign: \\(-4ac=-4(2)(-1)=+8\\).`},

  {topic:"Quadratic Formula", q:`Solve \\(3x^{2}+2x-2=0\\).`,
   options:[`\\(x=\\tfrac{-1\\pm\\sqrt{7}}{3}\\)`,`\\(x=\\tfrac{-2\\pm\\sqrt{7}}{6}\\)`,`\\(x=\\tfrac{-1\\pm\\sqrt{7}}{6}\\)`,`\\(x=\\tfrac{-1\\pm\\sqrt{28}}{3}\\)`], answer:0,
   trap:`Disc \\(=4+24=28=4\\cdot7\\); \\(x=\\tfrac{-2\\pm2\\sqrt7}{6}=\\tfrac{-1\\pm\\sqrt7}{3}\\).`,
   tip:`Simplify \\(\\sqrt{28}=2\\sqrt7\\) and reduce the fraction.`},

  {topic:"Quadratic Formula", q:`Solve \\(x^{2}-4x+1=0\\).`,
   options:[`\\(x=2\\pm\\sqrt{3}\\)`,`\\(x=2\\pm\\sqrt{5}\\)`,`\\(x=-2\\pm\\sqrt{3}\\)`,`\\(x=4\\pm\\sqrt{3}\\)`], answer:0,
   trap:`Disc \\(=16-4=12\\); \\(x=\\tfrac{4\\pm2\\sqrt3}{2}=2\\pm\\sqrt3\\).`,
   tip:`\\(\\sqrt{12}=2\\sqrt3\\), then divide by \\(2\\).`},

  {topic:"Quadratic Formula", q:`Solve \\(x^{2}+x-1=0\\).`,
   options:[`\\(x=\\tfrac{-1\\pm\\sqrt{5}}{2}\\)`,`\\(x=\\tfrac{1\\pm\\sqrt{5}}{2}\\)`,`\\(x=\\tfrac{-1\\pm\\sqrt{3}}{2}\\)`,`\\(x=-1\\pm\\sqrt5\\)`], answer:0,
   trap:`\\(b^{2}-4ac=1+4=5\\).`,
   tip:`The golden-ratio equation: disc \\(=5\\).`},

  {topic:"Quadratic Formula", q:`Solve \\(5x^{2}-2x-1=0\\).`,
   options:[`\\(x=\\tfrac{1\\pm\\sqrt{6}}{5}\\)`,`\\(x=\\tfrac{2\\pm\\sqrt{6}}{5}\\)`,`\\(x=\\tfrac{1\\pm\\sqrt{6}}{10}\\)`,`\\(x=\\tfrac{1\\pm\\sqrt{24}}{5}\\)`], answer:0,
   trap:`Disc \\(=4+20=24=4\\cdot6\\); \\(x=\\tfrac{2\\pm2\\sqrt6}{10}=\\tfrac{1\\pm\\sqrt6}{5}\\).`,
   tip:`Reduce after taking out \\(\\sqrt{24}=2\\sqrt6\\).`},

  {topic:"Quadratic Formula", q:`Solve \\(x^{2}-2x-4=0\\).`,
   options:[`\\(x=1\\pm\\sqrt{5}\\)`,`\\(x=1\\pm\\sqrt{3}\\)`,`\\(x=-1\\pm\\sqrt{5}\\)`,`\\(x=2\\pm\\sqrt{5}\\)`], answer:0,
   trap:`Disc \\(=4+16=20\\); \\(x=\\tfrac{2\\pm2\\sqrt5}{2}=1\\pm\\sqrt5\\).`,
   tip:`\\(\\sqrt{20}=2\\sqrt5\\).`},

  // ================= DISCRIMINANT & NATURE OF ROOTS =================
  {topic:"Discriminant & Roots", q:`The discriminant of \\(ax^{2}+bx+c=0\\) is:`,
   options:[`\\(b^{2}-4ac\\)`,`\\(b^{2}+4ac\\)`,`\\(\\sqrt{b^{2}-4ac}\\)`,`\\(4ac-b^{2}\\)`], answer:0,
   trap:`The discriminant is \\(b^{2}-4ac\\) (no square root).`,
   tip:`It is the quantity under the root in the formula.`},

  {topic:"Discriminant & Roots", q:`If the discriminant is positive, the equation has:`,
   options:[`two distinct real roots`,`one real root`,`no real roots`,`two equal roots`], answer:0,
   trap:`\\(b^{2}-4ac>0\\) → two different real roots.`,
   tip:`Positive → two; zero → one; negative → none.`},

  {topic:"Discriminant & Roots", q:`If the discriminant equals zero, the equation has:`,
   options:[`one real (double) root`,`two distinct real roots`,`no real roots`,`two complex roots`], answer:0,
   trap:`\\(b^{2}-4ac=0\\) → a single repeated root.`,
   tip:`Zero discriminant means the parabola touches the axis once.`},

  {topic:"Discriminant & Roots", q:`Describe the roots of \\(x^{2}+x+1=0\\).`,
   options:[`no real roots`,`two real roots`,`one real root`,`two rational roots`], answer:0,
   trap:`Disc \\(=1-4=-3<0\\), so there are no real roots.`,
   tip:`Negative discriminant → no real solutions.`},

  {topic:"Discriminant & Roots", q:`Describe the roots of \\(2x^{2}-3x-5=0\\).`,
   options:[`two rational roots`,`two irrational roots`,`one real root`,`no real roots`], answer:0,
   trap:`Disc \\(=9+40=49=7^{2}\\), a perfect square → two rational roots.`,
   tip:`Perfect-square discriminant → rational (factorable) roots.`},

  {topic:"Discriminant & Roots", q:`For \\(x^{2}+kx+9=0\\) to have exactly one real root, \\(k=\\)`,
   options:[`\\(\\pm6\\)`,`\\(6\\)`,`\\(\\pm3\\)`,`\\(9\\)`], answer:0,
   trap:`Set disc \\(=0\\): \\(k^{2}-36=0\\Rightarrow k=\\pm6\\).`,
   tip:`One root ⇔ \\(b^{2}-4ac=0\\).`},

  {topic:"Discriminant & Roots", q:`Describe the roots of \\(3x^{2}-6x+3=0\\).`,
   options:[`one real (double) root`,`two distinct real roots`,`no real roots`,`two irrational roots`], answer:0,
   trap:`Disc \\(=36-36=0\\) → equal roots (\\(x=1\\)).`,
   tip:`Factor check: \\(3(x-1)^{2}=0\\).`},

  {topic:"Discriminant & Roots", q:`For what values of \\(k\\) does \\(x^{2}+6x+k=0\\) have two distinct real roots?`,
   options:[`\\(k<9\\)`,`\\(k>9\\)`,`\\(k=9\\)`,`\\(k<-9\\)`], answer:0,
   trap:`Disc \\(=36-4k>0\\Rightarrow k<9\\).`,
   tip:`Two distinct roots ⇔ discriminant \\(>0\\).`},

  {topic:"Discriminant & Roots", q:`How many \\(x\\)-intercepts does \\(y=x^{2}-2x+5\\) have?`,
   options:[`none`,`one`,`two`,`three`], answer:0,
   trap:`Disc \\(=4-20=-16<0\\) → the parabola never meets the \\(x\\)-axis.`,
   tip:`Intercept count = number of real roots.`},

  {topic:"Discriminant & Roots", q:`Describe the roots of \\(x^{2}-4x+4=0\\).`,
   options:[`one real (double) root`,`two distinct real roots`,`no real roots`,`two rational roots`], answer:0,
   trap:`Disc \\(=16-16=0\\Rightarrow\\) double root \\(x=2\\).`,
   tip:`\\((x-2)^{2}=0\\).`},

  // ================= APPLICATIONS =================
  {topic:"Applications", q:`The product of two consecutive integers is \\(56\\). The integers could be:`,
   options:[`\\(7\\) and \\(8\\)`,`\\(6\\) and \\(9\\)`,`\\(8\\) and \\(9\\)`,`\\(7\\) and \\(9\\)`], answer:0,
   trap:`\\(x(x+1)=56\\Rightarrow x^{2}+x-56=0\\Rightarrow(x+8)(x-7)=0\\Rightarrow x=7\\), so \\(7,8\\).`,
   tip:`Let the integers be \\(x\\) and \\(x+1\\).`},

  {topic:"Applications", q:`A rectangle's length is \\(3\\) more than its width and its area is \\(40\\). The width is:`,
   options:[`\\(5\\)`,`\\(8\\)`,`\\(4\\)`,`\\(10\\)`], answer:0,
   trap:`\\(w(w+3)=40\\Rightarrow w^{2}+3w-40=0\\Rightarrow(w+8)(w-5)=0\\Rightarrow w=5\\).`,
   tip:`Reject the negative width \\(w=-8\\).`},

  {topic:"Applications", q:`A ball's height is \\(h=-5t^{2}+20t+25\\). It hits the ground at:`,
   options:[`\\(t=5\\) s`,`\\(t=4\\) s`,`\\(t=25\\) s`,`\\(t=1\\) s`], answer:0,
   trap:`\\(-5t^{2}+20t+25=0\\Rightarrow t^{2}-4t-5=0\\Rightarrow(t-5)(t+1)=0\\Rightarrow t=5\\).`,
   tip:`Divide by \\(-5\\) first, then factor; reject \\(t=-1\\).`},

  {topic:"Applications", q:`Two numbers differ by \\(4\\) and their product is \\(21\\). They are:`,
   options:[`\\(3\\) and \\(7\\)`,`\\(2\\) and \\(6\\)`,`\\(4\\) and \\(21\\)`,`\\(1\\) and \\(5\\)`], answer:0,
   trap:`\\(x(x+4)=21\\Rightarrow x^{2}+4x-21=0\\Rightarrow(x+7)(x-3)=0\\Rightarrow x=3\\), so \\(3,7\\).`,
   tip:`Let them be \\(x\\) and \\(x+4\\).`},

  {topic:"Applications", q:`The sum of a positive number and its square is \\(30\\). The number is:`,
   options:[`\\(5\\)`,`\\(6\\)`,`\\(3\\)`,`\\(25\\)`], answer:0,
   trap:`\\(x+x^{2}=30\\Rightarrow x^{2}+x-30=0\\Rightarrow(x+6)(x-5)=0\\Rightarrow x=5\\).`,
   tip:`Keep the positive root only.`},

  {topic:"Applications", q:`A rectangle has length \\(x\\) and width \\(x-2\\) with area \\(24\\). Then \\(x=\\)`,
   options:[`\\(6\\)`,`\\(4\\)`,`\\(8\\)`,`\\(12\\)`], answer:0,
   trap:`\\(x(x-2)=24\\Rightarrow x^{2}-2x-24=0\\Rightarrow(x-6)(x+4)=0\\Rightarrow x=6\\).`,
   tip:`Reject \\(x=-4\\).`},

  {topic:"Applications", q:`A projectile's height is \\(h=-16t^{2}+64t\\) (feet). It lands at:`,
   options:[`\\(t=4\\) s`,`\\(t=64\\) s`,`\\(t=2\\) s`,`\\(t=16\\) s`], answer:0,
   trap:`\\(-16t(t-4)=0\\Rightarrow t=0\\) or \\(4\\); landing is \\(t=4\\).`,
   tip:`\\(t=0\\) is launch; the other root is landing.`},

  {topic:"Applications", q:`A right triangle has hypotenuse \\(13\\) and one leg \\(7\\) longer than the other. The shorter leg is:`,
   options:[`\\(5\\)`,`\\(6\\)`,`\\(12\\)`,`\\(8\\)`], answer:0,
   trap:`\\(a^{2}+(a+7)^{2}=169\\Rightarrow 2a^{2}+14a-120=0\\Rightarrow a^{2}+7a-60=0\\Rightarrow(a+12)(a-5)=0\\Rightarrow a=5\\).`,
   tip:`Use the Pythagorean theorem, then reject the negative root.`},

  {topic:"Applications", q:`Two consecutive even integers have a product of \\(48\\). The smaller is:`,
   options:[`\\(6\\)`,`\\(8\\)`,`\\(4\\)`,`\\(12\\)`], answer:0,
   trap:`\\(x(x+2)=48\\Rightarrow x^{2}+2x-48=0\\Rightarrow(x+8)(x-6)=0\\Rightarrow x=6\\).`,
   tip:`Consecutive even integers: \\(x\\) and \\(x+2\\).`}
  ]
};
