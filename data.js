/* =========================================================
   data.js — TOUT LE CONTENU PERSONNALISABLE DU SITE
   Modifie uniquement ce fichier pour remplacer les placeholders.
   ========================================================= */

const SITE_DATA = {

  /* Code secret de la page "Le Secret" — un mot ou une date entre vous */
  secretCode: "15082003",

  /* Passe à true après son anniversaire, une fois les photos ajoutées */
  chapter6Enabled: false,

  /* Heure de vos retrouvailles (24h) — pour le compte à rebours */
  meetingTime: { hour: 17, minute: 0 },

  /* ---------------------------------------------------------
     QUESTIONS DE PASSAGE
     Une question simple sur vous deux, tirée au sort à chaque
     fois qu'il veut avancer à la page suivante.
     "correct" = index de la bonne réponse dans "options".
  --------------------------------------------------------- */
  gateQuestions: [
    {
      question: "Qu'est-ce qu'on fuyait lors de notre permiere rencontre?",
      options: ["Une soutenance", "Un examen", "Pericles"],
      correct: 0
    },
    {
      question: "Qu'est-ce qu'on avait mange lors de notre premiere sortie ?",
      options: ["Pica pollo", "Mais", "Pizza"],
      correct: 1
    },
    {
      question: "Quand quelle position t'avais joui la premiere fois avec moi ?",
      options: ["Sur une chaise, moi te chevauchant", "En levrette", "Sous la douche"],
      correct: 0
    }
  ],

  /* ---------------------------------------------------------
     PAGE "TOI" — le portrait de qui il est.
     Chaque carte : un mot ou trait de lui, et pourquoi il compte.
     "index" s'affiche tel quel (01, 02, ...)
  --------------------------------------------------------- */
  loveReasons: [
    { index: "01", title: "Ton cœur", description: "Tu m'avais tant dit dans le passé de m'éloigner de toi, mais je ne l'ai pas fait. Je me suis attachée à toi parce que je t'aimais, oui, mais surtout parce que j'ai découvert un cœur pur, un cœur qui a énormément souffert et qui, malgré tout, a continué à aimer." },
    { index: "02", title: "Ton ambition", description: "Tu y arriveras, chéri. Un jour, tu auras le monde à tes pieds. Tu réussiras, j'en suis certaine, parce que je sais de quoi tu es capable. Et tu montreras à tous ceux qui ont douté de toi jusqu'où tu peux aller. Ne laisse personne te faire croire le contraire. ❤️‍🔥" },
    { index: "03", title: "Ta force tranquille", description: "On devrait peut-être se méfier un peu de toi… t'es un vrai danger. 😂 Mais c'est justement cette force tranquille, ce côté imprévisible et cette façon que tu as de ne pas avoir besoin d'en faire trop qui m'attirent autant chez toi. Mi amorrr, t'es quelque chose toi… 😭❤️" },
    { index: "04", title: "Ton sourire", description: "Monsieur, t'as un putain de sourire. Ce sourire peut littéralement faire fondre des cœurs… et tu sais très bien ce qu'il provoque chez moi. 😭🔥 Sorry d'être une obsédée de son mec, mais franchement… tu ne m'aides absolument pas" },
    { index: "05", title: "La personne que tu deviens", description: "T'as énormément évolué dernièrement, et je suis fière de la personne que tu deviens. Mais j'aimerais tellement que, dans ton évolution, tu arrêtes de te sous-estimer. T'es tellement mieux que ce que tu penses. Si seulement tu pouvais te voir à travers mes yeux, tu comprendrais enfin pourquoi je crois autant en toi" },
    { index: "06", title: "Beau Gosse", description: "T'es tellement beau, t'as même pas idée. Bon… si parfois je pouvais te garder uniquement pour moi, je le ferais. 😭 Mais bonnn, apparemment je dois partager. Et franchement, c'est pas toujours facile d'avoir un mec aussi beau. 😌❤️" },
    { index: "07", title: "TITRE DU MEILLEUR BAISEUR", description: "Bon… là, normalement, je devrais rester élégante. Mais soyons honnêtes : IL N'Y A RIEN À DIRE. 😭🔥 Tu sais exactement ce que tu fais, tu me rends complètement folle et tu connais beaucoup trop bien ton travail. Voilà. Je vais m'arrêter là avant de compromettre la réputation de ce site. 😂❤️" }
  ],

  /* ---------------------------------------------------------
     PAGE "SOUVENIRS" — galerie photo.
     Légendes centrées sur lui : ce qu'il faisait, ce qu'il était
     ce jour-là, plutôt que juste "nous deux".
  --------------------------------------------------------- */
  memories: [
    { src: "17.jpeg", caption: "Un apres-midi tranquille ensemble" },
    { src: "4.jpeg", caption: "Notre plus belle photo ensemble" },
    { src: "5.jpeg", caption: "Le jour ou s'est embrasse pour la premiere fois et que j'avais fait toute une scene apres." },
    { src: "3.jpeg", caption: "Nous sommes trop mignons ensemble." },
    { src: "11.jpeg", caption: "Ce jour la ou tu m'as empeche de broyer du noir, je te remercierai jamais assez." },
    { src: "13.jpeg", caption: "Ton premier match de la FSRL" },
    { src: "9.jpeg",caption:"J'etais malade a cette periode."},
    { src: "16.jpeg" , caption:"Notre premiere journee de mer ensemble"},
    { src: "15.jpeg" , caption:"Quand on avait enfin nos nouvelles paires de lunettes."},
    { src: "14.jpeg", caption:"Un samedi shooting"},
    { src: "1.jpeg",caption:"archhhh"},
    { src: "12.jpeg", caption:"La fois que j'avais mis une robe mais t'etais pas la mais j'avais remis cette robe specialement pour toi."},
    { src: "2.jpeg", caption:"ON EST TROP CLASS"},
    { src: "6.jpeg", caption:"Je suis addict a ton odeur."},
    /* ... ajoute-en autant que tu veux ... */
  ],

  /* ---------------------------------------------------------
     LA LETTRE — le cœur du site, entièrement pour lui.
     Sépare les paragraphes par une ligne vide.
  --------------------------------------------------------- */
  letter: `
Tu es ma personne préférée`,

  /* ---------------------------------------------------------
     BONUS — photos ajoutées après la soirée d'anniversaire
  --------------------------------------------------------- */
  bonusMemories: [
    { src: "bonus-01.jpg", caption: "LÉGENDE À AJOUTER APRÈS LA SOIRÉE" }
  ]

};
