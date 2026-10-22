
// US01
const form = document.getElementById("daret-form");

// 1. DÉCLARATION DES VARIABLES
const nomCercleInput = document.getElementById("nom-cercle");
const cotisationInput = document.getElementById("cotisation");
const periodiciteInput = document.getElementById("periodicite");
const datedebutInput = document.getElementById("date-debut");

// Regex dyal l-nom du cercle
const regexNomCercle = /^[a-zA-ZÀ-ÿ0-9\s-]{3,40}$/;

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
            // Tout est bon : on affiche les calculs (US03)
            afficherCalculsInterface();
        }
    });
}

// US-02 (FORMULAIRE)

const participantsListe = document.getElementById("participants-liste");
const ajouterParticipantBtn = document.getElementById("ajouter-participant");
const participantsCompteur = document.getElementById("participants-compteur");

const MIN_PARTICIPANTS = 2;
const MAX_PARTICIPANTS = 20;

// on va fait une fct qui cree et aligne en meme temps
function creerLigneParticipant(valeur = "") {
    // n creeiw li,input,button avec document.createElement
    const li = document.createElement("li");
    li.className = "flex items-center gap-2";

    const input = document.createElement("input");
    input.type = "text";
    input.name = "participant";
    input.value = valeur;
    input.placeholder = "Prénom du participant";
    input.className = "w-full rounded border border-daret-bordure px-3 py-2 ";

    const btnRetirer = document.createElement("button");
    btnRetirer.type = "button";
    btnRetirer.textContent = "Retirer";
    btnRetirer.className = "rounded border border-daret-erreur px-3 py-2 text-daret-erreur";

    // db khasna ndiro l ecouteur dyalna f la button retirer seulement
    btnRetirer.addEventListener("click", () => {
        const nbrLignes = participantsListe.querySelectorAll("li").length;
        if (nbrLignes > MIN_PARTICIPANTS) {
            li.remove(); // ghir had la ligne li katmchi lina
            mettreAJourCompteur();
        } else {
            alert("Un cercle de daret doit avoir au moins 2 participants.");
        }
    });

    // kanzido input et button wset Li
    li.appendChild(input);
    li.appendChild(btnRetirer);

    // nzido Li wset liste lkbira
    participantsListe.appendChild(li);
    mettreAJourCompteur();
}

// fct COMPTEUR
function mettreAJourCompteur() {
    const lignes = participantsListe.querySelectorAll("li");
    const nb = lignes.length;

    if (participantsCompteur) {
        participantsCompteur.textContent = `${nb} participant${nb > 1 ? "s" : ""}`;
    }
    if (ajouterParticipantBtn) {
        ajouterParticipantBtn.style.display = nb >= MAX_PARTICIPANTS ? "none" : "block";
    }
}

// mtn khassna n initialisiw b 3 participants
function initialiserParticipants() {
    participantsListe.innerHTML = "";
    for (let i = 0; i < 3; i++) {
        creerLigneParticipant();
    }
}

// Clic sur ajouter
if (ajouterParticipantBtn) {
    ajouterParticipantBtn.addEventListener("click", () => {
        const nb = participantsListe.querySelectorAll("li").length;
        if (nb < MAX_PARTICIPANTS) {
            creerLigneParticipant();
        }
    });
}

// nbdaw b 3 participants
initialiserParticipants();

// US03 : CALCULS

// les calculs
function calculerCercle(cotisation, nombreParticipants) {
    const cagnotteTour = cotisation * nombreParticipants;
    const totalVersParParticipant = cotisation * nombreParticipants;
    const nombreTours = nombreParticipants;

    return {
        cagnotteTour: cagnotteTour,
        totalVersParParticipant: totalVersParParticipant,
        nombreTours: nombreTours
    };
}

// function nakhdo biha les donnees w nlancer le calcul
function executerCalculs() {
    const cotisation = Number(cotisationInput.value);
    const nombreParticipants = participantsListe.querySelectorAll("li").length;

    // ila kant la cotisation vide ou bien les participants < 2, on arrête
    if (!cotisation || nombreParticipants < 2) {
        return null;
    }
    return calculerCercle(cotisation, nombreParticipants);
}

// afficher les resultats dans la page
function afficherCalculsInterface() {
    const resultat = executerCalculs();

    // Si on n'a pas de résultat, on arrête
    if (!resultat) {
        return;
    }

    // On écrit les valeurs dans le HTML
    document.getElementById("resume-cagnotte").textContent = resultat.cagnotteTour + " MAD";
    document.getElementById("resume-total-cycle").textContent = resultat.totalVersParParticipant + " MAD";
    document.getElementById("resume-nb-tours").textContent = resultat.nombreTours;

    // On cache le bloc vide et on montre le bloc résultat
    document.getElementById("etat-vide").classList.add("hidden");
    document.getElementById("contenu-resultat").classList.remove("hidden");
}
