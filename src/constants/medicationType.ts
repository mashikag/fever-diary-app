export enum MedicationType {
  Paracetamol = "paracetamol",
  Ibuprofen = "ibuprofen",
}

// Paracetamol
export enum ParacetamolForm {
  Tablet = "tablet",
  Suppository = "suppository",
  Syrup = "syrup",
}

export enum ParacetamolTabletStrength {
  Mg250 = 250,
  Mg500 = 500,
  Mg1000 = 1000,
}

export enum ParacetamolSuppositoryStrength {
  Mg60 = 60,
  Mg120 = 120,
  Mg250 = 250,
  Mg500 = 500,
  Mg1000 = 1000,
}

export enum ParacetamolSyrupStrength {
  MgPerMl24 = 24,
  MgPerMl50 = 50,
  MgPerMl100 = 100,
}

// Ibuprofen
export enum IbuprofenForm {
  Tablet = "tablet",
  Capsule = "capsule",
  Suspension = "suspension", // Liquid form
  Suppository = "suppository",
}

export enum IbuprofenTabletStrength {
  Mg200 = 200,
  Mg400 = 400,
  Mg600 = 600,
  Mg800 = 800,
}

export enum IbuprofenCapsuleStrength {
  Mg200 = 200,
  Mg400 = 400,
}

export enum IbuprofenSuspensionStrength {
  MgPerMl20 = 20, // Common adult formulation (100mg/5mL)
  MgPerMl40 = 40, // Common pediatric formulation (200mg/5mL)
}

export enum IbuprofenSuppositoryStrength {
  Mg60 = 60,
  Mg125 = 125,
  Mg500 = 500,
}
