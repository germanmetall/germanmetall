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
			<Fullscreen
				class="paper__fullscreen transition"
				:class="{'paper__fullscreen--inactive': i !== store.activePageIndex}"
				@click="i == store.activePageIndex ? toggleFullscreen() : null"
			/>
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

		<div class="bubble">
			<div class="bubble__toggle">&gt;</div>
			<div class="bubble__text"></div>
			<div class="bubble__langs">
				<div
					class="lang"
					v-for="language in store.languages"
					:class="{'lang--active': language.id == store.activeLang}"
					@click="store.changeLang(language.id)"
				>
					{{ language.id }}
					<img
						class="lang__img"
						v-if="language.icon"
						:src="language.icon"
					/>
				</div>
			</div>
			<div class="bubble__text"></div>
		</div>
	</div>
</template>

<script setup>
import { computed, onMounted, ref, watch } from 'vue';
import Fullscreen from './components/svg/fullscreen.vue';
import { useSettingsStore } from './stores/settings';

const store = useSettingsStore()

let fullscreenIndex = ref(-1)

const toggleFullscreen = () => {
  fullscreenIndex.value = fullscreenIndex.value == -1 ? store.activePageIndex : -1;
}

watch(() => store.activePageIndex, () => {
  console.log(store.activePageIndex);
})

onMounted(() => {
  document.body.addEventListener('keydown', (e) => {
    if (e.key === "F11") {
      e.preventDefault();
      e.stopImmediatePropagation();
      toggleFullscreen();
    }
    else if(e.key === "Escape") fullscreenIndex.value = -1;
  })
})
</script>

<style lang="scss">
body {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: 'Roboto Variable', sans-serif;
	background-color: lightgreen;
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
  $left: 30%;
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
  overflow-y: auto;
  transition: all .3s ease-in-out, z-index .5s step-start !important;
  transform-origin: left top;
  rotate: 0deg;
  cursor: pointer;

  $dx: 3%;
  $dy: 2%;

  &:first-of-type, &--away + & {
    cursor: auto;
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
      transition: all .3s ease-in-out, z-index .5s step-end !important;
      cursor: pointer !important;
    }
  }

  &.paper--active {
    z-index: 101;
    scale: 2;
    left: calc((100dvw - 2 * (80dvh / 1.414)) / 2);
    top: 5dvh;
    max-height: 40dvh;
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
</style>
