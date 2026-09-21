/* =============================================================
   Basse Immo — données du site
   Un seul fichier à modifier pour faire vivre le contenu.
   Tous les montants sont en francs CFA (XOF).
   ============================================================= */
window.BI = window.BI || {};

/* -------------------------------------------------------------
   ⚠️  À REMPLACER PAR VOS VRAIES COORDONNÉES AVANT MISE EN LIGNE
   ------------------------------------------------------------- */
BI.contact = {
  marque: 'Basse Immo',
  baseline: 'Construire au Sénégal',
  telephone: '+221 33 800 00 00',
  telephoneHref: 'tel:+221338000000',
  whatsapp: '221770000000',                 // format international sans « + »
  whatsappAffiche: '+221 77 000 00 00',
  email: 'contact@basseimmo.sn',
  adresse: 'Sacré-Cœur 3 Pyrotechnie, Immeuble Teranga, 2e étage — Dakar',
  horaires: 'Lundi – samedi, 8h30 – 18h30 (GMT)',
  siteUrl: 'https://basseimmo.sn',
  reseaux: {
    facebook: 'https://facebook.com/',
    instagram: 'https://instagram.com/',
    linkedin: 'https://linkedin.com/',
    youtube: 'https://youtube.com/'
  }
};

BI.waLink = function (message) {
  var txt = message || 'Bonjour Basse Immo, je souhaite des informations sur mon projet de construction.';
  return 'https://wa.me/' + BI.contact.whatsapp + '?text=' + encodeURIComponent(txt);
};

/* -------------------------------------------------------------
   Taux de change — le franc CFA est arrimé à l'euro (taux fixe).
   Les autres cours sont indicatifs : à rafraîchir de temps en temps.
   ------------------------------------------------------------- */
BI.devises = {
  EUR: { taux: 655.957, libelle: 'EUR', fixe: true },
  USD: { taux: 600,     libelle: 'USD', fixe: false },
  CAD: { taux: 440,     libelle: 'CAD', fixe: false }
};

/* -------------------------------------------------------------
   Niveaux de finition — fourchette de coût au m² habitable.
   Gros œuvre + second œuvre + finitions. Hors terrain et honoraires.
   ------------------------------------------------------------- */
BI.finitions = [
  {
    id: 'economique', nom: 'Économique', icone: 'wallet',
    min: 165000, max: 215000,
    resume: 'Agglos, enduit peint, carrelage 30×30, menuiserie aluminium simple.',
    detail: 'L\'essentiel bien fait : on privilégie la solidité de la structure et on garde les finitions sobres, quitte à les reprendre plus tard.'
  },
  {
    id: 'standard', nom: 'Standard', icone: 'home',
    min: 235000, max: 305000,
    resume: 'Carrelage 60×60, faïence pleine hauteur, placards, faux plafond partiel.',
    detail: 'Le niveau le plus demandé au Sénégal. Bon équilibre entre confort durable et budget maîtrisé.'
  },
  {
    id: 'confort', nom: 'Confort +', icone: 'sparkles',
    min: 320000, max: 415000,
    resume: 'Grès cérame, cuisine équipée, climatisation, menuiserie double vitrage.',
    detail: 'Prestations soignées, isolation renforcée et équipements posés dès la livraison.'
  },
  {
    id: 'premium', nom: 'Haut standing', icone: 'award',
    min: 430000, max: 570000,
    resume: 'Marbre, domotique, dressing sur mesure, ascenseur possible, paysagisme.',
    detail: 'Prestations sur mesure avec un architecte d\'intérieur associé au projet dès l\'esquisse.'
  }
];

/* -------------------------------------------------------------
   Zones — prix du terrain au m² et coefficient de construction.
   Le coefficient traduit le coût logistique (transport des
   matériaux, disponibilité de la main-d'œuvre qualifiée).
   Prix du terrain : fourchettes indicatives, à vérifier au cas par cas.
   ------------------------------------------------------------- */
BI.zones = [
  { id: 'dakar-plateau', nom: 'Dakar — Plateau, Fann, Point E', region: 'Dakar', coef: 1.00, terrainMin: 350000, terrainMax: 800000 },
  { id: 'almadies',      nom: 'Almadies, Ngor, Mamelles',        region: 'Dakar', coef: 1.02, terrainMin: 400000, terrainMax: 900000 },
  { id: 'mermoz',        nom: 'Mermoz, Sacré-Cœur, Ouakam',      region: 'Dakar', coef: 1.00, terrainMin: 250000, terrainMax: 550000 },
  { id: 'banlieue',      nom: 'Pikine, Guédiawaye, Grand Yoff',  region: 'Dakar', coef: 0.97, terrainMin: 90000,  terrainMax: 220000 },
  { id: 'keur-massar',   nom: 'Keur Massar, Malika, Jaxaay',     region: 'Dakar', coef: 0.95, terrainMin: 40000,  terrainMax: 95000  },
  { id: 'rufisque',      nom: 'Rufisque, Bargny, Sangalkam',     region: 'Dakar', coef: 0.95, terrainMin: 30000,  terrainMax: 80000  },
  { id: 'lac-rose',      nom: 'Lac Rose, Niaga, Tivaouane Peulh',region: 'Dakar', coef: 0.96, terrainMin: 25000,  terrainMax: 70000  },
  { id: 'diamniadio',    nom: 'Diamniadio, Pôle urbain, AIBD',   region: 'Dakar', coef: 0.97, terrainMin: 45000,  terrainMax: 130000 },
  { id: 'thies',         nom: 'Thiès et environs',               region: 'Thiès', coef: 0.94, terrainMin: 20000,  terrainMax: 60000  },
  { id: 'petite-cote',   nom: 'Saly, Ngaparou, Somone, Nianing', region: 'Thiès', coef: 1.03, terrainMin: 35000,  terrainMax: 130000 },
  { id: 'mbour',         nom: 'Mbour, Joal, Popenguine',         region: 'Thiès', coef: 0.99, terrainMin: 20000,  terrainMax: 65000  },
  { id: 'saint-louis',   nom: 'Saint-Louis, Richard-Toll',       region: 'Nord',  coef: 1.05, terrainMin: 15000,  terrainMax: 50000  },
  { id: 'touba',         nom: 'Touba, Mbacké, Diourbel',         region: 'Centre',coef: 0.97, terrainMin: 15000,  terrainMax: 50000  },
  { id: 'kaolack',       nom: 'Kaolack, Fatick, Kaffrine',       region: 'Centre',coef: 0.99, terrainMin: 12000,  terrainMax: 40000  },
  { id: 'casamance',     nom: 'Ziguinchor, Cap Skirring, Kolda', region: 'Sud',   coef: 1.12, terrainMin: 10000,  terrainMax: 45000  },
  { id: 'est',           nom: 'Tambacounda, Kédougou, Matam',    region: 'Est',   coef: 1.15, terrainMin: 8000,   terrainMax: 30000  }
];

