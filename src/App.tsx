/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChefHat, BookOpen, Clock, Users, ChevronRight, Search, UtensilsCrossed } from 'lucide-react';

interface Recipe {
  id: string;
  title: string;
  description: string;
  ingredients: string[];
  steps: string[];
  prepTime: string;
  servings: string;
  category: string;
}

const RECIPES: Recipe[] = [
  {
    id: 'biryani',
    title: 'بیف بریانی (کراچی اسٹائل)',
    description: 'خوشبودار چاولوں اور مصالحے دار بیف کے ساتھ تیار کردہ مشہور کراچی بریانی۔',
    ingredients: [
      'سیلہ چاول: 1 کلو (بھگوئے ہوئے)',
      'بیف (بغیر ہڈی): 1 کلو',
      'پیاز: 3 عدد (باری کٹی ہوئی)',
      'ٹماٹر: 4 عدد',
      'ادرک لہسن پیسٹ: 2 کھانے کے چمچ',
      'دہی: 1 پاؤ',
      'بریانی مصالحہ: 1 پیکٹ یا حسبِ ذائقہ',
      'ہرا دھنیا، پودینہ، ہری مرچیں: حسبِ ضرورت',
      'زردہ رنگ: چٹکی بھر'
    ],
    steps: [
      'سب سے پہلے چاولوں کو ابال لیں یہاں تک کہ وہ 80 فیصد پک جائیں۔',
      'پیاز کو سنہری براؤن کریں اور اس میں گوشت اور ادرک لہسن کا پیسٹ شامل کر کے بھونیں۔',
      'اب ٹماٹر، دہی اور بریانی مصالحہ ڈال کر گوشت گلنے تک پکائیں۔',
      'جب گوشت گل جائے اور تیل الگ ہو جائے تو اس پر ہرا مصالحہ ڈال دیں۔',
      'آخر میں چاولوں کی تہہ لگائیں، زردہ رنگ ڈالیں اور 15 منٹ کے لیے دم پر رکھ دیں۔'
    ],
    prepTime: '60 منٹ',
    servings: '6-8 افراد',
    category: 'چاول'
  },
  {
    id: 'korma',
    title: 'شاہی مٹن قورمہ',
    description: 'شادیوں والا روایتی گاڑھا اور خوشبودار مٹن قورمہ۔',
    ingredients: [
      'مٹن: 1 کلو',
      'پیاز: 4 عدد (تلی ہوئی)',
      'دہی: 200 گرام',
      'ادرک لہسن پیسٹ: 2 چمچ',
      'قورمہ مصالحہ: 3 چمچ',
      'تیل: 1 کپ',
      'کیوڑا واٹر: چند قطرے'
    ],
    steps: [
      'تیل گرم کریں اور اس میں گوشت اور ادرک لہسن کا پیسٹ ڈال کر رنگ بدلنے تک بھونیں۔',
      'دہی میں مصالحہ مکس کر کے گوشت میں ڈالیں اور ہلکی آنچ پر پکنے دیں۔',
      'جب گوشت آدھا گل جائے تو پسی ہوئی تلی پیاز شامل کریں۔',
      'گوشت مکمل گل جائے تو کیوڑا واٹر ڈالیں اور 5 منٹ دم دیں۔'
    ],
    prepTime: '45 منٹ',
    servings: '4-5 افراد',
    category: 'سالن'
  },
  {
    id: 'koftay',
    title: 'بیف کوفتے',
    description: 'نرم اور ذائقہ دار کوفتے جو ہر دسترخوان کی جان ہیں۔',
    ingredients: [
      'بیف قیمہ: 1 کلو (باریک)',
      'پیاز: 2 عدد (چاپ کی ہوئی)',
      'بیسن: 2 چمچ (بھنا ہوا)',
      'خشخاش: 1 چمچ (پسا ہوا)',
      'ادرک لہسن: 2 چمچ',
      'سرخ مرچ، نمک، گرم مصالحہ: حسبِ ذائقہ'
    ],
    steps: [
      'قیمہ میں تمام مصالحے، بیسن اور خشخاش مکس کر کے چھوٹے چھوٹے بالز بنا لیں۔',
      'علیحدہ ہانڈی میں پیاز اور ٹماٹر کا مصالحہ تیار کریں۔',
      'مصالحہ بھن جائے تو کوفتے آرام سے ڈالیں اور چمچ چلائے بغیر ہانڈی کو ہلا کر مکس کریں۔',
      'پانی ڈال کر 20 منٹ پکائیں یہاں تک کہ کوفتے پک جائیں۔'
    ],
    prepTime: '55 منٹ',
    servings: '5-6 افراد',
    category: 'سالن'
  },
  {
    id: 'nihari',
    title: 'بیف نلی نہاری',
    description: 'ناشتے کی خاص مرغوب غذا، گاڑھی اور لذیذ نہاری۔',
    ingredients: [
      'بیف بونگ: 1 کلو',
      'نلی: 2 عدد',
      'نہاری مصالحہ: 1 پیکٹ',
      'آٹا: آدھا کپ (بھنا ہوا)',
      'ادرک، لیموں، ہری مرچیں: گارنش کے لیے'
    ],
    steps: [
      'گوشت کو مصالحے کے ساتھ ہلکا بھون کر پانی ڈالیں اور رات بھر یا 6 گھنٹے ہلکی آنچ پر پکائیں۔',
      'جب گوشت ریشہ ریشہ ہو جائے تو بھنا ہوا آٹا پانی میں گھول کر شامل کریں۔',
      'اچھی طرح مکس کریں یہاں تک کہ نہاری گاڑھی ہو جائے۔',
      'آخر میں پیاز کا تڑکا لگائیں اور ادرک لیموں کے ساتھ پیش کریں۔'
    ],
    prepTime: '6-8 گھنٹے',
    servings: '6 افراد',
    category: 'خاص پکوان'
  }
];

