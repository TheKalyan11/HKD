const fs = require('fs');

let code = fs.readFileSync('a:\\HKD\\frontend\\src\\app\\book-distribution\\page.tsx', 'utf8');

const galleryImages = `
const galleryImages = [
  "https://images.unsplash.com/photo-1491841550275-ad7854e35ca6?q=80&w=800",
  "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?q=80&w=600",
  "https://images.unsplash.com/photo-1532012197267-da84d127e765?q=80&w=700",
  "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?q=80&w=800",
  "https://images.unsplash.com/photo-1506880018603-83d5b814b5a6?q=80&w=600",
  "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?q=80&w=700",
  "https://images.unsplash.com/photo-1512820790803-83ca734da794?q=80&w=800",
  "https://images.unsplash.com/photo-1476275466078-4007374efbbe?q=80&w=600",
  "https://images.unsplash.com/photo-1519682337058-a94d519337bc?q=80&w=700",
  "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?q=80&w=800",
  "https://images.unsplash.com/photo-1535905557558-afc4877a26fc?q=80&w=600",
  "https://images.unsplash.com/photo-1528319725582-ddc096101511?q=80&w=700",
];
`;

const gallerySection = `
      {/* ══ GALLERY SECTION ════════════════════════════════════ */}
      <section className="py-20 lg:py-32 bg-[#FFFBF2] relative">
        <div className="max-w-7xl mx-auto px-5 sm:px-10 lg:px-20">
          <AnimeReveal direction="up" delay={100} className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl text-[#072149] font-bold mb-6">Moments of Light</h2>
            <p className="text-gray-600 max-w-2xl mx-auto text-lg">
              Glimpses of the impact and joy brought by the distribution of the Bhagavad Gita.
            </p>
          </AnimeReveal>

          {/* Masonry Grid */}
          <div className="columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4">
            {galleryImages.map((src, i) => (
              <AnimeReveal key={i} direction="up" delay={100 + (i % 4) * 100}>
                <div className="break-inside-avoid relative overflow-hidden rounded-lg group cursor-pointer mb-4">
                  <img 
                    src={src} 
                    alt={\`Gita Daan Gallery Image \${i + 1}\`} 
                    className="w-full h-auto object-cover transform group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  {/* Subtle overlay on hover */}
                  <div className="absolute inset-0 bg-[#072149]/0 group-hover:bg-[#072149]/20 transition-colors duration-300 pointer-events-none" />
                </div>
              </AnimeReveal>
            ))}
          </div>
        </div>
      </section>
`;

code = code.replace(`export default function BookDistributionPage() {`, galleryImages + `\nexport default function BookDistributionPage() {`);
code = code.replace(`    <style dangerouslySetInnerHTML={{__html: \``, gallerySection + `    <style dangerouslySetInnerHTML={{__html: \``);

fs.writeFileSync('a:\\HKD\\frontend\\src\\app\\book-distribution\\page.tsx', code);
console.log("Added gallery section.");
