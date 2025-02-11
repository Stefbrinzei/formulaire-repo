// Initialisation et écouteurs d'évènements principaux
window.addEventListener('DOMContentLoaded', function() {
    // Attend que le DOM soit complètement chargé avant d'exécuter le code

    const form = this.document.getElementById('contactForm');
    // Récupère le formulaire par son ID

    if (form) {
        // Vérifie si le formulaire existe
        form.addEventListener('submit', handleSubmit);
        // Ajoute un écouteur sur l'évènement submit du formulaire
    }

    document.addEventListener('keydown', function(e) {
        // Ajoute un écouteur pour les touches du clavier
        if (e.key === 'Escape') {
            // Si la touche Echap est pressée
            const existingMessage = document.querySelector('.confirmation-message');
            // Cherche si un message de confirmation existe
            if (existingMessage) {
                hideConfirmation();
                // Cache le message s'il existe
            }
        }
    });
});

// Création du message de confirmation
function createConfirmationMessage(){
    // Créer le message de confirmation dans une nouvelle div
    const confirmationMessage = document.createElement('div');
    // Ajout de la classe CSS
    confirmationMessage.className = 'confirmation-message';
    // Définit le contenu HTML du message de confirmation
    confirmationMessage.innerHTML = `
        <div class="confirmation-content">
            <div class="confirmation-icon"> ✔️ </div>
            <h3>Message envoyé avec succès !</h3>
            <p>Je vous répondrai dans les plus brefs délais.</p>
            <button class="close-btn">Fermer</button>
        </div>
    `;

    // Ajouter les écouteurs d'événements
    confirmationMessage.addEventListener('click', function(e) {
        if (e.target === this) {
            // si on clique sur l'arrière plan (pas sur le contenu)
            hideConfirmation(); //cache le message
        }
    });

    confirmationMessage.querySelector('.close-btn').addEventListener('click', hideConfirmation);
    // Ajoute un écouteur sur le bouton de fermeture

    // Ajouter le message de confirmation au DOM
    document.body.appendChild(confirmationMessage);

    // Déclencher l'animation
    setTimeout(() => {
        confirmationMessage.classList.add('active');
        // ajoute la classe active après un court délai pour l'animation
        }, 10);

        return confirmationMessage;
    }

// Gestion de l'affichage / masquage
function showConfirmation() {
    // Supprimer l'ancien message s'il existe
    const existingMessage = document.querySelector('.confirmation-message');
    if (existingMessage) {
        existingMessage.remove();
    }

    // Créer et affiche un nouveau message
    createConfirmationMessage();
}

function hideConfirmation() {
    // Supprimer l'ancien message s'il existe
    const confirmationMessage = document.querySelector('.confirmation-message');
    if (confirmationMessage) {
        confirmationMessage.classList.remove('active');
        // Retire la classe active du message de confirmation
        setTimeout(() => {
            confirmationMessage.remove();
            // Supprime le message de confirmation après un court délai
            }, 300);
    }
}
// Gestion de la soumission du formulaire
function handleSubmit(e) {
    e.preventDefault(); // Empêche la soumission par défaut

    try {
        const formData = new FormData(this);
        // Crée un objet FormData à partir du formulaire

        const contactData = {
            nom: formData.get('nom'),
            email: formData.get('email'),
            sujet: formData.get('sujet'),
            message: formData.get('message'),
        };

        // Récupère les valeurs des champs du formulaire

        // Vérifier si les données sont validées
        if (contactData.message.lenght < 10) {
            alert('Votre message doit contenir au moins 10 caractères');
            return;
        }

        if (!validateEmail(contactData.email)) {
            alert('Adresse e-mail non valide');
            return;
        }

        // Afficher le message de confirmation
        showConfirmation();
        this.reset(); //Reinitialise le formulaire
    } catch (error) {
        console.error('Erreur lors de la soumission du formulaire:', error);
    }
}

// Validation de l'email
// Fonction de vérification de l'email

function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; //Regex (expresion régulière pour vérifier le format de l'email)
    return re.test(email); //Retourne true si l'email est valide
}