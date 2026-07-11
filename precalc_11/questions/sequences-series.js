/* Pre-Calculus 11 · Sequences & Series — question bank.
   To add questions, append objects to `questions` below. Each item:
     { topic, q, options:[4 strings], answer:0, trap, tip }
   Write the CORRECT option FIRST (answer:0); the engine shuffles positions.
   `topic` must appear in `topicOrder`. Math is KaTeX \\( ... \\) — DOUBLE every backslash. */
window.UNIT = {
  meta: {
    course: "Pre-Calculus 11",
    crumb: "Sequences & Series",
    kicker: "Sequences & Series",
    title: "Sequences & Series",
    storeKey: "pc11_seqseries_records_v1",
    reportTitle: "SEQUENCES & SERIES — CHALLENGE TEST RESULTS",
    reportSubtitle: "Pre-Calculus 11 · Chapter 1",
    quizSize: 50
  },
  topicOrder: ["Arithmetic Sequences","Arithmetic Series","Geometric Sequences","Geometric Series","Infinite Series"],
  questions: [
  // ================= ARITHMETIC SEQUENCES =================
  {topic:"Arithmetic Sequences", q:`Find the \\(10\\)th term of \\(3, 7, 11, \\ldots\\).`,
   options:[`\\(39\\)`,`\\(43\\)`,`\\(40\\)`,`\\(37\\)`], answer:0,
   trap:`\\(t_{n}=a+(n-1)d=3+9(4)=39\\).`,
   tip:`Use \\(t_{n}=a+(n-1)d\\) with \\(a=3,\\ d=4\\).`},

  {topic:"Arithmetic Sequences", q:`Find the common difference of \\(5, 2, -1, \\ldots\\).`,
   options:[`\\(-3\\)`,`\\(3\\)`,`\\(-2\\)`,`\\(-1\\)`], answer:0,
   trap:`\\(d=t_{2}-t_{1}=2-5=-3\\).`,
   tip:`Subtract any term from the next.`},

  {topic:"Arithmetic Sequences", q:`Find the \\(8\\)th term of \\(2, 5, 8, \\ldots\\).`,
   options:[`\\(23\\)`,`\\(24\\)`,`\\(21\\)`,`\\(26\\)`], answer:0,
   trap:`\\(t_{8}=2+7(3)=23\\).`,
   tip:`\\(a=2,\\ d=3\\); add \\(7\\) differences.`},

  {topic:"Arithmetic Sequences", q:`Which term of \\(4, 7, 10, \\ldots\\) equals \\(40\\)?`,
   options:[`the \\(13\\)th`,`the \\(12\\)th`,`the \\(14\\)th`,`the \\(36\\)th`], answer:0,
   trap:`\\(4+(n-1)3=40\\Rightarrow 3(n-1)=36\\Rightarrow n=13\\).`,
   tip:`Set \\(t_{n}=40\\) and solve for \\(n\\).`},

  {topic:"Arithmetic Sequences", q:`Find the general term of \\(7, 10, 13, \\ldots\\).`,
   options:[`\\(t_{n}=3n+4\\)`,`\\(t_{n}=3n+7\\)`,`\\(t_{n}=7n+3\\)`,`\\(t_{n}=4n+3\\)`], answer:0,
   trap:`\\(t_{n}=7+(n-1)3=3n+4\\).`,
   tip:`Expand \\(a+(n-1)d\\) and simplify.`},

  {topic:"Arithmetic Sequences", q:`If \\(t_{1}=5\\) and \\(d=-2\\), find \\(t_{20}\\).`,
   options:[`\\(-33\\)`,`\\(-35\\)`,`\\(33\\)`,`\\(-30\\)`], answer:0,
   trap:`\\(t_{20}=5+19(-2)=5-38=-33\\).`,
   tip:`Nineteen steps of \\(-2\\) from \\(5\\).`},

  {topic:"Arithmetic Sequences", q:`In an arithmetic sequence \\(t_{3}=11\\) and \\(t_{7}=27\\). Find \\(d\\).`,
   options:[`\\(4\\)`,`\\(16\\)`,`\\(3\\)`,`\\(8\\)`], answer:0,
   trap:`\\(d=\\dfrac{t_{7}-t_{3}}{7-3}=\\dfrac{16}{4}=4\\).`,
   tip:`The gap over four steps is \\(16\\).`},

  {topic:"Arithmetic Sequences", q:`If \\(t_{3}=11\\) and \\(d=4\\), find \\(t_{1}\\).`,
   options:[`\\(3\\)`,`\\(7\\)`,`\\(-1\\)`,`\\(5\\)`], answer:0,
   trap:`\\(t_{1}=t_{3}-2d=11-8=3\\).`,
   tip:`Step back two differences from \\(t_{3}\\).`},

  {topic:"Arithmetic Sequences", q:`The arithmetic mean of \\(6\\) and \\(14\\) is:`,
   options:[`\\(10\\)`,`\\(8\\)`,`\\(20\\)`,`\\(7\\)`], answer:0,
   trap:`\\(\\dfrac{6+14}{2}=10\\).`,
   tip:`The mean sits halfway between the two numbers.`},

  {topic:"Arithmetic Sequences", q:`If \\(t_{1}=-4\\) and \\(d=5\\), find \\(t_{10}\\).`,
   options:[`\\(41\\)`,`\\(46\\)`,`\\(36\\)`,`\\(45\\)`], answer:0,
   trap:`\\(t_{10}=-4+9(5)=41\\).`,
   tip:`Nine steps of \\(5\\) from \\(-4\\).`},

  // ================= ARITHMETIC SERIES =================
  {topic:"Arithmetic Series", q:`Find the sum of the first \\(10\\) terms of \\(3, 7, 11, \\ldots\\).`,
   options:[`\\(210\\)`,`\\(195\\)`,`\\(220\\)`,`\\(390\\)`], answer:0,
   trap:`\\(S_{10}=\\tfrac{10}{2}(2(3)+9(4))=5(42)=210\\).`,
   tip:`\\(S_{n}=\\tfrac{n}{2}\\big(2a+(n-1)d\\big)\\).`},

  {topic:"Arithmetic Series", q:`Find \\(1+2+3+\\cdots+100\\).`,
   options:[`\\(5050\\)`,`\\(5000\\)`,`\\(10100\\)`,`\\(2550\\)`], answer:0,
   trap:`\\(S_{100}=\\tfrac{100}{2}(1+100)=50(101)=5050\\).`,
   tip:`\\(S_{n}=\\tfrac{n}{2}(t_{1}+t_{n})\\).`},

  {topic:"Arithmetic Series", q:`Find the sum of the first \\(20\\) terms of \\(2, 5, 8, \\ldots\\).`,
   options:[`\\(610\\)`,`\\(590\\)`,`\\(600\\)`,`\\(305\\)`], answer:0,
   trap:`\\(S_{20}=\\tfrac{20}{2}(2(2)+19(3))=10(61)=610\\).`,
   tip:`\\(2a+(n-1)d=4+57=61\\).`},

  {topic:"Arithmetic Series", q:`Find the sum of the first \\(15\\) odd numbers \\(1+3+5+\\cdots\\).`,
   options:[`\\(225\\)`,`\\(255\\)`,`\\(210\\)`,`\\(196\\)`], answer:0,
   trap:`The sum of the first \\(n\\) odd numbers is \\(n^{2}=15^{2}=225\\).`,
   tip:`\\(1+3+\\cdots+(2n-1)=n^{2}\\).`},

  {topic:"Arithmetic Series", q:`The sum of an arithmetic series is:`,
   options:[`\\(S_{n}=\\tfrac{n}{2}(t_{1}+t_{n})\\)`,`\\(S_{n}=\\tfrac{n}{2}(t_{1}\\cdot t_{n})\\)`,`\\(S_{n}=n(t_{1}+t_{n})\\)`,`\\(S_{n}=\\tfrac{a(r^{n}-1)}{r-1}\\)`], answer:0,
   trap:`Average the first and last terms, then multiply by \\(n\\): \\(\\tfrac{n}{2}(t_{1}+t_{n})\\).`,
   tip:`The last form is the geometric one — don't mix them up.`},

  {topic:"Arithmetic Series", q:`A series has \\(t_{1}=4\\) and \\(t_{8}=25\\). Find \\(S_{8}\\).`,
   options:[`\\(116\\)`,`\\(100\\)`,`\\(120\\)`,`\\(232\\)`], answer:0,
   trap:`\\(S_{8}=\\tfrac{8}{2}(4+25)=4(29)=116\\).`,
   tip:`Use \\(S_{n}=\\tfrac{n}{2}(t_{1}+t_{n})\\) directly.`},

  {topic:"Arithmetic Series", q:`Find \\(5+10+15+\\cdots+50\\).`,
   options:[`\\(275\\)`,`\\(250\\)`,`\\(300\\)`,`\\(255\\)`], answer:0,
   trap:`There are \\(10\\) terms: \\(S=\\tfrac{10}{2}(5+50)=5(55)=275\\).`,
   tip:`Count the terms first: \\((50-5)/5+1=10\\).`},

  {topic:"Arithmetic Series", q:`Find the sum of the first \\(12\\) terms of \\(100, 95, 90, \\ldots\\).`,
   options:[`\\(870\\)`,`\\(900\\)`,`\\(840\\)`,`\\(1020\\)`], answer:0,
   trap:`\\(S_{12}=\\tfrac{12}{2}(2(100)+11(-5))=6(145)=870\\).`,
   tip:`\\(d=-5\\); \\(2a+(n-1)d=200-55=145\\).`},

  // ================= GEOMETRIC SEQUENCES =================
  {topic:"Geometric Sequences", q:`Find the common ratio of \\(2, 6, 18, \\ldots\\).`,
   options:[`\\(3\\)`,`\\(4\\)`,`\\(\\tfrac13\\)`,`\\(6\\)`], answer:0,
   trap:`\\(r=\\dfrac{t_{2}}{t_{1}}=\\dfrac{6}{2}=3\\).`,
   tip:`Divide any term by the previous one.`},

  {topic:"Geometric Sequences", q:`Find the \\(5\\)th term of \\(3, 6, 12, \\ldots\\).`,
   options:[`\\(48\\)`,`\\(96\\)`,`\\(24\\)`,`\\(45\\)`], answer:0,
   trap:`\\(t_{5}=a r^{4}=3(2)^{4}=48\\).`,
   tip:`\\(t_{n}=a r^{\\,n-1}\\) with \\(a=3,\\ r=2\\).`},

  {topic:"Geometric Sequences", q:`Find the \\(6\\)th term of \\(1, -2, 4, -8, \\ldots\\).`,
   options:[`\\(-32\\)`,`\\(32\\)`,`\\(-16\\)`,`\\(64\\)`], answer:0,
   trap:`\\(t_{6}=(1)(-2)^{5}=-32\\); an odd power keeps the sign negative.`,
   tip:`\\(r=-2\\); watch the alternating sign.`},

  {topic:"Geometric Sequences", q:`Find the general term of \\(5, 10, 20, \\ldots\\).`,
   options:[`\\(t_{n}=5\\cdot 2^{\\,n-1}\\)`,`\\(t_{n}=5\\cdot 2^{n}\\)`,`\\(t_{n}=2\\cdot 5^{\\,n-1}\\)`,`\\(t_{n}=5n+2\\)`], answer:0,
   trap:`\\(t_{n}=a r^{\\,n-1}=5\\cdot 2^{\\,n-1}\\).`,
   tip:`The exponent is \\(n-1\\), not \\(n\\).`},

  {topic:"Geometric Sequences", q:`Find the common ratio of \\(81, 27, 9, \\ldots\\).`,
   options:[`\\(\\tfrac13\\)`,`\\(3\\)`,`\\(-\\tfrac13\\)`,`\\(\\tfrac19\\)`], answer:0,
   trap:`\\(r=\\dfrac{27}{81}=\\tfrac13\\).`,
   tip:`A decreasing geometric sequence has \\(0<r<1\\).`},

  {topic:"Geometric Sequences", q:`If \\(t_{1}=4\\) and \\(r=3\\), find \\(t_{4}\\).`,
   options:[`\\(108\\)`,`\\(36\\)`,`\\(324\\)`,`\\(96\\)`], answer:0,
   trap:`\\(t_{4}=4(3)^{3}=4(27)=108\\).`,
   tip:`Three factors of \\(3\\) from \\(4\\).`},

  {topic:"Geometric Sequences", q:`The geometric mean of \\(4\\) and \\(9\\) is:`,
   options:[`\\(6\\)`,`\\(6.5\\)`,`\\(13\\)`,`\\(36\\)`], answer:0,
   trap:`\\(\\sqrt{4\\cdot 9}=\\sqrt{36}=6\\).`,
   tip:`Geometric mean of \\(a,b\\) is \\(\\sqrt{ab}\\).`},

  {topic:"Geometric Sequences", q:`Which term of \\(2, 6, 18, \\ldots\\) equals \\(486\\)?`,
   options:[`the \\(6\\)th`,`the \\(5\\)th`,`the \\(7\\)th`,`the \\(243\\)rd`], answer:0,
   trap:`\\(2\\cdot 3^{\\,n-1}=486\\Rightarrow 3^{\\,n-1}=243=3^{5}\\Rightarrow n=6\\).`,
   tip:`Divide out \\(a\\), then match powers of \\(3\\).`},

  {topic:"Geometric Sequences", q:`In a geometric sequence \\(t_{3}=12\\) and \\(t_{5}=48\\). Find \\(r\\).`,
   options:[`\\(\\pm2\\)`,`\\(2\\)`,`\\(4\\)`,`\\(\\pm4\\)`], answer:0,
   trap:`\\(r^{2}=\\dfrac{t_{5}}{t_{3}}=4\\Rightarrow r=\\pm2\\).`,
   tip:`Two steps means \\(r^{2}\\); take both roots.`},

  {topic:"Geometric Sequences", q:`Find the \\(7\\)th term of \\(64, 32, 16, \\ldots\\).`,
   options:[`\\(1\\)`,`\\(2\\)`,`\\(\\tfrac12\\)`,`\\(4\\)`], answer:0,
   trap:`\\(t_{7}=64\\left(\\tfrac12\\right)^{6}=\\dfrac{64}{64}=1\\).`,
   tip:`\\(r=\\tfrac12\\); \\(\\left(\\tfrac12\\right)^{6}=\\tfrac{1}{64}\\).`},

  // ================= GEOMETRIC SERIES =================
  {topic:"Geometric Series", q:`Find the sum of the first \\(5\\) terms of \\(3, 6, 12, \\ldots\\).`,
   options:[`\\(93\\)`,`\\(96\\)`,`\\(45\\)`,`\\(90\\)`], answer:0,
   trap:`\\(S_{5}=\\dfrac{3(2^{5}-1)}{2-1}=3(31)=93\\).`,
   tip:`\\(S_{n}=\\dfrac{a(r^{n}-1)}{r-1}\\).`},

  {topic:"Geometric Series", q:`Find \\(2+6+18+54\\).`,
   options:[`\\(80\\)`,`\\(78\\)`,`\\(108\\)`,`\\(162\\)`], answer:0,
   trap:`\\(S_{4}=\\dfrac{2(3^{4}-1)}{3-1}=\\dfrac{2(80)}{2}=80\\).`,
   tip:`Or just add the four terms.`},

  {topic:"Geometric Series", q:`Find the sum of the first \\(6\\) terms of \\(1, 2, 4, \\ldots\\).`,
   options:[`\\(63\\)`,`\\(64\\)`,`\\(127\\)`,`\\(31\\)`], answer:0,
   trap:`\\(S_{6}=\\dfrac{1(2^{6}-1)}{2-1}=2^{6}-1=63\\).`,
   tip:`Powers of two: \\(S_{n}=2^{n}-1\\).`},

  {topic:"Geometric Series", q:`The sum of a finite geometric series is:`,
   options:[`\\(S_{n}=\\dfrac{a(r^{n}-1)}{r-1}\\)`,`\\(S_{n}=\\dfrac{a}{1-r}\\)`,`\\(S_{n}=\\tfrac{n}{2}(t_{1}+t_{n})\\)`,`\\(S_{n}=a+(n-1)d\\)`], answer:0,
   trap:`The finite geometric sum uses \\(r^{n}\\); the middle option is the infinite one.`,
   tip:`\\(r-1\\) in the denominator, \\(r^{n}-1\\) on top.`},

  {topic:"Geometric Series", q:`Find \\(1+3+9+27+81\\).`,
   options:[`\\(121\\)`,`\\(120\\)`,`\\(243\\)`,`\\(122\\)`], answer:0,
   trap:`\\(S_{5}=\\dfrac{3^{5}-1}{3-1}=\\dfrac{242}{2}=121\\).`,
   tip:`\\(a=1,\\ r=3\\).`},

  {topic:"Geometric Series", q:`Find the sum of the first \\(4\\) terms of \\(5, 10, 20, \\ldots\\).`,
   options:[`\\(75\\)`,`\\(80\\)`,`\\(70\\)`,`\\(150\\)`], answer:0,
   trap:`\\(S_{4}=\\dfrac{5(2^{4}-1)}{2-1}=5(15)=75\\).`,
   tip:`\\(2^{4}-1=15\\).`},

  {topic:"Geometric Series", q:`Find the sum of the first \\(5\\) terms of \\(2, -4, 8, -16, \\ldots\\).`,
   options:[`\\(22\\)`,`\\(-22\\)`,`\\(30\\)`,`\\(-10\\)`], answer:0,
   trap:`\\(S_{5}=\\dfrac{2((-2)^{5}-1)}{-2-1}=\\dfrac{2(-33)}{-3}=22\\).`,
   tip:`\\(r=-2\\); keep the signs in \\((-2)^{5}=-32\\).`},

  // ================= INFINITE GEOMETRIC SERIES =================
  {topic:"Infinite Series", q:`Find the sum \\(1+\\tfrac12+\\tfrac14+\\cdots\\).`,
   options:[`\\(2\\)`,`\\(1\\)`,`\\(\\tfrac32\\)`,`no sum`], answer:0,
   trap:`\\(S_{\\infty}=\\dfrac{a}{1-r}=\\dfrac{1}{1-\\tfrac12}=2\\).`,
   tip:`\\(S_{\\infty}=\\dfrac{a}{1-r}\\) when \\(|r|<1\\).`},

  {topic:"Infinite Series", q:`Find the sum \\(8+4+2+1+\\cdots\\).`,
   options:[`\\(16\\)`,`\\(15\\)`,`\\(12\\)`,`no sum`], answer:0,
   trap:`\\(S_{\\infty}=\\dfrac{8}{1-\\tfrac12}=16\\).`,
   tip:`\\(r=\\tfrac12\\), so divide \\(a\\) by \\(\\tfrac12\\).`},

  {topic:"Infinite Series", q:`The sum of a convergent infinite geometric series is:`,
   options:[`\\(S_{\\infty}=\\dfrac{a}{1-r}\\)`,`\\(S_{\\infty}=\\dfrac{a(r^{n}-1)}{r-1}\\)`,`\\(S_{\\infty}=\\dfrac{a}{1+r}\\)`,`\\(S_{\\infty}=\\tfrac{n}{2}(t_{1}+t_{n})\\)`], answer:0,
   trap:`\\(S_{\\infty}=\\dfrac{a}{1-r}\\), valid only when \\(|r|<1\\).`,
   tip:`No \\(n\\) appears in the infinite sum.`},

  {topic:"Infinite Series", q:`An infinite geometric series has a finite sum only when:`,
   options:[`\\(|r|<1\\)`,`\\(|r|>1\\)`,`\\(r>0\\)`,`\\(r=1\\)`], answer:0,
   trap:`Convergence requires \\(-1<r<1\\).`,
   tip:`If \\(|r|\\ge1\\) the terms don't shrink to zero.`},

  {topic:"Infinite Series", q:`Find the sum \\(9+3+1+\\cdots\\).`,
   options:[`\\(\\tfrac{27}{2}\\)`,`\\(13\\)`,`\\(12\\)`,`\\(27\\)`], answer:0,
   trap:`\\(r=\\tfrac13\\): \\(S_{\\infty}=\\dfrac{9}{1-\\tfrac13}=\\dfrac{9}{\\tfrac23}=\\tfrac{27}{2}\\).`,
   tip:`Divide \\(a\\) by \\(1-r=\\tfrac23\\).`},

  {topic:"Infinite Series", q:`Find the sum \\(1-\\tfrac13+\\tfrac19-\\cdots\\).`,
   options:[`\\(\\tfrac34\\)`,`\\(\\tfrac32\\)`,`\\(\\tfrac23\\)`,`\\(1\\)`], answer:0,
   trap:`\\(r=-\\tfrac13\\): \\(S_{\\infty}=\\dfrac{1}{1-(-\\tfrac13)}=\\dfrac{1}{\\tfrac43}=\\tfrac34\\).`,
   tip:`\\(1-r=1+\\tfrac13=\\tfrac43\\).`},

  {topic:"Infinite Series", q:`The series \\(2+4+8+\\cdots\\) has:`,
   options:[`no sum (it diverges)`,`sum \\(14\\)`,`sum \\(16\\)`,`sum \\(-2\\)`], answer:0,
   trap:`\\(r=2\\), and \\(|r|\\ge1\\), so the series diverges — no finite sum.`,
   tip:`Growing terms never settle to a total.`},

  {topic:"Infinite Series", q:`Express \\(0.\\overline{3}\\) (i.e. \\(0.333\\ldots\\)) as a fraction using an infinite series.`,
   options:[`\\(\\tfrac13\\)`,`\\(\\tfrac{1}{30}\\)`,`\\(\\tfrac{3}{10}\\)`,`\\(\\tfrac13\\text{ only approx}\\)`], answer:0,
   trap:`\\(a=0.3,\\ r=0.1\\): \\(S_{\\infty}=\\dfrac{0.3}{1-0.1}=\\dfrac{0.3}{0.9}=\\tfrac13\\).`,
   tip:`A repeating decimal is a geometric series with \\(r=0.1\\).`},

  {topic:"Infinite Series", q:`Find the sum \\(6+2+\\tfrac23+\\cdots\\).`,
   options:[`\\(9\\)`,`\\(8\\)`,`\\(12\\)`,`\\(\\tfrac{18}{5}\\)`], answer:0,
   trap:`\\(r=\\tfrac13\\): \\(S_{\\infty}=\\dfrac{6}{1-\\tfrac13}=\\dfrac{6}{\\tfrac23}=9\\).`,
   tip:`\\(a=6,\\ 1-r=\\tfrac23\\).`}
  ]
};
