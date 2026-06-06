const fs = require('fs');

let code = fs.readFileSync('a:\\HKD\\frontend\\src\\app\\book-distribution\\page.tsx', 'utf8');

// 1. Update Imports
code = code.replace(
  `import { BookOpen, Heart, Users, MapPin, Share2, HandHeart } from "lucide-react";`,
  `import { BookOpen, Heart, Users, MapPin, Share2, HandHeart, GraduationCap, HeartHandshake, Sprout } from "lucide-react";`
);

// 2. Remove bottom margin from About section so it touches Initiatives section
code = code.replace(
  `<div className="w-full h-[1px] bg-black/80 mb-16" />`,
  `<div className="w-full h-[1px] bg-black/80 mb-8" />`
);
code = code.replace(
  `<section className="bg-[#EF3325] text-black py-16 md:py-24 relative overflow-hidden flex flex-col justify-between" style={{ minHeight: "80vh" }}>`,
  `<section className="bg-[#EF3325] text-black pt-16 md:pt-24 pb-12 relative overflow-hidden flex flex-col justify-between" style={{ minHeight: "80vh" }}>`
);

// 3. Update Initiatives Section Padding and Icons
// Initiatives section currently: <section className="py-20 lg:py-32 relative overflow-hidden bg-white">
code = code.replace(
  `<section className="py-20 lg:py-32 relative overflow-hidden bg-white">`,
  `<section className="pt-10 pb-10 lg:pt-16 lg:pb-16 relative overflow-hidden bg-white">`
);

// Update Schools icon
code = code.replace(
  `icon: <Users className="w-8 h-8" />,\n                title: "Schools",`,
  `icon: <GraduationCap className="w-8 h-8" />,\n                title: "Schools",`
);

// Update Old Age Homes icon
code = code.replace(
  `icon: <Heart className="w-8 h-8" />,\n                title: "Old Age Homes",`,
  `icon: <HeartHandshake className="w-8 h-8" />,\n                title: "Old Age Homes",`
);

// Update Villages icon
code = code.replace(
  `icon: <MapPin className="w-8 h-8" />,\n                title: "Villages",`,
  `icon: <Sprout className="w-8 h-8" />,\n                title: "Villages",`
);

// 4. Update Get Involved section padding
// Currently: <section className="py-20 lg:py-32 bg-white relative">
code = code.replace(
  `<section className="py-20 lg:py-32 bg-white relative">`,
  `<section className="pt-0 pb-16 lg:pb-24 bg-white relative">`
);

fs.writeFileSync('a:\\HKD\\frontend\\src\\app\\book-distribution\\page.tsx', code);
console.log("Updated icons and section spacing.");