/* -------------------------------------------------------------
   Types de projet — multiplicateur appliqué au coût au m².
   Un R+2 coûte plus cher au m² qu'un plain-pied (structure,
   escaliers, réseaux verticaux) ; une rénovation coûte moins.
   ------------------------------------------------------------- */
BI.typesProjet = [
  { id: 'plainpied', nom: 'Villa plain-pied',       icone: 'villa',      coef: 1.00, dureeBase: 6,  detail: 'Un seul niveau' },
  { id: 'r1',        nom: 'Villa R+1',              icone: 'home',       coef: 1.06, dureeBase: 9,  detail: 'Rez-de-chaussée + 1 étage' },
  { id: 'r2',        nom: 'Villa R+2',              icone: 'building',   coef: 1.12, dureeBase: 12, detail: 'Rez-de-chaussée + 2 étages' },
  { id: 'immeuble',  nom: 'Immeuble locatif',       icone: 'layers',     coef: 1.15, dureeBase: 14, detail: 'Plusieurs appartements' },
  { id: 'extension', nom: 'Extension / surélévation',icone: 'stairs',    coef: 0.92, dureeBase: 4,  detail: 'Sur bâti existant' },
  { id: 'renovation',nom: 'Rénovation lourde',      icone: 'refresh',    coef: 0.62, dureeBase: 4,  detail: 'Remise à neuf' }
];

/* -------------------------------------------------------------
   Options — montants forfaitaires indicatifs.
   ------------------------------------------------------------- */
BI.options = [
  { id: 'cloture',   nom: 'Mur de clôture + portail',  icone: 'brick',     cout: 4200000,  unite: 'forfait 200 m² de parcelle', detail: 'Environ 21 000 FCFA le mètre linéaire, portail métallique compris.' },
  { id: 'forage',    nom: 'Forage ou puits + château d\'eau', icone: 'droplet', cout: 3800000, unite: 'forfait', detail: 'Indispensable là où le réseau SEN\'EAU est irrégulier.' },
  { id: 'solaire',   nom: 'Kit solaire + batteries',   icone: 'solar',     cout: 5500000,  unite: 'kit 5 kWc', detail: 'Couvre l\'éclairage, le froid et les prises. Réduit fortement la facture Senelec.' },
  { id: 'groupe',    nom: 'Groupe électrogène',        icone: 'zap',       cout: 2400000,  unite: '10 kVA', detail: 'Secours automatique en cas de coupure.' },
  { id: 'clim',      nom: 'Climatisation complète',    icone: 'wind',      cout: 2800000,  unite: '5 splits posés', detail: 'Split inverter, pose et gaines comprises.' },
  { id: 'cuisine',   nom: 'Cuisine équipée',           icone: 'home',      cout: 3500000,  unite: 'forfait', detail: 'Meubles, plan de travail, évier et électroménager encastré.' },
  { id: 'piscine',   nom: 'Piscine',                   icone: 'waves',     cout: 9500000,  unite: '8 × 4 m', detail: 'Bassin béton, filtration et margelles comprises.' },
  { id: 'fosse',     nom: 'Assainissement autonome',   icone: 'droplet',   cout: 1600000,  unite: 'fosse + puisard', detail: 'Obligatoire hors zone raccordée à l\'ONAS.' },
  { id: 'paysage',   nom: 'Aménagement extérieur',     icone: 'leaf',      cout: 2200000,  unite: 'forfait', detail: 'Allées pavées, gazon, plantations et arrosage.' },
  { id: 'ascenseur', nom: 'Ascenseur',                 icone: 'stairs',    cout: 18000000, unite: '4 niveaux', detail: 'Pertinent à partir du R+2, surtout pour du locatif haut de gamme.' }
];

/* -------------------------------------------------------------
   Répartition du budget par poste (somme = 100 %).
   ------------------------------------------------------------- */
BI.postes = [
  { id: 'etudes',   nom: 'Études, plans et permis',      part: 0.08, icone: 'pen-tool',  detail: 'Architecte, bureau d\'études structure, dossier de permis de construire.' },
  { id: 'gros',     nom: 'Fondations et gros œuvre',     part: 0.37, icone: 'brick',     detail: 'Terrassement, semelles, poteaux, poutres, maçonnerie.' },
  { id: 'dalle',    nom: 'Dalles et étanchéité',         part: 0.10, icone: 'layers',    detail: 'Planchers, dalle de toiture-terrasse, forme de pente et étanchéité.' },
  { id: 'second',   nom: 'Second œuvre',                 part: 0.20, icone: 'zap',       detail: 'Plomberie, électricité, menuiseries, cloisons.' },
  { id: 'finitions',nom: 'Finitions',                    part: 0.18, icone: 'sparkles',  detail: 'Carrelage, faïence, peinture, sanitaires, serrurerie.' },
  { id: 'aleas',    nom: 'Provision pour imprévus',      part: 0.07, icone: 'shield-check', detail: 'Variation du prix du ciment et du fer, adaptations en cours de chantier.' }
];

/* -------------------------------------------------------------
   Échéancier de paiement type.
   ------------------------------------------------------------- */
BI.echeancier = [
  { etape: 'Signature du contrat et lancement des études', part: 0.10 },
  { etape: 'Fondations et soubassement achevés',           part: 0.20 },
  { etape: 'Élévation et dalle de plancher',               part: 0.25 },
  { etape: 'Toiture-terrasse et second œuvre',             part: 0.25 },
  { etape: 'Finitions',                                    part: 0.15 },
  { etape: 'Réception et levée des réserves',              part: 0.05 }
];

/* -------------------------------------------------------------
   Catalogue des modèles
   ------------------------------------------------------------- */
