<template>
  <main
    class="page"
    v-if="locale"
  >
    <section class="sidebar">
      <div class="avatar">
        <img
          class="avatar__img"
          src="@/assets/images/avatarFormal.jpg"
        />
      </div>

      <section class="skills">
        <div class="heading heading--big">
          {{ locale.skills.heading }}
        </div>

        <section
          class="skills__type"
          v-for="skillType in locale.skills.list"
          :key="skillType"
        >
          <hr class="divider" />
          <div class="heading heading--medium">
            {{ skillType.heading }}
          </div>

          <template v-if="skillType.isLanguages">
            <div
              class="skill skill--lang btn"
              v-for="(skill, index) in skillType.list"
              :key="skill"
              @click="changeLang(index)"
            >
              {{ skill }}
            </div>
          </template>

          <template v-else>
            <div
              class="skill"
              v-for="skill in skillType.list"
              :key="skill"
            >
              {{ skill }}
            </div>
          </template>

        </section>
      </section>

      <section class="contacts">
        <hr class="divider" />
        <div class="heading heading--medium">{{ locale.contacts.heading }}</div>
        <div
          class="contacts__item"
          title="click to copy!"
          v-for="contact in ['phone', 'email']"
          @click="copy(locale.contacts.list[contact])"
        >{{ locale.contacts.list[contact] }}</div>
        <a
          class="contacts__item"
          :href="locale.contacts.list.github"
        ><img src="@/assets/images/github.png" /></a>
        <a
          class="contacts__item"
          :href="locale.contacts.list.telegram"
        ><img src="@/assets/images/telegram.jpg" /></a>
      </section>
    </section>

    <section class="content">
      <div class="heading heading--big">{{ locale.work.heading }}</div>
      <article
        class="article"
        v-for="item of locale.work.list"
        :key="item"
      >
        <div class="heading heading--medium">
          <div class="article__text heading--link">
            <a
              v-if="item.link"
              target="_blank"
              :href="item.link"
            >
              {{ item.heading }}
            </a>
            <template v-else>
              {{ item.heading }}
            </template>
          </div>

          <time class="article__date">
            {{ item.dates.from }} - {{ item.dates.to }}
          </time>
        </div>

        <div class="article__offset article__text heading heading--small">
          {{ item.position }}
        </div>

        <div class="article__offset article__text">
          {{ item.summary }}
        </div>
      </article>

      <hr class="divider" />

      <div class="heading heading--big">{{ locale.education.heading }}</div>
      <article
        class="article"
        v-for="item of locale.education.list"
        :key="item"
      >

        <div class="heading heading--medium">
          <a
            class="article__text heading--link"
            target="_blank"
            :href="item.link"
          >
            {{ item.heading }}
          </a>

          <time class="article__date">
            {{ item.dates.from }} - {{ item.dates.to }}
          </time>
        </div>

        <div class="article__offset article__text">
          {{ item.summary }}
        </div>
      </article>
    </section>

    <nav class="nav">
      <div class="heading heading--medium">{{ locale.styles.heading }}</div>
      <div
        class="btn"
        v-for="style of locale.styles.list"
        :key="style"
        :id="'style-' + style"
        @click="changeStyle(style)"
      >
        <div>{{ style }}</div>
      </div>

      <div
        @click="getPDF()"
        class="btn"
      >PDF</div>
    </nav>
  </main>

  <img
    class="bgImage"
    src="@/assets/images/lotus.svg"
  />
</template>

<script setup>
import en from "@/assets/locales/en.json";
import ua from "@/assets/locales/ua.json";
import { onMounted, ref } from "vue";

let locale = ref(),
  lang = ref(),
  nirvana = ref(false),
  canBeShown = ref(true)

onMounted(() => {
  changeLang(2)
})

const scrollToNirvana = () => {
  let eq = window.scrollY / (document.body.scrollHeight - window.innerHeight)
  let funToCompute = (mult) => {
    return `scale(${mult})`;
  }
  let str = "";
  if (eq > 0.4 && eq <= 0.5) {
    str = funToCompute(1.1);
    canBeShown.value = true;
  }
  else if (eq > 0.5 && eq <= 0.6) str = funToCompute(1.2);
  else if (eq > 0.6 && eq <= 0.7) str = funToCompute(1.3);
  else if (eq > 0.7 && eq <= 0.8) str = funToCompute(1.4);
  else if (eq > 0.8 && eq <= 0.9) str = funToCompute(1.5);
  else if (eq > 0.9) {
    str = funToCompute(1.6);
    if (canBeShown.value) {
      if (!nirvana.value) {
        alert(locale.value.nirvana[0]);
        nirvana.value = true;
      }
      else alert(locale.value.nirvana[1]);
      canBeShown.value = false;
    }
  }
  else {
    str = funToCompute(1);
    canBeShown.value = true;
  }
  document.querySelector(".bgImage").style.transform = str;
}

