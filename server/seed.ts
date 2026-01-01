import { db } from "./db";
import { categories, products } from "@shared/schema";
import { sql } from "drizzle-orm";

const categoryData = [
  { name: "Injectables", slug: "injectables", description: "Performance injectable compounds", icon: "syringe", brand: "forge" },
  { name: "Orals", slug: "orals", description: "Oral compounds for various goals", icon: "pill", brand: "formula" },
  { name: "PCT", slug: "pct", description: "Post cycle therapy products", icon: "heart", brand: "formula" },
  { name: "HGH & Peptides", slug: "hgh-peptides", description: "Growth hormone and peptide products", icon: "beaker", brand: "forge" },
  { name: "Sexual Health", slug: "sexual-health", description: "Vitality and sexual health products", icon: "sparkles", brand: "formula" },
  { name: "Hair Growth", slug: "hair-growth", description: "Hair loss prevention products", icon: "sparkles", brand: "formula" },
  { name: "Weight Loss", slug: "weight-loss", description: "Body composition products", icon: "scale", brand: "formula" },
];

const productData = [
  // Forge - Injectables
  { name: "ForgeTest E 250", slug: "forgetest-e-250", shortDescription: "Testosterone Enanthate 250mg/ml", description: "Premium quality Testosterone Enanthate at 250mg/ml concentration. Lab tested for purity and potency.", price: "55.00", compareAtPrice: "70.00", brand: "forge", categorySlug: "injectables", stock: 50, featured: true },
  { name: "ForgeTest C 250", slug: "forgetest-c-250", shortDescription: "Testosterone Cypionate 250mg/ml", description: "High quality Testosterone Cypionate for consistent results.", price: "55.00", brand: "forge", categorySlug: "injectables", stock: 45, featured: true },
  { name: "ForgeTren A 100", slug: "forgetren-a-100", shortDescription: "Trenbolone Acetate 100mg/ml", description: "Potent Trenbolone Acetate for advanced users.", price: "85.00", compareAtPrice: "100.00", brand: "forge", categorySlug: "injectables", stock: 30, featured: true },
  { name: "ForgeDeca 300", slug: "forgedeca-300", shortDescription: "Nandrolone Decanoate 300mg/ml", description: "Premium Nandrolone Decanoate for mass and joint support.", price: "75.00", brand: "forge", categorySlug: "injectables", stock: 35, featured: false },
  { name: "ForgeMast P 100", slug: "forgemast-p-100", shortDescription: "Masteron Propionate 100mg/ml", description: "Quality Masteron Propionate for cutting cycles.", price: "80.00", brand: "forge", categorySlug: "injectables", stock: 25, featured: false },
  
  // Formula - Orals
  { name: "FormulaAnavar 25", slug: "formulaanavar-25", shortDescription: "Oxandrolone 25mg tablets", description: "Pharmaceutical grade Oxandrolone tablets. 50 tablets per bottle.", price: "95.00", compareAtPrice: "120.00", brand: "formula", categorySlug: "orals", stock: 60, featured: true },
  { name: "FormulaDbol 25", slug: "formuladbol-25", shortDescription: "Methandienone 25mg tablets", description: "Quality Dianabol for strength and mass gains. 100 tablets per bottle.", price: "45.00", brand: "formula", categorySlug: "orals", stock: 55, featured: true },
  { name: "FormulaWinny 25", slug: "formulawinny-25", shortDescription: "Stanozolol 25mg tablets", description: "Premium Winstrol tablets for cutting phases.", price: "65.00", brand: "formula", categorySlug: "orals", stock: 40, featured: false },
  { name: "FormulaTurin 10", slug: "formulaturin-10", shortDescription: "Turinabol 10mg tablets", description: "Quality Turinabol for lean gains. 100 tablets per bottle.", price: "75.00", brand: "formula", categorySlug: "orals", stock: 30, featured: false },
  
  // Formula - PCT
  { name: "FormulaRecover", slug: "formularecover", shortDescription: "Complete PCT Stack", description: "All-in-one post cycle therapy solution with Nolvadex and Clomid.", price: "120.00", compareAtPrice: "150.00", brand: "formula", categorySlug: "pct", stock: 45, featured: true },
  { name: "FormulaNolva 20", slug: "formulanolva-20", shortDescription: "Tamoxifen 20mg tablets", description: "Essential PCT compound. 30 tablets per bottle.", price: "55.00", brand: "formula", categorySlug: "pct", stock: 50, featured: false },
  { name: "FormulaClomid 50", slug: "formulaclomid-50", shortDescription: "Clomiphene 50mg tablets", description: "Premium Clomid for hormone recovery. 30 tablets per bottle.", price: "60.00", brand: "formula", categorySlug: "pct", stock: 40, featured: false },
  
  // Forge - HGH & Peptides
  { name: "ForgeGrowth 10IU", slug: "forgegrowth-10iu", shortDescription: "HGH 10IU vials", description: "Pharmaceutical grade Human Growth Hormone. 10IU per vial, 10 vials per kit.", price: "320.00", compareAtPrice: "400.00", brand: "forge", categorySlug: "hgh-peptides", stock: 20, featured: true },
  { name: "ForgeBPC-157", slug: "forgebpc-157", shortDescription: "BPC-157 5mg vial", description: "Healing peptide for tissue repair and recovery.", price: "45.00", brand: "forge", categorySlug: "hgh-peptides", stock: 35, featured: false },
  { name: "ForgeIPAMO", slug: "forgeiipamo", shortDescription: "Ipamorelin 5mg vial", description: "Growth hormone secretagogue for enhanced recovery.", price: "40.00", brand: "forge", categorySlug: "hgh-peptides", stock: 40, featured: false },
  
  // Formula - Sexual Health
  { name: "FormulaVigor", slug: "formulavigor", shortDescription: "Sildenafil 100mg tablets", description: "Premium erectile dysfunction medication. 30 tablets per bottle.", price: "75.00", brand: "formula", categorySlug: "sexual-health", stock: 60, featured: true },
  { name: "FormulaTada", slug: "formulatada", shortDescription: "Tadalafil 20mg tablets", description: "Long-lasting ED medication. 30 tablets per bottle.", price: "85.00", brand: "formula", categorySlug: "sexual-health", stock: 55, featured: false },
  
  // Formula - Hair Growth
  { name: "FormulaHair Pro", slug: "formulahair-pro", shortDescription: "Finasteride 1mg tablets", description: "Hair loss prevention and regrowth support. 90 tablets per bottle.", price: "65.00", brand: "formula", categorySlug: "hair-growth", stock: 45, featured: false },
  { name: "FormulaMinox", slug: "formulaminox", shortDescription: "Minoxidil 5% solution", description: "Topical hair regrowth treatment. 60ml bottle.", price: "35.00", brand: "formula", categorySlug: "hair-growth", stock: 50, featured: false },
  
  // Formula - Weight Loss
  { name: "FormulaClen", slug: "formulaclen", shortDescription: "Clenbuterol 40mcg tablets", description: "Thermogenic compound for fat loss. 100 tablets per bottle.", price: "45.00", brand: "formula", categorySlug: "weight-loss", stock: 40, featured: true },
  { name: "FormulaT3", slug: "formulat3", shortDescription: "Liothyronine 25mcg tablets", description: "Thyroid hormone for metabolic support. 100 tablets per bottle.", price: "35.00", brand: "formula", categorySlug: "weight-loss", stock: 35, featured: false },
];

export async function seed() {
  console.log("Seeding database...");

  // Check if data already exists
  const existingCategories = await db.select().from(categories).limit(1);
  if (existingCategories.length > 0) {
    console.log("Database already seeded, skipping...");
    return;
  }

  // Insert categories
  const insertedCategories: Record<string, string> = {};
  for (const cat of categoryData) {
    const result = await db.insert(categories).values(cat).returning();
    insertedCategories[cat.slug] = result[0].id;
    console.log(`Created category: ${cat.name}`);
  }

  // Insert products
  for (const prod of productData) {
    const { categorySlug, ...productFields } = prod;
    await db.insert(products).values({
      ...productFields,
      categoryId: insertedCategories[categorySlug],
    });
    console.log(`Created product: ${prod.name}`);
  }

  console.log("Seeding complete!");
}