BI.modeles = [
  {
    id: 'lompoul', nom: 'Lompoul', sousTitre: 'Le premier pas',
    type: 'plainpied', niveaux: 'Plain-pied', surface: 78, chambres: 2, sdb: 1,
    parcelle: 120, usage: 'familial', standing: 'economique',
    duree: 5,
    accroche: 'La maison qui permet d\'arrêter de payer un loyer, pensée pour grandir avec vous.',
    description: 'Lompoul est conçue pour un premier achat ou une parcelle modeste. La structure est calculée dès le départ pour recevoir un étage : vous construisez aujourd\'hui ce que votre budget permet, vous surélevez dans trois ou cinq ans sans rien casser. Le séjour ouvre sur une terrasse couverte qui sert de pièce à vivre une bonne partie de l\'année.',
    atouts: ['Structure prête pour une surélévation', 'Terrasse couverte de 14 m²', 'Une seule salle d\'eau, bien placée', 'Tient sur une parcelle de 120 m²'],
    pieces: ['Séjour-salle à manger 26 m²', 'Cuisine 9 m²', 'Chambre parentale 14 m²', 'Chambre 11 m²', 'Salle d\'eau 4 m²', 'Terrasse couverte 14 m²'],
    locatif: 0
  },
  {
    id: 'baobab', nom: 'Baobab', sousTitre: 'Plain-pied familial',
    type: 'plainpied', niveaux: 'Plain-pied', surface: 128, chambres: 3, sdb: 2,
    parcelle: 150, usage: 'familial', standing: 'standard',
    duree: 7,
    accroche: 'Trois chambres de plain-pied, sans escalier, avec une vraie cour à l\'arrière.',
    description: 'Le plain-pied reste le format préféré des familles sénégalaises, et Baobab en tire le meilleur. Les chambres sont regroupées d\'un côté, les pièces de vie de l\'autre, de sorte qu\'une sieste reste possible pendant qu\'on reçoit au salon. La cuisine donne directement sur la cour de service, là où se prépare le thiéboudiène du dimanche.',
    atouts: ['Aucune marche, confortable à tout âge', 'Cuisine ouverte sur la cour de service', 'Toit-terrasse accessible', 'Séjour traversant très ventilé'],
    pieces: ['Séjour 32 m²', 'Cuisine 12 m²', 'Chambre parentale avec salle d\'eau 18 m²', '2 chambres de 12 m²', 'Salle de bain 6 m²', 'Cour de service 12 m²'],
    locatif: 0
  },
  {
    id: 'goree', nom: 'Gorée', sousTitre: 'Maison de ville',
    type: 'r1', niveaux: 'R+1', surface: 132, chambres: 3, sdb: 2,
    parcelle: 100, usage: 'familial', standing: 'standard',
    duree: 8,
    accroche: 'Conçue pour les petites parcelles de Dakar où chaque mètre compte.',
    description: 'Sur 100 m² de terrain, Gorée développe 132 m² habitables en jouant la verticalité. Le rez-de-chaussée accueille la vie commune, l\'étage les chambres. Un patio étroit traverse les deux niveaux et apporte lumière et courant d\'air jusqu\'au cœur du plan, ce qui change tout en saison chaude.',
    atouts: ['Tient sur 100 m² de terrain', 'Patio traversant sur deux niveaux', 'Claustra en terre cuite en façade', 'Toit-terrasse aménageable'],
    pieces: ['Séjour 24 m²', 'Cuisine 10 m²', 'WC visiteurs', 'Chambre parentale 16 m²', '2 chambres de 11 m²', 'Salle de bain 5 m²', 'Patio 6 m²'],
    locatif: 0
  },
  {
    id: 'sine', nom: 'Sine', sousTitre: 'Duplex à cour intérieure',
    type: 'r1', niveaux: 'R+1', surface: 160, chambres: 3, sdb: 2,
    parcelle: 160, usage: 'familial', standing: 'standard',
    duree: 9,
    accroche: 'Une cour au centre de la maison, comme dans les concessions traditionnelles.',
    description: 'Sine reprend le principe de la concession : une cour intérieure autour de laquelle s\'organise toute la maison. Cette cour rafraîchit naturellement les pièces par tirage d\'air, éclaire les circulations et devient le vrai lieu de vie dès que le soleil baisse. Les chambres sont volontairement à l\'écart de la rue.',
    atouts: ['Cour intérieure rafraîchissante', 'Chambres isolées du bruit de la rue', 'Ventilation traversante sur toutes les pièces', 'Claustra et brise-soleil en façade'],
    pieces: ['Séjour 28 m²', 'Cuisine 11 m²', 'Cour intérieure 16 m²', 'Chambre parentale 17 m²', '2 chambres de 12 m²', '2 salles d\'eau'],
    locatif: 0
  },
  {
    id: 'lacrose', nom: 'Lac Rose', sousTitre: 'Plain-pied + studio',
    type: 'plainpied', niveaux: 'Plain-pied', surface: 168, chambres: 3, sdb: 3,
    parcelle: 200, usage: 'mixte', standing: 'standard',
    duree: 9,
    accroche: 'Votre maison d\'un côté, un studio indépendant de l\'autre qui paie une partie des traites.',
    description: 'Un plain-pied familial classique, doublé d\'un studio autonome avec son entrée, son compteur et sa salle d\'eau. Le studio se loue, sert de logement pour un parent âgé, ou accueille la famille venue de l\'étranger pendant les vacances. Beaucoup de propriétaires commencent par le louer, puis le récupèrent quand les enfants grandissent.',
    atouts: ['Studio autonome avec compteur séparé', 'Environ 150 000 FCFA de loyer par mois', 'Entrée indépendante côté rue', 'Peut devenir une chambre d\'ami plus tard'],
    pieces: ['Séjour 30 m²', 'Cuisine 12 m²', 'Chambre parentale avec salle d\'eau 19 m²', '2 chambres de 12 m²', 'Salle de bain 6 m²', 'Studio 32 m² avec kitchenette'],
    locatif: 150000
  },
  {
    id: 'casamance', nom: 'Casamance', sousTitre: 'Bioclimatique',
    type: 'r1', niveaux: 'R+1', surface: 175, chambres: 4, sdb: 3,
    parcelle: 200, usage: 'familial', standing: 'standard',
    duree: 10,
    accroche: 'Moins de climatisation, moins de facture Senelec, grâce au dessin plutôt qu\'aux machines.',
    description: 'Casamance est orientée pour capter l\'alizé maritime et protéger les façades ouest du soleil de fin de journée. Murs en brique de terre comprimée, isolation du toit en typha, larges débords et claustras : l\'intérieur reste habitable sans climatisation une grande partie de l\'année. La citerne enterrée récupère les eaux de l\'hivernage pour l\'arrosage.',
    atouts: ['Brique de terre comprimée produite sur place', 'Isolation de toiture en typha', 'Citerne de récupération des eaux de pluie', 'Jusqu\'à 40 % d\'économie sur la climatisation'],
    pieces: ['Séjour double hauteur 34 m²', 'Cuisine 12 m²', 'Bureau 10 m²', 'Chambre parentale 18 m²', '3 chambres de 12 m²', '3 salles d\'eau', 'Terrasse abritée 20 m²'],
    locatif: 0
  },
  {
    id: 'teranga', nom: 'Teranga', sousTitre: 'La maison qui reçoit',
    type: 'r1', niveaux: 'R+1', surface: 210, chambres: 4, sdb: 3,
    parcelle: 200, usage: 'familial', standing: 'standard',
    duree: 10,
    accroche: 'Un grand salon au rez-de-chaussée, les chambres à l\'abri en haut. Notre modèle le plus demandé.',
    description: 'Teranga sépare franchement les usages : en bas on reçoit, en haut on se repose. Le salon, la salle à manger et un salon secondaire pour les invités occupent tout le rez-de-chaussée, avec un WC visiteurs près de l\'entrée. À l\'étage, quatre chambres et la terrasse. Le garage couvert protège la voiture du soleil et de la poussière d\'harmattan.',
    atouts: ['Double salon, dont un réservé aux invités', 'Garage couvert pour deux voitures', 'Toit-terrasse de 40 m²', 'Chambre parentale avec dressing'],
    pieces: ['Séjour 38 m²', 'Salon d\'invités 18 m²', 'Cuisine 14 m²', 'WC visiteurs', 'Chambre parentale avec dressing 24 m²', '3 chambres de 13 m²', '3 salles d\'eau', 'Terrasse 40 m²'],
    locatif: 0
  },
  {
    id: 'niokolo', nom: 'Niokolo', sousTitre: 'Résidence secondaire',
    type: 'plainpied', niveaux: 'Plain-pied', surface: 155, chambres: 3, sdb: 3,
    parcelle: 300, usage: 'mixte', standing: 'confort',
    optionsIncluses: ['piscine'], duree: 8,
    accroche: 'Pour la Petite Côte : plain-pied ouvert sur la piscine, facile à louer en saison.',
    description: 'Pensée pour Saly, Ngaparou ou la Somone. Toutes les chambres donnent sur la terrasse et la piscine, chacune avec sa salle d\'eau, ce qui rend la maison très simple à louer en meublé quand vous n\'y êtes pas. Les matériaux ont été choisis pour résister à l\'air salin : menuiserie aluminium, quincaillerie inox, enduit hydrofuge.',
    atouts: ['Trois chambres, trois salles d\'eau', 'Piscine 8 × 4 m comprise', 'Matériaux résistants à l\'air marin', 'Très bon rendement en location saisonnière'],
    pieces: ['Séjour ouvert 36 m²', 'Cuisine américaine 12 m²', '3 chambres de 16 m² avec salle d\'eau', 'Terrasse couverte 28 m²', 'Piscine 8 × 4 m', 'Local technique'],
    locatif: 450000
  },
  {
    id: 'saloum', nom: 'Saloum', sousTitre: 'Habiter et louer',
    type: 'r1', niveaux: 'R+1', surface: 245, chambres: 4, sdb: 4,
    parcelle: 250, usage: 'mixte', standing: 'standard',
    duree: 11,
    accroche: 'Votre duplex à l\'étage, deux studios au rez-de-chaussée qui remboursent une partie du crédit.',
    description: 'Le montage préféré de la diaspora. Vous occupez le duplex de 145 m², et les deux studios du rez-de-chaussée, totalement indépendants avec leur entrée sur rue, génèrent un revenu dès la livraison. Compteurs Senelec et SEN\'EAU séparés, ce qui évite toute discussion avec les locataires.',
    atouts: ['Deux studios indépendants à louer', 'Environ 350 000 FCFA de loyer par mois', 'Compteurs séparés pour chaque logement', 'Entrées distinctes, aucune promiscuité'],
    pieces: ['Duplex : séjour 32 m², cuisine 12 m², 4 chambres, 2 salles de bain', '2 studios de 42 m² avec kitchenette et salle d\'eau', 'Garage', 'Terrasse 30 m²'],
    locatif: 350000
  },
  {
    id: 'ngor', nom: 'Ngor', sousTitre: 'Contemporaine',
    type: 'r1', niveaux: 'R+1', surface: 225, chambres: 4, sdb: 4,
    parcelle: 250, usage: 'familial', standing: 'confort',
    duree: 12,
    accroche: 'Lignes nettes, grandes baies et toit-terrasse aménagé pour les soirées.',
    description: 'Ngor assume une écriture contemporaine : volumes francs, grandes ouvertures protégées par des débords profonds, béton laissé apparent par endroits. Le toit-terrasse est traité comme une vraie pièce, avec pergola, point d\'eau et éclairage. Chaque chambre dispose de sa salle d\'eau.',
    atouts: ['Toit-terrasse aménagé avec pergola', 'Une salle d\'eau par chambre', 'Grandes baies coulissantes protégées du soleil', 'Cuisine ouverte avec îlot'],
    pieces: ['Séjour 42 m²', 'Cuisine avec îlot 16 m²', 'Bureau 12 m²', 'Suite parentale 28 m²', '3 chambres avec salle d\'eau', 'Garage double', 'Toit-terrasse 45 m²'],
    locatif: 0
  },
  {
    id: 'djoloff', nom: 'Djoloff', sousTitre: 'Immeuble de rapport',
    type: 'immeuble', niveaux: 'R+2', surface: 480, chambres: 0, sdb: 0,
    parcelle: 300, usage: 'locatif', standing: 'standard',
    duree: 16,
    accroche: 'Six appartements F3 : un placement immobilier plutôt qu\'une résidence.',
    description: 'Djoloff est un produit d\'investissement. Six appartements F3 de 75 m², deux par niveau, tous traversants et tous dotés d\'un balcon. Les circulations sont réduites au strict nécessaire pour maximiser la surface louable. Chaque logement a ses compteurs, et le local technique regroupe la bâche à eau, le surpresseur et le tableau général.',
    atouts: ['6 appartements F3 de 75 m²', 'Environ 1 200 000 FCFA de loyers par mois', 'Compteurs individualisés', 'Rentabilité brute estimée autour de 10 % par an'],
    pieces: ['6 × F3 : séjour 22 m², cuisine 9 m², 2 chambres, salle de bain, balcon', 'Hall d\'entrée', 'Local technique', 'Parking sur cour'],
    locatif: 1200000
  },
  {
    id: 'almadies', nom: 'Almadies', sousTitre: 'Haut standing',
    type: 'r2', niveaux: 'R+2', surface: 340, chambres: 5, sdb: 5,
    parcelle: 300, usage: 'familial', standing: 'premium',
    optionsIncluses: ['piscine'], duree: 15,
    accroche: 'Trois niveaux, cinq suites, piscine et rooftop. Notre programme le plus abouti.',
    description: 'Almadies s\'adresse à ceux qui veulent une maison sans compromis. Réception en double hauteur, cinq suites avec salle de bain et dressing, ascenseur possible, piscine à débordement et rooftop avec cuisine d\'été. La conception thermique est sérieuse : double vitrage, isolation de toiture et orientation étudiée, parce qu\'une grande maison mal pensée devient une facture d\'électricité ingérable.',
    atouts: ['Cinq suites avec dressing', 'Piscine à débordement', 'Rooftop avec cuisine d\'été', 'Ascenseur en option', 'Étude thermique poussée'],
    pieces: ['Réception double hauteur 55 m²', 'Salle à manger 24 m²', 'Cuisine + arrière-cuisine 26 m²', 'Bureau 16 m²', 'Suite parentale 42 m²', '4 suites de 24 m²', 'Piscine à débordement', 'Rooftop 60 m²', 'Garage 3 voitures'],
    locatif: 0
  }
];

