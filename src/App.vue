<template>
	<div
		class="desk"
		:class="{'desk--active': fullscreenIndex != -1}"
	>
		<div
			class="paper transition"
			v-for="(page, i) in store.pages"
			:class="{
        'paper--active': fullscreenIndex == i,
        'paper--away': store.activePageIndex > i  
      }"
			@click="(e) => store.changePage(e, i)"
		>
			<component :is="page" />
		</div>

		<div class="desk__bgLeft"></div>
		<div class="desk__bgBot"></div>
		<div class="desk__bgRight"></div>

		<div
			class="fullscreen transition"
			:class="{'fullscreen--active': fullscreenIndex != -1}"
			@click="fullscreenIndex !== -1 ? toggleFullscreen() : {}"
		></div>

		<div class="controls transition">
			<div
				class="btn controls__expandMobile"
				@click="toggleMobileControls"
			>
				&GreaterGreater;
			</div>

			<div class="control">
				<div
					:title="activeLang == 'en' ? 'Languages' : activeLang == 'ua' ? 'Мови' : 'Jazyky'"
					class="btn"
					v-for="language in store.languages"
					:class="{'btn--active': language.id == activeLang}"
					@click="store.changeLang(language.id)"
				>
					<img
						class="lang__img"
						v-if="language.icon"
						:src="language.icon"
					/>
				</div>
			</div>

			<div class="control">
				<div
					class="control__label"
					id="control__fullscreen"
				>
					<div
						:title="activeLang == 'en' ? 'Fullscreen' : activeLang == 'ua' ? 'На повний екран' : 'Na celou obrazovku'"
						class="btn"
						:class="{'btn--active': fullscreenIndex != -1}"
						@click="toggleFullscreen"
					>
						<Fullscreen class="lookingGlass transition" />
					</div>

					<div class="control__text">
						{{ activeLang == 'en' ? 'Fullscreen' : activeLang == 'ua' ? 'На повний екран' : 'Na celou obrazovku' }}
					</div>
				</div>

				<div class="control__label">
					<div
						:title="activeLang == 'en' ? 'Open PDF' : activeLang == 'ua' ? 'Відкрити PDF' : 'Otevřít PDF'"
						class="btn"
						@click="printPDF"
					>
						<Print class="print transition" />
					</div>
					<div class="control__text">
						{{ activeLang == 'en' ? 'Open PDF' : activeLang == 'ua' ? 'Відкрити PDF' : 'Otevřít PDF' }}
					</div>
				</div>
			</div>

			<div class="control">
				<div class="control__label">
					<div
						:title="activeLang == 'en' ? 'Previous page' : activeLang == 'ua' ? 'Попередня сторінка' : 'Předchozí stránka'"
						class="btn"
						:class="{'btn--inactive': activePageIndex == 0}"
						@click="(e) => store.changePage(e, activePageIndex-1)"
					>
						<span style="rotate: 180deg;">&GreaterGreater;</span>
					</div>
					<div class="control__text">
						{{ activeLang == 'en' ? 'Previous page' : activeLang == 'ua' ? 'Попередня сторінка' : 'Předchozí stránka' }}
					</div>
				</div>

				<div class="control__label">
					<div
						:title="activeLang == 'en' ? 'Next page' : activeLang == 'ua' ? 'Наступна сторінка' : 'Další stránka'"
						class="btn"
						:class="{'btn--inactive': activePageIndex == store.pages.length - 1}"
						@click="(e) => store.changePage(e, activePageIndex+1)"
					>
						&GreaterGreater;
					</div>
					<div class="control__text">
						{{ activeLang == 'en' ? 'Next page' : activeLang == 'ua' ? 'Наступна сторінка' : 'Další stránka' }}
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup>
import info from "@/assets/json/info.json"
import { computed, onMounted, ref, watch } from 'vue';
import Fullscreen from '@/components/svg/fullscreen.vue';
import Print from '@/components/svg/print.vue';
import { useSettingsStore } from './stores/settings';

const store = useSettingsStore(),
	activeLang = computed(() => store.activeLang),
  activePageIndex = computed(() => store.activePageIndex)

let fullscreenIndex = ref(-1)

const toggleFullscreen = () => {
  fullscreenIndex.value = fullscreenIndex.value == -1 ? activePageIndex.value : -1;
}

const printPDF = () => {
  window.open(`/germanmetall/pdf/Herman_Mossur_Frontend_${activeLang.value}.pdf`)
}

const toggleMobileControls = () => {
  let target = document.querySelector(".controls"),
		expand = document.querySelector(".controls__expandMobile")

  console.log(target.style.bottom);
	if(target.style.bottom == '-120px' || target.style.bottom == '') target.style.bottom = '0';
	else target.style.bottom = `-120px`
	expand.classList.toggle('controls__expandMobile--toggled')
}

