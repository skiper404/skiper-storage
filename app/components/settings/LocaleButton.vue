<script setup lang="ts">
const { locale, locales, setLocale } = useI18n()

const currentLocale = computed(
	() => locales.value.find((l) => l.code === locale.value)?.name?.split(' ')[0],
)
</script>

<template>
	<DropdownMenu>
		<DropdownMenuTrigger as-child>
			<Button
				variant="outline"
				size="icon-sm"
				class="bg-blue-400 border-sky-500"
			>
				{{ currentLocale }}
			</Button>
		</DropdownMenuTrigger>

		<DropdownMenuContent>
			<DropdownMenuItem
				class="flex flex-col"
				:key="l.code"
				v-for="l in locales"
			>
				<Button
					:variant="l.code === locale ? 'default' : 'secondary'"
					@click="setLocale(l.code)"
					class="w-full"
				>
					{{ l.name }}
				</Button>
			</DropdownMenuItem>
		</DropdownMenuContent>
	</DropdownMenu>
</template>
