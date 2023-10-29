<template>
    <card class="text-center">
        <avatar :username="name" :size="72" :font-size="24" class="mb-4" />
        <h3>
            {{ name }}
        </h3>
        <div class="text-sm font-medium text-gray-900">
            {{ position }}
        </div>
        <div class="font-bold text-green-500">
            {{ phone }}
        </div>
    </card>
</template>
<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import { Prop } from '@/helpers/decorators';
import { Contact } from "@/interfaces";

@Options({})
export default class ContactCard extends Vue
{
    @Prop() private contact: Contact;
    private get name(): string { return this.contact?.full_name || "..." }
    private get position(): string { return this.contact?.position || "..." }
    private get phone(): string { return this.contact?.phone || "..." }
}
</script>
