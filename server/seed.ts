import { db } from "./db";
import { categories, products, paymentMethods } from "@shared/schema";
import { sql } from "drizzle-orm";

const categoryData = [
  { name: "Injectables", slug: "injectables", description: "Premium injectable compounds", icon: "syringe", brand: "medical" },
  { name: "Orals", slug: "orals", description: "Oral compounds for various goals", icon: "pill", brand: "medical" },
  { name: "Post Cycle / Pharma", slug: "pct-pharma", description: "Post cycle therapy and pharmaceutical products", icon: "heart", brand: "medical" },
  { name: "Peptides", slug: "peptides", description: "Therapeutic peptide compounds", icon: "beaker", brand: "medical" },
  { name: "Growth Hormone", slug: "growth-hormone", description: "HGH and growth factor products", icon: "trending-up", brand: "medical" },
];

const productData = [
  // INJECTABLES
  { name: "Test E 300mg/ml", slug: "test-e-300", shortDescription: "Testosterone Enanthate 300mg/ml", description: "Premium quality Testosterone Enanthate at 300mg/ml concentration. Lab tested for purity and potency.", price: "50.00", brand: "medical", categorySlug: "injectables", stock: 100, featured: true },
  { name: "Test C 250mg/ml", slug: "test-c-250", shortDescription: "Testosterone Cypionate 250mg/ml", description: "High quality Testosterone Cypionate for consistent results.", price: "55.00", brand: "medical", categorySlug: "injectables", stock: 100, featured: true },
  { name: "Test C 50mg/ml", slug: "test-c-50-female", shortDescription: "Testosterone Cypionate 50mg/ml - Female Only", description: "Lower concentration Testosterone Cypionate formulated for female use.", price: "50.00", brand: "medical", categorySlug: "injectables", stock: 50, featured: false },
  { name: "Test P 100mg/ml", slug: "test-p-100", shortDescription: "Testosterone Propionate 100mg/ml", description: "Fast-acting Testosterone Propionate.", price: "35.00", brand: "medical", categorySlug: "injectables", stock: 80, featured: false },
  { name: "Sus 250mg/ml", slug: "sus-250", shortDescription: "Sustanon 250mg/ml", description: "Blend of four testosterone esters for sustained release.", price: "60.00", brand: "medical", categorySlug: "injectables", stock: 75, featured: true },
  { name: "Test Gel 50mg/pack x30", slug: "test-gel-50", shortDescription: "Testosterone Gel 50mg per pack (30 packs)", description: "Transdermal testosterone gel for daily application.", price: null, brand: "medical", categorySlug: "injectables", stock: 40, featured: false },
  { name: "Tren E 200mg/ml", slug: "tren-e-200", shortDescription: "Trenbolone Enanthate 200mg/ml", description: "Long-ester Trenbolone for advanced users.", price: "80.00", brand: "medical", categorySlug: "injectables", stock: 50, featured: true },
  { name: "Tren A 100mg/ml", slug: "tren-a-100", shortDescription: "Trenbolone Acetate 100mg/ml", description: "Fast-acting Trenbolone Acetate.", price: "65.00", brand: "medical", categorySlug: "injectables", stock: 60, featured: false },
  { name: "Tren H 100mg/ml", slug: "tren-h-100", shortDescription: "Trenbolone Hexahydrobenzylcarbonate 100mg/ml", description: "Parabolan - premium Trenbolone ester.", price: "100.00", brand: "medical", categorySlug: "injectables", stock: 30, featured: false },
  { name: "TREST A 75mg/ml", slug: "trest-a-75", shortDescription: "Trestolone Acetate 75mg/ml", description: "Potent synthetic androgen compound.", price: "120.00", brand: "medical", categorySlug: "injectables", stock: 25, featured: true },
  { name: "TREST E 120mg/ml", slug: "trest-e-120", shortDescription: "Trestolone Enanthate 120mg/ml", description: "Long-ester Trestolone for sustained effects.", price: "200.00", brand: "medical", categorySlug: "injectables", stock: 20, featured: false },
  { name: "DHB cyp-100mg/ml", slug: "dhb-cyp-100", shortDescription: "Dihydroboldenone Cypionate 100mg/ml", description: "1-Testosterone Cypionate - premium anabolic.", price: "70.00", brand: "medical", categorySlug: "injectables", stock: 35, featured: false },
  { name: "Deca 200mg/ml", slug: "deca-200", shortDescription: "Nandrolone Decanoate 200mg/ml", description: "Quality Nandrolone for mass and joint support.", price: "65.00", brand: "medical", categorySlug: "injectables", stock: 70, featured: true },
  { name: "PRIMO E 150mg/ml", slug: "primo-e-150", shortDescription: "Primobolan Enanthate 150mg/ml", description: "Premium Methenolone Enanthate.", price: "100.00", brand: "medical", categorySlug: "injectables", stock: 30, featured: true },
  { name: "NPP 200mg/ml", slug: "npp-200", shortDescription: "Nandrolone Phenylpropionate 200mg/ml", description: "Fast-acting Nandrolone ester.", price: "65.00", brand: "medical", categorySlug: "injectables", stock: 55, featured: false },
  { name: "Mast E 200mg/ml", slug: "mast-e-200", shortDescription: "Masteron Enanthate 200mg/ml", description: "Long-ester Drostanolone for cutting.", price: "75.00", brand: "medical", categorySlug: "injectables", stock: 45, featured: false },
  { name: "Mast P 100mg/ml", slug: "mast-p-100", shortDescription: "Masteron Propionate 100mg/ml", description: "Fast-acting Drostanolone Propionate.", price: "65.00", brand: "medical", categorySlug: "injectables", stock: 50, featured: false },
  { name: "Eq Cyp 200mg/ml", slug: "eq-cyp-200", shortDescription: "Boldenone Cypionate 200mg/ml", description: "Equipoise Cypionate for quality gains.", price: "65.00", brand: "medical", categorySlug: "injectables", stock: 60, featured: false },

  // ORALS
  { name: "Dbol 25mg x30", slug: "dbol-25", shortDescription: "Dianabol 25mg (30 tablets)", description: "Methandrostenolone tablets for strength and mass.", price: "45.00", brand: "medical", categorySlug: "orals", stock: 80, featured: true },
  { name: "Anadrol 25mg x30", slug: "anadrol-25", shortDescription: "Anadrol 25mg (30 tablets)", description: "Oxymetholone for significant mass gains.", price: "45.00", brand: "medical", categorySlug: "orals", stock: 70, featured: true },
  { name: "Winstrol 25mg x30", slug: "winstrol-25", shortDescription: "Winstrol 25mg (30 tablets)", description: "Stanozolol tablets for lean gains.", price: "45.00", brand: "medical", categorySlug: "orals", stock: 75, featured: false },
  { name: "Superdrol 10mg x30", slug: "superdrol-10", shortDescription: "Superdrol 10mg (30 tablets)", description: "Methyldrostanolone - potent oral compound.", price: "60.00", brand: "medical", categorySlug: "orals", stock: 40, featured: false },
  { name: "Superdrol injectable 40mg/ml", slug: "superdrol-inj-40", shortDescription: "Injectable Superdrol 40mg/ml", description: "Injectable methyldrostanolone formulation.", price: "100.00", brand: "medical", categorySlug: "orals", stock: 25, featured: false },
  { name: "Anavar 25mg x30", slug: "anavar-25", shortDescription: "Anavar 25mg (30 tablets)", description: "High-dose Oxandrolone tablets.", price: "60.00", brand: "medical", categorySlug: "orals", stock: 60, featured: true },
  { name: "Anavar 10mg x30", slug: "anavar-10", shortDescription: "Anavar 10mg (30 tablets)", description: "Standard dose Oxandrolone tablets.", price: "45.00", brand: "medical", categorySlug: "orals", stock: 65, featured: false },
  { name: "Proviron 25mg x30", slug: "proviron-25", shortDescription: "Proviron 25mg (30 tablets)", description: "Mesterolone for androgen support.", price: "60.00", brand: "medical", categorySlug: "orals", stock: 50, featured: false },
  { name: "Accutane 20mg x30", slug: "accutane-20", shortDescription: "Accutane 20mg (30 capsules)", description: "Isotretinoin for acne management.", price: "60.00", brand: "medical", categorySlug: "orals", stock: 55, featured: false },
  { name: "D.N.P 100mg x30", slug: "dnp-100", shortDescription: "DNP 100mg (30 capsules)", description: "Dinitrophenol for metabolic enhancement.", price: "70.00", brand: "medical", categorySlug: "orals", stock: 30, featured: false },
  { name: "D.N.P 200mg x30", slug: "dnp-200", shortDescription: "DNP 200mg (30 capsules)", description: "High-dose Dinitrophenol capsules.", price: "130.00", brand: "medical", categorySlug: "orals", stock: 25, featured: false },
  { name: "Clen 40mcg x20", slug: "clen-40", shortDescription: "Clenbuterol 40mcg (20 tablets)", description: "Beta-2 agonist for thermogenic effect.", price: "70.00", brand: "medical", categorySlug: "orals", stock: 60, featured: true },
  { name: "T3 25mcg x25", slug: "t3-25", shortDescription: "T3 25mcg (25 tablets)", description: "Liothyronine for thyroid support.", price: "50.00", brand: "medical", categorySlug: "orals", stock: 55, featured: false },
  { name: "Cialis 40mg x30", slug: "cialis-40", shortDescription: "Cialis 40mg (30 tablets)", description: "Tadalafil for performance enhancement.", price: "60.00", brand: "medical", categorySlug: "orals", stock: 70, featured: false },
  { name: "TBol 25mg x30", slug: "tbol-25", shortDescription: "Turinabol 25mg (30 tablets)", description: "Chlorodehydromethyltestosterone tablets.", price: "50.00", brand: "medical", categorySlug: "orals", stock: 50, featured: false },
  { name: "D-Bombs x30", slug: "d-bombs-30", shortDescription: "D-Bombs (90mg Viagra/70mg Cialis) x30", description: "Combination sexual performance tablets.", price: "80.00", brand: "medical", categorySlug: "orals", stock: 45, featured: false },
  { name: "Methyl-1-Testosterone 20mg x30", slug: "m1t-20", shortDescription: "M1T 20mg (30 tablets)", description: "17a-methyl-1-testosterone tablets.", price: "70.00", brand: "medical", categorySlug: "orals", stock: 35, featured: false },

  // POST CYCLE / PHARMA
  { name: "Clomid 25mg x30", slug: "clomid-25", shortDescription: "Clomid 25mg (30 tablets)", description: "Clomiphene citrate for PCT.", price: "45.00", brand: "medical", categorySlug: "pct-pharma", stock: 80, featured: true },
  { name: "Nolvadex 25mg x30", slug: "nolvadex-25", shortDescription: "Nolvadex 25mg (30 tablets)", description: "Tamoxifen citrate for PCT.", price: "45.00", brand: "medical", categorySlug: "pct-pharma", stock: 85, featured: true },
  { name: "Adex 1mg x30", slug: "adex-1", shortDescription: "Arimidex 1mg (30 tablets)", description: "Anastrozole aromatase inhibitor.", price: "40.00", brand: "medical", categorySlug: "pct-pharma", stock: 70, featured: false },
  { name: "Aromasin 25mg x30", slug: "aromasin-25", shortDescription: "Aromasin 25mg (30 tablets)", description: "Exemestane aromatase inhibitor.", price: "60.00", brand: "medical", categorySlug: "pct-pharma", stock: 55, featured: false },
  { name: "Prami .25mg x20", slug: "prami-025", shortDescription: "Pramipexole 0.25mg (20 tablets)", description: "Dopamine agonist for prolactin control.", price: "40.00", brand: "medical", categorySlug: "pct-pharma", stock: 45, featured: false },
  { name: "Metformin 850mg x30", slug: "metformin-850", shortDescription: "Metformin 850mg (30 tablets)", description: "Glucose management medication.", price: "60.00", brand: "medical", categorySlug: "pct-pharma", stock: 60, featured: false },
  { name: "Telmisartan 40mg x30", slug: "telmisartan-40", shortDescription: "Telmisartan 40mg (30 tablets)", description: "ARB for blood pressure management.", price: "50.00", brand: "medical", categorySlug: "pct-pharma", stock: 50, featured: false },
  { name: "Cabergoline .5mg x20", slug: "cabergoline-05", shortDescription: "Cabergoline 0.5mg (20 tablets)", description: "Dopamine agonist for prolactin.", price: "60.00", brand: "medical", categorySlug: "pct-pharma", stock: 40, featured: true },
  { name: "HCG 5000iu", slug: "hcg-5000", shortDescription: "HCG 5000iu vial", description: "Human chorionic gonadotropin.", price: "50.00", brand: "medical", categorySlug: "pct-pharma", stock: 55, featured: true },
  { name: "Lasix 40mg x10", slug: "lasix-40", shortDescription: "Lasix 40mg (10 tablets)", description: "Furosemide diuretic.", price: "30.00", brand: "medical", categorySlug: "pct-pharma", stock: 50, featured: false },
  { name: "Modafinil 200mg x20", slug: "modafinil-200", shortDescription: "Modafinil 200mg (20 tablets)", description: "Wakefulness-promoting agent.", price: "60.00", brand: "medical", categorySlug: "pct-pharma", stock: 45, featured: false },
  { name: "Finasteride 1mg x30", slug: "finasteride-1", shortDescription: "Finasteride 1mg (30 tablets)", description: "5-alpha reductase inhibitor.", price: "50.00", brand: "medical", categorySlug: "pct-pharma", stock: 60, featured: false },
  { name: "Hydrochlorothiazide 12.5mg x30", slug: "hctz-125", shortDescription: "HCTZ 12.5mg (30 tablets)", description: "Thiazide diuretic - low dose.", price: "45.00", brand: "medical", categorySlug: "pct-pharma", stock: 50, featured: false },
  { name: "Hydrochlorothiazide 25mg x30", slug: "hctz-25", shortDescription: "HCTZ 25mg (30 tablets)", description: "Thiazide diuretic - standard dose.", price: "60.00", brand: "medical", categorySlug: "pct-pharma", stock: 45, featured: false },
  { name: "Nebivolol 10mg x30", slug: "nebivolol-10", shortDescription: "Nebivolol 10mg (30 tablets)", description: "Beta blocker for BP management.", price: "50.00", brand: "medical", categorySlug: "pct-pharma", stock: 40, featured: false },
  { name: "Letrozole 2.5mg x20", slug: "letrozole-25", shortDescription: "Letrozole 2.5mg (20 tablets)", description: "Potent aromatase inhibitor.", price: "40.00", brand: "medical", categorySlug: "pct-pharma", stock: 55, featured: false },
  { name: "Raloxifene 60mg x20", slug: "raloxifene-60", shortDescription: "Raloxifene 60mg (20 tablets)", description: "SERM for estrogen modulation.", price: "50.00", brand: "medical", categorySlug: "pct-pharma", stock: 45, featured: false },

  // PEPTIDES
  { name: "Ozempic 4mg/3ml", slug: "ozempic-4", shortDescription: "Ozempic 4mg/3ml pen", description: "Semaglutide injection pen - brand.", price: "500.00", brand: "medical", categorySlug: "peptides", stock: 20, featured: true },
  { name: "Ozempic 8mg/3ml", slug: "ozempic-8", shortDescription: "Ozempic 8mg/3ml pen", description: "High-dose Semaglutide injection pen.", price: "800.00", brand: "medical", categorySlug: "peptides", stock: 15, featured: true },
  { name: "Semaglutide (Generic) 2mg", slug: "sema-generic-2", shortDescription: "Generic Semaglutide 2mg vial", description: "Generic Semaglutide lyophilized powder.", price: "50.00", brand: "medical", categorySlug: "peptides", stock: 40, featured: false },
  { name: "Semaglutide (Generic) 5mg", slug: "sema-generic-5", shortDescription: "Generic Semaglutide 5mg vial", description: "High-dose generic Semaglutide powder.", price: "125.00", brand: "medical", categorySlug: "peptides", stock: 35, featured: true },
  { name: "TB-500 10mg", slug: "tb500-10", shortDescription: "Thymosin Beta-4 10mg vial", description: "Healing peptide for tissue repair.", price: "80.00", brand: "medical", categorySlug: "peptides", stock: 50, featured: false },
  { name: "BPC-157 5mg", slug: "bpc157-5", shortDescription: "BPC-157 5mg vial", description: "Body protection compound peptide.", price: "50.00", brand: "medical", categorySlug: "peptides", stock: 55, featured: true },
  { name: "PT-141 10mg", slug: "pt141-10", shortDescription: "Bremelanotide 10mg vial", description: "Sexual function enhancement peptide.", price: "50.00", brand: "medical", categorySlug: "peptides", stock: 45, featured: false },
  { name: "Melanotan 2 10mg", slug: "mt2-10", shortDescription: "Melanotan II 10mg vial", description: "Tanning and libido peptide.", price: "50.00", brand: "medical", categorySlug: "peptides", stock: 50, featured: false },
  { name: "Lantus 100IU pen", slug: "lantus-100", shortDescription: "Insulin Glargine 100IU pen", description: "Long-acting insulin analog.", price: "70.00", brand: "medical", categorySlug: "peptides", stock: 30, featured: false },
  { name: "Humalog cartridge 100IU", slug: "humalog-100", shortDescription: "Insulin Lispro 100IU cartridge", description: "Fast-acting insulin analog.", price: "70.00", brand: "medical", categorySlug: "peptides", stock: 30, featured: false },
  { name: "Tirzepatide 10mg", slug: "tirz-10", shortDescription: "Tirzepatide 10mg vial", description: "GIP/GLP-1 dual agonist.", price: "100.00", brand: "medical", categorySlug: "peptides", stock: 35, featured: true },
  { name: "Tirzepatide 15mg", slug: "tirz-15", shortDescription: "Tirzepatide 15mg vial", description: "High-dose dual agonist.", price: "150.00", brand: "medical", categorySlug: "peptides", stock: 30, featured: false },

  // GROWTH HORMONE
  { name: "IGF1-LR3 1mg", slug: "igf1-lr3-1", shortDescription: "IGF-1 LR3 1mg vial", description: "Long-acting insulin-like growth factor.", price: "70.00", brand: "medical", categorySlug: "growth-hormone", stock: 40, featured: false },
  { name: "HGH 150IU kits", slug: "hgh-150", shortDescription: "HGH 150IU kit", description: "Human growth hormone 150IU total.", price: "250.00", brand: "medical", categorySlug: "growth-hormone", stock: 20, featured: true },
  { name: "HGH 240IU kits", slug: "hgh-240", shortDescription: "HGH 240IU kit", description: "Human growth hormone 240IU total.", price: "450.00", brand: "medical", categorySlug: "growth-hormone", stock: 15, featured: true },
  { name: "HGH 100IU kits", slug: "hgh-100", shortDescription: "HGH 100IU kit", description: "Human growth hormone 100IU total.", price: "200.00", brand: "medical", categorySlug: "growth-hormone", stock: 25, featured: false },
  { name: "Genotropin 36iu 12mg", slug: "genotropin-36", shortDescription: "Genotropin 36IU (12mg) pen", description: "Pharmaceutical grade HGH pen.", price: "300.00", brand: "medical", categorySlug: "growth-hormone", stock: 10, featured: true },
];