export default function App() {
  const [selectedRecipeId, setSelectedRecipeId] = useState<string>(RECIPES[0].id);
  const [searchQuery, setSearchQuery] = useState('');

  const selectedRecipe = useMemo(() => 
    RECIPES.find(r => r.id === selectedRecipeId) || RECIPES[0]
  , [selectedRecipeId]);

  const filteredRecipes = useMemo(() => 
    RECIPES.filter(r => 
      r.title.includes(searchQuery) || 
      r.description.includes(searchQuery)
    )
  , [searchQuery]);

  return (
    <div className="min-h-screen bg-editorial-bg text-editorial-text font-serif relative overflow-x-hidden">
      {/* Decorative Background Element */}
      <div className="absolute top-[-100px] right-[-100px] w-96 h-96 rounded-full bg-editorial-gold opacity-10 blur-3xl pointer-events-none"></div>

      {/* Header */}
      <header className="flex flex-col md:flex-row justify-between items-end px-6 md:px-12 pt-12 pb-6 border-b border-subtle max-w-7xl mx-auto w-full">
        <div className="mb-6 md:mb-0">
          <p className="text-[10px] md:text-xs uppercase tracking-[0.3em] font-sans font-bold text-editorial-accent mb-1">
            Heritage Collection · Vol 01
          </p>
          <h1 className="text-5xl md:text-7xl font-black tracking-tighter urdu-text leading-none">پاکستانی ذائقے</h1>
        </div>
        <div className="text-right flex flex-col items-end gap-3 w-full md:w-auto">
          <div className="relative w-full md:w-64 mb-2">
            <Search className="absolute right-3 top-1/2 -translate-y-1/2 text-editorial-accent/50 w-4 h-4" />
            <input 
              type="text"
              placeholder="تلاش کریں..."
              className="w-full bg-transparent border-b border-editorial-text/20 focus:border-editorial-accent py-1 px-8 text-right urdu-text text-sm outline-none transition-all"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div>
            <p className="text-sm italic text-editorial-accent font-serif tracking-tight">"The Art of Traditional Spices"</p>
            <p className="text-[10px] uppercase tracking-tighter font-sans opacity-50 font-bold">Traditional Recipe Archive</p>
          </div>
        </div>
      </header>

      <main className="grid grid-cols-1 md:grid-cols-12 max-w-7xl mx-auto w-full min-h-[calc(100vh-200px)]">
        {/* Sidebar: Recipe List */}
        <aside className="col-span-1 md:col-span-3 border-b md:border-b-0 md:border-r border-subtle p-6 md:p-8 flex flex-col justify-between">
          <div>
            <h2 className="text-[10px] font-sans font-black uppercase border-b border-editorial-text pb-2 mb-8 tracking-widest">
              MENU · فہرست
            </h2>
            <ul className="space-y-8">
              {filteredRecipes.map((recipe, index) => (
                <li 
                  key={recipe.id}
                  onClick={() => setSelectedRecipeId(recipe.id)}
                  className="group cursor-pointer text-right"
                >
                  <p className="text-[10px] text-editorial-accent font-sans font-bold mb-1 opacity-60 group-hover:opacity-100 transition-opacity">
                    0{index + 1}
                  </p>
                  <h3 className={`text-xl md:text-2xl font-bold urdu-text transition-all ${
                    selectedRecipeId === recipe.id ? 'opacity-100 translate-x-1' : 'opacity-30 group-hover:opacity-100'
                  }`}>
                    {recipe.title.split('(')[0]}
                  </h3>
                </li>
              ))}
            </ul>
          </div>
          
          <div className="mt-12 bg-editorial-muted p-5 rounded-sm border border-editorial-accent/5">
            <div className="flex items-center justify-between mb-2">
              <UtensilsCrossed className="w-4 h-4 text-editorial-accent opacity-50" />
              <p className="text-[10px] uppercase font-sans font-black text-editorial-accent tracking-tighter">Kitchen Note</p>
            </div>
            <p className="text-xs italic leading-relaxed urdu-text text-right">
              بہترین ذائقے کے لیے تازہ پسی ہوئی کالی مرچ اور گھر کا بنا گرم مصالحہ استعمال کریں۔
            </p>
          </div>
        </aside>

        {/* Main Content: Recipe Detail */}
        <section className="col-span-1 md:col-span-9 p-6 md:p-12 overflow-hidden" dir="rtl">
          <AnimatePresence mode="wait">
            <motion.div
              key={selectedRecipe.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="flex flex-col lg:flex-row justify-between items-start gap-12"
            >
              <div className="flex-1 w-full">
                <div className="flex flex-wrap items-center gap-4 mb-4">
                  <span className="bg-editorial-accent text-white text-[9px] px-2 py-0.5 rounded-sm font-sans font-black tracking-widest uppercase">
                    FEATURED SELECTION
                  </span>
                  <div className="flex items-center gap-2 text-[10px] font-sans opacity-60 font-bold uppercase tracking-tighter">
                    <Clock className="w-3 h-3" />
                    <span>{selectedRecipe.prepTime}</span>
                  </div>
                  <div className="flex items-center gap-2 text-[10px] font-sans opacity-60 font-bold uppercase tracking-tighter border-r border-subtle pr-4">
                    <Users className="w-3 h-3" />
                    <span>{selectedRecipe.servings}</span>
                  </div>
                </div>

                <h2 className="text-5xl md:text-8xl font-bold mb-8 leading-tight tracking-tighter text-editorial-text urdu-text">
                  {selectedRecipe.title}
                </h2>
                
                <p className="text-lg md:text-xl urdu-text opacity-70 mb-12 max-w-2xl leading-relaxed">
                  {selectedRecipe.description}
                </p>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
                  {/* Ingredients */}
                  <div>
                    <h3 className="text-xl font-bold border-b-2 border-editorial-text pb-2 mb-6 urdu-text inline-block">
                      اجزاء · Ingredients
                    </h3>
                    <ul className="space-y-4 urdu-text">
                      {selectedRecipe.ingredients.map((item, i) => (
                        <li key={i} className="flex items-start gap-3 opacity-90 text-lg hover:text-editorial-accent transition-colors">
                          <span className="text-editorial-accent font-sans text-xs mt-3 leading-none opacity-50">•</span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Instructions */}
                  <div className="relative">
                    <h3 className="text-xl font-bold border-b-2 border-editorial-text pb-2 mb-6 urdu-text inline-block">
                      ترکیب · Instructions
                    </h3>
                    <div className="space-y-8">
                      {selectedRecipe.steps.map((step, idx) => (
                        <div key={idx} className="flex gap-6 group">
                          <span className="text-4xl font-sans font-black text-editorial-accent/20 group-hover:text-editorial-accent/40 transition-colors">
                            0{idx + 1}
                          </span>
                          <p className="text-lg leading-relaxed urdu-text opacity-90 group-hover:opacity-100 transition-opacity">
                            {step}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Artistic Sidebar Section */}
              <div className="hidden xl:flex w-24 h-full min-h-[400px] bg-editorial-accent/5 border-r-4 border-editorial-accent items-center justify-center p-6 text-center group">
                <p className="text-[10px] vertical-text transform rotate-180 font-sans tracking-[0.5em] uppercase opacity-40 font-bold group-hover:opacity-100 transition-opacity whitespace-nowrap">
                  Traditional Culinary Excellence · Heritage Archive
                </p>
              </div>
            </motion.div>
          </AnimatePresence>
        </section>
      </main>

      {/* Footer */}
      <footer className="w-full px-6 md:px-12 py-8 flex flex-col md:flex-row justify-between items-center text-[10px] font-sans font-bold opacity-40 border-t border-subtle mt-12 bg-white/50 backdrop-blur-sm">
        <p className="tracking-widest">© 2026 DASTARKHWAN PUBLISHING HOUSE</p>
        <div className="flex gap-8 my-4 md:my-0">
          <p className="tracking-widest uppercase">Traditional Flavors</p>
          <p className="tracking-widest uppercase">South Asian Archive</p>
        </div>
        <p className="tracking-widest">CUISINE: PAKISTANI HERITAGE</p>
      </footer>
    </div>
  );
}