onMounted(() => {
  if(navigator.language.includes("uk")) store.changeLang('ua')
  else if(navigator.language.includes("en")) store.changeLang('en')
  else if(navigator.language.includes("cz")) store.changeLang('cz')

  //if(confirm(info.i18n.usualPDF[activeLang.value])) printPDF();

  document.body.addEventListener('keydown', (e) => {
    if (e.code === "F11") {
      e.preventDefault();
      e.stopImmediatePropagation();
      toggleFullscreen();
    }
    else if(e.code === "Escape") fullscreenIndex.value = -1;
    else if(e.code === 'KeyP' && e.ctrlKey) {
      e.preventDefault();
      e.stopImmediatePropagation();
      printPDF()
    }
  })
})
</script>

<style lang="scss">
body {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: 'Roboto Variable', sans-serif;
  overflow: hidden;
}

.fullscreen {
  position: fixed;
  left: 0;
  top: 0;
  width: 100dvw;
  height: 100dvh;
  background-color: #000000a0;
  opacity: 0;
  user-select: none;

  &--active {
    z-index: 100;
    opacity: 1;
    cursor: pointer;
  }
}

.desk {
  position: fixed;
  width: 100dvw;
  height: 100dvh;
  padding-top: 5dvh;
  background: url("@/assets/img/desc-bg.jpg") center center no-repeat;
  background-size: cover;

  &--active {
    overflow-y: auto;
  }

  &__bg{
    @mixin bar {
      position: fixed;
      background-image: url("@/assets/img/blackened-steel-bg.webp");
      background-size: cover;
      background-repeat: no-repeat;
      z-index: -3;
    }
    &Left{
      @include bar;
      left: 0;
      top: 0;
      width: 36px;
      height: 100dvh;
    }
    &Bot{
      @include bar;
      left: 0;
      bottom: 0;
      height: 36px;
      width: 100dvw;
      background-position: center;
      z-index: -4;
    }
    &Right{
      @include bar;
      right: 0;
      top: 0;
      width: 36px;
      height: 100dvh;
    }
  }
}

