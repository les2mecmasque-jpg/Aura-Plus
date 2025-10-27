// -- Gestion du Panier --

// Trouve tous les boutons "Ajouter au panier" sur la page
document.addEventListener('DOMContentLoaded', function() {
  const addCartButtons = document.querySelectorAll('.add-to-cart-btn');
  addCartButtons.forEach(btn => {
    btn.addEventListener('click', function(e) {
      e.preventDefault();
      const id = this.getAttribute('data-id');
      ajouterAuPanier(id);
    });
  });

  // Affichage automatique du panier sur la page panier.html
  if (document.getElementById('panier-main')) {
    afficherPanier();
  }
});

// Ajoute un produit au panier (id = string ou number)
function ajouterAuPanier(id) {
  let panier = JSON.parse(localStorage.getItem('panier')) || [];
  const produitExistant = panier.find(item => item.id === id);
  if (produitExistant) {
    produitExistant.qty += 1;
  } else {
    panier.push({ id: id, qty: 1 });
  }
  localStorage.setItem('panier', JSON.stringify(panier));
  alert('Produit ajouté au panier !');
}

// Récupère le détail d'un produit à partir de son id (pour affichage dans le panier)
function getProduitDetails(id) {
  // Tu dois synchroniser cette liste avec les produits de catalogue.html (même id, même noms, etc)
  const produits = [
    { id: "1", nom: "T-shirt Classique Gris", prix: 25, img: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=400&q=80" },
    { id: "2", nom: "T-shirt Aura Noir", prix: 28, img: "https://images.unsplash.com/photo-1526178613658-3b642d1b6852?auto=format&fit=crop&w=400&q=80" },
    { id: "3", nom: "Sweatshirt Crewneck Noir", prix: 45, img: "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=400&q=80" },
    { id: "4", nom: "Sweatshirt Gris Clair", prix: 42, img: "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=400&q=80" },
    { id: "5", nom: "Sweatshirt Zippé Aura", prix: 48, img: "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=400&q=80" },
    { id: "6", nom: "Bonnet Côtelé Noir", prix: 20, img: "https://images.unsplash.com/photo-1454023492550-5696f8ff10e1?auto=format&fit=crop&w=400&q=80" },
    { id: "7", nom: "Bonnet Urban Gris", prix: 22, img: "https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?auto=format&fit=crop&w=400&q=80" }
  ];
  return produits.find(p => p.id === id);
}

// Affiche le contenu du panier sur la page panier.html
function afficherPanier() {
  const panierMain = document.getElementById('panier-main');
  let panier = JSON.parse(localStorage.getItem('panier')) || [];
  if (panier.length === 0) {
    panierMain.innerHTML = "<h1 class='section-title'>Votre panier</h1><p>Votre panier est vide.</p>";
    return;
  }
  let total = 0;
  let html = `<h1 class="section-title">Votre panier</h1><table style="width:100%;max-width:600px;margin:auto;border-collapse:collapse;">
    <tr style="background:#232323;">
      <th style="color:#ededed;padding:8px;">Produit</th>
      <th style="color:#ededed;padding:8px;">Prix</th>
      <th style="color:#ededed;padding:8px;">Quantité</th>
      <th style="color:#ededed;padding:8px;">Total</th>
      <th></th>
    </tr>`;
  panier.forEach(item => {
    const produit = getProduitDetails(item.id);
    if (!produit) return;
    const sousTotal = produit.prix * item.qty;
    total += sousTotal;
    html += `<tr>
      <td style="padding:8px;vertical-align:middle;">
        <img src="${produit.img}" alt="${produit.nom}" style="width:40px;vertical-align:middle;border-radius:4px;"> 
        ${produit.nom}
      </td>
      <td style="text-align:center;">${produit.prix} €</td>
      <td style="text-align:center;">
        <button onclick="changerQuantite('${produit.id}',-1)" style="width:32px;">-</button> 
        ${item.qty}
        <button onclick="changerQuantite('${produit.id}',1)" style="width:32px;">+</button>
      </td>
      <td style="text-align:center;">${sousTotal} €</td>
      <td style="text-align:center;"><button onclick="supprimerProduit('${produit.id}')" style="width:32px;">🗑️</button></td>
    </tr>`;
  });
  html += `<tr style="background:#232323;">
    <td colspan="3" style="text-align:right;padding:8px;"><b>Total :</b></td>
    <td style="text-align:center;"><b>${total} €</b></td>
    <td></td>
  </tr></table>
  <div style="text-align:center;margin-top:32px;">
    <button onclick="validerCommande()" style="font-size:1.1rem;">Valider la commande</button>
  </div>`;
  panierMain.innerHTML = html;
}

// Change la quantité d'un produit dans le panier
function changerQuantite(id, delta) {
  let panier = JSON.parse(localStorage.getItem('panier')) || [];
  const item = panier.find(p => p.id === id);
  if (!item) return;
  item.qty += delta;
  if (item.qty < 1) {
    panier = panier.filter(p => p.id !== id);
  }
  localStorage.setItem('panier', JSON.stringify(panier));
  location.reload();
}

// Supprime un produit du panier
function supprimerProduit(id) {
  let panier = JSON.parse(localStorage.getItem('panier')) || [];
  panier = panier.filter(p => p.id !== id);
  localStorage.setItem('panier', JSON.stringify(panier));
  location.reload();
}

// Valide la commande (démo)
function validerCommande() {
  alert("Merci pour votre commande ! (démo)");
  localStorage.removeItem("panier");
  location.reload();
}

// Pour que les fonctions soient accessibles aux boutons inline HTML
window.changerQuantite = changerQuantite;
window.supprimerProduit = supprimerProduit;
window.validerCommande = validerCommande;