/* -------------------------------------------------------------
   Services
   ------------------------------------------------------------- */
BI.services = [
  {
    id: 'cle-en-main', icone: 'key', couleur: 'accent',
    titre: 'Construction clé en main',
    resume: 'Un seul interlocuteur, un seul contrat, un prix ferme.',
    detail: 'Nous portons l\'ensemble du projet : études, permis, achats, entreprises, réception. Vous signez un marché à prix ferme avec un calendrier contractuel et des pénalités de retard. Pas de coordination à gérer entre dix corps de métier.',
    points: ['Prix ferme contractualisé', 'Calendrier avec pénalités de retard', 'Garantie décennale des entreprises', 'Réception assistée et levée des réserves']
  },
  {
    id: 'foncier', icone: 'scale', couleur: 'brick',
    titre: 'Vérification du terrain',
    resume: 'Avant d\'acheter, savoir exactement ce que vous achetez.',
    detail: 'Le litige foncier reste la première cause de chantier arrêté au Sénégal. Nous vérifions le statut du terrain auprès des services compétents, contrôlons la chaîne de propriété, relevons les limites avec un géomètre agréé et vous remettons un avis écrit avant que vous ne versiez le moindre franc.',
    points: ['Recherche au Livre foncier', 'Contrôle de la chaîne de propriété', 'Bornage par un géomètre agréé', 'Avis écrit avant versement']
  },
  {
    id: 'plans', icone: 'pen-tool', couleur: 'gold',
    titre: 'Architecture et plans',
    resume: 'Un modèle du catalogue adapté, ou un projet entièrement sur mesure.',
    detail: 'Nos architectes partent soit d\'un modèle du catalogue qu\'ils ajustent à votre parcelle et à votre famille, soit d\'une page blanche. Dans les deux cas vous recevez les plans, les façades, les coupes, une vue 3D et le dossier complet de permis de construire.',
    points: ['Plans, façades, coupes et 3D', 'Adaptation à la forme réelle de la parcelle', 'Étude structure par un ingénieur', 'Dossier de permis déposé par nos soins']
  },
  {
    id: 'suivi', icone: 'camera', couleur: 'leaf',
    titre: 'Suivi de chantier en ligne',
    resume: 'Voir votre chantier avancer, où que vous soyez dans le monde.',
    detail: 'Chaque client dispose d\'un espace en ligne : photos datées chaque semaine, avancement par phase en pourcentage, rapport du conducteur de travaux, dépenses engagées et visite en visioconférence sur rendez-vous. C\'est ce que réclame la diaspora, et à juste titre.',
    points: ['Photos horodatées chaque semaine', 'Avancement détaillé par phase', 'Dépenses engagées en temps réel', 'Visite du chantier en visioconférence']
  },
  {
    id: 'financement', icone: 'bank', couleur: 'accent',
    titre: 'Montage du financement',
    resume: 'Constituer un dossier qu\'une banque accepte vraiment.',
    detail: 'Nous préparons le dossier bancaire avec vous : devis détaillé, plans, titre du terrain, plan de trésorerie. Nous travaillons avec les banques de la place habituées au crédit habitat et aux dossiers de non-résidents, et nous pouvons échelonner les appels de fonds sur votre capacité d\'épargne.',
    points: ['Dossier de crédit habitat complet', 'Dossiers non-résidents', 'Paiement échelonné par phase', 'Plan d\'épargne construction']
  },
  {
    id: 'renovation', icone: 'refresh', couleur: 'gold',
    titre: 'Rénovation et surélévation',
    resume: 'Donner un deuxième souffle à un bien existant.',
    detail: 'Rénovation lourde, mise aux normes électriques, reprise d\'étanchéité de toiture-terrasse, ajout d\'un niveau. Une étude de structure préalable détermine ce que le bâti existant peut réellement supporter, avant toute promesse.',
    points: ['Diagnostic de structure préalable', 'Reprise d\'étanchéité de terrasse', 'Mise aux normes électriques', 'Surélévation d\'un ou deux niveaux']
  }
];