.paper {
  $left: 24%;
  $top: 4%;

  position: absolute;
  aspect-ratio: 1/1.414;
  left: $left;
  top: $top;
  width: calc(80dvh / 1.414);
  max-height: 80dvh;
  padding: 12px 16px;
  border: 1px solid gray;
  background-color: #ececec;
  filter: drop-shadow(2px 2px 6px #40404040);
  z-index: 3;
  overflow-x: hidden;
  overflow-y: hidden;
  transition: all .3s ease-in-out, z-index .5s step-start !important;
  transform-origin: left top;
  rotate: 0deg;
  cursor: pointer;

  $dx: 3%;
  $dy: 2%;

  &:first-of-type, &--away + & {
    cursor: auto;
    overflow-y: auto;
  }

  @for $i from 1 through 5 {
    &:nth-of-type(#{$i}) {
      left: calc($left + #{$i - 1} * $dx);
      top: calc($top + #{$i - 1} * $dy);
      z-index: #{5 - $i};
    }

     &--away:nth-of-type(#{$i}){
      left: calc(-18% - (2% * #{5 - $i}));
      top: calc(0% + (#{$i} * 5%));
      rotate: calc(-16deg - 2deg * #{$i});
      z-index: #{$i};
      overflow-y: hidden;
      transition: all .3s ease-in-out, z-index .5s step-end !important;
      cursor: pointer !important;
    }
  }

  &.paper--active {
    z-index: 101;
    scale: 2;
    left: 7.5dvw;
    width: 40dvw;
    top: 2.5dvh;
    max-height: 45dvh;
  }

  &:hover &__fullscreen {
    filter: opacity(1);
  }

  &__fullscreen {
    position: sticky;
    float: right;
    right: 12px;
    top: 12px;
    width: 36px;
    cursor: pointer;
    filter: opacity(.5);
    z-index: 3;

    &:hover {
      scale: 1.2;
    }

    &--inactive {
      user-select: none;
      opacity: 0;
    }
  }
}

.transition {
  transition: .3s ease-in-out;

  &--5 {
    transition: .5s;
  }

  &--10 {
    transition: 1s;
  }
}

.btn {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 64px;
  height: 64px;
  box-sizing: border-box;
  padding: 16px;
  border-radius: 16px;
  background-color: #ececec;
  font-size: 2rem;
  filter: drop-shadow(2px 2px 2px #00000040);
  cursor: pointer;
  transition: .15s;
  user-select: none;

  &--active{
    color: #003d84;
    filter: drop-shadow(0 0 2px #003d84);
    .lang__img {
      border-color: #003d84b0;
    }
  }

  &--inactive {
    color: #a0a0a0;
    filter: drop-shadow(0 0 0 #00000040);
  }
}

.control {
  display: flex;
  flex-direction: row;
  gap: 32px;
  align-items: flex-start;
  width: fit-content;
  padding: 16px;
  border-radius: 16px;
  margin-left: auto;
  background-color: #ececec;
  filter: drop-shadow(2px 2px 10px #00000080);

  &s {
    position: absolute;
    right: 6dvw;
    top: 6dvh;
    display: flex;
    flex-direction: column;
    gap: 48px;

    &__expandMobile {
      display: none;
    }
  }

  &__label {
    display: flex;
    flex-direction: column;
    gap: 16px;
    justify-content: center;
    align-items: center;
    width: 80px;
    text-align: center;
    font-family: monospace;
  }
}

.lang {
  &__img {
    width: 100%;
    border: 2px solid #40404040;
    border-radius: 6px;
    transition: inherit;
  }
}

.lookingGlass {
  width: 64px;
  height: 64px;
  box-sizing: border-box;
  cursor: pointer;
}

@media print {
  * {
    background: unset !important;
  }
  body {
    overflow: unset !important;
  }
  #app {
    .desk {
      position: relative;
      display: flex;
      flex-direction: column;
      gap: 64px;
      padding: unset;
      width: unset;
      height: unset;
      overflow: unset;

      &__bg{
        &Left, &Right, &Bot {
          display: none;
        }
      }
    }
    .paper {
      position: relative;
      width: 100dvw;
      min-height: unset;
      height: auto;
      max-height: unset;
      left: unset;
      top: unset;
      right: unset;
      bottom: unset;
      padding: unset;
      border: unset;
      overflow: unset;
      filter: unset;

      &:not(&:first-of-type) {
        display: none;
      }
    }
    .controls {
      display: none;
    }
    .avatar {
      box-shadow: unset;
      width: unset;
    }
    .skill {
      &__expand {
        display: none;
      }
      &__additional {
        max-height: unset;
      }
    }
    a {
      &::after {
        font-size: .75rem;
        color: #000;
        content: "(LINK): [" attr(href) "]";
        background: unset;
        position: relative;
        width: unset;
        height: unset;
      }
    }
  }
}

@media screen and (max-aspect-ratio: 1.55) {
  #app {
    .desk {
      background: unset;

      &__bg {
        &Left, &Right, &Bot {
          display: none;
        }
      }

      .fullscreen {
        display: none;
      }

      .control {
        gap: 4px;
        padding: 4px;
        margin: unset;
        filter: unset;
        background: unset;

        &s {
          box-sizing: border-box;
          position: fixed;
          left: 0;
          top: unset;
          right: unset;
          bottom: 0;
          z-index: 1000;
          width: 100dvw;
          height: fit-content;
          padding: 12px;
          display: flex;
          flex-direction: row;
          gap: unset;
          justify-content: space-between;
          align-items: center;
          background-color: #00000040;
        }

        &__label {
          width: unset;
        }

        &__text {
          display: none;
        }

        #control__fullscreen {
          display: none;
        }
      }

      .btn {
        font-size: 1.125rem;
        width: 52px;
        height: 52px;
      }

      .paper {
        box-sizing: border-box;
        left: 0;
        top: 0;
        width: 100dvw;
        height: 100dvh;
        aspect-ratio: unset;
        max-width: unset;
        max-height: unset;
        padding-bottom: 200px;

        .page {
          padding-bottom: 200px;
        }
      }
    }
  }
}

@media screen and (max-width: 600px) {
  html {
    font-size: 20px;
  }
  #app .desk {
    .page {
      display: flex;
      flex-direction: column;

      &__top {
        display: flex;
        flex-direction: column;
        align-items: center;

        .avatar {
          width: 60dvw;
        }
      }

      .main {
        &__h {
          text-align: center;
        }
      }
    }

    .contacts {
      display: grid;
      grid-template-columns: 1fr 1fr;

      .listItem {
        &__name {
          text-align: center;
        }
      }
    }

    .control {
      &s {
        bottom: 0;
        flex-direction: row;
        justify-content: space-between;
        padding: unset;
        overflow: hidden;

        &__expandMobile {
          display: none !important;
          position: absolute;
          z-index: 1001;
          right: 5dvw;
          top: 4px;
          rotate: 90deg;
          display: flex;
          transition-duration: .5s;

          &--toggled {
            rotate: -90deg;
          }
        }
      }
    }
  }
}
</style>
