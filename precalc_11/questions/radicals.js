/* Pre-Calculus 11 · Radicals — question bank.
   To add questions, append objects to `questions` below. Each item:
     { topic, q, options:[4 strings], answer:0, trap, tip }
   Write the CORRECT option FIRST (answer:0); the engine shuffles positions.
   `topic` must appear in `topicOrder`. Math is KaTeX \\( ... \\) — DOUBLE every backslash. */
window.UNIT = {
  meta: {
    course: "Pre-Calculus 11",
    crumb: "Radicals",
    kicker: "Radicals & Rational Exponents",
    title: "Radicals",
    storeKey: "pc11_radicals_records_v1",
    reportTitle: "RADICALS & RATIONAL EXPONENTS — CHALLENGE TEST RESULTS",
    reportSubtitle: "Pre-Calculus 11 · Sections 2.0–2.5",
    quizSize: 50
  },
  topicOrder: ["Exponent Laws","Rational Exponents","Simplifying Radicals","Add & Subtract","Multiply & Divide","Rationalizing","Equations & Restrictions"],
  questions: [

  // ================= EXPONENT LAWS (Section 2.0) — heavy simplification =================
  {topic:"Exponent Laws", q:`Simplify \\(\\dfrac{(2a^{2}b^{3})^{-2}(4ab^{-1})^{3}}{(a^{3}b)^{-4}}\\), positive exponents.`,
   options:[`\\(\\dfrac{16a^{11}}{b^{5}}\\)`,`\\(16a^{11}b^{5}\\)`,`\\(\\dfrac{4a^{11}}{b^{5}}\\)`,`\\(\\dfrac{16a^{5}}{b^{11}}\\)`], answer:0,
   trap:`Apply each outer power to every factor first: \\(2^{-2}=\\tfrac14\\) and \\(4^{3}=64\\) give the \\(16\\); a denominator with a negative power flips up as \\((a^{3}b)^{4}\\).`,
   tip:`Distribute powers, then combine: \\(a^{-4+3+12}=a^{11}\\), \\(b^{-6-3+4}=b^{-5}\\).`},

  {topic:"Exponent Laws", q:`Simplify \\(\\dfrac{(x^{5}y^{2})^{-2}(x^{2}y^{-2})^{3}}{x^{-1}y^{-2}}\\), positive exponents.`,
   options:[`\\(\\dfrac{1}{x^{3}y^{8}}\\)`,`\\(\\dfrac{1}{x^{3}y^{9}}\\)`,`\\(x^{3}y^{8}\\)`,`\\(\\dfrac{1}{x^{7}y^{8}}\\)`], answer:0,
   trap:`Track each variable: \\(x^{-10+6+1}=x^{-3}\\) and \\(y^{-4-6+2}=y^{-8}\\). Dividing by \\(x^{-1}y^{-2}\\) ADDS \\(+1\\) and \\(+2\\).`,
   tip:`Subtracting a negative exponent increases it.`},

  {topic:"Exponent Laws", q:`Simplify \\(\\dfrac{(5m^{-1}n^{2})^{2}(2m^{-2}n^{-3})^{3}}{(2m^{3}n^{2})^{-1}}\\), positive exponents.`,
   options:[`\\(\\dfrac{400}{m^{5}n^{3}}\\)`,`\\(\\dfrac{400}{m^{5}n^{5}}\\)`,`\\(400m^{5}n^{3}\\)`,`\\(\\dfrac{40}{m^{5}n^{3}}\\)`], answer:0,
   trap:`\\(5^{2}\\cdot 2^{3}\\cdot 2=200\\cdot 2=400\\). The \\(\\times 2\\) comes from dividing by \\((2m^{3}n^{2})^{-1}\\).`,
   tip:`\\(m^{-2-6+3}=m^{-5}\\), \\(n^{4-9+2}=n^{-3}\\).`},

  {topic:"Exponent Laws", q:`Simplify \\(\\dfrac{(3a^{-2}b^{3})^{2}(3a^{-1}b^{-4})^{-1}}{(3a^{2}b^{-2})^{-3}}\\), positive exponents.`,
   options:[`\\(81a^{3}b^{4}\\)`,`\\(81a^{3}b^{10}\\)`,`\\(27a^{3}b^{4}\\)`,`\\(\\dfrac{81b^{4}}{a^{3}}\\)`], answer:0,
   trap:`The constant is \\(3^{2}\\cdot 3^{-1}\\cdot 3^{3}=3^{4}=81\\). Keep careful track of every power of \\(3\\).`,
   tip:`\\(a^{-4+1+6}=a^{3}\\), \\(b^{6+4-6}=b^{4}\\).`},

  {topic:"Exponent Laws", q:`Simplify \\(\\dfrac{(2xy)^{2}}{4x^{2}y^{-3}}\\), positive exponents.`,
   options:[`\\(y^{5}\\)`,`\\(y^{-1}\\)`,`\\(x^{4}y^{5}\\)`,`\\(\\dfrac{y^{5}}{x^{4}}\\)`], answer:0,
   trap:`\\((2xy)^{2}=4x^{2}y^{2}\\); the \\(4x^{2}\\) cancels, leaving \\(y^{2-(-3)}=y^{5}\\).`,
   tip:`Expand the bracket first, then cancel.`},

  {topic:"Exponent Laws", q:`Simplify \\((2a^{2}b)^{3}(3a^{-1}b^{2})^{2}\\).`,
   options:[`\\(72a^{4}b^{7}\\)`,`\\(72a^{8}b^{7}\\)`,`\\(6a^{4}b^{7}\\)`,`\\(72a^{4}b^{5}\\)`], answer:0,
   trap:`\\(2^{3}\\cdot 3^{2}=8\\cdot 9=72\\). Then \\(a^{6-2}=a^{4}\\), \\(b^{3+4}=b^{7}\\).`,
   tip:`Cube and square each bracket before multiplying.`},

  {topic:"Exponent Laws", q:`Simplify \\(\\left(\\dfrac{x^{-2}y^{3}}{z^{-1}}\\right)^{-2}\\), positive exponents.`,
   options:[`\\(\\dfrac{x^{4}}{y^{6}z^{2}}\\)`,`\\(\\dfrac{y^{6}z^{2}}{x^{4}}\\)`,`\\(\\dfrac{x^{4}y^{6}}{z^{2}}\\)`,`\\(\\dfrac{1}{x^{4}y^{6}z^{2}}\\)`], answer:0,
   trap:`Inside first: \\(\\dfrac{x^{-2}y^{3}}{z^{-1}}=x^{-2}y^{3}z\\). Then the \\(-2\\) power flips signs: \\(x^{4}y^{-6}z^{-2}\\).`,
   tip:`Simplify inside the bracket, then apply the outer negative power.`},

  {topic:"Exponent Laws", q:`Simplify \\(\\left(\\dfrac{(2x^{2})^{3}}{4x^{5}}\\right)^{2}\\).`,
   options:[`\\(4x^{2}\\)`,`\\(2x^{2}\\)`,`\\(4x^{7}\\)`,`\\(16x^{2}\\)`], answer:0,
   trap:`Inside: \\(\\dfrac{8x^{6}}{4x^{5}}=2x\\); squared gives \\((2x)^{2}=4x^{2}\\).`,
   tip:`Reduce inside the bracket before squaring.`},

  {topic:"Exponent Laws", q:`Evaluate \\(27^{2/3}\\cdot 16^{3/4}\\).`,
   options:[`\\(72\\)`,`\\(36\\)`,`\\(144\\)`,`\\(24\\)`], answer:0,
   trap:`\\(27^{2/3}=9\\) and \\(16^{3/4}=8\\); then \\(9\\times 8=72\\).`,
   tip:`Evaluate each rational-exponent power, then multiply.`},

  {topic:"Exponent Laws", q:`Simplify \\((-2x^{-3})^{-2}\\), positive exponents.`,
   options:[`\\(\\dfrac{x^{6}}{4}\\)`,`\\(-\\dfrac{x^{6}}{4}\\)`,`\\(\\dfrac{4}{x^{6}}\\)`,`\\(-4x^{6}\\)`], answer:0,
   trap:`\\((-2)^{-2}=\\dfrac{1}{(-2)^{2}}=\\tfrac14\\) — an EVEN power kills the negative — and \\((x^{-3})^{-2}=x^{6}\\).`,
   tip:`\\((-2)^{-2}=\\tfrac14\\), so the result is positive.`},

  {topic:"Exponent Laws", q:`Evaluate \\(5a^{0}-(3a)^{0}\\), \\(a\\ne 0\\).`,
   options:[`\\(4\\)`,`\\(0\\)`,`\\(2\\)`,`\\(8\\)`], answer:0,
   trap:`\\(a^{0}=1\\) and \\((3a)^{0}=1\\), but the \\(5\\) in \\(5a^{0}\\) stays a coefficient: \\(5(1)-1=4\\).`,
   tip:`A zero exponent affects only its base, not the coefficient in front.`},

  {topic:"Exponent Laws", q:`Simplify \\(\\dfrac{2^{-3}x^{4}}{2^{-1}x^{-2}}\\), positive exponents.`,
   options:[`\\(\\dfrac{x^{6}}{4}\\)`,`\\(\\dfrac{x^{6}}{2}\\)`,`\\(4x^{6}\\)`,`\\(\\dfrac{x^{2}}{4}\\)`], answer:0,
   trap:`\\(2^{-3-(-1)}=2^{-2}=\\tfrac14\\) and \\(x^{4-(-2)}=x^{6}\\).`,
   tip:`Subtract exponents on matching bases.`},

  // ================= RATIONAL EXPONENTS (Section 2.1) =================
  {topic:"Rational Exponents", q:`Evaluate \\(128^{5/7}\\).`,
   options:[`\\(32\\)`,`\\(64\\)`,`\\(16\\)`,`\\(2^{7}\\)`], answer:0,
   trap:`\\(128=2^{7}\\), so \\((\\sqrt[7]{128})^{5}=2^{5}=32\\).`,
   tip:`Write the base as a power: \\(128^{5/7}=(2^{7})^{5/7}=2^{5}\\).`},

  {topic:"Rational Exponents", q:`Evaluate \\(128^{-5/7}\\).`,
   options:[`\\(\\tfrac{1}{32}\\)`,`\\(32\\)`,`\\(-32\\)`,`\\(\\tfrac{1}{128}\\)`], answer:0,
   trap:`\\(128^{5/7}=32\\); the negative exponent makes it \\(\\tfrac{1}{32}\\), not negative.`,
   tip:`Do the power, then reciprocate for the negative sign.`},

  {topic:"Rational Exponents", q:`Evaluate \\(81^{5/4}\\).`,
   options:[`\\(243\\)`,`\\(81\\)`,`\\(405\\)`,`\\(27\\)`], answer:0,
   trap:`\\(81=3^{4}\\Rightarrow (\\sqrt[4]{81})^{5}=3^{5}=243\\).`,
   tip:`\\(81^{5/4}=(3^{4})^{5/4}=3^{5}\\).`},

  {topic:"Rational Exponents", q:`Evaluate \\((-243)^{6/5}\\).`,
   options:[`\\(729\\)`,`\\(-729\\)`,`\\(243\\)`,`\\(-243\\)`], answer:0,
   trap:`\\(\\sqrt[5]{-243}=-3\\) (odd index, real); then \\((-3)^{6}=729\\) — an even power makes it positive.`,
   tip:`Take the 5th root first, then apply the 6th power.`},

  {topic:"Rational Exponents", q:`Evaluate \\((-32)^{3/5}\\).`,
   options:[`\\(-8\\)`,`\\(8\\)`,`\\(-2\\)`,`no real value`], answer:0,
   trap:`\\(\\sqrt[5]{-32}=-2\\); then \\((-2)^{3}=-8\\) — the odd power keeps it negative.`,
   tip:`Odd index allows a negative base and gives a real result.`},

  {topic:"Rational Exponents", q:`Evaluate \\(\\left(\\tfrac{1}{8}\\right)^{-2/3}\\).`,
   options:[`\\(4\\)`,`\\(\\tfrac{1}{4}\\)`,`\\(-4\\)`,`\\(2\\)`], answer:0,
   trap:`Flip for the negative exponent: \\(8^{2/3}=(\\sqrt[3]{8})^{2}=2^{2}=4\\).`,
   tip:`\\(\\left(\\tfrac18\\right)^{-2/3}=8^{2/3}=4\\).`},

  {topic:"Rational Exponents", q:`Evaluate \\(\\left(\\tfrac{25}{9}\\right)^{-1/2}\\).`,
   options:[`\\(\\tfrac{3}{5}\\)`,`\\(\\tfrac{5}{3}\\)`,`\\(\\tfrac{9}{25}\\)`,`\\(-\\tfrac{3}{5}\\)`], answer:0,
   trap:`Reciprocal first: \\(\\left(\\tfrac{9}{25}\\right)^{1/2}=\\tfrac{3}{5}\\).`,
   tip:`Negative \\(\\tfrac12\\) power = square root of the reciprocal.`},

  {topic:"Rational Exponents", q:`Write \\(9^{1/3}\\cdot 27^{1/4}\\) as a single power of \\(3\\).`,
   options:[`\\(3^{17/12}\\)`,`\\(3^{5/7}\\)`,`\\(3^{6/12}\\)`,`\\(9^{7/12}\\)`], answer:0,
   trap:`Rewrite both with base \\(3\\): \\(3^{2/3}\\cdot 3^{3/4}=3^{8/12+9/12}=3^{17/12}\\).`,
   tip:`Common base, then add exponents over a common denominator.`},

  {topic:"Rational Exponents", q:`Write \\(3^{17/12}\\) as a mixed radical.`,
   options:[`\\(3\\sqrt[12]{243}\\)`,`\\(\\sqrt[12]{243}\\)`,`\\(3\\sqrt[12]{3}\\)`,`\\(243\\sqrt[12]{3}\\)`], answer:0,
   trap:`Split off the whole part: \\(3^{17/12}=3^{1}\\cdot 3^{5/12}=3\\sqrt[12]{3^{5}}=3\\sqrt[12]{243}\\).`,
   tip:`Pull out one whole \\(3\\) \\((=3^{12/12})\\), leaving \\(3^{5/12}\\) under the root.`},

  {topic:"Rational Exponents", q:`Write \\(\\dfrac{\\sqrt[3]{4}}{\\sqrt[4]{2}}\\) as a single radical.`,
   options:[`\\(\\sqrt[12]{32}\\)`,`\\(\\sqrt[12]{2}\\)`,`\\(\\sqrt{2}\\)`,`\\(\\sqrt[7]{2}\\)`], answer:0,
   trap:`Base \\(2\\): \\(\\dfrac{2^{2/3}}{2^{1/4}}=2^{2/3-1/4}=2^{5/12}=\\sqrt[12]{2^{5}}=\\sqrt[12]{32}\\).`,
   tip:`Convert to exponents and subtract: \\(\\tfrac{2}{3}-\\tfrac14=\\tfrac{5}{12}\\).`},

  {topic:"Rational Exponents", q:`Simplify \\((16x^{8}y^{4})^{1/4}\\), variables \\(\\ge 0\\).`,
   options:[`\\(2x^{2}y\\)`,`\\(4x^{2}y\\)`,`\\(2x^{4}y\\)`,`\\(2x^{2}y^{2}\\)`], answer:0,
   trap:`Apply \\(\\tfrac14\\) to every factor: \\(16^{1/4}=2\\), \\(x^{8/4}=x^{2}\\), \\(y^{4/4}=y\\).`,
   tip:`A \\(\\tfrac14\\) power is a fourth root of each factor.`},

  {topic:"Rational Exponents", q:`Simplify \\((8x^{6}y^{-3})^{2/3}\\), positive exponents.`,
   options:[`\\(\\dfrac{4x^{4}}{y^{2}}\\)`,`\\(4x^{4}y^{2}\\)`,`\\(\\dfrac{8x^{4}}{y^{2}}\\)`,`\\(\\dfrac{4x^{9}}{y^{2}}\\)`], answer:0,
   trap:`\\(8^{2/3}=4\\), \\(x^{6\\cdot 2/3}=x^{4}\\), \\(y^{-3\\cdot 2/3}=y^{-2}\\).`,
   tip:`Multiply each exponent by \\(\\tfrac23\\); \\(8^{2/3}=(\\sqrt[3]{8})^{2}=4\\).`},

  {topic:"Rational Exponents", q:`Simplify \\(\\left(a^{3/4}\\right)^{8}\\cdot a^{-5}\\).`,
   options:[`\\(a\\)`,`\\(a^{11}\\)`,`\\(a^{-2}\\)`,`\\(1\\)`], answer:0,
   trap:`\\((a^{3/4})^{8}=a^{6}\\); then \\(a^{6}\\cdot a^{-5}=a^{1}\\).`,
   tip:`Multiply exponents in the power, then add.`},

  {topic:"Rational Exponents", q:`Simplify \\(a^{1/2}\\cdot a^{2/3}\\).`,
   options:[`\\(a^{7/6}\\)`,`\\(a^{1/3}\\)`,`\\(a^{2/6}\\)`,`\\(a^{5/6}\\)`], answer:0,
   trap:`\\(\\tfrac12+\\tfrac23=\\tfrac36+\\tfrac46=\\tfrac76\\). Use a common denominator before adding.`,
   tip:`\\(a^{m}\\cdot a^{n}=a^{m+n}\\).`},

  {topic:"Rational Exponents", q:`Solve \\(x^{3/2}=8\\), \\(x\\ge 0\\).`,
   options:[`\\(x=4\\)`,`\\(x=2\\)`,`\\(x=16\\)`,`\\(x=\\pm 4\\)`], answer:0,
   trap:`Raise both sides to \\(\\tfrac23\\): \\(x=8^{2/3}=(\\sqrt[3]{8})^{2}=4\\).`,
   tip:`Undo a \\(\\tfrac32\\) power with a \\(\\tfrac23\\) power.`},

  {topic:"Rational Exponents", q:`For \\(a\\ge 0\\), \\(a^{-m/n}\\) equals:`,
   options:[`\\(\\dfrac{1}{\\sqrt[n]{a^{m}}}\\)`,`\\(-\\sqrt[n]{a^{m}}\\)`,`\\(\\sqrt[m]{a^{n}}\\)`,`\\(\\dfrac{n}{a^{m}}\\)`], answer:0,
   trap:`The negative sign means reciprocal, not a negative value: \\(a^{-m/n}=\\dfrac{1}{a^{m/n}}=\\dfrac{1}{\\sqrt[n]{a^{m}}}\\).`,
   tip:`Denominator = index, numerator = power, negative = reciprocal.`},

  // ================= SIMPLIFYING / MIXED & ENTIRE RADICALS (Section 2.2) =================
  {topic:"Simplifying Radicals", q:`Simplify \\(\\sqrt{50x^{3}y^{4}}\\), \\(x,y\\ge 0\\).`,
   options:[`\\(5xy^{2}\\sqrt{2x}\\)`,`\\(5x^{2}y^{2}\\sqrt{2x}\\)`,`\\(5xy^{2}\\sqrt{2}\\)`,`\\(10xy^{2}\\sqrt{2x}\\)`], answer:0,
   trap:`\\(50=25\\cdot 2\\), \\(x^{3}=x^{2}\\cdot x\\), \\(y^{4}=(y^{2})^{2}\\): out come \\(5,\\ x,\\ y^{2}\\), leaving \\(\\sqrt{2x}\\).`,
   tip:`Take out perfect-square factors from the number AND each variable.`},

  {topic:"Simplifying Radicals", q:`Simplify \\(\\sqrt[3]{54x^{6}y^{3}}\\), \\(x,y\\ge 0\\).`,
   options:[`\\(3x^{2}y\\sqrt[3]{2}\\)`,`\\(3x^{2}y^{3}\\sqrt[3]{2}\\)`,`\\(3x^{2}y\\sqrt[3]{2y}\\)`,`\\(9x^{2}y\\sqrt[3]{2}\\)`], answer:0,
   trap:`For a cube root pull out perfect CUBES: \\(54=27\\cdot 2\\), \\(x^{6}=(x^{2})^{3}\\), \\(y^{3}=(y)^{3}\\).`,
   tip:`\\(\\sqrt[3]{27}=3,\\ \\sqrt[3]{x^{6}}=x^{2},\\ \\sqrt[3]{y^{3}}=y\\).`},

  {topic:"Simplifying Radicals", q:`Simplify \\(\\sqrt{72a^{5}b^{2}}\\), \\(a,b\\ge 0\\).`,
   options:[`\\(6a^{2}b\\sqrt{2a}\\)`,`\\(6a^{2}b^{2}\\sqrt{2a}\\)`,`\\(6a^{2}b\\sqrt{2}\\)`,`\\(36a^{2}b\\sqrt{2a}\\)`], answer:0,
   trap:`\\(72=36\\cdot 2\\), \\(a^{5}=a^{4}\\cdot a\\), \\(b^{2}\\) is a perfect square: out come \\(6,\\ a^{2},\\ b\\).`,
   tip:`\\(\\sqrt{36}=6,\\ \\sqrt{a^{4}}=a^{2}\\), leaving \\(\\sqrt{2a}\\).`},

  {topic:"Simplifying Radicals", q:`Simplify \\(\\sqrt[3]{-16x^{4}}\\).`,
   options:[`\\(-2x\\sqrt[3]{2x}\\)`,`\\(2x\\sqrt[3]{2x}\\)`,`\\(-2x^{2}\\sqrt[3]{2}\\)`,`\\(-2\\sqrt[3]{2x^{4}}\\)`], answer:0,
   trap:`\\(-16=-8\\cdot 2\\) and \\(x^{4}=x^{3}\\cdot x\\): \\(\\sqrt[3]{-8}=-2\\), \\(\\sqrt[3]{x^{3}}=x\\), leaving \\(\\sqrt[3]{2x}\\).`,
   tip:`Odd index lets the \\(-8\\) come out as \\(-2\\).`},

  {topic:"Simplifying Radicals", q:`Write \\(2xy\\sqrt[3]{4x^{2}y^{3}}\\) as an entire radical, \\(x,y\\ge 0\\).`,
   options:[`\\(\\sqrt[3]{32x^{5}y^{6}}\\)`,`\\(\\sqrt[3]{8x^{5}y^{6}}\\)`,`\\(\\sqrt[3]{32x^{3}y^{4}}\\)`,`\\(\\sqrt[3]{6x^{3}y^{4}}\\)`], answer:0,
   trap:`Bring \\(2xy\\) in CUBED: \\((2xy)^{3}=8x^{3}y^{3}\\); times \\(4x^{2}y^{3}\\) gives \\(32x^{5}y^{6}\\).`,
   tip:`To move a coefficient inside an index-3 radical, raise it to the 3rd power.`},

  {topic:"Simplifying Radicals", q:`Write \\(-2x\\sqrt[5]{4x}\\) as an entire radical.`,
   options:[`\\(\\sqrt[5]{-128x^{6}}\\)`,`\\(\\sqrt[5]{-32x^{6}}\\)`,`\\(\\sqrt[5]{128x^{6}}\\)`,`\\(\\sqrt[5]{-128x^{5}}\\)`], answer:0,
   trap:`With an ODD index the negative can go in: \\((-2x)^{5}=-32x^{5}\\); times \\(4x\\) gives \\(-128x^{6}\\).`,
   tip:`Odd index → a negative coefficient moves inside; \\((-2)^{5}=-32\\).`},

  {topic:"Simplifying Radicals", q:`Simplify \\(\\sqrt{x^{4}y^{6}}\\) (no sign assumptions).`,
   options:[`\\(x^{2}|y|^{3}\\)`,`\\(x^{2}y^{3}\\)`,`\\(x^{2}|y|^{2}\\)`,`\\(|x|^{2}y^{3}\\)`], answer:0,
   trap:`An even root needs absolute value where the result could be negative: \\(y^{3}\\) can be negative, so \\(\\sqrt{y^{6}}=|y|^{3}\\). \\(x^{2}\\) is already \\(\\ge0\\).`,
   tip:`\\(\\sqrt{y^{6}}=|y^{3}|=|y|^{3}\\).`},

  {topic:"Simplifying Radicals", q:`Simplify \\(\\sqrt{288}\\).`,
   options:[`\\(12\\sqrt{2}\\)`,`\\(2\\sqrt{144}\\)`,`\\(6\\sqrt{8}\\)`,`\\(24\\sqrt{2}\\)`], answer:0,
   trap:`Greatest perfect-square factor is \\(144\\): \\(\\sqrt{144\\cdot 2}=12\\sqrt{2}\\). \\(6\\sqrt8\\) isn't finished.`,
   tip:`\\(288=144\\cdot 2\\).`},

  {topic:"Simplifying Radicals", q:`Simplify \\(\\sqrt[3]{-250}\\).`,
   options:[`\\(-5\\sqrt[3]{2}\\)`,`\\(5\\sqrt[3]{2}\\)`,`\\(-5\\sqrt[3]{10}\\)`,`\\(-25\\sqrt[3]{2}\\)`], answer:0,
   trap:`\\(-250=-125\\cdot 2\\) and \\(\\sqrt[3]{-125}=-5\\).`,
   tip:`Pull out the perfect cube \\(-125\\).`},

  {topic:"Simplifying Radicals", q:`Solve \\(x^{4}=81\\).`,
   options:[`\\(x=\\pm 3\\)`,`\\(x=3\\)`,`\\(x=\\pm 9\\)`,`no real value`], answer:0,
   trap:`\\(3^{4}=81\\), and an even power gives \\(\\pm\\): \\(x=\\pm 3\\), not \\(\\pm 9\\).`,
   tip:`\\(x^{4}=81\\Rightarrow x=\\pm\\sqrt[4]{81}=\\pm3\\).`},

  {topic:"Simplifying Radicals", q:`Solve \\(x^{3}=\\tfrac{27}{8}\\).`,
   options:[`\\(x=\\tfrac{3}{2}\\)`,`\\(x=\\tfrac{2}{3}\\)`,`\\(x=\\tfrac{9}{4}\\)`,`\\(x=\\pm\\tfrac{3}{2}\\)`], answer:0,
   trap:`Cube root each part: \\(\\sqrt[3]{27}=3,\\ \\sqrt[3]{8}=2\\Rightarrow \\tfrac32\\). Odd power → one real root, no \\(\\pm\\).`,
   tip:`\\(\\sqrt[3]{\\tfrac{27}{8}}=\\tfrac{3}{2}\\).`},

  {topic:"Simplifying Radicals", q:`Evaluate \\(\\sqrt[6]{0.000064}\\).`,
   options:[`\\(0.2\\)`,`\\(0.4\\)`,`\\(0.02\\)`,`\\(0.6\\)`], answer:0,
   trap:`\\((0.2)^{6}=0.000064\\), so the sixth root is \\(0.2\\).`,
   tip:`\\(0.2^{6}=\\dfrac{64}{10^{6}}=0.000064\\).`},

  {topic:"Simplifying Radicals", q:`Write \\(3x^{2}\\sqrt{5}\\) as an entire radical.`,
   options:[`\\(\\sqrt{45x^{4}}\\)`,`\\(\\sqrt{15x^{2}}\\)`,`\\(\\sqrt{45x^{2}}\\)`,`\\(\\sqrt{15x^{4}}\\)`], answer:0,
   trap:`Square the whole coefficient: \\((3x^{2})^{2}=9x^{4}\\); times \\(5\\) gives \\(45x^{4}\\).`,
   tip:`\\((3x^{2})^{2}\\cdot 5=45x^{4}\\).`},

  {topic:"Simplifying Radicals", q:`Evaluate \\(\\sqrt[3]{-343}\\).`,
   options:[`\\(-7\\)`,`\\(7\\)`,`no real value`,`\\(\\pm 7\\)`], answer:0,
   trap:`\\((-7)^{3}=-343\\); an odd index gives one real, negative root.`,
   tip:`\\(\\sqrt[3]{-343}=-7\\).`},

  // ================= ADDING & SUBTRACTING (Section 2.3) =================
  {topic:"Add & Subtract", q:`Simplify \\(3\\sqrt{50}-2\\sqrt{8}+\\sqrt{18}\\).`,
   options:[`\\(14\\sqrt{2}\\)`,`\\(20\\sqrt{2}\\)`,`\\(8\\sqrt{2}\\)`,`\\(14\\sqrt{76}\\)`], answer:0,
   trap:`\\(\\sqrt{50}=5\\sqrt2,\\ \\sqrt8=2\\sqrt2,\\ \\sqrt{18}=3\\sqrt2\\): \\(15\\sqrt2-4\\sqrt2+3\\sqrt2=14\\sqrt2\\).`,
   tip:`Reduce every term to \\(\\sqrt2\\), then combine coefficients.`},

  {topic:"Add & Subtract", q:`Simplify \\(2\\sqrt{48}+3\\sqrt{27}-\\sqrt{75}\\).`,
   options:[`\\(12\\sqrt{3}\\)`,`\\(22\\sqrt{3}\\)`,`\\(6\\sqrt{3}\\)`,`\\(12\\sqrt{150}\\)`], answer:0,
   trap:`\\(\\sqrt{48}=4\\sqrt3,\\ \\sqrt{27}=3\\sqrt3,\\ \\sqrt{75}=5\\sqrt3\\): \\(8\\sqrt3+9\\sqrt3-5\\sqrt3=12\\sqrt3\\).`,
   tip:`Simplify each radical to \\(\\sqrt3\\) first.`},

  {topic:"Add & Subtract", q:`Simplify \\(\\sqrt{50x}-\\sqrt{8x}+\\sqrt{18x}\\), \\(x\\ge 0\\).`,
   options:[`\\(6\\sqrt{2x}\\)`,`\\(10\\sqrt{2x}\\)`,`\\(6\\sqrt{6x}\\)`,`\\(6x\\sqrt{2}\\)`], answer:0,
   trap:`Each term reduces to \\(\\sqrt{2x}\\): \\(5\\sqrt{2x}-2\\sqrt{2x}+3\\sqrt{2x}=6\\sqrt{2x}\\).`,
   tip:`The variable rides along inside \\(\\sqrt{2x}\\).`},

  {topic:"Add & Subtract", q:`Simplify \\(2\\sqrt[3]{54}-\\sqrt[3]{16}+\\sqrt[3]{128}\\).`,
   options:[`\\(8\\sqrt[3]{2}\\)`,`\\(12\\sqrt[3]{2}\\)`,`\\(4\\sqrt[3]{2}\\)`,`\\(8\\sqrt[3]{66}\\)`], answer:0,
   trap:`\\(\\sqrt[3]{54}=3\\sqrt[3]2,\\ \\sqrt[3]{16}=2\\sqrt[3]2,\\ \\sqrt[3]{128}=4\\sqrt[3]2\\): \\(6\\sqrt[3]2-2\\sqrt[3]2+4\\sqrt[3]2=8\\sqrt[3]2\\).`,
   tip:`Pull perfect cubes out of each cube root first.`},

  {topic:"Add & Subtract", q:`Simplify \\(\\sqrt{20r^{2}t}-2\\sqrt{45t^{3}}\\), variables \\(\\ge 0\\).`,
   options:[`\\((2r-6t)\\sqrt{5t}\\)`,`\\(-4rt\\sqrt{5t}\\)`,`\\((2r-6t)\\sqrt{65t}\\)`,`\\(2r-6t\\)`], answer:0,
   trap:`\\(\\sqrt{20r^{2}t}=2r\\sqrt{5t}\\) and \\(2\\sqrt{45t^{3}}=6t\\sqrt{5t}\\); factor the common \\(\\sqrt{5t}\\).`,
   tip:`Both terms reduce to \\(\\sqrt{5t}\\); subtract the coefficients.`},

  {topic:"Add & Subtract", q:`Simplify \\(\\sqrt{27xy}+\\sqrt{8xy}\\), \\(x,y\\ge 0\\).`,
   options:[`\\(3\\sqrt{3xy}+2\\sqrt{2xy}\\) (already simplest)`,`\\(5\\sqrt{xy}\\)`,`\\(5\\sqrt{5xy}\\)`,`\\(\\sqrt{35xy}\\)`], answer:0,
   trap:`After simplifying, the radicands are \\(3xy\\) and \\(2xy\\) — still UNLIKE, so they can't be combined.`,
   tip:`Simplify first, then check: unlike radicands stay separate.`},

  {topic:"Add & Subtract", q:`Simplify \\(4\\sqrt{18}-2\\sqrt{50}+\\sqrt{8}\\).`,
   options:[`\\(4\\sqrt{2}\\)`,`\\(6\\sqrt{2}\\)`,`\\(24\\sqrt{2}\\)`,`\\(4\\sqrt{76}\\)`], answer:0,
   trap:`\\(\\sqrt{18}=3\\sqrt2,\\ \\sqrt{50}=5\\sqrt2,\\ \\sqrt8=2\\sqrt2\\): \\(12\\sqrt2-10\\sqrt2+2\\sqrt2=4\\sqrt2\\).`,
   tip:`Watch the middle sign — it's a subtraction.`},

  {topic:"Add & Subtract", q:`Simplify \\(3\\sqrt{12a^{3}}-a\\sqrt{27a}\\), \\(a\\ge 0\\).`,
   options:[`\\(3a\\sqrt{3a}\\)`,`\\(9a\\sqrt{3a}\\)`,`\\(3a\\sqrt{3}\\)`,`\\(3a^{2}\\sqrt{3a}\\)`], answer:0,
   trap:`\\(3\\sqrt{12a^{3}}=6a\\sqrt{3a}\\) and \\(a\\sqrt{27a}=3a\\sqrt{3a}\\): \\(6a\\sqrt{3a}-3a\\sqrt{3a}=3a\\sqrt{3a}\\).`,
   tip:`\\(\\sqrt{12a^{3}}=2a\\sqrt{3a}\\); the coefficient \\(3\\) makes \\(6a\\sqrt{3a}\\).`},

  {topic:"Add & Subtract", q:`Simplify \\(\\sqrt{80}-\\sqrt{45}+\\sqrt{20}\\).`,
   options:[`\\(3\\sqrt{5}\\)`,`\\(9\\sqrt{5}\\)`,`\\(3\\sqrt{55}\\)`,`\\(\\sqrt{55}\\)`], answer:0,
   trap:`\\(\\sqrt{80}=4\\sqrt5,\\ \\sqrt{45}=3\\sqrt5,\\ \\sqrt{20}=2\\sqrt5\\): \\(4\\sqrt5-3\\sqrt5+2\\sqrt5=3\\sqrt5\\).`,
   tip:`All three reduce to \\(\\sqrt5\\).`},

  {topic:"Add & Subtract", q:`Simplify \\(-2\\sqrt{32}+5\\sqrt{2}-\\sqrt{8}\\).`,
   options:[`\\(-5\\sqrt{2}\\)`,`\\(5\\sqrt{2}\\)`,`\\(-11\\sqrt{2}\\)`,`\\(-\\sqrt{2}\\)`], answer:0,
   trap:`\\(\\sqrt{32}=4\\sqrt2,\\ \\sqrt8=2\\sqrt2\\): \\(-8\\sqrt2+5\\sqrt2-2\\sqrt2=-5\\sqrt2\\).`,
   tip:`Keep the signs straight when combining.`},

  {topic:"Add & Subtract", q:`Simplify \\(\\sqrt[3]{24}+\\sqrt[3]{81}-\\sqrt[3]{3}\\).`,
   options:[`\\(4\\sqrt[3]{3}\\)`,`\\(6\\sqrt[3]{3}\\)`,`\\(4\\sqrt[3]{102}\\)`,`\\(\\sqrt[3]{3}\\)`], answer:0,
   trap:`\\(\\sqrt[3]{24}=2\\sqrt[3]3,\\ \\sqrt[3]{81}=3\\sqrt[3]3\\): \\(2\\sqrt[3]3+3\\sqrt[3]3-\\sqrt[3]3=4\\sqrt[3]3\\).`,
   tip:`\\(\\sqrt[3]{81}=\\sqrt[3]{27\\cdot 3}=3\\sqrt[3]3\\).`},

  {topic:"Add & Subtract", q:`Simplify \\(2\\sqrt{75}-\\sqrt{48}\\).`,
   options:[`\\(6\\sqrt{3}\\)`,`\\(14\\sqrt{3}\\)`,`\\(6\\sqrt{27}\\)`,`\\(\\sqrt{27}\\)`], answer:0,
   trap:`\\(\\sqrt{75}=5\\sqrt3,\\ \\sqrt{48}=4\\sqrt3\\): \\(10\\sqrt3-4\\sqrt3=6\\sqrt3\\).`,
   tip:`Simplify each radical, then subtract coefficients.`},

  // ================= MULTIPLYING & DIVIDING (Section 2.4) =================
  {topic:"Multiply & Divide", q:`Multiply \\((3\\sqrt{5}-2\\sqrt{2})(4\\sqrt{5}+\\sqrt{2})\\).`,
   options:[`\\(56-5\\sqrt{10}\\)`,`\\(56+5\\sqrt{10}\\)`,`\\(60-5\\sqrt{10}\\)`,`\\(56-5\\sqrt{7}\\)`], answer:0,
   trap:`FOIL: \\(60+3\\sqrt{10}-8\\sqrt{10}-4=56-5\\sqrt{10}\\). \\(3\\sqrt5\\cdot4\\sqrt5=60\\) and \\(-2\\sqrt2\\cdot\\sqrt2=-4\\).`,
   tip:`Multiply the four products, then combine like terms.`},

  {topic:"Multiply & Divide", q:`Expand \\((\\sqrt{5}+2\\sqrt{3})^{2}\\).`,
   options:[`\\(17+4\\sqrt{15}\\)`,`\\(17\\)`,`\\(17+2\\sqrt{15}\\)`,`\\(17+4\\sqrt{8}\\)`], answer:0,
   trap:`\\((\\sqrt5)^{2}+2(\\sqrt5)(2\\sqrt3)+(2\\sqrt3)^{2}=5+4\\sqrt{15}+12\\).`,
   tip:`\\((a+b)^{2}=a^{2}+2ab+b^{2}\\); the middle term is \\(4\\sqrt{15}\\).`},

  {topic:"Multiply & Divide", q:`Multiply \\((2\\sqrt{x}+3)(\\sqrt{x}-5)\\), \\(x\\ge 0\\).`,
   options:[`\\(2x-7\\sqrt{x}-15\\)`,`\\(2x+7\\sqrt{x}-15\\)`,`\\(2x-7\\sqrt{x}+15\\)`,`\\(2\\sqrt{x}-7\\sqrt{x}-15\\)`], answer:0,
   trap:`\\(2\\sqrt{x}\\cdot\\sqrt{x}=2x\\); the middle is \\(-10\\sqrt{x}+3\\sqrt{x}=-7\\sqrt{x}\\); last is \\(-15\\).`,
   tip:`\\(\\sqrt{x}\\cdot\\sqrt{x}=x\\).`},

  {topic:"Multiply & Divide", q:`Multiply \\((\\sqrt{7}-\\sqrt{3})(\\sqrt{7}+\\sqrt{3})\\).`,
   options:[`\\(4\\)`,`\\(10\\)`,`\\(\\sqrt{4}\\)`,`\\(4\\sqrt{21}\\)`], answer:0,
   trap:`Conjugates: \\((\\sqrt7)^{2}-(\\sqrt3)^{2}=7-3=4\\). No middle term.`,
   tip:`\\((a-b)(a+b)=a^{2}-b^{2}\\).`},

  {topic:"Multiply & Divide", q:`Multiply and simplify \\(3\\sqrt{8}\\cdot 2\\sqrt{6}\\).`,
   options:[`\\(24\\sqrt{3}\\)`,`\\(6\\sqrt{48}\\)`,`\\(6\\sqrt{14}\\)`,`\\(24\\sqrt{14}\\)`], answer:0,
   trap:`\\(6\\sqrt{48}=6\\cdot 4\\sqrt3=24\\sqrt3\\). Coefficients \\(3\\cdot2=6\\), radicands \\(8\\cdot6=48\\), then simplify.`,
   tip:`Multiply, then reduce \\(\\sqrt{48}=4\\sqrt3\\).`},

  {topic:"Multiply & Divide", q:`Multiply and simplify \\(-4\\sqrt{3x}\\cdot 2\\sqrt{6x}\\), \\(x\\ge 0\\).`,
   options:[`\\(-24x\\sqrt{2}\\)`,`\\(-8\\sqrt{18x^{2}}\\)`,`\\(-24\\sqrt{2x}\\)`,`\\(-8x\\sqrt{2}\\)`], answer:0,
   trap:`\\(-8\\sqrt{18x^{2}}=-8\\cdot 3x\\sqrt2=-24x\\sqrt2\\). Keep the negative and take \\(x\\) out of \\(\\sqrt{x^{2}}\\).`,
   tip:`\\(3x\\cdot6x=18x^{2}\\); \\(\\sqrt{18x^{2}}=3x\\sqrt2\\).`},

  {topic:"Multiply & Divide", q:`Simplify \\(\\sqrt{x^{3}}\\cdot\\sqrt[3]{x}\\) as a mixed radical, \\(x\\ge 0\\).`,
   options:[`\\(x\\sqrt[6]{x^{5}}\\)`,`\\(x\\sqrt[6]{x}\\)`,`\\(\\sqrt[5]{x^{11}}\\)`,`\\(x^{6}\\sqrt{x^{5}}\\)`], answer:0,
   trap:`\\(x^{3/2}\\cdot x^{1/3}=x^{11/6}=x^{1}\\cdot x^{5/6}=x\\sqrt[6]{x^{5}}\\).`,
   tip:`Convert to exponents, add, then split off the whole part.`},

  {topic:"Multiply & Divide", q:`Simplify \\(\\dfrac{\\sqrt{x^{3}}}{\\sqrt[3]{x}}\\) as a mixed radical, \\(x>0\\).`,
   options:[`\\(x\\sqrt[6]{x}\\)`,`\\(x\\sqrt[6]{x^{5}}\\)`,`\\(\\sqrt[5]{x^{7}}\\)`,`\\(x^{7}\\)`], answer:0,
   trap:`\\(x^{3/2}\\div x^{1/3}=x^{3/2-1/3}=x^{7/6}=x\\sqrt[6]{x}\\).`,
   tip:`Subtract exponents: \\(\\tfrac32-\\tfrac13=\\tfrac76\\).`},

  {topic:"Multiply & Divide", q:`Simplify \\(\\sqrt[4]{x^{2}}\\cdot\\sqrt{x}\\), \\(x\\ge 0\\).`,
   options:[`\\(x\\)`,`\\(\\sqrt{x}\\)`,`\\(x^{3/4}\\)`,`\\(\\sqrt[4]{x^{3}}\\)`], answer:0,
   trap:`\\(\\sqrt[4]{x^{2}}=x^{1/2}\\), so \\(x^{1/2}\\cdot x^{1/2}=x^{1}=x\\).`,
   tip:`Reduce \\(\\sqrt[4]{x^{2}}\\) to \\(\\sqrt{x}\\) first.`},

  {topic:"Multiply & Divide", q:`Expand \\(3\\sqrt{2}\\,(\\sqrt{6}-2\\sqrt{10})\\).`,
   options:[`\\(6\\sqrt{3}-12\\sqrt{5}\\)`,`\\(6\\sqrt{3}-6\\sqrt{5}\\)`,`\\(6\\sqrt{12}-12\\sqrt{20}\\)`,`\\(6\\sqrt{3}-12\\sqrt{50}\\)`], answer:0,
   trap:`\\(3\\sqrt2\\sqrt6=3\\sqrt{12}=6\\sqrt3\\) and \\(3\\sqrt2\\cdot 2\\sqrt{10}=6\\sqrt{20}=12\\sqrt5\\).`,
   tip:`Distribute, then simplify each radical fully.`},

  {topic:"Multiply & Divide", q:`Simplify \\((2\\sqrt{3})^{3}\\).`,
   options:[`\\(24\\sqrt{3}\\)`,`\\(8\\sqrt{27}\\)`,`\\(24\\sqrt{27}\\)`,`\\(6\\sqrt{3}\\)`], answer:0,
   trap:`\\((2\\sqrt3)^{3}=2^{3}(\\sqrt3)^{3}=8\\cdot 3\\sqrt3=24\\sqrt3\\), since \\((\\sqrt3)^{3}=3\\sqrt3\\).`,
   tip:`Cube the coefficient and the radical separately.`},

  {topic:"Multiply & Divide", q:`Multiply \\((5\\sqrt{2})(3\\sqrt{6})(\\sqrt{3})\\).`,
   options:[`\\(90\\)`,`\\(15\\sqrt{36}\\)`,`\\(45\\)`,`\\(90\\sqrt{2}\\)`], answer:0,
   trap:`Coefficients \\(5\\cdot3=15\\); radicands \\(\\sqrt2\\sqrt6\\sqrt3=\\sqrt{36}=6\\); \\(15\\cdot 6=90\\).`,
   tip:`Group numbers and radicals; \\(\\sqrt{36}=6\\) clears the radical.`},

  {topic:"Multiply & Divide", q:`Multiply \\((\\sqrt{x}-3)(\\sqrt{x}+3)\\), \\(x\\ge 0\\).`,
   options:[`\\(x-9\\)`,`\\(x+9\\)`,`\\(x-6\\sqrt{x}-9\\)`,`\\(x-3\\)`], answer:0,
   trap:`Conjugates: \\((\\sqrt{x})^{2}-3^{2}=x-9\\). No middle term.`,
   tip:`\\((\\sqrt a-b)(\\sqrt a+b)=a-b^{2}\\).`},

  {topic:"Multiply & Divide", q:`Simplify \\(\\dfrac{12\\sqrt{10}}{3\\sqrt{2}}\\).`,
   options:[`\\(4\\sqrt{5}\\)`,`\\(4\\sqrt{8}\\)`,`\\(9\\sqrt{5}\\)`,`\\(4\\sqrt{20}\\)`], answer:0,
   trap:`\\(12/3=4\\) and \\(\\sqrt{10/2}=\\sqrt5\\).`,
   tip:`Divide coefficients and radicands separately.`},

  {topic:"Multiply & Divide", q:`Multiply and simplify \\(\\sqrt{10}\\cdot\\sqrt{6}\\).`,
   options:[`\\(2\\sqrt{15}\\)`,`\\(\\sqrt{60}\\)`,`\\(2\\sqrt{10}\\)`,`\\(4\\sqrt{15}\\)`], answer:0,
   trap:`\\(\\sqrt{10}\\sqrt6=\\sqrt{60}=\\sqrt{4\\cdot15}=2\\sqrt{15}\\). \\(\\sqrt{60}\\) is correct but not simplest.`,
   tip:`Multiply radicands, then pull out the perfect square.`},

  {topic:"Multiply & Divide", q:`Expand \\((2+\\sqrt{3})^{2}\\).`,
   options:[`\\(7+4\\sqrt{3}\\)`,`\\(7\\)`,`\\(7+2\\sqrt{3}\\)`,`\\(7+4\\sqrt{9}\\)`], answer:0,
   trap:`\\(2^{2}+2(2)(\\sqrt3)+(\\sqrt3)^{2}=4+4\\sqrt3+3=7+4\\sqrt3\\).`,
   tip:`Don't forget the \\(2ab=4\\sqrt3\\) middle term.`},

  // ================= RATIONALIZING (Section 2.4) =================
  {topic:"Rationalizing", q:`Simplify \\(\\dfrac{\\sqrt{5}+\\sqrt{2}}{\\sqrt{5}-\\sqrt{2}}\\).`,
   options:[`\\(\\dfrac{7+2\\sqrt{10}}{3}\\)`,`\\(\\dfrac{7+2\\sqrt{10}}{7}\\)`,`\\(7+2\\sqrt{10}\\)`,`\\(\\dfrac{7-2\\sqrt{10}}{3}\\)`], answer:0,
   trap:`Multiply by \\(\\dfrac{\\sqrt5+\\sqrt2}{\\sqrt5+\\sqrt2}\\): numerator \\((\\sqrt5+\\sqrt2)^{2}=7+2\\sqrt{10}\\), denominator \\(5-2=3\\).`,
   tip:`Conjugate is the SAME as the numerator here — the denominator becomes \\(3\\).`},

  {topic:"Rationalizing", q:`Rationalize \\(\\dfrac{\\sqrt{x}-2}{\\sqrt{x}+1}\\), \\(x\\ge 0\\).`,
   options:[`\\(\\dfrac{x-3\\sqrt{x}+2}{x-1}\\)`,`\\(\\dfrac{x-3\\sqrt{x}+2}{x+1}\\)`,`\\(\\dfrac{x-\\sqrt{x}-2}{x-1}\\)`,`\\(x-3\\sqrt{x}+2\\)`], answer:0,
   trap:`Multiply by the conjugate \\(\\sqrt{x}-1\\): numerator \\((\\sqrt{x}-2)(\\sqrt{x}-1)=x-3\\sqrt{x}+2\\), denominator \\(x-1\\).`,
   tip:`FOIL the numerator; the denominator is a difference of squares.`},

  {topic:"Rationalizing", q:`Simplify \\(\\dfrac{4}{3+\\sqrt{5}}\\).`,
   options:[`\\(3-\\sqrt{5}\\)`,`\\(3+\\sqrt{5}\\)`,`\\(\\dfrac{12-4\\sqrt{5}}{14}\\)`,`\\(12-4\\sqrt{5}\\)`], answer:0,
   trap:`Conjugate \\(3-\\sqrt5\\): denominator \\(9-5=4\\), so \\(\\dfrac{4(3-\\sqrt5)}{4}=3-\\sqrt5\\).`,
   tip:`The \\(4\\)s cancel after using the conjugate.`},

  {topic:"Rationalizing", q:`Rationalize \\(\\dfrac{5}{\\sqrt[3]{4}}\\).`,
   options:[`\\(\\dfrac{5\\sqrt[3]{2}}{2}\\)`,`\\(\\dfrac{5\\sqrt[3]{2}}{4}\\)`,`\\(\\dfrac{5\\sqrt[3]{4}}{2}\\)`,`\\(\\dfrac{5}{2}\\)`], answer:0,
   trap:`\\(\\sqrt[3]{4}\\cdot\\sqrt[3]{2}=\\sqrt[3]{8}=2\\), so multiply top and bottom by \\(\\sqrt[3]{2}\\): \\(\\dfrac{5\\sqrt[3]{2}}{2}\\).`,
   tip:`For \\(\\sqrt[3]{4}=\\sqrt[3]{2^{2}}\\), one more \\(\\sqrt[3]{2}\\) completes \\(\\sqrt[3]{2^{3}}\\).`},

  {topic:"Rationalizing", q:`Simplify \\(\\dfrac{6}{\\sqrt{7}-\\sqrt{3}}\\).`,
   options:[`\\(\\dfrac{3(\\sqrt{7}+\\sqrt{3})}{2}\\)`,`\\(6(\\sqrt{7}+\\sqrt{3})\\)`,`\\(\\dfrac{3(\\sqrt{7}-\\sqrt{3})}{2}\\)`,`\\(\\dfrac{6(\\sqrt{7}+\\sqrt{3})}{10}\\)`], answer:0,
   trap:`Conjugate \\(\\sqrt7+\\sqrt3\\): denominator \\(7-3=4\\), so \\(\\dfrac{6(\\sqrt7+\\sqrt3)}{4}=\\dfrac{3(\\sqrt7+\\sqrt3)}{2}\\).`,
   tip:`Reduce \\(\\tfrac{6}{4}\\) to \\(\\tfrac{3}{2}\\) after rationalizing.`},

  {topic:"Rationalizing", q:`Simplify \\(\\dfrac{\\sqrt{3}}{\\sqrt{6}-\\sqrt{3}}\\).`,
   options:[`\\(\\sqrt{2}+1\\)`,`\\(\\sqrt{2}-1\\)`,`\\(3\\sqrt{2}+1\\)`,`\\(\\sqrt{2}+3\\)`], answer:0,
   trap:`Conjugate \\(\\sqrt6+\\sqrt3\\): numerator \\(\\sqrt3(\\sqrt6+\\sqrt3)=3\\sqrt2+3\\), denominator \\(6-3=3\\), giving \\(\\sqrt2+1\\).`,
   tip:`\\(\\sqrt3\\cdot\\sqrt6=\\sqrt{18}=3\\sqrt2\\); then divide everything by \\(3\\).`},

  {topic:"Rationalizing", q:`Rationalize \\(\\dfrac{3}{2-\\sqrt{5}}\\).`,
   options:[`\\(-6-3\\sqrt{5}\\)`,`\\(6+3\\sqrt{5}\\)`,`\\(-6+3\\sqrt{5}\\)`,`\\(\\dfrac{6+3\\sqrt{5}}{9}\\)`], answer:0,
   trap:`Conjugate \\(2+\\sqrt5\\): denominator \\(4-5=-1\\), so \\(\\dfrac{3(2+\\sqrt5)}{-1}=-6-3\\sqrt5\\).`,
   tip:`A negative denominator flips every sign in the numerator.`},

  {topic:"Rationalizing", q:`Rationalize \\(\\sqrt[3]{\\dfrac{2}{y}}\\), \\(y>0\\).`,
   options:[`\\(\\dfrac{\\sqrt[3]{2y^{2}}}{y}\\)`,`\\(\\dfrac{\\sqrt[3]{2}}{y}\\)`,`\\(\\dfrac{\\sqrt[3]{2y}}{y}\\)`,`\\(\\dfrac{2}{y}\\)`], answer:0,
   trap:`\\(\\dfrac{\\sqrt[3]{2}}{\\sqrt[3]{y}}\\cdot\\dfrac{\\sqrt[3]{y^{2}}}{\\sqrt[3]{y^{2}}}=\\dfrac{\\sqrt[3]{2y^{2}}}{\\sqrt[3]{y^{3}}}=\\dfrac{\\sqrt[3]{2y^{2}}}{y}\\).`,
   tip:`For \\(\\sqrt[3]{y}\\), multiply by \\(\\sqrt[3]{y^{2}}\\), not \\(\\sqrt[3]{y}\\).`},

  {topic:"Rationalizing", q:`Rationalize \\(\\dfrac{1}{\\sqrt{x}+\\sqrt{y}}\\), \\(x\\ne y\\).`,
   options:[`\\(\\dfrac{\\sqrt{x}-\\sqrt{y}}{x-y}\\)`,`\\(\\dfrac{\\sqrt{x}+\\sqrt{y}}{x-y}\\)`,`\\(\\dfrac{\\sqrt{x}-\\sqrt{y}}{x+y}\\)`,`\\(\\dfrac{1}{x-y}\\)`], answer:0,
   trap:`Multiply by the conjugate \\(\\sqrt{x}-\\sqrt{y}\\): denominator \\((\\sqrt x)^{2}-(\\sqrt y)^{2}=x-y\\).`,
   tip:`Conjugate of \\(\\sqrt x+\\sqrt y\\) is \\(\\sqrt x-\\sqrt y\\).`},

  {topic:"Rationalizing", q:`Simplify \\(\\dfrac{\\sqrt{8}+\\sqrt{2}}{\\sqrt{2}}\\).`,
   options:[`\\(3\\)`,`\\(\\sqrt{3}\\)`,`\\(3\\sqrt{2}\\)`,`\\(5\\)`], answer:0,
   trap:`\\(\\sqrt8=2\\sqrt2\\), so the top is \\(3\\sqrt2\\); \\(\\dfrac{3\\sqrt2}{\\sqrt2}=3\\).`,
   tip:`Simplify the numerator first, then the \\(\\sqrt2\\) cancels.`},

  {topic:"Rationalizing", q:`Simplify \\(\\dfrac{2}{\\sqrt{6}+2}\\).`,
   options:[`\\(\\sqrt{6}-2\\)`,`\\(\\sqrt{6}+2\\)`,`\\(\\dfrac{2\\sqrt{6}-4}{10}\\)`,`\\(2\\sqrt{6}-4\\)`], answer:0,
   trap:`Conjugate \\(\\sqrt6-2\\): denominator \\(6-4=2\\), so \\(\\dfrac{2(\\sqrt6-2)}{2}=\\sqrt6-2\\).`,
   tip:`\\((\\sqrt6+2)(\\sqrt6-2)=6-4=2\\).`},

  {topic:"Rationalizing", q:`To rationalize \\(\\dfrac{1}{2\\sqrt{3}-\\sqrt{5}}\\), multiply by:`,
   options:[`\\(2\\sqrt{3}+\\sqrt{5}\\)`,`\\(2\\sqrt{3}-\\sqrt{5}\\)`,`\\(\\sqrt{3}+\\sqrt{5}\\)`,`\\(2\\sqrt{3}\\)`], answer:0,
   trap:`Use the conjugate \\(2\\sqrt3+\\sqrt5\\), which gives \\((2\\sqrt3)^{2}-(\\sqrt5)^{2}=12-5=7\\).`,
   tip:`Flip only the sign between the two terms.`},

  // ================= EQUATIONS & RESTRICTIONS (Section 2.5) =================
  {topic:"Equations & Restrictions", q:`Solve \\(\\sqrt{2x-3}=x-3\\).`,
   options:[`\\(x=6\\)`,`\\(x=2\\)`,`\\(x=2\\) and \\(x=6\\)`,`no solution`], answer:0,
   trap:`Squaring gives \\(x^{2}-8x+12=0\\Rightarrow x=2\\) or \\(6\\); but \\(x=2\\) gives \\(1\\ne -1\\), so it is extraneous.`,
   tip:`Only \\(x=6\\) satisfies the original equation.`},

  {topic:"Equations & Restrictions", q:`Solve \\(\\sqrt{3x+10}+5=2x\\).`,
   options:[`\\(x=5\\)`,`\\(x=\\tfrac{3}{4}\\)`,`\\(x=5\\) and \\(x=\\tfrac{3}{4}\\)`,`no solution`], answer:0,
   trap:`Isolate first: \\(\\sqrt{3x+10}=2x-5\\); squaring gives \\(4x^{2}-23x+15=0\\Rightarrow x=5\\) or \\(\\tfrac34\\). Only \\(x=5\\) checks.`,
   tip:`Isolate the radical, square, then test each root.`},

  {topic:"Equations & Restrictions", q:`Solve \\(x+3=(\\sqrt{x}+1)(\\sqrt{x}+6)\\), \\(x\\ge 0\\).`,
   options:[`no solution`,`\\(x=\\tfrac{9}{49}\\)`,`\\(x=0\\)`,`\\(x=9\\)`], answer:0,
   trap:`The RHS expands to \\(x+7\\sqrt{x}+6\\); then \\(x+3=x+7\\sqrt{x}+6\\Rightarrow \\sqrt{x}=-\\tfrac37\\), impossible for a real root.`,
   tip:`A square root can't equal a negative number.`},

  {topic:"Equations & Restrictions", q:`Solve \\(\\sqrt{x+7}-\\sqrt{x}=1\\).`,
   options:[`\\(x=9\\)`,`\\(x=3\\)`,`\\(x=16\\)`,`no solution`], answer:0,
   trap:`Rearrange to \\(\\sqrt{x+7}=1+\\sqrt{x}\\), square: \\(x+7=1+2\\sqrt{x}+x\\Rightarrow \\sqrt{x}=3\\Rightarrow x=9\\).`,
   tip:`Isolate one radical before squaring; \\(\\sqrt{16}-\\sqrt{9}=1\\) checks.`},

  {topic:"Equations & Restrictions", q:`Solve \\(\\sqrt{5x-4}=\\sqrt{3x+2}\\).`,
   options:[`\\(x=3\\)`,`\\(x=1\\)`,`\\(x=6\\)`,`no solution`], answer:0,
   trap:`Square once: \\(5x-4=3x+2\\Rightarrow 2x=6\\Rightarrow x=3\\), and both sides equal \\(\\sqrt{11}\\).`,
   tip:`A radical on each side means one squaring removes both.`},

  {topic:"Equations & Restrictions", q:`Solve \\(\\sqrt{x^{2}-5}=2\\).`,
   options:[`\\(x=\\pm 3\\)`,`\\(x=3\\)`,`\\(x=9\\)`,`no solution`], answer:0,
   trap:`Square: \\(x^{2}-5=4\\Rightarrow x^{2}=9\\Rightarrow x=\\pm3\\). Both satisfy \\(\\sqrt{4}=2\\).`,
   tip:`Here squaring legitimately produces two valid roots.`},

  {topic:"Equations & Restrictions", q:`For \\(\\sqrt{2x+1}=x-7\\), squaring gives \\(x=4\\) and \\(x=12\\). Which is valid?`,
   options:[`\\(x=12\\)`,`\\(x=4\\)`,`both`,`neither`], answer:0,
   trap:`\\(x=4\\) gives \\(\\sqrt9=3\\) but \\(x-7=-3\\); \\(3\\ne-3\\), so \\(x=4\\) is extraneous.`,
   tip:`Check each in the original; only \\(x=12\\) works.`},

  {topic:"Equations & Restrictions", q:`State the restriction on \\(x\\) for \\(\\sqrt{3x+4}-\\sqrt{2x-4}=2\\).`,
   options:[`\\(x\\ge 2\\)`,`\\(x\\ge -\\tfrac{4}{3}\\)`,`\\(-\\tfrac{4}{3}\\le x\\le 2\\)`,`\\(x\\le 2\\)`], answer:0,
   trap:`Both radicands \\(\\ge 0\\): \\(x\\ge-\\tfrac43\\) AND \\(x\\ge2\\). The stricter bound \\(x\\ge2\\) wins.`,
   tip:`Two radicals → intersect the restrictions.`},

  {topic:"Equations & Restrictions", q:`State the restriction on \\(x\\) for \\(\\sqrt{1-x}+\\sqrt{x+3}=4\\).`,
   options:[`\\(-3\\le x\\le 1\\)`,`\\(x\\le 1\\)`,`\\(x\\ge -3\\)`,`\\(-1\\le x\\le 3\\)`], answer:0,
   trap:`\\(1-x\\ge0\\Rightarrow x\\le1\\) and \\(x+3\\ge0\\Rightarrow x\\ge-3\\); together \\(-3\\le x\\le1\\).`,
   tip:`Intersect the two radicand restrictions.`},

  {topic:"Equations & Restrictions", q:`Solve \\(\\sqrt{x+5}=x-1\\).`,
   options:[`\\(x=4\\)`,`\\(x=-1\\)`,`\\(x=4\\) and \\(x=-1\\)`,`no solution`], answer:0,
   trap:`Squaring gives \\(x^{2}-3x-4=0\\Rightarrow x=4\\) or \\(-1\\); \\(x=-1\\) gives \\(2\\ne-2\\), extraneous.`,
   tip:`Keep only the root that fits the original.`},

  {topic:"Equations & Restrictions", q:`How many real solutions does \\(\\sqrt{x-2}=-3\\) have?`,
   options:[`none`,`one: \\(x=11\\)`,`one: \\(x=7\\)`,`two`], answer:0,
   trap:`A principal square root can't equal \\(-3\\). Squaring gives \\(x=11\\), but it fails the check.`,
   tip:`A radical set equal to a negative has no real solution.`},

  {topic:"Equations & Restrictions", q:`The distance seen from height \\(h\\) (km) is \\(d=111.7\\sqrt{h}\\). To see \\(75\\) km, the height is about:`,
   options:[`\\(451\\) m`,`\\(45.9\\) m`,`\\(75\\) m`,`\\(8380\\) m`], answer:0,
   trap:`\\(75=111.7\\sqrt h\\Rightarrow\\sqrt h\\approx0.671\\Rightarrow h\\approx0.451\\) km \\(=451\\) m. Convert km to metres last.`,
   tip:`Isolate \\(\\sqrt h\\), square, then convert units.`},

  {topic:"Equations & Restrictions", q:`For \\(v=\\sqrt{2gh}\\) with \\(g=9.8\\), an object at \\(v=30\\) m/s has fallen about:`,
   options:[`\\(45.9\\) m`,`\\(451\\) m`,`\\(153\\) m`,`\\(30\\) m`], answer:0,
   trap:`\\(30=\\sqrt{2(9.8)h}\\Rightarrow 900=19.6h\\Rightarrow h\\approx45.9\\) m.`,
   tip:`Square both sides, then divide by \\(19.6\\).`},

  {topic:"Equations & Restrictions", q:`A circle's radius is \\(r=\\sqrt{\\dfrac{A}{\\pi}}\\). If \\(A=50\\pi\\), then \\(r\\) equals:`,
   options:[`\\(5\\sqrt{2}\\)`,`\\(50\\)`,`\\(25\\sqrt{2}\\)`,`\\(\\sqrt{50\\pi}\\)`], answer:0,
   trap:`The \\(\\pi\\) cancels: \\(r=\\sqrt{\\dfrac{50\\pi}{\\pi}}=\\sqrt{50}=5\\sqrt2\\).`,
   tip:`Cancel \\(\\pi\\) first, then simplify \\(\\sqrt{50}\\).`},

  {topic:"Equations & Restrictions", q:`Solve \\(2\\sqrt{x}-1=5\\).`,
   options:[`\\(x=9\\)`,`\\(x=3\\)`,`\\(x=4\\)`,`\\(x=36\\)`], answer:0,
   trap:`Isolate the radical: \\(2\\sqrt{x}=6\\Rightarrow \\sqrt{x}=3\\Rightarrow x=9\\). Don't square before isolating.`,
   tip:`Isolate \\(\\sqrt{x}\\) first, then square.`},

  {topic:"Equations & Restrictions", q:`Solve \\(\\sqrt{4x+1}=x-1\\).`,
   options:[`\\(x=6\\)`,`\\(x=0\\)`,`\\(x=0\\) and \\(x=6\\)`,`no solution`], answer:0,
   trap:`Squaring gives \\(x^{2}-6x=0\\Rightarrow x=0\\) or \\(6\\); \\(x=0\\) gives \\(1\\ne-1\\), extraneous.`,
   tip:`Only \\(x=6\\) checks: \\(\\sqrt{25}=5=6-1\\).`}
  ]
};
