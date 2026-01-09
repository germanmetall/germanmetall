<template>
	<div class="page">
		<div class="page__top">
			<Avatar />

			<h1 class="page__name">{{ info.bio.name[activeLang] }}</h1>
			<h2 class="page__title">{{ info.bio.title.name }}</h2>
		</div>

		<aside class="aside">
			<div class="contacts">
				<template v-for="item in info.bio.contacts">
					<a
						class="listItem"
						v-if="item.type == 'phone'"
						:href="`tel:${item.value}`"
						target="_blank"
					>
						<Phone class="listItem__icon" />
						<span class="listItem__name">{{ item.value }}</span>
					</a>
					<a
						class="listItem"
						v-else-if="item.type == 'mail'"
						:href="`mailto:${item.value}`"
						target="_blank"
					>
						<Mail class="listItem__icon" />
						<span class="listItem__name">{{ item.value }}</span>
					</a>

					<a
						class="listItem"
						v-else-if="item.type == 'LinkedIn'"
						:href="item.value"
						target="_blank"
					>
						<Linkedin class="listItem__icon" />
						<span class="listItem__name">LinkedIn</span>
					</a>
					<a
						class="listItem"
						v-else-if="item.type == 'Google Scholar'"
						:href="item.value"
						target="_blank"
					>
						<GoogleAcademy class="listItem__icon" />
						<span class="listItem__name">Google Scholar</span>
					</a>
				</template>
			</div>

			<div class="skills">
				<div class="skills__h">{{ info.skills.title[activeLang] }}</div>
				<template
					class="category"
					v-for="category in new Set(info.skills.list.map(el => el.type))"
				>
					<div class="category__h">{{ category }}</div>
					<div
						class="skill transition"
						v-for="skill in info.skills.list.filter(el => el.type == category)"
						:class="{'skill--lang': category == 'Language'}"
						:id="`skill-${category}-${skill.id}`"
						:key="`skill-${category}-${skill.id}`"
						@click="skill.additional ? toggleDropdown(skill) : null"
					>
						<span class="skill__name transition">{{ skill.value }}</span>
						<template v-if="skill.additional">
							<div class="skill__expand transition">+</div>
							<div class="skill__additional transition">
								{{ skill.additional }}
								<i v-if="skill.years">
									<br />
									{{ skill.years[0] + ' - ' + (skill.years[1] === true ? info.i18n.now[activeLang] : skill.years[1]) }}
								</i>
							</div>
						</template>
						<i v-if="skill.level">{{ skill.level }}</i>
					</div>
				</template>
			</div>
		</aside>

		<main class="main">
			<div class="main__h">{{ info.chronology.title[activeLang] }}</div>
			<a
				class="place transition"
				v-for="item in info.chronology.list"
				:key="item.org.en"
				:href="item.link"
				target="_blank"
			>
				<h3 class="place__name">
					<template v-if="item.org.name"
						>{{ item.org.name }} ({{ item.org.type[activeLang] }})
					</template>
					<template v-else>
						{{ item.org[activeLang] }}
					</template>

					<div class="place__type">
						<Work v-if="item.type == 'work'" />
						<Study v-else-if="item.type == 'education'" />
					</div>
				</h3>
				<div
					class="place__geography"
					v-if="item.geography"
				>
					{{ item.geography[activeLang] }}
				</div>
				<div
					class="place__years"
					v-if="item.years[0]"
				>
					{{ item.years[0] + ' - ' + (item.years[1] === true ? info.i18n.now[activeLang] : item.years[1]) }}
				</div>
				<div class="place__roles">{{ item.roles }}</div>
				<div
					class="place__desc"
					v-html="item.description[activeLang]"
				></div>
			</a>
		</main>
	</div>
</template>

<script setup>
import { computed, onMounted, ref } from "vue";
import info from "@/assets/json/info.json"
import { useSettingsStore } from "@/stores/settings";
import Avatar from "@/components/views/home/Avatar.vue";
import Phone from "@/components/svg/phone.vue";
import Mail from "@/components/svg/mail.vue";
import Linkedin from "@/components/svg/linkedin.vue";
import GoogleAcademy from "@/components/svg/googleAcademy.vue";
import Work from "@/components/svg/work.vue";
import Study from "@/components/svg/study.vue";

const settingsStore = useSettingsStore(),
	activeLang = computed(() => settingsStore.activeLang)

function toggleDropdown(skill) {
	let target = document.querySelector(`#skill-${skill.type}-${skill.id} .skill__additional`),
		expand = document.querySelector(`#skill-${skill.type}-${skill.id} .skill__expand`)
	if(target.style.maxHeight == 0 || target.style.maxHeight == '0px') target.style.maxHeight = target.scrollHeight + 'px';
	else target.style.maxHeight = 0
	expand.classList.toggle('skill__expand--toggled')
}
</script>