const changeLang = (langIndex) => {
  /*
    "Russian": "C2 (native)",
    "Ukrainian": "C2 (native)",
    "English": "B2",
    "Czech": "B1",
    "Polish": "A1"
  */
  switch (langIndex) {
    case 0:
      alert("Смерть ворогам!\nDeath to enemies!");
      break;
    case 1:
      locale.value = ua;
      lang.value = "ua";
      break;
    case 2:
      locale.value = en;
      lang.value = "en";
      break;
    case 3:
      alert("In development");
      break;
    case 4:
      alert("In development");
      break;
    default:
      locale.value = en;
      lang.value = "en";
      break;
  }
}
const changeStyle = (styleName) => {
  document.querySelector("#app").className = styleName.toLowerCase();
  if (styleName.toLowerCase() == 'zen') {
    document.documentElement.requestFullscreen();
    document.addEventListener("scroll", scrollToNirvana);
  }
  else {
    if (document.fullscreenElement) document.exitFullscreen();
    document.querySelector("#app").style.backgroundSize = "";
    document.removeEventListener("scroll", scrollToNirvana);
  }
}
const getPDF = () => {
  window.open(`${lang.value}.pdf`);
}
const copy = (data) => {
  navigator.clipboard.writeText(data).then(() => alert(locale.value.copied));
}
</script>

<style lang="scss">
@font-face {
  font-family: Greek;
  src: url("@/assets/fonts/greek.ttf");
}

@font-face {
  font-family: "Aqua Grotesque";
  src: url("@/assets/fonts/aqua.ttf");
}

@font-face {
  font-family: "Roboto Slab";
  src: url("@/assets/fonts/RobotoSlab-ExtraLight.ttf");
}


body {
  margin: 0;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  background-attachment: fixed;
  background-position: center;
  background-repeat: no-repeat;
  transition: unset;
}

* {
  box-sizing: border-box;
  font-family: "Roboto Slab";
}

.bgImage {
  position: fixed;
  z-index: 0;
  width: 50%;
  left: 25%;
  top: 20%;
  opacity: 0;
  transition: .5s;
}

$gap: 16px;

.page {
  display: grid;
  z-index: 1;
  position: relative;
  width: min(100%, 1200px);
  padding: 4vh 0;
  margin: 0 auto;
  grid-template-columns:
    calc(20% - ($gap / 2)) calc(60% - $gap) calc(20% - ($gap / 2));
  gap: $gap;
  backdrop-filter: blur(6px) brightness(.97) contrast(.97);
  background: #ffffff30;
}

.content {
  padding: 6px 24px;
  text-align: left;
  background: #ffffff80;
  border-radius: 8px;
  transition: .75s;
}

@media print {
  a {
    color: #000;
  }

  .page {
    grid-template-columns: calc(40% - $gap/2) calc(60% - $gap/2);
  }

  .contacts {
    position: absolute;
    bottom: -3%;
    width: 70%;
    left: 15%;

    a {
      display: none;
    }
  }

  .content {
    .divider {
      opacity: 0;
      height: 0;
      margin: 2px 0;
    }
    .article:nth-of-type(5){
      margin-top: 25%;
    }
  }

  .sidebar {
    margin-top: -180%;

    .skills__type:nth-of-type(4) {
      margin-bottom: 60%;
    }

    .skills__type:nth-of-type(5) {
      margin-top: 10%;
    }
  }

  .nav {
    display: none;
  }
}

$color: rgba(70, 120, 60, .5);

.sidebar {
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 6px 12px;
  background: #dddddd40;
  border-radius: 4px 24px 24px 4px;
  transition: .75s;
}

.content {
  padding: 6px 24px;
  text-align: left;
  background: #ffffff80;
  border-radius: 8px;
  transition: .75s;
}

.nav {
  padding: 6px 12px;
  background: #dddddd40;
  height: fit-content;
  border-radius: 24px 4px 4px 24px;
  transition: .75s;
}

// 2nd level
.avatar {
  &__img {
    width: min(280px, 100%);
    border: 8px double $color;
    border-radius: 100%;
    transition: .5s;

    &:hover {
      transform: scale(1.2);
      border: 8px double opacify($color, .6);
      transform-origin: center;
    }
  }
}

.skills {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  &__type {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: center;
    max-width: max(50vw, 400px);
  }
}

.skill {
  padding: 4px 6px;
  margin: 6px;
  border: 2px solid #000000;
  border-radius: 8px;
  font-weight: 600;
  background: transparentize($color, .2);
  font-weight: 800;
  color: #000;
  transition: .5s;

  &--lang {
    width: 100%;
  }
}

.contacts {
  &__item {
    display: block;
    margin: 6px 0;
    cursor: pointer;
    font-size: .9rem;
    overflow-wrap: anywhere;
    text-decoration: underline;

    img {
      width: min(100%, 120px);
      border-radius: 50%;
    }
  }
}

.article {
  padding: 12px 16px;
  transition: .75s;

  &__date {
    font-size: 1rem;
    font-style: italic;
    float: right;
  }

  &__text {
    display: inline-block;
  }

  &__offset {
    padding-left: 24px;
  }
}

// helpers

