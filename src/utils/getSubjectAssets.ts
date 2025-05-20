const subjectAssets: Record<
  string,
  {
    image: string;
    className: string;
    topAd?: string;
    midAd?: string;
    bottomAd?: string;
  }
> = {
  "Biology 0610": {
    image: "/svgs/Biology.svg",
    className: "biology",
    topAd:
      "https://www.homeschool.asia/igcse-biology?utm_source=ciepastpaper&utm_medium=biology_revision#revision",
    midAd: "https://app.homeschool.asia/signup",
    bottomAd:
      "https://www.homeschool.asia/igcse-biology?utm_source=ciepastpaper&utm_medium=igcsebiology_video",
  },
  "Additional Math 0606": {
    image: "/svgs/Mathematics.svg",
    className: "mathematics",
    topAd:
      "https://www.homeschool.asia/igcse-amath?utm_source=ciepastpaper&utm_medium=amath_revision#revision",
    midAd: "https://app.homeschool.asia/signup",
    bottomAd:
      "https://www.homeschool.asia/igcse-amath?utm_source=ciepastpaper&utm_medium=igcseamath_video",
  },
  "Extended Math 0580": {
    image: "/svgs/ExtendedMaths.svg",
    className: "extended-mathematics",
    topAd:
      "https://www.homeschool.asia/igcse-emath?utm_source=ciepastpaper&utm_medium=emath_revision#revision",
    midAd: "https://app.homeschool.asia/signup",
    bottomAd:
      "https://www.homeschool.asia/igcse-emath?utm_source=ciepastpaper&utm_medium=igcseemath_video",
  },
  "Chemistry 0620": {
    image: "/svgs/Chemistry.svg",
    className: "chemistry",
    topAd:
      "https://www.homeschool.asia/igcse-chemistry?utm_source=ciepastpaper&utm_medium=igcsechemistry_video#revision",
    midAd: "https://app.homeschool.asia/signup",
    bottomAd: "https://app.homeschool.asia/signup",
  },
  "Physics 0625": {
    image: "/svgs/Physics.svg",
    className: "physics",
    topAd:
      "https://www.homeschool.asia/igcse-physics?utm_source=ciepastpaper&utm_medium=physics_revision#revision",
    midAd: "https://app.homeschool.asia/signup",
    bottomAd:
      "https://www.homeschool.asia/igcse-physics?utm_source=ciepastpaper&utm_medium=igcsephysics_video",
  },
  "Maths 9709": {
    image: "/svgs/Mathematics.svg",
    className: "mathematics",
    topAd:
      "https://www.homeschool.asia/alevel-math?utm_source=ciepastpaper&utm_medium=alevelmath_revision#revision",
    midAd: "https://app.homeschool.asia/signup",
    bottomAd:
      "https://www.homeschool.asia/alevel-math?utm_source=ciepastpaper&utm_medium=alevelmath_video",
  },
  "Chemistry 9701": {
    image: "/svgs/Chemistry.svg",
    className: "chemistry",
    topAd:
      "https://www.homeschool.asia/alevel-chemistry?utm_source=ciepastpaper&utm_medium=alevelchemistry_revision#revision",
    midAd: "https://app.homeschool.asia/signup",
    bottomAd:
      "https://www.homeschool.asia/alevel-chemistry?utm_source=ciepastpaper&utm_medium=alevelchemistry_video",
  },
  "Biology 9700": {
    image: "/svgs/Biology.svg",
    className: "biology",
    topAd:
      "https://www.homeschool.asia/alevel-biology?utm_source=ciepastpaper&utm_medium=alevelbiology_revision#revision",
    midAd: "https://app.homeschool.asia/signup",
    bottomAd:
      "https://www.homeschool.asia/alevel-biology?utm_source=ciepastpaper&utm_medium=alevelbiology_video",
  },
  "Physics 9702": {
    image: "/svgs/Physics.svg",
    className: "physics",
    topAd:
      "https://www.homeschool.asia/alevel-physics?utm_source=ciepastpaper&utm_medium=alevelphysics_revision#revision",
    midAd: "https://app.homeschool.asia/signup",
    bottomAd:
      "https://www.homeschool.asia/alevel-physics?utm_source=ciepastpaper&utm_medium=alevelphysics_video",
  },
  "Accounting 9706": {
    image: "/svgs/Accounting.svg",
    className: "accounting",
    topAd:
      "https://www.homeschool.asia/alevel-accounting?utm_source=ciepastpaper&utm_medium=alevelaccount_revision#revision",
    midAd: "https://app.homeschool.asia/signup",
    bottomAd:
      "https://www.homeschool.asia/alevel-accounting?utm_source=ciepastpaper&utm_medium=alevelaccount_video",
  },
  "Economics 9708": {
    image: "/svgs/Economics.svg",
    className: "economics",
    topAd:
      "https://www.homeschool.asia/alevel-economics?utm_source=ciepastpaper&utm_medium=aleveleconomics_revision#revision",
    midAd: "https://app.homeschool.asia/signup",
    bottomAd:
      "https://www.homeschool.asia/alevel-economics?utm_source=ciepastpaper&utm_medium=aleveleconomics_video",
  },
};

export function getSubjectAssets(name: string) {
  return (
    subjectAssets[name] || {
      image: "/svgs/default.svg",
      className: "default-subject",
    }
  );
}
