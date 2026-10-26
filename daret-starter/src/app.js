
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
            console.log("Formulaire valide !");
 
            // Calculs financiers (US-03)
            afficherCalculsInterface();
 
            // Calendrier et dates (US-04)
            // (genererCalendrier appelle aussi mettreAJourProgression de US-06)
            genererCalendrier();
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
 
// US-04 : Calendrier des tours
 
// le corps du tableau : declare ICI (une seule fois) car US-04, US-06 et US-07 l'utilisent
const corpsCalendrier = document.getElementById("calendrier-corps");
 
// n avanciw la date b la periodecite choisi
function calculerProchaineDate(date, periodicite) {
    // On crée une copie propre de la date
    const nouvelleDate = new Date(date);
 
    if (periodicite === "hebdomadaire") {
        nouvelleDate.setDate(nouvelleDate.getDate() + 7);
    } else if (periodicite === "quinzaine") {
        nouvelleDate.setDate(nouvelleDate.getDate() + 14);
    } else if (periodicite === "mensuelle") {
        nouvelleDate.setMonth(nouvelleDate.getMonth() + 1);
    }
 
    return nouvelleDate;
}
 
// recupere nom participant b wahde l array
function obtenirNomsParticipants() {
    const inputs = document.querySelectorAll("#participants-liste input");
    const listeNoms = [];
 
    inputs.forEach((input) => {
        const nom = input.value.trim();
        listeNoms.push(nom !== "" ? nom : "Participant");
    });
    return listeNoms;
}
 
// mtn en genere et affiche clendrier des tours des DOM
function genererCalendrier(aleatoire = false) {
    const periodecite = document.getElementById("periodicite").value;
    const dateDebutStr = document.getElementById("date-debut").value;
    const cotisation = Number(document.getElementById("cotisation").value);
    // recuperer le tableau des participants
    const participants = obtenirsParticipantsOrdonnes(aleatoire);
    const montantTotal = cotisation * participants.length;
 
    const calendrierCorps = document.getElementById("calendrier-corps");
    calendrierCorps.innerHTML = ""; // pour vider le tableau
 
    let dateCourante = new Date(dateDebutStr);
    let datesTours = [];
 
    // construire chaque ligne du tableau ;
    participants.forEach((nom, index) => {
        const numeroTour = index + 1;
        const dateFormatee = dateCourante.toLocaleDateString("fr-FR");
 
        // enregister la date dans notre tableau
        datesTours.push(dateFormatee);
        // Creer la ligne HTML
        const ligne = document.createElement("tr");
        ligne.innerHTML = `
    <td class="px-4 py-3 font-medium">
        ${numeroTour}
    </td>
 
    <td class="px-4 py-3">
        ${dateFormatee}
    </td>
 
    <td class="px-4 py-3 font-semibold text-daret-vert">
        <button
            type="button"
            class="btn-detail-beneficiaire underline underline-offset-2"
            aria-haspopup="dialog"
        ></button>
    </td>
 
    <td class="px-4 py-3" style="white-space: nowrap;">
        ${montantTotal} MAD
    </td>
 
    <td class="px-4 py-3">
        <span class="statut-texte inline-flex items-center rounded-full bg-yellow-100 px-2.5 py-0.5 text-xs font-medium text-yellow-800">
            En attente
        </span>
    </td>
 
     <td class="px-4 py-3">
        <button
            type="button"
            class="btn-action-tour rounded border border-daret-vert px-3 py-1 text-sm font-medium text-daret-vert hover:bg-daret-vert-clair"
            style="min-width: 8.5rem;"
        >
            Marquer comme terminé
        </button>
    </td>
`;
        // on met le nom avec textContent (et pas dans le template) pour que le prénom
        // soit toujours du texte simple, meme si quelqu'un tape du HTML
        ligne.querySelector(".btn-detail-beneficiaire").textContent = nom;
 
        calendrierCorps.appendChild(ligne);
 
        // Calculer la date pour le tour suivant
        dateCourante = calculerProchaineDate(dateCourante, periodecite);
    });
    // mettre a jour la borne "Premier tour -- dernier tour" dans le resumer
    const premierTour = datesTours[0];
    const dernierTour = datesTours[datesTours.length - 1];
 
    document.getElementById("resume-dates").textContent = `${premierTour} · ${dernierTour}`;
 
    // US-06 : le compteur "X / Y tours terminés" se remet a jour a chaque nouveau calendrier
    mettreAJourProgression();
}
 