/* -------------------------------------------------------------
   Étapes du parcours client
   ------------------------------------------------------------- */
BI.parcours = [
  { titre: 'Premier échange', texte: 'Un appel ou un message WhatsApp de trente minutes pour cerner le besoin, le budget et le terrain. Gratuit et sans engagement.' },
  { titre: 'Faisabilité et devis', texte: 'Nous vérifions le terrain, dessinons une esquisse et remettons un devis détaillé poste par poste sous dix jours ouvrés.' },
  { titre: 'Plans et permis', texte: 'Plans définitifs, étude de structure et dépôt du dossier de permis de construire auprès de la commune.' },
  { titre: 'Chantier suivi', texte: 'Ouverture du chantier et de votre espace en ligne. Photos et rapport chaque semaine, paiement par phase validée.' },
  { titre: 'Remise des clés', texte: 'Réception contradictoire, levée des réserves, dossier des ouvrages exécutés et garanties remis en main propre.' }
];

/* -------------------------------------------------------------
   Guide pratique
   ------------------------------------------------------------- */
BI.guide = [
  {
    id: 'statuts-terrain', categorie: 'Foncier', icone: 'scale', minutes: 7,
    titre: 'Titre foncier, bail, délibération : ce que vous achetez vraiment',
    resume: 'Trois terrains voisins peuvent avoir trois statuts juridiques différents, et seul l\'un des trois vous rend réellement propriétaire.',
    contenu: [
      ['Le titre foncier', 'C\'est le seul document qui établit une propriété définitive et inattaquable. Il est inscrit au Livre foncier et porte un numéro. Si le vendeur ne peut pas vous montrer ce numéro, vous n\'achetez pas un titre foncier, quoi qu\'il vous dise.'],
      ['Le bail emphytéotique', 'L\'État reste propriétaire du sol et vous concède un droit d\'usage de longue durée, souvent cinquante ans renouvelables. C\'est courant sur les terrains d\'État et les zones aménagées. Le bail peut être transformé en titre foncier, mais la procédure prend du temps et coûte de l\'argent : intégrez-la à votre budget.'],
      ['La délibération', 'Une délibération du conseil municipal affecte un terrain du domaine national à une personne. Ce n\'est pas un titre de propriété. Beaucoup de terrains de banlieue ne sont couverts que par ce document. On peut y construire, mais la sécurité juridique reste inférieure et la revente plus difficile.'],
      ['Avant de verser un franc', 'Demandez le numéro du titre, faites une recherche au Livre foncier, vérifiez que le vendeur est bien celui qui est inscrit, faites borner le terrain par un géomètre agréé et vérifiez qu\'aucune hypothèque n\'est inscrite. Le versement d\'un acompte avant ces vérifications est la première source de litiges que nous rencontrons.']
    ]
  },
  {
    id: 'cout-2026', categorie: 'Budget', icone: 'calculator', minutes: 6,
    titre: 'Combien coûte réellement une maison au Sénégal',
    resume: 'Le prix au mètre carré ne dit pas tout. Voici les postes que les gens oublient systématiquement.',
    contenu: [
      ['L\'ordre de grandeur', 'Pour du bâti neuf hors terrain, comptez 165 000 à 215 000 FCFA le m² en finition économique, 235 000 à 305 000 en standard, et au-delà de 325 000 en haut de gamme. Une villa R+1 de 200 m² en finition standard se situe donc entre 50 et 65 millions.'],
      ['Ce qui n\'est presque jamais chiffré', 'Le mur de clôture et le portail, à eux seuls, représentent souvent 4 à 6 millions. L\'assainissement autonome, le raccordement Senelec et SEN\'EAU, le forage là où le réseau est faible, l\'aménagement extérieur : additionnés, ces postes dépassent régulièrement dix millions.'],
      ['Les honoraires', 'Architecte, bureau d\'études et permis de construire représentent environ 8 % du coût des travaux. C\'est le poste qu\'on cherche à économiser et c\'est presque toujours une erreur : une étude de structure sérieuse coûte moins cher qu\'une reprise de fondation.'],
      ['La provision pour imprévus', 'Prévoyez 7 à 10 % du budget. Le prix du ciment et du fer bouge, un sol peut se révéler moins portant que prévu, et vous changerez d\'avis sur au moins une chose en cours de chantier. Un budget sans provision est un chantier qui s\'arrête.']
    ]
  },
  {
    id: 'diaspora', categorie: 'Diaspora', icone: 'plane', minutes: 8,
    titre: 'Construire depuis l\'étranger sans mauvaise surprise',
    resume: 'Ce qui fait échouer un chantier piloté à distance, et comment s\'en prémunir.',
    contenu: [
      ['Le problème n\'est pas la distance', 'C\'est l\'absence de traçabilité. Les projets qui dérapent sont ceux où l\'argent part par petites tranches, sans devis global, sans calendrier, et où l\'information repose sur les photos d\'un proche de bonne volonté mais sans compétence technique.'],
      ['Contractualiser avant de transférer', 'Exigez un devis détaillé poste par poste, un calendrier daté, un échéancier adossé à des phases vérifiables et non à des dates, et des pénalités de retard écrites. Payer à l\'avancement constaté, jamais au calendrier seul.'],
      ['La procuration', 'Une procuration notariée permet à un mandataire de signer en votre nom. Rédigez-la précisément : elle doit autoriser des actes nommés, pas donner un pouvoir général. Elle se fait au consulat du Sénégal de votre pays de résidence.'],
      ['Les transferts', 'Pour les gros montants, le virement bancaire reste le plus traçable et le moins cher en frais rapportés à la somme. Wave et Orange Money conviennent aux petits montants et aux imprévus. Gardez toutes les preuves de transfert : elles seront demandées si vous revendez ou si un litige survient.'],
      ['Le contrôle à distance', 'Photos horodatées chaque semaine, rapport écrit du conducteur de travaux, et une visite en visioconférence par mois. Si votre constructeur ne peut pas fournir cela en 2026, c\'est un signal.']
    ]
  },
  {
    id: 'hivernage', categorie: 'Chantier', icone: 'wind', minutes: 5,
    titre: 'Caler son chantier sur la saison des pluies',
    resume: 'De juillet à octobre, certains travaux avancent, d\'autres s\'arrêtent. Le calendrier se prépare en amont.',
    contenu: [
      ['Ce que l\'hivernage empêche', 'Le terrassement dans un sol gorgé d\'eau, les fouilles de fondation qui s\'effondrent, les enduits extérieurs qui ne prennent pas, l\'étanchéité de terrasse et toute peinture extérieure. Un chantier qui démarre ses fondations en août perd des semaines.'],
      ['Ce qui avance très bien', 'Tout ce qui se fait sous dalle : cloisons, électricité, plomberie, carrelage, menuiseries intérieures, peinture intérieure. Si le hors d\'eau est atteint avant juillet, l\'hivernage devient presque indolore.'],
      ['Le calendrier idéal', 'Démarrer les fondations entre novembre et février, atteindre la dalle de toiture et l\'étanchéité avant fin juin, consacrer l\'hivernage au second œuvre intérieur, et finir les extérieurs entre novembre et décembre.'],
      ['Protéger le chantier', 'Prévoir le drainage provisoire autour des fouilles, stocker le ciment surélevé et bâché, protéger le fer du contact direct avec le sol. Un sac de ciment pris par l\'humidité est perdu.']
    ]
  },
  {
    id: 'permis', categorie: 'Démarches', icone: 'file-check', minutes: 6,
    titre: 'Le permis de construire, étape par étape',
    resume: 'Construire sans permis expose à la démolition et bloque toute revente. La procédure est balisée.',
    contenu: [
      ['Qui dépose', 'Le dossier est déposé à la commune du lieu du terrain. Il doit être établi par un architecte inscrit à l\'Ordre dès lors que la surface dépasse le seuil réglementaire, ce qui est le cas de la quasi-totalité des villas.'],
      ['Ce que contient le dossier', 'Demande signée, titre de propriété ou bail, plan de situation, plan de masse, plans de tous les niveaux, façades et coupes, note descriptive, et étude de structure pour les bâtiments à étages.'],
      ['Les délais', 'Comptez en pratique de un à trois mois selon la commune et la complétude du dossier. Les allers-retours proviennent presque toujours de pièces manquantes : un dossier complet du premier coup fait gagner des semaines.'],
      ['Après l\'obtention', 'Le panneau de chantier doit être affiché sur le terrain, visible depuis la voie publique, pendant toute la durée des travaux. À la fin, demandez le certificat de conformité : il vous sera réclamé à la revente ou pour un raccordement définitif.']
    ]
  },
  {
    id: 'materiaux-locaux', categorie: 'Matériaux', icone: 'leaf', minutes: 6,
    titre: 'Matériaux locaux : ce qui marche vraiment',
    resume: 'Brique de terre comprimée, typha, latérite : au-delà de l\'argument écologique, ce que ça change au quotidien.',
    contenu: [
      ['La brique de terre comprimée', 'Fabriquée sur le chantier à partir de la terre du site stabilisée au ciment. Elle coûte généralement moins cher que l\'agglo à qualité égale et, surtout, son inertie thermique maintient l\'intérieur nettement plus frais. Elle exige en revanche une main-d\'œuvre formée et un débord de toiture suffisant.'],
      ['Le typha', 'Cette plante envahissante du fleuve Sénégal, transformée en panneaux, isole très bien les toitures-terrasses. Sous une dalle exposée au soleil, l\'écart de température intérieure est immédiatement sensible et se traduit directement sur la facture de climatisation.'],
      ['La latérite', 'Abondante et bon marché, elle sert pour les remblais, les plateformes et les allées. En bloc, elle offre un rendu très caractéristique en façade, avec une teinte rouge qui ne demande aucun enduit.'],
      ['À quoi faire attention', 'Ces matériaux exigent un savoir-faire réel. Mal mise en œuvre, une brique de terre se dégrade en deux hivernages. Demandez à voir des chantiers achevés depuis au moins cinq ans avant de vous décider.']
    ]
  },
  {
    id: 'financement', categorie: 'Budget', icone: 'bank', minutes: 7,
    titre: 'Financer sa construction : les solutions réelles',
    resume: 'Crédit habitat, épargne programmée, tontine, revenu locatif intégré : ce qui existe et pour qui.',
    contenu: [
      ['Le crédit habitat', 'Les banques de la place financent la construction sur terrain déjà possédé, généralement à hauteur de 70 à 80 % du devis, sur sept à quinze ans. Elles exigent un titre sécurisé, un devis d\'entreprise et débloquent les fonds par tranches contre constat d\'avancement.'],
      ['Les dossiers de la diaspora', 'Plusieurs établissements proposent des crédits dédiés aux Sénégalais de l\'extérieur, avec des justificatifs de revenus étrangers. Le taux est souvent plus favorable que dans le pays de résidence, mais l\'instruction est plus longue : comptez deux à quatre mois.'],
      ['L\'épargne programmée', 'Beaucoup de projets se financent sans crédit, par phases. On construit les fondations, on s\'arrête, on épargne, on reprend. Ce n\'est pas moins sérieux, à condition de protéger le bâti pendant les interruptions et d\'avoir un plan d\'ensemble dès le départ.'],
      ['Le locatif intégré', 'Prévoir un studio ou deux dans le programme change l\'équation. Sur un modèle comme Saloum, 350 000 FCFA de loyer mensuel couvrent une part importante de la mensualité d\'un crédit. L\'investissement supplémentaire à la construction se rentabilise en quelques années.']
    ]
  }
];

