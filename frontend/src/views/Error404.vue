<!-- Mythique page!! -->
<template>
<!-- Page sacrée d'internet. Ce texte béni retrouvé dans le cratéere du nouveau mexique 'Chicxulub'. On suppose qu'il grandement participé au declin des dinosaures. Tôt ou tard, il risque de faire de meme avec l'espece humaine-->
<!-- XDD  -->
<!-- Heu... Je tiens par avance a m'excuser si cette blague deplaît. J'espere sincérement que l'humour est accepté, et surtout que je n'ai heurté personne en comparant l'erreure 404 avec un text saint. (on sait jamais) -->
<section id="error-404-page container">
<p>OoOops.. Nous n'avons pas trouver la page que vous desirez.. c'est une :</p>
<h1>Erreurs <span>404</span></h1>
<div class="fake-code"><span>this_page</span>.<em>not_found</em> = true;</div>
<div class="fake-code"><span>if</span> (<b>vous_vous_etes_perdu</b>) {<span>essayez_encore(differement)</span>;}</div>
<div class="fake-code"><span>else if (<b>on_a_foiré</b>)</span> {<em>alert</em>(<i>"Nous sommes vraiment désolé... "</i>); <span>window</span>.<em>location</em> = home;}</div>
<center><button class="button--main">HOME</button></center>
</section>

</template>

<script>

export default {
name: 'Error404',

}


</script>


<style lang="scss" scoped>
@import url("https://fonts.googleapis.com/css?family=Bevan");
@import "../../public/style.scss";

* {
    padding: 0;
    margin: 0;
    box-sizing: border-box;
}

section{
margin-bottom: 60px;;
}

h1 {
    font-family: "Bevan", cursive;
    font-size: 130px;
    margin: 10vh 0 0;
    text-align: center;
    letter-spacing: 5px;
    background-color: black;
    color: transparent;
    text-shadow: 2px 2px 3px rgba(255, 255, 255, 0.1);
    -webkit-background-clip: text;
    -moz-background-clip: text;
    background-clip: text;

   & span {
        font-size: 1.2em;
    }

    @media screen and (max-width: 880px) {
        font-size: 14vw;
    }
}

.fake-code {
    color: #bdbdbd;
    text-align: center;
    display: block;
    font-size: 16px;
    margin: 0 30px 25px;

   & span {
        color: #f0c674;
    }

   & i {
        color: #b5bd68;
    }

   & em {
        color: #b294bb;
        font-style: unset;
    }

   & b {
        color: #81a2be;
        font-weight: 500;
    }
}


a {
    color: #8abeb7;
    font-family: monospace;
    font-size: 20px;
    text-decoration: underline;
    margin-top:10px;
    display:inline-block
}




</style>