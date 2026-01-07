<template>
	<nav class="nav">
		<div class="nav__inner transition">
			<div
				v-for="tab in store.pages"
				class="tab transition"
				:class="{'tab--active': store.activePage == tab}"
				@click="store.changePage(tab)"
			>
				{{ tab }}
			</div>
		</div>
	</nav>
</template>

<script setup>
import { computed, ref } from 'vue';
import { useSettingsStore } from '@/stores/settings';

const store = useSettingsStore()
</script>

<style lang="scss" scoped>
.nav {
  position: fixed;
  display: flex;
  flex-direction: row;
  width: 100%;
  bottom: max(3vh, 24px);
  left: 0;

  &__inner {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    gap: 16px;
    padding: 16px 24px;
    border: 1px solid #626262;
    border-radius: 32px;
    margin: 0 auto;
    background-color: #fff;

    &:hover {
      //border-radius: 12px;
    }
  }
}

.tab {
  display: flex;
  flex-direction: column;
  gap: 8px;
  justify-content: center;
  align-items: center;
  border-radius: 16px;

  font-size: 20px;
  text-transform: capitalize;
  cursor: pointer;

  &:hover, &--active {
    color: red;
  }

  &__icon {
    display: none;
    width: 64px;
  }
}
</style>