// US-05 Ordre des Tours
 
// ndiro un fct pour melanger un tableau au hasard
function melangerTableau(tableau) {
    const copie = [...tableau];
    for (let i = copie.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [copie[i], copie[j]] = [copie[j], copie[i]];
    }
    return copie;
}
 
// fction pour recuperer les prenoms (dans l ordre ou bien melanger)
function obtenirsParticipantsOrdonnes(aleatoire = false) {
    const inputs = document.querySelectorAll("#participants-liste input");
    let listeNoms = [];
 
    // recuperer les noms un par un
    inputs.forEach((input) => {
        const nom = input.value.trim();
        listeNoms.push(nom !== "" ? nom : "participant");
    });
    // clique "Tirer l'ordre au sort" on mélange
    if (aleatoire === true) {
        listeNoms = melangerTableau(listeNoms);
    }
    return listeNoms;
}
 
document.getElementById("tirage-au-sort").addEventListener("click", () => {
    genererCalendrier(true);
});
 
document.getElementById("ordre-saisie").addEventListener("click", () => {
    genererCalendrier(false);
});
 
// US-06 : MARQUER UN TOUR COMME TERMINÉ
 
const compteurTours = document.getElementById("compteur-tours");
 
// compter les tours termines et afficher "X / Y tours terminés"
function mettreAJourProgression() {
    const total = corpsCalendrier.querySelectorAll("tr").length;
    const terminees = corpsCalendrier.querySelectorAll("tr.ligne-terminee").length;
    compteurTours.textContent = `${terminees} / ${total} tours terminés`;
}
 
// un seul ecouteur sur le corps du tableau (les boutons sont recrees a chaque calendrier)
corpsCalendrier.addEventListener("click", (event) => {
    const bouton = event.target.closest(".btn-action-tour");
    if (!bouton) return;
 
    const ligne = bouton.closest("tr");
    const statut = ligne.querySelector(".statut-texte");
    const estTerminee = ligne.classList.toggle("ligne-terminee");
 
    statut.textContent = estTerminee ? "Terminé" : "En attente";
    bouton.textContent = estTerminee ? "Annuler" : "Marquer comme terminé";
    mettreAJourProgression();
});
 
// US-07 : VOIR LE DETAIL D'UN TOUR
 
const dialogDetailTour = document.getElementById("dialog-detail-tour");
const fermerDialogTour = document.getElementById("fermer-dialog-tour");
 
// Emplacements des informations dans le dialogue
const detailNumeroTour = document.getElementById("detail-numero-tour");
const detailDateTour = document.getElementById("detail-date-tour");
const detailBeneficiaire = document.getElementById("detail-beneficiaire");
const detailMontant = document.getElementById("detail-montant");
const detailAutresCotisants = document.getElementById("detail-autres-cotisants");
 
// Garder en mémoire le bouton qui a ouvert la fenêtre
let elementOuvertureDialog = null;
 