/* -------------------------------------------------------------
   Questions fréquentes
   ------------------------------------------------------------- */
BI.faq = [
  { q: 'Puis-je construire si je n\'ai pas encore de terrain ?',
    r: 'Oui. Nous vous aidons à définir la zone et le budget terrain cohérents avec votre projet, puis nous vérifions le statut juridique de la parcelle que vous aurez repérée avant que vous ne versiez le moindre acompte.' },
  { q: 'Travaillez-vous avec les Sénégalais de l\'étranger ?',
    r: 'C\'est une grande partie de notre activité. Tout se pilote à distance : signature électronique, procuration notariée établie au consulat, espace de suivi en ligne avec photos hebdomadaires, et visite du chantier en visioconférence sur rendez-vous.' },
  { q: 'Le prix annoncé peut-il augmenter en cours de chantier ?',
    r: 'Le marché est signé à prix ferme. Il ne bouge que si vous demandez une modification, et dans ce cas un avenant chiffré est signé avant toute exécution. Aucun travail supplémentaire n\'est engagé sans votre accord écrit.' },
  { q: 'Combien de temps dure une construction ?',
    r: 'Environ six à huit mois pour un plain-pied, neuf à douze mois pour un R+1, douze à dix-huit mois pour un R+2 ou un immeuble. Le permis de construire s\'ajoute en amont, comptez un à trois mois.' },
  { q: 'Puis-je faire modifier un modèle du catalogue ?',
    r: 'Oui, et c\'est même le cas le plus fréquent. Les modèles sont des points de départ : on ajuste le nombre de chambres, l\'orientation, la façade et l\'implantation à la forme réelle de votre parcelle.' },
  { q: 'Comment se déroulent les paiements ?',
    r: 'Par phases validées, jamais à l\'avance. Dix pour cent au lancement, puis des tranches libérées après constat d\'avancement, et cinq pour cent seulement à la réception et à la levée des réserves.' },
  { q: 'Quelles garanties sont fournies ?',
    r: 'La garantie de parfait achèvement pendant un an, la garantie biennale sur les équipements et la garantie décennale sur la structure. Les attestations des entreprises vous sont remises avec le dossier des ouvrages exécutés.' },
  { q: 'Intervenez-vous partout au Sénégal ?',
    r: 'Oui, de Saint-Louis à Ziguinchor. Le coût de construction varie selon l\'éloignement, en raison du transport des matériaux et de l\'hébergement des équipes : le simulateur en tient compte automatiquement.' }
];

