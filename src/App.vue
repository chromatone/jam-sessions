<script setup>
import { createDirectus, realtime } from '@directus/sdk';
import { computed, onMounted, reactive, ref } from 'vue';
import logo from './logo.svg?raw'

const client = createDirectus(import.meta.env.VITE_WS_URL)
  .with(realtime());

const title = ref('')

const sessions = reactive({})

onMounted(async () => {
  await client.connect();
  await subscribe();
})

async function subscribe() {
  const { subscription } = await client.subscribe('sessions', {
    query: {
      fields: ['id', 'title', 'status', 'date_created'],
      sort: ['-date_created'],
      limit: 10
    },
  });

  for await (const ev of subscription) {
    if (!ev.data) continue
    console.log(ev?.data)
    for (let item of ev?.data) {
      sessions[item?.id] = item
    }

  }
}

const sorted = computed(() => Object.values(sessions).sort((a, b) => a.date_created > b.date_created ? -1 : 1))

client.onWebSocket('open', function () {
  console.log({ event: 'onopen' });
});

client.onWebSocket('message', function (ev) {

  console.log({ event: 'onmessage', ev });

  if (ev.type === 'ping') {
    client.sendMessage({
      type: 'pong',
    });
  }
});

client.onWebSocket('close', function (ev) {
  console.log({ event: 'onclose', ev });
});

client.onWebSocket('error', function (error) {
  console.log({ event: 'onerror', error });
});

function createSession() {
  if (!title.value) return
  client.sendMessage({
    type: 'items',
    collection: 'sessions',
    action: 'create',
    data: { title: title.value },
  });
  title.value = ''
}
</script>

<template lang="pug">
.flex.flex-col.gap-4.items-center.justify-center.min-h-100dvh
  .flex.flex-col.gap-4.justify-center.items-center
    .p-2.w-20(v-html="logo")
    .text-4xl.font-bold JAM SESSIONS!
    form.flex.flex-col.gap-4(@submit.prevent)
      input.p-4.rounded-xl(v-model="title" type="text" placeholder="Enter session title")
      button.p-2.shadow-lg.bg-purple-400(
        type="submit"
        @click="createSession(title)") Create a session
  .flex.flex-col.gap-2.w-full.max-w-30ch
    .p-1.bg-light-200.rounded-lg(
      :class="{'op-20': session?.status == 'draft'}"
      v-for="session in sorted" 
      :key="session") {{ session?.title }}
</template>
