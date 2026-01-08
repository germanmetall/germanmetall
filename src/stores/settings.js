import { defineStore } from "pinia";
import { markRaw, ref } from "vue";
import Info from "../components/pages/Info.vue";
import Portfolio from "../components/pages/Portfolio.vue";
import Blog from "../components/pages/Blog.vue";

export const useSettingsStore = defineStore("settings", () => {
	const languages = [
		{ id: "en", icon: 'https://kapowaz.github.io/square-flags/flags/uk.svg' },
		{ id: "ua", icon: 'https://kapowaz.github.io/square-flags/flags/ua.svg' },
		{ id: "cz", icon: 'https://kapowaz.github.io/square-flags/flags/cz.svg' }
	],
		activeLang = ref("en");

	const styles = [
		{ name: "official" },
		{ name: "terminal" },
		{ name: "homm3" },
	],
		activeStyleIndex = ref(0);

	const pages = [
		markRaw(Info), markRaw(Portfolio), markRaw(Blog)
	],
		activePageIndex = ref(0);

	function changeLang(newLang) {
		if (!languages.find(el => el.id == newLang)) return;
		activeLang.value = newLang;
	}

	function changeStyleIndex(newStyleIndex) {
		if (!styles.includes(newStyleIndex)) return;
		activeStyleIndex.value = newStyleIndex;
	}

	let canChangePage = true
	function changePage(e, newPageIndex) {
		if (newPageIndex < 0 || newPageIndex >= pages.length || !canChangePage || newPageIndex == activePageIndex.value) return;
		e.preventDefault();
		e.stopImmediatePropagation();
		canChangePage = false;
		activePageIndex.value += Math.sign(newPageIndex - activePageIndex.value)
		if (activePageIndex.value != newPageIndex) setTimeout(() => changePage(newPageIndex), 300);
		canChangePage = true;
	}

	return {
		languages,
		activeLang,
		styles,
		activeStyleIndex,
		pages,
		activePageIndex,
		changeLang,
		changeStyleIndex,
		changePage,
	};
});