/* -------------------------------------------------------------
   Avis clients
   ------------------------------------------------------------- */
BI.avis = [
  { texte: 'Je vis à Milan depuis onze ans. Recevoir les photos tous les vendredis et voir la dalle monter semaine après semaine, ça n\'a pas de prix. J\'ai récupéré les clés en arrivant pour les vacances.',
    nom: 'Mamadou Bâ', lieu: 'Villa Saloum — Keur Massar', note: 5 },
  { texte: 'On a fait vérifier le terrain avant d\'acheter. Résultat : le vendeur n\'était pas le propriétaire inscrit. Ils nous ont évité de perdre dix-huit millions.',
    nom: 'Aïssatou Ndiaye', lieu: 'Vérification foncière — Sangalkam', note: 5 },
  { texte: 'Budget tenu au franc près, deux semaines de retard sur onze mois de chantier. Les avenants ont tous été signés avant travaux, sans discussion.',
    nom: 'Cheikh Sow', lieu: 'Villa Teranga — Diamniadio', note: 5 },
  { texte: 'La maison bioclimatique, j\'étais sceptique. On n\'allume la clim que quelques nuits en octobre. La facture Senelec a été divisée par trois par rapport à mon ancien appartement.',
    nom: 'Fatou Diagne', lieu: 'Villa Casamance — Thiès', note: 5 },
  { texte: 'L\'immeuble est loué intégralement depuis le deuxième mois. Le montage avec compteurs séparés évite tous les problèmes que j\'avais anticipés.',
    nom: 'Ousmane Fall', lieu: 'Immeuble Djoloff — Rufisque', note: 4 }
];

