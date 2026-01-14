<template>
	<main class="blog">
		<div
			class="post"
			v-for="post in blog.posts"
		>
			<div class="post__heading">{{ post.heading[activeLang] }}</div>
			<div
				class="post__text"
				v-html="post.text[activeLang]"
			></div>

			<div
				class="post__imgs"
				v-if="post.img?.length > 0"
			>
				<img
					class="post__img"
					v-for="img in post.img"
					:src="img"
				/>
			</div>

			<div class="post__tags">
				<div
					class="post__tag"
					v-for="tag in post.tags"
					@click="selectTag(tag)"
				>
					#{{ tag }}
				</div>
			</div>
		</div>
	</main>
</template>

<script setup>
import blog from "@/assets/json/blog.json"
import { useSettingsStore } from "../../stores/settings";
import { computed, ref } from "vue";

const store = useSettingsStore(),
  activeLang = computed(() => store.activeLang)

let chosenTags = ref([])

const selectTag = (tag) => {
  if(chosenTags.value.includes(tag)) chosenTags.value = chosenTags.value.filter(el => el !== tag)
  else chosenTags.value.push(tag)
}
</script>

<style scoped lang="scss">
.blog {
  display: flex;
  flex-direction: column;
  padding: 12px;
}

.post {
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding-bottom: 4px;


  &:not(&:last-of-type) {
    border-bottom: 1px solid #003d84;
  }

  &__heading {
    text-align: center;
    font-size: 22px;
  }
  &__text {
    font-size: 18px;

    &::first-letter {
      padding-left: 8px;
    }
  }
  &__img {
    &s {}
  }
  &__tag {
    font-style: italic;
    text-decoration: underline;
    cursor: pointer;
    &s {
      display: flex;
      flex-direction: row;
      gap: 4px;
    }
  }
}
</style>
