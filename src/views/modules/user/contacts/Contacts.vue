<template>
    <loading :loading="isLoading">
        <h3>{{ $t('Przydatne kontakty') }}</h3>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-6">
            <contact-card
                v-for="contact in contacts" :key="contact.full_name"
                :contact="contact"
            />
        </div>
    </loading>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import ContactsService from "@/services/contacts";
import { Contact } from "@/interfaces";
import ContactCard from "@/views/modules/user/contacts/ContactCard.vue";
import Loading from "@/components/common/loading/Loading.vue";

@Options({
    components: {Loading, ContactCard }
})
export default class Contacts extends Vue {
    private contacts: Contact[] = [];
    private isLoading = false;

    public async created(): Promise<void> {
        await this.usefulContacts();
    }

    private async usefulContacts(): Promise<void> {
        this.isLoading = true;
        try {
            const { data } = await ContactsService.contacts();
            this.contacts = data;
        }
        catch {
            this.$alert.error(this.$t('Nie udało się wczytać listy aukcji.'));
        }
        finally {
            this.isLoading = false;
        }
    }
}
</script>
