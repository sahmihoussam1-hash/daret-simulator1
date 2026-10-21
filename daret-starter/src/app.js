
const form = document.getElementById("daret-form");

// 1. DÉCLARATION DES VARIABLES
const nomCercleInput = document.getElementById("nom-cercle");
const cotisationInput = document.getElementById("cotisation");
const periodiciteInput = document.getElementById("periodicite");
const datedebutInput = document.getElementById("date-debut");

// Regex dyal l-nom du cercle
const regexNomCercle = /^[a-zA-ZÀ-ÿ0-9\s-]{3,40}\$/;

// 2. FONCTION D'ERREUR
function afficherErreur(input, message) {
    const erreurA = document.getElementById(`${input.id}-erreur`);

    if (message) {
        input.setAttribute("aria-invalid", "true");
        if (erreurA) {
            erreurA.textContent = message;
            erreurA.classList.remove("hidden"); // afficher l erreur
        }
    } else {
        input.removeAttribute("aria-invalid");
        if (erreurA) {
            erreurA.textContent = "";
            erreurA.classList.add("hidden"); // masquer l erreur
        }
    }
}

// 3. VALIDATION NOM DU CERCLE
function validerNomCercle() {
    const valeur = nomCercleInput.value.trim(); 
    
    if (!regexNomCercle.test(valeur)) {
        afficherErreur(nomCercleInput, "Le nom doit contenir entre 3 et 40 caractères (lettres, chiffres, espaces, tirets).");
        return false; 
    }
    afficherErreur(nomCercleInput, "");
    return true;
}

// 4. VALIDATION COTISATION 
function validerCotisation() {
    const valeur = Number(cotisationInput.value); 
    
    if (!valeur || valeur < 100 || valeur > 50000 || !Number.isInteger(valeur)) {
        afficherErreur(cotisationInput, "La cotisation doit être un nombre entier entre 100 et 50 000 MAD.");
        return false;
    }
    afficherErreur(cotisationInput, "");
    return true;
}

// 5. VALIDATION DATE DE DEBUT 
function validerDateDebut() {
    const dateDebut = datedebutInput.value;

    if (!dateDebut) {
        afficherErreur(datedebutInput, "Veuillez sélectionner une date de début.");
        return false;
    }

    const aujourdhui = new Date().toISOString().split("T")[0];

    if (dateDebut < aujourdhui) {
        afficherErreur(datedebutInput, "La date de début doit être aujourd'hui ou dans le futur.");
        return false;
    }
     afficherErreur(datedebutInput, "");
    return true;
}
// 6. VALIDATION PERIODICITE 
function validerPeriodicite() {
    const valeur = periodiciteInput.value;
    const optionsValides = ["hebdomadaire", "quinzaine", "mensuelle"];

    if (!optionsValides.includes(valeur)) {
        afficherErreur(periodiciteInput, "Veuillez sélectionner une périodicité valide.");
        return false;
    }

    afficherErreur(periodiciteInput, "");
    return true;
}
// 7. ecouteurs
nomCercleInput.addEventListener("input", validerNomCercle);
cotisationInput.addEventListener("input", validerCotisation);
datedebutInput.addEventListener("change", validerDateDebut);
periodiciteInput.addEventListener("change", validerPeriodicite);

// 8. n7to la formulaire
if (form) {
    form.addEventListener("submit", (event) => {
        event.preventDefault();
        
        // les validations li 3ndi 
        const estNomValide = validerNomCercle();
        const estCotisationValide = validerCotisation();
        const estPeriodiciteValide = validerPeriodicite();
        const estDateValide = validerDateDebut();
// Focus 3la le premier erreur
        if (!estNomValide) {
            nomCercleInput.focus();
        } else if (!estCotisationValide) {
            cotisationInput.focus();
        } else if (!estPeriodiciteValide) {
            periodiciteInput.focus();
        } else if (!estDateValide) {
            datedebutInput.focus();
        } else {
            console.log("Formulaire valide! Kolchi 100% s7iḥ.");
        }
    });
}