<style scoped lang="scss">
.page {
	width: calc(100% - 32px);
	position: fixed;
  display: grid;
  grid-template-columns: 168px auto;
  gap: 12px;
	margin: 0 auto;

  &__top {
    display: inherit;
    grid-template-columns: inherit;
    justify-items: center;
    grid-column: 1 / span 2;
    width: 100%;
    gap: inherit;
    text-align: center;

    .avatar {
      grid-column: 1;
      grid-row: 1 / span 2;
      box-sizing: border-box;
    }

    h1, h2 {
      width: 100%;
    }
  }
}

@mixin pseudo {
	content: '';
	position: absolute;
	width: 0;
	height: 0;
	background-color: #003d84;
	transition: .3s ease-in-out;
}

.contacts {
	box-sizing: border-box;
	display: flex;
	flex-direction: column;
	gap: 8px;
  width: 100%;
	padding: 4px;
  background-color: #003d8420;
	border-radius: 8px;
  text-align: left;
  overflow-wrap: anywhere;

  .listItem {
		position: relative;
    width: 100%;
    display: flex;
    flex-direction: column;
		justify-content: center;
		align-items: center;
    gap: 4px;
		padding: 4px 0;
    cursor: pointer;
		transition: .3s ease-in-out;

		text-decoration: unset;
		color: #003d84;
		font-weight: 500;

		&::before {
			@include pseudo;
			width: 2px;
			left: 0;
			bottom: 0;
		}

		&::after {
			@include pseudo;
			width: 2px;
			right: 0;
			top: 0;
		}

		&:hover {
  		background-color: #ececec;
			&::before, &::after {
				height: 100%;
			}
			.listItem__name::after {
				width: 100%;
			}
		}

    &__icon {
      width: 32px;
    }
    &__name {
			position: relative;
      font-size: 12px;

			&::after {
				@include pseudo;
				height: 1px;
				left: 0;
				bottom: 0;
			}
    }
  }
}

.skills {
	display: flex;
	flex-direction: column;
	gap: 8px;
	margin-top: 24px;
	padding: 4px;
  background-color: #003d8420;
	border-radius: 8px;

	&__h {
		font-size: 22px;
		font-weight: 500;
		text-align: center;
	}
}

.category{
	display: flex;
	flex-direction: row;
	flex-wrap: wrap;
	gap: 4px;

	&__h{
		font-size: 20px;
		text-align: center;
	}
}

.skill {
	display: grid;
	grid-template-columns: auto 24px;
	gap: 4px;
	font-weight: 300;
	cursor: pointer;
	overflow: hidden;

	&:hover &{
		&__expand, &__name {
			color: #003d84;
		}
	}

	&:has(>&__expand--toggled) {
		.skill{
			&__expand, &__name {
				color: #003d84;
				font-weight: 400;
			}
		}
	}

	&--lang {
		cursor: auto;

		&:hover .skill__name {
			color: inherit !important;
		}
	}

	&__expand {
		display: flex;
    justify-content: center;
    align-items: center;
		font-size: 20px;
		transform-origin: center center;
		font-weight: 500;
		text-align: right;

		&--toggled {
			transform: rotateZ(45deg);
		}
	}
	&__additional {
		grid-column: 1 / span 2;
		grid-row: 2;
		max-height: 0;
		font-size: 12px;
	}
}

.main {
	display: flex;
	flex-direction: column;
	gap: 16px;

	&__h {
		font-size: 26px;
	}
}

.place {
	position: relative;
	display: flex;
	flex-direction: column;
	gap: 4px;
	padding-bottom: 16px;
	border-bottom: 1px solid #404040;

	text-decoration: unset;
	color: #000;
	cursor: pointer;

	&:hover {
		border-color: #003d84;
		&::before, &::after {
			height: 100%;
		}
	}

	&::before {
		@include pseudo;
		width: 2px;
		left: -8px;
		bottom: 0;
		transition-duration: .5s;
	}

	&::after {
		@include pseudo;
		width: 2px;
		right: -8px;
		top: 0;
		transition-duration: .5s;
	}

	&__name {
		display: flex;
		flex-direction: row;
		gap: 8px;
		align-items: center;
	}
	&__type {
		width: 24px;
		height: 24px;
	}
	&__geography, &__years{
		font-weight: 300;
		font-size: 16px;
		font-style: italic;
	}
	&__roles {
		font-weight: 400;
		margin-top: 8px;
	}
	&__desc {
		font-weight: 300;
	}
}
</style>
