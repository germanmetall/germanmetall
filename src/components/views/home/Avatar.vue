<template>
	<div
		class="avatar transition"
		@click="changeAvatar"
	>
		<img
			v-for="(avatar, i) in info.bio.pictures"
			class="avatar__img transition"
			:style="i == 0 ? { 'margin-left': -100 * activeAvatarIndex + '%' } : {}"
			:src="avatar"
		/>
	</div>
</template>

<script setup>
import { computed, ref } from "vue";
import info from "@/assets/json/info.json"
import { useSettingsStore } from "@/stores/settings";

const settingsStore = useSettingsStore(),
	activeLang = computed(() => settingsStore.activeLang),
	activeAvatarIndex = ref(0)

const changeAvatar = () => activeAvatarIndex.value == (info.bio.pictures.length - 1) ? activeAvatarIndex.value = 0 : activeAvatarIndex.value++;
</script>

<style lang="scss" scoped>
.avatar {
	position: relative;
	display: flex;
	align-items: center;
	aspect-ratio: 3/4;
	width: 128px;
	border: 4px solid snow;
	box-shadow: 10px 10px 36px 0 #00187c1a;
	overflow: hidden;
	cursor: pointer;

	&:hover,
	&:has(>.menu--opened) {
		border-color: #003d84;
		box-shadow: 12px 20px 36px 0 #00187c40;
	}

	&__img {
		width: 100%;
		height: 100%;
		object-fit: cover;
		aspect-ratio: inherit;
	}
}
</style>