const paymentMethodData = [
  { 
    name: "Credit/Debit Card", 
    type: "card", 
    enabled: true, 
    description: "Pay securely with your credit or debit card", 
    instructions: "You will be redirected to our secure payment processor to complete your purchase.",
    icon: "credit-card",
    sortOrder: 1,
    providerKey: "stripe"
  },
  { 
    name: "Cash App", 
    type: "manual", 
    enabled: true, 
    description: "Pay via Cash App", 
    instructions: "Send payment to $ForgeFormula. Include your order number in the notes.",
    icon: "smartphone",
    sortOrder: 2,
    providerKey: "cashapp"
  },
  { 
    name: "Zelle", 
    type: "manual", 
    enabled: true, 
    description: "Pay via Zelle bank transfer", 
    instructions: "Send payment to payments@forgeformula.com. Include your order number in the memo.",
    icon: "building-2",
    sortOrder: 3,
    providerKey: "zelle"
  },
  { 
    name: "Apple Pay", 
    type: "external", 
    enabled: true, 
    description: "Pay with Apple Pay", 
    instructions: "Complete payment using Apple Pay on your device.",
    icon: "apple",
    sortOrder: 4,
    providerKey: "applepay"
  },
  { 
    name: "Crypto (Bitcoin)", 
    type: "crypto", 
    enabled: true, 
    description: "Pay with Bitcoin", 
    instructions: "Send BTC to the wallet address provided after order confirmation. Payment must be received within 30 minutes.",
    icon: "bitcoin",
    sortOrder: 5,
    providerKey: "btc"
  },
  { 
    name: "Crypto (USDT)", 
    type: "crypto", 
    enabled: true, 
    description: "Pay with Tether (USDT)", 
    instructions: "Send USDT (ERC-20 or TRC-20) to the wallet address provided after order confirmation.",
    icon: "coins",
    sortOrder: 6,
    providerKey: "usdt"
  },
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

  // Insert payment methods
  const existingPaymentMethods = await db.select().from(paymentMethods).limit(1);
  if (existingPaymentMethods.length === 0) {
    for (const method of paymentMethodData) {
      await db.insert(paymentMethods).values(method);
      console.log(`Created payment method: ${method.name}`);
    }
  }

  console.log("Seeding complete!");
}
