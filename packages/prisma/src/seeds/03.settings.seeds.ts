import { PrismaClient, VAR_KEY_TYPE, VAR_KEY } from "../index";

export async function settingsSeed(prisma: PrismaClient) {
  const shippingCostsArray = [
    [3000, 500, 0],
    [5000, 500, 250],
    [20000, 500, 400],
    [30000, 500, 500],
    [40000, 500, 600],
    [50000, 500, 700],
    [60000, 500, 800],
    [70000, 500, 900],
    [80000, 500, 1000],
    [90000, 500, 1100],
    [100000, 500, 1200],
  ];

  await prisma.shippingCost.createMany({
    data: shippingCostsArray.map((sc) => ({
      max: sc[0],
      weightCost: sc[1],
      insuranceCost: sc[2],
    })),
  });

  // App Variables
  await prisma.adminVariable.create({
    data: {
      id: VAR_KEY.CGV,
      type: VAR_KEY_TYPE.HTML,
      title: "Conditions générales de vente",
      slug: "conditions-generales-de-vente",
      value:
        '<p>Ceci sont les conditions générales de ventes !</p><p></p><p>Les <strong>articles</strong> se placent toujours avant un <a target="_blank" rel="noopener noreferrer nofollow" href="https://www.francaisavecpierre.com/mots-francais-plus-utilises/">nom</a>.</p><ul><li><p>En français, les <strong>noms </strong>sont presque toujours précédés d’un <strong>déterminant</strong>, qui indique le <strong>genre </strong>(<a target="_blank" rel="noopener noreferrer nofollow" href="https://www.francaisavecpierre.com/le-genre-en-francais-masculin-feminin/">masculin ou féminin</a>) et le <strong>nombre </strong>(singulier ou pluriel) de ce nom.</p></li></ul><ul><li><p>Les <strong>déterminants </strong>les plus utilisés sont les <strong>articles</strong>. Parmi les autres déterminants, on trouve notamment les <a target="_blank" rel="noopener noreferrer nofollow" href="https://www.francaisavecpierre.com/a-ou-de-en-francais/">adjectifs possessifs</a> et les <a target="_blank" rel="noopener noreferrer nofollow" href="https://www.francaisavecpierre.com/les-adjectifs-demonstratifs/">adjectifs démonstratifs</a>.</p></li></ul><ul><li><p>On compte <strong>trois types d’articles en français</strong>: les articles <strong>définis </strong>(LE, LA, LES), les articles <strong>indéfinis </strong>(UN, UNE, DES) et les articles <strong>partitifs</strong> (DU, DE LA, DES). Il y a aussi un <strong>cas spécial</strong>: les articles <strong>contractés</strong>, qui naissent de la contraction d’un article défini et de la <a target="_blank" rel="noopener noreferrer nofollow" href="https://www.francaisavecpierre.com/a-ou-de-en-francais/">préposition À ou DE</a> (AU, AUX, DU, DES).</p></li></ul><ul><li><p>Pour y voir plus clair, voici un <strong>tableau récapitulatif des articles en français</strong>:</p></li></ul>',
    },
  });
}
