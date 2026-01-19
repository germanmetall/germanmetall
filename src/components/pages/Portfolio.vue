<template>
	<main class="main">
		<div class="main__h">{{ portfolio.name[activeLang] }}</div>

		<div
			class="main__filters"
			v-if="false"
		>
			<a
				class="filter transition"
				v-for="folder in folders"
				:href="`#${folder}`"
			>
				{{ folder }}
			</a>
		</div>

		<div class="projects">
			<div
				class="folder"
				v-for="folder in folders"
				:id="`folder-${folder}`"
			>
				<div
					class="folder__name"
					@click="toggleDropdown(folder)"
				>
					<div class="folder__expand">&plus;</div>
					<Folder class="folder__icon" />
					{{ folder }}
				</div>

				<div class="folder__dropdown transition">
					<a
						class="project"
						v-for="project in portfolio.projects.filter(el => el.folder == folder)"
						:href="project.link"
						target="_blank"
					>
						<div class="project__name transition">
							{{ project.name }}
						</div>
						<i class="project__years">
							{{ project.date[0] + ' - ' + (project.date[1] === true ? info.i18n.now[activeLang] : project.date[1]) }}
						</i>
						<div class="project__role">{{ project.role }}</div>
						<div class="project__desc">
							{{ project.description[activeLang] }}
						</div>
						<div
							class="project__thumbnail transition"
							v-if="project.thumbnail"
						>
							<img
								class="transition"
								:src="project.thumbnail"
								loading="lazy"
							/>
						</div>
					</a>
				</div>
			</div>
		</div>
	</main>
</template>

<script setup>
import info from "@/assets/json/info.json"
import portfolio from "@/assets/json/portfolio.json"
import { computed, onMounted, ref, watch } from 'vue';
import { useSettingsStore } from '@/stores/settings';
import Folder from "@/components/svg/folder.vue"

const store = useSettingsStore(),
  activeLang = computed(() => store.activeLang)

let activeFolder = ref(),
  folders = ref()

const toggleFolder = (folder) => {
  if(activeFolder.value == folder) activeFolder.value = null;
  else activeFolder.value = folder
}

function toggleDropdown(folder) {
	console.log(folder)
	let target = document.querySelector(`#folder-${folder} .folder__dropdown`)
	console.log(target.style.maxHeight)
	if(target.style.maxHeight === 0 || target.style.maxHeight === '0px') target.style.maxHeight = target.scrollHeight + 'px';
	else target.style.maxHeight = 0
}

onMounted(() => {
  folders.value = new Set(portfolio.projects.map(el => el.folder))
})
</script>

<style lang="scss" scoped>
.main {
  display: flex;
  flex-direction: column;
  gap: 32px;

  &__h {
    font-size: 2rem;
    text-align: center;
  }

	&__filters {
		display: flex;
		flex-direction: row;
		gap: 24px;
	}
}

.filter {
	height: fit-content;
  padding: 12px;
	border: 1px solid #b0b0b0;
  border-radius: 12px;
  background-color: #dedede;
  font-size: 1.25rem;
	text-decoration: unset;
	color: #000;
  filter: drop-shadow(2px 2px 2px #00000040);
	cursor: pointer;

  &:hover, &--active {
		background-color: #003d8420;
		border-color: #003d84;
  	filter: unset;
	}
}

@mixin pseudo {
	content: '';
	position: absolute;
	height: 0;
	background-color: #003d84;
	transition: .3s ease-in-out;
}

.project {
	&s {
		display: flex;
		flex-direction: column;
		gap: 28px;
	}

	position: relative;
	display: flex;
	flex-direction: column;
	gap: 4px;
	text-decoration: unset;
	color: #000;
	padding: 0 4px 16px;
	margin: 0 8px;
	border-bottom: 1px solid #000;

	&::before {
		@include pseudo;
		width: 2px;
		left: -8px;
		bottom: 0;
	}

	&::after {
		@include pseudo;
		width: 2px;
		right: -8px;
		top: 0;
	}

	&:hover{
		border-color: #003d84;

		&::before, &::after {
			height: 100%;
		}

		.project {
			&__name {
				color: #003d84;
			}
			&__thumbnail img {
				scale: 1.25;
			}
		}
	}

	&__name {
		font-size: 1.25rem;
		font-weight: 500;
	}
	&__years {
		font-weight: 300;
	}
	&__role {
		font-weight: 300;
	}
	&__thumbnail {
		max-width: 400px;
		width: 100%;
		display: flex;
		margin: auto;
		overflow: hidden;

		&>img {
			width: 100%;
			height: 100%;
			scale: 1;
		}
	}
}

.folder {
	position: relative;
	display: flex;
	flex-direction: column;
	gap: 24px;
	padding-left: 32px;

	&::before {
		content: "";
		position: absolute;
		left: 7px;
		top: 36px;
		bottom: 20px;
		width: 2px;
		background-color: #003d8480;
	}

	&__name {
		display: flex;
		flex-direction: row;
		align-items: center;
		gap: 16px;
		font-size: 1.5rem;
		margin-left: -32px;
		cursor: pointer;
	}
	&__expand {
		display: none;
	}
	&__icon {
		width: 32px;
	}

	&__dropdown {
		display: flex;
		flex-direction: column;
		gap: 24px;
		overflow-y: hidden;
		max-height: 100%;
	}
}
</style>