/* -------------------------------------------------------------
   Démonstration du suivi de chantier
   ------------------------------------------------------------- */
BI.chantiers = {
  'BI-2026-014': {
    code: 'BI-2026-014', client: 'Famille Bâ', modele: 'Villa Saloum',
    lieu: 'Keur Massar, Dakar', surface: 245,
    debut: '2026-01-12', livraisonPrevue: '2026-12-08',
    budget: 68500000, engage: 41100000, avancement: 62,
    conducteur: 'Ibrahima Sarr', meteo: 'Hors hivernage — chantier au rythme normal',
    phases: [
      { nom: 'Études et permis de construire', etat: 'fait', pct: 100, date: '2026-02-28', note: 'Permis obtenu par la commune de Keur Massar.' },
      { nom: 'Terrassement et fondations', etat: 'fait', pct: 100, date: '2026-04-15', note: 'Semelles isolées coulées, béton contrôlé à 25 MPa.' },
      { nom: 'Élévation du rez-de-chaussée', etat: 'fait', pct: 100, date: '2026-06-20', note: 'Maçonnerie terminée, linteaux et chaînages en place.' },
      { nom: 'Dalle de plancher haut', etat: 'fait', pct: 100, date: '2026-07-30', note: 'Dalle coulée avant l\'hivernage, comme prévu au calendrier.' },
      { nom: 'Élévation de l\'étage', etat: 'encours', pct: 55, date: '2026-10-10', note: 'Trois murs sur quatre montés. Livraison de fer attendue lundi.' },
      { nom: 'Toiture-terrasse et étanchéité', etat: 'attente', pct: 0, date: '2026-11-05', note: '' },
      { nom: 'Second œuvre', etat: 'attente', pct: 0, date: '2026-11-25', note: '' },
      { nom: 'Finitions et réception', etat: 'attente', pct: 0, date: '2026-12-08', note: '' }
    ],
    photos: [
      { legende: 'Élévation étage — mur nord', date: '18 sept. 2026' },
      { legende: 'Ferraillage des poteaux', date: '15 sept. 2026' },
      { legende: 'Dalle terminée, vue d\'ensemble', date: '02 août 2026' },
      { legende: 'Coulage de la dalle', date: '29 juil. 2026' }
    ],
    rapports: [
      { date: '19 sept. 2026', texte: 'Douze ouvriers sur site cette semaine. Élévation de l\'étage à 55 %. Une livraison de fer à béton est décalée à lundi par le fournisseur, sans incidence sur le calendrier général. Compteur de chantier Senelec posé mercredi.' },
      { date: '12 sept. 2026', texte: 'Démarrage de l\'élévation de l\'étage. Contrôle de l\'implantation des réservations de plomberie effectué avec le bureau d\'études, deux ajustements mineurs validés avec le client.' }
    ]
  },
  'BI-2026-031': {
    code: 'BI-2026-031', client: 'M. Diagne', modele: 'Villa Casamance',
    lieu: 'Thiès', surface: 175,
    debut: '2026-05-04', livraisonPrevue: '2027-03-15',
    budget: 51200000, engage: 14300000, avancement: 28,
    conducteur: 'Awa Camara', meteo: 'Hivernage terminé — reprise des travaux extérieurs',
    phases: [
      { nom: 'Études et permis de construire', etat: 'fait', pct: 100, date: '2026-06-30', note: 'Permis obtenu. Étude thermique jointe au dossier.' },
      { nom: 'Production des briques de terre comprimée', etat: 'fait', pct: 100, date: '2026-07-22', note: '9 400 briques produites sur site, séchage terminé.' },
      { nom: 'Terrassement et fondations', etat: 'encours', pct: 70, date: '2026-10-18', note: 'Fouilles rouvertes après l\'hivernage, coulage en cours.' },
      { nom: 'Élévation du rez-de-chaussée', etat: 'attente', pct: 0, date: '2026-12-05', note: '' },
      { nom: 'Dalle et élévation de l\'étage', etat: 'attente', pct: 0, date: '2027-01-20', note: '' },
      { nom: 'Toiture, isolation typha et étanchéité', etat: 'attente', pct: 0, date: '2027-02-10', note: '' },
      { nom: 'Second œuvre et finitions', etat: 'attente', pct: 0, date: '2027-03-15', note: '' }
    ],
    photos: [
      { legende: 'Fouilles de fondation rouvertes', date: '17 sept. 2026' },
      { legende: 'Stock de briques sous bâche', date: '05 sept. 2026' },
      { legende: 'Presse à briques en production', date: '14 juil. 2026' },
      { legende: 'Implantation sur le terrain', date: '28 juin 2026' }
    ],
    rapports: [
      { date: '19 sept. 2026', texte: 'Reprise effective après l\'hivernage. Les fouilles ont été curées et le drainage provisoire a bien tenu, aucun effondrement de talus. Coulage des semelles prévu la semaine prochaine.' },
      { date: '05 sept. 2026', texte: 'Chantier à l\'arrêt sur les extérieurs, conformément au calendrier. Contrôle du stock de briques : aucune dégradation, bâchage efficace.' }
    ]
  }
};

/* -------------------------------------------------------------
   Chiffres mis en avant
   ------------------------------------------------------------- */
BI.chiffres = [
  { valeur: '180+', libelle: 'maisons livrées' },
  { valeur: '14', libelle: 'régions couvertes' },
  { valeur: '62 %', libelle: 'de clients de la diaspora' },
  { valeur: '9,4/10', libelle: 'satisfaction à la réception' }
];