// mixins
@mixin gem($_multDiag, $_multHor, $_offsetHor) {
  $multDiag: $_multDiag;
  $multHor: $_multHor;
  $offsetHor: $_offsetHor;
  $transparenceLevel: .55; // in [0;1]
  $colors: transparentize(#e9eaeb, $transparenceLevel - .10),
  transparentize(#f2f3f4, $transparenceLevel + .10),
  transparentize(#fffaf0, $transparenceLevel + .25),
  transparentize(#e7faed, $transparenceLevel + .15);

  background-image:
    repeating-linear-gradient(60deg,

      nth($colors, 1) 0 $multDiag,

      nth($colors, 2) calc($multDiag * 2) calc($multDiag * 3),

      nth($colors, 3) calc($multDiag * 3) calc($multDiag * 4),

      nth($colors, 4) calc($multDiag * 4) calc($multDiag * 5)),
    repeating-linear-gradient(-60deg,

      nth($colors, 1) 0 $multDiag,

      nth($colors, 2) calc($multDiag * 2) calc($multDiag * 3),

      nth($colors, 3) calc($multDiag * 3) calc($multDiag * 4),

      nth($colors, 4) calc($multDiag * 4) calc($multDiag * 5)),
    repeating-linear-gradient(0deg,
      rgba(50, 120, 50, .45) calc($multHor + $offsetHor) calc($multHor * 2 + $offsetHor),
      rgba(0, 150, 75, 0.95) calc($multHor * 2 + $offsetHor) calc($multHor * 3 + $offsetHor)),
    radial-gradient(at 75% 75%,
      rgba(0, 150, 250, 0.6) 45%,
      rgba(0, 200, 50, 0.3));
}

@mixin strict() {
  background-image: radial-gradient(circle at 20% 50%, #1b1d1e 50%, #ddd 350%);
}

@mixin zen() {
  background-color: #c3d3b2b0;
}

.divider {
  width: 100%;
  border: 0.5px solid #000000;
  border-radius: 100%;
}

.heading {
  width: 100%;
  display: block;

  &--big {
    font-family: "Aqua Grotesque";
    font-size: 2.5rem;
    margin: 1.5rem 0;
  }

  &--medium {
    font-family: "Aqua Grotesque";
    font-size: 1.75rem;
    margin: 1.05rem 0;
  }

  &--small {
    font-size: 1.25rem;
    margin: 0.75rem 0;
  }

  &--link {
    position: relative;
    text-decoration: unset;
    transition: .75s;

    &:active {
      color: $color;
    }

    &::after {
      content: "";
      position: absolute;
      bottom: -4px;
      left: 0;
      width: 100%;
      height: 2px;
      background: $color;
    }
  }
}

.btn {
  font-weight: 800;
  padding: 6px 12px;
  border: 2px solid #000000;
  margin: 12px 0;
  cursor: pointer;
  box-shadow: 1px 2px 2px #00000060;
  backdrop-filter: blur(12px);
  background-color: #ffffff60;
  transition: .5s;
  border-radius: 4px;
  font-size: 1rem;
  height: 3rem;
  display: flex;
  justify-content: center;
  align-items: center;

  &:hover {
    font-size: 1.3rem;
    box-shadow: 1px 4px 2px #00000060, -3px 2px 4px #00000060, 3px 2px 4px #00000060;
  }
}

// special styles
#style {
  &-Strict {
    background-color: #ffffff80;
  }

  &-Gem {
    @include gem(6px, 12px, 0px);
  }

  &-Zen {
    @include zen();
    background-image: url("@/assets/images/lotus.svg");
    background-size: 50% 80%;
    background-repeat: repeat-x;
    background-position: 0 50%;
  }

  &-Ancient {
    >span {
      font-family: Greek !important;
    }

    background: #fff8d3;
  }

  &-Chaos {}
}

.strict {
  &#app {
    @include strict();
  }

  .page {
    background: transparent;
  }

  .sidebar,
  .nav {
    background: #ffffffb0;
    border-radius: 4px;
  }

  .content {
    background: #ffffffe0;
    border-radius: 2px;
  }
}

.gem {
  &#app {
    @include gem(40px, 90px, -20px);
  }
}

.zen {
  &#app {
    @include zen();
    min-height: 400vh;
  }

  .bgImage {
    opacity: 1;
  }

  .sidebar,
  .nav {
    background: #a1b88d60;
  }

  .content {
    background: transparent;
  }

  .article {
    margin: 12px 0;
    border-radius: 8px;
    background: #dad2bad0;
  }

  hr {
    border: 0px transparent;
  }
}

.ancient {
  * {
    font-family: Greek;
  }

  &#app {
    background-image: url("@/assets/images/bgAncient.jpg");
    background-size: cover;
    background-position: 100% 25%;
  }

  .page {
    backdrop-filter: unset;
  }

  .sidebar,
  .content,
  .nav {
    background: #fff8d360;
    backdrop-filter: blur(6px) brightness(0.97) contrast(0.97);
  }
}

.chaos {}

@media screen and (max-width: 900px) {
  .page {
    display: flex;
    flex-direction: column;
    grid-template-columns: unset;
  }
}
</style>