// Écouter les clics sur les noms dans le calendrier
if (corpsCalendrier && dialogDetailTour) {
    corpsCalendrier.addEventListener("click", (event) => {
        const cible = event.target;
 
        if (!(cible instanceof Element)) return;
 
        const boutonBeneficiaire = cible.closest(
            ".btn-detail-beneficiaire"
        );
 
        // Si le clic n'est pas sur un nom, arrêter
        if (!boutonBeneficiaire) return;
 
        const ligne = boutonBeneficiaire.closest("tr");
 
        if (!ligne) return;
 
        // Mémoriser le bouton pour rendre le focus après fermeture
        elementOuvertureDialog = boutonBeneficiaire;
 
        // Lire les informations dans les cellules du tableau
        const cellules = ligne.querySelectorAll("td");
 
        detailNumeroTour.textContent = cellules[0].textContent.trim();
        detailDateTour.textContent = cellules[1].textContent.trim();
        detailBeneficiaire.textContent = cellules[2].textContent.trim();
        detailMontant.textContent = cellules[3].textContent.trim();
 
        // Récupérer les noms des bénéficiaires des autres lignes
        detailAutresCotisants.innerHTML = "";
 
        const toutesLesLignes = corpsCalendrier.querySelectorAll("tr");
 
        toutesLesLignes.forEach((autreLigne) => {
            if (autreLigne === ligne) return;
 
            const celluleNom = autreLigne.querySelector(
                ".btn-detail-beneficiaire"
            );
 
            if (!celluleNom) return;
 
            const li = document.createElement("li");
            li.textContent = celluleNom.textContent.trim();
            detailAutresCotisants.appendChild(li);
        });
 
        // Si aucune autre personne n'est disponible
        if (detailAutresCotisants.children.length === 0) {
            const li = document.createElement("li");
            li.textContent = "Aucun autre cotisant.";
            detailAutresCotisants.appendChild(li);
        }
 
        // Ouvrir la fenêtre modale
        if (!dialogDetailTour.open) {
            dialogDetailTour.showModal();
        }
    });
}
 
// Fermer avec le bouton Fermer
if (fermerDialogTour && dialogDetailTour) {
    fermerDialogTour.addEventListener("click", () => {
        dialogDetailTour.close();
    });
}
 
// Fermer en cliquant sur le fond extérieur de la fenêtre
if (dialogDetailTour) {
    dialogDetailTour.addEventListener("click", (event) => {
        if (event.target === dialogDetailTour) {
            dialogDetailTour.close();
        }
    });
 
    // Restaurer le focus après toute fermeture,
    // y compris avec la touche Échap
    dialogDetailTour.addEventListener("close", () => {
        if (elementOuvertureDialog) {
            elementOuvertureDialog.focus();
        }
    });
}

// US-08 : REINITIALISER

const reinitialiserBtn = document.getElementById("reinitialiser");

function reinitialiserFormulaire() {
    // 1. nvidiw les champs (reset kayrje3 input w select l valeur par defaut)
    form.reset();

    // 2. n7ydo toutes les erreurs
    afficherErreur(nomCercleInput, "");
    afficherErreur(cotisationInput, "");
    afficherErreur(periodiciteInput, "");
    afficherErreur(datedebutInput, "");

    // 3. nrj3o l 3 participants li kanou f lbdaya
    initialiserParticipants();

    // 4. nkhwiw le calendrier w le compteur de tours
    corpsCalendrier.innerHTML = "";
    compteurTours.textContent = "";

    // 5. nkhwiw les 4 cartes de resume
    document.getElementById("resume-cagnotte").textContent = "";
    document.getElementById("resume-total-cycle").textContent = "";
    document.getElementById("resume-nb-tours").textContent = "";
    document.getElementById("resume-dates").textContent = "";

    // 6. nkhbio le bloc resultat w nwrio l etat vide
    document.getElementById("contenu-resultat").classList.add("hidden");
    document.getElementById("etat-vide").classList.remove("hidden");

    // 7. focus 3la awel champ bach l'utilisateur ybda men jdid
    nomCercleInput.focus();
}

// clic sur le bouton Réinitialiser
if (reinitialiserBtn) {
    reinitialiserBtn.addEventListener("click", reinitialiserFormulaire);
}
 