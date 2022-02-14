'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /* UTILISATEURS */
    /* Carl Sagan - Astronom, Physicien et Vulgarisateur (entre autres)  */
    await queryInterface.bulkInsert('Users', [{
      email: 'carl.sagan@bing.com',
      password: 'cosmos42',
      nickname: 'Carl Sagan Goat'

    }]),
    /* Moi même - Quelqu'un de pas trés important XD */
    await queryInterface.bulkInsert('Users', [{
      email: 'chris@gogole.com',
      password: 'azerty83',
      nickname: 'Chris Tucker'

    }]),
    /* Un delire */
    await queryInterface.bulkInsert('Users', [{
      email: 'merluchon.l.insoumis@gogole.ve',
      password: 'JeSaisQuAboyer',
      nickname: 'Merluche'

    }]),
    /* Virgil "Gus" Grissom - Commandant de la mission nommé a titre posthum "Apollo 1" qui a finis de façon tragique */
    await queryInterface.bulkInsert('Users', [{
      email: 'virgil.gus.grissom@nasa.com',
      password: 'HeroDuSpatial',
      nickname: 'Gus Grissom'

    }]),
    /* Edward White - Astronaute de la mission "Apollo 1". Je ne sais plus quelle etait sa fonction */
    await queryInterface.bulkInsert('Users', [{
      email: 'EdWhite@nasa.com',
      password: 'HeroiqueEtCalme',
      nickname: 'Ed Withe'

    }]),
    /* Roger Chaffee - Astraunote de la mission "Apollo 1". il n'as jamais pu allé dans l'espace... */
    await queryInterface.bulkInsert('Users', [{
      email: 'r.b.chaffee@nasa.com',
      password: 'LePauvre',
      nickname: 'Roger Chaffee'

    }]),
    /* Jean-Kevin boutonneux : Specimen commun sur les internets, il se surestime de façon surealiste. Ils se pensentr souvent intouchalble..
    jusqu'a ce que leurs parents leurs disent de faire leurs devoirs*/
    await queryInterface.bulkInsert('Users', [{
      email: 'anonymousEnCarton@yopmail.com',
      password: 'jeSuisUnHAck3ur',
      nickname: "J34n-k3v1n H4ck3r"

    }]),
    /* Mohamed Ali : Une legende de la boxe. Qui eclipse bien trop les autres boxers. Mais le grand publique ne cherche pas a comprendre, il n'as pas le temps */
    await queryInterface.bulkInsert('Users', [{
      email: 'MohamedAli@boxe.com',
      password: 'jvoleCommeLePapillon',
      nickname: "La Guêpe"

    }]),

    /* PUBLICATIONS */
    await queryInterface.bulkInsert('Posts', [{
      UserId: 4,
      userId: 4,
      content: "Si nous mourons, nous voulons que les gens l'acceptent. Nous sommes dans une entreprise risquée et nous espérons que si quelque chose nous arrive, cela ne retardera pas le programme Apollo. La conquête de l'espace vaut le risque de la vie",
    }]),
    await queryInterface.bulkInsert('Posts', [{
      UserId: 6,
      userId: 6,
      content: "Les problémes paraissent petits vue a 240Km de haut :)",
    }]),
    await queryInterface.bulkInsert('Posts', [{
      UserId: 5,
      userId: 5,
      content: "Un petit coucou a Thomas Pesquet ! (vachement glauque ça XD)",
    }]),
    await queryInterface.bulkInsert('Posts', [{
      UserId: 8,
      userId: 8,
      content: "Je vole comme le papillon et pique comme l'abeille !",
    }]),
    await queryInterface.bulkInsert('Posts', [{
      UserId: 7,
      userId: 7,
      content: "Je suis un anonyme Parmis les hackeur anonymous, on va changer le mondes ! enfin... Je vais aider a changer le monde ! ... Bon... Je vais regarder de mon fauteuil le monde qui s'ecroule autour de moi, et je vais faire le toxique sur internet car la au moins, je risque pas de me faire mal. Ouii maman j'arrive !!",
    }]),
    await queryInterface.bulkInsert('Posts', [{
      UserId: 8,
      userId: 8,
      content: "Qui a la même vision du monde à vingt ans qu’à cinquante, a perdu trente ans de sa vie.",
    }]),
    await queryInterface.bulkInsert('Posts', [{
      UserId: 1,
      userId: 1,
      content: "Nous sommes comme des papillons qui battent des ailes pendant un jour en pensant que c'est l'éternité.",
    }]),
    await queryInterface.bulkInsert('Posts', [{
      UserId: 3,
      userId: 3,
      content: "La République, c'est MOI ! MOI MOI MOI ET MOIIIIIIIIIIIIII",
    }]),
      await queryInterface.bulkInsert('Posts', [{
        UserId: 2,
        userId: 2,
        content: "Si je n'avais pas vecus autant de choses difficile en parraléle de quand j'ai fait ce projet, je l'aurais bien plus apprecié, et probablement infiniment plus reussis. La depression aurait pu me faire tout raté.",
      }]),
    await queryInterface.bulkInsert('Posts', [{
      UserId: 1,
      userId: 1,
      content: "Des affirmations extraordinaires nécessitent des preuves extraordinaires. (J'aurais bien mis une photo, mais a part en l'enregistrnant en dur ..",
    }]),
    await queryInterface.bulkInsert('Posts', [{
      UserId: 2,
      userId: 2,
      content: "Je suis crevé.. Il est 4h du matin et j'ecris des blagues, avec des references que personne comprendras, dans un seed que jamais personne ne lanceras surement a par moi XD ... Quelle galere XDD",
    }]),
    /* LIKE > DISLIKE */
    await queryInterface.bulkInsert('LikePosts', [{
      UserId: 2,
      userId: 2,
      PostId: 1,
      postId: 1,
      value: 1
    }]),
    await queryInterface.bulkInsert('LikePosts', [{
      UserId: 2,
      userId: 2,
      PostId: 2,
      postId: 2,
      value: 1
    }]),
    await queryInterface.bulkInsert('LikePosts', [{
      UserId: 2,
      userId: 2,
      PostId: 3,
      postId: 3,
      value: 1
    }]),
    await queryInterface.bulkInsert('LikePosts', [{
      UserId: 2,
      userId: 2,
      PostId: 4,
      postId: 4,
      value: 1
    }]),
    await queryInterface.bulkInsert('LikePosts', [{
      UserId: 2,
      userId: 2,
      PostId: 5,
      postId: 5,
      value: 1
    }]),
    await queryInterface.bulkInsert('LikePosts', [{
      UserId: 2,
      userId: 2,
      PostId: 6,
      postId: 6,
      value: 1
    }]),
    await queryInterface.bulkInsert('LikePosts', [{
      UserId: 2,
      userId: 2,
      PostId: 7,
      postId: 7,
      value: 1
    }]),
    await queryInterface.bulkInsert('LikePosts', [{
      UserId: 2,
      userId: 2,
      PostId: 9,
      postId: 9,
      value: 1
    }]),
    await queryInterface.bulkInsert('LikePosts', [{
      UserId: 3,
      userId: 3,
      PostId: 1,
      postId: 1,
      value: 1
    }]),
    await queryInterface.bulkInsert('LikePosts', [{
      UserId: 2,
      userId: 2,
      PostId: 11,
      postId: 11,
      value: 1
    }]),
    await queryInterface.bulkInsert('LikePosts', [{
      UserId: 2,
      userId: 2,
      PostId: 6,
      postId: 6,
      value: 1
    }]),
    await queryInterface.bulkInsert('LikePosts', [{
      UserId: 2,
      userId: 2,
      PostId: 4,
      postId: 4,
      value: 1
    }]),
    await queryInterface.bulkInsert('LikePosts', [{
      UserId: 3,
      userId: 3,
      PostId: 4,
      postId: 4,
      value: -1
    }]),
    await queryInterface.bulkInsert('LikePosts', [{
      UserId: 3,
      userId: 3,
      PostId: 2,
      postId: 2,
      value: -1
    }]),
    await queryInterface.bulkInsert('LikePosts', [{
      UserId: 3,
      userId: 3,
      PostId: 11,
      postId: 11,
      value: -1
    }]),
    await queryInterface.bulkInsert('LikePosts', [{
      UserId: 3,
      userId: 3,
      PostId: 9,
      postId: 9,
      value: -1
    }]),
    await queryInterface.bulkInsert('LikePosts', [{
      UserId: 3,
      userId: 3,
      PostId: 7,
      postId: 7,
      value: -1
    }]),
    await queryInterface.bulkInsert('LikePosts', [{
      UserId: 3,
      userId: 3,
      PostId: 5,
      postId: 5,
      value: -1
    }]),
    await queryInterface.bulkInsert('LikePosts', [{
      UserId: 4,
      userId: 4,
      PostId: 4,
      postId: 4,
      value: 1
    }]),
    await queryInterface.bulkInsert('LikePosts', [{
      UserId: 3,
      userId: 3,
      PostId: 5,
      postId: 5,
      value: 1
    }]),
    await queryInterface.bulkInsert('LikePosts', [{
      UserId: 3,
      userId: 3,
      PostId: 11,
      postId: 11,
      value: 1
    }]),
    await queryInterface.bulkInsert('LikePosts', [{
      UserId: 3,
      userId: 3,
      PostId: 9,
      postId: 9,
      value: 1
    }]),
    await queryInterface.bulkInsert('LikePosts', [{
      UserId: 3,
      userId: 3,
      PostId: 10,
      postId: 10,
      value: 1
    }]),
    await queryInterface.bulkInsert('LikePosts', [{
      UserId: 4,
      userId: 4,
      PostId: 10,
      postId: 10,
      value: 1
    }]),
    await queryInterface.bulkInsert('LikePosts', [{
      UserId: 4,
      userId: 4,
      PostId: 11,
      postId: 11,
      value: 1
    }]),
    await queryInterface.bulkInsert('LikePosts', [{
      UserId: 4,
      userId: 4,
      PostId: 1,
      postId: 1,
      value: 1
    }]),
    await queryInterface.bulkInsert('LikePosts', [{
      UserId: 5,
      userId: 5,
      PostId: 11,
      postId: 11,
      value: 1
    }]),
    await queryInterface.bulkInsert('LikePosts', [{
      UserId: 5,
      userId: 5,
      PostId: 7,
      postId: 7,
      value: 1
    }]),
    await queryInterface.bulkInsert('LikePosts', [{
      UserId: 6,
      userId: 6,
      PostId: 6,
      postId: 6,
      value: 1
    }]),
    await queryInterface.bulkInsert('LikePosts', [{
      UserId: 7,
      userId: 7,
      PostId: 11,
      postId: 11,
      value: 1
    }]),
    await queryInterface.bulkInsert('LikePosts', [{
      UserId: 7,
      userId: 7,
      PostId: 4,
      postId: 4,
      value: 1
    }]),
    /* COMMENTAIRES */
    await queryInterface.bulkInsert('Comments', [{
      UserId: 6,
      userId: 6,
      PostId: 1,
      postId: 1,
      content: "Tu nous as porté la poisse mec.."
    }]),
    await queryInterface.bulkInsert('Comments', [{
      UserId: 4,
      userId: 4,
      PostId: 4,
      postId: 4,
      content: "Tu as vu comme c'est magnifique ? Par contre la betise humaine me parait toujours aussi imposante"
    }]),
    await queryInterface.bulkInsert('Comments', [{
      UserId: 2,
      userId: 2,
      PostId: 4,
      postId: 4,
      content: "Y'en a un que tu devrais piquer alors ;) "
    }]),
    await queryInterface.bulkInsert('Comments', [{
      UserId: 3,
      userId: 3,
      PostId: 5,
      postId: 5,
      content: "Ecoute ta mére !"
    }]),
    await queryInterface.bulkInsert('Comments', [{
      UserId: 1,
      userId: 1,
      PostId: 6,
      postId: 6,
      content: "Trés jolie phrase mon chére !"
    }]),
    await queryInterface.bulkInsert('Comments', [{
      UserId: 8,
      userId: 8,
      PostId: 7,
      postId: 7,
      content: "Vous aussi vous parlez de papillon ?! Trop fort !"
    }]),
    await queryInterface.bulkInsert('Comments', [{
      UserId: 2,
      userId: 2,
      PostId: 8,
      postId: 8,
      content: "bwAHaHahahaHaHa"
    }]),
    await queryInterface.bulkInsert('Comments', [{
      UserId: 2,
      userId: 2,
      PostId: 11,
      postId: 11,
      content: "Je suis vraiment crevé, j'espere que le seed va fonctionner du premier coup"
    }]),
    await queryInterface.bulkInsert('Comments', [{
      UserId: 2,
      userId: 2,
      PostId: 10,
      postId: 10,
      content: "Tellement vrai"
    }]),
    await queryInterface.bulkInsert('Comments', [{
      UserId: 8,
      userId: 8,
      PostId: 10,
      postId: 10,
      content: "Une chose que beaucoup ont oubliés Apparement !"
    }]),
    await queryInterface.bulkInsert('Comments', [{
      UserId: 1,
      userId: 1,
      PostId: 10,
      postId: 10,
      content: "C'est pas faux !"
    }]),
    await queryInterface.bulkInsert('Comments', [{
      UserId: 2,
      userId: 2,
      PostId: 10,
      postId: 10,
      content: "Carl, c'est quoi que t'as pas compris ? ;)"
    }])
    
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Users', null, {});
    await queryInterface.bulkDelete('Posts', null, {});
    await queryInterface.bulkDelete('LikePosts', null, {});
    await queryInterface.bulkDelete('Comments', null, {});
  }
};
